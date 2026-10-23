import createSvgComponent from '@/components/svg/SvgSetup';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';

const MockContent = () => <circle cx='12' cy='12' r='10' />;

describe('SvgComponent', () => {
	it('should render an SVG with default size and color', () => {
		const Svg = createSvgComponent(MockContent, 'MockSvg');
		render(<Svg />);

		const svgElement = screen.getByTestId('svg');

		expect(svgElement).toBeInTheDocument();
		expect(svgElement).toHaveAttribute('stroke', 'currentColor');
		expect(svgElement).toHaveAttribute('height', '24');
		expect(svgElement).toHaveAttribute('width', '24');
	});

	it('should apply custom size and color', () => {
		const Svg = createSvgComponent(MockContent, 'MockSvg');
		render(<Svg size={48} color='red' />);

		const svgElement = screen.getByTestId('svg');

		expect(svgElement).toHaveAttribute('stroke', 'red');
		expect(svgElement).toHaveAttribute('height', '48');
		expect(svgElement).toHaveAttribute('width', '48');
	});

	it('should execute the onClick function when clicked', async () => {
		const Svg = createSvgComponent(MockContent, 'MockSvg');
		const onClickMock = vi.fn();
		render(<Svg onClick={onClickMock} />);

		await userEvent.click(screen.getByTestId('svg'));
		expect(onClickMock).toHaveBeenCalled();
	});

	it('should render the provided child content', () => {
		const Svg = createSvgComponent(MockContent, 'MockSvg');
		render(<Svg />);

		const svgElement = screen.getByTestId('svg');
		expect(svgElement).toBeInTheDocument();
	});
});
