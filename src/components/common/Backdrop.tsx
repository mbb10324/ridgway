import { useMemo } from 'react';
import './backdrop.css';

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
			return transparent ? 'backdrop--transparent backdrop--visible' : 'backdrop--visible';
		}
		return 'backdrop--hidden';
	}, [show, transparent]);
	const backdropLayer = zIndex === 'z-40' ? 40 : 30;

	return (
		<div
			role='presentation'
			title='backdrop'
			className={`backdrop ${shownStyle}`}
			style={{ zIndex: backdropLayer }}
			onClick={() => onClick && onClick()}
		/>
	);
}
