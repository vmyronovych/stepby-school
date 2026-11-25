import { hrefHome, hrefCourse } from '../../../navigation/routes';
import type { Subject, Topic } from '../../../types';
import { Breadcrumbs } from '../../../components/breadcrumbs';
export function CatalogBreadcrumbs({
  subject,
  topic,
}: {
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
