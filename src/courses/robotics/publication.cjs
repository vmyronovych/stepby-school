const fs = require('node:fs');
const path = require('node:path');
const { coursePath, publicPath } = require('./scripts/paths.cjs');

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const name = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(name) : [name];
  });
}

/** The course owns its source layout; the build only consumes this publication manifest. */
function publicationFiles() {
  const sources = [
    ...walk(coursePath('lessons')).filter((filename) =>
      /\/(assets|files)\//.test(filename),
    ),
    ...walk(coursePath('shared/assets')),
    coursePath('shared/styles/course.css'),
    coursePath('shared/styles/documents.css'),
    coursePath('tools/circuit/circuit.css'),
  ];
  const names = new Set();
  return sources.map((source) => {
    const name = path.basename(source);
    if (names.has(name))
      throw new Error(`Duplicate robotics publication name: ${name}`);
    names.add(name);
    return { source, destination: publicPath(name) };
  });
}

module.exports = { publicationFiles };
