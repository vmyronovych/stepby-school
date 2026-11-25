import type { Topic } from '../../../../types';
export const lesson: Topic = {
  id: 't9',
  cls: '10a',
  subject: 'algebra',
  title: 'Область визначення функції',
  desc: 'Знаменник ≠ 0, під коренем парного степеня ≥ 0, корінь у знаменнику > 0; система умов і числова пряма.',
  tasks: [
    {
      id: 'k17',
      tool: 'domain',
      title: 'Знайди D(y): y = √(x − 2)',
      cfg: { f: 'sqrt(x - 2)' },
      done: false,
    },
    {
      id: 'k18',
      tool: 'domain',
      title: 'Знайди D(y): y = (x + 1)/(x² − 9)',
      cfg: { f: '(x + 1)/(x^2 - 9)' },
      done: false,
    },
    {
      id: 'k19',
      tool: 'domain',
      title: 'Знайди D(y): y = √(x² − 5x + 6)',
      cfg: { f: 'sqrt(x^2 - 5x + 6)' },
      done: false,
    },
    {
      id: 'k20',
      tool: 'domain',
      title: 'Знайди D(y): y = √(4 − x)/(x − 1)',
      cfg: { f: 'sqrt(4 - x)/(x - 1)' },
      done: false,
    },
    {
      id: 'k21',
      tool: 'domain',
      title: 'Знайди D(y): y = 1/√(x + 3) + x⁻²',
      cfg: { f: '1/sqrt(x + 3) + x^-2' },
      done: false,
    },
    {
      id: 'k22',
      tool: 'domain',
      title: 'Знайди D(y): y = ∛(x − 1)/(x² + 1)',
      cfg: { f: 'root(3, x - 1)/(x^2 + 1)' },
      done: false,
    },
  ],
  grades: [10],
  aliases: [{ cls: '10a', subject: 'math', id: 't9' }],
};
