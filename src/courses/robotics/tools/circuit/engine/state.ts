import type { CircuitBoard } from './types';
export const circuitState: {
  simGen: number;
  circuit: CircuitBoard | null;
  cbView: 'schem' | 'bb';
} = {
  simGen: 0,
  circuit: null,
  cbView: 'schem',
};
