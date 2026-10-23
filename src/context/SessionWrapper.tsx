'use client';

import { SessionProvider as NextSessionProvider, useSession } from 'next-auth/react';
import ErrorContent from '@/components/status/Error';
import { createContext, useContext } from 'react';
import Loader from '@/components/status/Loader';
import type { Session } from 'next-auth';

export const SessionContext = createContext<Session | undefined>(undefined);

type SessionWrapperProps = {
	unauthenticatedElement: React.ReactElement;
	children: React.ReactElement;
};

export default function SessionWrapper(props: Readonly<SessionWrapperProps>) {
	const { unauthenticatedElement, children } = props;

	return (
		<NextSessionProvider>
			<CustomSessionProvider unauthenticatedElement={unauthenticatedElement}>{children}</CustomSessionProvider>
		</NextSessionProvider>
	);
}

export function CustomSessionProvider(props: Readonly<SessionWrapperProps>) {
	const { unauthenticatedElement, children } = props;
	const { data: session, status } = useSession();
	const errorElement = (
		<ErrorContent title='Error loading session' message='Unexpected authentication status' type='auth' />
	);

	switch (status) {
		case 'loading':
			return <Loader />;
		case 'authenticated':
			if (!session) {
				return errorElement;
			}
			return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
		case 'unauthenticated':
			return unauthenticatedElement;
		default:
			return errorElement;
	}
}

export function useSessionContext() {
	const session = useContext(SessionContext);

	if (!session) {
		throw new Error(
			'No session was found in the context. This may be because you are not within a SessionContext.Provider'
		);
	}

	return session;
}
