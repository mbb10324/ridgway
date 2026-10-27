import LavaLamp from '../../components/lava-lamp/LavaLamp';
import Layout from '../../layout/RidgwayLayout';
import './about.css';
import content from '../../content.json';

export default function About() {
	return (
		<Layout>
			<div className='about-wrapper'>
				<div className='swatch-wrapper'>
					<LavaLamp />
					<div className='about-section'>
						<h1>About Us</h1>
						<div className='about-section-text'>
							<div className='about-text'>
								<p>
									<span className='at-symbol'>@ </span>
									<span>{content.general.unitName}</span> - {content.about.text}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
