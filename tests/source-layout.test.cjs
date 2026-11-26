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
    if (!/\/(engine|math|runtime)\b|\/notebook\/rendering\//.test(filename))
      continue;
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
    'ui/index.ts',
    'ui/index.tsx',
    'runtime/index.ts',
    'routing.ts',
    'tools/circuit/index.ts',
    'tools/keyboard/index.ts',
    'tools/windows/index.ts',
    'documents/index.ts',
    'shared/documents/index.ts',
  ]);
  const composition = new Set([
    'src/app/course-pages.ts',
    'src/app/composition.ts',
    'src/app/tools/registry.ts',
    'src/app/tools/ToolInputs.tsx',
    'src/app/documents/registry.ts',
    'src/app/documents/views.tsx',
    'src/app/documents/services.ts',
    'src/app/documents/navigation.ts',
    'src/app/catalog/registry.ts',
    'src/app/navigation/course-registry.ts',
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
          if (/\/src\/(lib)\//.test(filename))
            assert(
              !target.includes('/src/app/'),
              'Shared foundations must not import application composition: ' +
                filename +
                ' → ' +
                target,
            );
          if (
            filename.endsWith('/src/app/navigation/course-registry.ts') &&
            target.includes('/src/courses/')
          )
            assert(
              target.endsWith('/routing.ts'),
              'Navigation may compose only data-only routing entries: ' +
                target,
            );
          if (courseOf(filename))
            assert(
              !target.includes('/src/app/'),
              'Courses receive application functions through parameters: ' +
                filename +
                ' → ' +
                target,
            );
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
                path
                  .relative(path.join(coursesRoot, toCourse), target)
                  .split(path.sep)
                  .join('/'),
              ),
              'Private course import: ' + filename + ' → ' + target,
            );
            assert(
              composition.has(path.relative(root, filename)),
              'Only application composition may import a course: ' + filename,
            );
          }
          const lesson = filename.match(/\/lessons\/([^/]+)\//)?.[1];
          const targetLesson = target.match(/\/lessons\/([^/]+)\//)?.[1];
          if (lesson && targetLesson)
            assert.equal(
              lesson,
              targetLesson,
              'Cross-lesson import: ' + filename + ' → ' + target,
            );
          if (fromCourse)
            assert(
              !/\/src\/(app|data)\//.test(target),
              'Courses receive application data through their interface: ' +
                filename +
                ' → ' +
                target,
            );
          if (fromCourse && filename.includes('/shared/'))
            assert(
              !targetLesson,
              'Shared course code must receive lesson-specific data: ' +
                filename,
            );
          // A tool's public entry lives with that tool, including for course consumers.
          const toolRoot = target.match(
            /^(.*\/courses\/[^/]+\/tools\/[^/]+)\//,
          )?.[1];
          if (toolRoot && !filename.startsWith(toolRoot + '/'))
            assert.equal(
              target,
              toolRoot + '/index.ts',
              'Import tools through their own public entry: ' +
                filename +
                ' → ' +
                target,
            );
        }
      }
      ts.forEachChild(node, check);
    }
    check(source);
  }
});

test('shared components own their implementation and expose explicit public entries', () => {
  const componentsRoot = path.join(root, 'src/components') + path.sep;
  const moduleOf = (filename) =>
    filename.startsWith(componentsRoot)
      ? path.relative(componentsRoot, filename).split(path.sep)[0]
      : null;
  const lowLevel = new Set([
    'notebook/handwriting/index.ts',
    'notebook/grid/index.ts',
    'notebook/inputs/index.ts',
    'notebook/rendering/index.ts',
  ]);
  for (const [filename, source] of files) {
    const owner = moduleOf(filename);
    if (owner)
      assert(
        filename.includes(path.sep + owner + path.sep),
        'Component must own a directory: ' + filename,
      );
    for (const statement of source.statements) {
      if (
        !ts.isImportDeclaration(statement) &&
        !ts.isExportDeclaration(statement)
      )
        continue;
      const specifier = statement.moduleSpecifier;
      if (!specifier || !ts.isStringLiteral(specifier)) continue;
      const target = ts.resolveModuleName(
        specifier.text,
        filename,
        config.options,
        ts.sys,
      ).resolvedModule?.resolvedFileName;
      if (!target) continue;
      if (owner) {
        assert(
          !/\/src\/(courses|app|data)\//.test(target),
          'Components receive course data through their interface: ' +
            filename +
            ' → ' +
            target,
        );
      }
      const targetOwner = moduleOf(target);
      if (targetOwner && owner !== targetOwner) {
        const relative = path
          .relative(componentsRoot, target)
          .split(path.sep)
          .join('/');
        assert(
          new RegExp('^' + targetOwner + '/index\\.tsx?$').test(relative) ||
            lowLevel.has(relative),
          'Private component import: ' + filename + ' → ' + target,
        );
      }
    }
  }
});

test('the repository uses course ownership instead of a parallel features tree', () => {
  assert.equal(fs.existsSync(path.join(root, 'src/features')), false);
});

test('shared mathematics has no browser or application dependencies', () => {
  assert.equal(fs.existsSync(path.join(root, 'src/engines')), false);
  const mathRoot = path.join(root, 'src/lib/math') + path.sep;
  for (const [filename, source] of files.filter(([filename]) =>
    filename.startsWith(mathRoot),
  )) {
    for (const statement of source.statements) {
      if (
        !ts.isImportDeclaration(statement) &&
        !ts.isExportDeclaration(statement)
      )
        continue;
      const specifier = statement.moduleSpecifier;
      if (!specifier || !ts.isStringLiteral(specifier)) continue;
      const target = ts.resolveModuleName(
        specifier.text,
        filename,
        config.options,
        ts.sys,
      ).resolvedModule?.resolvedFileName;
      assert(
        target?.startsWith(mathRoot),
        'Mathematics must be independent: ' + filename + ' → ' + specifier.text,
      );
    }
  }
  const program = ts.createProgram([path.join(mathRoot, 'index.ts')], {
    strict: true,
    noEmit: true,
    target: ts.ScriptTarget.ES2022,
    lib: ['lib.es2022.d.ts'],
    types: [],
    skipLibCheck: true,
  });
  const diagnostics = ts.getPreEmitDiagnostics(program);
  assert.deepEqual(
    diagnostics.map((d) =>
      ts.flattenDiagnosticMessageText(d.messageText, '\n'),
    ),
    [],
  );
});

test('navigation belongs to the application and the shared runtime tree is removed', () => {
  assert.equal(fs.existsSync(path.join(root, 'src/navigation')), false);
  assert.equal(fs.existsSync(path.join(root, 'src/runtime')), false);
});
