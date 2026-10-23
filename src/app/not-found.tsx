import ErrorContent from '@/components/status/Error';

export default function NotFound() {
	return <ErrorContent title='Page Not Found' message='Sorry, this page does not exist!' type='not-found' />;
}
