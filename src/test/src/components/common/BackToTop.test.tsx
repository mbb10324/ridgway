import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import BackToTop from '@/components/common/BackToTop';
import userEvent from '@testing-library/user-event';

describe('BackToTop', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		window.scrollTo = vi.fn();
		Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
	});

	it('should not be visible initially', () => {
		render(<BackToTop />);

		const button = screen.getByRole('button');
		expect(button.parentElement).toHaveClass('opacity-0 pointer-events-none');
	});

	it('should become visible after scrolling down', () => {
		render(<BackToTop />);

		window.scrollY = 200;
		fireEvent.scroll(window);

		const button = screen.getByRole('button');
		expect(button.parentElement).toHaveClass('opacity-1 pointer-events-auto');
	});

	it('should become hidden after scrolling back up', () => {
		render(<BackToTop />);

		// Simulate scroll event to make scrollY > 150 and show the button
		window.scrollY = 200;
		fireEvent.scroll(window);

		const button = screen.getByRole('button');
		expect(button.parentElement).toHaveClass('opacity-1 pointer-events-auto');

		// Simulate scroll event to make scrollY <= 150 and hide the button
		window.scrollY = 100;
		fireEvent.scroll(window);

		expect(button.parentElement).toHaveClass('opacity-0 pointer-events-none');
	});

	it('should scroll to the top when clicked', async () => {
		render(<BackToTop />);

		// Simulate scroll event to make button visible
		window.scrollY = 200;
		fireEvent.scroll(window);

		await userEvent.click(screen.getByRole('button'));

		expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
	});
});
