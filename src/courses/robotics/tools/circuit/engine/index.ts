/** Shared part registry; the free editor retains its board, embedded presets own isolated sessions. */
export { CircuitEngine } from './controller';
export { circuitState } from './state';
export { CIRC, circFlow, circHeat, FRESH, partMessage } from './parts';
export { CIRC_WIRE_R, CIRC_LEAK } from './constants';
export { solveCircuit, branchCurrent } from './solver';
export {
  cbNewBoard,
  cbAddPart,
  cbAddWire,
  cbLinks,
  cbInCircuit,
  cbExtract,
  cbInsert,
  cbSnap,
  cbRestore,
  cbCopy,
  cbPaste,
} from './board';
export { cbTerm, cbRot, cbPoly, cbAt, cbRoute } from './geometry';
export {
  BB,
  bbLegs,
  bbStrip,
  bbKey,
  bbPt,
  bbOcc,
  cbSchemNets,
  bbBoardNets,
  cbBoardFromSchem,
  cbSchemFromBoard,
  cbBreadboard,
  bbBoardSvg,
  bbCircuitSvg,
} from './breadboard';
export type * from './types';
