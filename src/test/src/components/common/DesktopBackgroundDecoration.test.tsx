import DesktopBackgroundDecoration from '@/components/common/DesktopBackgroundDecoration';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('DesktopBackgroundDecoration component tests', () => {
	it('should render the decorations', () => {
		render(<DesktopBackgroundDecoration />);

		const bottomLeftBackdrop = screen.getByTitle('bottom-left-backdrop');
		const topRightBackdrop = screen.getByTitle('top-right-backdrop');
		expect(bottomLeftBackdrop).toBeVisible();
		expect(topRightBackdrop).toBeVisible();
	});
});
