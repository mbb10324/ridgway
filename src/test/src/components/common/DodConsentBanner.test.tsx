import DodConsentBanner from '@/components/common/DodConsentBanner';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

describe('DodConsentBanner component tests', () => {
	it('should render the banner with the correct content when message is null', () => {
		render(<DodConsentBanner isLogoutMessage={false} />);

		expect(screen.getByText('STANDARD MANDATORY DOD NOTICE AND CONSENT')).toBeVisible();
		expect(screen.getByText(/YOU ARE ACCESSING A U.S. GOVERNMENT/i)).toBeVisible();
		expect(screen.getByRole('button', { name: 'I Consent' })).toBeVisible();
	});

	it('should hide the banner and backdrop when "I Consent" button is clicked', async () => {
		render(<DodConsentBanner isLogoutMessage={false} />);

		await userEvent.click(screen.getByRole('button', { name: 'I Consent' }));
		expect(screen.getByTitle('backdrop')).toHaveClass('opacity-0', 'pointer-events-none');
	});

	it('should show the backdrop when the banner is displayed and message is null', () => {
		render(<DodConsentBanner isLogoutMessage={false} />);

		const backdropElement = screen.getByTitle('backdrop');
		expect(backdropElement).toBeVisible();
	});

	it('should not render the banner when message is "logged-out"', () => {
		render(<DodConsentBanner isLogoutMessage={true} />);

		expect(screen.queryByTitle('modal')).toHaveClass('opacity-0');
	});
});
