const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { publicationFiles } = require('../publication.cjs');
const { assetPath } = require('../scripts/paths.cjs');
const path = require('node:path');

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
