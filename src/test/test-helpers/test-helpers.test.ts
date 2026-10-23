import { describe, expect, it, vi } from 'vitest';
import {
	createUser,
	createValidPrismaSession,
	createValidSampleData,
	setDateXNumberOfMinutesFromNow,
	setupMocksAndSpiesForApiTests
} from '@/test/test-helpers/test-helpers';
import { type User } from '@prisma/client';
import { randomUUID } from 'node:crypto';

describe('helpers', () => {
	describe('test helpers', () => {
		describe('Prisma user', () => {
			it('returns a Prisma user with default values', () => {
				const mockDate = new Date('2023-08-30T00:00:00Z');
				vi.setSystemTime(mockDate);

				const expectedUser: User = {
					id: 'id',
					name: 'John Doe',
					email: 'user@email.com',
					emailVerified: mockDate,
					image: null,
					createdAt: mockDate,
					updatedAt: mockDate,
					isActive: false
				};

				const actualUser: User = createUser();

				expect(actualUser).toEqual(expectedUser);

				vi.useRealTimers();
			});

			it('allows an engineer to provide override values to default values for a Prisma User', () => {
				const mockDate = new Date('2023-08-30T00:00:00Z');
				vi.setSystemTime(mockDate);

				const expectedUser: User = {
					id: 'id2',
					name: 'John Doe',
					email: 'user@email.com',
					emailVerified: mockDate,
					image: null,
					createdAt: mockDate,
					updatedAt: mockDate,
					isActive: false
				};

				const actualUser: User = createUser({ id: 'id2' });

				expect(actualUser).toEqual(expectedUser);
				vi.useRealTimers();
			});
		});

		describe('createSampleData', () => {
			it('should create sample data with default values', () => {
				const sampleData = createValidSampleData();
				expect(sampleData).toHaveProperty('weight', 1);
				expect(sampleData).toHaveProperty('date');
				expect(sampleData).toHaveProperty('notes', 'notes');

				expect(new Date(sampleData.date)).toBeInstanceOf(Date);
			});

			it('should create sample data with provided values', () => {
				const customData = {
					weight: 5,
					date: new Date('2024-12-31T23:59:59Z').toISOString(),
					notes: 'custom notes',
					include: false
				};

				const sampleData = createValidSampleData(customData);

				expect(sampleData).toHaveProperty('weight', 5);
				expect(sampleData).toHaveProperty('date', customData.date);
				expect(sampleData).toHaveProperty('notes', 'custom notes');

				expect(new Date(sampleData.date)).toBeInstanceOf(Date);
			});
		});

		describe('createValidPrismaSession', () => {
			it('should create a valid session with default values', () => {
				const session = createValidPrismaSession();

				expect(session).toHaveProperty('sessionToken');
				expect(session).toHaveProperty('userId', 'userId');
				expect(session).toHaveProperty('expires');
				expect(session).toHaveProperty('createdAt');
				expect(session).toHaveProperty('updatedAt');

				expect(session.expires).toBeInstanceOf(Date);
				expect(session.createdAt).toBeInstanceOf(Date);
				expect(session.updatedAt).toBeInstanceOf(Date);
			});

			it('should create a valid session with provided values', () => {
				const uuid = randomUUID();

				const customSession = {
					sessionToken: uuid,
					userId: 'customUserId',
					expires: new Date('2024-12-31T23:59:59Z'),
					createdAt: new Date('2024-01-01T00:00:00Z'),
					updatedAt: new Date('2024-01-01T00:15:00Z')
				};

				const session = createValidPrismaSession(customSession);

				expect(session).toHaveProperty('sessionToken', uuid);
				expect(session).toHaveProperty('userId', 'customUserId');
				expect(session).toHaveProperty('expires', customSession.expires);
				expect(session).toHaveProperty('createdAt', customSession.createdAt);
				expect(session).toHaveProperty('updatedAt', customSession.updatedAt);

				expect(session.expires).toBeInstanceOf(Date);
				expect(session.createdAt).toBeInstanceOf(Date);
				expect(session.updatedAt).toBeInstanceOf(Date);
			});
		});

		describe('setDate15MinutesFromNow', () => {
			const isWithinRange = (actual: number, expected: number, range: number): boolean =>
				Math.abs(actual - expected) <= range;

			it('return a date that is the provided minutes from now', () => {
				const now = new Date();
				const actualXNumberOfMinutesFromNow = setDateXNumberOfMinutesFromNow(15);
				const expectedXNumberOfMinutesFromNow = new Date(now.getTime() + 15 * 60 * 1000);

				// Allow a small margin of error for the test to pass
				const oneSecond = 1000;
				expect(
					isWithinRange(actualXNumberOfMinutesFromNow.getTime(), expectedXNumberOfMinutesFromNow.getTime(), oneSecond)
				).toBe(true);
			});
		});

		describe('setupMocksAndSpiesForApiTests', () => {
			vi.mock('@/auth', () => ({
				auth: vi.fn()
			}));

			it('should set up loggerSpy correctly', () => {
				const { loggerSpy } = setupMocksAndSpiesForApiTests();
				expect(loggerSpy).toBeDefined();
				expect(loggerSpy).toHaveBeenCalledTimes(0);
			});

			it('should create a valid session correctly', () => {
				const { validSession, prismaUser } = setupMocksAndSpiesForApiTests();
				expect(validSession).toBeDefined();
				expect(validSession.user).toEqual({
					name: prismaUser.name,
					email: prismaUser.email,
					id: prismaUser.id
				});
				//tested above
				expect(validSession.expires).toBeDefined();
			});

			it('should set nullSession to null', () => {
				const { nullSession } = setupMocksAndSpiesForApiTests();
				expect(nullSession).toBeNull();
			});
		});
	});
});
