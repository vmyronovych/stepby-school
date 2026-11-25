import { hrefHome, hrefCourse } from '../../../navigation/routes';
import type { SchoolClass, Subject, Topic } from '../../../types';
import { Breadcrumbs } from '../../../components/breadcrumbs';
export function StudentBreadcrumbs({
  subject,
  topic,
}: {
  schoolClass?: SchoolClass;
  subject?: Subject;
  topic?: Topic;
}) {
  return (
    <Breadcrumbs
      parts={[
        { text: 'Головна', href: hrefHome() },
        ...(subject
          ? [
              {
                text: subject.name,
                href: topic ? hrefCourse(subject.id) : undefined,
              },
            ]
          : []),
        ...(topic ? [{ text: topic.title }] : []),
      ]}
    />
  );
}
