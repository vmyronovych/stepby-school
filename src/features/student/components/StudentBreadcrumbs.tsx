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
    {
      text: schoolClass.courseSubject ? 'Класи та курси' : 'Класи',
      href: hrefHome(),
    },
    {
      text: clsCrumb(schoolClass),
      href: schoolClass.courseSubject
        ? topic
          ? hrefSubj(schoolClass.id, schoolClass.courseSubject)
          : undefined
        : subject
          ? hrefCls(schoolClass.id)
          : undefined,
    },
  ];
  if (subject && !schoolClass.courseSubject)
    parts.push({
      text: subject.name,
      href: topic ? hrefSubj(schoolClass.id, subject.id) : undefined,
    });
  if (topic) parts.push({ text: topic.title, href: undefined });
  return <Breadcrumbs parts={parts} />;
}
