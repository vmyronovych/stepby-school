import type { AppState, SchoolClass, Subject, Topic, ToolDefinition, StepContext } from './types';
// Temporary boundary for classic scripts. New UI code uses the typed contracts above.
declare global {
  const DB: { classes: SchoolClass[]; subjects: Subject[]; topics: Topic[]; tools: Record<string, ToolDefinition> };
  const S: AppState;
  function clsTitle(c: SchoolClass): string;
  function clsCrumb(c: SchoolClass): string;
  function hrefHome(): string;
  function hrefCls(cls: string): string;
  function hrefSubj(cls: string, subject: string): string;
  function hrefTopic(topic: Topic, sub?: string): string;
  function hrefTool(tool: string): string;
  function toast(message: string): void;
  function toolDef(): ToolDefinition;
  function toolBackHref(): string;
  function stepCtx(): StepContext;
  function stepTo(index: number): void;
  function applyTool(): void;
  function markDone(): void;
}
