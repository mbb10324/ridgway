import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ErrorContent from '@/components/status/Error';
import userEvent from '@testing-library/user-event';
import { signOut } from 'next-auth/react';

vi.mock('next-auth/react', () => ({
	signOut: vi.fn()
}));

describe('Error component tests', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it('should display the title and message', () => {
		render(<ErrorContent title='Test Title' message='Test Message' type='auth' />);

		expect(screen.getByText('Test Title')).toBeVisible();
		expect(screen.getByText('Test Message')).toBeVisible();
	});

	it('should display the back to sign in button text based on type', () => {
		render(<ErrorContent title='Auth Error' message='Please sign in.' type='auth' />);

		expect(screen.getByRole('button')).toHaveTextContent('Back To Sign In');
	});

	it('should display the go back button text based on type', () => {
		render(<ErrorContent title='Not Found' message='Page not found.' type='not-found' />);

		expect(screen.getByRole('button')).toHaveTextContent('Go Back');
	});

	it('should navigate to the root path when button is clicked and no onClick is provided', async () => {
		render(<ErrorContent title='Test Title' message='Test Message' type='auth' />);

		await userEvent.click(screen.getByRole('button', { name: /Back To Sign In/i }));
		await waitFor(() => expect(signOut).toHaveBeenCalled());
	});

	it('should execute the onClick function when provided and button is clicked', async () => {
		const onClickMock = vi.fn();
		render(<ErrorContent title='Test Title' message='Test Message' type='auth' onClick={onClickMock} />);

		await userEvent.click(screen.getByRole('button', { name: /Back To Sign In/i }));
		await waitFor(() => expect(onClickMock).toHaveBeenCalled());
	});
});
