import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Contestant from '@/models/Contestant';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gender = searchParams.get('gender');

  try {
    await connectToDatabase();

    const query = gender ? { gender } : {};
    const contestants = await Contestant.find(query);

    return NextResponse.json(contestants);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch contestants' },
      { status: 500 }
    );
  }
}
