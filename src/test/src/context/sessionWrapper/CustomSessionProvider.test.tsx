import { CustomSessionProvider } from '@/context/SessionWrapper';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useSession } from 'next-auth/react';
import { createValidNextAuthSession } from '@/test/test-helpers/test-helpers';

vi.mock('next-auth/react', () => ({
	useSession: vi.fn()
}));

vi.mock('next/navigation', () => ({
	useRouter: vi.fn()
}));

vi.mock('@/components/status/Error', () => ({
	__esModule: true,
	default: () => <div>Error</div>
}));

describe('CustomSessionProvider', () => {
	it('renders Loader when session is loading', () => {
		renderSessionProviderWithMocks({ status: 'loading' });

		expect(screen.getByTitle('loader')).toBeInTheDocument();
	});

	it('renders children when session is authenticated', () => {
		renderSessionProviderWithMocks();

		expect(screen.getByText('Authenticated Content')).toBeInTheDocument();
	});

	it('renders error content when session is null and status is authenticated', () => {
		renderSessionProviderWithMocks({ data: null, status: 'authenticated' });

		expect(screen.getByText('Error')).toBeInTheDocument();
	});

	it('renders unauthenticated element when session is unauthenticated', () => {
		renderSessionProviderWithMocks({ status: 'unauthenticated' });

		expect(screen.getByText('Unauthenticated')).toBeInTheDocument();
	});

	it('renders error content when an unknown status is encountered', () => {
		renderSessionProviderWithMocks({ status: 'unknown' });

		expect(screen.getByText('Error')).toBeInTheDocument();
	});
});

function renderSessionProviderWithMocks(
	nextAuthSession: unknown = { data: createValidNextAuthSession(), status: 'authenticated' }
) {
	vi.mocked(useSession).mockReturnValue(nextAuthSession as ReturnType<typeof useSession>);

	render(
		<CustomSessionProvider unauthenticatedElement={<div>Unauthenticated</div>}>
			<div>Authenticated Content</div>
		</CustomSessionProvider>
	);
}
