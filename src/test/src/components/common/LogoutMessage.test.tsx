import { render, screen, waitFor } from '@testing-library/react';
import LogoutMessage from '@/components/common/LogoutMessage';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { useRouter } from 'next/navigation';

vi.mock('next/navigation', () => ({
	useRouter: vi.fn()
}));

describe('LogoutMessage component tests', () => {
	it('should render the logout message when message is "logged-out"', () => {
		const mockReplace = renderWithMock(true);

		expect(screen.getByText('Logged Out')).toBeVisible();
		expect(screen.getByRole('button', { name: 'Close' })).toBeVisible();
		expect(mockReplace).toHaveBeenCalledWith('/');
	});

	it('should not render the logout message when message is not "logged-out"', () => {
		renderWithMock(false);

		expect(screen.getByTitle('modal')).toHaveClass('opacity-0');
	});

	it('should hide the modal and backdrop when "Close" button is clicked', async () => {
		renderWithMock(true);

		await userEvent.click(screen.getByRole('button', { name: 'Close' }));

		await waitFor(() => {
			expect(screen.getByTitle('modal')).toHaveClass('opacity-0');
			expect(screen.getByTitle('backdrop')).toHaveClass('opacity-0');
		});
	});

	it('should hide the modal and backdrop when backdrop is clicked', async () => {
		renderWithMock(true);

		await userEvent.click(screen.getByTitle('backdrop'));

		await waitFor(() => {
			expect(screen.getByTitle('modal')).toHaveClass('opacity-0');
			expect(screen.getByTitle('backdrop')).toHaveClass('opacity-0');
		});
	});
});

function renderWithMock(isLogoutMessage: boolean) {
	const mockReplace = vi.fn();
	vi.mocked(useRouter).mockReturnValue({
		replace: mockReplace
	} as unknown as ReturnType<typeof useRouter>);

	render(<LogoutMessage isLogoutMessage={isLogoutMessage} />);

	return mockReplace;
}
