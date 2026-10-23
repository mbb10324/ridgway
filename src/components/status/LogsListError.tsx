export default function LogsListError() {
	return (
		<div className='flex flex-col items-center w-full justify-center grow fade-in' title='logs-list-error'>
			<p className='text-red-300'>Error retrieving log entries</p>
		</div>
	);
}
