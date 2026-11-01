import type { ToolConfig } from '../../../types';
import { InputField, SelectField } from './fields';
import { configValue } from './types';

export function EquationInputs({ config }: { config: ToolConfig }) {
  return (
    <InputField
      id="i_text"
      label="Рівняння"
      defaultValue={configValue(config, 'text', '3x + 5 = 20')}
    />
  );
}

export function IrrationalInputs({ config }: { config: ToolConfig }) {
  return (
    <>
      <SelectField
        id="i_irmethod"
        label="Метод"
        value={config.method === 'substitution' ? 'substitution' : 'power'}
        options={[
          { value: 'power', label: 'Піднесення до степеня' },
          { value: 'substitution', label: 'Заміна t = √x' },
        ]}
      />
      <InputField
        id="i_irtext"
        label="Рівняння"
        defaultValue={configValue(config, 'text', 'sqrt(x + 2) = x')}
        autoComplete="off"
        spellCheck={false}
      />
      <p className="helper">
        Квадратний корінь: sqrt(x + 2) або √(x + 2). Кубічний: root(3, x − 1),
        cbrt(x − 1) або ∛(x − 1). Степінь: x^2. Для кубічного кореня справа має
        бути число або інший кубічний корінь після перенесення доданків. Для
        методу заміни: x - 3sqrt(x) + 2 = 0.
      </p>
    </>
  );
}
