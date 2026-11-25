export interface MediaContent {
  id: string;
  title: string;
  description: string;
  icon: string;
  outcomes: string[];
  introduction: string;
  scenario: string;
  question: string;
  choices: { text: string; explanation: string; safe: boolean }[];
  rule: string;
  teacher: string;
  robux?: boolean;
}
