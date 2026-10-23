import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useLogsForm from '@/hooks/useLogsForm';
import { useMutation } from '@tanstack/react-query';

vi.mock('@tanstack/react-query', () => ({
	useMutation: vi.fn()
}));
vi.mock('react-toastify', () => ({
	toast: {
		success: vi.fn(),
		error: vi.fn(),
		info: vi.fn()
	}
}));
vi.mock('@/utils/helpers', () => ({
	formatDateForInput: vi.fn()
}));

describe('useLogsForm', () => {
	const setSelectedMock = vi.fn();
	const setListUpdatedMock = vi.fn();
	const sampleSelected = {
		id: 1,
		weight: 70,
		date: new Date('2023-01-01'),
		notes: 'Sample note'
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should initialize form with selected data', () => {
		vi.mock('@/utils/utils-helpers', () => ({
			formatDateForInput: vi.fn().mockReturnValue('2023-01-01')
		}));
		const { result } = renderHook(() =>
			useLogsForm({
				selected: sampleSelected,
				setSelected: setSelectedMock,
				setListUpdated: setListUpdatedMock
			})
		);

		expect(result.current.formValues.weight).toBe(70);
		expect(result.current.formValues.date).toBe('2023-01-01');
		expect(result.current.formValues.notes).toBe('Sample note');
	});

	it('should reset form when no selected data is provided', () => {
		const { result } = renderHook(() =>
			useLogsForm({
				selected: undefined,
				setSelected: setSelectedMock,
				setListUpdated: setListUpdatedMock
			})
		);

		expect(result.current.formValues.weight).toBeUndefined();
		expect(result.current.formValues.date).toBeUndefined();
		expect(result.current.formValues.notes).toBeUndefined();
	});

	it('should call mutate function on form submission', async () => {
		const mutateMock = vi.fn();
		vi.mocked(useMutation).mockReturnValue({
			mutate: mutateMock
		} as unknown as ReturnType<typeof useMutation>);

		const { result } = renderHook(() =>
			useLogsForm({
				selected: sampleSelected,
				setSelected: setSelectedMock,
				setListUpdated: setListUpdatedMock
			})
		);

		const formData = {
			weight: 75,
			date: '2023-01-02',
			notes: 'Updated note'
		};

		// eslint-disable-next-line
		await act(async () => {
			result.current.onSubmit(formData);
		});

		expect(mutateMock).toHaveBeenCalledWith(formData);
	});

	it('should call mutate function on log deletion', () => {
		const mutateMock = vi.fn();
		vi.mocked(useMutation).mockReturnValue({
			mutate: mutateMock
		} as unknown as ReturnType<typeof useMutation>);

		const { result } = renderHook(() =>
			useLogsForm({
				selected: sampleSelected,
				setSelected: setSelectedMock,
				setListUpdated: setListUpdatedMock
			})
		);

		act(() => {
			result.current.handleDelete();
		});

		expect(mutateMock).toHaveBeenCalledWith(sampleSelected.id);
	});
});
