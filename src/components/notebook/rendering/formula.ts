import type { FormulaNode } from '../../../lib/math';
import { fmlText, fStrip } from '../../../lib/math';
import type { Pen } from '../handwriting';
import { hwGlyphs, hwTick } from '../handwriting';
export interface FormulaOptions {
  marks?: Record<string, { cls?: string; badge?: string | number }>;
}
/* ---------- Рукописний рендер ----------
   pen — лічильник пера {writing, order}, спільний із hwGlyphs: формула
   пишеться строго по черзі. Порядок пера: показник кореня → гачок →
   дах → підкореневий вираз; дріб — чисельник → риска → знаменник;
   степінь — одразу після основи.
   opt.marks = {fid: {cls, badge}} — обведення підвиразів (з номером). */
export function renderFormula(
  n: FormulaNode,
  pen?: Pen,
  opt?: FormulaOptions,
): string {
  pen = pen || { writing: false };
  opt = opt || {};
  const R = (x: FormulaNode) => renderFormula(x, pen, opt);
  const op = (ch: string) => `<span class="fo">${hwGlyphs(ch, pen)}</span>`;
  let inner;
  switch (n.t) {
    case 'num':
      inner = hwGlyphs(fmlText(n), pen);
      break;
    case 'x':
      inner = hwGlyphs(n.symbol || 'x', pen);
      break;
    case 'add':
      inner = R(n.a) + op('+') + R(n.b);
      break;
    case 'sub':
      inner = R(n.a) + op('−') + R(n.b);
      break;
    case 'pm':
      inner = R(n.a) + op('±') + R(n.b);
      break;
    case 'mul':
      inner = R(n.a) + (n.imp ? '' : op('·')) + R(n.b);
      break;
    case 'neg':
      inner = hwGlyphs('−', pen) + R(n.a);
      break;
    case 'paren':
      inner = `<span class="fpar">${hwGlyphs('(', pen)}</span>${R(n.a)}<span class="fpar">${hwGlyphs(')', pen)}</span>`;
      break;
    case 'div': {
      const num = R(fStrip(n.a));
      const bar = `<span class="ffbar hwa"${hwTick(pen, 'hwbar', 0.28)}></span>`;
      inner = `<span class="ffn">${num}</span>${bar}<span class="ffd">${R(fStrip(n.b))}</span>`;
      break;
    }
    case 'pow':
      inner = R(n.a) + `<span class="fpow">${R(fStrip(n.e))}</span>`;
      break;
    case 'root': {
      const idx =
        n.n !== 2
          ? `<span class="ridx">${hwGlyphs(String(n.n), pen)}</span>`
          : '';
      const hook = `<span class="rhook hwa"${hwTick(pen, 'hwwipe')}><svg viewBox="0 0 20 100" preserveAspectRatio="none"><path d="M1,62 L6,55 L11,97 L19.6,1" vector-effect="non-scaling-stroke"/></svg></span>`;
      const roof = `<span class="rbar hwa"${hwTick(pen, 'hwbar', 0.3)}></span>`;
      inner = `${idx}${hook}<span class="rbody">${roof}${R(fStrip(n.a))}</span>`;
      break;
    }
    default:
      inner = '';
  }
  const mk = n.fid && opt.marks && opt.marks[n.fid];
  const cls =
    `fx fx-${n.t}` +
    (n.t === 'div' ? ' ffrac' : '') +
    (n.t === 'mul' && n.functionCall ? ' fx-function' : '') +
    (mk ? ' fmark ' + (mk.cls || '') : '');
  const badge = mk && mk.badge ? `<span class="fbadge">${mk.badge}</span>` : '';
  return `<span class="${cls}"${n.fid ? ` data-fid="${n.fid}"` : ''}>${inner}${badge}</span>`;
}
// формула як самостійний напис (обгортка задає шрифт і колір)
export function formulaHtml(
  n: FormulaNode,
  pen?: Pen,
  opt?: FormulaOptions,
): string {
  return `<span class="fml">${renderFormula(n, pen, opt)}</span>`;
}
