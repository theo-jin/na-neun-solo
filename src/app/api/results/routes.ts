import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Result from '@/models/Result';
import Contestant from '@/models/Contestant';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userGender, contestantGender, rounds, finalWinner } = body;
    
    await connectToDatabase();
    
    // 결과 저장
    const result = await Result.create({
      userGender,
      contestantGender,
      rounds,
      finalWinner,
      date: new Date()
    });
    
    // 출연자 통계 업데이트
    for (const round of rounds) {
      await Contestant.findByIdAndUpdate(
        round.winner,
        { $inc: { 'stats.wins': 1, 'stats.appearances': 1 } }
      );
      
      await Contestant.findByIdAndUpdate(
        round.loser,
        { $inc: { 'stats.appearances': 1 } }
      );
    }
    
    // 최종 우승자 업데이트
    await Contestant.findByIdAndUpdate(
      finalWinner,
      { $inc: { 'stats.finalWins': 1 } }
    );
    
    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save result' },
      { status: 500 }
    );
  }
}