import LogsDeleteButton from '@/components/logs/logButtons/LogsDeleteButton';
import LogsSubmitButton from '@/components/logs/logButtons/LogsSubmitButton';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

describe('Logs Button Components', () => {
	it('should call onClick when LogsDeleteButton is clicked', async () => {
		const handleClick = vi.fn();
		render(<LogsDeleteButton onClick={handleClick} />);

		await userEvent.click(screen.getByText('Delete Entry'));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('should render the title correctly in LogsSubmitButton', () => {
		const title = 'Submit Log';
		render(<LogsSubmitButton title={title} />);

		const button = screen.getByText(title);
		expect(button).toBeVisible();
	});
});
