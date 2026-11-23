import type { SchoolClass, Topic } from '../../../types';
import { PageHeading } from '../../../components/ui';
import { ClassCard } from '../components/ClassCard';

export function ClassSelection({
  classes,
  topics,
}: {
  classes: SchoolClass[];
  topics: Topic[];
}) {
  return (
    <>
      <PageHeading
        title="Оберіть клас або курс"
        description="Шкільні предмети, окремі курси й інтерактивні інструменти для навчання крок за кроком."
      />
      <div className="grid c3">
        {classes.map((schoolClass) => (
          <ClassCard
            key={schoolClass.id}
            schoolClass={schoolClass}
            topicCount={
              topics.filter((topic) => topic.cls === schoolClass.id).length
            }
          />
        ))}
      </div>
    </>
  );
}
