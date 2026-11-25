const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const configFile = ts.readConfigFile(
  path.join(root, 'tsconfig.json'),
  ts.sys.readFile,
);
const config = ts.parseJsonConfigFileContent(configFile.config, ts.sys, root);
const files = config.fileNames.map((filename) => [
  filename,
  ts.createSourceFile(
    filename,
    fs.readFileSync(filename, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
  ),
]);

test('all application engines are strict TypeScript modules without a legacy loader', () => {
  assert.equal(config.options.strict, true);
  for (const filename of [
    'js',
    'scripts/engine-runtime.mjs',
    'src/runtime/virtual.d.ts',
  ])
    assert.equal(fs.existsSync(path.join(root, filename)), false, filename);
  for (const [filename, source] of files) {
    if (!filename.includes('/engine')) continue;
    assert.equal(ts.isExternalModule(source), true, filename);
    assert(!source.text.includes('@ts-nocheck'), filename);
    const visit = (node) => {
      assert.notEqual(
        node.kind,
        ts.SyntaxKind.AnyKeyword,
        filename + ' contains an any type',
      );
      ts.forEachChild(node, visit);
    };
    visit(source);
  }
  const script = fs.readFileSync(path.join(root, 'scripts/build.mjs'), 'utf8');
  assert(!script.includes('engineRuntimePlugin'));
  assert(script.includes("format: 'iife'"));
});

test('the application value-import graph has no cycles', () => {
  const known = new Set(files.map(([filename]) => filename));
  const graph = new Map(
    files.map(([filename, source]) => {
      const edges = [];
      for (const statement of source.statements) {
        if (
          !ts.isImportDeclaration(statement) &&
          !ts.isExportDeclaration(statement)
        )
          continue;
        if (statement.isTypeOnly || !statement.moduleSpecifier) continue;
        if (
          ts.isImportDeclaration(statement) &&
          statement.importClause?.isTypeOnly
        )
          continue;
        const clause = ts.isImportDeclaration(statement)
          ? statement.importClause?.namedBindings
          : statement.exportClause;
        if (
          clause &&
          ts.isNamedImports(clause) &&
          clause.elements.length &&
          clause.elements.every((element) => element.isTypeOnly)
        )
          continue;
        const specifier = statement.moduleSpecifier;
        if (!ts.isStringLiteral(specifier)) continue;
        const resolved = ts.resolveModuleName(
          specifier.text,
          filename,
          config.options,
          ts.sys,
        ).resolvedModule?.resolvedFileName;
        if (resolved && known.has(resolved)) edges.push(resolved);
      }
      return [filename, edges];
    }),
  );
  const complete = new Set();
  function visit(filename, stack = []) {
    assert(
      !stack.includes(filename),
      'Import cycle: ' +
        [...stack, filename].map((p) => path.relative(root, p)).join(' → '),
    );
    if (complete.has(filename)) return;
    for (const target of graph.get(filename) || [])
      visit(target, [...stack, filename]);
    complete.add(filename);
  }
  for (const filename of graph.keys()) visit(filename);
});

test('courses expose explicit entrypoints and lessons do not import their siblings', () => {
  const coursesRoot = path.join(root, 'src/courses') + path.sep;
  const courseOf = (filename) =>
    filename.startsWith(coursesRoot)
      ? path.relative(coursesRoot, filename).split(path.sep)[0]
      : null;
  const publicFiles = new Set([
    'index.ts',
    'ui.ts',
    'circuit.ts',
    'documents.ts',
  ]);
  const composition = new Set([
    'src/app/App.tsx',
    'src/app/services.tsx',
    'src/app/documentViews.tsx',
    'src/data/catalog.ts',
    'src/runtime/index.ts',
    'src/runtime/types.ts',
    'src/features/documents/content/index.ts',
  ]);
  for (const [filename, source] of files) {
    function check(node) {
      let specifier;
      if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node))
        specifier = node.moduleSpecifier;
      if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument))
        specifier = node.argument.literal;
      if (specifier && ts.isStringLiteral(specifier)) {
        const target = ts.resolveModuleName(
          specifier.text,
          filename,
          config.options,
          ts.sys,
        ).resolvedModule?.resolvedFileName;
        if (target) {
          const fromCourse = courseOf(filename),
            toCourse = courseOf(target);
          if (toCourse && fromCourse !== toCourse) {
            assert.equal(
              fromCourse,
              null,
              'Courses must not import one another: ' + filename,
            );
            assert(
              publicFiles.has(
                path.relative(path.join(coursesRoot, toCourse), target),
              ),
              'Private course import: ' + filename + ' → ' + target,
            );
            assert(
              composition.has(path.relative(root, filename)),
              'Only application composition may import a course: ' + filename,
            );
          }
          const lesson = filename.match(/\/lessons\/(lesson-\d+)\//)?.[1];
          const targetLesson = target.match(/\/lessons\/(lesson-\d+)\//)?.[1];
          if (lesson && targetLesson)
            assert.equal(
              lesson,
              targetLesson,
              'Cross-lesson import: ' + filename + ' → ' + target,
            );
          if (fromCourse && filename.includes('/shared/'))
            assert(
              !targetLesson,
              'Shared course code must receive lesson-specific data: ' +
                filename,
            );
        }
      }
      ts.forEachChild(node, check);
    }
    check(source);
  }
});
