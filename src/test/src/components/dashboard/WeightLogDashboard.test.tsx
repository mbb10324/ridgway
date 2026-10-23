import { type SessionContextValue, SessionProvider, useSession } from 'next-auth/react';
import WeightLogDashboard from '@/components/dashboard/WeightLogDashboard';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';

vi.mock('next-auth/react', async (importOriginal) => {
	const actual = await importOriginal();
	// eslint-disable-next-line
	return {
		// @ts-ignore - We are mocking the useSession hook
		...actual,
		useSession: vi.fn()
	};
});

vi.mock('next/navigation', () => ({
	useRouter: vi.fn()
}));

vi.mock('@/components/dashboard/WeightLogDashboardHeader', () => ({
	__esModule: true,
	default: () => <div data-testid='dashboard-header'>Dashboard Header</div>
}));

vi.mock('@/components/common/LastLogin', () => ({
	__esModule: true,
	default: () => <div data-testid='last-login-display'>Last Login Display</div>
}));

vi.mock('@/components/logs/LogsForm', () => ({
	__esModule: true,
	default: () => <div data-testid='logs-form'>Logs Form</div>
}));

vi.mock('@/components/logs/LogsList', () => ({
	__esModule: true,
	default: () => <div data-testid='logs-list'>Logs List</div>
}));

describe('WeightLogDashboard component tests', () => {
	beforeEach(() => {
		vi.mocked(useSession).mockReturnValue({
			status: 'authenticated',
			data: {
				user: {
					name: 'John Doe',
					email: 'john.doe@example.com',
					isActive: true
				},
				expires: new Date('2023-08-25T12:34:56Z')
			}
		} as SessionContextValue);

		vi.mocked(useRouter).mockReturnValue({
			push: vi.fn(),
			replace: vi.fn(),
			pathname: '/',
			query: {}
		} as unknown as ReturnType<typeof useRouter>);
	});

	it('should render the WeightLogDashboard component with all child components', () => {
	

		render(
			<SessionProvider>
				<WeightLogDashboard/>
			</SessionProvider>
		);

		expect(screen.getByTestId('dashboard-header')).toBeVisible();
		expect(screen.getByTestId('last-login-display')).toBeVisible();
		expect(screen.getByTestId('logs-list')).toBeVisible();
	});

	it('should not render Modal when first loaded', () => {


		render(
			<SessionProvider>
				<WeightLogDashboard/>
			</SessionProvider>
		);

		expect(screen.queryByTitle('modal')).not.toBeInTheDocument();
	});
});
