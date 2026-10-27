import { signOut } from '@/utils/auth';
import Button from '../button/Button';
import './profile.css';

export default function LogoutButton() {
	return (
		<div className='profile-action'>
			<Button
				title='logout-btn'
				primary='var(--primary)'
				secondary='var(--secondary)'
				backdrop='var(--secondary)'
				fontSize='clamp(0.875rem, 1.5vw, 1.25rem)'
				onClick={() => signOut({ callbackUrl: '/?message=logged-out' })}
			>
				Logout
			</Button>
		</div>
	);
}
