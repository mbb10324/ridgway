import LavaLamp from '../../components/lava-lamp/LavaLamp';
import Layout from '../../layout/RidgwayLayout';
import './about.css';

export default function About() {
	return (
		<Layout>
			<div className='about-wrapper'>
				<div className='swatch-wrapper'>
					<LavaLamp />
					<div className='about-section'>
						<h1>About Us</h1>
						<div className='about-text'>
							<p>
								<span className='at-symbol'>@ </span>
								<span>Revel</span> - we develop modern web applications that transcend the capabilities of the browser. We
								utilize advanced technologies to design and develop products that provide a superior user experience. Our
								applications are built to be responsive, scalable, and secure.
							</p>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
