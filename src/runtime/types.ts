export interface EngineDocument {
  title: string;
  html: string;
  app?: boolean;
  init?(body: HTMLElement, sub: string | null): void;
  onSub?(sub: string | null): void;
  leave?(): void;
}
