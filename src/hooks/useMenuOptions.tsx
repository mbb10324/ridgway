import { usePathname, useRouter } from 'next/navigation';
import Svg from '@/components/svg/Svg';
import React from 'react';

const MenuOptionPath = {
	HOME: '/',
	TAB1: '/tabs/tab1',
	TAB2: '/tabs/tab2',
	TAB3: '/tabs/tab3'
};

export type MenuOptions = {
	title: string;
	id: string;
	path: string | undefined;
	icon: React.ReactNode;
	onClick: () => void;
};

export default function useMenuOptions(setShowMenu: (show: boolean) => void): MenuOptions[] {
	const pathname = usePathname();
	const router = useRouter();

	function handleSelection(path: string) {
		if (pathname !== path) {
			router.push(path);
		}
		setShowMenu(false);
	}

	const iconSize = 24;
	const iconColor = (path: string) => (pathname === path ? '#34D399' : 'white');

	return [
		{
			title: 'Home',
			id: 'menu-home',
			path: MenuOptionPath.HOME,
			icon: <Svg.TbHome size={iconSize} color={iconColor(MenuOptionPath.HOME)} />,
			onClick: () => handleSelection(MenuOptionPath.HOME)
		},
		{
			title: 'Tab 1',
			id: 'menu-tab1',
			path: MenuOptionPath.TAB1,
			icon: <Svg.TbCircle size={iconSize} color={iconColor(MenuOptionPath.TAB1)} />,
			onClick: () => handleSelection(MenuOptionPath.TAB1)
		},
		{
			title: 'Tab 2',
			id: 'menu-tab2',
			path: MenuOptionPath.TAB2,
			icon: <Svg.TbSquare size={iconSize} color={iconColor(MenuOptionPath.TAB2)} />,
			onClick: () => handleSelection(MenuOptionPath.TAB2)
		},
		{
			title: 'Tab 3',
			id: 'menu-tab3',
			path: MenuOptionPath.TAB3,
			icon: <Svg.TbTriangle size={iconSize} color={iconColor(MenuOptionPath.TAB3)} />,
			onClick: () => handleSelection(MenuOptionPath.TAB3)
		}
	];
}
