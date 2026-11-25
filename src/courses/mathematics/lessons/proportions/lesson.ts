import type { Topic } from '../../../../types';
export const lesson: Topic = {
  id: 't6',
  cls: '6a',
  subject: 'math',
  title: 'Пропорції',
  desc: 'Основна властивість пропорції, зведення навхрест до лінійного рівняння.',
  tasks: [
    {
      id: 'k10',
      tool: 'prop',
      title: 'Знайди x: x : 3 = 4 : 6',
      cfg: { a: 'x', b: '3', c: '4', d: '6' },
      done: false,
    },
    {
      id: 'k11',
      tool: 'prop',
      title: 'Знайди x: 2x : 5 = 6 : 15',
      cfg: { a: '2x', b: '5', c: '6', d: '15' },
      done: false,
    },
  ],
  grades: [6],
};
