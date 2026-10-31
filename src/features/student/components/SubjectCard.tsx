import type { Subject } from '../../../types';
import { Card, Icon } from '../../../components/ui';

export function SubjectCard({
  classId,
  subject,
}: {
  classId: string;
  subject: Subject;
}) {
  return (
    <Card
      href={subject.active ? hrefSubj(classId, subject.id) : undefined}
      style={subject.active ? undefined : { opacity: 0.55 }}
    >
      <Icon background={subject.bg}>{subject.icon}</Icon>
      <h3>{subject.name}</h3>
      <p className="d">
        {subject.active
          ? 'Доступні теми та інтерактивні інструменти'
          : 'Скоро з’явиться'}
      </p>
      {subject.active && (
        <div className="tag-row">
          <span className="pill">Активний</span>
        </div>
      )}
    </Card>
  );
}
