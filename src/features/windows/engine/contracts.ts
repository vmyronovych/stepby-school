import type {
  FileNode,
  MenuItem,
  WindowsMenu,
  WindowsState,
  WindowsWindow,
} from '../types';
export type NewNode = Pick<FileNode, 'id' | 'name' | 'kind'> &
  Partial<FileNode>;
export function createNode(node: NewNode): FileNode {
  const fields = {
    ext: '',
    date: '',
    made: '',
    size: 0,
    text: '',
    kids: [],
    cap: 0,
    free: 0,
    ...node,
  };
  return node.kind === 'dir'
    ? { ...fields, kind: 'dir' }
    : { ...fields, kind: 'file' };
}
export type NewWindow = Pick<
  WindowsWindow,
  'kind' | 'x' | 'y' | 'w' | 'h' | 'max'
> &
  Partial<WindowsWindow>;
export interface Point {
  x: number;
  y: number;
}
export interface VirtualRect {
  l: number;
  t: number;
  r: number;
  b: number;
}
export type WindowMotion =
  | { kind: 'move'; id: number; p0: Point; r0: Point }
  | {
      kind: 'size';
      d: string;
      id: number;
      p0: Point;
      r0: Point & { w: number; h: number };
    };
export type DropTarget =
  | {
      desk: 1;
      el?: never;
      label?: never;
      del?: never;
      dest?: never;
      op?: never;
    }
  | ({ el: Element | null; label: string; desk?: never } & (
      | { del: 1; dest?: never; op?: never }
      | { dest: number; op: 'copy' | 'move'; del?: never }
    ));
export interface FileDrag {
  sf: string;
  id: number;
  p0: Point;
  on: boolean;
  reduce: boolean;
  slow: boolean;
  off: Point | null;
  ids: number[];
  ctrl?: boolean;
  shift?: boolean;
  tgt?: DropTarget | null;
}
export interface InternalWindowsState extends WindowsState {
  el: HTMLElement | null;
  scr: HTMLElement | null;
  seq: number;
  wseq: number;
  z: number;
  hid: number[] | null;
  dico: string;
  views: Record<string, string>;
  sorts: Record<string, { by: string; dir: number }>;
  press: {
    key: string;
    a: string | null;
    v: string | null;
    w?: number | null;
  } | null;
  drag: FileDrag | null;
  band: { sf: string; p0: Point; base: number[] } | null;
  mv: WindowMotion | null;
  last: { key: string | null; t: number; x: number; y: number } | null;
  slow: ReturnType<typeof setTimeout> | undefined;
  win: { alone: boolean } | null;
  clock: ReturnType<typeof setInterval> | undefined;
  castT?: ReturnType<typeof setTimeout>;
  blnT?: ReturnType<typeof setTimeout>;
  want?: string | null;
  scrollTo?: number | null;
}
export type MenuDefinition = Omit<WindowsMenu, 'x'> & { x?: number };
export type MenuEntry = MenuItem | '-';
export function menuEntries(
  entries: (MenuEntry | null | false | undefined)[],
): MenuEntry[] {
  return entries.filter((entry): entry is MenuEntry => !!entry);
}
export function requireElement<T extends Element>(
  element: T | null | undefined,
): T {
  if (!element) throw new Error('Windows projector element is not mounted');
  return element;
}
