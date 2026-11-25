import { metadata as lesson1 } from './lessons/lesson-01/metadata';
import { metadata as lesson2 } from './lessons/lesson-02/metadata';
import { metadata as lesson3 } from './lessons/lesson-03/metadata';
import { metadata as lesson4 } from './lessons/lesson-04/metadata';
import { metadata as lesson5 } from './lessons/lesson-05/metadata';
import { metadata as lesson6 } from './lessons/lesson-06/metadata';
import { metadata as lesson7 } from './lessons/lesson-07/metadata';
import { metadata as lesson8 } from './lessons/lesson-08/metadata';
import { metadata as lesson9 } from './lessons/lesson-09/metadata';
import { metadata as lesson10 } from './lessons/lesson-10/metadata';
import { metadata as lesson11 } from './lessons/lesson-11/metadata';
import { metadata as lesson12 } from './lessons/lesson-12/metadata';
import { metadata as lesson13 } from './lessons/lesson-13/metadata';
import { metadata as lesson14 } from './lessons/lesson-14/metadata';
import { metadata as lesson15 } from './lessons/lesson-15/metadata';
import { metadata as lesson16 } from './lessons/lesson-16/metadata';
import { metadata as lesson17 } from './lessons/lesson-17/metadata';
import { metadata as lesson18 } from './lessons/lesson-18/metadata';
import { metadata as lesson19 } from './lessons/lesson-19/metadata';
import { metadata as lesson20 } from './lessons/lesson-20/metadata';
import { metadata as lesson21 } from './lessons/lesson-21/metadata';
import { metadata as lesson22 } from './lessons/lesson-22/metadata';
import { metadata as lesson23 } from './lessons/lesson-23/metadata';
import { metadata as lesson24 } from './lessons/lesson-24/metadata';
import { metadata as lesson25 } from './lessons/lesson-25/metadata';
import { metadata as lesson26 } from './lessons/lesson-26/metadata';
import { metadata as lesson27 } from './lessons/lesson-27/metadata';
import { metadata as lesson28 } from './lessons/lesson-28/metadata';
import { metadata as lesson29 } from './lessons/lesson-29/metadata';
import { metadata as lesson30 } from './lessons/lesson-30/metadata';
import { metadata as lesson31 } from './lessons/lesson-31/metadata';
import { metadata as lesson32 } from './lessons/lesson-32/metadata';
import type { Topic, SchoolClass, Subject } from '../../types';

export const roboticsStages = [
  'Перші електричні кола',
  'Збираємо Мандрівника',
  'Навчаємо машинку рухатися',
  'Керуємо з телефона',
  'Машинка їде по лінії',
  'Готуємо показ і проводимо фестиваль',
];

export const roboticsLessons = [
  lesson1,
  lesson2,
  lesson3,
  lesson4,
  lesson5,
  lesson6,
  lesson7,
  lesson8,
  lesson9,
  lesson10,
  lesson11,
  lesson12,
  lesson13,
  lesson14,
  lesson15,
  lesson16,
  lesson17,
  lesson18,
  lesson19,
  lesson20,
  lesson21,
  lesson22,
  lesson23,
  lesson24,
  lesson25,
  lesson26,
  lesson27,
  lesson28,
  lesson29,
  lesson30,
  lesson31,
  lesson32,
];

export const roboticsTopics: Topic[] = [
  {
    id: 'lessons',
    cls: 'robo',
    subject: 'robot',
    title: 'Заняття',
    desc: '32 заняття з робототехніки',
    kind: 'course-navigation',
  },
  {
    id: 'tools',
    cls: 'robo',
    subject: 'robot',
    title: 'Інструменти',
    desc: 'Майстерні й довідники для практики',
    kind: 'course-navigation',
  },
  ...roboticsLessons.map((lesson) => ({
    id: lesson.id,
    cls: 'robo',
    subject: 'robot',
    title: `${lesson.number}. ${lesson.title}`,
    desc: lesson.description,
    kind: 'robotics-lesson',
    views: lesson.ready ? ['classroom', 'practice', 'teacher', 'student'] : [],
  })),
];

export const roboticsDocumentTopics: Topic[] = [
  // Preserved electronics materials and tools; new course navigation lives in roboticsTopics.
  {
    id: 'r3',
    cls: 'robo',
    subject: 'robot',
    doc: 'rules',
    icon: '🦺',
    title: 'Правила безпеки',
    desc: 'Шість правил гуртка з поясненням «навіщо», плакат на стіну й картка на парту. Що робить учитель, а не діти.',
  },
  {
    id: 'r5',
    cls: 'robo',
    subject: 'robot',
    doc: 'mod1',
    icon: '💡',
    title: 'Модуль 1 · заняття 1-5',
    desc: 'Електричне коло без мікроконтролера: перше коло, кнопка й Морзе, резистори, потенціометр і фоторезистор, проєкт «Нервовий дріт».',
  },
  {
    id: 'r8',
    cls: 'robo',
    subject: 'robot',
    doc: 'morse',
    icon: '📡',
    title: 'Азбука Морзе',
    desc: 'Як вона працює, звідки взялася, де використовується зараз, українські літери та друкована картка.',
  },
  {
    id: 'r9',
    cls: 'robo',
    subject: 'robot',
    doc: 'sim',
    icon: '⚡',
    title: 'Конструктор кола',
    desc: 'Збери коло на проєкторі й подивись, як біжать електрони: резистор змінює яскравість, без резистора світлодіод згорає, а коротке замикання псує батарейку.',
  },
];

export const roboticsClass: SchoolClass = {
  id: 'robo',
  name: 'Робототехніка',
  icon: '🤖',
  label: 'Робототехніка',
  courseSubject: 'robot',
  courseHome: 'lessons',
  note: 'Для 3–4 класів: від першого кола до власного Мандрівника на ESP32.',
};

export const roboticsSubject: Subject = {
  id: 'robot',
  name: 'Робототехніка',
  icon: '🤖',
  color: 'var(--green)',
  bg: 'var(--green-l)',
  active: true,
  cls: ['robo'],
};
