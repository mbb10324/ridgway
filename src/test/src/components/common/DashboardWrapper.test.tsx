import ReactQueryClientProvider from '@/components/common/ReactQueryClientProvider';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import DashboardWrapper from '@/components/common/DashboardWrapper';

vi.mock('@/components/header/Header', () => ({
	__esModule: true,
	default: () => <div data-testid='mock-header'>Header Component</div>
}));

describe('DashboardWrapper component tests', () => {
	it('should render the wrapper properly', () => {
		render(
			<ReactQueryClientProvider>
				<DashboardWrapper>
					<div data-testid='child-component'>Test Content</div>
				</DashboardWrapper>
			</ReactQueryClientProvider>
		);

		expect(screen.getByTestId('mock-header')).toBeVisible();
		expect(screen.getByTestId('child-component')).toBeVisible();
		expect(screen.getByText('Test Content')).toBeVisible();
	});
});
