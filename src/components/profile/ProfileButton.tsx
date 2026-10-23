import { useSessionContext } from '@/context/SessionWrapper';
import Backdrop from '../common/Backdrop';
import ProfileMenu from './ProfileMenu';
import UserInitial from './UserInitial';
import Popover from '../common/Popover';
import { useState } from 'react';
import Svg from '../svg/Svg';

export default function ProfileButton() {
	const [showProfile, setShowProfile] = useState(false);
	const session = useSessionContext();

	return (
		<>
			<Popover position='bottom-left' body={<ProfileMenu setShowProfile={setShowProfile} />} trigger={showProfile}>
				<div
					className='bg-custom-transparent-medium-gray hover:bg-custom-transparent-gray transition-all duration-500 ease-in-out rounded-full py-1 pl-1 pr-3 flex flex-row items-center gap-2 cursor-pointer'
					onClick={() => setShowProfile(true)}
					onKeyDown={(event) => {
						if (event.key === 'Enter') {
							setShowProfile(true);
						}
					}}
					title='profile-button'
				>
					<UserInitial user={session.user} size='md' />
					<Svg.TbChevronDown
						size={20}
						className={`transition-all duration-500 ease-in-out ${showProfile ? 'rotate-180' : 'rotate-0'}`}
						testId='profile-button-chevron'
					/>
				</div>
			</Popover>
			<Backdrop show={showProfile} onClick={() => setShowProfile(false)} transparent />
		</>
	);
}
