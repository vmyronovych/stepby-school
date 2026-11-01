const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const ts=require('typescript');
const root=path.resolve(__dirname,'..');
const configFile=ts.readConfigFile(path.join(root,'tsconfig.json'),ts.sys.readFile);
const config=ts.parseJsonConfigFileContent(configFile.config,ts.sys,root);
const files=config.fileNames.map(filename=>[filename,ts.createSourceFile(filename,fs.readFileSync(filename,'utf8'),ts.ScriptTarget.Latest,true)]);

test('all application engines are strict TypeScript modules without a legacy loader',()=>{
 assert.equal(config.options.strict,true);
 for(const filename of ['js','scripts/engine-runtime.mjs','src/runtime/virtual.d.ts'])assert.equal(fs.existsSync(path.join(root,filename)),false,filename);
 for(const [filename,source] of files) {
  if(!filename.includes('/engine'))continue;
  assert.equal(ts.isExternalModule(source),true,filename);
  assert(!source.text.includes('@ts-nocheck'),filename);
  const visit=node=>{
   assert.notEqual(node.kind,ts.SyntaxKind.AnyKeyword,filename+' contains an any type');
   ts.forEachChild(node,visit);
  };
  visit(source);
 }
 const script=fs.readFileSync(path.join(root,'scripts/build.mjs'),'utf8');
 assert(!script.includes('engineRuntimePlugin'));
 assert(script.includes("format: 'iife'"));
});

test('the application value-import graph has no cycles',()=>{
 const known=new Set(files.map(([filename])=>filename));
 const graph=new Map(files.map(([filename,source])=>{
  const edges=[];
  for(const statement of source.statements) {
   if(!ts.isImportDeclaration(statement)&&!ts.isExportDeclaration(statement))continue;
   if(statement.isTypeOnly||!statement.moduleSpecifier)continue;
   if(ts.isImportDeclaration(statement)&&statement.importClause?.isTypeOnly)continue;
   const clause=ts.isImportDeclaration(statement)?statement.importClause?.namedBindings:statement.exportClause;
   if(clause&&ts.isNamedImports(clause)&&clause.elements.length&&clause.elements.every(element=>element.isTypeOnly))continue;
   const specifier=statement.moduleSpecifier;
   if(!ts.isStringLiteral(specifier))continue;
   const resolved=ts.resolveModuleName(specifier.text,filename,config.options,ts.sys).resolvedModule?.resolvedFileName;
   if(resolved&&known.has(resolved))edges.push(resolved);
  }
  return [filename,edges];
 }));
 const complete=new Set();
 function visit(filename,stack=[]) {
  assert(!stack.includes(filename),'Import cycle: '+[...stack,filename].map(p=>path.relative(root,p)).join(' → '));
  if(complete.has(filename))return;
  for(const target of graph.get(filename)||[])visit(target,[...stack,filename]);
  complete.add(filename);
 }
 for(const filename of graph.keys())visit(filename);
});
