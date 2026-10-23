'use client';

import LogsListLoading from '../status/LogsListLoading';
import StatusHandler from '../status/StatusHandler';
import LogsListError from '../status/LogsListError';
import useLogsList, { type SampleWithDifference } from '@/hooks/useLogsList';
import { type Sample } from '@prisma/client';
import { formatDate } from '@/utils/utils-helpers';
import { useEffect, useState } from 'react';

type LogsListProps = {
	setListUpdated: (listUpdated: boolean) => void;
	setSelected: (selected: Sample) => void;
	listUpdated: boolean;
};

export default function LogsList(props: Readonly<LogsListProps>) {
	const { setSelected, listUpdated, setListUpdated } = props;
	const [showFullList, setShowFullList] = useState(false);
	const { data, status } = useLogsList();

	const onClickItem = (item: SampleWithDifference) => {
		setSelected(item);
	};

	useEffect(() => {
		if (listUpdated) {
			setListUpdated(false);
		}
	}, [listUpdated, setListUpdated]);

	const itemDifferenceText = (difference: number | null | undefined): string => {
		if (!difference) {
			return '-';
		}

		return `${difference} ${difference === 1 ? 'lb' : 'lbs'}`;
	};

	return (
		<div className='flex flex-col grow gap-3 w-full'>
			<h1 className='text-lg'>Weight Logs</h1>
			<div
				title='logs-list'
				className={`fade-in flex flex-col w-full bg-transparent rounded-lg border border-zinc-700 p-1 overflow-hidden transition-all duration-500 ease-in-out ${showFullList ? 'h-full' : 'lg:h-list-item h-full'}`}
			>
				<StatusHandler status={status} loadingComponent={<LogsListLoading />} errorComponent={<LogsListError />}>
					<div>
						{data?.map((item, index) => {
							return (
								<div
									key={item.id}
									className={`fade-in flex flex-col text-sm text-zinc-50 py-2 mx-6 border-b border-zinc-700 cursor-pointer hover:px-2 hover:bg-custom-transparent-medium-gray transition-all duration-300 ease-in-out ${!showFullList && index > 10 ? 'lg:hidden' : ''} ${index === data.length - 1 ? 'border-b-0' : ''}`}
									onClick={() => {
										onClickItem(item);
									}}
									onKeyDown={(event) => {
										if (event.key === 'Enter') {
											onClickItem(item);
										}
									}}
								>
									<div className='flex flex-row justify-between'>
										<p>{item.weight} lbs</p>
										<p>{itemDifferenceText(item.difference)}</p>
									</div>
									<p>{formatDate(item.date)}</p>
								</div>
							);
						})}
					</div>
				</StatusHandler>
			</div>
			<div className='justify-center mt-3 lg:flex hidden fade-in'>
				<button
					className='bg-custom-transparent-medium-gray border border-zinc-400 rounded-full text-sm px-4 py-1 hover:bg-custom-transparent-gray transition-all duration-500 ease-in-out'
					onClick={() => setShowFullList(!showFullList)}
				>
					{showFullList ? 'Show Less' : 'Show More'}
				</button>
			</div>
		</div>
	);
}
