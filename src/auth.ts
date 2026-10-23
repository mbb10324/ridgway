/*
 * @stig V-222464 | The application must generate audit records showing starting and ending time for user access to the system.
 * @stig V-222578 | The application must destroy the session ID value and/or cookie on logoff or browser close.
 */
import KeycloakProvider from 'next-auth/providers/keycloak';
import NextAuth, { type NextAuthConfig, type Account, type Session } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from './db';
import logger from './logger';
import { routes } from './routes';
import { randomUUID } from 'crypto';
import { generateRedirectUri } from './utils/auth';
import { env } from '@/env/server';
import { env as clientEnv } from '@/env/client';


const prismaAdapter = PrismaAdapter(db);

// Do not delete sessions on logout so we can support last login time @stig V-222437.
// Instead, simply update the expiration of the session.
// This also allows future auditing capabilities.
// @stig V-222520 | The application must require users to reauthenticate when organization-defined circumstances or situations require reauthentication.
prismaAdapter.deleteSession = async (sessionToken: string) => {
	try {
		const updatedSession = await db.session.update({
			where: {
				sessionToken
			},
			data: {
				expires: new Date()
			}
		});

		if (!updatedSession) {
			logger.error(`Session ${sessionToken} not found`);
			return;
		}
		// @stig V-222442 | The application must provide audit record generation capability for the destruction of session IDs.
		logger.audit(`Session ${sessionToken} ending for user id ${updatedSession.userId}`);
		return Promise.resolve(updatedSession);
	} catch {
		logger.error(`Error updating session ${sessionToken}`);
		return;
	}
};

export const config = {
	secret: env.AUTH_SECRET,
	providers: [
		KeycloakProvider({
			id: clientEnv.NEXT_PUBLIC_PROVIDER_ID,
			name: env.PROVIDER_NAME,
			clientId: env.PROVIDER_CLIENT_ID,
			clientSecret: env.PROVIDER_CLIENT_SECRET,
			issuer: env.PROVIDER_ISSUER,
			checks: ['pkce', 'nonce']
		})
	],
	session: {
		strategy: 'database',
		// @stig V-222390 | The application must automatically terminate the admin user session and log off admin users after a 10 minute idle time period is exceeded.
		// @stig V-222389 | The application must automatically terminate the non-privileged user session and log off non-privileged users after a 15 minute idle time period has elapsed.
		maxAge: 10 * 60, // 10 minutes
		updateAge: 0, // Update session each request
		generateSessionToken: () => {
			// @stig V-222462 | The application must generate audit records when successful/unsuccessful logon attempts occur.
			// @stig V-222579 | Applications must use system-generated session identifiers that protect against session fixation.
			// @stig V-222582 | The application must not re-use or recycle session IDs.
			// @stig V-222583 | The application must use the Federal Information Processing Standard (FIPS) 140-2-validated cryptographic modules and random number generator if the application implements encryption, key exchange, digital signature, and hash functionality.
			const token = randomUUID();
			// @stig V-222441 | The application must provide audit record generation capability for the creation of session IDs.
			logger.audit(`Session ${token} created`);
			return token;
		}
	},
	callbacks: {
		signIn: async (params) => {
			if (params.account) {
				// NextAuth does not (yet) update the Account object's tokens on login if it already exists.
				await updateAccountToken(params.account);
			}

			if (params.user?.id && params.user?.email) {
				const user: NonNullable<Session['user']> = {
					...params.user,
					id: params.user.id,
					email: params.user.email
				};
				return inactiveUserCheck(user) ?? (await maxSessionsCheck(user)) ?? Promise.resolve(true);
			} else {
				return `${routes.authError}?error=InvalidSession`;
			}
		},
		session: async ({ session, trigger }) => {
			if (trigger) {
				// @stig V-222443 | The application must provide audit record generation capability for the renewal of session IDs.
				logger.audit(`Session ${session.sessionToken} for user id ${session.userId} updated`);
			}

			return Promise.resolve(session);
		},
		redirect: ({ url, baseUrl }) => {
			return generateRedirectUri({ url, baseUrl });
		}
	},
	adapter: prismaAdapter,
	debug: env.NODE_ENV !== 'production' ? true : false,
	pages: {
		error: routes.authError
	}
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

// @stig V-222411 | The application must automatically disable accounts after a 35 day period of account inactivity.
export function inactiveUserCheck(user: NonNullable<Session['user']>): string | undefined {
	if (user && user.isActive === false) {
		logger.audit(`Unable to log in: User ${user.email} is not active`, 'failure');
		return `${routes.authError}?error=InactiveAccount`;
	}
}

// @stig V-222387 | The application must provide a capability to limit the number of logon sessions per user.
// @stig V-222462 | The application must generate audit records when successful/unsuccessful logon attempts occur.
// @stig V-222580 | Applications must validate session identifiers.
// @stig V-222672 | The application must generate audit records when concurrent logons from different workstations occur.
export async function maxSessionsCheck(user: NonNullable<Session['user']>): Promise<string | boolean | undefined> {
	if (env.MAX_CONCURRENT_SESSIONS_ALLOWED) {
		try {
			const maxAllowedSessions = env.MAX_CONCURRENT_SESSIONS_ALLOWED;
			const activeSessions = await db.session.findMany({
				where: {
					userId: user.id,
					expires: {
						gte: new Date()
					}
				},
				orderBy: {
					createdAt: 'desc'
				}
			});

			if (activeSessions.length > 0) {
				// @stig V-222672 | The application must generate audit records when concurrent logons from different workstations occur.
				logger.audit(`User id ${user.id} has ${activeSessions.length} concurrent active sessions`);
			}
			if (activeSessions.length >= maxAllowedSessions) {
				logger.audit(`Unable to log in: User id ${user.id} has reached the maximum number of active sessions`, 'failure');
				return `${routes.authError}?error=MaxSessionsReached`;
			}
		} catch (error) {
			logger.error('Error checking session:', error);
			return Promise.resolve(false);
		}
	}
}

export async function updateAccountToken(account: Account) {
	const existingAccount = await db.account.findUnique({
		where: {
			provider_providerAccountId: {
				provider: account.provider,
				providerAccountId: account.providerAccountId
			}
		}
	});

	// We don't need updates for first login, and if we try to update and they do not exist, it will throw an error.
	if (existingAccount) {
		await db.account.update({
			where: {
				provider_providerAccountId: {
					provider: account.provider,
					providerAccountId: account.providerAccountId
				}
			},
			data: {
				access_token: account.access_token,
				expires_at: account.expires_at,
				refresh_token: account.refresh_token,
				id_token: account.id_token
			}
		});

		return true;
	}

	return false;
}
