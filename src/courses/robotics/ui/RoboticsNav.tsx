import type { DocumentNavigation } from '../../../components/document';
import type { Topic } from '../../../types';
import { roboticsSubject } from '../course';
import { CourseNavigation } from '../../../components/course-navigation';
import { Breadcrumbs } from '../../../components/breadcrumbs';
import { hrefHome } from '../../../navigation/routes';
import { roboticsHref } from '../shared/routes';

export function RoboticsBreadcrumbs({
  section,
  title,
}: {
  section: 'lessons' | 'tools';
  title?: string;
}) {
  return <Breadcrumbs parts={roboticsBreadcrumbParts(section, title)} />;
}

export function RoboticsNav({ section }: { section: 'lessons' | 'tools' }) {
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
  section: 'lessons' | 'tools',
  title?: string,
): DocumentNavigation['breadcrumbs'] {
  return [
    { text: 'Головна', href: hrefHome() },
    { text: roboticsSubject.name, href: roboticsHref() },
    {
      text: section === 'lessons' ? 'Заняття' : 'Інструменти',
      href: title ? roboticsHref(section) : undefined,
    },
    ...(title ? [{ text: title }] : []),
  ];
}

export function roboticsDocumentNavigation(topic: Topic): DocumentNavigation {
  const section = ['r8', 'r9'].includes(topic.id) ? 'tools' : 'lessons';
  return {
    breadcrumbs: roboticsBreadcrumbParts(section, topic.title),
    navigation: <RoboticsNav section={section} />,
  };
}
