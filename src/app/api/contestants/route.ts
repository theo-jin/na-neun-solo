import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('na-neun-solo');
    const contestants = await db.collection('Contestants').find().toArray();

    return NextResponse.json({ success: true, data: contestants });
  } catch (error) {
    console.error('Error fetching contestants:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contestants' },
      { status: 500 }
    );
  }
}
