const path = require('path');
const nextPlugin = require('@next/eslint-plugin-next');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const sonarjsPlugin = require('eslint-plugin-sonarjs');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');

const tsTypeCheckingConfigs = tsPlugin.configs['flat/recommended-type-checked'].map((config) => ({
	...config,
	files: ['**/*.{ts,tsx}'],
}));

const sonarConfigs = {
	...sonarjsPlugin.configs.recommended,
	files: ['**/*.{ts,tsx}'],
};

module.exports = [
	{
		ignores: [
			'**/jest.config.js',
			'**/dist/**',
			'**/coverage/**',
			'**/seeds/**',
			'**/migrations/**',
			'**/.next/**',
			'**/out/**',
			'**/build/**',
			'eslint.config.js',
			'.eslintrc.cjs',
			'next-env.d.ts',
		],
	},
	nextPlugin.configs['core-web-vitals'],
	reactPlugin.configs.flat.recommended,
	reactHooksPlugin.configs.flat.recommended,
	sonarConfigs,
	{
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			semi: ['error', 'always'],
			quotes: ['error', 'single'],
			indent: [
				'error',
				'tab',
				{
					SwitchCase: 1,
					offsetTernaryExpressions: true,
				},
			],
			'react/react-in-jsx-scope': 'off',
			'react/jsx-curly-brace-presence': [2, { props: 'never', children: 'ignore' }],
			'comma-dangle': ['error', 'never'],
			curly: ['error', 'all'],
			'object-curly-spacing': ['error', 'always'],
			'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0 }],
		},
	},
	...tsTypeCheckingConfigs,
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: [path.join(__dirname, './tsconfig.json')],
				tsconfigRootDir: __dirname,
			},
		},
		rules: {
			'@typescript-eslint/consistent-type-imports': [
				'warn',
				{
					prefer: 'type-imports',
					fixStyle: 'inline-type-imports',
				},
			],
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/ban-ts-comment': [
				'warn',
				{
					'ts-ignore': 'allow-with-description',
				},
			],
			'@typescript-eslint/no-misused-promises': 'off',
			'@typescript-eslint/no-floating-promises': 'off',
			'@typescript-eslint/unbound-method': 'off',
		},
	},
];
