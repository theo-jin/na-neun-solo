import { motion } from 'framer-motion';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { GenderChoice } from '@/lib/types';

interface GenderSelectionProps {
  loading: boolean;
  onSelectGender: (gender: GenderChoice) => void;
  onBack: () => void;
}

export default function GenderSelection({
  loading,
  onSelectGender,
  onBack,
}: GenderSelectionProps) {
  return (
    <div className="space-y-4 w-full max-w-2xl px-4">
      <h2 className="text-2xl font-bold text-center mb-6">
        출연진 성별 선택
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
          onClick={() => !loading && onSelectGender('female')}
        >
          <Card className="overflow-hidden h-full bg-gradient-to-br from-pink-300 to-pink-400 border-0 shadow-xl">
            <CardContent className="p-6 relative">
              <h2 className="text-white text-2xl font-bold text-center py-4">
                여성 출연자
              </h2>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
          onClick={() => !loading && onSelectGender('male')}
        >
          <Card className="overflow-hidden h-full bg-gradient-to-br from-blue-300 to-blue-400 border-0 shadow-xl">
            <CardContent className="p-6 relative">
              <h2 className="text-white text-2xl font-bold text-center py-4">
                남성 출연자
              </h2>
            </CardContent>
          </Card>
        </motion.div>

        <Button
          variant="outline"
          onClick={onBack}
          className="col-span-2 w-full py-4"
        >
          뒤로 가기
        </Button>
      </div>
    </div>
  );
}