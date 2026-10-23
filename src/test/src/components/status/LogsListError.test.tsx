import LogsListError from '@/components/status/LogsListError';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('LogsListError component test', () => {
	it('should render LogsListError', () => {
		render(<LogsListError />);

		const logsListError = screen.getByTitle('logs-list-error');
		expect(logsListError).toBeVisible();
	});
});
