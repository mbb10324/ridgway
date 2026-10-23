import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import logger from '@/logger';
import { db } from '@/db';

export async function DELETE() {
	const session = await auth();

	if (!session?.user) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		await db.user.delete({
			where: {
				id: session.user.id
			}
		});

		logger.audit(`User deleted: ${session.user.id}`);
		return NextResponse.json({ message: 'User and associated data deleted successfully' }, { status: 200 });
	} catch (error) {
		logger.audit(`Error deleting user: ${session.user.id}`, 'failure');
		logger.error('Error fetching last session:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
