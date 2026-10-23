import { describe, expect, it, type Mock, vi } from 'vitest';
import {
	createValidPrismaSession,
	setDateXNumberOfMinutesBeforeNow,
	setupMocksAndSpiesForApiTests
} from '@/test/test-helpers/test-helpers';
import { auth } from '@/auth';
import { db } from '@/db';
import { GET } from '@/app/api/protected/last-session/route';

describe('last session',
	() => {

		const {
			loggerSpy,
			validSession,
			nullSession
		} = setupMocksAndSpiesForApiTests();


		it('provides the last session as json if found', async () => {

			(auth as Mock).mockResolvedValue(validSession);

			const prismaSession =
				createValidPrismaSession(
					{
						expires: setDateXNumberOfMinutesBeforeNow(15),
						createdAt: setDateXNumberOfMinutesBeforeNow(30),
						updatedAt: setDateXNumberOfMinutesBeforeNow(20)
					});

			vi.spyOn(db.session, 'findFirst').mockResolvedValueOnce(prismaSession);

			const response = await GET();
			const json = await response.json() as JSON;

			expect(json).toEqual({ lastLogin: prismaSession.createdAt.toISOString() });
		});

		it('provides the last session as null if first login', async () => {

			(auth as Mock).mockResolvedValue(validSession);

			vi.spyOn(db.session, 'findFirst').mockResolvedValueOnce(null);

			const response = await GET();
			const json = await response.json() as JSON;

			expect(json).toEqual({ lastLogin: null });
		});

		it('provides a null as the last session if there is not a last session', async () => {
			(auth as Mock).mockResolvedValue(nullSession);

			const response = await GET();
			const json: JSON = await response.json() as JSON;

			expect(response.status).toBe(401);
			expect(json).toEqual({ error: 'Unauthorized' });
		});

		it('adds failure to retrieve last session to logger and sends a 500 response', async () => {

			(auth as Mock).mockResolvedValue(validSession);

			vi.spyOn(db.session, 'findFirst').mockRejectedValueOnce(new Error());

			const response = await GET();
			const json = await response.json() as JSON;

			expect(response.status).toBe(500);
			expect(json).toEqual({ error: 'Internal Server Error' });
			expect(loggerSpy).toHaveBeenCalledWith(`Error fetching last session for user id ${validSession.user.id}`, 'failure');

		});

	});