const path = require('node:path');
const root = path.resolve(__dirname, '../../..');
exports.publicationFiles = () =>
  [
    ['src/courses/algebra/shared/styles/domain.css', 'css/tools/domain.css'],
    [
      'src/courses/algebra/lessons/irrational-equations/styles/irrational.css',
      'css/tools/irrational.css',
    ],
  ].map(([source, destination]) => ({
    source: path.join(root, source),
    destination: path.join(root, 'dist', destination),
  }));
