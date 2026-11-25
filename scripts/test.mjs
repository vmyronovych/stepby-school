import { readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

function tests(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filename = `${directory}/${entry.name}`;
    return entry.isDirectory()
      ? tests(filename)
      : filename.endsWith('.test.cjs')
        ? [filename]
        : [];
  });
}
const course = process.argv[2];
const courses = readdirSync('src/courses', { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);
if (course && !courses.includes(course))
  throw new Error(`Unknown course: ${course}`);
const files = course
  ? tests(`src/courses/${course}`)
  : [...tests('tests'), ...tests('src/courses')];
const result = spawnSync(process.execPath, ['--test', ...files.sort()], {
  stdio: 'inherit',
});
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
