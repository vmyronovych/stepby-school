import type { ChatStory } from '../ui/ChatScene';

export interface StoryScene {
  title: string;
  lead: string;
  chat: ChatStory;
  question: string;
  choices: { text: string; explanation: string; safe: boolean }[];
  discuss: string[];
  activity: string;
  takeaway: string;
}
export interface TopicJourney {
  opening: string;
  scenes: StoryScene[];
  finalTask: string;
  success: string;
}
export const choice = (text: string, explanation: string, safe = false) => ({
  text,
  explanation,
  safe,
});
