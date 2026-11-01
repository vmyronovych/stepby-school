import type { AppState } from '../types';
import type { EngineDocument } from './types';

// Mathematical helpers read this module-local mirror of the React route state.
// Application controls and subscriptions belong to the React application store.
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

// Engines register repository lesson material and interactive lifecycle hooks.
export const documents: Record<string, EngineDocument> = {};
