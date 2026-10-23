import { setupUseSessionMock } from '@/test/test-helpers/test-helpers';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useSearchParams } from 'next/navigation';
import Splash from '@/components/splash/Splash';

vi.mock('next/navigation', () => ({
	useRouter: vi.fn(),
	useSearchParams: vi.fn()
}));

describe('Splash component tests', () => {
	it('should render the signin button and instructions', () => {
		renderWithMock();

		expect(screen.getByTitle('splash-drawer')).toBeVisible();
	});

	it('should render DodConsentBanner', () => {
		renderWithMock();
		expect(screen.getByText('STANDARD MANDATORY DOD NOTICE AND CONSENT')).toBeVisible();
	});

	it('should display header elements', () => {
		renderWithMock();

		expect(screen.getByTestId('header-component')).toBeVisible();
		expect(screen.getByRole('heading',{ level: 1, name: 'PRIMUS' })).toBeVisible();
		expect(screen.getByRole('heading',{ level: 3, name: 'XVIII Airborne Corps Starter Application' })).toBeVisible();
	});
});

function renderWithMock() {
	const mockUseSearchParams = vi.fn().mockReturnValue({
		get: vi.fn(() => null)
	});
	(useSearchParams as unknown as typeof mockUseSearchParams) = mockUseSearchParams;

	setupUseSessionMock();
	render(<Splash />);
}
