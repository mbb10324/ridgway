import { formatDate, formatDateForInput, getClassification, getNextAuthUrl } from '@/utils/utils-helpers';
import { type NextRequest } from 'next/server';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/env/server', () => ({
	env: process.env
}));

describe('Utils Tests', () => {
	describe('formatDate', () => {
		it('should format date correctly with day of the week, and MM/DD/YY format', () => {
			const date = '2023-08-31';
			const formattedDate = formatDate(date);
			expect(formattedDate).toMatch(/^[A-Za-z]+, \d{2}\/\d{2}\/\d{2}$/);
		});

		it('should format Date object correctly with day of the week, and MM/DD/YY format', () => {
			const date = new Date('2023-08-31');
			const formattedDate = formatDate(date);
			expect(formattedDate).toMatch(/^[A-Za-z]+, \d{2}\/\d{2}\/\d{2}$/);
		});
	});

	describe('formatDateForInput', () => {
		it.each([
			['2023-11-15', 'month and day greater than 10'],
			['2023-09-15', 'month less than 10 and day greater than 10'],
			['2023-11-05', 'day less than 10 and month greater than 10'],
			['2023-09-05', 'month and day less than 10'],
			['2023-02-03', 'single-digit month and day']
		])('should format date correctly for input in YYYY-MM-DD format (%s: %s)', (dateStr) => {
			const date = new Date(dateStr);
			const formattedDate = formatDateForInput(date);
			expect(formattedDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
		});
	});
});

describe('getNextAuthUrl', () => {
	it('should return AUTH_URL environment variable if set', () => {
		process.env.AUTH_URL = 'https://auth.example.com';
		const req = { headers: new Headers() } as NextRequest;

		const url = getNextAuthUrl(req);
		expect(url).toBe('https://auth.example.com');

		delete process.env.AUTH_URL;
	});

	it('should construct the URL based on request if AUTH_URL is not set', () => {
		const req = {
			headers: new Headers({ host: 'localhost:3000' })
		} as NextRequest;

		// @ts-ignore - We expect a type error here
		process.env.NODE_ENV = 'development';
		const url = getNextAuthUrl(req);
		expect(url).toBe('http://localhost:3000');

		// @ts-ignore - We expect a type error here
		process.env.NODE_ENV = 'production';
		const prodUrl = getNextAuthUrl(req);
		expect(prodUrl).toBe('https://localhost:3000');
	});

	it('should fallback to localhost:3000 if host header is missing', () => {
		const req = {
			headers: new Headers()
		} as NextRequest;

		// @ts-ignore - We expect a type error here
		process.env.NODE_ENV = 'development';
		const url = getNextAuthUrl(req);
		expect(url).toBe('http://localhost:3000');
	});
});

describe('getClassification', () => {
	it('should return the classification from the environment variable', () => {
		process.env.CLASSIFICATION = 'CUI';
		const actual = getClassification();
		expect(actual).toBe('CUI');
	});
});
