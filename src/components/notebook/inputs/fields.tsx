import type { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

export function InputField({ id, label, ...inputProps }: InputFieldProps) {
  return (
    <div className="field">
      <label className="fl" htmlFor={id}>
        {label}
      </label>
      <input id={id} {...inputProps} />
    </div>
  );
}

export function SelectField({
  id,
  label,
  value,
  options,
}: {
  id: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="field">
      <label className="fl" htmlFor={id}>
        {label}
      </label>
      <select id={id} defaultValue={value}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
