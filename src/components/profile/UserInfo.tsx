'use client';

import { type Session } from 'next-auth';

type UserInfoProps = {
	user: NonNullable<Session['user']>;
	center?: boolean;
};

export default function UserInfo(props: Readonly<UserInfoProps>) {
	const { user, center } = props;

	return (
		<div className={`flex flex-col ${center ? 'items-center' : 'items-start'}`} title='user-info'>
			{user.name && <h3 className='text-lg lg:text-base font-medium'>{user.name}</h3>}
			<p className='text-xs'>{user.email}</p>
		</div>
	);
}
