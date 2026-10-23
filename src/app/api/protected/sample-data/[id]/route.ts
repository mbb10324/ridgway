import { validateId, validateSampleData } from '../validation';
import { handleError } from '@/app/api/error-handling';
import { NextResponse } from 'next/server';
import { db } from '@/db';

type PutParams = {
	weight: number;
	date: string;
	notes: string;
};

export async function PUT(request: Request, { params }: { params : Promise<{ id: string }> }) {
	try {
		const id = Number((await params).id);
		const body = (await request.json()) as PutParams;
		const { weight, date, notes } = body;

		// Validate the input data and ID
		validateSampleData({ weight, date, notes });
		validateId(id);

		// Adjust the date
		const adjustedDate = new Date(date);
		adjustedDate.setDate(adjustedDate.getDate() + 1);

		// Update the sample data in the database
		const sampleData = await db.sample.update({
			where: { id },
			data: {
				weight,
				date: adjustedDate,
				notes
			}
		});

		return NextResponse.json(sampleData, { status: 200 });
	} catch (error) {
		return handleError(error as Error, request.method);
	}
}

export async function DELETE(request: Request, { params }: { params : Promise<{ id: string }> }) {
	try {
		const id = Number((await params).id);

		// Validate the ID before deletion
		validateId(id);

		// Delete the sample data from the database
		const sampleData = await db.sample.delete({
			where: { id }
		});

		return NextResponse.json(sampleData, { status: 200 });
	} catch (error) {
		return handleError(error as Error, request.method);
	}
}
