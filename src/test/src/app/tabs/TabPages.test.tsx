import { render, screen } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';
import Tab1 from '@/app/tabs/tab1/page';
import Tab2 from '@/app/tabs/tab2/page';
import Tab3 from '@/app/tabs/tab3/page';
import React from 'react';

vi.mock('@/components/common/DashboardWrapper', () => ({
	__esModule: true,
	default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('Tabs', () => {
	it('should render tab 1 component', () => {
		render(<Tab1 />);

		expect(screen.getByText(/Tab 1/i)).toBeInTheDocument();
	});

	it('should render tab 2 component', () => {
		render(<Tab2 />);

		expect(screen.getByText(/Tab 2/i)).toBeInTheDocument();
	});

	it('should render tab 3 component', () => {
		render(<Tab3 />);

		expect(screen.getByText(/Tab 3/i)).toBeInTheDocument();
	});
});
