import DashboardWrapper from '@/components/common/DashboardWrapper';

type TabProps = {
	page: string;
};

export default function Tab(props: Readonly<TabProps>) {
	const { page } = props;

	return (
		<DashboardWrapper>
			<div className='mt-12 text-center p-4 flex flex-col gap-4'>
				<h1 className='font-bold text-3xl'>You&apos;re On {page}</h1>
				<p>This page is intended to demonstrate the tabulating behavior of Primus</p>
			</div>
		</DashboardWrapper>
	);
}
