'use client';

import DeleteAccountButton from './delete-account/DeleteAccountButton';
import { useSessionContext } from '@/context/SessionWrapper';
import LogoutButton from './LogoutButton';
import UserInitial from './UserInitial';
import UserInfo from './UserInfo';
import Svg from '../svg/Svg';

type ProfileMenuProps = {
	setShowProfile: (show: boolean) => void;
};

export default function ProfileMenu(props: Readonly<ProfileMenuProps>) {
	const { setShowProfile } = props;
	const session = useSessionContext();

	return (
		<div
			title='profile-menu'
			className='bg-zinc-800 p-3 min-w-72 flex flex-col items-center justify-center rounded-xl border border-custom-transparent-gray'
		>
			<div className='flex justify-end w-full'>
				<Svg.TbX
					size={32}
					className='cursor-pointer hover:bg-custom-transparent-gray transition-all duration-300 ease-in-out rounded-full p-1'
					onClick={() => setShowProfile(false)}
					testId='profile-close-btn'
				/>
			</div>
			<div className='flex flex-col items-center gap-4'>
				<UserInitial user={session.user} size='lg' />
				<UserInfo user={session.user} center />
			</div>
			<div className='flex flex-col items-center gap-4 w-full mt-8'>
				<LogoutButton />
				<DeleteAccountButton onClick={() => setShowProfile(false)} />
			</div>
		</div>
	);
}
