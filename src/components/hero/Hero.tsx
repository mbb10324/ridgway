import './hero.css';
import ScrollItem from '../../scroll/ScrollItem';
import Image from 'next/image';

export default function Hero() {
	return (
		<div className='hero-wrapper'>
			<div className='hero'>
				<h3>Introducing - the greatest design agency in the world.</h3>
				<div className='hero-map'>
					<Image src='/xviii.png' alt='map' width={2000} height={1280} sizes='10vw' />
				</div>
				<div className='hero-descriptor-block'>
					<p>We pride ourselves on being the best. Providing the best design solutions in the world.</p>
				</div>
				<ScrollItem type='parallaxY' parallaxSpeed={-0.2}>
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
