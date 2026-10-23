import SplashSignInButton from '@/components/splash/SplashSignInButton';
import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { signIn } from 'next-auth/react';

vi.mock('next-auth/react', () => ({
	signIn: vi.fn()
}));

vi.mock('@/env/client', () => ({ env: process.env }));

describe('SplashSignInButton component tests', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it('should call signIn with providerId when NEXT_PUBLIC_PROVIDER_ID is set', async () => {
		const providerId = 'test-provider';

		process.env.NEXT_PUBLIC_PROVIDER_ID = providerId;

		render(<SplashSignInButton />);

		await userEvent.click(screen.getByRole('button', { name: 'Sign In' }));
		await waitFor(() => {
			expect(signIn).toHaveBeenCalledWith(providerId);
		});
	});

	it('should call signIn without arguments when NEXT_PUBLIC_PROVIDER_ID is not set', async () => {
		delete process.env.NEXT_PUBLIC_PROVIDER_ID;

		render(<SplashSignInButton />);

		await userEvent.click(screen.getByRole('button', { name: 'Sign In' }));
		await waitFor(() => {
			expect(signIn).toHaveBeenCalledWith();
		});
	});
});
