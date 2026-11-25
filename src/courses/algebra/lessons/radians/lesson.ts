import type { Topic } from '../../../../types';
import { radianExamples } from './examples';
export const lesson: Topic = {
  id: 'radian',
  cls: '10a',
  subject: 'algebra',
  icon: '📐',
  title: '8. Радіанна міра кутів',
  desc: 'Що таке радіан, як переводити градуси в радіани та як обчислювати тригонометричні вирази.',
  chips: ['Пояснення', '10 задач у зошиті', 'Точні значення'],
  tasks: radianExamples.map(({ title, index }) => ({
    id: `radian-${index + 1}`,
    tool: 'radian',
    title,
    cfg: { example: index },
    done: false,
  })),
  grades: [10],
  aliases: [{ cls: '10a', subject: 'math', id: 'radian' }],
};
