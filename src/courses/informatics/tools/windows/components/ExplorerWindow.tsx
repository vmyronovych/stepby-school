import type { WindowsController, WindowsWindow } from '../types';
import {
  Action,
  Artwork,
  Glyph,
  ResizeHandles,
  WindowCaps,
} from './primitives';
import { ExplorerAddress, ExplorerNavigation } from './ExplorerNavigation';
import { ExplorerCommands } from './ExplorerCommands';
import { FileContent, FilePane } from './FileContent';
export function ExplorerWindow({
  controller,
  window: w,
}: {
  controller: WindowsController;
  window: WindowsWindow;
}) {
  const s = controller.state(),
    h = controller.helpers,
    t = h.tab(w),
    count = h.shown(w).length,
    view = h.viewOf(t.loc),
    selected = t.sel.length,
    one = selected === 1 ? s.by[t.sel[0]] : null,
    size = one?.kind === 'file' ? h.human(one.size) : '';
  const title =
    s.ver === '11' ? (
      <div className="x-tabs" data-drag="1">
        {w.tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab${index === w.ti ? ' on' : ''}`}
            data-a="tab"
            data-v={index}
          >
            <Artwork html={h.locIco(tab.loc, 16)} />
            <span className="tn">
              {tab.q ? 'Результати пошуку' : h.locName(tab.loc)}
            </span>
            <Action className="tx" action="tabx" value={index}>
              <Glyph controller={controller} name="x" size={8} />
            </Action>
          </div>
        ))}
        <Action className="tadd" action="tabnew">
          <Glyph controller={controller} name="add" size={12} />
        </Action>
        <span className="sp" />
        <WindowCaps controller={controller} window={w} />
      </div>
    ) : (
      <div className="x-tb" data-drag="1">
        <span className="qat">
          <Artwork html={h.appIco('explorer', 16)} />
          <i className="qs" />
          <Action className="qb" action="props">
            <Glyph controller={controller} name="props" />
          </Action>
          <Action className="qb" action="newdir">
            <Glyph controller={controller} name="newdir" />
          </Action>
          <button className="qb nar">
            <Glyph controller={controller} name="chd" size={8} />
          </button>
          <i className="qs" />
        </span>
        <span className="tt">{h.title(w)}</span>
        <WindowCaps controller={controller} window={w} />
      </div>
    );
  return (
    <>
      {title}
      {s.ver === '11' ? (
        <>
          <ExplorerAddress controller={controller} window={w} />
          <ExplorerCommands controller={controller} window={w} />
        </>
      ) : (
        <>
          <ExplorerCommands controller={controller} window={w} />
          <ExplorerAddress controller={controller} window={w} />
        </>
      )}
      <div className="x-bd">
        {w.nav && (
          <div className="x-nav" data-sk={`nav${w.id}`}>
            <ExplorerNavigation controller={controller} window={w} />
          </div>
        )}
        <div
          className="x-ct"
          data-sf={`w${w.id}`}
          data-sk={`ct${w.id}-${t.loc}-${t.q}`}
        >
          <FileContent controller={controller} window={w} />
        </div>
        {w.pane && <FilePane controller={controller} window={w} />}
      </div>
      <div className="x-sb">
        <span>Елементів: {count}</span>
        {selected > 0 && (
          <span>
            {selected === 1
              ? 'Вибрано 1 елемент'
              : `Вибрано елементів: ${selected}`}
          </span>
        )}
        {size && <span>{size}</span>}
        <span className="sp" />
        <span className="vb">
          {[
            ['details', 'vdet'],
            ['large', 'vbig'],
          ].map(([value, icon]) => (
            <Action
              key={value}
              action="view"
              value={value}
              className={view === value ? 'on' : ''}
            >
              <Glyph controller={controller} name={icon} size={12} />
            </Action>
          ))}
        </span>
      </div>
      <ResizeHandles window={w} />
    </>
  );
}
