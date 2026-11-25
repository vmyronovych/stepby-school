import { readFile, writeFile, realpath } from 'node:fs/promises';
import {
  dirname,
  relative,
  resolve,
  sep,
  extname,
  isAbsolute,
} from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';
import ts from 'typescript';
import { format, resolveConfig } from 'prettier';

function sourceFile(path, text) {
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true);
  if (source.parseDiagnostics.length)
    throw new Error(`Invalid TypeScript: ${path}`);
  return source;
}
function property(object, name) {
  return object.properties.find(
    (node) =>
      ts.isPropertyAssignment(node) &&
      node.name.getText().replace(/^['"]|['"]$/g, '') === name,
  );
}
function literalField(object, name) {
  const value = property(object, name)?.initializer;
  return value && ts.isStringLiteral(value) ? value.text : undefined;
}
function arrayProperty(object, name) {
  const value = property(object, name)?.initializer;
  if (
    !value ||
    !ts.isArrayLiteralExpression(value) ||
    value.elements.some((node) => !ts.isObjectLiteralExpression(node))
  )
    throw new Error(`${name} must be an explicit array of objects`);
  return value;
}
function discussionData(data) {
  const required = ['title', 'prompt', 'text', 'question', 'answer'];
  if (!data || typeof data !== 'object' || Array.isArray(data))
    throw new Error('Discussion must be a JSON object');
  if (Object.keys(data).some((key) => ![...required, 'followup'].includes(key)))
    throw new Error('Unknown discussion field');
  for (const key of required)
    if (typeof data[key] !== 'string' || !data[key].trim())
      throw new Error(`Discussion requires ${key}`);
  if (
    data.followup !== undefined &&
    (!data.followup ||
      typeof data.followup !== 'object' ||
      Object.keys(data.followup).some(
        (key) => !['question', 'answer'].includes(key),
      ) ||
      ['question', 'answer'].some(
        (key) =>
          typeof data.followup[key] !== 'string' || !data.followup[key].trim(),
      ))
  )
    throw new Error('followup requires question and answer');
  return { material: 'experiment', ...data };
}

/** Add or update one lesson's binding without touching its preset or other lessons. */
export async function embedCircuit({
  lessonPath,
  presetPath,
  presetExport,
  discussionPath,
  dryRun = false,
}) {
  if (
    !presetExport ||
    !ts.isIdentifierText(presetExport, ts.ScriptTarget.Latest)
  )
    throw new Error('A named preset export is required');
  const lesson = await realpath(lessonPath),
    preset = await realpath(presetPath);
  const owner = dirname(lesson),
    local = relative(owner, preset);
  if (
    !local ||
    preset === lesson ||
    isAbsolute(local) ||
    local.startsWith('..' + sep) ||
    local === '..' ||
    resolve(owner, local) !== preset ||
    !['.ts', '.tsx'].includes(extname(preset))
  )
    throw new Error(
      'The preset must be a TypeScript file inside the lesson folder',
    );
  const [original, presetText, discussionText] = await Promise.all([
    readFile(lesson, 'utf8'),
    readFile(preset, 'utf8'),
    readFile(discussionPath, 'utf8'),
  ]);
  const discussion = discussionData(JSON.parse(discussionText));
  const source = sourceFile(lesson, original),
    presetSource = sourceFile(preset, presetText);
  const exported = presetSource.statements.some(
    (statement) =>
      ts.isVariableStatement(statement) &&
      statement.modifiers?.some(
        (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
      ) &&
      statement.declarationList.declarations.some(
        (declaration) =>
          ts.isIdentifier(declaration.name) &&
          declaration.name.text === presetExport,
      ),
  );
  if (!exported)
    throw new Error(`Preset must declare export const ${presetExport}`);
  const declaration = source.statements
    .filter(ts.isVariableStatement)
    .filter((statement) =>
      statement.modifiers?.some(
        (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
      ),
    )
    .flatMap((statement) => [...statement.declarationList.declarations])
    .find((node) => ts.isIdentifier(node.name) && node.name.text === 'content');
  const content = declaration?.initializer;
  if (
    !content ||
    !ts.isObjectLiteralExpression(content) ||
    content.properties.some((node) => !ts.isPropertyAssignment(node))
  )
    throw new Error(
      'Expected export const content initialized with an explicit object',
    );
  const materials = arrayProperty(content, 'classroomMaterials'),
    slides = arrayProperty(content, 'slides');
  for (const [array, key] of [
    [materials, 'kind'],
    [slides, 'material'],
  ]) {
    if (array.elements.some((node) => !literalField(node, key)))
      throw new Error(`Each ${key} must be a string literal`);
  }
  const modulePath =
    './' +
    local
      .split(sep)
      .join('/')
      .replace(/\.tsx?$/, '');
  const imports = source.statements.filter(ts.isImportDeclaration);
  let binding;
  for (const node of imports) {
    if (
      !ts.isStringLiteral(node.moduleSpecifier) ||
      node.moduleSpecifier.text !== modulePath ||
      node.importClause?.isTypeOnly
    )
      continue;
    const names = node.importClause?.namedBindings;
    if (names && ts.isNamedImports(names))
      binding = names.elements.find(
        (name) =>
          !name.isTypeOnly &&
          (name.propertyName?.text ?? name.name.text) === presetExport,
      )?.name.text;
    if (binding) break;
  }
  const existing = property(content, 'experiment');
  if (
    existing &&
    (!binding ||
      !ts.isIdentifier(existing.initializer) ||
      existing.initializer.text !== binding)
  )
    throw new Error(
      'This lesson already has a different experiment; no files changed',
    );
  const edits = [];
  const insert = (at, text) => edits.push({ start: at, end: at, text });
  const replace = (node, text) =>
    edits.push({ start: node.getStart(source), end: node.end, text });
  if (!binding) {
    const names = new Set();
    function visit(node) {
      if (ts.isIdentifier(node)) names.add(node.text);
      ts.forEachChild(node, visit);
    }
    visit(source);
    binding = 'embeddedCircuit';
    for (let i = 2; names.has(binding); i++) binding = `embeddedCircuit${i}`;
    insert(
      imports.at(-1)?.end ?? 0,
      `\nimport { ${presetExport} as ${binding} } from ${JSON.stringify(modulePath)};\n`,
    );
  }
  if (!existing)
    insert(content.getStart(source) + 1, `\nexperiment: ${binding},`);
  const experimentMaterials = materials.elements.filter(
    (node) => literalField(node, 'kind') === 'experiment',
  );
  const experimentSlides = slides.elements.filter(
    (node) => literalField(node, 'material') === 'experiment',
  );
  if (experimentMaterials.length > 1 || experimentSlides.length > 1)
    throw new Error(
      'Multiple experiment entries require an explicit edit; no files changed',
    );
  for (const [array, current, value] of [
    [
      materials,
      experimentMaterials[0],
      { kind: 'experiment', title: discussion.title },
    ],
    [slides, experimentSlides[0], discussion],
  ]) {
    if (current) replace(current, JSON.stringify(value));
    else
      insert(
        array.getStart(source) + 1,
        JSON.stringify(value) + (array.elements.length ? ',' : ''),
      );
  }
  let updated = original;
  for (const edit of edits.sort((a, b) => b.start - a.start))
    updated =
      updated.slice(0, edit.start) + edit.text + updated.slice(edit.end);
  updated = await format(updated, {
    ...(await resolveConfig(lesson)),
    filepath: lesson,
  });
  const changed = updated !== original;
  if (changed && !dryRun) {
    if ((await readFile(lesson, 'utf8')) !== original)
      throw new Error('Lesson changed during preparation; no files changed');
    await writeFile(lesson, updated);
  }
  return { lesson, changed, dryRun, source: updated };
}

async function main() {
  const { values } = parseArgs({
    options: {
      lesson: { type: 'string' },
      preset: { type: 'string' },
      export: { type: 'string' },
      discussion: { type: 'string' },
      'dry-run': { type: 'boolean' },
      help: { type: 'boolean' },
    },
  });
  if (values.help) {
    console.log(
      'Usage: node embed.mjs --lesson <lesson.ts> --preset <experiment.ts> --export <presetName> --discussion <discussion.json> [--dry-run]',
    );
    return;
  }
  for (const key of ['lesson', 'preset', 'export', 'discussion'])
    if (!values[key]) throw new Error(`Missing --${key}`);
  const result = await embedCircuit({
    lessonPath: values.lesson,
    presetPath: values.preset,
    presetExport: values.export,
    discussionPath: values.discussion,
    dryRun: values['dry-run'],
  });
  console.log(
    values['dry-run']
      ? result.source
      : JSON.stringify(
          { lesson: result.lesson, changed: result.changed },
          null,
          2,
        ),
  );
}
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
