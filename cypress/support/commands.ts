export const login = (username: string, password: string) => {
	cy.visit('http://localhost:3000');

	cy.get('h1').contains('STANDARD MANDATORY DOD NOTICE AND CONSENT').should('be.visible');
	cy.contains('button', 'I Consent').click();
	cy.contains('button', 'Sign In').click();

	// we do not care that http is insecure for cypress test - JP 20260803
	//eslint-disable-next-line
	cy.origin('http://keycloak:8080', { args: { username, password } }, ({ username, password }) => {
		cy.get('input[name=username]').should('be.visible');
		cy.get('input[name=username]').type(username);
		cy.get('input[name=password]').type(password);
		cy.get('input[type="submit"]').click();
	});

};

export const logout = () => {
	cy.get('[data-testid=menu-icon]').should('be.visible').click();
	cy.contains('button[title="logout-btn"]', 'Logout').click();

	// necessary because Cypress sometimes auto clicks through keycloak logout page before it has fully loaded and all we care about is whether it has logged out, or not - jp 20260803
	cy.url().then((url) => {
		if (url.includes('localhost:3000')) {
			cy.contains('Logged Out').should('exist');
			cy.contains('button', 'Close').should('be.visible').should('be.enabled').click();
		} else { 
			// we do not care that http is insecure for cypress test - JP 20260803
			//eslint-disable-next-line
			cy.origin('http://keycloak:8080', () => {
				cy.contains('Logging out').should('exist');
				cy.contains('input', 'Logout').click();
			});
			cy.contains('Logged Out').should('exist');
			cy.contains('button', 'Close').should('be.visible').should('be.enabled').click();
		}

	});
};

Cypress.Commands.add('login', login);
Cypress.Commands.add('logout', logout);
