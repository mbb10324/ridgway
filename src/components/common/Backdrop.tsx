import { useMemo } from 'react';

type BackdropProps = {
	show: boolean;
	onClick?: () => void;
	zIndex?: string;
	transparent?: boolean;
};

export default function Backdrop(props: Readonly<BackdropProps>) {
	const { show, onClick, zIndex, transparent } = props;

	const shownStyle = useMemo(() => {
		if (show) {
			const opacity = transparent ? 'opacity-0' : 'opacity-60';
			return `${opacity} pointer-events-auto`;
		}
		return 'opacity-0 pointer-events-none';
	}, [show, transparent]);

	return (
		<div
			role='presentation'
			title='backdrop'
			className={`fixed top-0 left-0 w-full h-full bg-black transition-all duration-1000 ${shownStyle} ${zIndex ?? 'z-30'}`}
			onClick={() => onClick && onClick()}
		/>
	);
}
