import logger from '@/logger';
import { NextResponse } from 'next/server';

/**
 * Custom error for validation errors, typically thrown when request data is invalid
 */
export class ValidationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'ValidationError';
	}
}

/**
 * Generic function that provides a consistent way to handle errors in routes.
 * It logs the error and returns an appropriate response without exposing sensitive information to the client.
 *
 * @stig V-222600  | The application must not disclose unnecessary information to users.
 * @stig V-222610 | The application must generate error messages that provide information necessary for corrective actions without revealing information that could be exploited by adversaries.
 * @stig V-222611 | The application must reveal error messages only to the ISSO, ISSM, or SA.
 * @stig V-222656 | The application must not be subject to error handling vulnerabilities.
 *
 * @param error The error that was thrown in the route
 * @param context Context of the request that threw the error - typically the HTTP method
 * @returns a NextResponse object with the appropriate status code and error message
 */
export function handleError(error: Error, context: string) {
	logger.error(`Error processing ${context} request:`, error);
	if (error instanceof ValidationError) {
		return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
	}
	return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
}
