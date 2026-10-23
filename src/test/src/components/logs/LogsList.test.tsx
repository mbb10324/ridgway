import useLogsList, { type SampleWithDifference } from '@/hooks/useLogsList';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import LogsList from '@/components/logs/LogsList';

vi.mock('@/hooks/useLogsList');

describe('LogsList Component', () => {
	const mockSetSelected = vi.fn();
	const mockSetListUpdated = vi.fn();

	const mockLogs: SampleWithDifference[] = [
		{ id: 1, weight: 180, date: new Date(), notes: '', difference: -2 },
		{ id: 2, weight: 182, date: new Date(), notes: '', difference: -1 },
		{ id: 3, weight: 183, date: new Date(), notes: '', difference: 0 }
	];

	beforeEach(() => {
		mockSetSelected.mockClear();
		mockSetListUpdated.mockClear();
	});

	it('should display loading component when data is loading', () => {
		// @ts-ignore - We are expecting a type error cause data is null
		vi.mocked(useLogsList).mockReturnValue({ status: 'pending', data: null });
		render(<LogsList setSelected={mockSetSelected} listUpdated={false} setListUpdated={mockSetListUpdated} />);

		expect(screen.getAllByTitle('logs-list-loading')[0]).toBeVisible();
	});

	it('should display error component when data fetch fails', () => {
		// @ts-ignore - We are expecting a type error cause data is null
		vi.mocked(useLogsList).mockReturnValue({ status: 'error', data: null });
		render(<LogsList setSelected={mockSetSelected} listUpdated={false} setListUpdated={mockSetListUpdated} />);

		expect(screen.getByTitle('logs-list-error')).toBeVisible();
	});

	it('should display logs when data is loaded successfully', () => {
		vi.mocked(useLogsList).mockReturnValue({ status: 'success', data: mockLogs });
		render(<LogsList setSelected={mockSetSelected} listUpdated={false} setListUpdated={mockSetListUpdated} />);

		expect(screen.getByText(/180 lbs/i)).toBeVisible();
		expect(screen.getByText(/182 lbs/i)).toBeVisible();
		expect(screen.getByText(/183 lbs/i)).toBeVisible();
	});

	it('should call setSelected when a log item is clicked', async () => {
		vi.mocked(useLogsList).mockReturnValue({ status: 'success', data: mockLogs });
		render(<LogsList setSelected={mockSetSelected} listUpdated={false} setListUpdated={mockSetListUpdated} />);

		await userEvent.click(screen.getByText(/180 lbs/i));
		expect(mockSetSelected).toHaveBeenCalledWith(mockLogs[0]);
	});

	it('should call setSelected when a log item is selected and the Enter key is pressed', () => {
		vi.mocked(useLogsList).mockReturnValue({ status: 'success', data: mockLogs });
		render(<LogsList setSelected={mockSetSelected} listUpdated={false} setListUpdated={mockSetListUpdated} />);

		const logItem = screen.getByText(/180 lbs/i);
		fireEvent.keyDown(logItem, { key: 'Enter', code: 'Enter', charCode: 13 });
		expect(mockSetSelected).toHaveBeenCalledWith(mockLogs[0]);
	});

	it('should toggle between "Show More" and "Show Less"', async () => {
		vi.mocked(useLogsList).mockReturnValue({ status: 'success', data: mockLogs });

		render(<LogsList setSelected={mockSetSelected} listUpdated={false} setListUpdated={mockSetListUpdated} />);

		const showMoreButton = screen.getByRole('button', { name: /show more/i });
		expect(showMoreButton).toBeVisible();
		await userEvent.click(showMoreButton);
		await waitFor(() => {
			expect(showMoreButton.textContent).toBe('Show Less');
		});
		await userEvent.click(showMoreButton);
		await waitFor(() => {
			expect(showMoreButton.textContent).toBe('Show More');
		});
	});

	it('should reset listUpdated flag when it is true', () => {
		vi.mocked(useLogsList).mockReturnValue({ status: 'success', data: mockLogs });
		render(<LogsList setSelected={mockSetSelected} listUpdated={true} setListUpdated={mockSetListUpdated} />);

		expect(mockSetListUpdated).toHaveBeenCalledWith(false);
	});
});
