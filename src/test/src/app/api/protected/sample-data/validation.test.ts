import { describe, expect, it } from 'vitest';
import { validateSampleData, validateId } from '@/app/api/protected/sample-data/validation';
import { createValidSampleData } from '@/test/test-helpers/test-helpers';

describe('validations', () => {
	describe('sample data validation', () => {
		it('returns true when valid data is passed to it', () => {
			const validData = createValidSampleData();
			expect(() => validateSampleData(validData)).not.toThrow();
		});

		it('throws an error when the weight is less than 0', () => {
			const dataWithInvalidWeight = createValidSampleData({ weight: -1 });
			expect(() => validateSampleData(dataWithInvalidWeight)).toThrow(
				'Invalid weight: must be a positive integer between 1 and 999'
			);
		});

		it('throws an error when the weight is more than 999', () => {
			const dataWithInvalidWeight = createValidSampleData({ weight: 1000 });
			expect(() => validateSampleData(dataWithInvalidWeight)).toThrow(
				'Invalid weight: must be a positive integer between 1 and 999'
			);
		});

		it('throws an error when the data has an invalid date string', () => {
			const dataWithInvalidDate = createValidSampleData({ date: 'invalidDate' });
			expect(() => validateSampleData(dataWithInvalidDate)).toThrow('Invalid date: must be a valid date string');
		});

		it('throws an error when the note exceeds 500 characters', () => {
			const char = 'a';
			const invalidLength = 501;
			const stringWithInvalidLength = char.repeat(invalidLength);
			const dataWithInvalidNotesLength = createValidSampleData({ notes: stringWithInvalidLength });
			expect(() => validateSampleData(dataWithInvalidNotesLength)).toThrow(
				'Invalid notes: must be a string with a maximum length of 500 characters'
			);
		});

		it('throws an error when weight is missing', () => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars -- weight is removed to test the validation
			const { weight, ...rest } = createValidSampleData();
			expect(() => validateSampleData({ ...rest, weight: undefined as unknown as number })).toThrow(
				'Invalid input: all fields are required'
			);
		});

		it('throws an error when date is missing', () => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars -- date is removed to test the validation
			const { date, ...rest } = createValidSampleData();
			expect(() => validateSampleData({ ...rest, date: undefined as unknown as string })).toThrow(
				'Invalid input: all fields are required'
			);
		});
	});

	describe('ID validation', () => {
		it('throws an error when the id is not provided', () => {
			expect(() => validateId(undefined as unknown as number)).toThrow('Invalid id: the id is required');
		});

		it('throws an error when the id is not a number', () => {
			expect(() => validateId('string' as unknown as number)).toThrow('Invalid id: must be a positive integer');
			expect(() => validateId({} as unknown as number)).toThrow('Invalid id: must be a positive integer');
		});

		it('throws an error when the id is 0', () => {
			expect(() => validateId(0)).toThrow('Invalid id: the id is required');
		});

		it('throws an error when the id is negative', () => {
			expect(() => validateId(-1)).toThrow('Invalid id: must be a positive integer');
		});
	});
});
