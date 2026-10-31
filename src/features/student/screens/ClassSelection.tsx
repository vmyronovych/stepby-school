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
        title="Оберіть клас 👋"
        description="Оберіть клас, щоб перейти до предметів і покрокових інтерактивних інструментів."
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
