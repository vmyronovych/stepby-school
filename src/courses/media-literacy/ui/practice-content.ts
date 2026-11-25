import type { PracticeTask } from '../shared/content/practice';
import { tasks as truth } from '../lessons/truth/practice';
import { tasks as publishing } from '../lessons/publishing/practice';
import { tasks as games } from '../lessons/games/practice';
import { tasks as safety } from '../lessons/safety/practice';
import { tasks as robux } from '../lessons/robux/practice';
export const practiceTasks: Record<string, PracticeTask[]> = {
  truth,
  publishing,
  games,
  safety,
  robux,
};
export * from '../shared/content/practice';
