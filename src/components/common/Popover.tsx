import React, { useEffect, useRef, useState } from 'react';

type PopoverPosition = 'top' | 'bottom' | 'left' | 'right' | 'bottom-left';

type PopoverProps = {
	children: React.ReactNode;
	body: React.ReactNode;
	position: PopoverPosition;
	trigger: boolean;
	offset?: number;
};

export default function Popover(props: Readonly<PopoverProps>) {
	const { children, body, position, offset = 20, trigger } = props;
	const childRef = useRef<HTMLDivElement>(null);
	const popoverRef = useRef<HTMLDivElement>(null);
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

	useEffect(() => {
		if (childRef.current) {
			const rect: DOMRect = childRef.current.getBoundingClientRect();
			setDimensions({ width: rect.width, height: rect.height });
		}
	}, [children]);

	useEffect(() => {
		if (popoverRef.current) {
			const style = popoverRef.current.style;
			const popoverStyles = determinePopoverStyles({ position, offset, dimensions });

			Object.entries(popoverStyles).forEach(([key, value]) => {
				style.setProperty(`--${key}`, value as string);
			});
		}
	}, [position, offset, dimensions, trigger]);

	return (
		<div className='relative w-fit'>
			<div ref={popoverRef} className={`popover-content ${trigger ? 'active' : 'inactive'}`}>
				{!!trigger && body}
			</div>
			<div ref={childRef} className='cursor-pointer'>
				{children}
			</div>
		</div>
	);
}

type DeterminePopoverStylesParams = {
	position: PopoverPosition;
	offset: number;
	dimensions: { width: number; height: number };
};

function determinePopoverStyles({ position, offset, dimensions }: DeterminePopoverStylesParams) {
	switch (position) {
		case 'top':
			return {
				'popover-bottom': `${dimensions.height + offset}px`,
				'popover-left': '50%',
				'popover-transform': 'translateX(-50%)'
			};
		case 'bottom':
			return {
				'popover-top': `${dimensions.height + offset}px`,
				'popover-left': '50%',
				'popover-transform': 'translateX(-50%)'
			};
		case 'left':
			return {
				'popover-top': '50%',
				'popover-right': `${dimensions.width + offset}px`,
				'popover-transform': 'translateY(-50%)'
			};
		case 'right':
			return {
				'popover-top': '50%',
				'popover-left': `${dimensions.width + offset}px`,
				'popover-transform': 'translateY(-50%)'
			};
		case 'bottom-left':
			return {
				'popover-top': `${dimensions.height + offset}px`,
				'popover-right': '0'
			};
	}
}
