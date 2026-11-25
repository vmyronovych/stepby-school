import { fmtNum } from './numbers';
export interface LinearSide {
  a: number;
  b: number;
}
export type Relation = '≥' | '≤' | '>' | '<' | '≠' | '=';
export interface LinearToken {
  id: string;
  t: string;
  cls?: string;
  from?: string[];
}
export interface LinearUnit {
  valId: string;
  signId: string | null;
  cross: boolean;
}
export interface LinearTerm {
  id: string;
  coef: number;
  xf: boolean;
  from?: string[];
  cross?: boolean;
}
export interface LinearRow {
  tokens: LinearToken[];
  type: 'write' | 'move' | 'combine';
  text: string;
  note?: string;
  done?: boolean;
  moveUnits?: LinearUnit[];
}
// Shared steps for linear equations and inequalities.

export function parseSide(s: string): LinearSide {
  s = s.replace(/\s+/g, '').replace(/-/g, '+-').replace(/^\+/, '');
  const numRe = /^-?\d+(\.\d+)?$/; // допускаємо лише чисті числа-коефіцієнти
  let a = 0,
    b = 0;
  for (const t of s.split('+')) {
    if (t === '') continue;
    if (t.includes('x')) {
      let co = t.replace('x', '');
      if (co === '' || co === '+') co = '1';
      if (co === '-') co = '-1';
      if (!numRe.test(co)) throw 'bad';
      a += parseFloat(co);
    } else {
      if (!numRe.test(t)) throw 'bad';
      b += parseFloat(t);
    }
  }
  return { a, b };
}
// точне значення: ціле, скінченний десятковий або звичайний дріб «1/3» (знаменник ≤ 1000)
export function fmtExact(v: number) {
  if (Math.abs(v * 100 - Math.round(v * 100)) < 1e-9)
    return fmtNum(v).replace('-', '−');
  let h0 = 0,
    h1 = 1,
    k0 = 1,
    k1 = 0,
    a = Math.abs(v),
    f = a;
  for (let i = 0; i < 20; i++) {
    const t = Math.floor(f);
    [h0, h1] = [h1, t * h1 + h0];
    [k0, k1] = [k1, t * k1 + k0];
    if (k1 > 1000) return fmtNum(v);
    if (Math.abs(h1 / k1 - a) < 1e-9) break;
    f = 1 / (f - t);
  }
  return (v < 0 ? '−' : '') + h1 + '/' + k1;
}
export function fmtX(c: number) {
  c = +c;
  const a = Math.abs(c);
  const s = c < 0 ? '−' : '';
  const cc = a === 1 ? '' : fmtNum(a);
  return s + cc + 'x';
}

// ЛІНІЙНЕ ЯДРО (перевикористовується рівняннями, пропорціями й умовами ОДЗ):
// приймає коефіцієнти ls={a,b}, rs={a,b} і будує кроки «записуємо → перенос → зведення → ділимо → відповідь».
// opts.simplify — пропустити зведення одного доданка та ділення на 1.
// opts.rel — знак відношення замість «=» ('≠', '≥', '>' …): режим нерівності. У ньому
// пропускаються порожні кроки (зведення одного доданка, ділення на 1), при діленні на
// від'ємне число знак перевертається, а відповідь — точний дріб (1/3), а не 0.33.
export const REL_FLIP: Record<Relation, Relation> = {
  '≥': '≤',
  '≤': '≥',
  '>': '<',
  '<': '>',
  '≠': '≠',
  '=': '=',
};
export function buildLinearRows(
  ls: LinearSide,
  rs: LinearSide,
  opts?: { rel?: Relation; simplify?: boolean },
): LinearRow[] {
  const rel = (opts && opts.rel) || '=',
    ineq = rel !== '=';
  const compact = ineq || !!(opts && opts.simplify);
  const A = ls.a - rs.a,
    B = rs.b - ls.b;
  const EQ = (t?: Relation): LinearToken => ({
    id: 'eq',
    t: t || rel,
    cls: 'eq-eq',
  });
  const rows: LinearRow[] = [];
  // будуємо сторону з доданків: перший — зі своїм знаком (без окремого токена),
  // наступні — окремий знак 's'+id + модуль значення. Записуємо і опис одиниць.
  function emitSide(list: LinearTerm[], units?: LinearUnit[]): LinearToken[] {
    const t: LinearToken[] = [];
    list.forEach((u, i) => {
      const fmt = u.xf ? fmtX : fmtNum; // формат визначає сам доданок (x-член чи число)
      if (i === 0) {
        t.push({ id: u.id, t: fmt(u.coef), from: u.from });
        units && units.push({ valId: u.id, signId: null, cross: !!u.cross });
      } else {
        const sid = 's' + u.id;
        t.push({ id: sid, t: u.coef < 0 ? '−' : '+', cls: 'op' });
        t.push({ id: u.id, t: fmt(Math.abs(u.coef)), from: u.from });
        units && units.push({ valId: u.id, signId: sid, cross: !!u.cross });
      }
    });
    if (!list.length) t.push({ id: 'z', t: '0' });
    return t;
  }

  // 1) початкове рівняння
  const oL: LinearTerm[] = [];
  if (ls.a !== 0) oL.push({ id: 'LX', coef: ls.a, xf: true });
  if (ls.b !== 0) oL.push({ id: 'LC', coef: ls.b, xf: false });
  if (!oL.length) oL.push({ id: 'LC', coef: 0, xf: false });
  const oR: LinearTerm[] = [];
  if (rs.a !== 0) oR.push({ id: 'RX', coef: rs.a, xf: true });
  if (rs.b !== 0) oR.push({ id: 'RC', coef: rs.b, xf: false });
  if (!oR.length) oR.push({ id: 'RC', coef: 0, xf: false });
  rows.push({
    tokens: [...emitSide(oL), EQ(), ...emitSide(oR)],
    type: 'write',
    text: ineq
      ? 'Записуємо умову. Шукаємо всі x, які її задовольняють.'
      : 'Записуємо рівняння. Наша мета — знайти x.',
  });

  const needMove = rs.a !== 0 || ls.b !== 0;
  if (needMove) {
    // 2) перенос: x — ліворуч, числа — праворуч. Число летить РАЗОМ зі знаком; знак
    //    змінюється в момент приземлення (бо перейшло через «=»).
    const leftX: LinearTerm[] = [];
    if (ls.a !== 0)
      leftX.push({ id: 'LX', coef: ls.a, xf: true, cross: false });
    if (rs.a !== 0)
      leftX.push({ id: 'RX', coef: -rs.a, xf: true, cross: true });
    const rightC: LinearTerm[] = [];
    if (rs.b !== 0)
      rightC.push({ id: 'RC', coef: rs.b, xf: false, cross: false });
    if (ls.b !== 0)
      rightC.push({ id: 'LC', coef: -ls.b, xf: false, cross: true });
    const units: LinearUnit[] = [];
    const mtoks = [...emitSide(leftX, units), EQ(), ...emitSide(rightC, units)];
    rows.push({
      tokens: mtoks,
      type: 'move',
      note: 'переносимо',
      moveUnits: units,
      text: `Переносимо доданки з x у ліву частину, а числа — у праву. Число летить разом зі своїм знаком, і коли приземляється по інший бік «${rel}», його знак змінюється на протилежний.`,
    });

    // 3) зводимо подібні: x-члени злітаються в A·x, числа — в B
    const axFrom = leftX.map((t) => t.id),
      bcFrom = rightC.map((t) => t.id);
    if (compact && leftX.length === 1 && rightC.length === 1) {
      // зводити нічого — по доданку з кожного боку
      if (A === 1) return rows;
    } else {
      const rc = [
        { id: 'ACX', t: A === 0 ? '0' : fmtX(A), from: axFrom },
        EQ(),
        { id: 'BCC', t: fmtNum(B), from: bcFrom },
      ];
      const doneCombine = A === 0;
      rows.push({
        tokens: rc,
        type: 'combine',
        note: doneCombine ? undefined : 'зводимо подібні',
        done: doneCombine,
        text: doneCombine
          ? B === 0
            ? 'Цифри злітаються: ліворуч і праворуч виходить однаково — рівняння є тотожністю, розв’язків безліч.'
            : 'Цифри злітаються: ліворуч виходить 0, а праворуч інше число — рівняння не має розв’язків.'
          : `Додаємо однакові доданки: цифри злітаються разом. Ліворуч ${fmtNum(ls.a)} − ${fmtNum(rs.a)} = ${fmtNum(A)} перед x, праворуч ${fmtNum(rs.b)} − ${fmtNum(ls.b)} = ${fmtNum(B)}.`,
      });
      if (A === 0) return rows;
      if (compact && A === 1) return rows;
    }
  } else if (compact && A === 1) {
    return rows; // коефіцієнт при x вже 1 — ділити нічого
  } else if (A === 0) {
    rows.push({
      tokens: [{ id: 'z', t: '0' }, EQ(), { id: 'RC', t: fmtNum(B) }],
      type: 'write',
      done: true,
      text:
        B === 0
          ? 'Рівняння є тотожністю — розв’язків безліч.'
          : 'Рівняння не має розв’язків.',
    });
    return rows;
  }

  const x = B / A;
  if (ineq) {
    // 4') ділимо на коефіцієнт; на від'ємне — знак нерівності перевертається
    const flip = A < 0 && rel !== '≠',
      rel2 = flip ? REL_FLIP[rel] : rel;
    const fm = (v: number) => fmtNum(v).replace('-', '−');
    const aTxt = A < 0 ? `(${fm(A)})` : fm(A);
    rows.push({
      tokens: [
        { id: 'x1', t: 'x' },
        EQ(rel2),
        { id: 'bdiv', t: fm(B) },
        { id: 'od', t: ':', cls: 'op' },
        { id: 'adiv', t: aTxt },
      ],
      type: 'write',
      note: flip
        ? `ділимо на ${fm(A)} — знак змінюється`
        : `ділимо на ${fm(A)}`,
      text: flip
        ? `Ділимо обидві частини на ${fm(A)}. Число від’ємне, тому знак нерівності змінюється на протилежний: «${rel}» стає «${rel2}».`
        : `Щоб знайти x, ділимо обидві частини на коефіцієнт біля x, тобто на ${fm(A)}.`,
    });
    rows.push({
      tokens: [
        { id: 'x1', t: 'x' },
        EQ(rel2),
        { id: 'ans', t: fmtExact(x), cls: 'res', from: ['bdiv', 'adiv'] },
      ],
      type: 'combine',
      done: true,
      text: `Виконуємо ділення: ${fm(B)} : ${aTxt} = ${fmtExact(x)}. Отже, x ${rel2} ${fmtExact(x)}.`,
    });
    return rows;
  }
  // 4) ділимо на коефіцієнт біля x
  rows.push({
    tokens: [
      { id: 'x1', t: 'x' },
      EQ(),
      { id: 'bdiv', t: fmtNum(B) },
      { id: 'od', t: ':', cls: 'op' },
      { id: 'adiv', t: fmtNum(A) },
    ],
    type: 'write',
    note: `ділимо на ${fmtNum(A)}`,
    text: `Щоб знайти x, ділимо обидві частини рівняння на коефіцієнт біля x, тобто на ${fmtNum(A)}.`,
  });
  // 5) відповідь: виконуємо ділення — цифри злітаються в результат (як при додаванні/відніманні)
  rows.push({
    tokens: [
      { id: 'x1', t: 'x' },
      EQ(),
      { id: 'ans', t: fmtNum(x), cls: 'res', from: ['bdiv', 'adiv'] },
    ],
    type: 'combine',
    done: true,
    text: `Виконуємо ділення: ${fmtNum(B)} : ${fmtNum(A)} = ${fmtNum(x)}. Цифри злітаються в результат. Отже, x = ${fmtNum(x)}.`,
  });

  return rows;
}

// рядки моделі → кроки навігації
export function linearSteps(rows: LinearRow[]) {
  return rows.map((r) => ({ text: r.text }));
}
