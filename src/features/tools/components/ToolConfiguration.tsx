import { Button, LegacyHtml } from '../../../components/ui';

interface ToolConfigurationProps {
  inputsHtml: string;
  inputHint?: string;
  canMarkDone: boolean;
  onApply: () => void;
  onMarkDone: () => void;
}

export function ToolConfiguration({
  inputsHtml,
  inputHint,
  canMarkDone,
  onApply,
  onMarkDone,
}: ToolConfigurationProps) {
  return (
    <div className="panel cfg">
      <h3>⚙️ Умова</h3>
      <LegacyHtml id="toolInputs" html={inputsHtml} />
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
