export function CourseNavigation({
  label,
  section,
  lessonsHref,
  toolsHref,
  className = '',
}: {
  label: string;
  section: 'lessons' | 'tools';
  lessonsHref: string;
  toolsHref: string;
  className?: string;
}) {
  return (
    <nav className={`course-navigation ${className}`.trim()} aria-label={label}>
      <a
        href={lessonsHref}
        aria-current={section === 'lessons' ? 'page' : undefined}
      >
        Заняття
      </a>
      <a
        href={toolsHref}
        aria-current={section === 'tools' ? 'page' : undefined}
      >
        Інструменти
      </a>
    </nav>
  );
}

export { CourseLinksProvider, useCourseLinks } from './links';
