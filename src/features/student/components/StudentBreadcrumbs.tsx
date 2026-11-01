import { clsCrumb } from '../../../navigation/labels';
import { hrefHome, hrefCls, hrefSubj } from '../../../navigation/routes';
import type { SchoolClass, Subject, Topic } from '../../../types';
import { Breadcrumbs } from '../../../components/ui';

interface StudentBreadcrumbsProps {
  schoolClass: SchoolClass;
  subject?: Subject;
  topic?: Topic;
}

export function StudentBreadcrumbs({
  schoolClass,
  subject,
  topic,
}: StudentBreadcrumbsProps) {
  const parts = [
    { text: 'Класи', href: hrefHome() },
    {
      text: clsCrumb(schoolClass),
      href: subject ? hrefCls(schoolClass.id) : undefined,
    },
  ];
  if (subject)
    parts.push({
      text: subject.name,
      href: topic ? hrefSubj(schoolClass.id, subject.id) : undefined,
    });
  if (topic) parts.push({ text: topic.title, href: undefined });
  return <Breadcrumbs parts={parts} />;
}
