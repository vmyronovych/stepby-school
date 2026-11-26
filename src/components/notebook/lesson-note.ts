import { notebookLinks } from './links';
import { esc } from '../legacy-html';
export function lessonNote(toolId: string, what: string, anim?: string) {
  const t = notebookLinks.lessonForTool(toolId);
  if (!t) return '';
  return `<div class="lnote hwa"${anim || ''}>${what} — докладно в уроці <a href="${t.href}">«${esc(t.title)}»</a>.</div>`;
}
