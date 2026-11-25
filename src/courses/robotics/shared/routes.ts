import { hrefTopic } from '../../../navigation/routes';

export type RoboticsView = 'classroom' | 'practice' | 'teacher' | 'student';
export const mcarUrl = 'https://vmyronovych.github.io/stepby-robotics/';
export function roboticsHref(id = 'lessons', view?: RoboticsView) {
  return hrefTopic(
    { cls: 'robo', subject: 'robot', id },
    view === 'classroom' ? null : view,
  );
}
export function roboticsView(sub: string | null): RoboticsView {
  return sub === 'practice' || sub === 'teacher' || sub === 'student'
    ? sub
    : 'classroom';
}
