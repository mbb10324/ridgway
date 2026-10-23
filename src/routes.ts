// Any routes under this path will be protected by the authMiddleware function.
// This is useful for protecting routes that require authentication.
export const protectedRoutePrefix = '/api/protected';

export const routes = {
	healthcheck: '/api/healthcheck',
	authError: '/auth/error',
	sampleData: '/api/protected/sample-data',
	deleteAccount: '/api/protected/delete-account',
	lastSession: '/api/protected/last-session'
};
