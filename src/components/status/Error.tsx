'use client';

import { signOut } from 'next-auth/react';
import Svg from '../svg/Svg';

type ErrorProps = {
	title: string;
	message: string;
	type: 'auth' | 'not-found' | 'unexpected';
	onClick?: () => void;
};

export default function ErrorContent(props: Readonly<ErrorProps>) {
	const { title, message, type, onClick } = props;

	function handleOnClick() {
		if (onClick) {
			onClick();
		} else {
			signOut({ callbackUrl: '/?message=logged-out' });
		}
	}

	return (
		<div className='flex flex-col items-center justify-center h-screen w-full gap-8 p-8'>
			<Svg.OhNo size={300} viewBox='0 0 316 283' color='null' />
			<h1 className='text-3xl font-bold mt-12'>{title}</h1>
			<h2 className='text-sm fade-in'>{message}</h2>
			<button
				className='max-w-xs w-full text-sm font-bold text-custom-dark-gray bg-custom-primary rounded-4xl py-3 px-4'
				onClick={handleOnClick}
			>
				{type === 'auth' ? 'Back To Sign In' : 'Go Back'}
			</button>
		</div>
	);
}
