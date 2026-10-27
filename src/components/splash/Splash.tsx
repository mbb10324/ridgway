'use client';

import DodConsentBanner from '../common/DodConsentBanner';
import LogoutMessage from '../common/LogoutMessage';
import { useSearchParams } from 'next/navigation';
import content from '../../content.json';
import './splash.css';
import SplashSignInButton from './SplashSignInButton';

export default function Splash() {
	const params = useSearchParams();
	const message = params.get('message');
	const isLogoutMessage = message === 'logged-out';

	return (
		<div className='splash'>
			<div className='splash-hero'>
				<div className='splash-hero-content'>
					<p className='splash-eyebrow'>XVIII Airborne Corps</p>
					<h1>{content.general.unitName}</h1>
					<p className='splash-tagline'>{content.home.heroText}</p>
				</div>
				<SplashSignInButton />
			</div>
			<DodConsentBanner isLogoutMessage={isLogoutMessage} />
			<LogoutMessage isLogoutMessage={isLogoutMessage} />
		</div>
	);
}
