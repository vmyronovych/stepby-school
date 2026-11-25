import { handleRoboticsDocumentAction } from '../courses/robotics/shared/documents';
import { radianExamples } from '../courses/algebra/runtime';
import { LegacyHtml } from '../components/legacy-html';
import { engine } from '../runtime';
import type { ToolInputServices } from './math-inputs/ToolInputs';
import type { DocumentServices } from '../features/documents/types';
import { notify } from './notifications';

export const inputServices: ToolInputServices = {
  examples: {
    radian: radianExamples.map(({ title, index }) => ({
      value: String(index),
      label: title,
    })),
    'rational-power': engine.RP.examples.map((example) => ({
      value: example.group,
      label: example.title,
    })),
    'vector-scaling': engine.ScalingNotebook.examples.map((example, index) => ({
      value: String(index),
      label: example.title,
    })),
    'scalar-product': engine.ScalarNotebook.examples.map((example, index) => ({
      value: String(index),
      label: example.title,
      group: example.group,
      part: example.part,
    })),
  },
  renderDomainPreview: (formula) => (
    <LegacyHtml html={engine.domPreviewHtml(formula)} />
  ),
};
export const documentServices: DocumentServices = {
  handleAction: (action, body) =>
    handleRoboticsDocumentAction(action, body, notify),
  getKtp: () => engine.ROBO.ktp,
  clearKtp: () => {
    engine.ROBO.ktp = {};
  },
  notify,
  reducedMotion: engine.prefersReducedMotion,
};
