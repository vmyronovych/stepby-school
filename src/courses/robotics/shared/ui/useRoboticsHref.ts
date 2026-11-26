import { useCourseLinks } from '../../../../components/course-navigation';
import { roboticsHref, type RoboticsView } from '../routes';
export function useRoboticsHref() {
  const links = useCourseLinks();
  return (id = 'lessons', view?: RoboticsView) => roboticsHref(links, id, view);
}
