import type { MediaContent } from '../shared/content/types';
import { content as truth } from '../lessons/truth/content';
import { content as publishing } from '../lessons/publishing/content';
import { content as games } from '../lessons/games/content';
import { content as safety } from '../lessons/safety/content';
export type { MediaContent } from '../shared/content/types';
export const mediaContent: Record<string, MediaContent> = Object.fromEntries(
  [truth, publishing, games, safety].map((theme) => [
    'media-' + theme.id,
    theme,
  ]),
);
