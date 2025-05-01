'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/app/components/ui/button';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/lib/store';
import { generations, cast } from '@/lib/data';
import { CategoryChoice, RoundChoice, GenderChoice } from '@/lib/types';
import CategorySelection from '@/app/components/Category/CategorySelection';
import GenderSelection from '@/app/components/Category/GenderSelection';
import RoundSelection from '@/app/components/Category/RoundSelection';

export default function CategoryPage() {
  const router = useRouter();
  const {
    setCategoryChoice,
    setCandidates,
    resetGame,
    setRoundChoice,
    setGenderChoice,
  } = useGameStore();
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryChoice | null>(null);
  const [selectedGender, setSelectedGender] = useState<GenderChoice | null>(
    null
  );
  const [showRoundSelect, setShowRoundSelect] = useState(false);
  const [showGenderSelect, setShowGenderSelect] = useState(false);

  // 카테고리 선택 핸들러
  const selectCategory = (category: CategoryChoice) => {
    setSelectedCategory(category);

    if (category === 'cast') {
      // 출연진 선택 시 성별 선택 화면 표시
      setShowGenderSelect(true);
    } else {
      // 시즌 선택 시 바로 라운드 선택 화면으로
      setShowRoundSelect(true);
    }
  };

  // 성별 선택 핸들러
  const selectGender = (gender: GenderChoice) => {
    setSelectedGender(gender);
    setShowGenderSelect(false);
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

    // 성별 선택이 있는 경우 저장
    if (selectedGender) {
      setGenderChoice(selectedGender);
    }

    // 후보자 데이터 준비
    let allCandidates = selectedCategory === 'generations' ? generations : cast;

    // 출연진에서 성별 필터링
    if (selectedCategory === 'cast' && selectedGender) {
      allCandidates = allCandidates.filter(
        (candidate) => candidate.gender === selectedGender
      );
    }

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

  const goToList = () => {
    router.push('/list');
  };

  const handleBack = () => {
    if (showRoundSelect) {
      if (selectedCategory === 'cast' && selectedGender) {
        // 출연진 카테고리의 경우 라운드 선택에서 성별 선택으로 돌아감
        setShowRoundSelect(false);
        setShowGenderSelect(true);
      } else {
        // 시즌 카테고리나 성별 선택이 없는 경우 카테고리 선택으로 돌아감
        setShowRoundSelect(false);
        setShowGenderSelect(false);
      }
    } else if (showGenderSelect) {
      // 성별 선택에서 카테고리 선택으로 돌아감
      setShowGenderSelect(false);
      setSelectedCategory(null);
    }
  };

  // 렌더링할 컴포넌트 결정
  const renderContent = () => {
    if (!showGenderSelect && !showRoundSelect) {
      return (
        <CategorySelection
          loading={loading}
          onSelectCategory={selectCategory}
          onGoToList={goToList}
        />
      );
    } else if (showGenderSelect) {
      return (
        <GenderSelection
          loading={loading}
          onSelectGender={selectGender}
          onBack={handleBack}
        />
      );
    } else {
      return (
        <RoundSelection
          loading={loading}
          selectedCategory={selectedCategory!}
          selectedGender={selectedGender}
          onRoundSelect={handleRoundSelect}
          onBack={handleBack}
        />
      );
    }
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

      {renderContent()}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-10"
      >
        <Button
          variant="outline"
          onClick={goToIntro}
          className="hover:bg-gray-100 cursor-pointer"
          disabled={loading}
        >
          처음으로 돌아가기
        </Button>
      </motion.div>
    </div>
  );
}
