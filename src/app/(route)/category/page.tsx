'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/lib/store';
import { generations, cast } from '@/lib/data';
import { CategoryChoice, RoundChoice } from '@/lib/types';

export default function CategoryPage() {
  const router = useRouter();
  const { setCategoryChoice, setCandidates, resetGame, setRoundChoice } =
    useGameStore();
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryChoice | null>(null);
  const [showRoundSelect, setShowRoundSelect] = useState(false);

  // 카테고리 선택 핸들러
  const selectCategory = (category: CategoryChoice) => {
    setSelectedCategory(category);
    setShowRoundSelect(true);
  };

  // 라운드 선택 핸들러
  const handleRoundSelect = (round: RoundChoice) => {
    setLoading(true);

    // 기존 게임 데이터 초기화
    resetGame();

    // 선택한 카테고리와 라운드 저장
    setCategoryChoice(selectedCategory!);
    setRoundChoice(round);

    // 후보자 데이터 준비
    const allCandidates =
      selectedCategory === 'generations' ? generations : cast;
    const shuffled = [...allCandidates]
      .sort(() => Math.random() - 0.5)
      .slice(0, round);

    setCandidates(shuffled);

    // 게임 페이지로 이동
    router.push('/game');
  };

  const goToIntro = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-4">게임 선택</h1>
        <p className="text-gray-600">월드컵 주제를 선택해주세요</p>
      </motion.div>

      {!showRoundSelect ? (
        <div className="grid grid-cols-2 gap-5 w-full max-w-2xl px-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
            onClick={() => !loading && selectCategory('generations')}
          >
            <Card className="overflow-hidden h-full bg-gradient-to-br from-blue-400 to-blue-500 border-0 shadow-xl">
              <CardContent className="p-6 relative">
                <h2 className="text-white text-3xl font-bold text-center">
                  시즌
                </h2>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
            onClick={() => !loading && selectCategory('cast')}
          >
            <Card className="overflow-hidden h-full  bg-gradient-to-br from-pink-400 to-pink-500 border-0 shadow-xl">
              <CardContent className="p-6 relative ">
                <h2 className="text-white text-3xl font-bold text-center">
                  {' '}
                  출연진
                </h2>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      ) : (
        <div className="space-y-4 w-full max-w-2xl px-4">
          <h2 className="text-2xl font-bold text-center mb-6">
            {selectedCategory === 'generations' ? '기수' : '출연진'} 토너먼트
            라운드 선택
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {selectedCategory === 'generations' ? (
              <>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleRoundSelect(16)}
                  className="w-full py-8 text-xl"
                >
                  16강
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleRoundSelect(8)}
                  className="w-full py-8 text-xl"
                >
                  8강
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleRoundSelect(32)}
                  className="w-full py-8 text-xl"
                >
                  32강
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleRoundSelect(16)}
                  className="w-full py-8 text-xl"
                >
                  16강
                </Button>
              </>
            )}

            <Button
              variant="outline"
              onClick={() => setShowRoundSelect(false)}
              className="col-span-2 w-full py-4"
            >
              뒤로 가기
            </Button>
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-10"
      >
        <Button
          variant="outline"
          onClick={goToIntro}
          className="hover:bg-gray-100"
          disabled={loading}
        >
          처음으로 돌아가기
        </Button>
      </motion.div>
    </div>
  );
}
