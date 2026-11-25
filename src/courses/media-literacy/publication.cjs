const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../../..');

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filename = path.join(directory, entry.name);
    if (entry.isSymbolicLink())
      throw new Error(`Publication source must not be a symlink: ${filename}`);
    return entry.isDirectory() ? walk(filename) : [filename];
  });
}

/** Preserve published URLs while the course owns its source layout. */
exports.publicationFiles = () => {
  const assets = [
    ...walk(path.join(__dirname, 'shared/assets')),
    ...walk(path.join(__dirname, 'lessons')).filter((file) =>
      file.includes(path.sep + 'assets' + path.sep),
    ),
  ];
  const names = new Set();
  return [
    ...assets.map((source) => {
      const name = path.basename(source);
      if (names.has(name))
        throw new Error(`Duplicate media literacy publication name: ${name}`);
      names.add(name);
      return {
        source,
        destination: path.join(root, 'dist/assets/media-literacy', name),
      };
    }),
    {
      source: path.join(__dirname, 'shared/styles/course.css'),
      destination: path.join(root, 'dist/css/media-literacy.css'),
    },
  ];
};
