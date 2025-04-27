'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/lib/store';
import { generations, cast } from '@/lib/data';
import { CategoryChoice } from '@/lib/types';

export default function CategoryPage() {
  const router = useRouter();
  const { setCategoryChoice, setCandidates, resetGame } = useGameStore();
  const [loading, setLoading] = useState(false);

  // 카테고리 선택 핸들러
  const selectCategory = (category: CategoryChoice) => {
    setLoading(true);

    // 기존 게임 데이터 초기화
    resetGame();

    // 선택한 카테고리 저장
    setCategoryChoice(category);

    // 해당 카테고리의 후보자들 선택
    const initialCandidates = category === 'generations' ? generations : cast;

    // 후보자 데이터를 섞기
    const shuffled = [...initialCandidates].sort(() => Math.random() - 0.5);
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
        <h1 className="text-3xl font-bold mb-4">카테고리 선택</h1>
        <p className="text-gray-600">월드컵 주제를 선택해주세요</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl px-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
          onClick={() => !loading && selectCategory('generations')}
        >
          <Card className="overflow-hidden h-full bg-gradient-to-br from-blue-500 to-blue-700 border-0 shadow-xl">
            <CardContent className="p-0 relative">
              <img
                src="/placeholder.svg?height=300&width=400"
                alt="기수 선택"
                className="w-full h-48 object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-white text-2xl font-bold">최고의 기수</h2>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
          onClick={() => !loading && selectCategory('cast')}
        >
          <Card className="overflow-hidden h-full bg-gradient-to-br from-pink-500 to-purple-700 border-0 shadow-xl">
            <CardContent className="p-0 relative">
              <img
                src="/placeholder.svg?height=300&width=400"
                alt="출연진 선택"
                className="w-full h-48 object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-white text-2xl font-bold">최고의 출연진</h2>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

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
