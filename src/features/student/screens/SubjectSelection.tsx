import type { SchoolClass, Subject } from '../../../types';
import { PageHeading } from '../../../components/ui';
import { StudentBreadcrumbs } from '../components/StudentBreadcrumbs';
import { SubjectCard } from '../components/SubjectCard';

export function SubjectSelection({
  schoolClass,
  subjects,
}: {
  schoolClass: SchoolClass;
  subjects: Subject[];
}) {
  const soon = subjects
    .filter((subject) => !subject.active)
    .map((subject) => subject.name.toLowerCase());
  return (
    <>
      <StudentBreadcrumbs schoolClass={schoolClass} />
      <PageHeading
        title={`Предмети — ${clsTitle(schoolClass)}`}
        description={`Оберіть предмет.${soon.length ? ' У розробці: ' + soon.join(', ') + '.' : ''}`}
      />
      <div className="grid c3">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            classId={schoolClass.id}
            subject={subject}
          />
        ))}
      </div>
    </>
  );
}
