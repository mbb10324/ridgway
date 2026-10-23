import createJiti from 'jiti';


// Check environment variables at build time, but skip if in CI environment.
if (!process.env.CI) {

	const jiti = createJiti(new URL(import.meta.url).pathname);

	// Import envs here to validate during build. 
	jiti('./src/env/client');
	jiti('./src/env/server');
}

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	// Remove X-Powered-By header from responses. ZAP Scan recommendation.
	poweredByHeader: false, 
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-Content-Type-Options',
						// Prevent MIME type sniffing. ZAP Scan recommendation.
						value: 'nosniff'
					}
				]
			}
		];
	},
	transpilePackages: ['@t3-oss/env-nextjs', '@t3-oss/env-core']
};

export default nextConfig;
