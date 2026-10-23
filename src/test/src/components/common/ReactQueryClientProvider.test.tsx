import ReactQueryClientProvider from '@/components/common/ReactQueryClientProvider';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('ReactQueryClientProvider component tests', () => {
	it('should render children within the QueryClientProvider', () => {
		render(
			<ReactQueryClientProvider>
				<div data-testid='child-component'>Child Component</div>
			</ReactQueryClientProvider>
		);

		const child = screen.getByTestId('child-component');
		expect(child).toBeVisible();
	});
});
