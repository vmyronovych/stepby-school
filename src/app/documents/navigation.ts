import type { DocumentNavigation } from '../../components/document';
import { roboticsSubject } from '../../courses/robotics';
import { roboticsDocumentNavigation } from '../../courses/robotics/ui';
import { informaticsSubject } from '../../courses/informatics';
import { informaticsDocumentNavigation } from '../../courses/informatics/ui';
import { hrefCourse, hrefHome } from '../../navigation/routes';
import type { Subject, Topic } from '../../types';

const courseNavigation: Record<string, (topic: Topic) => DocumentNavigation> = {
  [roboticsSubject.id]: roboticsDocumentNavigation,
  [informaticsSubject.id]: informaticsDocumentNavigation,
};

export function documentNavigationFor(
  topic: Topic,
  subject?: Subject,
): DocumentNavigation {
  const navigation = courseNavigation[topic.subject];
  if (navigation) return navigation(topic);
  return {
    breadcrumbs: [
      { text: 'Головна', href: hrefHome() },
      { text: subject?.name || 'Курс', href: hrefCourse(topic.subject) },
      { text: topic.title },
    ],
  };
}
