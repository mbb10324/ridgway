import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AuthErrorPage from '@/app/auth/error/page';
import { useSearchParams } from 'next/navigation';

vi.mock('next/navigation', () => ({
	useSearchParams: vi.fn(),
	useRouter: vi.fn()
}));

describe('AuthErrorPage Component', () => {
	it('should display "Authentication failed." when error is "auth"', async () => {
		vi.mocked(useSearchParams).mockReturnValue({
			get: (key: string) => (key === 'error' ? 'auth' : null)
		} as unknown as ReturnType<typeof useSearchParams>);
		render(<AuthErrorPage />);

		await waitFor(() => {
			expect(screen.getByText(/Authentication Error/i)).toBeVisible();
			expect(screen.getByText(/Authentication failed\./i)).toBeVisible();
		});
	});

	it('should display "Your account has been disabled. Please contact your administrator." when error is "InactiveAccount"', () => {
		vi.mocked(useSearchParams).mockReturnValue({
			get: (key: string) => (key === 'error' ? 'InactiveAccount' : null)
		} as unknown as ReturnType<typeof useSearchParams>);
		render(<AuthErrorPage />);

		expect(screen.getByText(/Authentication Error/i)).toBeVisible();
	});

	it('should inform user they need to authenticate to gain access to the site', async () => {
		vi.mocked(useSearchParams).mockReturnValue({
			get: (key: string) => (key === 'error' ? 'InvalidSession' : null)
		} as unknown as ReturnType<typeof useSearchParams>);
		render(<AuthErrorPage />);

		await waitFor(() => {
			expect(screen.getByText(/Authentication Error/i)).toBeVisible();
			expect(screen.getByText(/You must be authenticated to access this site\./i)).toBeVisible();
		});
	});

	it('should display "You have reached the maximum number of active sessions." when error is "MaxSessionsReached"', async () => {
		vi.mocked(useSearchParams).mockReturnValue({
			get: (key: string) => (key === 'error' ? 'MaxSessionsReached' : null)
		} as unknown as ReturnType<typeof useSearchParams>);
		render(<AuthErrorPage />);

		await waitFor(() => {
			expect(screen.getByText(/Authentication Error/i)).toBeVisible();
			expect(screen.getByText(/You have reached the maximum number of active sessions\./i)).toBeVisible();
		});
	});

	it('should display "An unexpected error occurred." when error is undefined or any other value', async () => {
		vi.mocked(useSearchParams).mockReturnValue({
			get: (key: string) => (key === 'error' ? 'SomeUnknownError' : null)
		} as unknown as ReturnType<typeof useSearchParams>);
		render(<AuthErrorPage />);

		await waitFor(() => {
			expect(screen.getByText(/Authentication Error/i)).toBeVisible();
			expect(screen.getByText(/An unexpected error occurred\./i)).toBeVisible();
		});
	});

	it('should display loading fallback while content is loading', async () => {
		render(<AuthErrorPage />);

		await waitFor(() => {
			expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
		});
	});
});
