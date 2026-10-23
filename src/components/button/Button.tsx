import { useState } from 'react';
import './button.css';
import useRipple from '../../hooks/useRipple';
import useBreakpoints from '../../hooks/useBreakpoints';

type ButtonProps = {
	children: React.ReactNode;
	primary: string;
	secondary: string;
	backdrop?: string;
	fontSize?: string;
	onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export default function Button(props: Readonly<ButtonProps>) {
	const { children, primary, secondary, backdrop, fontSize, onClick } = props;

	const { rippleStyle, rippleKey, rippleRef, createRipple } = useRipple();
	const breakpoint = useBreakpoints(900);
	const [btnHovered, setBtnHovered] = useState(false);
	const backdropColor = backdrop ? backdrop : 'var(--primary)';
	const btnBackgroundColor = !breakpoint && btnHovered ? primary : 'transparent';
	const btnTextColor = !breakpoint && btnHovered ? secondary : primary;

	return (
		<div className='revel-button-wrapper' style={{ borderColor: secondary, backgroundColor: backdropColor }}>
			<div
				className='revel-button'
				style={{ color: btnTextColor, backgroundColor: btnBackgroundColor, fontSize: fontSize ? fontSize : '2rem' }}
				onClick={(e) => {
					onClick(e);
					createRipple(e, 0);
				}}
				onMouseEnter={() => setBtnHovered(true)}
				onMouseLeave={() => setBtnHovered(false)}
			>
				{children}
				<span key={rippleRef} className='ripple' style={rippleKey === 0 ? rippleStyle : {}} />
			</div>
		</div>
	);
}
