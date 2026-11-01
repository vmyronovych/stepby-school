import type { Topic } from '../../types';

export type Point = [number, number];
export interface VectorClassification {
  n: number;
  m: number;
  zero: boolean;
  collinear: boolean;
  same: boolean;
  opposite: boolean;
  equal: boolean;
}
export interface VectorStage {
  title: string;
  preset: string;
  rule: string;
  note: string;
  task: string;
}
export interface VectorEngine {
  presets: Record<string, { name: string; points: Point[] }>;
  lessons: VectorStage[];
  classify(points: Point[]): VectorClassification;
  length(squared: number): string;
}
export interface PracticeProblem {
  id: string;
  title: string;
  kind: 'number' | 'choice';
  answer: string;
  points: Point[];
  question: string;
  hint: string;
  solution: string;
  options?: [string, string][];
}
export interface PracticeEngine {
  problems: PracticeProblem[];
  checkAnswer(
    problem: PracticeProblem,
    value: string,
  ): { valid: boolean; correct: boolean };
  diagram(problem: PracticeProblem): string;
}
export interface ScalingEngine {
  stages: { title: string; k: number; text: string; task: string }[];
  theory: string;
  diagram(x: number, y: number, k: number): string;
  model(
    x: number,
    y: number,
    k: number,
  ): { result: Point; length: number; scaledLength: number; direction: string };
}
export interface ScalarEngine {
  theory: string;
  polar(lengthA: number, lengthB: number, angle: number): [Point, Point];
  diagram(
    a: Point,
    b: Point,
    names: string[],
    angleLabel?: string,
    id?: string,
  ): string;
  format(value: number): string;
}
export interface GeometryEngines {
  vectors: VectorEngine;
  practice: PracticeEngine;
  scaling: ScalingEngine;
  scalar: ScalarEngine;
}
export interface GeometryLessonProps {
  sectionId: string;
  topic: Topic;
  engines: GeometryEngines;
  hrefForTask: (taskId: string) => string;
}
