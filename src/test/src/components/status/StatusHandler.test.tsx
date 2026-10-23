import StatusHandler from '@/components/status/StatusHandler';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('StatusHandler component tests', () => {
	it('should render the loading component when status is pending', () => {
		render(
			<StatusHandler status='pending'>
				<div>Success Content</div>
			</StatusHandler>
		);

		expect(screen.getByTitle('loader')).toBeVisible();
	});

	it('should render the error component when status is error', () => {
		render(
			<StatusHandler status='error'>
				<div>Success Content</div>
			</StatusHandler>
		);

		expect(screen.getByText('An Error Occurred.')).toBeVisible();
	});

	it('should render children when status is success', () => {
		render(
			<StatusHandler status='success'>
				<div>Success Content</div>
			</StatusHandler>
		);

		expect(screen.getByText('Success Content')).toBeVisible();
	});

	it('should call onError when status is error', () => {
		const onErrorMock = vi.fn();
		render(
			<StatusHandler status='error' onError={onErrorMock}>
				<div>Success Content</div>
			</StatusHandler>
		);

		expect(onErrorMock).toHaveBeenCalled();
	});

	it('should call onSuccess when status is success', () => {
		const onSuccessMock = vi.fn();
		render(
			<StatusHandler status='success' onSuccess={onSuccessMock}>
				<div>Success Content</div>
			</StatusHandler>
		);

		expect(onSuccessMock).toHaveBeenCalled();
	});

	it('should render custom loading component when provided', () => {
		render(
			<StatusHandler status='pending' loadingComponent={<div data-testid='custom-loader'>Custom Loader</div>}>
				<div>Success Content</div>
			</StatusHandler>
		);

		expect(screen.getByTestId('custom-loader')).toBeVisible();
	});

	it('should render custom error component when provided', () => {
		render(
			<StatusHandler status='error' errorComponent={<div data-testid='custom-error'>Custom Error</div>}>
				<div>Success Content</div>
			</StatusHandler>
		);

		expect(screen.getByTestId('custom-error')).toBeVisible();
	});
});
