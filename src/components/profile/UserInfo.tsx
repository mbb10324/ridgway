'use client';

import { type Session } from 'next-auth';
import './profile.css';

type UserInfoProps = {
	user: NonNullable<Session['user']>;
	center?: boolean;
};

export default function UserInfo(props: Readonly<UserInfoProps>) {
	const { user, center } = props;

	return (
		<div className={`profile-user-info ${center ? 'profile-user-info-centered' : ''}`} title='user-info'>
			{user.name && <h3>{user.name}</h3>}
			<p>{user.email}</p>
		</div>
	);
}
