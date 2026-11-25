const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

test('the distribution contains only the website and all entry resources resolve locally', () => {
  assert.deepEqual(fs.readdirSync(dist).sort(), [
    '.nojekyll',
    'assets',
    'css',
    'index.html',
  ]);
  assert.equal(
    fs.existsSync(path.join(root, 'assets')),
    false,
    'Generated files must not return to the repository root',
  );
  const html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
  for (const [, ref] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    assert(
      !/^(?:https?:|\/)/.test(ref),
      `Entry resource must be relative for offline/project Pages: ${ref}`,
    );
    assert(
      fs.existsSync(path.join(dist, ref.split('?')[0])),
      `Missing entry resource: ${ref}`,
    );
  }
  const walk = (directory) =>
    fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
      assert(!entry.isSymbolicLink(), 'Distribution must be portable');
      const file = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(file) : [file];
    });
  for (const filename of walk(dist)) {
    assert(
      !/\.(?:ts|tsx|cjs|mjs|md)$/.test(filename),
      `Internal source leaked into dist: ${filename}`,
    );
  }
});

test('published materials match their canonical sources, including non-robotics courses', async () => {
  const { siteInputs } = await import('../scripts/site-files.mjs');
  for (const { source, destination } of siteInputs().files) {
    assert.deepEqual(
      fs.readFileSync(destination),
      fs.readFileSync(source),
      destination,
    );
  }
  assert(
    fs.existsSync(path.join(dist, 'assets/app.js.LEGAL.txt')),
    'Bundled dependency licenses must be published',
  );
});
