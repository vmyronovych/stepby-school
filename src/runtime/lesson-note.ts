import { runtimeServices } from './services';
import { topicForTool } from '../engines/core/registry';
import { esc } from '../engines/core/util';
export function lessonNote(toolId: string, what: string, anim?: string) {
  const t = topicForTool(toolId);
  if (!t) return '';
  return `<div class="lnote hwa"${anim || ''}>${what} — докладно в уроці <a href="${runtimeServices.hrefTopic(t)}">«${esc(t.title)}»</a>.</div>`;
}
