'use client';

import useHideOverflow from '@/hooks/useHideOverflow';
import useMenuOptions from '@/hooks/useMenuOptions';
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import { useState } from 'react';
import Svg from '../svg/Svg';

// @stig V-222391 | Applications requiring user access authentication must provide a logoff capability for user initiated communication session.
export default function Menu() {
	const [showMenu, setShowMenu] = useState(false);
	const menuOptions = useMenuOptions(setShowMenu);
	useHideOverflow(showMenu ? 'both' : 'horizontal');

	return (
		<>
			<Svg.IoMenu
				testId='menu-icon'
				color='white'
				size={42}
				onClick={() => setShowMenu(true)}
				className='cursor-pointer lg:hidden z-10'
				viewBox='0 0 512 512'
			/>

			<MenuDesktop menuOptions={menuOptions} />
			<MenuMobile showMenu={showMenu} setShowMenu={setShowMenu} menuOptions={menuOptions} />
		</>
	);
}
