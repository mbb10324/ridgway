import { generateRedirectUri } from '@/utils/auth';
import { describe, it, expect, vi } from 'vitest';

vi.mock('@/env/server', () => ({ env: process.env }));

describe('generateRedirectUri', () => {
	process.env.PROVIDER_LOGOUT_URL = 'https://provider.com/logout';
	process.env.PROVIDER_CLIENT_ID = 'test-client-id';

	it('should return the original URL if signOut is not true', () => {
		const result = generateRedirectUri({
			url: '/dashboard',
			baseUrl: 'https://example.com'
		});
		expect(result).toBe('https://example.com/dashboard');
	});

	it('should generate provider logout URL when signOut is true', () => {
		const result = generateRedirectUri({
			url: '/?signOut=true',
			baseUrl: 'https://example.com'
		});
		expect(result).toBe(
			'https://provider.com/logout?client_id=test-client-id&post_logout_redirect_uri=https%3A%2F%2Fexample.com%2F'
		);
	});

	it('should include post_logout_redirect_uri if provided', () => {
		const result = generateRedirectUri({
			url: '/?signOut=true&post_logout_redirect_uri=/home',
			baseUrl: 'https://example.com'
		});
		expect(result).toBe(
			'https://provider.com/logout?client_id=test-client-id&post_logout_redirect_uri=https%3A%2F%2Fexample.com%2Fhome'
		);
	});

	it('should return baseUrl if url is empty', () => {
		const result = generateRedirectUri({
			url: '',
			baseUrl: 'https://example.com'
		});
		expect(result).toBe('https://example.com/');
	});

	it('should handle missing PROVIDER_LOGOUT_URL', () => {
		delete process.env.PROVIDER_LOGOUT_URL;
		const result = generateRedirectUri({
			url: '/?signOut=true',
			baseUrl: 'https://example.com'
		});
		expect(result).toBe('https://example.com/');
	});
});
