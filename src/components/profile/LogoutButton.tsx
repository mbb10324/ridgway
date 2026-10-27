import { signOut } from '@/utils/auth';
import Button from '../button/Button';

export default function LogoutButton() {
	return (
		<Button primary='var(--pink)' secondary='var(--tan)' onClick={() => signOut({ callbackUrl: '/?message=logged-out' })}>
			Logout
		</Button>
	);
}
