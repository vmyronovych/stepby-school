export interface TeacherNotes {
  say: string;
  answers: string[];
  practice: string;
  mistake: string;
  response: string;
}

export function TeacherGuidance({
  notes,
  questions,
}: {
  notes: TeacherNotes;
  questions?: string[];
}) {
  return (
    <div className="media-teacher-guidance">
      <p>
        <strong>Скажіть дітям:</strong> «{notes.say}»
      </p>
      <dl className="media-answer-key">
        {notes.answers.map((answer, index) => (
          <div key={answer}>
            <dt>{questions?.[index] ?? 'Очікувана відповідь і пояснення'}</dt>
            <dd>{answer}</dd>
          </div>
        ))}
      </dl>
      <p>
        <strong>Зразок виконання:</strong> {notes.practice}
      </p>
      <p>
        <strong>Можлива помилка:</strong> «{notes.mistake}»
      </p>
      <p>
        <strong>Як пояснити:</strong> «{notes.response}»
      </p>
    </div>
  );
}
