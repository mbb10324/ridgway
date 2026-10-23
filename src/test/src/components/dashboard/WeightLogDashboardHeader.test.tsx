import { createValidNextAuthSession, setupUseSessionMock, createUser } from '@/test/test-helpers/test-helpers';
import WeightLogDashboardHeader from '@/components/dashboard/WeightLogDashboardHeader';
import { render, screen } from '@testing-library/react';
import { formatDate } from '@/utils/utils-helpers';
import { describe, expect, it } from 'vitest';

describe('DashboardHeader component tests', () => {
	it('should render the users name correctly', () => {
		renderHeaderWithMocks();

		expect(screen.getByText('Welcome, John Doe!')).toBeVisible();
	});

	it('should render welcome user when user name is null, and email is present', () => {
		renderHeaderWithMocks({
			// @ts-expect-error - user.name is intentionally null
			user: {
				email: 'john.doe@example.com'
			}
		});

		expect(screen.getByText('Welcome, User!')).toBeVisible();
	});

	it('should render welcome user when user name is an empty string, and email is present', () => {
		renderHeaderWithMocks(createValidNextAuthSession({ user: createUser({ name: '' }) }));

		expect(screen.getByText('Welcome, User!')).toBeVisible();
	});

	it('should render the formatted date correctly', async () => {
		renderHeaderWithMocks();

		const expectedDate = formatDate(new Date());

		expect(await screen.findByText(expectedDate)).toBeVisible();
	});
});

function renderHeaderWithMocks(session = createValidNextAuthSession()) {
	setupUseSessionMock(session);

	render(<WeightLogDashboardHeader />);
}
