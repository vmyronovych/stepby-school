import { type CSSProperties, type ReactNode } from 'react';
import type { FileNode, WindowsController, WindowsWindow } from '../types';
import { Artwork, FileCheckbox, FileName, Glyph } from './primitives';
function FileGroup({
  controller,
  title,
  count,
  children,
}: {
  controller: WindowsController;
  title: string;
  count: number;
  children: ReactNode;
}) {
  return (
    <div className="x-grp">
      <div className="gh">
        <Glyph controller={controller} name="chd" size={10} />
        <span>
          {title} ({count})
        </span>
        <i />
      </div>
      {children}
    </div>
  );
}
export function FileItems({
  controller,
  window: w,
  items,
  view,
  mode = 'std',
}: {
  controller: WindowsController;
  window: WindowsWindow;
  items: FileNode[];
  view: string;
  mode?: string;
}) {
  const h = controller.helpers,
    t = h.tab(w),
    surface = `w${w.id}`;
  if (!items.length)
    return (
      <div className="x-empty">
        {mode === 'search'
          ? 'Немає елементів, які відповідають умовам пошуку.'
          : mode === 'bin'
            ? 'Кошик порожній.'
            : 'Ця папка порожня.'}
      </div>
    );
  const checkbox = (node: FileNode) => (
    <FileCheckbox controller={controller} selection={t} node={node} />
  );
  const name = (node: FileNode, line = true) => (
    <FileName
      controller={controller}
      surface={surface}
      node={node}
      line={line}
    />
  );
  if (view === 'details') {
    const columns =
      mode === 'bin'
        ? ['name', 'orig', 'del', 'size', 'type']
        : mode === 'search'
          ? ['name', 'date', 'type', 'size', 'where']
          : ['name', 'date', 'type', 'size'];
    const sort = h.sortOf(t.loc);
    return (
      <div
        className="x-det"
        style={
          {
            '--cols': columns
              .map((column) => `${h.cols[column].w}px`)
              .join(' '),
          } as CSSProperties
        }
      >
        <div className="dh">
          {columns.map((column) => (
            <span
              key={column}
              className={`${sort.by === column ? 'on ' + (sort.dir > 0 ? 'asc' : 'desc') : ''}${h.cols[column].r ? ' r' : ''}`}
              data-a="sort"
              data-v={column}
            >
              {h.cols[column].h}
            </span>
          ))}
        </div>
        {items.map((node) => (
          <div
            key={node.id}
            className={h.itClass(t, node, 'xr')}
            data-it={node.id}
          >
            {columns.map((column) =>
              column === 'name' ? (
                <span key={column} className="c nmc">
                  {checkbox(node)}
                  <Artwork html={h.ico(node, 16)} />
                  {name(node)}
                </span>
              ) : (
                <span
                  key={column}
                  className={`c${h.cols[column].r ? ' r' : ''}`}
                >
                  {h.cols[column].v?.(node)}
                </span>
              ),
            )}
          </div>
        ))}
      </div>
    );
  }
  const size = h.viewPixels[view] ?? 48;
  return (
    <div className={`x-grid v-${view}`}>
      {items.map((node) => (
        <div key={node.id} className={h.itClass(t, node)} data-it={node.id}>
          {checkbox(node)}
          <span
            className="ic"
            style={
              view === 'tiles' || view === 'content'
                ? undefined
                : { height: size }
            }
          >
            <Artwork html={h.ico(node, size, true)} />
          </span>
          {view === 'tiles' || view === 'content' ? (
            <span className="tx">
              {name(node)}
              <small>
                {view === 'content' && node.kind !== 'file' ? '' : h.type(node)}
              </small>
              {view === 'tiles' && node.kind === 'file' && (
                <small>{h.kb(node.size)}</small>
              )}
            </span>
          ) : (
            name(node, view === 'small' || view === 'list')
          )}
          {view === 'content' && (
            <span className="cx">
              <small>Дата змінення: {h.dt(node.date)}</small>
              {node.kind === 'file' && (
                <small>Розмір: {h.human(node.size)}</small>
              )}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
function FileTile({
  controller,
  window: w,
  node,
  children,
  bar,
}: {
  controller: WindowsController;
  window: WindowsWindow;
  node: FileNode;
  children?: ReactNode;
  bar?: number;
}) {
  const h = controller.helpers,
    t = h.tab(w);
  return (
    <div className={h.itClass(t, node, 'tile')} data-it={node.id}>
      <FileCheckbox controller={controller} selection={t} node={node} />
      <span className="ic">
        <Artwork html={h.ico(node, 48, true)} />
      </span>
      <span className="tx">
        <FileName
          controller={controller}
          surface={`w${w.id}`}
          node={node}
          line
        />
        {bar !== undefined && (
          <span className="ub">
            <i style={{ width: `${Math.round(bar * 100)}%` }} />
          </span>
        )}
        {children && <small>{children}</small>}
      </span>
    </div>
  );
}
export function ComputerContent({
  controller,
  window: w,
}: {
  controller: WindowsController;
  window: WindowsWindow;
}) {
  const s = controller.state(),
    h = controller.helpers;
  if (!s.root) return null;
  const folders = h.sorted(
      s.root.kids.filter((node) => !node.drive),
      { by: 'name', dir: 1 },
    ),
    drives = s.root.kids.filter((node) => node.drive);
  return (
    <>
      <FileGroup controller={controller} title="Папки" count={folders.length}>
        <div className="x-tiles">
          {folders.map((node) => (
            <FileTile
              key={node.id}
              controller={controller}
              window={w}
              node={node}
            />
          ))}
        </div>
      </FileGroup>
      <FileGroup
        controller={controller}
        title="Пристрої та диски"
        count={drives.length}
      >
        <div className="x-tiles">
          {drives.map((node) => (
            <FileTile
              key={node.id}
              controller={controller}
              window={w}
              node={node}
              bar={(node.cap - node.free) / node.cap}
            >
              {h.num.format(Math.round(node.free))} ГБ вільно з {node.cap} ГБ
            </FileTile>
          ))}
        </div>
      </FileGroup>
    </>
  );
}
function QuickContent({
  controller,
  window: w,
}: {
  controller: WindowsController;
  window: WindowsWindow;
}) {
  const s = controller.state(),
    h = controller.helpers,
    pins = s.pins.map((id) => s.by[id]).filter(Boolean),
    recent = s.recent.map((id) => s.by[id]).filter(Boolean),
    is11 = s.ver === '11',
    tab = h.tab(w);
  return (
    <>
      <FileGroup
        controller={controller}
        title={is11 ? 'Швидкий доступ' : 'Часто використовувані папки'}
        count={pins.length}
      >
        <div className="x-tiles q">
          {pins.map((node) => (
            <FileTile
              key={node.id}
              controller={controller}
              window={w}
              node={node}
            >
              {s.up[node.id] != null ? h.locName(s.up[node.id]) : ''}{' '}
              <Glyph controller={controller} name="pin" size={10} />
            </FileTile>
          ))}
        </div>
      </FileGroup>
      {is11 && (
        <FileGroup controller={controller} title="Вибране" count={0}>
          <div className="x-note">
            Після того як ви додасте файли до вибраного, вони відобразяться тут.
          </div>
        </FileGroup>
      )}
      <FileGroup
        controller={controller}
        title={is11 ? 'Останні' : 'Останні файли'}
        count={recent.length}
      >
        {recent.length ? (
          <div
            className="x-det"
            style={
              {
                '--cols': is11 ? '280px 140px 360px' : '300px 420px',
              } as CSSProperties
            }
          >
            {is11 && (
              <div className="dh">
                <span>Ім'я</span>
                <span>Дата змінення</span>
                <span>Розташування</span>
              </div>
            )}
            {recent.map((node) => (
              <div
                key={node.id}
                className={h.itClass(tab, node, 'xr')}
                data-it={node.id}
              >
                <span className="c nmc">
                  <FileCheckbox
                    controller={controller}
                    selection={tab}
                    node={node}
                  />
                  <Artwork html={h.ico(node, 16)} />
                  <FileName
                    controller={controller}
                    surface={`w${w.id}`}
                    node={node}
                    line
                  />
                </span>
                {is11 && <span className="c">{h.dt(node.date)}</span>}
                <span className="c">{h.real(s.up[node.id])}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="x-note">
            Після того як ви відкриєте деякі файли, тут відображатимуться
            останні з них.
          </div>
        )}
      </FileGroup>
    </>
  );
}
export function FileContent({
  controller,
  window: w,
}: {
  controller: WindowsController;
  window: WindowsWindow;
}) {
  const h = controller.helpers,
    t = h.tab(w),
    s = controller.state();
  if (t.q)
    return (
      <FileItems
        controller={controller}
        window={w}
        items={h.shown(w)}
        view="details"
        mode="search"
      />
    );
  if (t.loc === 'quick')
    return <QuickContent controller={controller} window={w} />;
  if (t.loc === 'net')
    return (
      <div className="x-bar">
        Мережеве виявлення вимкнуто. Мережеві комп'ютери й пристрої не
        відображаються. Клацніть, щоб змінити…
      </div>
    );
  if (typeof t.loc === 'number' && s.by[t.loc]?.pc)
    return <ComputerContent controller={controller} window={w} />;
  return (
    <FileItems
      controller={controller}
      window={w}
      items={h.shown(w)}
      view={h.viewOf(t.loc)}
      mode={typeof t.loc === 'number' && s.by[t.loc]?.bin ? 'bin' : 'std'}
    />
  );
}
export function FilePane({
  controller,
  window: w,
}: {
  controller: WindowsController;
  window: WindowsWindow;
}) {
  const h = controller.helpers,
    s = controller.state(),
    tab = h.tab(w),
    node = tab.sel.length === 1 ? s.by[tab.sel[0]] : null;
  if (w.pane === 'preview')
    return (
      <div className="x-pane">
        {!node ? (
          <p className="pv-no">Виберіть файл для попереднього перегляду.</p>
        ) : ['png', 'bmp'].includes(node.ext) ? (
          <div className="pv-img">
            <Artwork html={h.pic(node, 220)} />
          </div>
        ) : node.ext === 'txt' ? (
          <pre className="pv-txt">{node.text || ''}</pre>
        ) : (
          <p className="pv-no">Немає доступного попереднього перегляду.</p>
        )}
      </div>
    );
  const current = node ?? (typeof tab.loc === 'number' ? s.by[tab.loc] : null);
  return (
    <div className="x-pane">
      <div className="pd-ic">
        <Artwork
          html={current ? h.ico(current, 96, true) : h.locIco(tab.loc, 96)}
        />
      </div>
      <b className="pd-n">{current ? h.full(current) : h.locName(tab.loc)}</b>
      {node ? (
        <>
          <p className="pd-t">{h.type(node)}</p>
          {[
            ['Дата змінення', h.dt(node.date)],
            ...(node.kind === 'file' ? [['Розмір', h.human(node.size)]] : []),
            ['Дата створення', h.dt(node.made || node.date)],
          ].map(([label, value]) => (
            <div className="pd-r" key={label}>
              <span>{label}:</span>
              <span>{value}</span>
            </div>
          ))}
        </>
      ) : (
        current && <p className="pd-t">Елементів: {h.shown(w).length}</p>
      )}
    </div>
  );
}
