export interface ColumnAddend {
  row: number;
  val: number;
  end: number;
}
export interface ColumnAddition {
  col: number;
  ds: { j: number; v: number }[];
  cin: number;
  s: number;
  cout: number;
  lastCol: boolean;
}
export function columnAdditions(
  nums: ColumnAddend[],
  last: number,
): ColumnAddition[] {
  const digit = (n: ColumnAddend, col: number) => {
    const v = String(n.val),
      idx = v.length - 1 - (n.end - col);
    return idx >= 0 && idx < v.length ? +v[idx] : null;
  };
  const width = String(
    nums.reduce((t, n) => t + n.val * 10 ** (last - n.end), 0),
  ).length;
  const ops: ColumnAddition[] = [];
  let carry = 0;
  for (let col = last; col > last - width; col--) {
    const ds = nums
      .map((n, j) => ({ j, v: digit(n, col) }))
      .filter((x): x is { j: number; v: number } => x.v != null);
    const s = ds.reduce((t, x) => t + x.v, 0) + carry,
      lastCol = col === last - width + 1;
    const cout = lastCol ? 0 : Math.floor(s / 10);
    const o: ColumnAddition = { col, ds, cin: carry, s, cout, lastCol };
    ops.push(o);
    carry = cout;
  }
  return ops;
}
