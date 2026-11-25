const path = require('node:path');

const courseRoot = path.resolve(__dirname, '..');
const projectRoot = path.resolve(courseRoot, '../../..');
const coursePath = (...parts) => path.join(courseRoot, ...parts);
const publicPath = (...parts) =>
  path.join(projectRoot, 'dist/assets/robotics', ...parts);
const projectRelative = (filename) => {
  const lesson = filename.match(/^lesson-\d{2}/)?.[0];
  if (!lesson || !filename.endsWith('.mcar'))
    throw new Error(`Unknown project: ${filename}`);
  return `lessons/${lesson}/files/${filename}`;
};
const projectPath = (filename) => coursePath(projectRelative(filename));
const localImages = {
  'circuit-first.png': '01',
  'circuit-button.png': '02',
  'circuit-contact.png': '03',
  'wire-game-assembly.svg': '03',
  'mcar-chassis.png': '04',
  'mcar-wheels.png': '05',
};
function assetPath(filename) {
  if (filename.endsWith('.mcar')) return projectPath(filename);
  const lesson =
    localImages[filename] ??
    (!filename.endsWith('-wiring.png')
      ? filename.match(/^lesson-(\d{2})-/)?.[1]
      : undefined);
  return lesson
    ? coursePath('lessons', `lesson-${lesson}`, 'assets', filename)
    : coursePath('shared/assets', filename);
}

module.exports = {
  courseRoot,
  projectRoot,
  coursePath,
  projectRelative,
  projectPath,
  assetPath,
  publicPath,
};
