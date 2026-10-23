'use client';

import { useRouter } from 'next/navigation';
import Svg from '@/components/svg/Svg';

export default function HeaderLogo() {
	const router = useRouter();

	const handleLogoClick = () => {
		router.push('/');
	};

	return (
		<div
			className='flex items-center justify-center gap-2 flex-row cursor-pointer'
			onClick={handleLogoClick}
			tabIndex={0}
			data-testid="header-logo"
			onKeyDown={(event) => {
				if (event.key === 'Enter') {
					handleLogoClick();
				}
			}}
		>
			<Svg.PrimusLogo width='128' height='40' viewBox='0 0 128 40' strokeWidth='0'/>
		</div>
	);
}
