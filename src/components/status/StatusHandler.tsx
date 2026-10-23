import Loader from './Loader';

type StatusHandlerProps = {
	status: 'pending' | 'error' | 'success';
	children: React.ReactElement;
	onError?: () => void;
	onSuccess?: () => void;
	loadingComponent?: React.ReactElement;
	errorComponent?: React.ReactElement;
};

export default function StatusHandler(props: Readonly<StatusHandlerProps>): React.ReactElement {
	const {
		status,
		children,
		onError,
		onSuccess,
		loadingComponent = <Loader />,
		errorComponent = (
			<p className='text-red-300' title='status-error'>
				An Error Occurred.
			</p>
		)
	} = props;

	switch (status) {
		case 'pending':
			return loadingComponent;
		case 'error':
			if (onError) {
				onError();
			}
			return errorComponent;
		default:
			if (onSuccess) {
				onSuccess();
			}
			return children;
	}
}
