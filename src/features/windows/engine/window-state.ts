import type { WindowsWindow } from '../types';
import type { NewWindow } from './contracts';
/** Defaults give every command a stable typed window record. */
export function createWindow(input: NewWindow): WindowsWindow {
  const fields = {
    id: 0,
    app: '',
    file: null,
    z: 0,
    born: 0,
    min: false,
    tabs: [],
    ti: 0,
    open: new Set<string>(),
    nav: false,
    pane: null,
    rtab: '',
    rmin: false,
    rpop: false,
    text: '',
    dirty: false,
    ftype: '',
    fname: '',
    id2: 0,
    val: '',
    ptab: 0,
    owner: null,
    d: { title: '', btns: [] },
    ...input,
  };
  switch (input.kind) {
    case 'exp':
      return { ...fields, kind: 'exp' };
    case 'app':
      return { ...fields, kind: 'app' };
    case 'props':
      return { ...fields, kind: 'props' };
    case 'save':
      return { ...fields, kind: 'save' };
    case 'dlg':
      return { ...fields, kind: 'dlg' };
  }
}
