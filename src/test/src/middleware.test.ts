import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { type NextRequest, NextResponse } from 'next/server';
import { authProxy, proxy } from '@/proxy';
import { protectedRoutePrefix } from '@/routes';
import { createMockResponse } from '../test-helpers/test-helpers';

vi.mock('@/logger', () => ({
	default: {
		info: vi.fn(),
		warn: vi.fn(),
		error: vi.fn()
	}
}));

vi.mock('@/utils/helpers', () => ({
	getNextAuthUrl: () => 'http://localhost:3000'
}));

vi.mock('@/env/server', () => ({ env: process.env }));

vi.stubGlobal('fetch', vi.fn());

describe('authMiddleware', () => {
	let mockRequest: NextRequest;

	beforeEach(() => {
		mockRequest = {
			nextUrl: { pathname: `${protectedRoutePrefix}/some-route` },
			headers: new Headers({}),
			cookies: {
				get: vi.fn().mockReturnValue({ value: 'mock-cookie' })
			}
		} as unknown as NextRequest;
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('should allow access for valid session', async () => {
		vi.mocked(global.fetch).mockResolvedValueOnce(createMockResponse({ user: { id: '1' } }));

		const result = await authProxy(mockRequest);
		expect(result).toBeUndefined();
	});

	it('valid request should have a security-classification response header', async () => {
		process.env.CLASSIFICATION = 'Unclassified';
		vi.mocked(global.fetch).mockResolvedValueOnce(createMockResponse({ user: { id: '1' } }));

		const result = await proxy(mockRequest);
		expect(result.headers.get('Security-Classification')).toBe(
			'DYNAMIC CONTENT -- HIGHEST POSSIBLE CLASSIFICATION IS: Unclassified'
		);
	});

	it('invalid requests should not have a security-classification response header', async () => {
		vi.mocked(global.fetch).mockResolvedValueOnce(createMockResponse({}));

		const result = await proxy(mockRequest);
		expect(result).toBeInstanceOf(NextResponse);
		expect(result?.status).toBe(401);
		expect(result?.headers.get('Security-Classification')).toBeNull();
	});

	it('should return 401 for invalid session', async () => {
		vi.mocked(global.fetch).mockResolvedValueOnce(createMockResponse({}));

		const result = await authProxy(mockRequest);
		expect(result).toBeInstanceOf(NextResponse);
		expect(result?.status).toBe(401);
	});

	it('should return 401 for failed session check', async () => {
		vi.mocked(global.fetch).mockResolvedValueOnce(createMockResponse({}, false, 401));

		const result = await authProxy(mockRequest);
		expect(result).toBeInstanceOf(NextResponse);
		expect(result?.status).toBe(401);
	});

	it('should return 401 on fetch error', async () => {
		vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Fetch error'));

		const result = await authProxy(mockRequest);
		expect(result).toBeInstanceOf(NextResponse);
		expect(result?.status).toBe(401);
	});

	it('should not check session for non-protected routes', async () => {
		mockRequest.nextUrl.pathname = '/public-route';

		const result = await authProxy(mockRequest);
		expect(result).toBeUndefined();
		expect(global.fetch).not.toHaveBeenCalled();
	});
});
