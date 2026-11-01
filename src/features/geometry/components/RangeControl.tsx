interface RangeControlProps {
  id: string;
  name: string;
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  output?: string;
  onChange: (value: number) => void;
}
export function RangeControl({
  id,
  name,
  label,
  min,
  max,
  step,
  value,
  output,
  onChange,
}: RangeControlProps) {
  return (
    <label htmlFor={id}>
      {label}
      <output id={`${id}-value`} htmlFor={id}>
        {output ?? value}
      </output>
      <input
        id={id}
        name={name}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
