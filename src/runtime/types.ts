import type { AppState, Catalog, ToolDefinition, Topic } from '../types';

export interface EngineDocument {
  title: string;
  html: string;
  app?: boolean;
  init?(body: HTMLElement, sub: string | null): void;
  onSub?(sub: string | null): void;
  leave?(): void;
}

export interface ExampleOption {
  title: string;
  group?: number;
  part?: number;
}

export interface EngineRuntime {
  windows: import('../features/windows/types').WindowsController;
  VectorLesson: import('../features/geometry/types').GeometryEngines['vectors'];
  VectorPractice: import('../features/geometry/types').GeometryEngines['practice'];
  VectorScaling: import('../features/geometry/types').GeometryEngines['scaling'];
  ScalarProduct: import('../features/geometry/types').GeometryEngines['scalar'];
  CircuitEngine: import('../features/circuit/types').CircuitController;
  KeyboardEngine: import('../features/keyboard/types').KeyboardController;
  DB: Catalog;
  DOCS: Record<string, EngineDocument>;
  S: AppState;
  ROBO: {
    ktp: Record<string, string>;
    simGen: number;
    circuit: unknown;
    sections: Record<string, EngineDocument>;
  };
  toolDef(id?: string): ToolDefinition | null;
  topicForTool(id: string): Topic | null;
  readField(id: string): string;
  prefersReducedMotion(): boolean;
  esc(value: unknown): string;
  domPreviewHtml(formula: string): string;
  RP: { examples: { group: string; title: string }[] };
  ScalingNotebook: { examples: ExampleOption[] };
  ScalarNotebook: {
    examples: { title: string; group: number; part: number }[];
  };
}
