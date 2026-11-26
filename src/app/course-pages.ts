import { createElement } from 'react';
import { CourseLinksProvider } from '../components/course-navigation';
import { courseLinks } from './navigation/links';
import type { CoursePageRenderer, CourseViewContext } from '../types';
import { roboticsSubject } from '../courses/robotics';
import { roboticsPage } from '../courses/robotics/ui';
import { mediaSubject } from '../courses/media-literacy';
import { mediaPage } from '../courses/media-literacy/ui';
const pages: Record<string, CoursePageRenderer> = {
  [roboticsSubject.id]: roboticsPage,
  [mediaSubject.id]: mediaPage,
};
export function coursePageFor(context: Omit<CourseViewContext, 'links'>) {
  const page = pages[context.topic.subject]?.({
    ...context,
    links: courseLinks,
  });
  return page
    ? {
        ...page,
        content: createElement(CourseLinksProvider, {
          links: courseLinks,
          children: page.content,
        }),
      }
    : null;
}
