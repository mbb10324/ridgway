import { setupUseSessionMock } from '@/test/test-helpers/test-helpers';
import ProfileMenu from '@/components/profile/ProfileMenu';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, vi } from 'vitest';

describe('ProfileMenu', () => {
	it('renders correctly', () => {
		renderWithMocks(() => {});

		expect(screen.getByTitle('profile-menu')).toBeVisible();
	});

	it('should close the profile menu when the close button is clicked', async () => {
		const setShowProfile = vi.fn();
		renderWithMocks(setShowProfile);

		await userEvent.click(screen.getByTestId('profile-close-btn'));
		expect(setShowProfile).toHaveBeenCalledWith(false);
	});

	it('should close the profile menu when the delete account button is clicked', async () => {
		const setShowProfile = vi.fn();
		renderWithMocks(setShowProfile);

		await userEvent.click(screen.getByTitle('delete-account-btn'));
		expect(setShowProfile).toHaveBeenCalledWith(false);
	});
});

function renderWithMocks(setShowProfile: () => void) {
	setupUseSessionMock();
	render(<ProfileMenu setShowProfile={setShowProfile} />);
}
