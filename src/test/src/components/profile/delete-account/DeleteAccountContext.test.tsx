import DeleteAccountProvider, { DeleteAccountContext } from '@/components/profile/delete-account/DeleteAccountContext';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { useContext } from 'react';
import React from 'react';

const TestComponent = () => {
	const { showDeleteAccount, setShowDeleteAccount } = useContext(DeleteAccountContext);
	return (
		<div>
			<span data-testid='show-delete-account'>{showDeleteAccount.toString()}</span>
			<button onClick={() => setShowDeleteAccount(true)}>Show Delete Account</button>
		</div>
	);
};

describe('DeleteAccountProvider', () => {
	it('provides the correct initial context value', () => {
		renderWithMocks(<TestComponent />);

		expect(screen.getByTestId('show-delete-account').textContent).toBe('false');
	});

	it('updates the context value when setShowDeleteAccount is called', async () => {
		renderWithMocks(<TestComponent />);

		await userEvent.click(screen.getByRole('button'));
		expect(screen.getByTestId('show-delete-account').textContent).toBe('true');
	});

	it('wraps children components correctly', () => {
		renderWithMocks(<div data-testid='child-component'>Child Component</div>);

		expect(screen.getByTestId('child-component')).toBeInTheDocument();
	});
});

function renderWithMocks(component: React.ReactNode) {
	render(<DeleteAccountProvider>{component}</DeleteAccountProvider>);
}
