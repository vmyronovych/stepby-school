import { Button } from '../../../components/ui';

interface StepHeaderProps {
  index: number;
  count: number;
  onRestart: () => void;
}

export function StepHeader({ index, count, onRestart }: StepHeaderProps) {
  return (
    <div className="stage-head">
      <span className="step-count">
        Крок {index + 1} з {count}
      </span>
      <div>
        <Button variant="gray" small disabled={index === 0} onClick={onRestart}>
          ⟲ Спочатку
        </Button>
      </div>
    </div>
  );
}
