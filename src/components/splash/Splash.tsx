'use client';

import DodConsentBanner from '../common/DodConsentBanner';
import LogoutMessage from '../common/LogoutMessage';
import { useSearchParams } from 'next/navigation';
import SplashDrawer from './SplashDrawer';
// import Header from '../header/Header';

export default function Splash() {
	const params = useSearchParams();
	const message = params.get('message');
	const isLogoutMessage = message === 'logged-out';

	return (
		<div className='w-screen h-screen flex flex-col gap-4 relative overflow-auto'>
			<div className='h-4/6 flex justify-start flex-col mt-14'>
				{/* <Header disableMenu /> */}
				<div className='flex items-center justify-center gap-3 flex-col z-10 mt-20'>
					<h1 className='text-4xl lg:text-5xl font-bold text-center mb-4'>PRIMUS</h1>
					<h3 className='text-2xl flex lg:flex-row flex-col'>
						XVIII Airborne Corps
						<span>&nbsp;Starter Application</span>
					</h3>
				</div>
			</div>
			<SplashDrawer />
			<DodConsentBanner isLogoutMessage={isLogoutMessage} />
			<LogoutMessage isLogoutMessage={isLogoutMessage} />
		</div>
	);
}
