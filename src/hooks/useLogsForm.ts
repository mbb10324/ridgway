import {
	type DeepPartialSkipArrayKey,
	type FieldErrors,
	useForm,
	type UseFormHandleSubmit,
	type UseFormRegister,
	useWatch
} from 'react-hook-form';
import { formatDateForInput } from '@/utils/utils-helpers';
import { useMutation } from '@tanstack/react-query';
import { type Sample } from '@prisma/client';
import { toast } from 'react-toastify/unstyled';
import { routes } from '@/routes';
import { useEffect } from 'react';

type FormData = {
	weight: number;
	date: string;
	notes: string;
};

type useLogsFormParams = {
	selected: Sample | undefined;
	setSelected: (selected: Sample | undefined) => void;
	setListUpdated: (listUpdated: boolean) => void;
};

export type UseLogsFormReturn = {
	register: UseFormRegister<FormData>;
	handleSubmit: UseFormHandleSubmit<FormData, FormData>;
	errors: FieldErrors<FormData>;
	formValues: DeepPartialSkipArrayKey<FormData>;
	onSubmit: (data: FormData) => void;
	handleDelete: () => void;
};

export default function useLogsForm(params: useLogsFormParams): UseLogsFormReturn {
	const { selected, setSelected, setListUpdated } = params;

	// Form setup with react-hook-form
	// =====================================================
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
		control,
		clearErrors
	} = useForm<FormData>();

	const formValues = useWatch({ control });

	// Control form values when selected changes
	// =====================================================
	useEffect(() => {
		if (selected) {
			setValue('weight', selected.weight);
			setValue('date', formatDateForInput(selected.date));
			setValue('notes', selected.notes ?? '');
		} else {
			reset();
		}
		clearErrors();
	}, [selected, setValue, reset, clearErrors]);

	// Saving or adding a log
	// =====================================================
	const upsertMutation = useMutation({
		mutationFn: (data: FormData) => {
			const queryParam = selected ? `/${selected.id}` : '';
			return fetch(routes.sampleData + queryParam, {
				method: selected ? 'PUT' : 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then((response) => {
				if (!response.ok) {
					throw new Error('Failed to update logs.');
				}
				return response.json();
			});
		},
		onSuccess: () => {
			toast.success(selected ? 'Updated Logs!' : 'Added New Log!');
			setListUpdated(true);
			setSelected(undefined);
			reset();
		},
		onError: () => {
			toast.error('Failed to update logs.');
		}
	});

	function onSubmit(data: FormData) {
		if (
			selected &&
			selected.weight === data.weight &&
			formatDateForInput(selected.date) === data.date &&
			selected.notes === data.notes
		) {
			toast.info('No changes detected.');
			setSelected(undefined);
			return;
		}

		upsertMutation.mutate(data);
	}

	// Deleting a log
	// =====================================================
	const deleteMutation = useMutation({
		mutationFn: (id: number | undefined) => {
			const queryParam = `/${id}`;
			return fetch(routes.sampleData + queryParam, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			}).then((response) => {
				if (!response.ok) {
					throw new Error('Failed to delete entry.');
				}
				return response.json();
			});
		},
		onSuccess: () => {
			toast.success('Deleted Entry!');
			setListUpdated(true);
			setSelected(undefined);
		},
		onError: () => {
			toast.error('Failed to delete entry.');
		}
	});

	function handleDelete() {
		deleteMutation.mutate(selected?.id);
	}

	return {
		register,
		handleSubmit,
		errors,
		formValues,
		onSubmit,
		handleDelete
	};
}
