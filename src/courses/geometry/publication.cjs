const path = require('node:path');
const root = path.resolve(__dirname, '../../..');
exports.publicationFiles = () =>
  [
    [
      'src/courses/geometry/shared/styles/vectors.css',
      'css/geometry/vectors.css',
    ],
    [
      'src/courses/geometry/lessons/vector-scaling/styles/vector-scaling.css',
      'css/geometry/vector-scaling.css',
    ],
    [
      'src/courses/geometry/lessons/scalar-product/styles/scalar-product.css',
      'css/geometry/scalar-product.css',
    ],
  ].map(([source, destination]) => ({
    source: path.join(root, source),
    destination: path.join(root, 'dist', destination),
  }));
