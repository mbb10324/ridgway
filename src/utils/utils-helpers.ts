/* eslint-disable sonarjs/todo-tag */
import { type NextRequest } from 'next/server';
import { env } from '@/env/server';

// TODO: Double check SSR vs client side usage.
export function formatDate(todaysDate: string | Date) {
	'use client';
	const date = new Date(todaysDate);
	const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
	const datePart = date.toLocaleDateString('en-US', {
		day: '2-digit',
		month: '2-digit',
		year: '2-digit'
	});
	return `${weekday}, ${datePart}`;
}

export function formatDateForInput(date: string | Date) {
	'use client';
	const d = new Date(date);
	const format = `${d.getFullYear()}-${
		d.getMonth() + 1 < 10 ? '0' : ''
	}${d.getMonth() + 1}-${d.getDate() < 10 ? '0' : ''}${d.getDate()}`;
	return format;
}

export function getNextAuthUrl(req: NextRequest): string {
	// First, try to use AUTH_URL environment variable
	if (env.AUTH_URL) {
		return env.AUTH_URL;
	}

	// If AUTH_URL is not set, construct the URL dynamically
	const protocol = env.NODE_ENV === 'production' ? 'https' : 'http';
	const host = req.headers.get('host') ?? 'localhost:3000';
	return `${protocol}://${host}`;
}

export function getClassification() {
	return env.CLASSIFICATION;
}
