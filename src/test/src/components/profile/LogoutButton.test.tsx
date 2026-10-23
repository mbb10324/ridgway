import LogoutButton from '@/components/profile/LogoutButton';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, vi } from 'vitest';
import { signOut } from 'next-auth/react';

vi.mock('next-auth/react', () => ({
	signOut: vi.fn()
}));

describe('LogOutButton', () => {
	it('renders correctly', () => {
		render(<LogoutButton />);

		expect(screen.getByTitle('logout-btn')).toBeVisible();
	});

	it('should call signOut when clicked', async () => {
		render(<LogoutButton />);

		await userEvent.click(screen.getByTitle('logout-btn'));
		expect(signOut).toHaveBeenCalled();
	});
});
