import { Button } from '../../../components/ui';

interface StepNavigationProps {
  index: number;
  count: number;
  onStepChange: (index: number) => void;
}

export function StepNavigation({
  index,
  count,
  onStepChange,
}: StepNavigationProps) {
  return (
    <div className="step-nav">
      <Button
        variant="gray"
        disabled={index === 0}
        onClick={() => onStepChange(index - 1)}
      >
        ← Назад
      </Button>
      <Button
        disabled={index === count - 1}
        onClick={() => onStepChange(index + 1)}
      >
        Далі →
      </Button>
    </div>
  );
}
