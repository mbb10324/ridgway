import ColorSwatch from '../color-swatch/ColorSwatch';
import LavaLampBorder from '../lava-lamp-border/LavaLampBorder';
import './about.css';
import Button from '../button/Button';
import { useRouter } from 'next/navigation';

export default function About() {
	const router = useRouter();

	return (
		<div className='about'>
			<div className='about-desc-area'>
				<p>
					<span className='at-symbol'>@ </span>
					<span>Revel</span> - we develop modern web applications that transcend the capabilities of the browser. We utilize
					advanced technologies to design and develop products that provide a superior user experience. Our applications are
					built to be responsive, scalable, and secure.
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
