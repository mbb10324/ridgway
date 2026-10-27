import ScrollItem from '../../scroll/ScrollItem';
import './works.css';
import Button from '../button/Button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Works() {
	const router = useRouter();

	return (
		<div className='works' data-scroll-section>
			{/* <ScrollItem type="slideY" transitionDuration={0.8} opacityDuration={1.5}>
				<h3>
					We design unique solutions that enhance the user experience, and bring
					<span className="works-imp-text"> value to your company.</span>
				</h3>
			</ScrollItem> */}
			<div className='works-collage'>
				<Image src='/collage.jpg' alt='Collage' className='collage' width={1200} height={1200} sizes='100vw' />
			</div>
			<div className='works-sections'>
				<ScrollItem type='slideX' slideDistance={-200} transitionDuration={0.8} opacityDuration={1.5}>
					<div className='works-section'>
						<h2>
							From beautifully designed <span className='works-section-imp-text'>websites</span> and{' '}
							<span className='works-section-imp-text'>mobile</span> applications, full stack software products, and
							open-source librarys.
						</h2>
						<Button
							onClick={() => router.push('/works')}
							primary='var(--orange)'
							secondary='var(--primary)'
							backdrop='var(--tan)'
						>
							See our Work
						</Button>
					</div>
				</ScrollItem>
			</div>
		</div>
	);
}
