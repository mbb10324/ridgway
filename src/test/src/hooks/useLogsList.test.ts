import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useQuery } from '@tanstack/react-query';
import { type Sample } from '@prisma/client';
import useLogs from '@/hooks/useLogsList';

vi.mock('@tanstack/react-query', () => ({
	useQuery: vi.fn()
}));

describe('useLogs', () => {
	it('should return calculated differences and status "success" when data is fetched successfully', () => {
		const sampleData: Sample[] = [
			{ id: 1, weight: 200, date: new Date('2023-01-01'), notes: 'Sample note' },
			{ id: 2, weight: 195, date: new Date('2023-01-02'), notes: 'Sample note' },
			{ id: 3, weight: 192, date: new Date('2023-01-03'), notes: 'Sample note' }
		];

		vi.mocked(useQuery).mockReturnValue({
			status: 'success',
			data: sampleData
		} as unknown as ReturnType<typeof useQuery>);

		const { result } = renderHook(() => useLogs());

		expect(result.current.status).toBe('success');
		expect(result.current.data).toEqual([
			{ id: 1, weight: 200, date: new Date('2023-01-01'), notes: 'Sample note', difference: 5.0 },
			{ id: 2, weight: 195, date: new Date('2023-01-02'), notes: 'Sample note', difference: 3.0 },
			{ id: 3, weight: 192, date: new Date('2023-01-03'), notes: 'Sample note', difference: null }
		]);
	});

	it('should return an empty array and status "loading" if data is not yet fetched', () => {
		vi.mocked(useQuery).mockReturnValue({
			status: 'loading',
			data: undefined
		} as unknown as ReturnType<typeof useQuery>);

		const { result } = renderHook(() => useLogs());

		expect(result.current.status).toBe('loading');
		expect(result.current.data).toEqual([]);
	});

	it('should return an empty array and status "error" if the fetch fails', () => {
		vi.mocked(useQuery).mockReturnValue({
			status: 'error',
			data: undefined
		} as unknown as ReturnType<typeof useQuery>);

		const { result } = renderHook(() => useLogs());

		expect(result.current.status).toBe('error');
		expect(result.current.data).toEqual([]);
	});
});
