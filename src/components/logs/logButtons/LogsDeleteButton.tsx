export default function LogsDeleteButton({ onClick }: Readonly<{ onClick: () => void }>) {
	return (
		<button
			className='bg-red-500/20 rounded-lg py-1 px-6 text-red-300 text-sm font-semibold hover:bg-red-400/20 transition-all duration-300 ease-in-out'
			type='button'
			onClick={onClick}
		>
			Delete Entry
		</button>
	);
}
