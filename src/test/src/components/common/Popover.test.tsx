import { render, screen } from '@testing-library/react';
import Popover from '@/components/common/Popover';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Popover Component', () => {
	beforeEach(() => {
		// Mock getBoundingClientRect for the child element to control the dimensions
		HTMLDivElement.prototype.getBoundingClientRect = vi.fn(() => ({
			width: 100,
			height: 50,
			top: 0,
			left: 0,
			bottom: 0,
			right: 0,
			x: 0,
			y: 0,
			toJSON: () => ({})
		}));
	});

	it('renders the children and does not render the body initially', () => {
		const popoverContainer = renderPopover({ position: 'bottom', trigger: false });

		// Check if children are rendered
		expect(screen.getByText(/Click Me/i)).toBeVisible();

		expect(popoverContainer.querySelector('inactive')).not.toBeInTheDocument();
		expect(popoverContainer).not.toHaveClass('active');
	});

	it('applies correct CSS variables for positioning at the top', () => {
		const popoverContainer = renderPopover({ position: 'top', trigger: true });

		expect(popoverContainer.style.getPropertyValue('--popover-bottom')).toBe('70px');
		expect(popoverContainer.style.getPropertyValue('--popover-left')).toBe('50%');
		expect(popoverContainer.style.getPropertyValue('--popover-transform')).toBe('translateX(-50%)');
	});

	it('applies correct CSS variables for positioning on the left', () => {
		const popoverContainer = renderPopover({ position: 'left', trigger: true, offset: 20 });

		expect(popoverContainer.style.getPropertyValue('--popover-top')).toBe('50%');
		expect(popoverContainer.style.getPropertyValue('--popover-right')).toBe('120px'); // width (100) + offset (20)
		expect(popoverContainer.style.getPropertyValue('--popover-transform')).toBe('translateY(-50%)');
	});

	it('applies correct CSS variables for positioning on the right', () => {
		const popoverContainer = renderPopover({ position: 'right', trigger: true, offset: 20 });

		expect(popoverContainer.style.getPropertyValue('--popover-top')).toBe('50%');
		expect(popoverContainer.style.getPropertyValue('--popover-left')).toBe('120px'); // width (100) + offset (20)
		expect(popoverContainer.style.getPropertyValue('--popover-transform')).toBe('translateY(-50%)');
	});

	it('applies correct CSS variables for positioning at the bottom-left', () => {
		const popoverContainer = renderPopover({ position: 'bottom-left', trigger: true, offset: 20 });

		expect(popoverContainer.style.getPropertyValue('--popover-top')).toBe('70px'); // height (50) + offset (20)
		expect(popoverContainer.style.getPropertyValue('--popover-right')).toBe('0');
	});
});

type RenderPopoverParams = {
	position: 'top' | 'bottom' | 'left' | 'right' | 'bottom-left';
	trigger: boolean;
	offset?: number;
};

function renderPopover({ position, trigger, offset }: RenderPopoverParams): HTMLElement {
	render(
		<Popover
			body={<div data-testid='popover-body'>This is the popover body</div>}
			position={position}
			trigger={trigger}
			offset={offset}
		>
			<div data-testid='popover-children'>Click me</div>
		</Popover>
	);

	const popoverContainer = !!trigger
		? screen.getByTestId('popover-body').parentElement
		: screen.getByTestId('popover-children').parentElement;

	if (!popoverContainer) {
		throw new Error('Popover container not found');
	}

	return popoverContainer;
}
