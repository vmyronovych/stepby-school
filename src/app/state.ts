import type { AppState } from '../types';

// Current application context used to resolve lesson links while building a tool.
export const engineState: AppState = {
  cls: null,
  subject: null,
  topic: null,
  sub: null,
  tool: null,
  toolCfg: null,
  toolTaskId: null,
  toolFrom: null,
  step: 0,
  steps: [],
  model: null,
  anim: null,
};
