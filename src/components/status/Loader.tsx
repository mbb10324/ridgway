export default function Loader() {
	return (
		<div className='w-full h-screen flex items-center justify-center' title='loader'>
			<video autoPlay loop muted className='w-32 h-32 lg:w-40 lg:h-40'>
				<source src='/loader.webm' />
			</video>
		</div>
	);
}
