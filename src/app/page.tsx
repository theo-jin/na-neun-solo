'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const [showLogo, setShowLogo] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogoClick = () => {
    router.push('/category');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  bg-gradient-to-br from-red-200 to-red-300">
      <AnimatePresence>
        {showLogo && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', duration: 2 }}
            onClick={handleLogoClick}
            className="cursor-pointer"
          >
            <div className="bg-white p-8 shadow-2xl">
              <Image
                src="/images/logo.png"
                width={500}
                height={500}
                alt="로고 이미지"
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
