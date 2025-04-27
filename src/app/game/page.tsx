'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/lib/store';
import { Candidate, GameHistory, MatchupHistory, WinRate } from '@/lib/types';

export default function GamePage() {
  const router = useRouter();
  const {
    candidates,
    categoryChoice,
    addGameHistory,
    setGameResult,
    currentRound,
    setCurrentRound,
  } = useGameStore();

  const [roundName, setRoundName] = useState('');
  const [progress, setProgress] = useState(0);
  const [currentMatchup, setCurrentMatchup] = useState<number[]>([]);
  const [winners, setWinners] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [matchHistory, setMatchHistory] = useState<MatchupHistory[]>([]);

  // 페이지 로드 시 초기화
  useEffect(() => {
    if (candidates.length === 0) {
      // 후보자가 없으면 카테고리 선택 페이지로 이동
      router.replace('/category');
      return;
    }

    // 현재 라운드 이름 설정
    setRoundName(`${candidates.length}강`);

    // 첫 매치업 설정
    if (currentMatchup.length === 0) {
      setCurrentMatchup([0, 1]);
    }

    // 처음 라운드인 경우 라운드 숫자 증가
    if (currentRound === 0) {
      setCurrentRound(1);
    }
  }, [candidates, currentMatchup, currentRound, router, setCurrentRound]);

  // 후보 선택
  const selectCandidate = (index: number) => {
    if (selectedIndex !== null) return; // 이미 선택 중이면 무시

    setSelectedIndex(index);

    // 애니메이션 효과를 위해 약간의 지연 후 다음 단계로 진행
    setTimeout(() => {
      const selectedId = candidates[currentMatchup[index]].id;
      const loserId = candidates[currentMatchup[index === 0 ? 1 : 0]].id;
      const newWinners = [...winners, selectedId];

      // 매치업 결과 기록
      const newMatchHistory = [
        ...matchHistory,
        {
          winnerId: selectedId,
          loserId: loserId,
        },
      ];
      setMatchHistory(newMatchHistory);
      setWinners(newWinners);

      // 현재 라운드의 모든 매치업이 끝났는지 확인
      if (
        currentMatchup[1] + 1 >= candidates.length &&
        newWinners.length >= candidates.length / 2
      ) {
        // 해당 라운드의 게임 히스토리 저장
        addGameHistory({
          round: currentRound,
          matchups: newMatchHistory,
        });

        // 다음 라운드 준비
        const nextRoundCandidates = candidates.filter((candidate) =>
          newWinners.includes(candidate.id)
        );

        if (nextRoundCandidates.length === 1) {
          // 최종 우승자
          const winner = nextRoundCandidates[0];

          // 승률 계산
          const winRates = calculateWinRates(matchHistory);

          // 게임 결과 설정
          setGameResult({
            winner,
            roundsPlayed: currentRound,
            totalContestants: candidates.length,
            winRates,
          });

          // 결과 페이지로 이동
          router.push('/result');
        } else {
          // 다음 라운드 설정
          setCurrentRound(currentRound + 1);
          setRoundName(`${nextRoundCandidates.length}강`);
          setWinners([]);
          setCurrentMatchup([0, 1]);
          setProgress(0);
          setSelectedIndex(null);
          setMatchHistory([]);
        }
      } else {
        // 다음 매치업
        const nextIndex = currentMatchup[1] + 1;
        if (nextIndex < candidates.length) {
          setCurrentMatchup([nextIndex, nextIndex + 1]);
          setProgress((newWinners.length / (candidates.length / 2)) * 100);
          setSelectedIndex(null);
        }
      }
    }, 500); // 500ms 지연
  };

  // 승률 계산 함수
  const calculateWinRates = (matchups: MatchupHistory[]): WinRate[] => {
    const winCounts: Record<number, number> = {};
    const loseCounts: Record<number, number> = {};

    // 모든 후보의 승리/패배 횟수 계산
    candidates.forEach((candidate) => {
      winCounts[candidate.id] = 0;
      loseCounts[candidate.id] = 0;
    });

    // 매치업 결과 기반으로 승/패 횟수 계산
    matchups.forEach((matchup) => {
      winCounts[matchup.winnerId] = (winCounts[matchup.winnerId] || 0) + 1;
      loseCounts[matchup.loserId] = (loseCounts[matchup.loserId] || 0) + 1;
    });

    // 승률 계산 및 정렬
    return candidates
      .map((candidate) => {
        const wins = winCounts[candidate.id] || 0;
        const losses = loseCounts[candidate.id] || 0;
        const total = wins + losses;
        return {
          id: candidate.id,
          name: candidate.name,
          winCount: wins,
          loseCount: losses,
          winRate: total > 0 ? (wins / total) * 100 : 0,
        };
      })
      .sort((a, b) => b.winRate - a.winRate);
  };

  // 스와이프 제스처 처리
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || selectedIndex !== null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchEndX - touchStartX;

    // 왼쪽 또는 오른쪽으로 충분히 스와이프했는지 확인
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // 오른쪽으로 스와이프 - 왼쪽 후보 선택
        selectCandidate(0);
      } else {
        // 왼쪽으로 스와이프 - 오른쪽 후보 선택
        selectCandidate(1);
      }
    }

    setTouchStartX(null);
  };

  // 게임 재시작
  const goToCategory = () => {
    router.push('/category');
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-gray-50"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <header className="p-4 border-b border-gray-200">
        <div className="container mx-auto">
          <motion.h1
            key={roundName}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-center"
          >
            {categoryChoice === 'generations' ? '최고의 기수' : '최고의 출연진'}{' '}
            - {roundName}
          </motion.h1>
          <Progress value={progress} className="mt-2 h-2 bg-gray-200" />
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4">
        <div className="grid grid-cols-2 gap-4 h-full">
          {currentMatchup.map((candidateIndex, index) => {
            if (candidateIndex < candidates.length) {
              const candidate = candidates[candidateIndex];
              const isSelected = selectedIndex === index;
              const isNotSelected =
                selectedIndex !== null && selectedIndex !== index;

              return (
                <motion.div
                  key={candidate.id}
                  initial={{ x: index === 0 ? -50 : 50, opacity: 0 }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    scale: isSelected ? 1.05 : isNotSelected ? 0.95 : 1,
                    filter: isNotSelected ? 'brightness(0.5)' : 'brightness(1)',
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                    delay: index * 0.1,
                  }}
                >
                  <Card
                    className={`h-full cursor-pointer transition-all duration-300 border overflow-hidden ${
                      isSelected
                        ? 'shadow-xl shadow-blue-500/20 z-10 border-blue-500'
                        : isNotSelected
                        ? 'opacity-50'
                        : 'hover:shadow-lg'
                    }`}
                    onClick={() => !selectedIndex && selectCandidate(index)}
                  >
                    <CardContent className="p-0 h-full flex flex-col">
                      <div className="relative flex-1">
                        <img
                          src={candidate.image || '/placeholder.svg'}
                          alt={candidate.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4">
                          <h2 className="text-white text-xl font-semibold truncate">
                            {candidate.name}
                          </h2>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            }
            return null;
          })}
        </div>
      </main>

      <div className="p-4 text-center text-sm text-gray-500">
        <p>좌우로 스와이프하거나 이미지를 탭하여 선택하세요</p>
      </div>

      <footer className="p-4 border-t border-gray-200">
        <div className="container mx-auto text-center">
          <Button
            variant="outline"
            onClick={goToCategory}
            className="w-full hover:bg-gray-100"
          >
            카테고리 선택으로 돌아가기
          </Button>
        </div>
      </footer>
    </div>
  );
}
