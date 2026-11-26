import { esc } from '../legacy-html';
export function lessonNote(
  t: { title: string; href: string } | null,
  what: string,
  anim?: string,
) {
  if (!t) return '';
  return `<div class="lnote hwa"${anim || ''}>${what} — докладно в уроці <a href="${t.href}">«${esc(t.title)}»</a>.</div>`;
}
