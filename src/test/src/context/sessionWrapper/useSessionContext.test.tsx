import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SessionContext, useSessionContext } from '@/context/SessionWrapper';

function TestComponent() {
	const session = useSessionContext();
	return <div>{session.user.name}</div>;
}

describe('useSessionContext', () => {
	it('throws an error when used outside of SessionContext.Provider', () => {
		expect(() => render(<TestComponent />)).toThrow(
			'No session was found in the context. This may be because you are not within a SessionContext.Provider'
		);
	});

	it('returns session data when used within SessionContext.Provider', () => {
		const mockSession = { user: { name: 'John Doe', email: 'john.doe@example.com' } };

		render(
			// @ts-expect-error - mockSession is intentionally not a valid session object
			<SessionContext.Provider value={mockSession}>
				<TestComponent />
			</SessionContext.Provider>
		);

		expect(screen.getByText('John Doe')).toBeInTheDocument();
	});
});
