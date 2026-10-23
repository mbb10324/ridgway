export default function DesktopBackgroundDecoration() {
	return (
		<>
			<div className='fixed bottom-0 left-0 backdrop-bloom' title='bottom-left-backdrop' />
			<div className='fixed top-0 right-0 backdrop-bloom hidden lg:block' title='top-right-backdrop' />
		</>
	);
}
