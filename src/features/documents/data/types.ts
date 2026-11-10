import type { WordGalleryGroup } from './word2013';

export type InfoGrade = 'g3' | 'g4';
export interface SchoolCalendar {
  start: string;
  end: string;
  weekday: number;
  lessons: number;
  semester2from: string;
  vacations: { name: string; from: string; to: string }[];
  holidays: { name: string; date: string }[];
}
export interface KtpLesson {
  n: number;
  topic: string;
  line: string;
  res: string;
}
export interface LessonStage {
  t: string;
  d: string;
  h: string;
  tag?: string;
  show?: string;
  documentExample?: 'about-me';
  wordGallery?: WordGalleryGroup;
  b?: string[];
  say?: { l: string; t: string };
}
export interface LessonPlan {
  goal: string;
  equip: string[];
  steps: LessonStage[];
  hw?: string;
}
export interface GradePlan {
  label: string;
  cls: string;
  ktp: KtpLesson[];
  plans: Record<number, LessonPlan>;
}
export interface InformaticsData {
  calendar: SchoolCalendar;
  g3: GradePlan;
  g4: GradePlan;
  dates: string[];
  spare: string[];
  s2: number;
}
