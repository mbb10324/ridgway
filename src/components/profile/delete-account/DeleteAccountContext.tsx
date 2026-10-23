import React, { createContext, type Dispatch, type SetStateAction, useMemo, useState } from 'react';

type DeleteAccountContextType = {
	showDeleteAccount: boolean;
	setShowDeleteAccount: Dispatch<SetStateAction<boolean>>;
};

export const DeleteAccountContext = createContext<DeleteAccountContextType>({
	showDeleteAccount: false,
	setShowDeleteAccount: () => {}
});

type DeleteAccountProviderProps = {
	children: React.ReactNode;
};

export default function DeleteAccountProvider({ children }: Readonly<DeleteAccountProviderProps>) {
	const [showDeleteAccount, setShowDeleteAccount] = useState(false);

	const value = useMemo(() => ({ showDeleteAccount, setShowDeleteAccount }), [showDeleteAccount]);

	return <DeleteAccountContext.Provider value={value}>{children}</DeleteAccountContext.Provider>;
}
