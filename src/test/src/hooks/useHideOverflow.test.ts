import { afterEach, describe, expect, it } from 'vitest';
import useHideOverflow, { type OverflowDirection } from '@/hooks/useHideOverflow';
import { renderHook } from '@testing-library/react';

describe('useHideOverflow', () => {
	afterEach(() => {
		document.body.style.overflow = '';
	});

	it('should set body overflow to hidden when trigger is true', () => {
		const { rerender } = renderHook(({ direction }) => useHideOverflow(direction as OverflowDirection), {
			initialProps: { direction: 'both' }
		});

		expect(document.body.style.overflow).toBe('hidden');

		// Change trigger to false and re-render
		rerender({ direction: 'horizontal' });
		expect(document.body.style.overflow).toBe('hidden auto');
	});

	it('should set body overflow to hidden auto when trigger is false', () => {
		const { rerender } = renderHook(({ direction }) => useHideOverflow(direction), {
			initialProps: { direction: 'horizontal' as OverflowDirection }
		});

		expect(document.body.style.overflow).toBe('hidden auto');

		// Change trigger to true and re-render
		rerender({ direction: 'both' as OverflowDirection });
		expect(document.body.style.overflow).toBe('hidden');
	});
});
