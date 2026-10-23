import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Input from '@/components/common/Input';

describe('Input component tests', () => {
	it('should render the input field with a label', () => {
		render(<Input label='Username' inputType='text' name='username' />);

		expect(screen.getByLabelText('Username')).toBeVisible();
		expect(screen.getByRole('textbox', { name: 'Username' })).toBeVisible();
	});

	it('should render the textarea field when inputType is textarea', () => {
		render(<Input label='Description' inputType='textarea' name='description' />);

		expect(screen.getByLabelText('Description')).toBeVisible();
		expect(screen.getByRole('textbox', { name: 'Description' })).toBeVisible();
	});

	it('should render the checkbox input field', () => {
		render(<Input label='Accept Terms' inputType='checkbox' name='acceptTerms' />);

		expect(screen.getByLabelText('Accept Terms')).toBeVisible();
		expect(screen.getByRole('checkbox', { name: 'Accept Terms' })).toBeVisible();
	});

	it('should display an error message when error prop is provided', () => {
		const errorMessage = 'This field is required';
		render(<Input label='Username' inputType='text' name='username' error={errorMessage} />);

		expect(screen.getByText(errorMessage)).toBeVisible();
	});

	it('should apply additional input props correctly', () => {
		render(<Input label='Username' inputType='text' name='username' placeholder='Enter your username' />);

		const inputElement = screen.getByPlaceholderText('Enter your username');
		expect(inputElement).toBeVisible();
		expect(inputElement).toHaveAttribute('name', 'username');
	});
});
