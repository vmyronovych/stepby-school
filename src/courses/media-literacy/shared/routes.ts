import type { Topic, CourseLinks } from '../../../types';

const publicCourseBaseUrl = 'https://vmyronovych.github.io/stepby-school/';

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
  links: CourseLinks,
  topic: Topic,
  robux: boolean,
  view: LessonView,
) {
  return links.hrefTopic(
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
  links: CourseLinks,
  pageUrl: string,
  topic: Topic,
  robux: boolean,
) {
  const current = new URL(pageUrl);
  const local =
    current.protocol === 'file:' ||
    ['localhost', '127.0.0.1', '[::1]'].includes(current.hostname);
  const url = local ? current : new URL(publicCourseBaseUrl);
  url.hash = mediaLessonHref(links, topic, robux, 'student');
  // Local tests keep their document; published QR links use the agreed site base.
  url.search = '';
  return url.href;
}
