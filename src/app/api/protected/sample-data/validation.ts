/**
 * @stig V-222606 | The application must validate all input.
 * @stig V-222609 | The application must not be subject to input handling vulnerabilities.
 */
import { ValidationError } from '../../error-handling';

function isValidID(value: number): boolean {
	return typeof value === 'number' && Number.isInteger(value) && value > 0;
}

function isValidWeight(value: number): boolean {
	return typeof value === 'number' && value > 0 && value < 1000;
}

function isValidDate(value: string): boolean {
	const date = new Date(value);
	return !isNaN(date.getTime());
}

function isValidNote(value: string): boolean {
	return typeof value === 'string' && value.length <= 500;
}

export type ValidationSampleData = {
	weight: number;
	date: string;
	notes?: string;
};

// Validation function for sample data
export function validateSampleData(data: ValidationSampleData): void {
	const { weight, date, notes } = data;

	if (!weight || !date) {
		throw new ValidationError('Invalid input: all fields are required');
	}

	if (!isValidWeight(weight)) {
		throw new ValidationError('Invalid weight: must be a positive integer between 1 and 999');
	}
	if (!isValidDate(date)) {
		throw new ValidationError('Invalid date: must be a valid date string');
	}
	if (notes && !isValidNote(notes)) {
		throw new ValidationError('Invalid notes: must be a string with a maximum length of 500 characters');
	}
}

// Validation function for an id
export function validateId(id: number): void {
	if (!id) {
		throw new ValidationError('Invalid id: the id is required');
	}
	if (!isValidID(id)) {
		throw new ValidationError('Invalid id: must be a positive integer');
	}
}
