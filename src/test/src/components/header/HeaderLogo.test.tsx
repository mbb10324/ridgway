import { render, screen } from '@testing-library/react';
import HeaderLogo from '@/components/header/HeaderLogo';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useRouter } from 'next/navigation';

vi.mock('next/navigation', () => ({
	useRouter: vi.fn()
}));


describe('HeaderLogo component tests', () => {
	const mockPush = vi.fn();
	beforeEach(() => {
		vi.mocked(useRouter).mockReturnValue({
			push: mockPush
		} as unknown as ReturnType<typeof useRouter>);
		render(<HeaderLogo />);
	});

	it('should navigate to the home page when the logo is clicked', async () => {
		await userEvent.click(screen.getByTestId('primus-logo'));
		expect(mockPush).toHaveBeenCalledWith('/');
	});
	it('should navigate to the home page when the logo is pressed', async () => {
		const logoElement = screen.getByTestId('primus-logo');
		logoElement.focus();
		await userEvent.keyboard('{enter}');
		expect(mockPush).toHaveBeenCalledWith('/');
	});
});
