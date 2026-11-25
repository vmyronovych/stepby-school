import type {
  CoursePageRenderer,
  CourseViewContext,
} from '../runtime/course-view';
import { roboticsSubject } from '../courses/robotics';
import { roboticsPage } from '../courses/robotics/ui';
import { mediaSubject } from '../courses/media-literacy';
import { mediaPage } from '../courses/media-literacy/ui';
const pages: Record<string, CoursePageRenderer> = {
  [roboticsSubject.id]: roboticsPage,
  [mediaSubject.id]: mediaPage,
};
export function coursePageFor(context: CourseViewContext) {
  return pages[context.topic.subject]?.(context) ?? null;
}
