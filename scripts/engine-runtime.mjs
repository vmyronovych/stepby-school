import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));

// The mathematical and simulation engines still share lexical helpers. Keep
// their dependency order explicit while compiling them into one private module.
// This manifest is the only place that controls engine loading in the browser.
export const engineSources = [
  'js/core/util.js',
  'js/core/registry.js',
  'js/core/handwriting.js',
  'js/core/notebook.js',
  'js/core/column.js',
  'js/core/formula.js',
  'js/core/numline.js',
  'js/tools/linear.js',
  'js/tools/domain.js',
  'js/tools/irrational.js',
  'js/tools/rational-power.js',
  'js/tools/dvk.js',
  'js/tools/factor.js',
  'js/tools/nsd.js',
  'js/tools/nsk.js',
  'js/tools/fractions.js',
  'js/tools/equation.js',
  'js/tools/proportion.js',
  'js/tools/add.js',
  'js/tools/sub.js',
  'js/tools/mult.js',
  'js/tools/div.js',
  'js/robo/robo.js',
  'js/robo/sections.js',
  'js/robo/mod1.js',
  'js/robo/mod2.js',
  'js/robo/circuit/parts.js',
  'js/robo/circuit/solver.js',
  'js/robo/circuit/breadboard.js',
  'js/robo/circuit/sim.js',
  'js/info/info.js',
  'js/info/ktp3.js',
  'js/info/ktp4.js',
  'js/info/plans3.js',
  'js/info/plans4.js',
  'js/info/nit.js',
  'js/info/show/keyboard.js',
  'js/info/show/win/10-model.js',
  'js/info/show/win/20-icons.js',
  'js/info/show/win/30-view.js',
  'js/info/show/win/40-input.js',
  'js/info/sections.js',
  'js/geometry/vector-practice.js',
  'js/geometry/vectors.js',
  'js/geometry/vector-scaling.js',
  'js/geometry/scalar-product.js',
  'js/geometry/vector-notebook.js',
  'js/tools/vector-scaling.js',
  'js/tools/scalar-product.js',
];

const navigationBridge = `
import { runtimeServices } from './services';
import { catalog as DB } from '../data/catalog';
import { engineState as S, documents as DOCS } from './state';
function hrefHome() { return runtimeServices.hrefHome(); }
function hrefCls(id) { return runtimeServices.hrefCls(id); }
function hrefSubj(cls, subject) { return runtimeServices.hrefSubj(cls, subject); }
function hrefTopic(topic, sub) { return runtimeServices.hrefTopic(topic, sub); }
function hrefTool(id, config) { return runtimeServices.hrefTool(id, config); }
function hrefDoc(id, sub) { return runtimeServices.hrefDoc(id, sub); }
function docReplaceSub(sub) { return runtimeServices.docReplaceSub(sub); }
function docTopicFor(id) { return DB.topics.find(topic => topic.doc === id) || null; }
`;

const engineExports = `
export default {
  DB, DOCS, S, ROBO, CircuitEngine, KeyboardEngine, windows: WN_REACT, VectorLesson, VectorPractice, VectorScaling, ScalarProduct,
  toolDef, topicForTool, readField, prefersReducedMotion, esc,
  domPreviewHtml, RP, ScalingNotebook, ScalarNotebook,
};
`;

export async function createEngineModule() {
  const sources = await Promise.all(
    engineSources.map(async (file) => {
      let source = await readFile(path.join(projectRoot, file), 'utf8');
      if (file === 'js/core/util.js') {
        // React owns application chrome and toast state. Retain utility functions,
        // but forward the old engine notification hook through the typed service.
        source = source.replace(
          /^const app = document\.getElementById\('app'\);\n/m,
          '',
        );
        source = source.replace(
          /^function toast\(msg\)\{[^\n]*\}\n/m,
          'function toast(message) { runtimeServices.toast(message); }\n',
        );
      }
      return `\n// Source: ${file}\n${source}\n`;
    }),
  );
  return navigationBridge + sources.join('\n') + engineExports;
}

export function engineRuntimePlugin() {
  return {
    name: 'stepby-engine-runtime',
    setup(build) {
      build.onResolve({ filter: /^stepby:engines$/ }, () => ({
        path: 'engines',
        namespace: 'stepby-engines',
      }));
      build.onLoad(
        { filter: /^engines$/, namespace: 'stepby-engines' },
        async () => ({
          contents: await createEngineModule(),
          loader: 'js',
          resolveDir: path.join(projectRoot, 'src/runtime'),
          watchFiles: engineSources.map((file) => path.join(projectRoot, file)),
        }),
      );
    },
  };
}
