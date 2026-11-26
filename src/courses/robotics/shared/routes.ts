import type { CourseLinks } from '../../../types';

export type RoboticsView = 'classroom' | 'practice' | 'teacher' | 'student';
export const mcarUrl = 'https://vmyronovych.github.io/stepby-robotics/';
export function roboticsHref(
  links: CourseLinks,
  id = 'lessons',
  view?: RoboticsView,
) {
  return links.hrefTopic(
    { cls: 'robo', subject: 'robot', id },
    view === 'classroom' ? null : view,
  );
}
export function roboticsView(sub: string | null): RoboticsView {
  return sub === 'practice' || sub === 'teacher' || sub === 'student'
    ? sub
    : 'classroom';
}
