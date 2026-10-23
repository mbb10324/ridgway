'use client';

import WeightLogDashboardHeader from './WeightLogDashboardHeader';
import LastLoginDisplay from '@/components/common/LastLogin';
import LogsForm from '@/components/logs/LogsForm';
import LogsList from '@/components/logs/LogsList';
import { type Sample } from '@prisma/client';
import Backdrop from '../common/Backdrop';
import Modal from '../common/Modal';
import { useState } from 'react';

export default function WeightLogDashboard() {
	const [selected, setSelected] = useState<Sample | undefined>();
	const [listUpdated, setListUpdated] = useState(false);

	return (
		<div className='flex flex-col lg:flex-row gap-4 lg:gap-8 lg:mt-20 mt-8 relative'>
			<div className='flex flex-col gap-4 lg:w-6/12 h-fit lg:sticky relative py-4 lg:py-0 top-0 lg:top-12 left-0'>
				<WeightLogDashboardHeader />
				<LastLoginDisplay />
				<LogsForm selected={undefined} setSelected={setSelected} setListUpdated={setListUpdated} />
			</div>
			<LogsList
				key={listUpdated ? 'logs-list-key' : 'logs-list-key-2'}
				setSelected={setSelected}
				listUpdated={listUpdated}
				setListUpdated={setListUpdated}
			/>
			{!!selected && (
				<Modal showModal={!!selected}>
					<div className='flex justify-between flex-col rounded-3xl items-center main-background gap-6 lg:p-12 p-8 lg:min-w-[600px]'>
						<LogsForm selected={selected} setSelected={setSelected} setListUpdated={setListUpdated} />
					</div>
				</Modal>
			)}
			<Backdrop show={!!selected} onClick={() => setSelected(undefined)} />
		</div>
	);
}
