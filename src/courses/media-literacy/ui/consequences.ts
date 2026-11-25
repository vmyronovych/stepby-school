import type { Consequence } from '../shared/content/consequences';
import { consequences as truth } from '../lessons/truth/consequences';
import { consequences as publishing } from '../lessons/publishing/consequences';
import { consequences as games } from '../lessons/games/consequences';
import { consequences as safety } from '../lessons/safety/consequences';
export const topicConsequences: Record<string, Consequence[]> = {
  truth,
  publishing,
  games,
  safety,
};
export { robuxConsequences } from '../lessons/robux/consequences';
export type { Consequence } from '../shared/content/consequences';
