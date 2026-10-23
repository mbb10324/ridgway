'use client';

import { type Session } from 'next-auth';
import Svg from '@/components/svg/Svg';

type UserInitialProps = {
	size?: 'sm' | 'md' | 'lg';
	user: NonNullable<Session['user']>;
};

export default function UserInitial(props: Readonly<UserInitialProps>) {
	const { size = 'md', user } = props;
	const userInitial = (user.name?.[0] ?? '').toUpperCase();

	function determineLetterStyle() {
		switch (size) {
			case 'lg':
				return 'text-2xl font-semibold';
			case 'md':
				return 'text-xl';
			case 'sm':
				return 'text-lg';
		}
	}

	function determineCircleStyle() {
		let defaultSyle = 'flex items-center justify-center rounded-full bg-zinc-800 border-white ';
		switch (size) {
			case 'lg':
				defaultSyle += 'w-14 h-14 border-2';
				break;
			case 'md':
				defaultSyle += 'w-12 h-12 border';
				break;
			case 'sm':
				defaultSyle += 'w-10 h-10 border';
				break;
		}
		return defaultSyle;
	}

	return (
		<div className={determineCircleStyle()} title='user-initial'>
			{userInitial ? (
				<h2 className={determineLetterStyle()}>{userInitial}</h2>
			) : (
				<Svg.IconaMoonProfileFill className={determineLetterStyle()} viewBox='0 0 25 25' />
			)}
		</div>
	);
}
