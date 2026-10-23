'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Backdrop from './Backdrop';
import Modal from './Modal';

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
				<div className='flex justify-between flex-col rounded-3xl items-center main-background gap-6 p-8'>
					<h2 className='text-2xl font-bold text-center'>Logged Out</h2>
					<p className='text-md text-center max-w-96'>
						Your session has been terminated and you have succesfully logged out of Primus!
					</p>
					<button
						className='bg-custom-primary hover:bg-emerald-300 transition-all duration-300 ease-in-out text-custom-dark-gray text-sm font-bold rounded-md px-10 py-3'
						onClick={() => setShow(false)}
					>
						Close
					</button>
				</div>
			</Modal>
			<Backdrop show={show} zIndex='z-40' onClick={() => setShow(false)} />
		</>
	);
}
