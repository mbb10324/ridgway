import { createEnv } from '@t3-oss/env-nextjs';
import z from 'zod';

export const env = createEnv({
	client: {
		NEXT_PUBLIC_PROVIDER_ID: z.string()
	},
	runtimeEnv: {
		NEXT_PUBLIC_PROVIDER_ID: process.env.NEXT_PUBLIC_PROVIDER_ID
	},
	skipValidation: process.env.NODE_ENV === 'test'
});
