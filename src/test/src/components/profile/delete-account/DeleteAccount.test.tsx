import DeleteAccount from '@/components/profile/delete-account/DeleteAccount';
import { DeleteAccountContext } from '@/components/profile/delete-account/DeleteAccountContext';
import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useMutation } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';

// Mocking the necessary modules
vi.mock('@tanstack/react-query', () => ({
	useMutation: vi.fn()
}));

vi.mock('next-auth/react', () => ({
	signOut: vi.fn()
}));

vi.mock('react-toastify', () => ({
	toast: {
		error: vi.fn()
	}
}));

describe('DeleteAccount Component', () => {
	const mockMutate = vi.fn();
	const mockSignOut = vi.fn();
	const mockToastError = vi.fn();

	describe('When showDeleteAccount is true', () => {
		beforeEach(() => {
			vi.mocked(useMutation).mockReturnValue({
				mutate: mockMutate,
				onSuccess: mockSignOut,
				onError: mockToastError
			} as unknown as ReturnType<typeof useMutation>);
			render(
				<DeleteAccountContext.Provider value={{ showDeleteAccount: true, setShowDeleteAccount: vi.fn() }}>
					<DeleteAccount />
				</DeleteAccountContext.Provider>
			);
		});

		it('should open the confirmation modal when showDelete is true', () => {
			expect(screen.getByText('Delete Account?')).toBeVisible();
			expect(
				screen.getByText(
					'You will no longer have access to this account or any associated data, are you sure you would like to proceed? This action can not be undone.'
				)
			).toBeVisible();
		});

		it('should trigger the delete mutation when "Delete" is clicked', async () => {
			await userEvent.click(screen.getByText('Delete'));

			await waitFor(() => {
				expect(mockMutate).toHaveBeenCalledTimes(1);
			});
		});
	});
});
