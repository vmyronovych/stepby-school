import type { Topic } from '../../../../types';
export const lesson: Topic = {
  id: 't8',
  cls: '6a',
  subject: 'math',
  title: 'Розкладання на прості множники',
  desc: 'Перебір дільників 2, 3, 5, 7…, ознаки подільності, запис розкладу степенями.',
  tasks: [
    {
      id: 'k14',
      tool: 'factor',
      title: 'Розклади 360 на прості множники',
      cfg: { n: 360 },
      done: false,
    },
    {
      id: 'k15',
      tool: 'factor',
      title: 'Розклади 84 на прості множники',
      cfg: { n: 84 },
      done: false,
    },
    {
      id: 'k16',
      tool: 'factor',
      title: 'Розклади 91 на прості множники',
      cfg: { n: 91 },
      done: false,
    },
  ],
  grades: [6],
};
