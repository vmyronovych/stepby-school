import { WindowsEngine } from '../features/windows/engine';
import { catalog } from '../data/catalog';
import { registerTools, toolDef, topicForTool } from '../engines/core/registry';
import { esc, readField, prefersReducedMotion } from '../engines/core/util';
import {
  algebraTools,
  assembleAlgebraLessons,
  domPreviewHtml,
  RP,
} from '../features/tools/engines';
import {
  geometryTools,
  geometryDocuments,
  VectorLesson,
  VectorPractice,
  VectorScaling,
  ScalarProduct,
  ScalingNotebook,
  ScalarNotebook,
} from '../features/geometry/engines';
import { composeDocuments } from '../features/documents/content';
import { roboticsLessonState } from '../features/documents/services/robotics-state';
import { CircuitEngine, circuitState } from '../features/circuit/engine';
import { KeyboardEngine } from '../features/keyboard/engine/keyboard';
import { engineState, documents } from './state';
import type { EngineRuntime } from './types';

registerTools([...algebraTools, ...geometryTools]);
assembleAlgebraLessons(catalog);
for (const group of [composeDocuments(catalog), geometryDocuments]) {
  for (const [id, definition] of Object.entries(group)) {
    if (documents[id]) throw new Error(`Документ «${id}» уже зареєстровано`);
    documents[id] = definition;
  }
}
export const engine: EngineRuntime = {
  DB: catalog,
  DOCS: documents,
  S: engineState,
  ROBO: {
    sections: documents,
    get ktp() {
      return roboticsLessonState.ktp;
    },
    set ktp(value) {
      roboticsLessonState.ktp = value;
    },
    get simGen() {
      return circuitState.simGen;
    },
    set simGen(value) {
      circuitState.simGen = value;
    },
    get circuit() {
      return circuitState.circuit;
    },
  },
  CircuitEngine,
  KeyboardEngine,
  windows: WindowsEngine,
  VectorLesson,
  VectorPractice,
  VectorScaling,
  ScalarProduct,
  toolDef,
  topicForTool,
  readField,
  prefersReducedMotion,
  esc,
  domPreviewHtml,
  RP,
  ScalingNotebook,
  ScalarNotebook,
};
export { configureRuntimeServices } from './services';
export type { RuntimeServices } from './services';
export type { EngineDocument, EngineRuntime } from './types';
