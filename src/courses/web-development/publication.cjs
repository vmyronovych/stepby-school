const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../../..');
function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const name = path.join(directory, entry.name);
    if (entry.isSymbolicLink())
      throw new Error(`Publication source must not be a symlink: ${name}`);
    return entry.isDirectory() ? walk(name) : [name];
  });
}
exports.publicationFiles = () => {
  const shared = path.join(__dirname, 'shared/assets');
  const output = path.join(root, 'dist/assets/web-development');
  return [
    ...walk(shared).map((source) => ({
      source,
      destination: path.join(output, path.relative(shared, source)),
    })),
    ...walk(path.join(__dirname, 'lessons'))
      .filter((source) => source.includes(path.sep + 'assets' + path.sep))
      .map((source) => ({
        source,
        destination: path.join(output, path.basename(source)),
      })),
    {
      source: path.join(__dirname, 'shared/styles/course.css'),
      destination: path.join(root, 'dist/css/web-development.css'),
    },
  ];
};
