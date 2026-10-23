import { setupUseSessionMock } from '@/test/test-helpers/test-helpers';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfileButton from '@/components/profile/ProfileButton';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';

describe('ProfileButton', () => {
	it('renders correctly', () => {
		renderWithMocks();

		expect(screen.getByTitle('profile-button')).toBeVisible();
	});

	it('toggles profile menu visibility on click', async () => {
		renderWithMocks();

		await userEvent.click(screen.getByTitle('profile-button'));

		const menu = screen.getByTitle('profile-menu');
		const backdrop = screen.getByTitle('backdrop');

		expect(menu).toBeInTheDocument();
		expect(backdrop).toHaveClass('pointer-events-auto');

		await userEvent.click(backdrop);
		expect(backdrop).toHaveClass('pointer-events-none');
	});

	it('toggles profile menu visibility when selected and the Enter key is pressed', () => {
		renderWithMocks();

		const button = screen.getByTitle('profile-button');
		fireEvent.keyDown(button, { key: 'Enter', charCode: 13 });

		const menu = screen.getByTitle('profile-menu');
		const backdrop = screen.getByTitle('backdrop');

		expect(menu).toBeInTheDocument();

		fireEvent.keyDown(backdrop, { key: 'Enter', charCode: 13 });
	});
	it('rotates chevron icon when profile menu is open', async () => {
		renderWithMocks();

		const button = screen.getByTitle('profile-button');
		const chevron = screen.getByTestId('profile-button-chevron');

		expect(chevron).toHaveClass('rotate-0');
		await userEvent.click(button);
		expect(chevron).toHaveClass('rotate-180');
	});
});

function renderWithMocks() {
	setupUseSessionMock();
	render(<ProfileButton />);
}
