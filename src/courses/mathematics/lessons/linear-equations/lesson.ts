import type { Topic } from '../../../../types';
export const lesson: Topic = {
  id: 't4',
  cls: '6a',
  subject: 'math',
  title: 'Розв’язування рівнянь',
  desc: 'Лінійні рівняння, перенесення доданків, зведення подібних.',
  tasks: [
    {
      id: 'k7',
      tool: 'eq',
      title: 'Розв’яжи 3x + 5 = 20',
      cfg: { text: '3x + 5 = 20' },
      done: false,
    },
    {
      id: 'k8',
      tool: 'eq',
      title: 'Розв’яжи 5x - 4 = 2x + 11',
      cfg: { text: '5x - 4 = 2x + 11' },
      done: false,
    },
  ],
  grades: [6],
};
