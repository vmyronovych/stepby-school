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
}
export interface CircuitController {
  palette(): CircuitPaletteItem[];
  mount(
    root: HTMLElement,
    onControls: (state: CircuitControls) => void,
  ): CircuitSession;
}
