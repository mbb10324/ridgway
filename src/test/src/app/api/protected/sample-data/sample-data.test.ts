import { describe, it, vi, expect } from 'vitest';
import { GET, POST } from '@/app/api/protected/sample-data/route';
import { PUT, DELETE } from '@/app/api/protected/sample-data/[id]/route';
import { db } from '@/db';
import { createValidSampleData } from '@/test/test-helpers/test-helpers';

vi.mock('@/db', () => ({
	db: {
		sample: {
			findMany: vi.fn(),
			create: vi.fn(),
			update: vi.fn(),
			delete: vi.fn()
		}
	}
}));

const baseURL = 'localhost:3000/api/sample-data';

describe('sample-data.test.ts', () => {
	describe('get sample data', () => {
		it('returns the expected data with a 200 status', async () => {
			const mockSampleData = { ...createValidSampleData(), id: 1, date: new Date() };
			const mockSampleExpectedOutput = { ...mockSampleData, date: mockSampleData.date.toISOString() };
			vi.mocked(db.sample.findMany).mockResolvedValue([
				{ ...mockSampleData, notes: mockSampleData.notes ?? null }
			]);

			const request = new Request(baseURL, {
				method: 'GET'
			});

			const response = await GET(request);

			expect(response.status).equal(200);
			expect(await response.json()).toMatchObject([mockSampleExpectedOutput]);
		});

		it('throws an error when it fails to get sample data', async () => {
			vi.mocked(db.sample.findMany).mockRejectedValue(new Error('Database error'));

			const request = new Request(baseURL, {
				method: 'GET'
			});

			const response = await GET(request);

			expect(response.status).equal(500);
		});
	});

	describe('post sample data', () => {
		it('returns created sample data with a 201', async () => {
			const mockSampleData = createValidSampleData();
			const mockSampleDataOutput = { ...mockSampleData, id: 2, date: new Date() };
			vi.mocked(db.sample.create).mockResolvedValue({
				...mockSampleDataOutput,
				notes: mockSampleDataOutput.notes ?? null
			});

			const request = new Request(baseURL, {
				method: 'POST',
				body: JSON.stringify(mockSampleData)
			});

			const response = await POST(request);

			expect(response.status).equal(201);
			expect([await response.json()]).toEqual([
				expect.objectContaining({
					...mockSampleDataOutput,
					date: mockSampleDataOutput.date.toISOString()
				})
			]);
		});

		it('throws and error when it fails to post sample data', async () => {
			const mockSampleData = createValidSampleData();

			const request = new Request(baseURL, {
				method: 'POST',
				body: JSON.stringify(mockSampleData)
			});

			vi.mocked(db.sample.create).mockRejectedValue(new Error('Database error'));

			const response = await POST(request);

			expect(response.status).equal(500);
		});
	});

	describe('put sample data', () => {
		it('returns updated sample data with a 200 status', async () => {
			const mockSampleData = createValidSampleData();
			const mockSampleDataOutput = { ...mockSampleData, id: 3, date: new Date() };

			const request = new Request(`${baseURL}/2`, {
				method: 'PUT',
				body: JSON.stringify(mockSampleData)
			});

			vi.mocked(db.sample.update).mockResolvedValue({
				...mockSampleDataOutput,
				notes: mockSampleDataOutput.notes ?? null
			});

			const response = await PUT(request, { params: Promise.resolve({ id: '3' }) });

			expect(response.status).equal(200);
		});

		it('throws and error when id is invalid', async () => {
			const mockSampleData = createValidSampleData();
			const mockSampleDataOutput = { ...mockSampleData, id: 3, date: new Date() };

			const request = new Request(`${baseURL}/2`, {
				method: 'PUT',
				body: JSON.stringify(mockSampleData)
			});

			vi.mocked(db.sample.update).mockResolvedValue({
				...mockSampleDataOutput,
				notes: mockSampleDataOutput.notes ?? null
			});

			const response = await PUT(request, { params: Promise.resolve({ id: 'NOT VALID' }) });

			expect(response.status).equal(400);
		});

		it('throws an error if the update data fails', async () => {
			const mockSampleData = createValidSampleData();

			const request = new Request(`${baseURL}/2`, {
				method: 'PUT',
				body: JSON.stringify(mockSampleData)
			});

			vi.mocked(db.sample.update).mockRejectedValue(new Error('Database error'));

			const response = await PUT(request, { params: Promise.resolve({ id: '3' }) });

			expect(response.status).equal(500);
		});
	});

	describe('delete sample data', () => {
		it('returns the id of the delete sample data with a 200 status', async () => {
			const mockSampleData = { ...createValidSampleData(), id: 4, date: new Date() };

			const request = new Request(`${baseURL}/4`, {
				method: 'DELETE'
			});

			vi.mocked(db.sample.delete).mockResolvedValue({
				...mockSampleData,
				notes: mockSampleData.notes ?? null
			});

			const response = await DELETE(request, { params: Promise.resolve({ id: '4' }) });

			expect(response.status).equal(200);
		});

		it('throws an error when the the id is invalid', async () => {
			const mockSampleData = { ...createValidSampleData(), id: 4, date: new Date() };

			const request = new Request(`${baseURL}/4`, {
				method: 'DELETE'
			});

			vi.mocked(db.sample.delete).mockResolvedValue({
				...mockSampleData,
				notes: mockSampleData.notes ?? null
			});

			const response = await DELETE(request, { params: Promise.resolve({ id: 'INVALID' }) });

			expect(response.status).equal(400);
		});

		it('throws an error when it fails to delete data', async () => {
			const request = new Request(`${baseURL}/4`, {
				method: 'DELETE'
			});

			vi.mocked(db.sample.delete).mockRejectedValue(new Error('Database error'));

			const response = await DELETE(request, { params: Promise.resolve({ id: '4' }) });

			expect(response.status).equal(500);
		});
	});
});
