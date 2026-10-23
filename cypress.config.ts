import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		setupNodeEvents(on, config) {},
		testIsolation: false // Disable test isolation
	}
});
