import { setContentSecurityPolicy } from '../../../utils/middleware';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { type NextRequest, NextResponse } from 'next/server';

vi.mock('next/server', () => {
	return (async () => {
		const actual = await vi.importActual('next/server');
		return {
			...actual,
			NextResponse: {
				next: vi.fn()
			}
		};
	})();
});

vi.mock('@/env/server', () => ({
	env: process.env
}));

describe('setContentSecurityPolicy Middleware', () => {
	let requestMock: NextRequest;

	beforeEach(() => {
		requestMock = {
			headers: new Headers()
		} as NextRequest;

		vi.mocked(NextResponse.next).mockReturnValue({
			headers: new Headers(),
			request: { headers: new Headers() }
		} as unknown as ReturnType<typeof NextResponse.next>);
	});

	it('sets Content-Security-Policy header with nonce', () => {
		const response = setContentSecurityPolicy(requestMock);

		const nonce = response.headers.get('x-nonce');
		expect(nonce).toBeDefined();

		const cspHeader = response.headers.get('Content-Security-Policy');

		/* eslint-disable */
		expect(cspHeader).toContain("default-src 'self'");
		expect(cspHeader).toContain("script-src 'strict-dynamic'");
		expect(cspHeader).toContain("style-src 'self'");
		expect(cspHeader).toContain("img-src 'self' data:");
		expect(cspHeader).toContain("font-src 'self'");
		expect(cspHeader).toContain("object-src 'none'");
		expect(cspHeader).toContain("form-action 'self'");
		expect(cspHeader).toContain("frame-ancestors 'none'");
		expect(cspHeader).toContain('upgrade-insecure-requests');
		/* eslint-enable */
	});

	it('sets relaxed CSP policy in development mode', () => {
		// @ts-expect-error - we're mocking the environment variable here
		process.env.NODE_ENV = 'development';
		const response = setContentSecurityPolicy(requestMock);

		const cspHeader = response.headers.get('Content-Security-Policy');
		// eslint-disable-next-line
		expect(cspHeader).toContain("'unsafe-eval'");
	});

	it('does not set unsafe-eval in production mode', () => {
		// @ts-expect-error - we're mocking the environment variable here
		process.env.NODE_ENV = 'production';
		const response = setContentSecurityPolicy(requestMock);

		const cspHeader = response.headers.get('Content-Security-Policy');
		// eslint-disable-next-line
		expect(cspHeader).not.toContain("'unsafe-eval'");
	});

	afterEach(() => {
		vi.clearAllMocks();
		// @ts-expect-error - we're mocking the environment variable here
		process.env.NODE_ENV = 'test';
	});
});
