import ColorSwatch from '../color-swatch/ColorSwatch';
import LavaLampBorder from '../lava-lamp-border/LavaLampBorder';
import './about.css';
import Button from '../button/Button';
import { useRouter } from 'next/navigation';
import content from '../../content.json';

export default function About() {
	const router = useRouter();

	return (
		<div className='about'>
			<div className='about-desc-area'>
				<p>
					<span className='at-symbol'>@ </span>
					<span>{content.general.unitName}</span> - {content.home.aboutText}
				</p>
				<Button
					onClick={() => router.push('/about')}
					primary='var(--yellow)'
					secondary='var(--primary)'
					backdrop='var(--tan)'
				>
					Learn More
				</Button>
			</div>
			<LavaLampBorder>
				<ColorSwatch />
			</LavaLampBorder>
		</div>
	);
}
