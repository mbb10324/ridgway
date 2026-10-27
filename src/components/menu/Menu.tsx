import { usePathname, useRouter } from 'next/navigation';
import ScrollItem from '../../scroll/ScrollItem';
import './menu.css';

type MenuProps = {
	menuOpen: boolean;
	setMenuOpen: (open: boolean) => void;
};

export default function Menu(props: Readonly<MenuProps>) {
	const { menuOpen, setMenuOpen } = props;
	const router = useRouter();
	const pathname = usePathname();

	function navigateTo(route: string) {
		if (pathname === route) {
			setMenuOpen(false);
		}
		router.push(route);
	}

	return (
		<div className={`menu ${menuOpen ? 'menu-container-open' : 'menu-container-closed'}`}>
			<div className='menu-links'>
				{menuOpen && (
					<>
						<ScrollItem type='slideX' slideDistance={-400} transitionDuration={0.3} control fire={menuOpen}>
							<h2 onClick={() => navigateTo('/')} className={`${pathname === '/' ? 'menu-link-current' : ''}`}>
								Home
							</h2>
						</ScrollItem>
						<ScrollItem type='slideX' slideDistance={-400} transitionDuration={0.6} control fire={menuOpen}>
							<h2 onClick={() => navigateTo('/about')} className={`${pathname === '/about' ? 'menu-link-current' : ''}`}>
								About
							</h2>
						</ScrollItem>
						<ScrollItem type='slideX' slideDistance={-400} transitionDuration={0.9} control fire={menuOpen}>
							<h2 onClick={() => navigateTo('/works')} className={`${pathname === '/works' ? 'menu-link-current' : ''}`}>
								Works
							</h2>
						</ScrollItem>
						<ScrollItem type='slideX' slideDistance={-400} transitionDuration={1.2} control fire={menuOpen}>
							<h2 onClick={() => navigateTo('/contact')} className={`${pathname === '/contact' ? 'menu-link-current' : ''}`}>
								Contact
							</h2>
						</ScrollItem>
					</>
				)}
			</div>
		</div>
	);
}
