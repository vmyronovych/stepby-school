const { buildSync } = require('esbuild');
const Module = require('node:module');
const path = require('node:path');
const vm = require('node:vm');

const projectRoot = path.resolve(__dirname, '../..');

/** Compile a fresh TypeScript module instance without sharing the require cache. */
function loadTypeScript(relativePath) {
  const filename = path.resolve(projectRoot, relativePath);
  const result = buildSync({
    entryPoints: [filename],
    bundle: true,
    platform: 'node',
    format: 'cjs',
    target: 'node22',
    write: false,
    logLevel: 'silent',
  });
  const loaded = new Module(filename, module);
  loaded.filename = filename;
  loaded.paths = Module._nodeModulePaths(path.dirname(filename));
  loaded._compile(result.outputFiles[0].text, filename);
  return loaded.exports;
}

/** Each engine test receives its own typed catalog, document registry, and state. */
function createDataContext(globals = {}) {
  const { catalog } = loadTypeScript('src/data/catalog.ts');
  const { engineState, documents } = loadTypeScript('src/runtime/state.ts');
  return vm.createContext({
    DB: catalog,
    S: engineState,
    DOCS: documents,
    ...globals,
  });
}

module.exports = { loadTypeScript, createDataContext };
