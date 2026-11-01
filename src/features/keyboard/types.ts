export interface KeyboardKey {
  c: string;
  x: number;
  y: number;
  w: number;
  h: number;
  g: string;
  nm?: string;
  en?: string;
  ua?: string;
  sh?: string;
  un?: string;
  big?: number;
  ctr?: number;
}

export interface KeyboardPreset {
  label: string;
  desc: string;
  keys?: string[];
}

export interface KeyboardSnapshot {
  focus: string | null;
  down: string[];
  selected: string | null;
  lang: string | null;
  caps: boolean;
  num: boolean;
  text: string;
  caret: number;
  anchor: number | null;
  overwrite: boolean;
  ghost: { side: 'l' | 'r'; ch: string; id: number } | null;
  info: {
    parts: string[];
    result: string | null;
    description: string;
    keyCaps: boolean;
  };
}

export interface KeyboardController {
  keys: KeyboardKey[];
  groups: Record<string, KeyboardPreset>;
  presets: Record<string, KeyboardPreset>;
  languageLabels: Record<string, string>;
  getSnapshot(): KeyboardSnapshot;
  subscribe(listener: () => void): () => void;
  keyName(key: KeyboardKey, language?: string): string;
  activate(preset: string | null): void;
  deactivate(): void;
  applyPreset(preset: string | null): void;
  handleKey(event: KeyboardEvent): void;
  releaseKeys(): void;
  showKey(code: string, event?: MouseEvent): void;
  clearText(): void;
  placeCaret(index: number): void;
}

export interface KeyboardProjectorProps {
  controller: KeyboardController;
  preset: string | null;
  onPresetChange(preset: string | null): void;
}
