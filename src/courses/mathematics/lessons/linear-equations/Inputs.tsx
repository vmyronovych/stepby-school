import type { ToolConfig } from '../../../../types';
import {
  InputField,
  configValue,
} from '../../../../components/notebook/inputs';
export function EquationInputs({ config }: { config: ToolConfig }) {
  return (
    <InputField
      id="i_text"
      label="Рівняння"
      defaultValue={configValue(config, 'text', '3x + 5 = 20')}
    />
  );
}
