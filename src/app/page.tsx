'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [showLogo, setShowLogo] = useState(false);
  const router = useRouter();

  // 인트로 애니메이션 후 로고 표시
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // 로고 클릭 핸들러
  const handleLogoClick = () => {
    router.push('/category');
  };

  // 인트로 화면 렌더링
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <AnimatePresence>
        {showLogo && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', duration: 1.5 }}
            onClick={handleLogoClick}
            className="cursor-pointer"
          >
            <div className="bg-white rounded-full p-8 shadow-2xl">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="이상형 월드컵 로고"
                className="w-32 h-32"
              />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center mt-6"
            >
              <h1 className="text-3xl font-bold mb-2">이상형 월드컵</h1>
              <p className="text-lg opacity-80">터치하여 시작하기</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
