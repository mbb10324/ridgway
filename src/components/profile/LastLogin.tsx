'use client';

import LastLoginLoading from '../status/LastLoginLoading';
import StatusHandler from '../status/StatusHandler';
import { useQuery } from '@tanstack/react-query';
import { routes } from '@/routes';
import { useRouter } from 'next/navigation';

// @stig V-222437 | The application must display the time and date of the users last successful logon.
export default function LastLoginDisplay() {
	const router = useRouter();
	const { data, status } = useQuery({
		queryKey: ['lastLogin'],
		queryFn: () => fetch(routes.lastSession).then((res) => res.json() as Promise<{ lastLogin: string | null }>)
	});

	const lastLogin = data?.lastLogin ? new Date(data.lastLogin) : null;

	return (
		<StatusHandler status={status} loadingComponent={<LastLoginLoading />} onError={() => router.push(routes.authError)}>
			{lastLogin ? (
				<p className='text-sm text-gray-500 fade-in'>
					Last Login: {lastLogin.toLocaleDateString()} {lastLogin.toLocaleTimeString()}
				</p>
			) : (
				<p className='text-sm text-gray-500 fade-in'>This is your first login.</p>
			)}
		</StatusHandler>
	);
}
