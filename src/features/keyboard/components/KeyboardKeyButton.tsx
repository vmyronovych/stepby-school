import type { CSSProperties } from 'react';
import type { KeyboardKey } from '../types';

interface KeyboardKeyButtonProps {
  keyDefinition: KeyboardKey;
  label: string;
  active: boolean;
  down: boolean;
  selected: boolean;
  onSelect(event: MouseEvent): void;
}

export function KeyboardKeyButton({
  keyDefinition: key,
  label,
  active,
  down,
  selected,
  onSelect,
}: KeyboardKeyButtonProps) {
  const className = [
    'key',
    `g-${key.g}`,
    active && 'on',
    down && 'down',
    selected && 'sel',
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <button
      type="button"
      className={className}
      data-code={key.c}
      aria-label={label}
      style={
        {
          '--x': key.x,
          '--y': key.y,
          '--w': key.w,
          '--h': key.h,
        } as CSSProperties
      }
      onClick={(event) => onSelect(event.nativeEvent)}
    >
      {key.en ? (
        <span className="en">{key.en}</span>
      ) : key.un ? (
        <>
          <span className="sh">{key.sh}</span>
          <span className="un">{key.un}</span>
        </>
      ) : (
        <span className={`nm${key.big ? ' big' : key.ctr ? ' ctr' : ''}`}>
          {key.nm}
        </span>
      )}
      {key.ua && <span className="ua">{key.ua}</span>}
    </button>
  );
}
