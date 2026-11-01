import type { ToolConfig } from '../../../types';
import { SelectField } from './fields';
import { configValue } from './types';

function RatioFields({
  config,
  first,
  second,
  label,
  defaults,
  fraction,
}: {
  config: ToolConfig;
  first: string;
  second: string;
  label: string;
  defaults: [string | number, string | number];
  fraction: boolean;
}) {
  return (
    <div className="field">
      <label className="fl" htmlFor={`i_${first}`}>
        {label}
      </label>
      <div className="row">
        <input
          id={`i_${first}`}
          aria-label={`${label}: ${fraction ? 'чисельник' : 'перша частина'}`}
          type={fraction ? 'number' : 'text'}
          defaultValue={configValue(config, first, defaults[0])}
          style={{ flex: 1 }}
        />
        <span style={{ alignSelf: 'center' }}>{fraction ? '/' : ':'}</span>
        <input
          id={`i_${second}`}
          aria-label={`${label}: ${fraction ? 'знаменник' : 'друга частина'}`}
          type={fraction ? 'number' : 'text'}
          defaultValue={configValue(config, second, defaults[1])}
          style={{ flex: 1 }}
        />
      </div>
    </div>
  );
}

export function FractionInputs({ config }: { config: ToolConfig }) {
  return (
    <>
      <RatioFields
        config={config}
        first="a"
        second="b"
        label="Перший дріб"
        defaults={[1, 4]}
        fraction
      />
      <SelectField
        id="i_op"
        label="Дія"
        value={config.op === '-' ? '-' : '+'}
        options={[
          { value: '+', label: '+' },
          { value: '-', label: '-' },
        ]}
      />
      <RatioFields
        config={config}
        first="c"
        second="d"
        label="Другий дріб"
        defaults={[1, 6]}
        fraction
      />
    </>
  );
}

export function ProportionInputs({ config }: { config: ToolConfig }) {
  return (
    <>
      <RatioFields
        config={config}
        first="a"
        second="b"
        label="Пропорція (a : b = c : d)"
        defaults={['x', '3']}
        fraction={false}
      />
      <RatioFields
        config={config}
        first="c"
        second="d"
        label="="
        defaults={['4', '6']}
        fraction={false}
      />
      <p className="helper">
        Кожна частина — число або доданок з x (напр. 5x, 4). Пропорція зводиться
        навхрест до лінійного рівняння.
      </p>
    </>
  );
}
