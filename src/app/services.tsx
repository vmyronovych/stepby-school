import { LegacyHtml } from '../components/ui';
import { engine } from '../runtime';
import type { ToolInputServices } from '../features/tools/inputs/ToolInputs';
import type { DocumentServices } from '../features/documents/types';
import { notify } from './notifications';

export const inputServices: ToolInputServices = {
  examples: {
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
  getKtp: () => engine.ROBO.ktp,
  clearKtp: () => {
    engine.ROBO.ktp = {};
  },
  notify,
  reducedMotion: engine.prefersReducedMotion,
};
