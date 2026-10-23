import ClassificationMarking from '@/components/common/ClassificationMarking';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/env/server', () => ({
	env: process.env
}));

describe('ClassificationMarking component tests', () => {
	it('should not render anything when no classification is set', () => {
		const { container } = render(<ClassificationMarking />);
		expect(container).toBeEmptyDOMElement();
	});

	it('should render the classification banner when using custom classification', () => {
		render(<ClassificationMarking classification='CUI WITH OTHER THINGS' />);
		const classifcationMarking = screen.getByText('CUI WITH OTHER THINGS');
		expect(classifcationMarking).toBeVisible();
	});

	it('should render the classification banner when using default classification', () => {
		process.env.CLASSIFICATION = 'Secret';
		render(<ClassificationMarking />);
		const classifcationMarking = screen.getByText('SECRET');
		expect(classifcationMarking).toBeVisible();
	});

	it('should render the classification banner with the custom color', () => {
		process.env.CLASSIFICATION = 'Unclassified';
		render(<ClassificationMarking customColor='bg-white' />);
		const classifcationMarking = screen.getByText('UNCLASSIFIED');
		expect(classifcationMarking).toBeVisible();
		expect(classifcationMarking).toHaveClass('bg-white');
	});

	it('should render the classification banner at the bottom of the screen', () => {
		process.env.CLASSIFICATION = 'Unclassified';
		render(<ClassificationMarking showBottom />);
		const classifcationMarking = screen.getAllByText('UNCLASSIFIED');
		expect(classifcationMarking).toHaveLength(2);
		expect(classifcationMarking[0]).toBeVisible();
		expect(classifcationMarking[1]).toBeVisible();
		expect(classifcationMarking[0]).toHaveClass('sticky top-0');
		expect(classifcationMarking[1]).toHaveClass('fixed bottom-0');
	});

	it('should render the markings with the appropriate color for each classification', () => {
		process.env.CLASSIFICATION = 'Unclassified';
		const { rerender } = render(<ClassificationMarking />);
		let classifcationMarking = screen.getByText('UNCLASSIFIED');
		expect(classifcationMarking).toBeVisible();
		expect(classifcationMarking).toHaveClass('bg-custom-unclassified');

		process.env.CLASSIFICATION = 'CUI';
		rerender(<ClassificationMarking />);
		classifcationMarking = screen.getByText('CUI');
		expect(classifcationMarking).toBeVisible();
		expect(classifcationMarking).toHaveClass('bg-custom-cui');

		process.env.CLASSIFICATION = 'Classified';
		rerender(<ClassificationMarking />);
		classifcationMarking = screen.getByText('CLASSIFIED');
		expect(classifcationMarking).toBeVisible();
		expect(classifcationMarking).toHaveClass('bg-custom-classified');

		process.env.CLASSIFICATION = 'Confidential';
		rerender(<ClassificationMarking />);
		classifcationMarking = screen.getByText('CONFIDENTIAL');
		expect(classifcationMarking).toBeVisible();
		expect(classifcationMarking).toHaveClass('bg-custom-confidential');

		process.env.CLASSIFICATION = 'Secret';
		rerender(<ClassificationMarking />);
		classifcationMarking = screen.getByText('SECRET');
		expect(classifcationMarking).toBeVisible();
		expect(classifcationMarking).toHaveClass('bg-custom-secret');

		process.env.CLASSIFICATION = 'Top Secret';
		rerender(<ClassificationMarking />);
		classifcationMarking = screen.getByText('TOP SECRET');
		expect(classifcationMarking).toBeVisible();
		expect(classifcationMarking).toHaveClass('bg-custom-top-secret');
	});
});
