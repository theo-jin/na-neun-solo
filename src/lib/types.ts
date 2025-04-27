// 후보자 타입 정의
export interface Candidate {
  id: number;
  name: string;
  image: string;
}

// 카테고리 선택 타입
export type CategoryChoice = 'generations' | 'cast';

// 게임 결과 타입
export interface GameResult {
  winner: Candidate;
  roundsPlayed: number;
  totalContestants: number;
  winRates: WinRate[];
}

// 승률 정보 타입
export interface WinRate {
  id: number;
  name: string;
  winCount: number;
  loseCount: number;
  winRate: number;
}

// 게임 히스토리 기록
export interface GameHistory {
  round: number;
  matchups: MatchupHistory[];
}

export interface MatchupHistory {
  winnerId: number;
  loserId: number;
}
