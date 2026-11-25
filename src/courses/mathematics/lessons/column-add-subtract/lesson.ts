import type { Topic } from '../../../../types';
export const lesson: Topic = {
  id: 't11',
  cls: '5a',
  subject: 'math',
  title: 'Додавання і віднімання багатоцифрових чисел',
  desc: 'Додавання й віднімання в стовпчик: число «в умі», позичання в сусіднього розряду.',
  tasks: [
    {
      id: 'k28',
      tool: 'add',
      title: 'Обчисли 4786 + 2539',
      cfg: { a: 4786, b: 2539 },
      done: false,
    },
    {
      id: 'k29',
      tool: 'add',
      title: 'Обчисли 38 057 + 9468',
      cfg: { a: 38057, b: 9468 },
      done: false,
    },
    {
      id: 'k30',
      tool: 'sub',
      title: 'Обчисли 5003 − 1748',
      cfg: { a: 5003, b: 1748 },
      done: false,
    },
    {
      id: 'k31',
      tool: 'sub',
      title: 'Обчисли 7240 − 3586',
      cfg: { a: 7240, b: 3586 },
      done: false,
    },
  ],
  grades: [5],
};
