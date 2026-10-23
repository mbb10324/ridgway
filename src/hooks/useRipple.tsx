import { useState } from 'react';

export default function useButtonRipple() {
	const [rippleStyle, setRippleStyle] = useState({});
	const [rippleRef, setRippleRef] = useState(0);
	const [rippleKey, setRippleKey] = useState<number | null>(null);

	const createRipple = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, key: number) => {
		event.preventDefault();
		const button = event.currentTarget;
		const rect = button.getBoundingClientRect();
		const diameter = Math.max(button.offsetWidth, button.offsetHeight);
		const radius = diameter / 2;
		const x = event.clientX - rect.left - radius;
		const y = event.clientY - rect.top - radius;

		const style = {
			top: `${y}px`,
			left: `${x}px`,
			width: `${diameter}px`,
			height: `${diameter}px`
		};

		setRippleKey(key);
		setRippleStyle(style);
		setRippleRef((prevKey) => prevKey + 1);
	};

	return { rippleStyle, rippleKey, rippleRef, createRipple };
}
