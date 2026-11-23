import type { Topic } from '../../types';
import { hrefTopic } from '../../navigation/routes';

export type LessonView = 'classroom' | 'practice' | 'teacher' | 'student';
export function mediaLessonRoute(sub: string | null) {
  const robux = sub === 'robux' || !!sub?.startsWith('robux-');
  const mode = robux ? sub?.slice(6) : sub;
  const view: LessonView =
    mode === 'student' || mode === 'practice' || mode === 'teacher'
      ? mode
      : 'classroom';
  return { robux, view };
}
export function mediaLessonHref(
  topic: Topic,
  robux: boolean,
  view: LessonView,
) {
  return hrefTopic(
    topic,
    robux
      ? view === 'classroom'
        ? 'robux'
        : `robux-${view}`
      : view === 'classroom'
        ? null
        : view,
  );
}
export function studentLessonUrl(
  pageUrl: string,
  topic: Topic,
  robux: boolean,
) {
  const url = new URL(pageUrl);
  url.hash = mediaLessonHref(topic, robux, 'student');
  // Keep the actual document path (including file:// and GitHub Pages subpaths).
  url.search = '';
  return url.href;
}
