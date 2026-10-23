'use client';

// import DashboardWrapper from '@/components/common/DashboardWrapper';
import About from '../components/about/About';
import Hero from '../components/hero/Hero';
import Works from '../components/works/Works';
import Layout from '../layout/RidgwayLayout';
import Collaborate from '../components/collaborate/Collaborate';

export default function IndexPage() {
	return (
		// <DashboardWrapper>
		<Layout>
			<Hero />
			<About />
			<Works />
			<Collaborate />
		</Layout>
	);
}
