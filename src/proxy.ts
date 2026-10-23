import { type NextRequest, NextResponse } from 'next/server';
import { protectedRoutePrefix, routes } from './routes';
import logger from './logger';
import { getClassification } from './utils/utils-helpers';
import { type Session } from 'next-auth';
import { setContentSecurityPolicy } from './utils/middleware';
import { env } from '@/env/server';

// NOTE: Next.js middleware runs in the Edge Runtime. This is a limited runtime
// that lacks many things the Node.js runtime provides. Ref: https://nextjs.org/docs/pages/api-reference/edge
// For example, we can't do this in edge middleware: `const session = await auth();`,
// nor can we access the DB. Therefore, we must `fetch` things instead.

function localNextAuthUrl(path: string) {
	return `http://${env.HOSTNAME}:${env.PORT}${path}`;
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		{
			source: '/((?!_next/static|_next/image|favicon.ico).*)',
			missing: [
				{ type: 'header', key: 'next-router-prefetch' },
				{ type: 'header', key: 'purpose', value: 'prefetch' }
			]
		}
	]
};

// NOTE: Next.js does not provide a way for us to `await` the result
// of downstream built-in middlewares like Express does. So we cannot
// get the result of a Page or Request Handler. :/
export async function proxy(req: NextRequest): Promise<NextResponse> {
	// Azure probes the healthcheck every few seconds; don't flood the audit log with them.
	if (req.nextUrl.pathname !== routes.healthcheck) {
		loggingProxy(req);
	}

	const unauthorizedResponse = await authProxy(req);
	// There was an error authenticating the request
	if (unauthorizedResponse) {
		return unauthorizedResponse;
	}

	const contentSecurityResponse = setContentSecurityPolicy(req);

	// Add security markings to the response
	const classificationResponse = classificationProxy(contentSecurityResponse);

	return classificationResponse;
}

/**
 * Classification middleware that adds a security classification header to the response.
 * 
 * Ensure that you adjust your application's classification level to match its sensitivity.
 * 
 * @stig V-222395 | The application must associate organization-defined types of security attributes having organization-defined security attribute values with information in transmission.
 * @param res The response object
 * @returns The response object with the security classification header set
 */
export function classificationProxy(res: NextResponse) {
	const classification = getClassification();
	if (classification) {
		res.headers.set('Security-Classification', `DYNAMIC CONTENT -- HIGHEST POSSIBLE CLASSIFICATION IS: ${classification}`);
	}
	return res;
}

// @stig V-222471 | The application must log user actions involving access to data.
// @stig V-222465 | The application must generate audit records when successful/unsuccessful accesses to objects occur.
function loggingProxy(req: NextRequest): void {
	const { method, url } = req;
	// @stig V-222448 | The application must provide audit record generation capability for connecting system IP addresses

	const ip = (req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? '') || 'unknown'; // Instead of an empty string, we'll use a consistent value of 'unknown' for auditing purposes
	const authToken = (req.cookies.get('authjs.session-token')?.value ?? '') || 'not-set'; // Instead of an empty string, we'll use a consistant value of 'not-set' for auditing purposes

	// @stig V-222447 | The application must provide audit record generation capability for HTTP headers including User-Agent, Referer, GET, and POST.
	const headers: Record<string, string> = {};
	req.headers.forEach((value, key) => {
		headers[key] = value;
	});

	logger.info({
		request: {
			method,
			url,
			ip,
			authToken,
			headers
		}
	});
}

/**
 * Handling Session Expiration/Invalidation:
 *
 * When a user’s session expires due to inactivity or exceeding the maximum session duration,
 * the application will automatically invalidate their access permissions without notifying
 * them. As a result, if the user attempts to perform any action within the app after the
 * session has expired, they will encounter a 401 Unauthorized error. This behavior occurs
 * because, under STIG requirements, the application enforces strict validation of session
 * identifiers and disallows operations from users with expired sessions. Additionally, if
 * the user attempted to navigate to a new page they would be logged out. As a suggested solution
 * to this, you may want to consider redirecting a user to the login anytime a 401 error occurs.
 *
 */
// @stig V-222450 | The application must generate audit records when successful/unsuccessful attempts to access security objects occur.
// @stig V-222455 | The application must generate audit records when successful/unsuccessful attempts to modify security objects occur.
// @stig V-222460 | The application must generate audit records when successful/unsuccessful attempts to delete application database security objects occur.
export async function authProxy(req: NextRequest): Promise<NextResponse | undefined> {
	if (req.nextUrl.pathname.startsWith(protectedRoutePrefix)) {
		try {
			const sessionUrl = localNextAuthUrl('/api/auth/session');
			const sessionResponse = await fetch(sessionUrl, {
				headers: {
					cookie: req.headers.get('cookie') ?? ''
				}
			});

			if (!sessionResponse.ok) {
				logger.warn('Session check failed');
				return new NextResponse('Unauthorized', { status: 401 });
			}

			const session = (await sessionResponse.json()) as Session;
			// @stig V-222580 | Applications must validate session identifiers.
			if (!session?.user) {
				logger.warn('No valid session found');
				return new NextResponse('Unauthorized', { status: 401 });
			}
			// @stig V-222449 | The application must record the username or user ID of the user associated with the event.
			// @stig V-222477 | The application must generate audit records containing information that establishes the identity of any individual or process associated with the event.
			logger.info({ user: session.user.id });
		} catch (error) {
			logger.error('Error checking session:', error);
			return new NextResponse('Unauthorized', { status: 401 });
		}
	}
}
