import { useQuery } from '@tanstack/react-query';
import { type Sample } from '@prisma/client';
import { routes } from '@/routes';

export type SampleWithDifference = Sample & { difference?: number | null };

function calculateDifferences(data: Sample[]): SampleWithDifference[] {
	return data.map((item, index) => {
		if (index === data.length - 1) {
			return { ...item, difference: null };
		}
		const nextWeight = data[index + 1].weight;
		const difference = parseFloat((item.weight - nextWeight).toFixed(1));
		return { ...item, difference };
	});
}

export default function useLogs() {
	const { status, data: fetchData } = useQuery({
		queryKey: ['sampleData'],
		queryFn: () => fetch(routes.sampleData).then((res) => res.json() as Promise<Sample[]>)
	});

	const data = fetchData && status === 'success' ? calculateDifferences(fetchData) : [];

	return { data, status };
}
