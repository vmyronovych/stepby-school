const { loadTypeScript } = require('./load-typescript.cjs');
const { courseLinks } = loadTypeScript('src/app/navigation/links.ts');
// Historical content snapshots were captured before document links were configured.
// Supply that same host explicitly; live navigation is verified separately.
exports.baselineDocumentLinks = {
  hrefHome: courseLinks.hrefHome,
  hrefTopic: courseLinks.hrefTopic,
  hrefDoc: () => '#/',
  notify: () => {},
};
