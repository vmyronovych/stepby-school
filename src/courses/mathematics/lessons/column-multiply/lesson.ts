import type { Topic } from '../../../../types';
export const lesson: Topic = {
  id: 't1',
  cls: '5a',
  subject: 'math',
  title: 'Множення багатоцифрових чисел',
  desc: 'Множення в стовпчик, властивості множення, задачі.',
  tasks: [
    {
      id: 'k1',
      tool: 'mult',
      title: 'Обчисли 284 × 36',
      cfg: { a: 284, b: 36 },
      done: true,
    },
    {
      id: 'k2',
      tool: 'mult',
      title: 'Обчисли 507 × 48',
      cfg: { a: 507, b: 48 },
      done: false,
    },
  ],
  grades: [5],
};
