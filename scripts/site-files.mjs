import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import components from '../src/components/publication.cjs';
import mathematics from '../src/courses/mathematics/publication.cjs';
import algebra from '../src/courses/algebra/publication.cjs';
import geometry from '../src/courses/geometry/publication.cjs';
import robotics from '../src/courses/robotics/publication.cjs';
import informatics from '../src/courses/informatics/publication.cjs';
import webDevelopment from '../src/courses/web-development/publication.cjs';
import mediaLiteracy from '../src/courses/media-literacy/publication.cjs';

export const projectRoot = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '..',
);
export const distRoot = join(projectRoot, 'dist');
const sourceTrees = [['css', 'css']];

/** Only explicit public inputs enter dist; repository docs, tests and AI rules do not. */
export function siteInputs() {
  const files = [
    {
      source: join(projectRoot, 'index.html'),
      destination: join(distRoot, 'index.html'),
    },
  ];
  const directories = new Set([projectRoot]);
  function collect(source, destination) {
    directories.add(source);
    for (const entry of readdirSync(source, { withFileTypes: true })) {
      if (entry.isSymbolicLink())
        throw new Error(
          `Publication source must not be a symlink: ${join(source, entry.name)}`,
        );
      if (entry.isDirectory())
        collect(join(source, entry.name), join(destination, entry.name));
      else if (entry.isFile())
        files.push({
          source: join(source, entry.name),
          destination: join(destination, entry.name),
        });
    }
  }
  for (const [source, destination] of sourceTrees)
    collect(join(projectRoot, source), join(distRoot, destination));
  for (const module of [
    robotics,
    components,
    mathematics,
    algebra,
    geometry,
    mediaLiteracy,
    informatics,
    webDevelopment,
  ])
    files.push(...module.publicationFiles());
  const destinations = new Set();
  for (const file of files) {
    if (!file.destination.startsWith(distRoot + sep))
      throw new Error(`Output outside dist: ${file.destination}`);
    if (destinations.has(file.destination))
      throw new Error(`Duplicate publication destination: ${file.destination}`);
    destinations.add(file.destination);
    for (
      let directory = dirname(file.source);
      directory !== projectRoot;
      directory = dirname(directory)
    )
      directories.add(directory);
  }
  return { files, directories: [...directories] };
}

export function cleanDist() {
  rmSync(distRoot, { recursive: true, force: true });
  mkdirSync(distRoot, { recursive: true });
}

/** Keep dev output in sync, including removal of previously published static files. */
export function createPublisher() {
  let previous = new Set();
  return () => {
    const inputs = siteInputs();
    const current = new Set(inputs.files.map((file) => file.destination));
    for (const filename of previous)
      if (!current.has(filename)) rmSync(filename, { force: true });
    for (const { source, destination } of inputs.files) {
      mkdirSync(dirname(destination), { recursive: true });
      copyFileSync(source, destination);
    }
    writeFileSync(join(distRoot, '.nojekyll'), '');
    previous = current;
    return inputs;
  };
}

export function requireBuiltSite() {
  for (const file of ['index.html', 'assets/app.js']) {
    if (!existsSync(join(distRoot, file)))
      throw new Error(`Missing dist/${file}. Run npm run build first.`);
  }
}
