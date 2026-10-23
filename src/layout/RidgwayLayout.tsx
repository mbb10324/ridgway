'use client';

import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import './ridgway-layout.css';
import { useEffect } from 'react';

type RidgwayLayoutProps = {
	children: React.ReactNode;
};

export default function RidgwayLayout(props: Readonly<RidgwayLayoutProps>) {
	const { children } = props;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className='layout-wrapper'>
			<Header />
			<div className='layout'>{children}</div>
			<Footer />
		</div>
	);
}
