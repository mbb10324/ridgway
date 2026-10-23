import { createValidNextAuthSession, setupUseSessionMock } from '@/test/test-helpers/test-helpers';
import { render, screen } from '@testing-library/react';
import UserInfo from '@/components/profile/UserInfo';
import { describe, expect } from 'vitest';

describe('UserInfo', () => {
	it('renders correctly', () => {
		renderWithMocks();

		expect(screen.getByTitle('user-info')).toBeVisible();
	});

	it('does not render the name header when the name	is null or an empty string', () => {
		// @ts-expect-error - user.name is intentionally null
		renderWithMocks({ user: { name: null, email: 'noName@email.com' } });

		expect(screen.queryByTitle('user-info')).not.toContainElement(screen.queryByRole('heading', { level: 3 }));
		expect(screen.getByTitle('user-info')).toContainElement(screen.getByText('noName@email.com'));
	});
});

function renderWithMocks(session = createValidNextAuthSession()) {
	setupUseSessionMock(session);
	render(<UserInfo user={session.user} />);
}
