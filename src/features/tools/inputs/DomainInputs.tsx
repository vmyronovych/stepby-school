import { useLayoutEffect, useRef, useState } from 'react';
import type { ToolConfig } from '../../../types';
import type { ToolInputServices } from './types';
import { configValue } from './types';

const palette = [
  ['√', 'sqrt(|)'],
  ['∛', 'root(3, |)'],
  ['x²', '^2'],
  ['xⁿ', '^'],
  ['( )', '(|)'],
  ['a/b', '/'],
  ['x', 'x'],
] as const;

export function DomainInputs({
  config,
  renderPreview,
}: {
  config: ToolConfig;
  renderPreview: ToolInputServices['renderDomainPreview'];
}) {
  const [formula, setFormula] = useState(() =>
    configValue(config, 'f', 'sqrt(x - 2)/(x^2 - 9)'),
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const selectionRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (selectionRef.current === null) return;
    inputRef.current?.focus();
    inputRef.current?.setSelectionRange(
      selectionRef.current,
      selectionRef.current,
    );
    selectionRef.current = null;
  }, [formula]);

  function insert(fragment: string) {
    const input = inputRef.current;
    if (!input) return;
    const start = input.selectionStart ?? formula.length;
    const end = input.selectionEnd ?? start;
    const marker = fragment.indexOf('|');
    const insertion = fragment.replace('|', '');
    const position = start + (marker < 0 ? insertion.length : marker);
    const nextFormula =
      formula.slice(0, start) + insertion + formula.slice(end);
    if (nextFormula === formula) {
      input.focus();
      input.setSelectionRange(position, position);
      return;
    }
    selectionRef.current = position;
    setFormula(nextFormula);
  }

  return (
    <>
      <div className="field">
        <label className="fl" htmlFor="i_f">
          Функція y =
        </label>
        <input
          id="i_f"
          ref={inputRef}
          value={formula}
          onChange={(event) => setFormula(event.target.value)}
          autoComplete="off"
          spellCheck={false}
        />
        <div className="dpal">
          {palette.map(([label, fragment]) => (
            <button key={label} type="button" onClick={() => insert(fragment)}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div id="dprev">{renderPreview(formula)}</div>
      <p className="helper">
        Корінь — sqrt( ), корінь 3-го степеня — root(3, …), степінь — ^, дріб —
        /. Під коренем і в знаменнику — многочлен до x².
      </p>
    </>
  );
}
