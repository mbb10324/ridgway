import { useEffect } from 'react';

export type OverflowDirection = 'horizontal' | 'both';

export default function useHideOverflow(directions : OverflowDirection = 'both') {
	useEffect(() => {
		switch (directions) {
			case 'both':
				document.body.style.overflow = 'hidden';
				break;
			case 'horizontal':
				document.body.style.overflow = 'hidden auto';
				break;
		}	
	}, [directions]);
}
