import { motion } from 'framer-motion';
import { Card, CardContent } from '@/app/components/ui/card';
import { CategoryChoice } from '@/lib/types';

interface CategorySelectionProps {
  loading: boolean;
  onSelectCategory: (category: CategoryChoice) => void;
  onGoToList: () => void;
}

export default function CategorySelection({
  loading,
  onSelectCategory,
  onGoToList,
}: CategorySelectionProps) {
  return (
    <div className="grid grid-cols-2 gap-5 w-full max-w-2xl px-4 mb-8">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer"
        onClick={() => !loading && onSelectCategory('generations')}
      >
        <Card className="overflow-hidden h-full bg-gradient-to-br from-blue-400 to-blue-500 border-0 shadow-xl">
          <CardContent className="p-6 relative">
            <h2 className="text-white text-3xl font-bold text-center">시즌</h2>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer"
        onClick={() => !loading && onSelectCategory('cast')}
      >
        <Card className="overflow-hidden h-full bg-gradient-to-br from-pink-400 to-pink-500 border-0 shadow-xl">
          <CardContent className="p-6 relative">
            <h2 className="text-white text-3xl font-bold text-center">
              출연진
            </h2>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer col-span-2"
        onClick={() => !loading && onGoToList()}
      >
        <Card className="overflow-hidden h-full bg-gradient-to-br from-purple-400 to-purple-500 border-0 shadow-xl">
          <CardContent className="p-6 relative">
            <h2 className="text-white text-3xl font-bold text-center">
              출연진 둘러보기
            </h2>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
