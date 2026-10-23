import { setupUseSessionMock } from '@/test/test-helpers/test-helpers';
import { fireEvent, render, screen } from '@testing-library/react';
import { usePathname, useRouter } from 'next/navigation';
import MenuDesktop from '@/components/menu/MenuDesktop';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/navigation', () => ({
	useRouter: vi.fn(),
	usePathname: vi.fn()
}));

vi.mock('@/components/common/UserInfo', () => ({
	__esModule: true,
	default: () => <div data-testid='menu-user-info'>User Info</div>
}));

describe('MenuDesktop component tests', () => {
	it('should render Home and Documentation links', () => {
		renderWithMocks();

		expect(screen.getByTitle('menu-home')).toBeVisible();
	});

	it('should call the onClick function when a menu item is clicked', async () => {
		const mockOnClick = renderWithMocks();

		await userEvent.click(screen.getByTitle('menu-home'));
		expect(mockOnClick).toHaveBeenCalledTimes(1);
	});

	it('should call the onClick function when a menu item is selected and the Enter key is pressed', () => {
		const mockOnClick = renderWithMocks();

		const menuItem = screen.getByTitle('menu-home');
		fireEvent.keyDown(menuItem, { key: 'Enter', charCode: 13 });

		expect(mockOnClick).toHaveBeenCalledTimes(1);
	});
});

function renderWithMocks() {
	const mockFunction = vi.fn();
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
		push: mockFunction
	} as unknown as ReturnType<typeof useRouter>);
	vi.mocked(usePathname).mockReturnValue(mockPathname);

	render(<MenuDesktop menuOptions={mockMenuOptions} />);

	return mockOnClick;
}
