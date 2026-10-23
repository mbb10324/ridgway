'use client';

import HeaderLogo from './HeaderLogo';
import Menu from '../menu/Menu';

type HeaderProps = {
	disableMenu?: boolean;
};

export default function Header(props: Readonly<HeaderProps>) {
	const { disableMenu = false } = props;

	return (
		<div
			data-testid='header-component'
			className={`w-full sticky shadow-custom-dark lg:shadow-none top-0 lg:relative bg-[#121110] lg:bg-transparent flex p-8 2xl:px-0 lg:pb-0 flex-row z-10 ${!disableMenu ? 'justify-between max-w-xl-breakpoint' : 'justify-center'}`}
		>
			<HeaderLogo />
			{!disableMenu && <Menu />}
		</div>
	);
}
