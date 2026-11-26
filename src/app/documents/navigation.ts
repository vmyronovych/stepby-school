import { createElement } from 'react';
import { CourseLinksProvider } from '../../components/course-navigation';
import { courseLinks } from '../navigation/links';
import type { DocumentNavigation } from '../../components/document';
import { roboticsSubject } from '../../courses/robotics';
import { roboticsDocumentNavigation } from '../../courses/robotics/ui';
import { informaticsSubject } from '../../courses/informatics';
import { informaticsDocumentNavigation } from '../../courses/informatics/ui';
import { hrefCourse, hrefHome } from '../navigation/routes';
import type { Subject, Topic, CourseLinks } from '../../types';

const courseNavigation: Record<
  string,
  (topic: Topic, links: CourseLinks) => DocumentNavigation
> = {
  [roboticsSubject.id]: roboticsDocumentNavigation,
  [informaticsSubject.id]: informaticsDocumentNavigation,
};

export function documentNavigationFor(
  topic: Topic,
  subject?: Subject,
): DocumentNavigation {
  const navigation = courseNavigation[topic.subject];
  if (navigation) {
    const result = navigation(topic, courseLinks);
    return {
      ...result,
      navigation: createElement(CourseLinksProvider, {
        links: courseLinks,
        children: result.navigation,
      }),
    };
  }
  return {
    breadcrumbs: [
      { text: 'Головна', href: hrefHome() },
      { text: subject?.name || 'Курс', href: hrefCourse(topic.subject) },
      { text: topic.title },
    ],
  };
}
