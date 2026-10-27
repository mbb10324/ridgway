import { createValidNextAuthSession, setupUseSessionMock } from '@/test/test-helpers/test-helpers';
import UserInitial from '@/components/profile/UserInitial';
import { render, screen } from '@testing-library/react';
import { describe, expect } from 'vitest';

describe('UserInitial', () => {
	it('renders the first letter as the initial for the profile icon', () => {
		renderWithMocks();

		expect(screen.getByTitle('user-initial')).toHaveTextContent('J');
	});

	it('renders a placeholder svg when user does not have username associated to the account', () => {
		// @ts-expect-error - user.name is intentionally null
		renderWithMocks({ user: { name: null } }, 'md');

		expect(screen.queryByTitle('user-initial')).toContainElement(screen.getByTestId('svg'));
	});

	it('renders with small size when size is sm', () => {
		renderWithMocks(createValidNextAuthSession(), 'sm');

		expect(screen.getByTitle('user-initial')).toHaveClass('profile-user-initial-sm');
	});
});

function renderWithMocks(session = createValidNextAuthSession(), size: 'sm' | 'md' | 'lg' = 'md') {
	setupUseSessionMock(session);
	render(<UserInitial user={session.user} size={size} />);
}
