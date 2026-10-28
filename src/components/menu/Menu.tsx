import { usePathname, useRouter } from 'next/navigation';
import ScrollItem from '../../scroll/ScrollItem';
import './menu.css';
import LogoutButton from '../profile/LogoutButton';
import DelayedComponent from '../common/DelayedComponent';
import UserInfo from '../profile/UserInfo';
import { useSessionContext } from '@/context/SessionWrapper';
import UserInitial from '../profile/UserInitial';
import DeleteAccountButton from '../profile/delete-account/DeleteAccountButton';
import LastLoginDisplay from '../profile/LastLogin';

type MenuProps = {
	menuOpen: boolean;
	setMenuOpen: (open: boolean) => void;
};

export default function Menu(props: Readonly<MenuProps>) {
	const { menuOpen, setMenuOpen } = props;
	const router = useRouter();
	const pathname = usePathname();
	const session = useSessionContext();

	function navigateTo(route: string) {
		if (pathname === route) {
			setMenuOpen(false);
		}
		router.push(route);
	}

	return (
		<div className={`menu ${menuOpen ? 'menu-container-open' : 'menu-container-closed'}`}>
			<div className='menu-links'>
				<>
					<ScrollItem type='slideX' slideDistance={-200} transitionDuration={1} control fire={menuOpen}>
						<h2 onClick={() => navigateTo('/')} className={`${pathname === '/' ? 'menu-link-current' : ''}`}>
							Home
						</h2>
					</ScrollItem>
					<ScrollItem type='slideX' slideDistance={-400} transitionDuration={1} control fire={menuOpen}>
						<h2 onClick={() => navigateTo('/about')} className={`${pathname === '/about' ? 'menu-link-current' : ''}`}>
							About
						</h2>
					</ScrollItem>
					<ScrollItem type='slideX' slideDistance={-600} transitionDuration={1} control fire={menuOpen}>
						<h2 onClick={() => navigateTo('/works')} className={`${pathname === '/works' ? 'menu-link-current' : ''}`}>
							Works
						</h2>
					</ScrollItem>
					<ScrollItem type='slideX' slideDistance={-800} transitionDuration={1} control fire={menuOpen}>
						<h2 onClick={() => navigateTo('/contact')} className={`${pathname === '/contact' ? 'menu-link-current' : ''}`}>
							Contact
						</h2>
					</ScrollItem>
				</>
			</div>
			{menuOpen && (
				<DelayedComponent trigger={menuOpen} delay={500}>
					<div className='menu-line' />
				</DelayedComponent>
			)}
			<div className='menu-profile'>
				<h2>Profile</h2>
				<UserInitial user={session.user} size='lg' />
				<UserInfo user={session.user} center />
				<LastLoginDisplay />
				<DeleteAccountButton onClick={() => setMenuOpen(false)} />
				<LogoutButton />
			</div>
		</div>
	);
}
