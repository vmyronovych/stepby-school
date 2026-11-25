import type { MenuItem, WindowsController } from '../types';
import { Action, Artwork, Glyph } from './primitives';
export function ContextMenu({ controller }: { controller: WindowsController }) {
  const state = controller.state(),
    menu = state.menu;
  if (!menu) return null;
  function list(items: (MenuItem | '-')[], path: string) {
    return (
      <div className="mn">
        {path === '' && menu?.row && (
          <div className="mrow">
            {menu.row.map((row, index) => (
              <Action
                key={index}
                action={row.dis ? '' : 'mrow'}
                value={index}
                title={row.t}
                disabled={!!row.dis}
              >
                <Glyph controller={controller} name={row.g || ''} />
              </Action>
            ))}
          </div>
        )}
        {items.map((item, index) => {
          if (item === '-') return <div key={index} className="ms" />;
          if (item.hd)
            return (
              <div key={index} className="mh">
                {item.t}
              </div>
            );
          const key = path ? `${path}.${index}` : String(index);
          return (
            <div
              key={key}
              className={`mi${item.dis ? ' dis' : ''}${item.sub ? ' has' : ''}${item.b ? ' b' : ''}${item.d ? ' two' : ''}${item.on ? ' on' : ''}`}
              data-a={item.dis || item.sub ? '' : 'mi'}
              data-v={key}
            >
              <span className="mic">
                {item.chk ? (
                  <Glyph controller={controller} name="check" size={12} />
                ) : item.rad ? (
                  <i className="dot" />
                ) : item.ic ? (
                  <Artwork html={item.ic} />
                ) : null}
              </span>
              <span className="mt">
                {item.t}
                {item.d && <small>{item.d}</small>}
              </span>
              {item.k && <span className="mk">{item.k}</span>}
              {item.sub && (
                <>
                  <span className="ma">
                    <Glyph controller={controller} name="chr" size={10} />
                  </span>
                  {list(item.sub, key)}
                </>
              )}
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div
      className={`wn-menu st${menu.st || state.ver}${menu.dark ? ' dark' : ''}`}
      id="wnMenu"
      style={{
        left: menu.x,
        ...(menu.bottom != null ? { bottom: menu.bottom } : { top: menu.y }),
      }}
    >
      {list(menu.items, '')}
    </div>
  );
}
