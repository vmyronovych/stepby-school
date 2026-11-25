import {
  ExampleInputs,
  type ToolInputProps,
} from '../../../../components/notebook/inputs';
import { ScalarNotebook } from './notebook';
const options = ScalarNotebook.examples.map(({ title }, index) => ({
  value: String(index),
  label: title,
}));
export function ScalarInputs({ config }: ToolInputProps) {
  return (
    <ExampleInputs
      id="i_spexample"
      label="Задача"
      value={String(
        Math.max(
          0,
          ScalarNotebook.examples.findIndex(
            (example) =>
              example.group === Number(config.group ?? 0) &&
              example.part === Number(config.part ?? 0),
          ),
        ),
      )}
      options={options}
      helper="Розв’язуй задачу кнопкою «Далі». Після відповіді переходь до наступної задачі."
    />
  );
}
