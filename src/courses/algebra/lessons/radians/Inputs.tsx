import {
  ExampleInputs,
  type ToolInputProps,
} from '../../../../components/notebook/inputs';
import { radianExamples } from './examples';
const options = radianExamples.map(({ title, index }) => ({
  value: String(index),
  label: title,
}));
export function RadianInputs({ config }: ToolInputProps) {
  return (
    <ExampleInputs
      id="i_radexample"
      label="Задача"
      value={String(config.example ?? 0)}
      options={options}
      helper="Розв’язуй задачу кнопкою «Далі». Після відповіді відкрий наступну задачу."
    />
  );
}
