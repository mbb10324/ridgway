import './hero.css';
import ScrollItem from '../../scroll/ScrollItem';
import useBreakpoints from '../../hooks/useBreakpoints';
import Image from 'next/image';

export default function Hero() {
	const breakpoint = useBreakpoints(900);

	return (
		<div className='hero-wrapper'>
			<div className='hero'>
				<h3>Introducing - the</h3>
				<div className='hero-design'>
					<h3>greatest design</h3>
					<Image src='/map.svg' alt='map' className='hero-map' width={0} height={0} />
				</div>
				{breakpoint ? (
					<h3>agency in the</h3>
				) : (
					<div className='hero-descriptor-block'>
						<h3>agency</h3>
						<p>We pride ourselves on being the best. Providing the best design solutions in the world.</p>
					</div>
				)}
				<h3>{breakpoint ? 'world.' : 'in the world.'}</h3>
				<ScrollItem type='parallaxY' parallaxSpeed={-0.1}>
					<h4 className='hero-key'>Best</h4>
				</ScrollItem>
			</div>
			<div className='contact-background'>
				<div />
				<div className='contact-background-block' />
				<div className='contact-background-block' />
				<div className='contact-background-block' />
				<div className='contact-background-block' />
			</div>
		</div>
	);
}
