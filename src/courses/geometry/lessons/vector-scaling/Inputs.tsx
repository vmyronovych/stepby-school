import {
  ExampleInputs,
  type ToolInputProps,
} from '../../../../components/notebook/inputs';
import { ScalingNotebook } from './notebook';
const options = ScalingNotebook.examples.map(({ title }, index) => ({
  value: String(index),
  label: title,
}));
export function ScalingInputs({ config }: ToolInputProps) {
  return (
    <ExampleInputs
      id="i_vsexample"
      label="Задача"
      value={String(config.example ?? 0)}
      options={options}
      helper="Розв’язуй задачу кнопкою «Далі». Після відповіді відкрий наступну задачу."
    />
  );
}
