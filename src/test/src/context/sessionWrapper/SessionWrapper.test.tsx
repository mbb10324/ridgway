import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SessionWrapper from '@/context/SessionWrapper';
import { useSession } from 'next-auth/react';

vi.mock('next-auth/react', () => {
	 
	return {
		useSession: vi.fn(),
		SessionProvider: ({ children }: { children: React.ReactNode }) => children
	};
});

describe('SessionWrapper', () => {
	it('renders unauthenticated element when no session is available', () => {
		vi.mocked(useSession).mockReturnValue({
			data: null,
			status: 'unauthenticated'
		} as unknown as ReturnType<typeof useSession>);

		act(() => {
			render(
				<SessionWrapper unauthenticatedElement={<div>Unauthenticated</div>}>
					<div>Authenticated</div>
				</SessionWrapper>
			);
		});

		expect(screen.getByText('Unauthenticated')).toBeInTheDocument();
	});
});
