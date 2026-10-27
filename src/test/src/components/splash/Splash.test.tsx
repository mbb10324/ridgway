import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { useRouter, useSearchParams } from 'next/navigation';
import Splash from '@/components/splash/Splash';

vi.mock('next/navigation', () => ({
	useRouter: vi.fn(),
	useSearchParams: vi.fn()
}));

describe('Splash component tests', () => {
	it('should render the signin button and instructions', () => {
		renderWithMock();

		expect(screen.getByText('Sign In')).toBeVisible();
	});

	it('should render DodConsentBanner', () => {
		renderWithMock();
		expect(screen.getByText('STANDARD MANDATORY DOD NOTICE AND CONSENT')).toBeVisible();
	});

	it('shows the consent banner after the logout message is closed', async () => {
		renderWithMock('logged-out');

		const [consentModal, logoutModal] = screen.getAllByTitle('modal');
		expect(consentModal).toHaveClass('modal--hidden');
		expect(logoutModal).toHaveClass('modal--visible');
		expect(screen.queryByText('STANDARD MANDATORY DOD NOTICE AND CONSENT')).not.toBeInTheDocument();

		await userEvent.click(screen.getByText('Close'));

		expect(logoutModal).toHaveClass('modal--hidden');
		expect(consentModal).toHaveClass('modal--visible');
		expect(screen.getByText('I Consent')).toBeVisible();
	});

	it('shows the consent banner after the logout backdrop is clicked', async () => {
		renderWithMock('logged-out');

		const [consentBackdrop, logoutBackdrop] = screen.getAllByTitle('backdrop');
		await userEvent.click(logoutBackdrop);

		expect(logoutBackdrop).toHaveClass('backdrop--hidden');
		expect(consentBackdrop).toHaveClass('backdrop--visible');
		expect(screen.getByText('I Consent')).toBeVisible();
	});

	it('should display the ODS identity', () => {
		renderWithMock();

		expect(screen.getByRole('heading', { level: 1, name: 'ODS' })).toBeVisible();
		expect(screen.getByText('XVIII Airborne Corps')).toBeVisible();
		expect(screen.getByText('Built for the Mission. Driven by the Problem.')).toBeVisible();
	});
});

function renderWithMock(message: string | null = null) {
	vi.mocked(useSearchParams).mockReturnValue({
		get: vi.fn(() => message)
	} as unknown as ReturnType<typeof useSearchParams>);
	vi.mocked(useRouter).mockReturnValue({
		replace: vi.fn()
	} as unknown as ReturnType<typeof useRouter>);

	render(<Splash />);
}
