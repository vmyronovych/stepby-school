import type { Catalog } from '../../../types';
import { Card } from '../../../components/card';
import { Icon } from '../../../components/icon';
import { PageHeading } from '../../../components/page-heading';
import { hrefCourse } from '../../../navigation/routes';
export function CourseSelection({ catalog }: { catalog: Catalog }) {
  const subjects = catalog.subjects.filter((subject) =>
    catalog.topics.some((topic) => topic.subject === subject.id),
  );
  return (
    <>
      <PageHeading
        title="Оберіть курс"
        description="Заняття з математики, технологій та інших предметів — крок за кроком."
      />
      <div className="grid c3">
        {subjects.map((subject) => (
          <Card key={subject.id} href={hrefCourse(subject.id)}>
            <Icon background={subject.bg}>{subject.icon}</Icon>
            <h2>{subject.name}</h2>
            <p className="d">
              {subject.description ||
                'Відкрийте заняття та навчальні матеріали курсу.'}
            </p>
          </Card>
        ))}
      </div>
    </>
  );
}
