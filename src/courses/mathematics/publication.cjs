const path = require('node:path');
const root = path.resolve(__dirname, '../../..');
exports.publicationFiles = () =>
  [
    [
      'src/courses/mathematics/lessons/fractions/styles/fractions.css',
      'css/tools/fractions.css',
    ],
    [
      'src/courses/mathematics/lessons/divisors-multiples/styles/dvk.css',
      'css/tools/dvk.css',
    ],
    [
      'src/courses/mathematics/lessons/prime-factors/styles/factor.css',
      'css/tools/factor.css',
    ],
    ['src/courses/mathematics/shared/styles/nsk.css', 'css/tools/nsk.css'],
    [
      'src/courses/mathematics/lessons/greatest-common-divisor/styles/nsd.css',
      'css/tools/nsd.css',
    ],
  ].map(([source, destination]) => ({
    source: path.join(root, source),
    destination: path.join(root, 'dist', destination),
  }));
