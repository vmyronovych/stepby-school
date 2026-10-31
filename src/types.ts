export interface SchoolClass { id: string; name: string; label?: string; icon?: string; note?: string }
export interface Subject { id: string; name: string; active: boolean; cls: string[]; bg: string; icon: string }
export type ToolConfig = Record<string, unknown>;
export interface Task { id: string; tool: string; title: string; cfg: ToolConfig; done: boolean }
export interface Topic {
  id: string; cls: string; subject: string; title: string; desc: string;
  doc?: string; kind?: string; icon?: string; chips?: string[]; lesson?: string;
  tasks?: Task[]; materials?: { type: string; title: string }[];
}
export interface Step { text: string; error?: boolean }
export interface StepContext { step: Step; index: number; anim: unknown }
export interface ToolDefinition {
  name: string; icon: string; bg: string; freeHint?: string; inputHint?: string;
  inputs(config: ToolConfig): string;
  view(model: unknown, context: StepContext): string;
  animate?(model: unknown, context: StepContext): void;
}
export interface AppState {
  cls: string | null; subject: string | null; topic: string | null;
  tool: string | null; toolCfg: ToolConfig | null; toolTaskId: string | null;
  step: number; steps: Step[]; model: unknown; anim: unknown;
}
