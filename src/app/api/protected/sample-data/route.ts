import { validateSampleData } from './validation';
import { handleError } from '../../error-handling';
import { NextResponse } from 'next/server';
import { db } from '@/db';

export async function GET(request: Request) {
	try {
		// Get the sample data from the database
		const sampleData = await db.sample.findMany({
			orderBy: {
				date: 'desc'
			}
		});

		return NextResponse.json(sampleData, { status: 200 });
	} catch (error) {
		return handleError(error as Error, request.method);
	}
}

type PostParams = {
	weight: number;
	date: string;
	notes?: string;
};

export async function POST(request: Request) {
	try {
		const body = (await request.json()) as PostParams;
		const { weight, date, notes } = body;

		// Validate the input data
		validateSampleData({ weight, date, notes });

		// Adjust the date
		const adjustedDate = new Date(date);
		adjustedDate.setDate(adjustedDate.getDate() + 1);

		// Add the sample data to the database
		const sampleData = await db.sample.create({
			data: {
				weight,
				date: adjustedDate,
				notes
			}
		});

		return NextResponse.json(sampleData, { status: 201 });
	} catch (error) {
		return handleError(error as Error, request.method);
	}
}
