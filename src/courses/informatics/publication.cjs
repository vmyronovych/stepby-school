const path = require('node:path');
const root = path.resolve(__dirname, '../../..');
exports.publicationFiles = () =>
  [
    ['shared/styles/info.css', 'css/info.css'],
    ['shared/styles/projector.css', 'css/info/projector.css'],
    ['tools/keyboard/styles/index.css', 'css/info/keyboard.css'],
    ['tools/windows/styles/index.css', 'css/info/win.css'],
  ].map(([source, destination]) => ({
    source: path.join(__dirname, source),
    destination: path.join(root, 'dist', destination),
  }));
