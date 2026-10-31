import type { SchoolClass } from '../../../types';
import { Card, Icon } from '../../../components/ui';

export function ClassCard({
  schoolClass,
  topicCount,
}: {
  schoolClass: SchoolClass;
  topicCount: number;
}) {
  return (
    <Card href={hrefCls(schoolClass.id)}>
      <Icon
        background={schoolClass.label ? 'var(--green-l)' : 'var(--primary-l)'}
      >
        {schoolClass.icon || '🏫'}
      </Icon>
      <h3>{clsTitle(schoolClass)}</h3>
      <p className="d">
        {schoolClass.note && (
          <>
            {schoolClass.note}
            <br />
          </>
        )}
        {topicCount} {schoolClass.label ? 'розділів курсу' : 'навчальних тем'}
      </p>
    </Card>
  );
}
