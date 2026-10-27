import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import Header from '@/components/header/Header';

vi.mock('next/image', () => ({
	default: ({ alt }: { alt: string }) => <span aria-label={alt} />
}));

vi.mock('next/navigation', () => ({
	useRouter: () => ({ push: vi.fn() }),
	usePathname: () => '/'
}));

vi.mock('@/context/SessionWrapper', () => ({
	useSessionContext: () => ({ user: { name: 'Test User', email: 'test@example.com' } })
}));

vi.mock('@/components/profile/LastLogin', () => ({
	default: () => null
}));

it('opens the delete account modal from the menu', async () => {
	const { container } = render(
		<QueryClientProvider client={new QueryClient()}>
			<Header />
		</QueryClientProvider>
	);

	await userEvent.click(container.querySelector('.menu-btn') as HTMLElement);
	await userEvent.click(screen.getByTitle('delete-account-btn'));

	expect(screen.getByTitle('modal')).toHaveClass('modal--visible');
	expect(screen.getByText('Delete Account?')).toBeVisible();
	expect(container.querySelector('.menu')).toHaveClass('menu-container-closed');
});
