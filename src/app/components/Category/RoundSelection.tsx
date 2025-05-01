import { Button } from '@/app/components/ui/button';
import { CategoryChoice, GenderChoice, RoundChoice } from '@/lib/types';

interface RoundSelectionProps {
  loading: boolean;
  selectedCategory: CategoryChoice;
  selectedGender: GenderChoice | null;
  onRoundSelect: (round: RoundChoice) => void;
  onBack: () => void;
}

export default function RoundSelection({
  loading,
  selectedCategory,
  selectedGender,
  onRoundSelect,
  onBack,
}: RoundSelectionProps) {
  // 제목 텍스트 생성
  const getTitleText = () => {
    if (selectedCategory === 'generations') {
      return '기수';
    } else if (selectedGender === 'female') {
      return '여성 출연자';
    } else if (selectedGender === 'male') {
      return '남성 출연자';
    } else {
      return '출연자';
    }
  };

  return (
    <div className="space-y-4 w-full max-w-2xl px-4">
      <h2 className="text-2xl font-bold text-center mb-6">
        {getTitleText()} 토너먼트 라운드 선택
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {selectedCategory === 'generations' ? (
          <>
            <Button
              variant="outline"
              size="lg"
              onClick={() => !loading && onRoundSelect(16)}
              className="w-full py-8 text-xl cursor-pointer"
            >
              16강
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => !loading && onRoundSelect(8)}
              className="w-full py-8 text-xl cursor-pointer"
            >
              8강
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              size="lg"
              onClick={() => !loading && onRoundSelect(32)}
              className="w-full py-8 text-xl cursor-pointer"
            >
              32강
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => !loading && onRoundSelect(16)}
              className="w-full py-8 text-xl cursor-pointer"
            >
              16강
            </Button>
          </>
        )}

        <Button
          variant="outline"
          onClick={onBack}
          className="col-span-2 w-full py-4 cursor-pointer"
        >
          뒤로 가기
        </Button>
      </div>
    </div>
  );
}
