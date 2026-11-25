import type { CircuitPaletteItem, CircuitSession } from '../types';

export function CircuitPalette({
  items,
  disabled,
  session,
}: {
  items: CircuitPaletteItem[];
  disabled: string[];
  session: CircuitSession | null;
}) {
  return (
    <div className="cb-pal" id="cbPal">
      <div className="cb-pal-t">Деталі</div>
      {items.map((item) => (
        <button
          key={item.type}
          className="cb-item"
          data-add={item.type}
          disabled={disabled.includes(item.type)}
          onPointerDown={(event) =>
            session?.palettePointerDown(event.nativeEvent, item.type)
          }
        >
          <svg
            viewBox={item.viewBox}
            dangerouslySetInnerHTML={{ __html: item.svg }}
          />
          <span>{item.name}</span>
        </button>
      ))}
    </div>
  );
}
