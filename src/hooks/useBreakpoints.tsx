'use client';

import { useEffect, useState } from 'react';

export default function useBreakpoints(thisBreakpoint: number) {
	const [breakpoint, setBreakpoint] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < thisBreakpoint) {
				setBreakpoint(true);
			} else {
				setBreakpoint(false);
			}
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [thisBreakpoint]);

	return breakpoint;
}
