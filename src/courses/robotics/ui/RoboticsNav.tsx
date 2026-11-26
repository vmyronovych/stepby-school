import type { DocumentNavigation } from '../../../components/document';
import type { Topic, CourseLinks } from '../../../types';
import { roboticsSubject } from '../course';
import { CourseNavigation } from '../../../components/course-navigation';
import { Breadcrumbs } from '../../../components/breadcrumbs';
import { useCourseLinks } from '../../../components/course-navigation';
import { useRoboticsHref } from '../shared/ui/useRoboticsHref';
import { roboticsHref } from '../shared/routes';

export function RoboticsBreadcrumbs({
  section,
  title,
}: {
  section: 'lessons' | 'tools';
  title?: string;
}) {
  const links = useCourseLinks();
  return <Breadcrumbs parts={roboticsBreadcrumbParts(links, section, title)} />;
}

export function RoboticsNav({ section }: { section: 'lessons' | 'tools' }) {
  const roboticsHref = useRoboticsHref();
  return (
    <CourseNavigation
      className="robotics-nav"
      label="Розділи робототехніки"
      section={section}
      lessonsHref={roboticsHref()}
      toolsHref={roboticsHref('tools')}
    />
  );
}

function roboticsBreadcrumbParts(
  links: CourseLinks,
  section: 'lessons' | 'tools',
  title?: string,
): DocumentNavigation['breadcrumbs'] {
  return [
    { text: 'Головна', href: links.hrefHome() },
    { text: roboticsSubject.name, href: roboticsHref(links) },
    {
      text: section === 'lessons' ? 'Заняття' : 'Інструменти',
      href: title ? roboticsHref(links, section) : undefined,
    },
    ...(title ? [{ text: title }] : []),
  ];
}

export function roboticsDocumentNavigation(
  topic: Topic,
  links: CourseLinks,
): DocumentNavigation {
  const section = ['r8', 'r9'].includes(topic.id) ? 'tools' : 'lessons';
  return {
    breadcrumbs: roboticsBreadcrumbParts(links, section, topic.title),
    navigation: <RoboticsNav section={section} />,
  };
}
