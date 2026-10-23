import SplashDrawer from '@/components/splash/SplashDrawer';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('SplashDrawer component tests', () => {
	it('should contain static content', () => {
		render(<SplashDrawer />);

		expect(screen.getByText(/This is a demo/i)).toBeVisible();
		expect(screen.getByText(/for the password/i)).toBeVisible();
		expect(screen.getByRole('button')).toBeVisible();
		expect(screen.getByRole('heading', { name: 'Welcome!' })).toBeVisible();
	});
});
