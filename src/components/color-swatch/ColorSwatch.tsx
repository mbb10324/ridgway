import { useEffect, useState } from 'react';
import { shuffleArray } from '../../utils/helpers';
import './color-swatch.css';

export default function ColorSwatch() {
	const [colorSwatch, setColorSwatch] = useState<string[]>([]);

	useEffect(() => {
		const baseColors = ['var(--blue)', 'var(--pink)', 'var(--yellow)', 'var(--orange)'];
		const intervalId = setInterval(() => {
			let colors: string[] = [];
			while (colors.length < 35) {
				colors = colors.concat(baseColors.slice(0, Math.min(35 - colors.length, baseColors.length)));
			}
			setColorSwatch(shuffleArray(colors));
		}, 2000);
		return () => clearInterval(intervalId);
	}, []);

	return (
		<div className='swatch'>
			{colorSwatch.map((color, index) => (
				<div className='swatch-item' style={{ backgroundColor: color }} key={index} />
			))}
		</div>
	);
}
