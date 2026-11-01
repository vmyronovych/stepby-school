import type {
  Breadboard,
  CircuitPart,
  Endpoint,
  Hole,
  Jumper,
  PartProperties,
  PartState,
  Placement,
  Point,
} from './types';
interface Snapshot {
  next: number;
  parts: Omit<CircuitPart, 'rt' | 'ph' | 'ramp'>[];
  wires: { id: string; a: Endpoint; b: Endpoint }[];
  bb: Breadboard;
}
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function object(value: unknown): Record<string, unknown> {
  if (!isRecord(value)) throw new Error('Invalid circuit snapshot object');
  return value;
}
function array(value: unknown): unknown[] {
  if (!Array.isArray(value)) throw new Error('Invalid circuit snapshot array');
  return value;
}
function number(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new Error('Invalid circuit snapshot number');
  return value;
}
function string(value: unknown): string {
  if (typeof value !== 'string')
    throw new Error('Invalid circuit snapshot string');
  return value;
}
function bool(value: unknown): boolean {
  if (typeof value !== 'boolean')
    throw new Error('Invalid circuit snapshot flag');
  return value;
}
function endpoint(value: unknown): Endpoint {
  const v = object(value);
  return { p: string(v.p), t: number(v.t) };
}
function hole(value: unknown): Hole {
  const v = object(value);
  return { c: number(v.c), r: string(v.r) };
}
function properties(value: unknown): PartProperties {
  const result: PartProperties = {};
  for (const [key, v] of Object.entries(object(value))) {
    if (
      typeof v !== 'string' &&
      typeof v !== 'number' &&
      typeof v !== 'boolean'
    )
      throw new Error('Invalid circuit property');
    result[key] = v;
  }
  return result;
}
function state(value: unknown): PartState {
  const v = object(value),
    result: PartState = {};
  for (const key of ['heat', 't', 'm', 'acc'] as const)
    if (v[key] !== undefined) result[key] = number(v[key]);
  for (const key of ['dead', 'charging', 'off', 'on', 'pressed'] as const)
    if (v[key] !== undefined) result[key] = bool(v[key]);
  return result;
}
function part(value: unknown): Omit<CircuitPart, 'rt' | 'ph' | 'ramp'> {
  const v = object(value);
  return {
    id: string(v.id),
    type: string(v.type),
    x: number(v.x),
    y: number(v.y),
    rot: number(v.rot),
    props: properties(v.props),
    s: state(v.s),
  };
}
function board(value: unknown): Breadboard {
  if (value == null) return { place: {}, jumps: [] };
  const v = object(value),
    place: Record<string, Placement> = {};
  for (const [id, p] of Object.entries(object(v.place))) {
    const q = object(p);
    place[id] = { ...hole(q), flip: bool(q.flip) };
  }
  const jumps: Jumper[] = array(v.jumps).map((j) => {
    const q = object(j),
      jumper: Jumper = {
        id: string(q.id),
        a: hole(q.a),
        b: hole(q.b),
        color: string(q.color),
      };
    if (q.pts !== undefined)
      jumper.pts = array(q.pts).map((p) => {
        const a = array(p);
        const point: Point = [number(a[0]), number(a[1])];
        return point;
      });
    return jumper;
  });
  return { place, jumps };
}
export function parseSnapshot(serialized: string): Snapshot {
  const value: unknown = JSON.parse(serialized),
    v = object(value);
  return {
    next: number(v.next),
    parts: array(v.parts).map(part),
    wires: array(v.wires).map((w) => {
      const q = object(w);
      return { id: string(q.id), a: endpoint(q.a), b: endpoint(q.b) };
    }),
    bb: board(v.bb),
  };
}
