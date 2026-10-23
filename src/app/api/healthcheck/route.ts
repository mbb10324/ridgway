import { NextResponse } from 'next/server';

// Health probe for the hosting platform (Azure defaults to this path).
export function GET() {
	return NextResponse.json({ status: 'ok' });
}
