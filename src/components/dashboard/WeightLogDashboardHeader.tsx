'use client';

import { useSessionContext } from '@/context/SessionWrapper';
import { formatDate } from '@/utils/utils-helpers';

export default function WeightLogDashboardHeader() {
	const session = useSessionContext();

	return (
		<div className='flex flex-col'>
			<h1 className='text-3xl lg:text-4xl font-bold'>Welcome, {session.user.name ? session.user.name : 'User'}!</h1>
			<h2 className='text-lg lg:text-2xl pt-1'>{formatDate(new Date())}</h2>
		</div>
	);
}
