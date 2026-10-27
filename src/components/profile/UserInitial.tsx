'use client';

import { type Session } from 'next-auth';
import Svg from '@/components/svg/Svg';
import './profile.css';

type UserInitialProps = {
	size?: 'sm' | 'md' | 'lg';
	user: NonNullable<Session['user']>;
};

export default function UserInitial(props: Readonly<UserInitialProps>) {
	const { size = 'md', user } = props;
	const userInitial = (user.name?.[0] ?? '').toUpperCase();

	return (
		<div className={`profile-user-initial profile-user-initial-${size}`} title='user-initial'>
			{userInitial ? <h2>{userInitial}</h2> : <Svg.IconaMoonProfileFill viewBox='0 0 25 25' />}
		</div>
	);
}
