export default function LogsSubmitButton({ title }: Readonly<{ title: string }>) {
	return (
		<button
			className='text-custom-dark-gray bg-custom-primary hover:bg-emerald-300 transition-colors duration-500 ease-in-out rounded-3xl text-sm font-semibold py-1 lg:py-2 mt-8'
			type='submit'
		>
			{title}
		</button>
	);
}
