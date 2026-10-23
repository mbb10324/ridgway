import { useEffect, useRef, useState } from 'react';
import './scroll-item.css';

type ScrollItemProps = {
	children: React.ReactNode;
	type: 'parallaxX' | 'parallaxY' | 'slideX' | 'slideY' | 'none';
	onVisible?: () => void;
	getPosition?: (position: number) => void;
	parallaxSpeed?: number;
	transitionDuration?: number;
	opacityDuration?: number;
	slideDistance?: number;
	control?: boolean;
	fire?: boolean;
};

/**
 * The ScrollItem component is a wrapper to apply scroll effects to its children (i.e sliding in/out, parallax, fade in/out, etc.).
 *
 * @props children (required) - The children of the ScrollItem component.
 * @props type (required) - The type of effect to apply to the children. Possible values are "parallaxX", "parallaxY", "slideX", "slideY".
 * @props onVisible (optional) - A function that is called when the ScrollItem becomes visible in the viewport.
 * @props getPosition (optional) - A function that is called with the position of the ScrollItem.
 * @props parallaxSpeed (optional) - The speed of the parallax effect. A higher value will make the parallax effect faster.
 * @props transitionDuration (optional) - The duration of the transition effect.
 * @props opacityDuration (optional) - The duration of the opacity effect.
 * @props slideDistance (optional) - The distance the children slide in from.
 */
export default function ScrollItem(props: Readonly<ScrollItemProps>) {
	const {
		children,
		type,
		onVisible,
		getPosition,
		parallaxSpeed,
		transitionDuration,
		opacityDuration,
		slideDistance,
		control,
		fire
	} = props;
	const elementRef = useRef<HTMLDivElement>(null);
	const [observedIsVisible, setObservedIsVisible] = useState(false);
	const isVisible = control ? Boolean(fire) : observedIsVisible;
	const [transformValue, setTransformValue] = useState<number | null>(null);

	// Function to handle the parallax effect
	const handleParallax = () => {
		if (!elementRef.current || !isVisible) {
			return;
		}

		// Calculate the distance scrolled from the top of the viewport to the element's top
		const elementTop = elementRef.current.getBoundingClientRect().top;
		const parallaxOffset = elementTop * (parallaxSpeed || 0.5);
		getPosition?.(elementTop);
		setTransformValue(parallaxOffset);
	};

	useEffect(() => {
		if (!control) {
			const element = elementRef.current;
			const observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					setObservedIsVisible(entry.isIntersecting);
				});
			});

			if (element) {
				observer.observe(element);
			}
			return () => {
				if (element) {
					observer.unobserve(element);
				}
			};
		}
	}, [elementRef, control]);

	useEffect(() => {
		if (isVisible && onVisible) {
			onVisible();
		} else if (!isVisible) {
			return;
		}

		window.addEventListener('wheel', handleParallax);
		window.addEventListener('touchmove', handleParallax);

		return () => {
			window.removeEventListener('wheel', handleParallax);
			window.removeEventListener('touchmove', handleParallax);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isVisible, parallaxSpeed]);

	function getStyle() {
		const types = ['parallaxX', 'parallaxY', 'slideX', 'slideY', 'none'];

		if (!types.includes(type)) {
			console.error('Invalid type prop value @ ScrollItem');
			throw new Error('Invalid type prop value @ ScrollItem');
		}

		const visibleOrNot = isVisible ? 1 : 0;
		const transitionDurationValue = transitionDuration || 0.4;
		const opacityDurationValue = opacityDuration || 0.6;
		const slideDistanceValue = slideDistance || 200;

		switch (type) {
			case 'parallaxX':
				return {
					transform: `translateX(${transformValue}px)`,
					opacity: visibleOrNot,
					transitionProperty: 'opacity, transform',
					transitionDuration: `${opacityDurationValue}s, ${transitionDurationValue}s`,
					transitionTimingFunction: 'linear, linear'
				};
			case 'parallaxY':
				return {
					transform: `translateY(${transformValue}px)`,
					opacity: visibleOrNot,
					transitionProperty: 'opacity, transform',
					transitionDuration: `${opacityDurationValue}s, ${transitionDurationValue}s`,
					transitionTimingFunction: 'linear, linear'
				};
			case 'slideY':
				return {
					opacity: visibleOrNot,
					transform: `translateY(${visibleOrNot ? 0 : slideDistanceValue}px)`,
					transitionProperty: 'opacity, transform',
					transitionDuration: `${opacityDurationValue}s, ${transitionDurationValue}s`,
					transitionTimingFunction: 'linear, linear'
				};
			case 'slideX':
				return {
					opacity: visibleOrNot,
					transform: `translateX(${visibleOrNot ? 0 : slideDistanceValue}px)`,
					transitionProperty: 'opacity, transform',
					transitionDuration: `${opacityDurationValue}s, ${transitionDurationValue}s`,
					transitionTimingFunction: 'linear, linear'
				};
			case 'none':
				return {
					opacity: visibleOrNot,
					transitionProperty: 'opacity, transform',
					transitionDuration: `${opacityDurationValue}s, ${transitionDurationValue}s`,
					transitionTimingFunction: 'linear, linear'
				};
		}
	}

	return (
		<div ref={elementRef} className='scroll-item' style={getStyle()}>
			{children}
		</div>
	);
}
