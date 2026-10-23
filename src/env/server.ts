import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	server: {
		PORT: z.coerce.number().default(3000),
		HOSTNAME: z.string().default('localhost'),

		AUTH_URL: z.url().optional(),
		AUTH_SECRET: z.string(),
		PROVIDER_NAME: z.enum(['Keycloak', 'EAMS-A']),
		PROVIDER_CLIENT_ID: z.string(),
		PROVIDER_CLIENT_SECRET: z.string(),
		PROVIDER_ISSUER: z.string(),
		PROVIDER_LOGOUT_URL: z.url().optional(),
		DATABASE_URL: z.url(),
		NODE_ENV: z.enum(['development', 'production', 'test']),

		CLASSIFICATION: z.enum(['Unclassified', 'Classified', 'CUI', 'Confidential', 'Secret', 'Top Secret']).optional(),
		MAX_CONCURRENT_SESSIONS_ALLOWED: z.coerce.number().min(1).optional(),
		LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error']).optional()
	},
	experimental__runtimeEnv: process.env,
	skipValidation: process.env.NODE_ENV === 'test' || process.env.SKIP_SERVER_VALIDATION === 'true' || !!process.env.CI
});
