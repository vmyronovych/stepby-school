import type { CoursePageRenderer } from '../../../runtime/course-view';
import { RoboticsPage } from './RoboticsPage';
export const roboticsPage: CoursePageRenderer = ({ topic, sub }) => {
  if (topic.kind !== 'robotics-lesson' && topic.kind !== 'course-navigation')
    return null;
  const lesson = topic.kind === 'robotics-lesson';
  return {
    content: <RoboticsPage key={topic.id} topic={topic} sub={sub} />,
    wide: true,
    hideHeader: lesson && sub === 'student',
    headerClassName: lesson ? 'robotics-topbar' : '',
    shellClassName: lesson ? 'robotics-lesson-wrap' : '',
  };
};
