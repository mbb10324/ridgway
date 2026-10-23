import { vi } from 'vitest';
import { type Session, type User, type Account } from '@prisma/client';
import logger from '@/logger';
import { randomUUID } from 'node:crypto';
import { type ValidationSampleData } from '@/app/api/protected/sample-data/validation';
import { type Session as NextAuthSession, type Account as NextAuthAccount } from 'next-auth';
import { type AdapterSession, type AdapterUser } from 'next-auth/adapters';
import { type ProviderType } from 'next-auth/providers';
import { useRouter } from 'next/navigation';
import { useSessionContext } from '../../context/SessionWrapper';

export function createMockResponse(data: unknown, ok = true, status = 200): Response {
	return {
		ok,
		status,
		statusText: ok ? 'OK' : 'Error',
		json: vi.fn().mockResolvedValue(data),
		headers: new Headers(),
		redirected: false,
		type: 'basic',
		url: 'https://test.com',
		clone: vi.fn(),
		body: null,
		bodyUsed: false,
		arrayBuffer: vi.fn(),
		blob: vi.fn(),
		formData: vi.fn(),
		text: vi.fn(),
		bytes: vi.fn()
	};
}

export const createUser = ({
	id = 'id',
	name = 'John Doe',
	email = 'user@email.com',
	emailVerified = new Date(),
	image = null,
	createdAt = new Date(),
	updatedAt = new Date(),
	isActive = false
} = {}): User => ({
	id,
	name,
	email,
	emailVerified,
	image,
	createdAt,
	updatedAt,
	isActive
});

export const createAccount = (overrides: Partial<Account> = {}): Account => ({
	userId: 'id',
	provider: 'keycloak',
	type: 'oidc',
	providerAccountId: '123456',
	access_token: 'access_token',
	expires_at: 1234567890,
	id_token: 'id_token',
	refresh_token: 'refresh_token',
	token_type: 'Bearer',
	scope: 'openid profile email',
	session_state: 'session_state',
	createdAt: new Date(),
	updatedAt: new Date(),
	...overrides
});

export const adaptPrismaAccountToNextAuthAccount = (account: Account): NextAuthAccount => ({
	userId: account.userId,
	provider: account.provider,
	type: account.type as ProviderType,
	providerAccountId: account.providerAccountId,
	refresh_token: account.refresh_token ?? undefined,
	access_token: account.access_token ?? undefined,
	expires_at: account.expires_at ?? undefined,
	token_type: account.token_type?.toLowerCase() as Lowercase<string> | undefined,
	scope: account.scope ?? undefined,
	id_token: account.id_token ?? undefined,
	session_state: account.session_state ?? undefined,
	oauth_token_secret: undefined,
	oauth_token: undefined
});

export const createValidSampleData = ({
	weight = 1,
	date = new Date().toISOString(),
	notes = 'notes'
} = {}): ValidationSampleData => ({
	weight,
	date,
	notes
});

export const createValidPrismaSession = ({
	sessionToken = randomUUID(),
	userId = 'userId',
	expires = new Date(),
	createdAt = new Date(),
	updatedAt = setDateXNumberOfMinutesFromNow(15)
} = {}): Session => ({
	sessionToken,
	userId,
	expires,
	createdAt,
	updatedAt
});

type CreateSessionParams = {
	user?: User;
	expires?: Date;
};

export const createValidNextAuthSession = ({
	user = createUser(),
	expires = new Date()
}: CreateSessionParams = {}): NextAuthSession & { user: NonNullable<NextAuthSession['user']> & NonNullable<User> } => ({
	user,
	expires
});

export function adaptNextAuthSession(
	session: ReturnType<typeof createValidNextAuthSession>
): { user: AdapterUser } & AdapterSession & NextAuthSession {
	return {
		user: session.user,
		sessionToken: 'token',
		userId: session.user.id,
		expires: session.expires
	};
}

export const setDateXNumberOfMinutesFromNow = (minutes: number) => {
	return new Date(new Date().getTime() + minutes * 60 * 1000);
};

export const setDateXNumberOfMinutesBeforeNow = (minutes: number) => {
	return new Date(new Date().getTime() - minutes * 60 * 1000);
};

export const setupMocksAndSpiesForApiTests = () => {
	const loggerSpy = vi.spyOn(logger, 'audit');

	const prismaUser = createUser();

	vi.mock('@/auth', () => ({
		auth: vi.fn()
	}));

	const validSession = {
		user: {
			name: prismaUser.name,
			email: prismaUser.email,
			id: prismaUser.id
		},
		expires: setDateXNumberOfMinutesFromNow(15).toISOString()
	};

	const nullSession = null;

	return { loggerSpy, prismaUser, validSession, nullSession };
};

// When importing this function into a test file, the import order matters.
export const setupUseSessionMock = (session = createValidNextAuthSession()) => {
	vi.mock('../../context/SessionWrapper', () => ({
		useSessionContext: vi.fn()
	}));

	vi.mocked(useSessionContext).mockReturnValue(session);
};

export const setupNextNavigationMock = () => {
	vi.mock('next/navigation', () => ({
		useRouter: vi.fn(),
		usePathname: vi.fn()
	}));

	vi.mocked(useRouter).mockReturnValue({
		push: vi.fn(),
		replace: vi.fn(),
		pathname: '/',
		query: {}
	} as unknown as ReturnType<typeof useRouter>);
};
