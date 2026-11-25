export interface LessonStep {
  title: string;
  text: string;
  check: string;
}
export type LessonMaterial =
  'experiment' | 'wiring' | 'program' | 'assembly' | 'rule';
export interface LessonSlide {
  material: LessonMaterial;
  prompt?: string;
  followup?: { question: string; answer: string };
  title: string;
  text: string;
  question: string;
  answer: string;
}
export interface RoboticsLessonContent {
  number: number;
  prerequisites: number[];
  recall: string;
  materials: string[];
  preparation: string[];
  safety: string;
  slides: LessonSlide[];
  practice: LessonStep[];
  hints: [string, string, string];
  success: string[];
  extension: string;
  first: [string, string, string, string];
  second: [string, string, string, string];
  firstTitles?: [string, string, string, string];
  secondTitles?: [string, string, string, string];
  troubleshooting: [string, string][];
  exit: [string, string];
  // Static, locally captured figures; program files are assigned by resource metadata.
  figure:
    | 'circuit'
    | 'button'
    | 'wire-game'
    | 'chassis'
    | 'wheels'
    | 'led'
    | 'motor'
    | 'four-motors'
    | 'sensor'
    | 'festival';
}
