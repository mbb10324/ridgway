// required to prevent HMR errors from causing test failures - jp 20260803
Cypress.on('uncaught:exception', (err) => {
	if (err.message.includes('Failed to load chunk') && err.message.includes('hmr-client')) {
		return false;
	}
});
