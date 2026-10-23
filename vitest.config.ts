import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src')
		}
	},
	plugins: [react()],
	test: {
		globals: true,
		testTimeout: 10000,
		setupFiles: '/src/test/setup.ts',
		environment: 'jsdom',
		include: ['src/**/*.test.{js,ts,tsx,jsx}'],
		coverage: {
			thresholds: {
				lines: 80,
				functions: 80,
				branches: 80,
				statements: 80
			},
			reporter: ['text', 'json', 'cobertura', 'html', 'lcov'],
			reportsDirectory: './coverage',
			exclude: [
				// config files
				'**/test/**',
				'**/*.config.mjs',
				'**/*.config.ts',
				'**/.next/**',
				'**/*.eslintrc.cjs',
				'prisma/**',
				'next-env.d.ts',
				'cypress/**',
				'src/app/page.tsx',
				'**/layout.tsx',
				'src/app/sample/**',
				'src/logger.ts',
				'src/middleware.ts',
				'src/utils/mocks.ts',
				'src/env/**',
				'src/hooks/useIsMounted.tsx',
				// types
				'**/types.d.ts',
				'**/models.ts',
				'**src/types/**',
				// assets
				'src/components/svg/svg-components**',
				'src/components/svg/Svg.tsx',
				// import/export files
				'**src/app/api/auth/**'
			]
		},
		// Ref: https://github.com/nextauthjs/next-auth/discussions/9385#discussioncomment-11064988
		server: {
			deps: {
				inline: ['next']
			}
		}
	}
});
