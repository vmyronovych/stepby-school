import type { ToolConfig } from '../../../types';
import { InputField } from './fields';
import { configValue } from './types';

const arithmeticFields: Record<string, [string, string | number, string][]> = {
  add: [
    ['a', 4786, 'Перший доданок'],
    ['b', 2539, 'Другий доданок'],
  ],
  sub: [
    ['a', 5003, 'Зменшуване'],
    ['b', 1748, 'Від’ємник'],
  ],
  mult: [
    ['a', 284, 'Перший множник'],
    ['b', 36, 'Другий множник'],
  ],
  div: [
    ['n', 7256, 'Ділене'],
    ['d', 8, 'Дільник'],
  ],
};

export function ArithmeticInputs({
  toolId,
  config,
}: {
  toolId: string;
  config: ToolConfig;
}) {
  return (
    <>
      {arithmeticFields[toolId].map(([key, fallback, label]) => (
        <InputField
          key={key}
          id={`i_${key}`}
          label={label}
          type="number"
          defaultValue={configValue(config, key, fallback)}
        />
      ))}
    </>
  );
}

export function SingleNumberInputs({
  toolId,
  config,
}: {
  toolId: 'dvk' | 'factor';
  config: ToolConfig;
}) {
  const divisors = toolId === 'dvk';
  return (
    <>
      <InputField
        id="i_n"
        label="Число"
        type="number"
        min={2}
        max={divisors ? 30 : 9999}
        defaultValue={configValue(config, 'n', divisors ? 12 : 360)}
      />
      <p className="helper">
        {divisors
          ? 'Порівняємо дільники і кратні цього числа. Найкраще працює для чисел від 2 до 30.'
          : 'Розкладемо число на прості множники перебором дільників 2, 3, 5, 7… Підійде будь-яке число від 2 до 9999.'}
      </p>
    </>
  );
}

export function CommonFactorInputs({
  toolId,
  config,
}: {
  toolId: 'nsk' | 'nsd';
  config: ToolConfig;
}) {
  return (
    <>
      <InputField
        id="i_a"
        label="Перше число"
        type="number"
        min={2}
        max={999}
        defaultValue={configValue(config, 'a', 24)}
      />
      <InputField
        id="i_b"
        label="Друге число"
        type="number"
        min={2}
        max={999}
        defaultValue={configValue(config, 'b', 18)}
      />
      <InputField
        id="i_c"
        label="Третє число (необов’язково)"
        type="number"
        min={2}
        max={999}
        defaultValue={configValue(config, 'c', '')}
        placeholder="—"
      />
      <p className="helper">
        Знайдемо {toolId === 'nsk' ? 'НСК' : 'НСД'} розкладанням на прості
        множники. Числа від 2 до 999; третє можна не вводити.
      </p>
    </>
  );
}
