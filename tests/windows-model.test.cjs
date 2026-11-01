const {test}=require('node:test');
const assert=require('node:assert/strict');
const {loadTypeScript}=require('./helpers/load-typescript.cjs');
const model=loadTypeScript('src/features/windows/engine/model.ts');
const {wn}=model;

function create(directory,kind) {
 const previous=new Set(directory.kids.map(node=>node.id));
 model.wnCreate(directory.id,kind,'desk');
 const node=directory.kids.find(node=>!previous.has(node.id));
 assert(node);
 return node;
}

test('Windows demo filesystem has unique IDs, correct parents, and resolvable paths',()=>{
 model.wnReset();
 const nodes=[];
 function visit(node,parent) {
  nodes.push(node);
  if(parent)assert.equal(wn.up[node.id],parent.id);
  for(const child of node.kids)visit(child,node);
 }
 visit(wn.root,null);visit(wn.bin,null);
 assert.equal(new Set(nodes.map(node=>node.id)).size,nodes.length);
 assert.equal(Object.keys(wn.by).length,nodes.length);
 assert.equal(model.wnResolve('Документи'),wn.sp.docs);
 assert.equal(model.wnResolve('C:\\Users\\Учень\\Desktop'),wn.sp.desk);
 assert.equal(model.wnResolve('D:'),wn.root.kids.find(node=>node.drive==='D').id);
 assert.equal(model.wnReal(wn.sp.docs),'C:\\Users\\Учень\\Documents');
 assert.equal(model.wnWritable(wn.root.id),0);
 assert.equal(model.wnWritable(wn.sp.docs),1);
});

test('Windows creates unique folders and renames a file while preserving its hidden extension',()=>{
 model.wnReset();
 const first=create(wn.desk,'dir'),second=create(wn.desk,'dir');
 assert.equal(first.name,'Нова папка');
 assert.equal(second.name,'Нова папка (2)');
 const file=create(wn.desk,'txt');
 model.wnRename(file.id,'Мій текст',false);
 assert.equal(model.wnFull(file,true),'Мій текст.txt');
 assert.equal(file.ext,'txt');
 assert.equal(wn.up[file.id],wn.desk.id);
});

test('Windows trash and restore retain file contents and remove deletion metadata',()=>{
 model.wnReset();
 const file=create(wn.desk,'txt');
 file.text='Український текст';file.size=new Blob([file.text]).size;
 const originalParent=wn.up[file.id];
 model.wnTrash([file.id]);
 assert(model.wnInBin(file.id));
 assert.equal(file.orig,originalParent);
 assert.equal(wn.up[file.id],wn.bin.id);
 model.wnRestore([file.id]);
 assert.equal(model.wnInBin(file.id),false);
 assert.equal(wn.up[file.id],originalParent);
 assert.equal(file.text,'Український текст');
 assert.equal(file.orig,undefined);assert.equal(file.del,undefined);
});

test('Windows copies a folder recursively with new IDs and moves it without changing IDs',()=>{
 model.wnReset();
 const folder=create(wn.desk,'dir');
 const file=create(folder,'txt');file.text='Збережений текст';
 let copied=[];
 model.wnTransfer([folder.id],wn.sp.docs,'copy',ids=>{copied=ids;});
 assert.equal(copied.length,1);
 const copy=wn.by[copied[0]];
 assert.notEqual(copy.id,folder.id);
 assert.notEqual(copy.kids[0].id,file.id);
 assert.equal(copy.kids[0].text,file.text);
 assert.equal(wn.up[copy.kids[0].id],copy.id);
 const driveD=wn.root.kids.find(node=>node.drive==='D');
 model.wnTransfer([copy.id],driveD.id,'move');
 assert.equal(wn.by[copy.id],copy);
 assert.equal(wn.up[copy.id],driveD.id);
 assert.equal(wn.by[wn.sp.docs].kids.includes(copy),false);
});

test('Windows explorer history and text save preserve the current in-memory filesystem',()=>{
 model.wnReset();
 const folder=create(wn.by[wn.sp.docs],'dir');
 const explorer=model.wnOpenExplorer(wn.sp.docs);
 model.wnNav(explorer,folder.id);
 assert.equal(model.wnTab(explorer).loc,folder.id);
 model.wnBack(explorer);assert.equal(model.wnTab(explorer).loc,wn.sp.docs);
 model.wnFwd(explorer);assert.equal(model.wnTab(explorer).loc,folder.id);
 model.wnUp(explorer);assert.equal(model.wnTab(explorer).loc,wn.sp.docs);
 const file=create(folder,'txt');
 const note=model.wnOpenApp('notepad',file.id);
 note.text='Новий текст';note.dirty=true;
 model.wnSaveNote(note);
 assert.equal(file.text,'Новий текст');
 assert.equal(file.size,new Blob([file.text]).size);
 assert.equal(note.dirty,false);
});
