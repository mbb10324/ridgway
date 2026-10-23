'use client';

import { DeleteAccountContext } from './DeleteAccountContext';
import { useMutation } from '@tanstack/react-query';
import Backdrop from '../../common/Backdrop';
import { toast } from 'react-toastify/unstyled';
import Modal from '../../common/Modal';
import { useContext } from 'react';
import { routes } from '@/routes';
import { signOut } from '@/utils/auth';

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
				<div className='flex flex-col gap-1 p-8 main-background rounded-3xl'>
					<h1 className='text-lg font-medium text-center'>Delete Account?</h1>
					<p className='text-xs text-center'>
						You will no longer have access to this account or any associated data, are you sure you would like to proceed?
						This action can not be undone.
					</p>
					<div className='flex flex-row gap-4 w-full items-center justify-center mt-4'>
						<button
							className='bg-slate-400 rounded-lg py-1 px-6 text-black text-sm font-semibold hover:bg-slate-400/80 transition-all duration-300 ease-in-out'
							onClick={() => setShowDeleteAccount(false)}
						>
							Cancel
						</button>
						<button
							className='bg-red-500/20 rounded-lg py-1 px-6 text-red-300 text-sm font-semibold hover:bg-red-400/20 transition-all duration-300 ease-in-out'
							onClick={() => deleteAccountMutation.mutate()}
						>
							Delete
						</button>
					</div>
				</div>
			</Modal>
			<Backdrop show={showDeleteAccount} onClick={() => setShowDeleteAccount(false)} />
		</>
	);
}
