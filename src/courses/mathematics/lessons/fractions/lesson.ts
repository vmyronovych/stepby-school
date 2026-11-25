import type { Topic } from '../../../../types';
export const lesson: Topic = {
  id: 't3',
  cls: '5a',
  subject: 'math',
  title: 'Додавання і віднімання звичайних дробів',
  desc: 'Додавання і віднімання дробів, зведення до спільного знаменника, скорочення.',
  tasks: [
    {
      id: 'k5',
      tool: 'frac',
      title: 'Обчисли 1/4 + 1/6',
      cfg: { a: 1, b: 4, op: '+', c: 1, d: 6 },
      done: false,
    },
    {
      id: 'k6',
      tool: 'frac',
      title: 'Обчисли 5/6 − 1/4',
      cfg: { a: 5, b: 6, op: '-', c: 1, d: 4 },
      done: false,
    },
    {
      id: 'k9',
      tool: 'frac',
      title: 'Обчисли 7/10 + 2/15',
      cfg: { a: 7, b: 10, op: '+', c: 2, d: 15 },
      done: false,
    },
  ],
  grades: [5, 6],
  aliases: [{ cls: '6a', subject: 'math', id: 't5' }],
};
