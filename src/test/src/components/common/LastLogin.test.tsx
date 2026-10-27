import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import LastLoginDisplay from '@/components/profile/LastLogin';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useRouter } from 'next/navigation';

vi.mock('@tanstack/react-query', () => ({
	useQuery: vi.fn()
}));

vi.mock('next/navigation', () => ({
	useRouter: vi.fn()
}));

type QueryResult = {
	data: { lastLogin: string | null };
	status: 'success' | 'loading' | 'error';
};

describe('LastLoginDisplay component tests', () => {
	it('should display the last login date and time when data is available', () => {
		const mockLastLoginDate = '2023-08-25T12:34:56Z';
		vi.mocked(useQuery).mockReturnValue({
			data: { lastLogin: mockLastLoginDate },
			status: 'success'
		} as unknown as UseQueryResult<QueryResult, unknown>);

		render(<LastLoginDisplay />);

		const lastLoginDate = new Date(mockLastLoginDate).toLocaleDateString();
		const lastLoginTime = new Date(mockLastLoginDate).toLocaleTimeString();

		expect(screen.getByText(`Last Login: ${lastLoginDate} ${lastLoginTime}`)).toBeVisible();
	});

	it('should display "This is your first login." when lastLogin is null', () => {
		vi.mocked(useQuery).mockReturnValue({
			data: { lastLogin: null },
			status: 'success'
		} as unknown as UseQueryResult<QueryResult, unknown>);

		render(<LastLoginDisplay />);

		expect(screen.getByText('This is your first login.')).toBeVisible();
	});

	it('should render LastLoginLoading component when status is loading', () => {
		vi.mocked(useQuery).mockReturnValue({
			status: 'pending'
		} as unknown as UseQueryResult<QueryResult, unknown>);

		render(<LastLoginDisplay />);

		expect(screen.getByTitle('last-login-loading')).toBeVisible();
	});

	it('should redirect to auth error route when status is error', () => {
		const mockPush = vi.fn();
		vi.mocked(useQuery).mockReturnValue({
			status: 'error'
		} as unknown as UseQueryResult<QueryResult, unknown>);
		vi.mocked(useRouter).mockReturnValue({
			push: mockPush
		} as unknown as ReturnType<typeof useRouter>);

		render(<LastLoginDisplay />);

		expect(mockPush).toHaveBeenCalledWith('/auth/error');
	});
});
