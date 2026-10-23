'use client';

import DeleteAccountProvider from '../profile/delete-account/DeleteAccountContext';
import DeleteAccount from '../profile/delete-account/DeleteAccount';
import Header from '@/components/header/Header';
import BackToTop from './BackToTop';

type DashboardWrapperProps = {
	children: React.ReactNode;
};

export default function DashboardWrapper(props: Readonly<DashboardWrapperProps>) {
	const { children } = props;

	return (
		<DeleteAccountProvider>
			<Header />
			<div className='fade-in pb-8 px-8 relative w-screen flex flex-col items-center'>
				<div className='w-full max-w-xl-breakpoint'>
					{children}
					<BackToTop />
					<DeleteAccount />
				</div>
			</div>
		</DeleteAccountProvider>
	);
}
