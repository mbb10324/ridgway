/**
 * @stig V-222615 | The application performing organization-defined security functions must verify correct operation of security functions.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { inactiveUserCheck, maxSessionsCheck, updateAccountToken } from '@/auth';
import { routes } from '@/routes';
import { db } from '@/db';
import { adaptPrismaAccountToNextAuthAccount, createAccount, createUser } from '../test-helpers/test-helpers';

vi.mock('@/db');
vi.mock('@/logger');
vi.mock('@/env/server', () => ({
	env: {
		MAX_CONCURRENT_SESSIONS_ALLOWED: 2
	}
}));

db.session.findMany = vi.fn();
db.account.findFirst = vi.fn();
db.account.findUnique = vi.fn();
db.account.update = vi.fn();

beforeEach(() => {
	vi.resetAllMocks();
});

describe('inactiveUserCheck', () => {
	it('should return error route for inactive user', () => {
		expect(inactiveUserCheck(createUser({ isActive: false }))).toBe(`${routes.authError}?error=InactiveAccount`);
	});

	it('should return undefined for active user', () => {
		expect(inactiveUserCheck(createUser({ isActive: true }))).toBeUndefined();
	});
});

describe('maxSessionsCheck', () => {
	beforeEach(() => {
		process.env.MAX_CONCURRENT_SESSIONS_ALLOWED = '2';
	});

	it('should return error route when max sessions reached', async () => {
		const user = { id: '123', email: 'test@example.com', isActive: true };
		vi.mocked(db.session.findMany).mockResolvedValue([
			{
				sessionToken: 'token1',
				userId: '123',
				expires: new Date(Date.now() + 10 * 60 * 1000),
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				sessionToken: 'token2',
				userId: '123',
				expires: new Date(Date.now() + 8 * 60 * 1000),
				createdAt: new Date(),
				updatedAt: new Date()
			}
		]);

		const result = await maxSessionsCheck(user);
		expect(result).toBe(`${routes.authError}?error=MaxSessionsReached`);
	});

	it('should return undefined when sessions are below limit', async () => {
		const user = { id: '123', email: 'test@example.com', isActive: true };
		vi.mocked(db.session.findMany).mockResolvedValue([
			{
				sessionToken: 'token1',
				userId: '123',
				expires: new Date(Date.now() + 10 * 60 * 1000),
				createdAt: new Date(),
				updatedAt: new Date()
			}
		]);

		const result = await maxSessionsCheck(user);
		expect(result).toBeUndefined();
	});

	it('should return false on database error', async () => {
		const user = { id: '123', email: 'test@example.com', isActive: true };
		vi.mocked(db.session.findMany).mockRejectedValue(new Error('Database error'));

		const result = await maxSessionsCheck(user);
		expect(result).toBe(false);
	});
});

describe('updateAccountToken', () => {
	it('should update the account token successfully if it exists', async () => {
		const mockAccount = createAccount();

		vi.mocked(db.account.findUnique).mockResolvedValue(mockAccount);
		vi.mocked(db.account.update).mockResolvedValue(mockAccount);

		const result = await updateAccountToken(adaptPrismaAccountToNextAuthAccount(mockAccount));

		expect(result).toBe(true);
		expect(db.account.update).toHaveBeenCalled();
	});

	it('should not update the account token successfully if it does not exist', async () => {
		const mockAccount = createAccount();

		vi.mocked(db.account.findUnique).mockResolvedValue(null);

		const result = await updateAccountToken(adaptPrismaAccountToNextAuthAccount(mockAccount));

		expect(result).toBe(false);
		expect(db.account.update).not.toHaveBeenCalled();
	});
});
