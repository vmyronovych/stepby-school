import type { Topic } from '../../../types';
import { LinkButton } from '../../../components/ui';

export function LessonTasks({
  topic,
  scalar = false,
  hrefForTask,
}: {
  topic: Topic;
  scalar?: boolean;
  hrefForTask: (id: string) => string;
}) {
  const tasks = topic.tasks ?? [];
  return (
    <section
      className={scalar ? 'sp-practice' : 'vs-practice'}
      aria-labelledby={scalar ? 'sp-practice-title' : 'vs-practice-title'}
    >
      <h2 id={scalar ? 'sp-practice-title' : 'vs-practice-title'}>
        {scalar
          ? 'Розв’яжи задачі крок за кроком'
          : 'Розв’яжи приклади крок за кроком'}
      </h2>
      <p>
        {scalar
          ? 'Відкрий першу задачу. Натискай «Далі», щоб дописувати розв’язання в зошиті. Після відповіді переходь до наступної задачі.'
          : 'Відкрий перший приклад. Натискай «Далі», щоб дописувати розв’язання в зошиті. Після відповіді переходь до наступного прикладу.'}
      </p>
      <div className="grid c2">
        {tasks.map((task, index) => (
          <article className="card" key={task.id}>
            <span className="pill">
              {scalar ? 'Задача' : 'Приклад'} {index + 1} із {tasks.length}
            </span>
            <h3>{task.title}</h3>
            <LinkButton small href={hrefForTask(task.id)}>
              {index === 0 ? 'Почати розв’язання' : 'Розв’язати крок за кроком'}{' '}
              →
            </LinkButton>
          </article>
        ))}
      </div>
    </section>
  );
}
