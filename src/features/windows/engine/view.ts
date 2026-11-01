import type {
  ExplorerTab,
  FileNode,
  MenuItem,
  SearchResult,
  Selection,
  WindowsHelpers,
  WindowsLocation,
  WindowsWindow,
} from '../types';
import type { MenuEntry } from './contracts';
import { WN_WINLOGO, wnAppIco, wnIco, wnSvg } from './icons';
import {
  rootNode,
  screen,
  wn,
  WN_APPS,
  wnAdm,
  wnDt,
  wnFull,
  wnH,
  wnKB,
  wnLocName,
  wnReal,
  wnSorted,
  wnSortOf,
  wnTab,
  wnTB,
  wnType,
  wnW,
  wnWritable,
} from './model';

/* Windows view-model helpers and React model publication. */
// React components render every Windows view; these helpers expose view-model data.
export const WN_COLS: WindowsHelpers['cols'] = {
  name: { h: "Ім'я", w: 250 },
  date: { h: 'Дата змінення', w: 136, v: (n) => wnDt(n.date) },
  type: { h: 'Тип', w: 196, v: (n) => wnType(n) },
  size: {
    h: 'Розмір',
    w: 90,
    r: 1,
    v: (n) => (n.kind === 'file' ? wnKB(n.size) : ''),
  },
  orig: { h: 'Вихідне розташування', w: 230, v: (n) => wnReal(n.orig) },
  del: { h: 'Дата видалення', w: 136, v: (n) => wnDt(n.del) },
  where: { h: 'Папка', w: 250, v: (n) => wnReal(wn.up[n.id]) },
};

export const WN_VPX: Record<string, number> = {
  xl: 160,
  large: 96,
  medium: 48,
  small: 16,
  list: 16,
  tiles: 48,
  content: 32,
};

export function wnItCls(h: Selection, n: FileNode, extra?: string) {
  const cut = wn.clip && wn.clip.op === 'cut' && wn.clip.ids.includes(n.id);
  return (
    'it' +
    (h.sel.includes(n.id) ? ' sel' : '') +
    (cut ? ' cut' : '') +
    (h.anc === n.id ? ' foc' : '') +
    (n.kind === 'dir' || n.bin ? ' fold' : '') +
    (extra ? ' ' + extra : '')
  );
}

/* ---- панель завдань ---- */
export const WN_PINNED = ['explorer', 'edge', 'store'];

export function wnClock() {
  const d = new Date(),
    p = (x: number) => String(x).padStart(2, '0');
  return (
    d.getHours() +
    ':' +
    p(d.getMinutes()) +
    '<br>' +
    p(d.getDate()) +
    '.' +
    p(d.getMonth() + 1) +
    '.' +
    d.getFullYear()
  );
}

export function wnLogo(px: number) {
  if (wn.ver === '11')
    return wnSvg(
      px,
      '0 0 16 16',
      '<g fill="url(#wnLogo11)">' + WN_WINLOGO + '</g>',
    );
  return wnSvg(
    px,
    '0 0 16 16',
    '<g fill="currentColor">' + WN_WINLOGO + '</g>',
  );
}

/* ---- «Пуск» ---- */
export const WN_S10: WindowsHelpers['start10'] = [
  ['E', ['excel']],
  ['M', ['edge', 'store']],
  ['O', ['onedrive']],
  ['P', ['ppt']],
  ['W', ['word']],
  ['К', ['calc', 'camera']],
  ['П', ['settings', 'mail']],
  [
    'С',
    [
      {
        f: 'Службові — Windows',
        k: ['taskmgr', 'cmd', 'ctrl', 'explorer', 'thispc'],
      },
      { f: 'Стандартні — Windows', k: ['paint', 'notepad', 'snip'] },
    ],
  ],
  ['Ф', ['photos']],
];

export const WN_T10: WindowsHelpers['tiles10'] = [
  [
    'Продуктивність',
    [['word'], ['excel'], ['ppt'], ['edge', 2], ['mail'], ['photos']],
  ],
  ['Огляд', [['store', 2], ['calc'], ['camera'], ['clock']]],
];

export const WN_P11 = [
  'edge',
  'word',
  'excel',
  'ppt',
  'mail',
  'store',
  'photos',
  'settings',
  'calc',
  'clock',
  'notepad',
  'paint',
  'explorer',
  'media',
  'camera',
  'snip',
  'cmd',
  'onedrive',
];

export const WN_A11: WindowsHelpers['all11'] = [
  ['E', ['excel']],
  ['M', ['edge', 'store']],
  ['O', ['onedrive']],
  ['P', ['paint', 'ppt']],
  ['W', ['word']],
  ['Б', ['notepad']],
  ['Г', ['clock']],
  ['К', ['calc', 'camera', 'cmd']],
  ['М', ['media']],
  ['Н', ['snip']],
  ['П', ['settings', 'mail', 'explorer']],
  ['Ф', ['photos']],
];

/* пошук: програми за іменем і ключовими словами, папки й файли — за початком імені */
export function wnFind(q: string): SearchResult[] {
  q = q.trim().toLowerCase();
  if (!q) return [];
  const apps = Object.keys(WN_APPS)
    .filter((k) => {
      const a = WN_APPS[k],
        words = (a.n + ' ' + a.kw).toLowerCase().split(/\s+/);
      return (
        a.n.toLowerCase().startsWith(q) ||
        words.some((x) => x.startsWith(q)) ||
        (q.length > 2 && a.kw.includes(q))
      );
    })
    .map((k): SearchResult => ({
      kind: 'app',
      k,
      name: WN_APPS[k].n,
      sub: 'Програма',
    }));
  const dirs: SearchResult[] = [],
    files: SearchResult[] = [];
  (function walk(n: FileNode) {
    (n.kids || []).forEach((k) => {
      if (wnAdm(k.id)) return;
      if (
        wnFull(k, true).toLowerCase().startsWith(q) ||
        k.name
          .toLowerCase()
          .split(/[\s_]+/)
          .some((x) => x.startsWith(q))
      )
        (k.kind === 'dir' ? dirs : files).push({
          kind: k.kind,
          id: k.id,
          name: wnFull(k, true),
          sub: k.kind === 'dir' ? 'Папка файлів' : wnType(k),
        });
      if (k.kind === 'dir') walk(k);
    });
  })(rootNode());
  return [...apps, ...dirs.slice(0, 4), ...files.slice(0, 4)];
}

export function wnResIco(r: SearchResult, px: number) {
  return r.kind === 'app' ? wnAppIco(r.k, px) : wnIco(wn.by[r.id], px);
}

/* ---- вікна ---- */
export function wnTitle(w: WindowsWindow) {
  const t = wnTab(w);
  return t.q
    ? 'Результати пошуку в «' + wnLocName(t.loc) + '»'
    : wnLocName(t.loc);
}

/* ---- Провідник ---- */
export function wnFlags(w: WindowsWindow) {
  const t = wnTab(w),
    loc = t.loc,
    sel = t.sel.map((id) => wn.by[id]).filter(Boolean);
  const wr = !t.q && wnWritable(loc) !== 0,
    lock = sel.some((n) => n.lock),
    inBin = loc === wn.bin.id;
  return {
    t,
    loc,
    sel,
    any: sel.length > 0,
    one: sel.length === 1,
    wr,
    lock,
    inBin,
    canCut: sel.length > 0 && !lock && !inBin,
    canDel: sel.length > 0 && !lock,
    canRen: sel.length === 1 && !lock && !inBin,
    canPaste: !!wn.clip && wr,
    canPin:
      (sel.length === 1 && sel[0].kind === 'dir' && !inBin) ||
      (!sel.length && typeof loc === 'number' && !inBin),
  };
}

export function wnAddrText(t: ExplorerTab) {
  if (typeof t.loc !== 'number') return wnLocName(t.loc);
  return wnReal(t.loc) || wnLocName(t.loc);
}

/* усе, що зараз видно у вмісті вікна, — у тому самому порядку */
export function wnShown(w: WindowsWindow) {
  const t = wnTab(w),
    loc = t.loc;
  if (t.q) return wnSearchIn(loc, t.q);
  if (loc === 'quick')
    return [...wn.pins, ...wn.recent].map((id) => wn.by[id]).filter(Boolean);
  if (loc === 'net') return [];
  if (loc === 'gallery') {
    const out: FileNode[] = [];
    (function walk(n: FileNode) {
      n.kids.forEach((k) => {
        if (k.kind === 'dir') walk(k);
        else if (k.ext === 'png' || k.ext === 'bmp') out.push(k);
      });
    })(wn.by[wn.sp.pics]);
    return out;
  }
  const n = wn.by[loc];
  if (n.pc)
    return [
      ...wnSorted(
        n.kids.filter((k) => !k.drive),
        { by: 'name', dir: 1 },
      ),
      ...n.kids.filter((k) => k.drive),
    ];
  return wnSorted(
    n.links ? [...n.kids, ...n.links.map((id) => wn.by[id])] : n.kids,
    wnSortOf(loc),
  );
}

export function wnSearchIn(loc: WindowsLocation, q: string) {
  q = q.trim().toLowerCase();
  const base =
      typeof loc === 'number' && !wn.by[loc].pc ? wn.by[loc] : rootNode(),
    out: FileNode[] = [];
  (function walk(n: FileNode) {
    (n.kids || []).forEach((k) => {
      if (wnFull(k, true).toLowerCase().includes(q)) out.push(k);
      if (k.kind === 'dir' && !k.bin) walk(k);
    });
  })(base);
  return wnSorted(out, wnSortOf(loc));
}

/* ---- діалоги ---- */
export const WN_DLGI: Record<string, string> = {
  warn: '<path d="M16 3L30 28H2z" fill="#FFCC00" stroke="#C99A00" stroke-linejoin="round"/><path d="M16 11v9" stroke="#1B1B1B" stroke-width="2.6" stroke-linecap="round"/><circle cx="16" cy="24" r="1.6" fill="#1B1B1B"/>',
  del: '<path d="M7 3h13l6 6v20H7z" fill="#FFFFFF" stroke="#8B93A0"/><circle cx="23" cy="23" r="7" fill="#E81123"/><path d="M20 20l6 6M26 20l-6 6" stroke="#FFFFFF" stroke-width="2"/>',
  shield:
    '<path d="M16 2l12 4.5v8.5c0 7.5-5.3 12.8-12 15-6.7-2.2-12-7.5-12-15V6.5z" fill="#2F7FD8"/><path d="M16 2v28c6.7-2.2 12-7.5 12-15V6.5z" fill="#FFCC00"/>',
  err: '<circle cx="16" cy="16" r="14" fill="#E81123"/><path d="M11 11l10 10M21 11L11 21" stroke="#FFFFFF" stroke-width="2.4"/>',
};

export function wnMenuItem(p: string): MenuItem | null {
  let items = wn.menu?.items;
  let item: MenuEntry | undefined;
  for (const index of p.split('.')) {
    item = items?.[Number(index)];
    if (!item || item === '-') return null;
    items = item.sub;
  }
  return item && item !== '-' ? item : null;
}

export function wnGrow(e: HTMLElement) {
  e.style.height = '0';
  e.style.height = e.scrollHeight + 2 + 'px';
}

/* меню не вилазить за край екрана: зсуваємо, а підменю відкриваємо ліворуч */
export function wnFitMenu() {
  const el = screen().querySelector<HTMLElement>('#wnMenu');
  if (!el || !wn.menu) return;
  const W = wnW(),
    H = wnH() - (wn.menu.bottom != null ? 0 : wnTB());
  const r = { w: el.offsetWidth, h: el.offsetHeight };
  if (wn.menu.x + r.w > W) el.style.left = Math.max(0, W - r.w - 2) + 'px';
  if (wn.menu.bottom == null && wn.menu.y != null && wn.menu.y + r.h > H)
    el.style.top = Math.max(0, H - r.h - 2) + 'px';
  el.classList.toggle('flip', el.offsetLeft + r.w * 2 > W);
}
// React owns all projector views. Commands only publish a model revision.
