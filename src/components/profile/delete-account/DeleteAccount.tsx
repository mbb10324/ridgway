'use client';

import { DeleteAccountContext } from './DeleteAccountContext';
import { useMutation } from '@tanstack/react-query';
import Backdrop from '../../common/Backdrop';
import { toast } from 'react-toastify/unstyled';
import Modal from '../../common/Modal';
import { useContext } from 'react';
import { routes } from '@/routes';
import { signOut } from '@/utils/auth';
import Button from '@/components/button/Button';
import '../../common/auth-dialog.css';
import './delete-account.css';

// @stig V-222549 | The application must terminate existing user sessions upon account deletion.
export default function DeleteAccount() {
	const { showDeleteAccount, setShowDeleteAccount } = useContext(DeleteAccountContext);

	const deleteAccountMutation = useMutation({
		mutationFn: () => {
			return fetch(routes.deleteAccount, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			}).then((response) => {
				if (!response.ok) {
					throw new Error('Failed to delete entry.');
				}
				return response.json();
			});
		},
		onSuccess: signOut,
		onError: () => {
			toast.error('Error deactivating account');
		}
	});

	return (
		<>
			<Modal showModal={showDeleteAccount}>
				<div className='auth-dialog auth-dialog--delete-account'>
					<p className='auth-dialog-label'>Account settings</p>
					<h2>Delete Account?</h2>
					<p>
						You will no longer have access to this account or any associated data, are you sure you would like to proceed?
						This action can not be undone.
					</p>
					<div className='delete-account-actions'>
						<Button
							primary='var(--secondary)'
							secondary='var(--tan)'
							fontSize='1.25rem'
							onClick={() => setShowDeleteAccount(false)}
						>
							Cancel
						</Button>
						<Button
							primary='var(--pink)'
							secondary='var(--tan)'
							fontSize='1.25rem'
							onClick={() => deleteAccountMutation.mutate()}
						>
							Delete
						</Button>
					</div>
				</div>
			</Modal>
			<Backdrop show={showDeleteAccount} zIndex='z-40' onClick={() => setShowDeleteAccount(false)} />
		</>
	);
}
