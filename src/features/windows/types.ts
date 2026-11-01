export type WindowsLocation = number | string;
export interface FileNodeFields {
  id: number;
  name: string;
  ext: string;
  date: string;
  made: string;
  size: number;
  text: string;
  kids: FileNode[];
  links?: number[];
  pc?: boolean | number;
  bin?: boolean | number;
  drive?: string;
  lock?: boolean | number;
  adm?: boolean | number;
  own?: boolean | number;
  blank?: boolean | number;
  emb?: string;
  real?: string;
  cap: number;
  free: number;
  orig?: number;
  del?: string;
}
export type FileNode = FileNodeFields & ({ kind: 'dir' } | { kind: 'file' });
export interface Selection {
  sel: number[];
  anc: number | null;
}
export interface ExplorerTab extends Selection {
  loc: WindowsLocation;
  q: string;
  back: WindowsLocation[];
  fwd: WindowsLocation[];
  addr: boolean;
  addrv?: string | null;
}
export interface MenuItem {
  t: string;
  g?: string;
  act?: (menu: WindowsMenu) => void;
  dis?: boolean | number;
  hd?: boolean | number;
  sub?: (MenuItem | '-')[];
  b?: boolean | number;
  d?: string;
  on?: boolean | number;
  chk?: boolean | number;
  rad?: boolean | number;
  ic?: string;
  k?: string;
}
export interface WindowsMenu {
  x: number;
  y?: number;
  jump?: boolean | number;
  bottom?: number;
  st?: string;
  dark?: boolean;
  row?: MenuItem[];
  items: (MenuItem | '-')[];
}
export interface WindowsDialog {
  title: string;
  icon?: string | null;
  main?: string;
  text?: string;
  about?: FileNode | null;
  owner?: number | null;
  refocus?: string | null;
  wide?: boolean | number;
  opts?: { t: string; act?: () => void }[];
  btns: {
    t: string;
    def?: boolean | number;
    shield?: boolean | number;
    act?: (() => void) | null;
  }[];
}
export interface WindowsWindowFields {
  id: number;
  app: string;
  file: number | null;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  born: number;
  max: boolean;
  min: boolean;
  tabs: ExplorerTab[];
  ti: number;
  open: Set<string>;
  nav: boolean;
  pane: string | null;
  rtab: string;
  rmin: boolean;
  rpop: boolean;
  text: string;
  dirty: boolean;
  ftype: string;
  fname: string;
  id2: number;
  val: string;
  ptab: number;
  owner: number | null;
  then?: () => void;
  d: WindowsDialog;
}
export type WindowsWindow = WindowsWindowFields &
  (
    | { kind: 'exp' }
    | { kind: 'app' }
    | { kind: 'props' }
    | { kind: 'save' }
    | { kind: 'dlg' }
  );
export interface WindowsState {
  ver: string;
  big: boolean;
  cast: boolean;
  open: boolean;
  lang: string;
  root: FileNode | null;
  bin: FileNode;
  desk: FileNode;
  by: Record<string, FileNode>;
  up: Record<string, number>;
  sp: Record<string, number>;
  pos: Record<string, [number, number]>;
  dk: Selection;
  wins: WindowsWindow[];
  act: number | null;
  start: string | null;
  sq: string;
  srail: boolean;
  sfold: Record<string, boolean>;
  pins: number[];
  recent: number[];
  showExt: boolean;
  hidden?: boolean;
  boxes: boolean;
  compact: boolean;
  clip: { op: string; ids: number[] } | null;
  menu: WindowsMenu | null;
  edit: {
    sf: string;
    id: number;
    val: string;
    fresh: boolean;
    isNew?: boolean;
  } | null;
  reactFx?: {
    kind: string;
    node?: FileNode;
    size?: number;
    count?: number;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    label?: string;
  } | null;
  reactCast?: string | null;
  reactBalloon?: { x: number; y: number } | null;
}
export interface WindowFlags {
  t: ExplorerTab;
  loc: WindowsLocation;
  sel: FileNode[];
  any: boolean;
  one: boolean;
  wr: boolean;
  lock: boolean;
  inBin: boolean;
  canCut: boolean;
  canDel: boolean;
  canRen: boolean;
  canPaste: boolean;
  canPin: boolean;
}
export type SearchResult = { name: string; sub: string } & (
  | { kind: 'app'; k: string; id?: never }
  | { kind: 'dir' | 'file'; id: number; k?: never }
);
export interface WindowsHelpers {
  g(name: string, size?: number): string;
  svg(size: number, box: string, content: string): string;
  ico(node: FileNode, size: number, preview?: boolean): string;
  appIco(app: string, size: number): string;
  locIco(loc: WindowsLocation, size: number): string;
  folder(size: number, open?: boolean): string;
  pic(node: FileNode, size: number): string;
  logo(size: number): string;
  defs: string;
  wallpaper: Record<string, string>;
  icons: Record<string, (size: number, flag?: boolean) => string>;
  dialogIcons: Record<string, string>;
  apps: Record<string, { n: string; kw: string }>;
  views: [string, string][];
  pinned: string[];
  start10: [string, (string | { f: string; k: string[] })[]][];
  tiles10: [string, [string, number?][]][];
  pins11: string[];
  all11: [string, string[]][];
  cols: Record<
    string,
    { h: string; w: number; r?: number; v?: (node: FileNode) => string }
  >;
  viewPixels: Record<string, number>;
  w(): number;
  h(): number;
  tb(): number;
  cell(): { w: number; h: number; i: number };
  tab(window: WindowsWindow): ExplorerTab;
  win(id: number | null): WindowsWindow | undefined;
  appKey(window: WindowsWindow): string | null;
  deskItems(): FileNode[];
  itClass(selection: Selection, node: FileNode, extra?: string): string;
  full(node: FileNode, extension?: boolean): string;
  type(node: FileNode): string;
  real(id: WindowsLocation | null | undefined): string;
  locName(loc: WindowsLocation): string;
  path(id?: number | null): number[];
  upLoc(loc: WindowsLocation): WindowsLocation | null;
  writable(loc: WindowsLocation): number;
  inBin(id: number): boolean;
  dt(date?: string): string;
  dtLong(date?: string): string;
  kb(size: number): string;
  human(size: number): string;
  num: Intl.NumberFormat;
  title(window: WindowsWindow): string;
  flags(window: WindowsWindow): WindowFlags;
  shown(window: WindowsWindow): FileNode[];
  sorted(nodes: FileNode[], sort: { by: string; dir: number }): FileNode[];
  sortOf(loc: WindowsLocation): { by: string; dir: number };
  viewOf(loc: WindowsLocation): string;
  find(query: string): SearchResult[];
  resIco(result: SearchResult, size: number): string;
  modal(): WindowsWindow | null;
  appOf(node: FileNode): string | null;
  dirSize(node: FileNode): { s: number; f: number; d: number };
}
export interface WindowsController {
  state(): WindowsState;
  helpers: WindowsHelpers;
  subscribe(listener: () => void): () => void;
  getRevision(): number;
  mount(host: HTMLElement, preset: string | null): () => void;
  setPreset(preset: string | null): void;
  toolbar(action: string, value?: string): void;
  afterRender(): void;
}
