'use client';

import MenuBtn from '../menu-btn/MenuBtn';
import Menu from '../menu/Menu';
import { useEffect, useState } from 'react';
import './header.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
	const [menuOpen, setMenuOpen] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (menuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'hidden auto';
		}
	}, [menuOpen]);

	return (
		<>
			<div className={`header ${menuOpen ? 'invert-header' : ''}`}>
				<Image
					src='/ridgway.png'
					alt='Revel Logo'
					onClick={() => router.push('/')}
					width={2481}
					height={1724}
					sizes='(max-width: 900px) 150px, 200px'
				/>

				<MenuBtn menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
				{menuOpen && <div className='header-line' />}
			</div>
			<Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
		</>
	);
}
