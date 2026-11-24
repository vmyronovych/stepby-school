import { CourseSources } from './CourseSources';
import { PracticeTeacherGuide } from './PracticeTeacherGuide';
import type { MediaContent } from './content';
import { journeys } from './stories';
import { TeacherGuidance } from './TeacherGuidance';
import { ConsequenceNote } from './ConsequenceNote';
import { topicConsequences } from './consequences';
import { generalStageNotes, topicTeacherNotes } from './topic-teacher';
export function TopicTeacherPlan({ content }: { content: MediaContent }) {
  const journey = journeys[content.id];
  return (
    <article className="media-teacher-view media-teacher-plan">
      <section className="media-panel">
        <h2>План заняття · 45 хвилин</h2>
        <p>{content.introduction}</p>
        <h3>Очікувані результати</h3>
        <ul>
          {content.outcomes.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
        <h3>Матеріали</h3>
        <p>
          Проєктор або роздруковані діалоги; аркуші й олівці; один пристрій на
          учня або пару для короткої практики. Усі імена й повідомлення
          вигадані. Реальні чати дітей не відкриваємо.
        </p>
        <p>
          <strong>Як користуватися:</strong> заздалегідь прочитайте ключі до
          чотирьох історій. Дітям показуйте учнівську вкладку, залишаючи
          відповіді для себе. Репліки — зразки для короткого пояснення, а не
          додатковий текст для суцільного читання класу. Для роботи без
          пристроїв підготуйте діалоги й запитання без ключів.
        </p>
        <ol className="media-timeline">
          {[
            [
              '00–03',
              'Організація',
              'Поясніть мету й домовтеся: помилятися можна, власні дані та приватні випадки перед класом не обговорюємо.',
            ],
            [
              '03–10',
              'Знайомство з історією',
              journey.opening +
                ' Прочитайте перший діалог уголос. Запитайте про почуття героя.',
            ],
            [
              '10–20',
              'Спільний розбір',
              'Обговоріть перші дві ситуації за підготовленими діалогами. Вислухайте різні припущення, лише потім відкрийте пояснення. Відділяйте видиме в повідомленні від здогадів.',
            ],
            [
              '20–28',
              'Робота в парах без екрана',
              'Використайте завдання «Спробуйте в парі» з третьої та четвертої історій. Розподіліть картки між групами; попросіть коротко пояснити рішення.',
            ],
            [
              '28–30',
              'Гімнастика для очей',
              'Проведіть звичну двохвилинну вправу й підготуйте учнів до практики.',
            ],
            [
              '30–42',
              'Самостійна практика · 12 хв',
              'Учні розв’язують чотири нові ситуації у «Практиці учня»: обирають дію та причину. За потреби читайте вголос. Приклади з показу не є самостійною перевіркою. Ключі нових завдань наведено нижче.',
            ],
            [
              '42–45',
              'Рефлексія',
              'Запитайте: що навчилися помічати, яке запитання поставлять наступного разу, до кого звернуться? Відзначте конкретні рішення словами. Домашнього завдання немає.',
            ],
          ].map(([time, title, detail], index) => (
            <li key={time}>
              <time>{time}</time>
              <div>
                <h4>{title}</h4>
                <p>{detail}</p>
                <p>
                  <strong>Як провести й пояснити:</strong>{' '}
                  {generalStageNotes[index]}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className="media-panel">
        <h3>Вікова адаптація</h3>
        <p>{content.teacher}</p>
        <p>
          У 1–2 класах учитель читає діалоги, діти обирають із двох відповідей
          та обговорюють усно. У 3–4 класах порівнюють повідомлення й самі
          пояснюють свої рішення. Не всі діти повинні встигнути написати
          відповідь: усна рівноцінна.
        </p>
      </section>
      <PracticeTeacherGuide topicId={content.id} />
      <section className="media-panel">
        <h3>Показ у класі: картки й орієнтири для обговорення</h3>
        {journey.scenes.map((s, index) => (
          <section className="media-teacher-card" key={s.title}>
            <h4>
              {index + 1}. {s.title}
            </h4>
            <p>{s.lead}</p>
            <p>
              {s.chat.messages.map((m) => `${m.author}: ${m.text}`).join(' ')}
            </p>
            <p>
              <strong>Запитання:</strong> {s.question}
            </p>
            <p>
              <strong>Орієнтир:</strong> {s.takeaway}
            </p>
            {s.choices.map((choice) => (
              <p key={choice.text}>
                <strong>
                  {choice.safe
                    ? 'Правильний вибір'
                    : 'Чому інший варіант не підходить'}
                  :
                </strong>{' '}
                {choice.text} — {choice.explanation}
              </p>
            ))}
            <TeacherGuidance
              notes={topicTeacherNotes[content.id][index]}
              questions={s.discuss}
            />
            <ConsequenceNote
              consequence={topicConsequences[content.id][index]}
              teacher
            />
            <p>
              <strong>Практика:</strong> {s.activity}
            </p>
          </section>
        ))}
      </section>
      <section className="media-panel">
        <h3>Як підтримати дитину</h3>
        <p>
          Якщо історія нагадала справжню подію, скажіть: «Дякую, що розповів. Не
          потрібно показувати приватні повідомлення всім. Можемо поговорити
          окремо й знайти допомогу». Не вимагайте особистої історії як доказу
          розуміння. Якщо перший дорослий недоступний або не допоміг, можна
          звернутися до іншого.
        </p>
        <p>
          На «я вже так помилявся» відповідайте: «Тепер ти знаєш ще одну корисну
          дію. Давай потренуємо її на вигаданому герої». Уточнюйте наслідки без
          залякування та не обіцяйте гарантовано повернути доступ чи видалити
          всі копії.
        </p>
      </section>
      <CourseSources />
    </article>
  );
}
