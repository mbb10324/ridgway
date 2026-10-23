import { render, screen } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';
import Tabs from '@/app/tabs/Tabs';

vi.mock('@/components/common/DashboardWrapper', () => ({
	__esModule: true,
	default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('Tabs', () => {
	it('should render the tabs component with proper message form props', () => {
		render(<Tabs page='Tab 1' />);

		expect(screen.getByText(/Tab 1/i)).toBeInTheDocument();
	});
});
