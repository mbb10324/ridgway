'use client';

import { signIn } from 'next-auth/react';
import { env } from '@/env/client';
import Button from '../button/Button';

const handleSignIn = () => {
	const providerId = env.NEXT_PUBLIC_PROVIDER_ID;
	if (providerId) {
		signIn(providerId);
	} else {
		signIn();
	}
};

export default function SplashSignInButton() {
	return (
		<Button primary='var(--pink)' secondary='var(--tan)' onClick={handleSignIn}>
			Sign In
		</Button>
	);
}
