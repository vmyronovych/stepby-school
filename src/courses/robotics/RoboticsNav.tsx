import { Breadcrumbs } from '../../components/ui';
import { hrefHome } from '../../navigation/routes';
import { roboticsHref } from './routes';

export function RoboticsBreadcrumbs({
  section,
  title,
}: {
  section: 'lessons' | 'tools';
  title?: string;
}) {
  return (
    <Breadcrumbs
      parts={[
        { text: 'Головна', href: hrefHome() },
        { text: 'Робототехніка', href: roboticsHref() },
        {
          text: section === 'lessons' ? 'Заняття' : 'Інструменти',
          href: title ? roboticsHref(section) : undefined,
        },
        ...(title ? [{ text: title }] : []),
      ]}
    />
  );
}

export function RoboticsNav({ section }: { section: 'lessons' | 'tools' }) {
  return (
    <nav className="robotics-nav" aria-label="Розділи робототехніки">
      <a
        href={roboticsHref()}
        aria-current={section === 'lessons' ? 'page' : undefined}
      >
        Заняття
      </a>
      <a
        href={roboticsHref('tools')}
        aria-current={section === 'tools' ? 'page' : undefined}
      >
        Інструменти
      </a>
    </nav>
  );
}
