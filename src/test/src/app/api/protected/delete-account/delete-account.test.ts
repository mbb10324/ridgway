import { describe, expect, it, type Mock, vi } from 'vitest';
import { setupMocksAndSpiesForApiTests } from '@/test/test-helpers/test-helpers';
import { DELETE } from '@/app/api/protected/delete-account/route';
import { db } from '@/db';
import { auth } from '@/auth';
import logger from '@/logger';

describe('deleting account function', () => {
	const { loggerSpy, prismaUser, validSession, nullSession } = setupMocksAndSpiesForApiTests();

	it('adds to logger and passes success json when an account is successfully deleted', async () => {
		(auth as Mock).mockResolvedValue(validSession);

		vi.spyOn(db.user, 'delete').mockResolvedValueOnce({
			id: prismaUser.id,
			name: prismaUser.name,
			email: prismaUser.email,
			emailVerified: prismaUser.emailVerified,
			image: null,
			createdAt: prismaUser.createdAt,
			updatedAt: prismaUser.updatedAt,
			isActive: prismaUser.isActive
		});

		const response = await DELETE();
		const json: JSON = (await response.json()) as JSON;

		expect(response.status).toBe(200);
		expect(json).toEqual({ message: 'User and associated data deleted successfully' });
		expect(loggerSpy).toHaveBeenCalledWith(`User deleted: ${prismaUser.id}`);
	});

	it('throws a 401 when the session is not valid', async () => {
		(auth as Mock).mockResolvedValue(nullSession);

		const response = await DELETE();
		const json: JSON = (await response.json()) as JSON;

		expect(response.status).toBe(401);
		expect(json).toEqual({ error: 'Unauthorized' });
	});

	it('adds to logger and passes error json when account deletion fails', async () => {
		(auth as Mock).mockResolvedValue(validSession);

		vi.spyOn(db.user, 'delete').mockRejectedValueOnce(new Error('Deletion failed'));
		const loggerErrorSpy = vi.spyOn(logger, 'error').mockImplementation(() => {});

		const response = await DELETE();
		const json = (await response.json()) as JSON;

		expect(response.status).toBe(500);
		expect(json).toEqual({ error: 'Internal Server Error' });
		expect(loggerSpy).toHaveBeenCalledWith(`Error deleting user: ${prismaUser.id}`, 'failure');
		expect(loggerErrorSpy).toHaveBeenCalledWith('Error fetching last session:', expect.any(Error));

		loggerErrorSpy.mockRestore();
	});
});
