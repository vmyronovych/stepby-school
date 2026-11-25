import type { Topic } from '../../../../types';
export const lesson: Topic = {
  id: 't2',
  cls: '5a',
  subject: 'math',
  title: 'Ділення багатоцифрових чисел',
  desc: 'Ділення в стовпчик (куточком), ділення з остачею.',
  tasks: [
    {
      id: 'k3',
      tool: 'div',
      title: 'Виконай ділення 7256 : 8',
      cfg: { n: 7256, d: 8 },
      done: false,
    },
    {
      id: 'k4',
      tool: 'div',
      title: 'Виконай ділення 9450 : 15',
      cfg: { n: 9450, d: 15 },
      done: false,
    },
  ],
  grades: [5],
};
