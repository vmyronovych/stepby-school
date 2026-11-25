const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { publicationFiles } = require('../publication.cjs');
const { assetPath } = require('../scripts/paths.cjs');
const path = require('node:path');
const vm = require('node:vm');

test('Windows publication includes the same lesson materials and excludes lesson sources', () => {
  const virtualRoot = 'C:\\school\\robotics';
  const module = { exports: {} };
  const courseRoot = path.resolve(__dirname, '..');
  const toLocal = (filename) =>
    path.join(
      courseRoot,
      ...path.win32.relative(virtualRoot, filename).split('\\'),
    );
  vm.runInNewContext(
    fs.readFileSync(path.join(courseRoot, 'publication.cjs'), 'utf8'),
    {
      module,
      require(name) {
        if (name === 'node:path') return path.win32;
        if (name === 'node:fs')
          return {
            readdirSync: (directory, options) =>
              fs.readdirSync(toLocal(directory), options),
          };
        if (name === './scripts/paths.cjs')
          return {
            coursePath: (...parts) => path.win32.join(virtualRoot, ...parts),
            publicPath: (...parts) =>
              path.win32.join('C:\\school\\dist\\assets\\robotics', ...parts),
          };
        throw new Error(`Unexpected import: ${name}`);
      },
    },
  );
  const windowsNames = Array.from(
    module.exports.publicationFiles(),
    ({ destination }) => path.win32.basename(destination),
  ).sort();
  const nativeNames = publicationFiles()
    .map(({ destination }) => path.basename(destination))
    .sort();
  assert.deepEqual(windowsNames, nativeNames);
  assert.equal(
    windowsNames.filter((name) => name.endsWith('.mcar')).length,
    73,
  );
  assert(!windowsNames.some((name) => /\.(?:tsx?|md)$/.test(name)));
});

test('every published robotics asset has one canonical course source', () => {
  const files = publicationFiles();
  assert.equal(
    files.filter((file) => file.source.endsWith('.mcar')).length,
    73,
  );
  for (const { source, destination } of files) {
    assert.deepEqual(
      fs.readFileSync(destination),
      fs.readFileSync(source),
      destination,
    );
    if (!source.endsWith('.css'))
      assert.equal(assetPath(path.basename(source)), source);
  }
});
