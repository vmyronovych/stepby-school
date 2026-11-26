import type { DocumentNavigation } from '../../../components/document';
import { CourseNavigation } from '../../../components/course-navigation';
import type { Topic, CourseLinks } from '../../../types';
import { informaticsSubject } from '../course';

export function informaticsDocumentNavigation(
  topic: Topic,
  { hrefHome, hrefCourse }: CourseLinks,
): DocumentNavigation {
  const section = topic.kind === 'tool' ? 'tools' : 'lessons';
  return {
    breadcrumbs: [
      { text: 'Головна', href: hrefHome() },
      {
        text: informaticsSubject.name,
        href: hrefCourse(informaticsSubject.id),
      },
      {
        text: section === 'tools' ? 'Інструменти' : 'Заняття',
        href: hrefCourse(informaticsSubject.id, section),
      },
      { text: topic.title },
    ],
    navigation: (
      <CourseNavigation
        label={`Розділи курсу «${informaticsSubject.name}»`}
        section={section}
        lessonsHref={hrefCourse(informaticsSubject.id)}
        toolsHref={hrefCourse(informaticsSubject.id, 'tools')}
      />
    ),
  };
}
