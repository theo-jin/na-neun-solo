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

// 토너먼트 크기 선택 타입 추가
export type RoundChoice = 32 | 16 | 8 | 4 | 2;

// GameStore 인터페이스에 추가
export interface GameStore {
  // ... existing properties ...
  roundChoice: RoundChoice | null;
  setRoundChoice: (round: RoundChoice) => void;
}
// 기존 타입들 (예시 - 실제 파일에 맞게 조정 필요)

export type GenderChoice = 'male' | 'female';

export interface Candidate {
  id: number;
  name: string;
  image: string;
  generation?: string;
  gender?: GenderChoice;
  // 기타 필요한 속성들...
}

export interface GameHistory {
  round: number;
  winner: Candidate;
  loser: Candidate;
}

export interface GameResult {
  winner: Candidate;
  roundHistories: GameHistory[];
}
