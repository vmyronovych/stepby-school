import { clsTitle } from '../../../navigation/labels';
import { hrefCls } from '../../../navigation/routes';
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
      {schoolClass.cover && (
        <img
          className="course-card-cover"
          src={schoolClass.cover}
          alt=""
          loading="lazy"
          width="1536"
          height="1024"
        />
      )}
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
        {topicCount}{' '}
        {schoolClass.id === 'robo'
          ? 'заняття'
          : schoolClass.courseSubject
            ? topicCount % 10 >= 2 &&
              topicCount % 10 <= 4 &&
              (topicCount % 100 < 12 || topicCount % 100 > 14)
              ? 'розділи курсу'
              : 'розділів курсу'
            : schoolClass.label
              ? 'розділів курсу'
              : 'навчальних тем'}
      </p>
    </Card>
  );
}
