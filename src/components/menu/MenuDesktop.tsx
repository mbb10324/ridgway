'use client';

import { type MenuOptions } from '@/hooks/useMenuOptions';
import ProfileButton from '../profile/ProfileButton';
import { usePathname } from 'next/navigation';

type MenuDesktopProps = {
	menuOptions: MenuOptions[];
};

export default function MenuDesktop(props: Readonly<MenuDesktopProps>) {
	const { menuOptions } = props;
	const pathname = usePathname();

	return (
		<div className='flex-row gap-8 items-center hidden lg:flex'>
			{menuOptions.map((option) => (
				<h2
					key={option.id}
					className={`text-lg font-semibold cursor-pointer hover:border-white border-b border-transparent transition-all duration-500 ease-in-out ${pathname === option.path ? 'text-custom-primary pointer-events-none' : ''}`}
					onClick={() => option.onClick()}
					onKeyDown={(event) => {
						if (event.key === 'Enter') {
							option.onClick();
						}
					}}
					title={option.id}
				>
					{option.title}
				</h2>
			))}
			<ProfileButton />
		</div>
	);
}
