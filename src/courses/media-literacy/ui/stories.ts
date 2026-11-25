import type { TopicJourney } from '../shared/content/story';
import { journey as truth } from '../lessons/truth/stories';
import { journey as publishing } from '../lessons/publishing/stories';
import { journey as games } from '../lessons/games/stories';
import { journey as safety } from '../lessons/safety/stories';
export const journeys: Record<string, TopicJourney> = {
  truth,
  publishing,
  games,
  safety,
};
