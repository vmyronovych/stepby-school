import type { Topic } from '../../../../types';
export const lesson: Topic = {
  id: 't7',
  cls: '6a',
  subject: 'math',
  title: 'Дільники і кратні числа',
  desc: 'Чим дільник відрізняється від кратного, зв’язок між ними.',
  tasks: [
    {
      id: 'k12',
      tool: 'dvk',
      title: 'Порівняй дільники і кратні числа 12',
      cfg: { n: 12 },
      done: false,
    },
    {
      id: 'k13',
      tool: 'dvk',
      title: 'Порівняй дільники і кратні числа 7',
      cfg: { n: 7 },
      done: false,
    },
  ],
  grades: [6],
};
