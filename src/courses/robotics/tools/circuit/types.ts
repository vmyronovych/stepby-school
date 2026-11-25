import type { CircuitBoard } from './engine/types';
export interface CircuitPaletteItem {
  type: string;
  name: string;
  viewBox: string;
  svg: string;
}
export interface CircuitProperties {
  title: string;
  params: {
    key: string;
    label: string;
    selectedIndex: number;
    options: [unknown, string][];
  }[];
  actions: { id: string; t: string }[];
}
export interface CircuitControls {
  view: 'schem' | 'bb';
  canUndo: boolean;
  canRedo: boolean;
  disabledParts: string[];
  properties: CircuitProperties | null;
  message: string;
  canBreadboard?: boolean;
}
export interface CircuitSession {
  setView(view: 'schem' | 'bb'): void;
  undo(): void;
  redo(): void;
  clear(): void;
  action(id: string): void;
  setParameter(key: string, index: number): void;
  palettePointerDown(event: PointerEvent, type: string): void;
  positionPop(): void;
  dispose(): void;
  setActive(active: boolean): void;
  reset(): void;
}
export interface CircuitController {
  palette(): CircuitPaletteItem[];
  mount(
    root: HTMLElement,
    onControls: (state: CircuitControls) => void,
    options?: CircuitMountOptions,
  ): CircuitSession;
}
export interface CircuitPreset {
  id: string;
  title: string;
  description: string;
  board: CircuitBoard;
  viewBox?: [number, number, number, number];
}
export interface CircuitMountOptions {
  preset?: CircuitPreset;
}
