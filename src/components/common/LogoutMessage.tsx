'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Backdrop from './Backdrop';
import Modal from './Modal';
import './auth-dialog.css';
import Button from '../button/Button';

// @stig V-222392 | The application must display an explicit logoff message to users indicating the reliable termination of authenticated communications sessions.
export default function LogoutMessage({ isLogoutMessage }: Readonly<{ isLogoutMessage: boolean }>) {
	const [show, setShow] = useState(isLogoutMessage);
	const router = useRouter();

	useEffect(() => {
		if (isLogoutMessage) {
			router.replace('/');
		}
	}, [isLogoutMessage, router]);

	return (
		<>
			<Modal showModal={show}>
				<div className='auth-dialog auth-dialog--logout'>
					<p className='auth-dialog-label'>Session closed</p>
					<h2>Logged Out</h2>
					<p>Your session has been terminated and you have successfully logged out of ODS.</p>
					<Button primary='var(--pink)' secondary='var(--tan)' onClick={() => setShow(false)}>
						Close
					</Button>
				</div>
			</Modal>
			<Backdrop show={show} zIndex='z-40' onClick={() => setShow(false)} />
		</>
	);
}
