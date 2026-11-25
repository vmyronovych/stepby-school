export interface Subject {
  description?: string;
  id: string;
  name: string;
  /** Address namespaces retained for existing links; not lesson grade groups. */
  cls: string[];
  bg: string;
  icon: string;
}
/** A course owns its metadata and complete list of lessons and materials. */
export interface Course {
  subject: Subject;
  topics: readonly Topic[];
}
export type ToolConfig = Record<string, unknown>;
export interface Task {
  id: string;
  tool: string;
  title: string;
  cfg: ToolConfig;
  done: boolean;
}
export interface Topic {
  /** Explicit grade groups; omitted for lessons without grade grouping. */
  grades?: number[];
  aliases?: { cls: string; subject: string; id: string }[];
  id: string;
  cls: string;
  subject: string;
  title: string;
  desc: string;
  doc?: string;
  kind?: string;
  views?: string[];
  icon?: string;
  chips?: string[];
  cover?: string;
  lesson?: string;
  tasks?: Task[];
}
export interface Step {
  text: string;
  error?: boolean;
}
export interface StepContext {
  root?: HTMLElement;
  step: Step;
  index: number;
  anim: unknown;
}
export interface ToolModel {
  steps: Step[];
}
export interface ToolDefinition {
  id: string;
  errorHint?: string;
  build(config: ToolConfig): ToolModel;
  read(readField: (id: string) => string): ToolConfig;
  prepare?(model: unknown, from: number, to: number): unknown;
  name: string;
  icon: string;
  bg: string;
  freeHint?: string;
  inputHint?: string;
  view(model: unknown, context: StepContext): string;
  animate?(model: unknown, context: StepContext): void;
}
export interface AppState {
  cls: string | null;
  subject: string | null;
  topic: string | null;
  sub: string | null;
  toolFrom: string | null;
  tool: string | null;
  toolCfg: ToolConfig | null;
  toolTaskId: string | null;
  step: number;
  steps: Step[];
  model: unknown;
  anim: unknown;
}

export interface Catalog {
  subjects: Subject[];
  topics: Topic[];
  tools: Record<string, ToolDefinition>;
}
