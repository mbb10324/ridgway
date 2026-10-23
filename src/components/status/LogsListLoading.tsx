import React from 'react';

export default function LogsListLoading() {
	const items = Array.from({ length: 20 }, (_, i) => ({ id: i + 1 }));
	return (
		<>
			{items.map((item) => (
				<div key={item.id} className='fade-in flex flex-col py-2 mx-6' title='logs-list-loading'>
					<div className='flex flex-col gap-2'>
						<div className='w-full h-4 skeleton-background rounded-lg'></div>
						<div className='w-full h-4 skeleton-background rounded-lg'></div>
					</div>
				</div>
			))}
		</>
	);
}
