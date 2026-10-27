import { DeleteAccountContext } from './DeleteAccountContext';
import Button from '@/components/button/Button';
import { useContext } from 'react';
import '../profile.css';

type DeleteAccountButtonProps = {
	onClick?: () => void;
};

export default function DeleteAccountButton(props: Readonly<DeleteAccountButtonProps>) {
	const { onClick } = props;
	const deleteAccount = useContext(DeleteAccountContext);

	return (
		<div className='profile-action'>
			<Button
				title='delete-account-btn'
				primary='var(--primary)'
				secondary='var(--secondary)'
				backdrop='var(--secondary)'
				fontSize='clamp(0.875rem, 1.5vw, 1.25rem)'
				onClick={() => {
					deleteAccount.setShowDeleteAccount(true);
					onClick?.();
				}}
			>
				Delete Account
			</Button>
		</div>
	);
}
