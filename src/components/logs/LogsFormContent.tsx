'use client';

import LogsSubmitButton from './logButtons/LogsSubmitButton';
import LogsDeleteButton from './logButtons/LogsDeleteButton';
import { type UseLogsFormReturn } from '@/hooks/useLogsForm';
import Input from '../common/Input';

type LogsFormProps = {
	mode: 'create' | 'edit';
	formKey: string;
	onCancel: () => void;
	submitButtonText: string;
	title: string;
	formUtils: UseLogsFormReturn;
};

export default function LogsFormContent({
	mode,
	formKey,
	onCancel,
	submitButtonText,
	title,
	formUtils
}: Readonly<LogsFormProps>) {
	const { register, handleSubmit, errors, formValues, onSubmit, handleDelete } = formUtils;

	return (
		<>
			{mode === 'edit' && (
				<div className='flex flex-row w-full justify-between items-center'>
					<button className='underline' onClick={onCancel}>
						Cancel
					</button>
					<LogsDeleteButton onClick={handleDelete} />
				</div>
			)}
			<form
				key={formKey}
				className={`w-full h-full lg:h-fit flex flex-col gap-3 fade-in ${mode === 'edit' ? 'lg:max-w-(400px)' : ''}`}
				onSubmit={handleSubmit(onSubmit)}
				noValidate
			>
				<h1 className={`text-lg ${mode === 'edit' ? 'text-center' : 'text-left'}`}>{title}</h1>
				<Input
					id={mode === 'edit' ? 'EditWeight' : 'Weight'}
					label='Weight'
					inputType='number'
					placeholder='lbs'
					defaultValue={formValues.weight || ''}
					error={errors.weight?.message}
					{...register('weight', {
						required: 'Weight is required',
						valueAsNumber: true,
						max: { value: 600, message: 'Weight cannot exceed 600 lbs' },
						min: { value: 0, message: 'Weight cannot be negative' }
					})}
				/>
				<Input
					id={mode === 'edit' ? 'EditDate' : 'Date'}
					label='Date'
					inputType='date'
					defaultValue={formValues.date || new Date().toISOString().split('T')[0]}
					error={errors.date?.message}
					{...register('date', { required: 'Date is required' })}
				/>
				<Input
					id={mode === 'edit' ? 'EditNotes' : 'Notes'}
					label='Notes'
					inputType='textarea'
					defaultValue={formValues.notes || ''}
					error={errors.notes?.message}
					placeholder='Here you can add any additional notes about this entry.'
					{...register('notes', {
						maxLength: { value: 150, message: 'Notes cannot exceed 150 characters' }
					})}
				/>
				<LogsSubmitButton title={submitButtonText} />
			</form>
		</>
	);
}
