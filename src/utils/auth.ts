import { signOut as nextAuthReactSignOut } from 'next-auth/react';
import { env } from '@/env/server';

// We are overriding the signOut function to add the signOut=true query parameter to the callbackUrl.
// This allows us to redirect to the IDP logout in the redirect callback, which does not differentiate
// between signIn and signOut.
export const signOut = ({ callbackUrl = '/' }: { callbackUrl?: string } = {}) => {
	const url = `/?signOut=true&post_logout_redirect_uri=${callbackUrl}`;
	nextAuthReactSignOut({ callbackUrl: url });
};

export function generateRedirectUri({ url, baseUrl }: { url: string; baseUrl: string }): string {
	const redirectUri = new URL(url, baseUrl);
	const isSignOut = redirectUri.searchParams.get('signOut') === 'true';
	redirectUri.searchParams.delete('signOut');
	const postLogoutRedirectUri = redirectUri.searchParams.get('post_logout_redirect_uri');
	redirectUri.searchParams.delete('post_logout_redirect_uri');
	const defaultRedirectUri = redirectUri.toString();

	if (isSignOut && env.PROVIDER_LOGOUT_URL) {
		const providerUrl = new URL(env.PROVIDER_LOGOUT_URL);
		providerUrl.searchParams.set('client_id', env.PROVIDER_CLIENT_ID);
		if (postLogoutRedirectUri) {
			providerUrl.searchParams.set('post_logout_redirect_uri', new URL(postLogoutRedirectUri, baseUrl).toString());
		} else {
			providerUrl.searchParams.set('post_logout_redirect_uri', defaultRedirectUri);
		}
		return providerUrl.toString();
	}

	return defaultRedirectUri;
}
