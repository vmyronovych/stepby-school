import type { KeyboardController } from '../types';

export function KeyboardPresets({
  controller,
  focus,
  onSelect,
}: {
  controller: KeyboardController;
  focus: string | null;
  onSelect(preset: string | null): void;
}) {
  return (
    <div className="proj-chips">
      <button
        type="button"
        className="chip"
        data-kbf=""
        aria-pressed={focus === null}
        onClick={() => onSelect(null)}
      >
        Усі групи
      </button>
      {Object.entries(controller.groups).map(([id, group]) => (
        <button
          key={id}
          type="button"
          className={`chip g-${id}`}
          data-kbf={id}
          aria-pressed={focus === id}
          onClick={() => onSelect(id)}
        >
          <i />
          {group.label}
        </button>
      ))}
      <span className="proj-sep" />
      {Object.entries(controller.presets).map(([id, preset]) => (
        <button
          key={id}
          type="button"
          className="chip"
          data-kbf={id}
          aria-pressed={focus === id}
          onClick={() => onSelect(id)}
        >
          {preset.label}
        </button>
      ))}
    </div>
  );
}
