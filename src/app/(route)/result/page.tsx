'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/app/components/ui/button';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/lib/store';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export default function ResultPage() {
  const router = useRouter();
  const { gameResult, resetGame } = useGameStore();

  // 페이지 진입 시 결과 확인
  useEffect(() => {
    if (!gameResult) {
      router.replace('/category');
    }
  }, [gameResult, router]);

  // 결과가 없으면 로딩 표시
  if (!gameResult) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>결과를 불러오는 중...</p>
      </div>
    );
  }

  // 차트 데이터 준비
  const chartData = gameResult.winRates.slice(0, 5).map((candidate) => ({
    name: candidate.name,
    승률: Math.round(candidate.winRate),
  }));

  // 다시 시작하기
  const handleRestart = () => {
    resetGame();
    router.push('/category');
  };

  // 홈으로 돌아가기
  const handleGoHome = () => {
    resetGame();
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center w-full max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold mb-4">최종 우승</h1>
          <div className="flex justify-center">
            <div className="w-24 h-1 bg-yellow-500 rounded-full"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
            className="relative rounded-lg overflow-hidden shadow-2xl max-w-xs mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-yellow-500 to-yellow-300 opacity-50"></div>
            <img
              src={gameResult.winner.image || '/placeholder.svg'}
              alt={gameResult.winner.name}
              className="w-full h-auto relative z-10"
            />
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-6 text-center"
            >
              <h2 className="text-white text-2xl font-bold">
                {gameResult.winner.name}
              </h2>
              <p className="text-yellow-300 mt-2">우승을 축하합니다!</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-lg shadow-lg p-4 h-full flex flex-col"
          >
            <h2 className="text-xl font-bold mb-4 text-center">
              상위 5위 승률
            </h2>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis unit="%" domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, '승률']} />
                  <Bar dataKey="승률" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          index === 0
                            ? '#FFD700'
                            : `hsl(${220 - index * 30}, 80%, 60%)`
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="space-y-4 max-w-md mx-auto"
        >
          <Button
            size="lg"
            onClick={handleRestart}
            className="w-full px-8 py-6 text-lg bg-yellow-500 hover:bg-yellow-600 text-slate-900"
          >
            다른 카테고리 선택하기
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={handleGoHome}
            className="w-full px-8 py-6 text-lg hover:bg-gray-100"
          >
            처음으로 돌아가기
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
