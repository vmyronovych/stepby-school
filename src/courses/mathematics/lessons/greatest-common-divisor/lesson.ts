import type { Topic } from '../../../../types';
export const lesson: Topic = {
  id: 't12',
  cls: '6a',
  subject: 'math',
  title: 'Найбільший спільний дільник',
  desc: 'НСД розкладанням на прості множники: розклади одне під одним, закреслюємо пари однакових множників і перемножуємо спільні.',
  tasks: [
    {
      id: 'k32',
      tool: 'nsd',
      title: 'Знайди НСД(24; 18)',
      cfg: { a: 24, b: 18 },
      done: false,
    },
    {
      id: 'k33',
      tool: 'nsd',
      title: 'Знайди НСД(60; 84)',
      cfg: { a: 60, b: 84 },
      done: false,
    },
    {
      id: 'k34',
      tool: 'nsd',
      title: 'Знайди НСД(12; 36)',
      cfg: { a: 12, b: 36 },
      done: false,
    },
    {
      id: 'k35',
      tool: 'nsd',
      title: 'Знайди НСД(8; 15)',
      cfg: { a: 8, b: 15 },
      done: false,
    },
    {
      id: 'k36',
      tool: 'nsd',
      title: 'Знайди НСД(24; 36; 60)',
      cfg: { a: 24, b: 36, c: 60 },
      done: false,
    },
  ],
  grades: [6],
};
