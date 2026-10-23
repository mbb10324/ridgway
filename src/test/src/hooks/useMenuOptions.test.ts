import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { usePathname, useRouter } from 'next/navigation';
import useMenuOptions from '@/hooks/useMenuOptions';
import type React from 'react';

// Mock Next.js router and signOut
vi.mock('next/navigation', () => ({
	usePathname: vi.fn(),
	useRouter: vi.fn()
}));

describe('useMenuOptions hook tests', () => {
	const mockSetShowMenu = vi.fn();
	const mockPush = vi.fn();

	beforeEach(() => {
		mockPush.mockClear();
		vi.mocked(usePathname).mockReturnValue('/');
		vi.mocked(useRouter).mockReturnValue({ push: mockPush } as unknown as ReturnType<typeof useRouter>);
		mockSetShowMenu.mockClear();
	});

	it('should return the correct menu options', () => {
		const { result } = renderHook(() => useMenuOptions(mockSetShowMenu));

		expect(result.current).toEqual([
			{
				title: 'Home',
				id: 'menu-home',
				path: '/',
				icon: expect.anything() as React.ReactNode,
				onClick: expect.any(Function) as () => void
			},
			{
				title: 'Tab 1',
				id: 'menu-tab1',
				path: '/tabs/tab1',
				icon: expect.anything() as React.ReactNode,
				onClick: expect.any(Function) as () => void
			},
			{
				title: 'Tab 2',
				id: 'menu-tab2',
				path: '/tabs/tab2',
				icon: expect.anything() as React.ReactNode,
				onClick: expect.any(Function) as () => void
			},
			{
				title: 'Tab 3',
				id: 'menu-tab3',
				path: '/tabs/tab3',
				icon: expect.anything() as React.ReactNode,
				onClick: expect.any(Function) as () => void
			}
		]);
	});

	it('should handle menu option clicks correctly', () => {
		const { result } = renderHook(() => useMenuOptions(mockSetShowMenu));

		act(() => result.current[0].onClick());
		expect(mockSetShowMenu).toHaveBeenCalledWith(false);

		act(() => result.current[1].onClick());
		expect(mockSetShowMenu).toHaveBeenCalledWith(false);

		act(() => result.current[2].onClick());
		expect(mockSetShowMenu).toHaveBeenCalledWith(false);

		act(() => result.current[3].onClick());
		expect(mockSetShowMenu).toHaveBeenCalledWith(false);
	});

	it('should not trigger navigation for the current path', () => {
		vi.mocked(usePathname).mockReturnValue('/');
		const { result } = renderHook(() => useMenuOptions(mockSetShowMenu));
		act(() => result.current[0].onClick());
		expect(mockPush).not.toHaveBeenCalled();
	});
});
