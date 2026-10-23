import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setupUseSessionMock } from '@/test/test-helpers/test-helpers';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Header from '@/components/header/Header';

vi.mock('next/navigation', () => ({
	useRouter() {
		return {
			push: () => vi.fn(),
			replace: () => vi.fn()
		};
	},
	usePathname() {
		return '';
	}
}));

describe('header tests', () => {
	it('should show header content', () => {
		renderWithMock();

		expect(screen.getByTestId('header-logo')).toBeInTheDocument();
		expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
		expect(screen.getAllByRole('button', { name: 'Home' })).toHaveLength(1);
	});

	it('should open the menu when IoMenu is clicked', async () => {
		renderWithMock();

		await userEvent.click(screen.getByTestId('menu-icon'));
		expect(screen.getByTitle('menu-mobile')).toBeVisible();
	});
});

function renderWithMock() {
	const queryClient = new QueryClient();
	setupUseSessionMock();

	render(
		<QueryClientProvider client={queryClient}>
			<Header />
		</QueryClientProvider>
	);
}
