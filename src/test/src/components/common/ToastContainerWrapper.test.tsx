import ToastContainerWrapper from '@/components/common/ToastContainerWrapper';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('ToastContainerWrapper component test', () => {
	it('should render ToastContainerWrapper', () => {
		const { container } = render(<ToastContainerWrapper />);
		expect(container?.firstChild).toHaveClass('Toastify');
	});
});
