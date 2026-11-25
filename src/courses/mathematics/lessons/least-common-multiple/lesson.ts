import type { Topic } from '../../../../types';
export const lesson: Topic = {
  id: 't10',
  cls: '6a',
  subject: 'math',
  title: 'Найменше спільне кратне',
  desc: 'НСК розкладанням на прості множники: беремо всі множники більшого числа й дописуємо ті, яких бракує.',
  tasks: [
    {
      id: 'k23',
      tool: 'nsk',
      title: 'Знайди НСК(24; 18)',
      cfg: { a: 24, b: 18 },
      done: false,
    },
    {
      id: 'k24',
      tool: 'nsk',
      title: 'Знайди НСК(40; 60)',
      cfg: { a: 40, b: 60 },
      done: false,
    },
    {
      id: 'k25',
      tool: 'nsk',
      title: 'Знайди НСК(12; 36)',
      cfg: { a: 12, b: 36 },
      done: false,
    },
    {
      id: 'k26',
      tool: 'nsk',
      title: 'Знайди НСК(8; 15)',
      cfg: { a: 8, b: 15 },
      done: false,
    },
    {
      id: 'k27',
      tool: 'nsk',
      title: 'Знайди НСК(12; 18; 30)',
      cfg: { a: 12, b: 18, c: 30 },
      done: false,
    },
  ],
  grades: [6],
};
