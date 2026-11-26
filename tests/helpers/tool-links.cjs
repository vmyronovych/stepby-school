const { loadTypeScript } = require('./load-typescript.cjs');
const { createToolLinks } = loadTypeScript('src/app/tools/links.ts');
exports.toolLinks = createToolLinks(null);
