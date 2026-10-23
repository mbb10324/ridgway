import Button from '../../components/button/Button';
import Layout from '../../layout/RidgwayLayout';
import './default.css';
import { useRouter } from 'next/navigation';

type DefaultProps = {
	message: string;
};

export default function Default(props: Readonly<DefaultProps>) {
	const { message } = props;
	const router = useRouter();

	return (
		<Layout>
			<div className='default-wrapper'>
				<h2>Error...</h2>
				<h3>{message}</h3>
				<Button onClick={() => router.push('/')} primary='var(--pink)' secondary='var(--tan)'>
					Back Home
				</Button>
			</div>
		</Layout>
	);
}
