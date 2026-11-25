import type { RoboticsLessonContent } from './types';
type ProgramLesson = Omit<
  RoboticsLessonContent,
  'first' | 'second' | 'safety' | 'materials' | 'figure'
> &
  Partial<
    Pick<
      RoboticsLessonContent,
      'first' | 'second' | 'safety' | 'materials' | 'figure'
    >
  > & { preview: string };
export function programLesson(spec: ProgramLesson): RoboticsLessonContent {
  const { preview, ...content } = spec;
  return {
    figure: 'four-motors',
    materials: [
      spec.number < 11
        ? 'ESP32 у платі розширення, один підготовлений HW-627 на mini breadboard та один позначений мотор.'
        : 'Свій Мандрівник з ESP32 у платі розширення, два підготовлені HW-627 на двох mini breadboard, чотири позначені мотори.',
      'Підставка, USB-кабель даних, шкільний комп’ютер і папка проєктів пари.',
      ...((spec.number >= 17 && spec.number <= 21) || spec.number >= 31
        ? [
            'Власний телефон учасника пари з перевіреним підключенням до Wi-Fi своєї ESP32.',
          ]
        : []),
      ...(spec.number >= 22
        ? [
            'Підготовлений датчик QTR-MD-05A та світлі й темні поверхні для перевірки його каналів.',
          ]
        : []),
    ],
    safety:
      spec.number === 17 || (spec.number >= 22 && spec.number <= 24)
        ? 'Моторне живлення протягом усього заняття вимкнене. Контролер під’єднаний через USB для завантаження програми й читання консолі. Перед змінами проводки від’єднуємо USB та батарейне живлення; підключення перевіряє вчитель.'
        : 'Першу пробу та перевірку напрямків робимо з піднятими колесами. Проводку змінюємо лише без обох джерел живлення. Перед прошиванням моторне живлення вимкнене. Вільний заїзд — лише після перевірки вчителем, на відгородженій ділянці, без USB-кабелю до комп’ютера; живлення контролера готує дорослий.',
    first: [
      `Перевірте кожного: ${spec.recall} Не переходьте далі, якщо відповідь є лише в одного учасника.`,
      `Покажіть: ${spec.slides[0].text} Запитайте: ${spec.slides[0].question} Пояснення відкрийте після прогнозів.`,
      spec.practice[0].text,
      preview,
    ],
    second: [
      `Пари виконують «${spec.practice[1].title}». ${spec.practice[1].text} Підходьте спочатку до пар, що не пройшли вхідну перевірку.`,
      spec.practice[2].text,
      `Після зміни ролей повторіть перевірку «${spec.practice[2].title}». Кожен пояснює спостереження. Якщо результат не відповідає очікуванню, знайдіть одну причину й повторіть спробу. Критерій: ${spec.practice[2].check}`,
      `${spec.practice[3].text} Запитайте окремо: «${spec.exit[0]}» та «${spec.exit[1]}».`,
    ],
    firstTitles: [
      'Пригадуємо',
      'Спільний показ',
      spec.practice[0].title,
      'Передбачаємо результат',
    ],
    secondTitles: [
      spec.practice[1].title,
      spec.practice[2].title,
      'Повторна перевірка',
      spec.practice[3].title,
    ],
    ...content,
  };
}
