import SplashSignInButton from './SplashSignInButton';

export default function SplashDrawer() {
	return (
		<div title='splash-drawer' className='absolute bottom-0 left-0 w-full flex justify-center h-1/2 z-20'>
			<div className='shadow-custom-light w-full lg:w-2/6 h-full lg:h-fit bg-custom-transparent-medium-gray backdrop-blur-lg transition-all duration-700 ease-in-out rounded-tl-4xl rounded-tr-4xl lg:rounded-4xl p-8 lg:p-12'>
				<h2 className='text-2xl text-center font-semibold pt-2'>Welcome!</h2>
				<p className='text-sm font-thin text-center pt-8'>
					This is a demo of our pre-built authentication mechanism, which is bundled with security tools necessary to ensure
					STIG compliance.
					<strong> Click below</strong> to sign into the test user account, and use <strong>&quot;user&quot;</strong> as the
					username, and
					<strong> &quot;password&quot;</strong> for the password.
				</p>
				<SplashSignInButton />
			</div>
		</div>
	);
}
