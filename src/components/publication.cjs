const path = require('node:path');
const root = path.resolve(__dirname, '../..');
exports.publicationFiles = () =>
  [
    ['src/components/notebook/styles/notebook.css', 'css/notebook.css'],
    [
      'src/components/notebook/styles/vector-notebook.css',
      'css/geometry/vector-notebook.css',
    ],
    [
      'src/components/notebook/styles/formulas.css',
      'css/tools/rational-power.css',
    ],
    ['src/components/notebook/styles/equation.css', 'css/tools/equation.css'],
    ['src/components/button/styles/index.css', 'css/components/button.css'],
    ['src/components/card/styles/index.css', 'css/components/card.css'],
    ['src/components/icon/styles/index.css', 'css/components/icon.css'],
    [
      'src/components/breadcrumbs/styles/index.css',
      'css/components/breadcrumbs.css',
    ],
    [
      'src/components/page-heading/styles/index.css',
      'css/components/page-heading.css',
    ],
    [
      'src/components/notebook/styles/workspace.css',
      'css/components/notebook.css',
    ],
  ].map(([source, destination]) => ({
    source: path.join(root, source),
    destination: path.join(root, 'dist', destination),
  }));
