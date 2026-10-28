'use client';

import { useState } from 'react';
import Layout from '../../layout/RidgwayLayout';
import './works.css';
import Button from '../../components/button/Button';
import useBreakpoints from '../../hooks/useBreakpoints';
import useRipple from '../../hooks/useRipple';
import Image from 'next/image';
import content from '../../content.json';

export default function Works() {
	const { rippleStyle, rippleKey, rippleRef, createRipple } = useRipple();
	const breakpoint = useBreakpoints(900);
	const [hoveredWork, setHoveredWork] = useState<string | null>(null);
	const [expandedWork, setExpandedWork] = useState<number | null>(0);

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
					<p className='works-page-desc'>{content.work.text}</p>
					<div className='works-page-list'>
						{content.work.items.map((item, index) => (
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
									<div
										className='works-page-item-expanded-description'
										style={{
											justifyContent: item.description.length > 600 ? 'flex-start' : 'center',
											overflowY: item.description.length > 600 ? 'scroll' : 'hidden'
										}}
									>
										<p>{item.description}</p>
										{item.link ? (
											<Button
												onClick={() => window.open(item.link, '_blank', 'noreferrer')}
												primary='var(--secondary)'
												secondary='var(--tan)'
												fontSize='2rem'
											>
												Visit Site
											</Button>
										) : (
											<h4>Contact us to learn more about {item.title}</h4>
										)}
									</div>
									<Image
										src={breakpoint ? item.mobileImg : item.desktopImg}
										alt={item.title}
										width={breakpoint ? 708 : 2556}
										height={breakpoint ? 1246 : 1660}
										sizes='(max-width: 900px) 45vw, 35vw'
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</Layout>
			{hoveredWork && (
				<div className='works-page-item-image'>
					<Image src={hoveredWork} alt='Work preview' width={708} height={1246} sizes='25vw' />
				</div>
			)}
		</>
	);
}
