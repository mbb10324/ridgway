import LogsListLoading from '@/components/status/LogsListLoading';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('LogsListError component test', () => {
	it('should render LogsListError', () => {
		render(<LogsListLoading />);

		const logsListLoading = screen.getAllByTitle('logs-list-loading')[0];
		expect(logsListLoading).toBeVisible();
	});
});
