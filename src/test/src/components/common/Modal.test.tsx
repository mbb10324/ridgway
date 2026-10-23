import Modal from '@/components/common/Modal';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Modal Component', () => {
	it('renders the children when showModal is true', () => {
		render(
			<Modal showModal={true}>
				<div>Modal Content</div>
			</Modal>
		);

		expect(screen.getByText('Modal Content')).toBeInTheDocument();
	});

	it('does not render the children when showModal is false', () => {
		render(
			<Modal showModal={false}>
				<div>Modal Content</div>
			</Modal>
		);

		expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
	});
});
