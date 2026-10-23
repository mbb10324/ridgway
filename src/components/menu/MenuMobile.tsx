'use client';

import DeleteAccountButton from '../profile/delete-account/DeleteAccountButton';
import { useSessionContext } from '@/context/SessionWrapper';
import { type MenuOptions } from '@/hooks/useMenuOptions';
import LogoutButton from '../profile/LogoutButton';
import UserInitial from '../profile/UserInitial';
import { usePathname } from 'next/navigation';
import UserInfo from '../profile/UserInfo';
import Backdrop from '../common/Backdrop';
import Svg from '../svg/Svg';

type MenuProps = {
	showMenu: boolean;
	setShowMenu: (showMenu: boolean) => void;
	menuOptions: MenuOptions[];
};

export default function MenuMobile(props: Readonly<MenuProps>) {
	const { showMenu, setShowMenu, menuOptions } = props;
	const pathname = usePathname();
	const session = useSessionContext();

	return (
		<>
			<div
				title='menu-mobile'
				className={`main-background flex flex-col p-2 overflow-hidden justify-between gap-4 fixed top-0 right-0 w-72 h-screen z-60 text-white transition-all duration-700 ease-in-out ${showMenu ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'}`}
			>
				<div className='flex flex-col'>
					<div className='flex justify-end p-8'>
						<Svg.TbX
							testId='close-icon'
							color='white'
							size={38}
							onClick={() => setShowMenu(false)}
							className='cursor-pointer'
						/>
					</div>
					<div className='flex flex-row items-center gap-4 pl-4'>
						<UserInitial user={session.user} size='lg' />
						<UserInfo user={session.user} />
					</div>
					<div className='flex flex-col mt-16'>
						{menuOptions.map((option) => (
							<button
								key={option.id}
								className={`font-medium flex justify-start pl-8 items-center gap-7 rounded-lg py-2 transition-all duration-300 ease-in-out ${pathname === option.path ? 'bg-emerald-800/40' : ''}`}
								title={option.id}
								onClick={() => option.onClick()}
								onKeyDown={(event) => {
									if (event.key === 'Enter') {
										option.onClick();
									}
								}}
							>
								{option.icon}
								{option.title}
							</button>
						))}
					</div>
				</div>
				<div className='absolute bottom-0 left-0 w-full flex flex-col gap-4 px-2 pb-4'>
					<LogoutButton />
					<DeleteAccountButton onClick={() => setShowMenu(false)} />
				</div>
			</div>
			<Backdrop show={showMenu} onClick={() => setShowMenu(false)} zIndex='z-50' />
		</>
	);
}
