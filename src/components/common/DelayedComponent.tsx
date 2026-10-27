import { useState, useEffect } from 'react';

type DelayedComponentProps = {
	trigger: boolean;
	delay: number;
	children: React.ReactNode;
};

export default function DelayedComponent(props: Readonly<DelayedComponentProps>) {
	const { trigger, delay, children } = props;

	if (!trigger) {
		return null;
	}

	return <DelayedChildren delay={delay}>{children}</DelayedChildren>;
}

function DelayedChildren({ delay, children }: Readonly<Omit<DelayedComponentProps, 'trigger'>>) {
	const [showElement, setShowElement] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowElement(true);
		}, delay);

		return () => clearTimeout(timer);
	}, [delay]);

	if (!showElement) {
		return null;
	}

	return children;
}
