import type {
  CircuitPart,
  Wire,
  Endpoint,
  Hole,
  Jumper,
  Placement,
  Point,
} from './types';
interface Located {
  x0: number;
  y0: number;
  moved: boolean;
}
export type Drag =
  | (Located & { kind: 'wire'; from: Endpoint })
  | (Located & {
      kind: 'rewire';
      w: Wire;
      end: 'a' | 'b';
      fixed: Endpoint;
      from: Endpoint;
    })
  | (Located & {
      kind: 'bbpart';
      p: CircuitPart;
      pl0: Placement | null;
      fixed: boolean;
      dx: number;
      dy: number;
      ok: boolean;
    })
  | (Located & { kind: 'bbjump'; from: Hole })
  | (Located & {
      kind: 'bbjend' | 'bbjmove';
      j: Jumper;
      end: 'a' | 'b' | null;
      a0: Hole;
      b0: Hole;
      pts0?: Point[] | null;
      ok: boolean;
    })
  | (Located & {
      kind: 'move';
      p: CircuitPart;
      group: CircuitPart[];
      start: Point[];
      dx: number;
      dy: number;
      alt: boolean;
      rot0?: number;
    })
  | {
      kind: 'palette';
      type: string;
      p: CircuitPart | null;
      cx: number;
      cy: number;
      moved: boolean;
      bb?: boolean;
      ok?: boolean;
      rot0?: number;
    }
  | (Located & { kind: 'marq'; keep: string[] });
