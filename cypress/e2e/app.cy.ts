import { login, logout } from '../support/commands';

const submitWeightLog = (randomWeightBetween60And400: string, today: string) => {
	cy.get('input[name=weight]').type(randomWeightBetween60And400);
	cy.get('input[name=date]').type(today);
	cy.get('button[type=submit]').click();
};

function generateRandomWeightBetween60And400() {
	// eslint-disable-next-line sonarjs/pseudo-random
	let randomWeightBetween60And400: number | string = (Math.random() * (400 - 60) + 60).toFixed(1);
	randomWeightBetween60And400 = parseFloat(randomWeightBetween60And400);
	return randomWeightBetween60And400.toString();
}

describe('Navigation', () => {
	// ensure application is in a logged out state before starting the tests
	before(() => {
		// intentionally not using err or runnable variables but they are required to be present for the fail event handler to work correctly - jp 20260803
		//eslint-disable-next-line
		cy.on('fail', (err, runnable) => {
			cy.log('User not yet logged in, continuing with test...');
			return false; // prevent the test from failing
		});
		cy.visit('http://localhost:3000');
		logout();
	});

	beforeEach(() => {
		cy.intercept('POST', '**/api/protected/sample-data').as('weightLogPost');
		cy.intercept('PUT', '**/api/protected/sample-data/**').as('weightLogPut');
		cy.intercept('DELETE', '**/api/protected/sample-data/**').as('weightLogDelete');
	});

	after(() => {
		cy.visit('http://localhost:3000');
		logout();
	});

	const expectedWeight = generateRandomWeightBetween60And400();
	const newWeight = generateRandomWeightBetween60And400();
	const today = new Date().toISOString().split('T')[0];

	const todayDateExpectedFormat = new Date().toLocaleDateString('en-US', {
		weekday: 'long',
		month: '2-digit',
		day: '2-digit',
		year: '2-digit'
	});

	it('should navigate to the landing page and successfully log in', () => {
		login('user', 'password');
		cy.contains('h1', 'Welcome, Jane Doe!').should('exist');
	});

	it('should contain a list of weight logs', () => {
		cy.get('div[title=logs-list]').within(() => {
			cy.get('div').children().should('have.length.greaterThan', 0);
		});
	});

	it('allows a user to record their weight and see it in the weight logs', () => {
		submitWeightLog(expectedWeight, today);

		cy.wait('@weightLogPost');
		cy.get('div[title=logs-list]').scrollIntoView();

		cy.get('div[title=logs-list]').within(() => {
			cy
				.get('div')
				.contains(expectedWeight + ' lbs')
				.should('exist');
			cy.get('p').contains(todayDateExpectedFormat).should('exist');
		});
	});

	it('allows a user to edit their weight logs', () => {
		cy
			.get('div')
			.contains(expectedWeight + ' lbs')
			.scrollIntoView()
			.click();

		cy.scrollTo('top');
		cy.get('input[id=EditWeight]').should('be.visible').should('be.enabled').clear();
		cy.get('input[id=EditWeight]').type(newWeight);
		cy.contains('button[type=submit]', 'Save').click();

		cy.wait('@weightLogPut');
		cy.get('div[title=logs-list]').scrollIntoView();

		cy.get('div[title=logs-list]').within(() => {
			cy
				.get('div')
				.contains(newWeight + ' lbs')
				.should('exist');
			cy.get('p').contains(todayDateExpectedFormat).should('exist');
		});
		cy.get('div[title=logs-list]').within(() => {
			cy
				.get('div')
				.contains(expectedWeight + ' lbs')
				.should('not.exist');
			cy.get('p').contains(todayDateExpectedFormat).should('exist');
		});
	});

	it('allows a user to delete their weight logs', () => {
		cy
			.get('div')
			.contains(newWeight + ' lbs')
			.scrollIntoView()
			.click();

		cy.scrollTo('top');

		cy.get('button').contains('Delete Entry').click();

		cy.wait('@weightLogDelete');
		cy
			.get('div')
			.contains(newWeight + ' lbs')
			.should('not.exist');
	});

});