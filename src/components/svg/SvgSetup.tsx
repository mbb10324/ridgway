type SvgsProps = {
	size?: number | string;
	height?: number | string;
	width?: number | string;
	color?: string;
	testId?: string;
	onClick?: () => void;
	className?: string;
	viewBox?: string;
	strokeWidth?: number | string;
};

function SvgComponent(props: React.PropsWithChildren<SvgsProps>) {
	const { size = '24', width, height, color = 'currentColor', testId, onClick, className, viewBox, strokeWidth = '2', children } = props;

	return (
		<svg
			stroke={color}
			fill='none'
			strokeWidth={strokeWidth}
			viewBox={`${viewBox ? viewBox : '0 0 24 24'}`}
			strokeLinecap='round'
			strokeLinejoin='round'
			height={height ?? size}
			width={width ?? size}
			onClick={onClick}
			className={className}
			data-testid={testId ?? 'svg'}
		>
			{children}
		</svg>
	);
}

export default function createSvgComponent(Content: React.FC, displayName: string) {
	const WrappedComponent = (props: SvgsProps) => (
		<SvgComponent {...props}>
			<Content />
		</SvgComponent>
	);
	WrappedComponent.displayName = displayName;

	return WrappedComponent;
}
