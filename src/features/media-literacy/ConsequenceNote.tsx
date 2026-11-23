import type { Consequence } from './consequences';

export function ConsequenceNote({
  consequence,
  teacher = false,
}: {
  consequence: Consequence;
  teacher?: boolean;
}) {
  return (
    <section className="media-consequence media-panel">
      <h4>Що може статися і чому?</h4>
      <p>
        <strong>Дія:</strong> {consequence.action}
      </p>
      <p>
        <strong>Що може бути далі:</strong> {consequence.possible}
      </p>
      <p>
        <strong>Що допоможе:</strong> {consequence.next}
      </p>
      <p className="media-muted">Так може статися, але не обов’язково.</p>
      {teacher && (
        <p>
          <strong>Перевірте розуміння:</strong> «Що може змінитися для героя
          після цієї дії? Як саме? Що в історії вже сталося, а що ми лише
          уявили?» Прийміть один конкретний наслідок із поясненням зв’язку. На
          «станеться щось погане» попросіть уточнити; на «це точно станеться»
          нагадайте слово «може». Після обговорення поверніться до доступної
          героєві дії. Де доречно, запитайте: «Кому ще доведеться змінити свої
          плани? Що може відчути ця людина?» Обговорюйте героїв історії, не
          вимагайте особистих розповідей дітей. Не використовуйте любов до
          батьків як тиск і не називайте звернення по допомогу тягарем для
          дорослого.
        </p>
      )}
    </section>
  );
}
