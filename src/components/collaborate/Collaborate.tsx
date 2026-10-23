import { useRouter } from 'next/navigation';
import ScrollItem from '../../scroll/ScrollItem';
import Button from '../button/Button';
import './collaborate.css';

export default function Collaborate() {
	const router = useRouter();

	return (
		<div className='collaborate-wrapper'>
			<div className='collaborate'>
				<ScrollItem opacityDuration={1.5} type='slideY' transitionDuration={0.8}>
					<div className='collaborate-section'>
						<h1 className='collaborate-message'>
							Lets collaberate! Reach out today to work with one of our world class designers.
						</h1>
						<Button primary='var(--pink)' secondary='var(--tan)' onClick={() => router.push('/contact')}>
							Contact Us
						</Button>
					</div>
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
