import type { ReactNode } from 'react';
import { Button } from '../../../components/ui';

interface ToolConfigurationProps {
  children: ReactNode;
  inputHint?: string;
  canMarkDone: boolean;
  onApply: () => void;
  onMarkDone: () => void;
}

export function ToolConfiguration({
  children,
  inputHint,
  canMarkDone,
  onApply,
  onMarkDone,
}: ToolConfigurationProps) {
  return (
    <div className="panel cfg">
      <h3>⚙️ Умова</h3>
      {children}
      <Button style={{ width: '100%', marginTop: 4 }} onClick={onApply}>
        ▶ Показати розв’язання
      </Button>
      {canMarkDone && (
        <Button
          variant="green"
          small
          style={{ width: '100%', marginTop: 8 }}
          onClick={onMarkDone}
        >
          ✓ Позначити виконаним
        </Button>
      )}
      <p className="helper">
        {inputHint ||
          'Можна ввести свої значення і натиснути «Показати розв’язання».'}
      </p>
    </div>
  );
}
