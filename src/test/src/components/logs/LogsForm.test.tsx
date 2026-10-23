import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import LogsForm from '@/components/logs/LogsForm';
import useLogsForm from '@/hooks/useLogsForm';
import { type Sample } from '@prisma/client';

vi.mock('@/hooks/useLogsForm', () => ({
	default: vi.fn()
}));

describe('LogsForm component tests', () => {
	const setSelectedMock = vi.fn();
	const setListUpdatedMock = vi.fn();
	const mockHandleSubmit = vi.fn();
	const mockSubmit = vi.fn();
	const mockDelete = vi.fn();

	const sampleLog: Sample = {
		id: 1,
		weight: 150,
		date: new Date('2024-01-01'),
		notes: 'Sample note'
	};

	const baseMockLogsForm = {
		register: vi.fn(),
		handleSubmit: mockHandleSubmit,
		errors: {},
		onSubmit: mockSubmit,
		handleDelete: mockDelete
	};

	const mockUseLogsFormWithSelected = {
		...baseMockLogsForm,
		formValues: {
			weight: 150,
			date: '2024-01-01',
			notes: 'Sample note'
		}
	};

	const mockUseLogsFormWithNoSelected = {
		...baseMockLogsForm,
		formValues: {
			weight: 0,
			date: '',
			notes: ''
		}
	};

	it('renders LogsFormContent with empty fields when no log is selected', () => {
		vi.mocked(useLogsForm).mockReturnValue(mockUseLogsFormWithNoSelected);
		render(<LogsForm selected={undefined} setSelected={setSelectedMock} setListUpdated={setListUpdatedMock} />);

		expect(screen.getByLabelText('Weight')).toHaveValue(null);
		expect(screen.getByLabelText('Date')).toHaveValue(new Date().toISOString().split('T')[0]);
		expect(screen.getByLabelText('Notes')).toHaveValue('');
	});

	it('renders LogsFormContent with filled fields when a log is selected', () => {
		vi.mocked(useLogsForm).mockReturnValue(mockUseLogsFormWithSelected);
		render(<LogsForm selected={sampleLog} setSelected={setSelectedMock} setListUpdated={setListUpdatedMock} />);

		expect(screen.getByLabelText('Weight')).toHaveValue(sampleLog.weight);
		expect(screen.getByLabelText('Date')).toHaveValue('2024-01-01');
		expect(screen.getByLabelText('Notes')).toHaveValue(sampleLog.notes);
	});

	it('handles form submission', async () => {
		vi.mocked(useLogsForm).mockReturnValue(mockUseLogsFormWithNoSelected);

		const { container } = render(
			<LogsForm selected={undefined} setSelected={setSelectedMock} setListUpdated={setListUpdatedMock} />
		);

		fireEvent.submit(container.querySelector('form')!);

		await waitFor(() => {
			expect(mockHandleSubmit).toHaveBeenCalled();
		});
	});

	it('calls setSelected with undefined when the "Cancel" button is clicked', async () => {
		vi.mocked(useLogsForm).mockReturnValue(mockUseLogsFormWithSelected);
		render(<LogsForm selected={sampleLog} setSelected={setSelectedMock} setListUpdated={setListUpdatedMock} />);

		await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
		expect(setSelectedMock).toHaveBeenCalledWith(undefined);
	});

	it('calls handleDelete when the "Delete Entry" button is clicked', async () => {
		vi.mocked(useLogsForm).mockReturnValue(mockUseLogsFormWithSelected);
		render(<LogsForm selected={sampleLog} setSelected={setSelectedMock} setListUpdated={setListUpdatedMock} />);

		await userEvent.click(screen.getByRole('button', { name: 'Delete Entry' }));
		await waitFor(() => {
			expect(mockDelete).toHaveBeenCalled();
		});
	});

	it('displays validation errors', async () => {
		const mockUseLogsFormWithError = {
			...baseMockLogsForm,
			errors: {
				weight: { message: 'Weight is required' },
				date: { message: 'Date is required' },
				notes: { message: 'Notes are required' }
			},
			formValues: {
				weight: 0,
				date: '',
				notes: ''
			}
		};

		// @ts-expect-error - We are mocking the error shape
		vi.mocked(useLogsForm).mockReturnValue(mockUseLogsFormWithError);

		const { container } = render(
			<LogsForm selected={undefined} setSelected={setSelectedMock} setListUpdated={setListUpdatedMock} />
		);

		fireEvent.submit(container.querySelector('form')!);

		await waitFor(() => {
			expect(screen.getByText('Weight is required')).toBeVisible();
			expect(screen.getByText('Date is required')).toBeVisible();
			expect(screen.getByText('Notes are required')).toBeVisible();
		});
	});
});
