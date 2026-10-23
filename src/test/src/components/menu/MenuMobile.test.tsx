import { setupUseSessionMock } from '@/test/test-helpers/test-helpers';
import { fireEvent, render, screen } from '@testing-library/react';
import { usePathname, useRouter } from 'next/navigation';
import MenuMobile from '@/components/menu/MenuMobile';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/navigation', () => ({
	useRouter: vi.fn(),
	usePathname: vi.fn()
}));

describe('MenuMobile component tests', () => {
	it('should render the menu when showMenu is true', () => {
		renderWithMocks();

		expect(screen.getByTitle('menu-mobile')).toHaveClass('translate-x-0');
		expect(screen.getByTitle('backdrop')).toHaveClass('opacity-60 pointer-events-auto');
	});

	it('should hide the menu when showMenu is false', () => {
		renderWithMocks(false);

		expect(screen.getByTitle('menu-mobile')).toHaveClass('translate-x-full');
		expect(screen.getByTitle('backdrop')).toHaveClass('opacity-0 pointer-events-none');
	});

	it('should close the menu when the close icon is clicked', async () => {
		const { mockSetShowMenu } = renderWithMocks();

		await userEvent.click(screen.getByTestId('close-icon'));
		expect(mockSetShowMenu).toHaveBeenCalledWith(false);
	});

	it('should close the menu when the backdrop is clicked', async () => {
		const { mockSetShowMenu } = renderWithMocks();

		await userEvent.click(screen.getByTitle('backdrop'));
		expect(mockSetShowMenu).toHaveBeenCalledWith(false);
	});

	it('should call the onClick function when a menu item is clicked', async () => {
		const { mockOnClick } = renderWithMocks();

		await userEvent.click(screen.getByTitle('menu-home'));
		expect(mockOnClick).toHaveBeenCalledTimes(1);
	});

	it('should call the onClick function when a menu item is selected and the Enter key is pressed', () => {
		const { mockOnClick } = renderWithMocks();

		const menuItem = screen.getByTitle('menu-home');
		fireEvent.keyDown(menuItem, { key: 'Enter', charCode: 13 });

		expect(mockOnClick).toHaveBeenCalledTimes(1);
	});

	it('should change showMenu to false when delete account is clicked', async () => {
		const { mockSetShowMenu } = renderWithMocks();

		await userEvent.click(screen.getByTitle('delete-account-btn'));
		expect(mockSetShowMenu).toHaveBeenCalledWith(false);
	});
});

function renderWithMocks(showMenu = true) {
	const mockRouterPush = vi.fn();
	const mockSetShowMenu = vi.fn();
	const mockOnClick = vi.fn();
	const mockPathname = '/';
	const mockMenuOptions = [
		{
			title: 'Home',
			id: 'menu-home',
			path: '/',
			icon: <div>Icon</div>,
			onClick: mockOnClick
		}
	];

	setupUseSessionMock();
	vi.mocked(useRouter).mockReturnValue({
		push: mockRouterPush
	} as unknown as ReturnType<typeof useRouter>);
	vi.mocked(usePathname).mockReturnValue(mockPathname);

	render(<MenuMobile showMenu={showMenu} setShowMenu={mockSetShowMenu} menuOptions={mockMenuOptions} />);

	return { mockSetShowMenu, mockOnClick };
}
