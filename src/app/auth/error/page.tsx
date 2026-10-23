'use client';

import { useSearchParams } from 'next/navigation';
import ErrorContent from '@/components/status/Error';
import { Suspense } from 'react';

function getErrorMessage(error: string | null): string {
	switch (error) {
		case 'auth':
			return 'Authentication failed.';
		case 'InactiveAccount':
			return 'Your acount has been disabled. Please contact your administrator.';
		case 'InvalidSession':
			return 'You must be authenticated to access this site.';
		case 'MaxSessionsReached':
			return 'You have reached the maximum number of active sessions.';
		default:
			return 'An unexpected error occurred.';
	}
}

function AuthErrorContent() {
	const searchParams = useSearchParams();
	const message = getErrorMessage(searchParams.get('error'));

	return <ErrorContent title='Authentication Error' message={message} type='auth' />;
}

export default function AuthErrorPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<AuthErrorContent />
		</Suspense>
	);
}
