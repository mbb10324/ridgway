/* eslint-disable sonarjs/pseudo-random */
import { useEffect, useState } from 'react';
import './lava-lamp-border.css';

type LavaLampBorderProps = {
	children: React.ReactNode;
};

export default function LavaLampBorder(props: Readonly<LavaLampBorderProps>) {
	const { children } = props;
	const [border, setBorder] = useState('100px 200px 300px 400px');

	useEffect(() => {
		const intervalId = setInterval(() => {
			const topLeft = Math.floor(Math.random() * 500) + 200;
			const topRight = Math.floor(Math.random() * 500) + 200;
			const bottomRight = Math.floor(Math.random() * 500) + 200;
			const bottomLeft = Math.floor(Math.random() * 500) + 200;
			setBorder(`${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`);
		}, 2000);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<div className='lava-lamp-border' style={{ borderRadius: border }}>
			{children}
		</div>
	);
}
