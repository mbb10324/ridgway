import DeleteAccountButton from '@/components/profile/delete-account/DeleteAccountButton';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

describe('DeleteAccountButton Component', () => {
	it('should render the delete account button', () => {
		renderWithMocks(vi.fn());

		const deleteButton = screen.getByTitle('delete-account-btn');

		expect(deleteButton).toBeInTheDocument();
		expect(deleteButton).toHaveTextContent('Delete Account');
	});

	it('should call the context setShowDeleteAccount and onClick when clicked', async () => {
		const mockOnClick = vi.fn();
		renderWithMocks(mockOnClick);

		await userEvent.click(screen.getByTitle('delete-account-btn'));
		expect(mockOnClick).toHaveBeenCalled();
	});
});

function renderWithMocks(onClick: () => void) {
	render(<DeleteAccountButton onClick={onClick} />);
}
