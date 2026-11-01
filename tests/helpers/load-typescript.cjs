const { buildSync } = require('esbuild');
const Module = require('node:module');
const path = require('node:path');

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

module.exports = { loadTypeScript };
