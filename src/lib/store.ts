import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Candidate, CategoryChoice, GameHistory, GameResult } from './types';

interface GameStore {
  categoryChoice: CategoryChoice;
  candidates: Candidate[];
  gameHistories: GameHistory[];
  currentRound: number;
  gameResult: GameResult | null;
  roundChoice: number | null;

  setCategoryChoice: (category: CategoryChoice) => void;
  setCandidates: (candidates: Candidate[]) => void;
  addGameHistory: (history: GameHistory) => void;
  setCurrentRound: (round: number) => void;
  setGameResult: (result: GameResult) => void;
  resetGame: () => void;
  setRoundChoice: (round: number) => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      categoryChoice: 'generations',
      candidates: [],
      gameHistories: [],
      currentRound: 0,
      gameResult: null,
      roundChoice: null,

      setCategoryChoice: (category) => set({ categoryChoice: category }),
      setCandidates: (candidates) => set({ candidates }),
      addGameHistory: (history) =>
        set((state) => ({
          gameHistories: [...state.gameHistories, history],
        })),
      setCurrentRound: (round) => set({ currentRound: round }),
      setGameResult: (result) => set({ gameResult: result }),
      resetGame: () =>
        set({
          candidates: [],
          gameHistories: [],
          currentRound: 0,
          gameResult: null,
        }),
      setRoundChoice: (round) => set({ roundChoice: round }),
    }),
    {
      name: 'ideal-type-game-storage',
    }
  )
);
