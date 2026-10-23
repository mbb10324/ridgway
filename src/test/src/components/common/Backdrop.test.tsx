import { render, screen } from '@testing-library/react';
import Backdrop from '@/components/common/Backdrop';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

describe('Backdrop component tests', () => {
	it('should render the backdrop when show is true', () => {
		render(<Backdrop show={true} />);

		const backdropElement = screen.getByRole('presentation');
		expect(backdropElement).toHaveClass('opacity-60', 'pointer-events-auto');
	});

	it('should not render the backdrop when show is false', () => {
		render(<Backdrop show={false} />);

		const backdropElement = screen.getByRole('presentation');
		expect(backdropElement).toHaveClass('opacity-0', 'pointer-events-none');
	});

	it('should call onClick when backdrop is clicked', async () => {
		const handleClick = vi.fn();
		render(<Backdrop show={true} onClick={handleClick} />);

		await userEvent.click(screen.getByRole('presentation'));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('should apply the correct zIndex style', () => {
		render(<Backdrop show={true} zIndex='z-50' />);

		const backdropElement = screen.getByRole('presentation');
		expect(backdropElement).toHaveClass('z-50');
	});

	it('should render the backdrop with opacity-0 when transparent is true', () => {
		render(<Backdrop show={true} transparent />);

		const backdropElement = screen.getByRole('presentation');
		expect(backdropElement).toHaveClass('opacity-0');
	});
});
