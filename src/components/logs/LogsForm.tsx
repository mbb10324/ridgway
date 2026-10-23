'use client';

import { type Sample } from '@prisma/client';
import useLogsForm from '@/hooks/useLogsForm';
import LogsFormContent from './LogsFormContent';

type LogsFormProps = {
	selected: Sample | undefined;
	setSelected: (selected: Sample | undefined) => void;
	setListUpdated: (listUpdated: boolean) => void;
};

export default function LogsForm(props: Readonly<LogsFormProps>) {
	const { selected, setSelected, setListUpdated } = props;
	const formUtils = useLogsForm({
		selected,
		setSelected,
		setListUpdated
	});

	return (
		<LogsFormContent
			formKey={selected?.id ? `form-${selected.id}` : 'form-new'}
			mode={selected ? 'edit' : 'create'}
			onCancel={() => setSelected(undefined)}
			submitButtonText={selected ? 'Save' : 'Add'}
			title={selected ? 'Edit Log' : 'Add A New Log'}
			formUtils={formUtils}
		/>
	);
}
