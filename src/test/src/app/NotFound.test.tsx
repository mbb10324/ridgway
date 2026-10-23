import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import NotFound from '@/app/not-found';

vi.mock('next/navigation', () => ({
	useRouter: vi.fn()
}));

describe('NotFound Component', () => {
	it('should render the Error component with correct title and message', () => {
		render(<NotFound />);

		expect(screen.getByText('Page Not Found')).toBeVisible();
		expect(screen.getByText('Sorry, this page does not exist!')).toBeVisible();
	});

	it('should render a button to go back', () => {
		render(<NotFound />);

		expect(screen.getByRole('button', { name: 'Go Back' })).toBeVisible();
	});
});
