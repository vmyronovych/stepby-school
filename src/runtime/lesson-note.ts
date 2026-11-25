import { runtimeServices } from './services';
import { esc } from '../components/legacy-html';
export function lessonNote(toolId: string, what: string, anim?: string) {
  const t = runtimeServices.topicForTool(toolId);
  if (!t) return '';
  return `<div class="lnote hwa"${anim || ''}>${what} — докладно в уроці <a href="${runtimeServices.hrefTopic(t)}">«${esc(t.title)}»</a>.</div>`;
}
