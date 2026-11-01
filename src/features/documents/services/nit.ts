import { toast } from '../../../engines/core/util';
import { INFO, infoPlural } from '../data/info';
import type { InfoGrade } from '../data/types';
import { NIT_HEADER, NIT_SHEET, xlsxOneColumn } from './workbook';

export type NitSegment = 'all' | 's1' | 's2';

// частина року для файлу: усі уроки, І або ІІ семестр
export const NIT_SEG = {
  all: { label: 'усі уроки', suffix: '' },
  s1: { label: 'І семестр', suffix: '-І-семестр' },
  s2: { label: 'ІІ семестр', suffix: '-ІІ-семестр' },
};
export function nitNums(seg: NitSegment) {
  const out = [];
  for (let i = 1; i <= INFO.calendar.lessons; i++) {
    if (seg === 's1' && i >= INFO.s2) continue;
    if (seg === 's2' && i < INFO.s2) continue;
    out.push(i);
  }
  return out;
}

function nitSegment(value?: string): NitSegment {
  return value === 's1' || value === 's2' ? value : 'all';
}

/** Generate the workbook without DOM, URL, timer, or notification effects. */
export function buildNitWorkbook(g: InfoGrade, segment?: string) {
  const seg = nitSegment(segment);
  const nums = nitNums(seg);
  const bytes = xlsxOneColumn(
    NIT_SHEET,
    NIT_HEADER,
    nums.map((i) => INFO[g].ktp[i - 1].topic),
  );
  return {
    bytes,
    filename:
      'Інформатика-' + g.slice(1) + '-клас' + NIT_SEG[seg].suffix + '.xlsx',
    message:
      'Файл для НІТ: ' +
      INFO[g].label +
      ', ' +
      NIT_SEG[seg].label +
      ', ' +
      nums.length +
      ' ' +
      infoPlural(nums.length, 'тема', 'теми', 'тем'),
  };
}

export function downloadNit(g: InfoGrade, segment?: string) {
  const workbook = buildNitWorkbook(g, segment);
  const blob = new Blob([workbook.bytes], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = workbook.filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  toast(workbook.message);
}
