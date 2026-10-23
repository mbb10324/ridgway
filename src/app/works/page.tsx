'use client';

import { useState } from 'react';
import Layout from '../../layout/RidgwayLayout';
import './works.css';
import { worksPageItems } from '../../utils/helpers';
import Button from '../../components/button/Button';
import useBreakpoints from '../../hooks/useBreakpoints';
import useRipple from '../../hooks/useRipple';
import Image from 'next/image';

export default function Works() {
	const { rippleStyle, rippleKey, rippleRef, createRipple } = useRipple();
	const breakpoint = useBreakpoints(900);
	const [hoveredWork, setHoveredWork] = useState<string | null>(null);
	const [expandedWork, setExpandedWork] = useState<number | null>(null);

	function handleExpandingWork(index: number) {
		if (expandedWork === index) {
			setExpandedWork(null);
		} else {
			setExpandedWork(index);
		}
	}

	return (
		<>
			<Layout>
				<div className='works-page-wrapper'>
					<h1>Works</h1>
					<p className='works-page-desc'>
						We design, develop and ship digital products that drive success for our clients through fresh websites, strong
						brand systems and compelling creative content.
					</p>
					<div className='works-page-list'>
						{worksPageItems.map((item, index) => (
							<div
								className='works-page-item'
								key={index}
								onMouseEnter={() => setHoveredWork(item.mobileImg)}
								onMouseLeave={() => setHoveredWork(null)}
							>
								<div
									className='works-page-item-inner'
									onClick={(e) => {
										handleExpandingWork(index);
										createRipple(e, index);
									}}
								>
									<p>
										{index <= 8 ? `0${index + 1}` : index + 1} <span>{item.title}</span>
									</p>
									<p>{item.category}</p>
									<span key={rippleRef} className='ripple' style={rippleKey === index ? rippleStyle : {}} />
								</div>
								<div
									className={`works-page-item-expanded-content ${expandedWork === index ? 'content-open' : 'content-closed'}`}
								>
									<div className='works-page-item-expanded-description'>
										<p>{item.description}</p>
										<Button
											onClick={() => window.open(item.link, '_blank', 'noreferrer')}
											primary='var(--secondary)'
											secondary='var(--tan)'
											fontSize='2rem'
										>
											Visit Site
										</Button>
									</div>
									<Image src={breakpoint ? item.mobileImg : item.desktopImg} alt='Bill Murray' width={0} height={0} />
								</div>
							</div>
						))}
					</div>
				</div>
			</Layout>
			{hoveredWork && (
				<div className='works-page-item-image'>
					<Image src={hoveredWork} alt='Bill Murray' width={0} height={0} />
				</div>
			)}
		</>
	);
}
