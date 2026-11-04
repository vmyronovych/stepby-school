import type { ToolConfig } from '../../../types';
import type { ExampleOption, ToolInputServices } from './types';
import { SelectField } from './fields';

export function ExampleInputs({
  toolId,
  config,
  examples,
}: {
  toolId: 'radian' | 'rational-power' | 'scalar-product' | 'vector-scaling';
  config: ToolConfig;
  examples: ToolInputServices['examples'];
}) {
  const options: ExampleOption[] = examples[toolId] ?? [];
  const rational = toolId === 'rational-power';
  const scalar = toolId === 'scalar-product';
  const value = rational
    ? String(config.example || '6.1')
    : scalar
      ? (options.find(
          (option) =>
            option.group === Number(config.group ?? 0) &&
            option.part === Number(config.part ?? 0),
        )?.value ??
        options[0]?.value ??
        '0')
      : String(config.example ?? 0);
  const helper = rational
    ? 'Вибери готовий приклад. Кожний приклад має покроковий розбір.'
    : scalar
      ? 'Розв’язуй задачу кнопкою «Далі». Після відповіді переходь до наступної задачі.'
      : 'Розв’язуй задачу кнопкою «Далі». Після відповіді відкрий наступну задачу.';

  return (
    <>
      <SelectField
        id={
          toolId === 'radian'
            ? 'i_radexample'
            : rational
              ? 'i_rpexample'
              : scalar
                ? 'i_spexample'
                : 'i_vsexample'
        }
        label={rational ? 'Приклад' : 'Задача'}
        value={value}
        options={options}
      />
      <p className="helper">{helper}</p>
    </>
  );
}
