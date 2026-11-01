export type Point = [number, number];
export interface Position {
  x: number;
  y: number;
}
export interface Terminal extends Position {
  nx: number;
  ny: number;
}
export interface Endpoint {
  p: string;
  t: number;
}
export type PartType =
  'battery' | 'resistor' | 'led' | 'buzzer' | 'switch' | 'button';
export interface PartProperties {
  [key: string]: string | number | boolean | undefined;
  src?: string;
  volt?: number;
  cells?: number;
  cap?: string;
  ohm?: number;
  flipped?: boolean;
  color?: string;
  vol?: number;
  tone?: number;
}
export interface PartState {
  heat?: number;
  dead?: boolean;
  t?: number;
  m?: number;
  charging?: boolean;
  acc?: number;
  off?: boolean;
  on?: boolean;
  pressed?: boolean;
}
export interface RuntimeCurrent {
  I: number;
  vrev: number;
  vfw: number;
}
export interface CircuitPart extends Position {
  id: string;
  type: string;
  rot: number;
  props: PartProperties;
  s: PartState;
  rt: RuntimeCurrent;
  ph: number;
  ramp: number[];
}
export interface Wire {
  id: string;
  a: Endpoint;
  b: Endpoint;
  rt: { I: number };
  ph: number;
}
export interface Hole {
  c: number;
  r: string;
}
export interface Placement extends Hole {
  flip: boolean;
}
export interface Jumper {
  id: string;
  a: Hole;
  b: Hole;
  pts?: Point[];
  color: string;
}
export interface Breadboard {
  place: Record<string, Placement>;
  jumps: Jumper[];
}
export interface CircuitBoard {
  parts: CircuitPart[];
  wires: Wire[];
  next: number;
  sel: string[];
  pop: string | null;
  sticky: string | null;
  undo: string[];
  redo: string[];
  bb: Breadboard;
}
export interface Polyline {
  pts: Point[];
  cum: number[];
  len: number;
}
export type ElectricalElement =
  | { kind: 'R'; r: number }
  | { kind: 'V'; v: number; r: number }
  | { kind: 'D'; vf: number; rd: number; a: number; k: number }
  | { kind: 'open' };
export interface SolverBranch {
  src: 'part' | 'wire';
  id: string;
  n0: number;
  n1: number;
  e: ElectricalElement;
  on?: boolean;
}
export interface PartInit {
  props: PartProperties;
  s: PartState;
}
export interface PartAction {
  id: string;
  t: string;
}
export interface PartParameter {
  key: string;
  label: string;
  options: [string | number | boolean, string][];
  when?(part: CircuitPart): boolean;
}
export interface PaintEnvironment {
  t: number;
  still: boolean;
}
export interface TickResult {
  resolve: boolean;
  say: string;
}
export interface PartDefinition {
  name: string;
  pal: number;
  rotatable: boolean;
  single?: boolean;
  rooms?: boolean;
  toggle?: boolean;
  hold?: boolean;
  terms: Point[];
  norms: Point[];
  box: [number, number, number, number];
  path: Point[] | null;
  ramps?: Point[][];
  init(): PartInit;
  elec(part: CircuitPart): ElectricalElement;
  draw(part: CircuitPart): string;
  labels(part: CircuitPart): { x: number; y: number; t: string; cls: string }[];
  params?: PartParameter[];
  actions?(part: CircuitPart): PartAction[];
  act?(part: CircuitPart, id: string): void;
  onParam?(part: CircuitPart, key: string): void;
  title?(part: CircuitPart): string;
  paint?(
    part: CircuitPart,
    group: SVGGElement,
    environment: PaintEnvironment,
  ): void;
  tick?(part: CircuitPart, dt: number): TickResult | null;
  warn?(part: CircuitPart): string;
  say?: string | ((part: CircuitPart) => string);
  gap?(part: CircuitPart): Point | null;
  cap?(part: CircuitPart): number;
  slotR?: number;
  slot?(room: string, index: number): Position;
  powered?(part: CircuitPart): boolean;
  sounding?(part: CircuitPart): boolean;
  tap?(part: CircuitPart): void;
  drain?(part: CircuitPart, distance: number): boolean;
}
export interface LayoutTransform extends Position {
  rot: number;
  mx: number;
  k: number;
}
export interface BreadboardWire extends Wire {
  pts: Point[];
  kind: string;
  color?: string;
  jid?: string;
}
export interface BreadboardLayout {
  place: Map<string, LayoutTransform>;
  wires: BreadboardWire[];
  used: Map<string, Hole[]>;
  h: number;
  module?: boolean;
}
export interface Conductor {
  obj: { rt: { I: number }; ph: number };
  poly: Polyline;
  ends: (string | null)[];
  gap?: () => Point | null;
  k?: number;
  part?: CircuitPart;
  entry?: number;
  off?: number;
  ramp?: 'in' | 'out';
}
export interface RailNet {
  (strip: string): string | null;
  rails: string[];
}
export type NetLookup = (partId: string, terminal: number) => string;

/** Properties are dynamic because the inspector chooses keys at runtime. */
export function numberProperty(part: CircuitPart, key: string): number {
  const value = part.props[key];
  if (typeof value !== 'number')
    throw new Error(`Part ${part.type} requires numeric property ${key}`);
  return value;
}
export function stringProperty(part: CircuitPart, key: string): string {
  const value = part.props[key];
  if (typeof value !== 'string')
    throw new Error(`Part ${part.type} requires string property ${key}`);
  return value;
}
export function stateNumber(
  state: PartState,
  key: 'heat' | 't' | 'm' | 'acc',
): number {
  const value = state[key];
  if (typeof value !== 'number')
    throw new Error(`Part state requires numeric field ${key}`);
  return value;
}
export function required<T>(
  value: T | null | undefined,
  message = 'Circuit invariant failed',
): T {
  if (value == null) throw new Error(message);
  return value;
}
