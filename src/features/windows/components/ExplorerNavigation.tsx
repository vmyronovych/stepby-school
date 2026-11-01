import { Fragment, type ReactNode } from 'react';
import type {
  WindowsController,
  WindowsWindow,
  FileNode,
  WindowsLocation,
} from '../types';
import { Action, Artwork, Glyph } from './primitives';
export function ExplorerAddress({
  controller,
  window: w,
}: {
  controller: WindowsController;
  window: WindowsWindow;
}) {
  const s = controller.state(),
    h = controller.helpers,
    t = h.tab(w),
    is11 = s.ver === '11';
  const nav = (action: string, icon: string, disabled = false) => (
    <Action className="nb" action={action} disabled={disabled}>
      <Glyph controller={controller} name={icon} />
    </Action>
  );
  const separator = (loc: WindowsLocation) => (
    <Action className="as" action="crumbm" value={loc}>
      <Glyph controller={controller} name="chr" size={10} />
    </Action>
  );
  const crumbs = t.q ? (
    <>
      {separator('')}
      <Action className="ac" action="crumb" value={t.loc}>
        Результати пошуку в «{h.locName(t.loc)}»
      </Action>
    </>
  ) : typeof t.loc !== 'number' || t.loc === s.bin.id ? (
    <>
      {separator('')}
      <Action className="ac" action="crumb" value={t.loc}>
        {h.locName(t.loc)}
      </Action>
    </>
  ) : (
    h.path(t.loc).map((id) => (
      <Fragment key={id}>
        {separator(s.up[id] ?? '')}
        <Action className="ac" action="crumb" value={id}>
          {s.by[id].name}
        </Action>
      </Fragment>
    ))
  );
  return (
    <div className="x-ad">
      {nav('back', 'back', !t.back.length)}
      {nav('fwd', 'fwd', !t.fwd.length)}
      {!is11 && (
        <Action
          className="nb sm"
          action="recent"
          disabled={!t.back.length && !t.fwd.length}
        >
          <Glyph controller={controller} name="chd" size={8} />
        </Action>
      )}
      {nav('up', 'up', h.upLoc(t.loc) == null || !!t.q)}
      {is11 && nav('refresh', 'refresh')}
      <div className={`abox${t.addr ? ' ed' : ''}`}>
        {t.addr ? (
          <input
            className="ain"
            data-fk={`addr${w.id}`}
            defaultValue={
              t.addrv ??
              (typeof t.loc === 'number'
                ? h.real(t.loc) || h.locName(t.loc)
                : h.locName(t.loc))
            }
            spellCheck={false}
            autoComplete="off"
          />
        ) : (
          <div className="acr" data-a="addr">
            <span className="ai">
              <Artwork html={h.locIco(t.loc, 16)} />
            </span>
            {crumbs}
          </div>
        )}
        {!is11 && (
          <>
            <Action className="ab" action="addrm">
              <Glyph controller={controller} name="chd" size={10} />
            </Action>
            <Action className="ab" action="refresh">
              <Glyph controller={controller} name="refresh" size={12} />
            </Action>
          </>
        )}
      </div>
      <label className="sbox">
        {is11 && <Glyph controller={controller} name="search" size={14} />}
        <input
          data-fk={`q${w.id}`}
          value={t.q}
          onChange={() => {}}
          placeholder={`Пошук: ${h.locName(t.loc)}`}
          spellCheck={false}
          autoComplete="off"
        />
        {!is11 && <Glyph controller={controller} name="search" size={14} />}
      </label>
    </div>
  );
}
export function ExplorerNavigation({
  controller,
  window: w,
}: {
  controller: WindowsController;
  window: WindowsWindow;
}) {
  const s = controller.state(),
    h = controller.helpers,
    t = h.tab(w),
    current = t.q ? null : t.loc;
  const row = (
    key: string,
    depth: number,
    icon: string,
    label: string,
    loc: WindowsLocation,
    kids = false,
    pin = false,
  ) => (
    <div
      key={key}
      className={`nv${loc === current ? ' cur' : ''}`}
      data-a="nav"
      data-v={loc}
      data-nv={typeof loc === 'number' ? loc : undefined}
      style={{ paddingLeft: 4 + depth * 16 }}
    >
      <span
        className="tw"
        data-a={kids ? 'tog' : undefined}
        data-v={kids ? key : undefined}
      >
        {kids && (
          <Glyph
            controller={controller}
            name={w.open.has(key) ? 'chd' : 'chr'}
            size={10}
          />
        )}
      </span>
      <Artwork html={icon} />
      <span className="nm">{label}</span>
      {pin && (
        <span className="pn">
          <Glyph controller={controller} name="pin" size={12} />
        </span>
      )}
    </div>
  );
  function tree(node: FileNode, depth: number): ReactNode {
    const children = h.sorted(
        node.kids.filter((item) => item.kind === 'dir'),
        { by: 'name', dir: 1 },
      ),
      key = node === s.root ? 'pc' : String(node.id);
    return (
      <Fragment key={node.id}>
        {row(
          key,
          depth,
          h.ico(node, 16),
          node.name,
          node.id,
          children.length > 0,
        )}
        {w.open.has(key) && children.map((child) => tree(child, depth + 1))}
      </Fragment>
    );
  }
  const pins = (depth: number) =>
    s.pins
      .map((id) => s.by[id])
      .filter(Boolean)
      .map((node) =>
        row(
          'p' + node.id,
          depth,
          h.ico(node, 16),
          node.name,
          node.id,
          false,
          true,
        ),
      );
  return s.ver === '11' ? (
    <>
      {row('home', 0, h.icons.home(16), 'Головна', 'quick')}
      {row('gal', 0, h.icons.gallery(16), 'Галерея', 'gallery')}
      <div className="nsep" />
      {pins(0)}
      <div className="nsep" />
      {s.root && tree(s.root, 0)}
      {row('net', 0, h.icons.net(16), 'Мережа', 'net')}
    </>
  ) : (
    <>
      {row(
        'quick',
        0,
        h.icons.star(16),
        'Швидкий доступ',
        'quick',
        s.pins.length > 0,
      )}
      {w.open.has('quick') && pins(1)}
      <div className="nsp" />
      {row('od', 0, h.icons.cloud(16), 'OneDrive', 'net')}
      <div className="nsp" />
      {s.root && tree(s.root, 0)}
      <div className="nsp" />
      {row('net', 0, h.icons.net(16), 'Мережа', 'net')}
    </>
  );
}
