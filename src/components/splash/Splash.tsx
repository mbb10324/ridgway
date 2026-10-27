'use client';

import DodConsentBanner from '../common/DodConsentBanner';
import LogoutMessage from '../common/LogoutMessage';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import content from '../../content.json';
import './splash.css';
import SplashSignInButton from './SplashSignInButton';
import Image from 'next/image';

export default function Splash() {
	const params = useSearchParams();
	const message = params.get('message');
	const isLogoutMessage = message === 'logged-out';
	const [showLogoutMessage, setShowLogoutMessage] = useState(isLogoutMessage);

	return (
		<div className='splash'>
			<div className='splash-hero'>
				<Image src='/ridgway.png' alt='Revel Logo' width={140} height={100} sizes='(max-width: 900px) 150px, 200px' />
				<div className='splash-hero-content'>
					<p className='splash-eyebrow'>XVIII Airborne Corps</p>
					<h1>{content.general.unitName}</h1>
					<p className='splash-tagline'>{content.home.heroText}</p>
				</div>
				<SplashSignInButton />
			</div>
			<DodConsentBanner isLogoutMessage={showLogoutMessage} />
			<LogoutMessage isLogoutMessage={isLogoutMessage} onClose={() => setShowLogoutMessage(false)} />
		</div>
	);
}
