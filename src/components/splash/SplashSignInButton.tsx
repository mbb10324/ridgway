'use client';

import { signIn } from 'next-auth/react';
import { env } from '@/env/client';

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
		<button
			onClick={handleSignIn}
			className='bg-custom-primary hover:bg-emerald-300 transition-all duration-300 ease-in-out font-semibold text-custom-dark-gray pl-3 py-2 text-lg rounded-lg w-full mt-20'
		>
			Sign In
		</button>
	);
}
