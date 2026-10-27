'use client';

/* eslint-disable sonarjs/pseudo-random */
import { useEffect } from 'react';
import './lava-lamp.css';

type LavaLampProps = {
	theme?: string;
};

export default function LavaLamp(props: Readonly<LavaLampProps>) {
	const { theme } = props;

	const circleIDs = [
		'smallCircle1',
		'smallCircle2',
		'extraSmallCircle1',
		'extraSmallCircle2',
		'extraSmallCircle3',
		'extraSmallCircle4'
	];
	const intervals = [10000, 8500, 8500, 10000, 10000, 8500];

	useEffect(() => {
		const intervalIds: number[] = [];

		circleIDs.forEach((id, index) => {
			const circle = document.getElementById(id);
			const intervalId = window.setInterval(() => {
				if (circle) {
					circle.style.left = `calc(${Math.random() * 100}%)`;
					circle.style.top = `calc(${Math.random() * 100}%)`;
				}
			}, intervals[index]);

			intervalIds.push(intervalId);
		});

		return () => {
			intervalIds.forEach((id) => window.clearInterval(id));
		};
		//eslint-disable-next-line
	}, []);

	return (
		<>
			<div className='container'>
				<div className={`${theme}1 extraSmallCircle1`} id='extraSmallCircle1'></div>
				<div className={`${theme}2 extraSmallCircle2`} id='extraSmallCircle2'></div>
				<div className={`${theme}1 extraSmallCircle3`} id='extraSmallCircle3'></div>
				<div className={`${theme}2 extraSmallCircle4`} id='extraSmallCircle4'></div>
				<div className={`${theme}1 smallCircle1`} id='smallCircle1'></div>
				<div className={`${theme}2 smallCircle2`} id='smallCircle2'></div>
				<div className={`${theme}1 mediumCircle1`}></div>
				{/* <div className={`${theme}2 mediumCircle2`}></div> */}
				<div className={`${theme}1 bigCircle`}></div>
			</div>
		</>
	);
}
