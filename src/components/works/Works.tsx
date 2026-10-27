import ScrollItem from '../../scroll/ScrollItem';
import './works.css';
import Button from '../button/Button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import content from '../../content.json';

function highlightText(text: string, highlights: string[]) {
	const phrases = highlights.filter(Boolean).sort((a, b) => b.length - a.length);

	if (phrases.length === 0) {
		return [text];
	}

	const pattern = new RegExp(
		`(${phrases.map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
		'g'
	);
	const highlightedPhrases = new Set(phrases);

	return text.split(pattern).map((part, index) =>
		highlightedPhrases.has(part) ? (
			<span className='works-section-imp-text' key={`${part}-${index}`}>
				{part}
			</span>
		) : (
			part
		)
	);
}

export default function Works() {
	const router = useRouter();

	return (
		<div className='works' data-scroll-section>
			<div className='works-collage'>
				<Image src='/collage.jpg' alt='Collage' className='collage' width={1200} height={1200} sizes='100vw' />
			</div>
			<div className='works-sections'>
				<ScrollItem type='slideX' slideDistance={-200} transitionDuration={0.8} opacityDuration={1.5}>
					<div className='works-section'>
						<h2>{highlightText(content.home.workText, content.home.workHighlightText)}</h2>
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
