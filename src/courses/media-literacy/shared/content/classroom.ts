import type { ChatStory } from '../ui/ChatScene';
import type { Consequence } from './consequences';
export interface ClassroomScene {
  title: string;
  context: string;
  chat: ChatStory;
  question: string;
  options: string[];
  explanation: string;
  discussion: string[];
  consequence: Consequence;
  takeaway: string;
  source?: string;
}
