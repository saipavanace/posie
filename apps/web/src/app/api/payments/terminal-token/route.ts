import { NextResponse } from 'next/server';
import { createTerminalConnectionToken } from '@/lib/stripe';

export async function POST() {
  try {
    const tokenResult = await createTerminalConnectionToken();
    return NextResponse.json({
      ...tokenResult,
    });
  } catch (error: any) {
    console.error('Error generating terminal token:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate terminal token' },
      { status: 500 }
    );
  }
}
