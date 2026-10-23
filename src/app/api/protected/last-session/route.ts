import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/db';
import logger from '@/logger';

export async function GET() {
	const session = await auth();

	if (!session?.user) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const lastSession = await db.session.findFirst({
			where: {
				userId: session.user.id
			},
			orderBy: {
				createdAt: 'desc'
			},
			select: {
				createdAt: true
			},
			skip: 1 // Ignore the current session
		});

		if (lastSession) {
			return NextResponse.json({ lastLogin: lastSession.createdAt });
		} else {
			return NextResponse.json({ lastLogin: null });
		}
	} catch {
		logger.audit(`Error fetching last session for user id ${session.user.id}`, 'failure');
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
