import {
  ExampleInputs,
  type ToolInputProps,
} from '../../../../components/notebook/inputs';
import { RP } from './rational-power';
const options = RP.examples.map(({ title, group }) => ({
  value: group,
  label: title,
}));
export function RationalPowerInputs({ config }: ToolInputProps) {
  return (
    <ExampleInputs
      id="i_rpexample"
      label="Приклад"
      value={String(config.example || '6.1')}
      options={options}
      helper="Вибери готовий приклад. Кожний приклад має покроковий розбір."
    />
  );
}
