import './hero.css';
import '../../app/contact/contact.css';
import ScrollItem from '../../scroll/ScrollItem';
import Image from 'next/image';
import content from '../../content.json';

export default function Hero() {
	return (
		<div className='hero-wrapper'>
			<div className='hero'>
				<h3>{content.home.heroText}</h3>
				<div className='hero-map'>
					<Image src='/xviii.png' alt='map' width={2000} height={1280} sizes='10vw' />
				</div>
				<div className='hero-descriptor-block'>
					<p>{content.home.heroSubText}</p>
				</div>
				<ScrollItem type='parallaxY' parallaxSpeed={-0.2}>
					<h4 className='hero-key'>{content.home.heroKeyWord}</h4>
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
