/* =========================================================
   ІНФОРМАТИКА — файл планування для НІТ (xlsx)
   ---------------------------------------------------------
   Формат узято зі шаблону НІТ: одна книга, аркуш «План навчання», єдиний
   стовпець A. A1 — заголовок «Зміст робіт», далі по рядку на урок у порядку
   КТП. Номерів і дат у файлі немає — НІТ проставляє їх сам за розкладом.
   Теми йдуть повністю, з префіксом «Інструктаж з БЖД.».
   xlsx збирається тут же (zip без стиснення), без бібліотек і мережі.
   ========================================================= */
const NIT_SHEET="План навчання", NIT_HEADER="Зміст робіт";

let crcTable=null;
function crc32(u8){
  if(!crcTable){
    crcTable=new Uint32Array(256);
    for(let i=0;i<256;i++){ let c=i; for(let k=0;k<8;k++) c=(c&1)?(0xEDB88320^(c>>>1)):(c>>>1); crcTable[i]=c>>>0; }
  }
  let c=0xFFFFFFFF;
  for(let i=0;i<u8.length;i++) c=crcTable[(c^u8[i])&0xFF]^(c>>>8);
  return (c^0xFFFFFFFF)>>>0;
}

/* zip без стиснення (метод 0) — цього досить, xlsx і є zip */
function zipStore(entries){
  const te=new TextEncoder();
  const items=entries.map(e=>({name:te.encode(e.name), data:e.data, crc:crc32(e.data), off:0}));
  let local=0, central=0;
  for(const it of items){ local+=30+it.name.length+it.data.length; central+=46+it.name.length; }
  const out=new Uint8Array(local+central+22), dv=new DataView(out.buffer);
  let p=0;
  for(const it of items){
    it.off=p;
    dv.setUint32(p,0x04034b50,true); dv.setUint16(p+4,20,true); dv.setUint16(p+6,0x0800,true);
    dv.setUint16(p+8,0,true); dv.setUint16(p+10,0,true); dv.setUint16(p+12,0,true);
    dv.setUint32(p+14,it.crc,true); dv.setUint32(p+18,it.data.length,true); dv.setUint32(p+22,it.data.length,true);
    dv.setUint16(p+26,it.name.length,true); dv.setUint16(p+28,0,true);
    p+=30; out.set(it.name,p); p+=it.name.length; out.set(it.data,p); p+=it.data.length;
  }
  const cdStart=p;
  for(const it of items){
    dv.setUint32(p,0x02014b50,true); dv.setUint16(p+4,20,true); dv.setUint16(p+6,20,true);
    dv.setUint16(p+8,0x0800,true); dv.setUint16(p+10,0,true);
    dv.setUint16(p+12,0,true); dv.setUint16(p+14,0,true);
    dv.setUint32(p+16,it.crc,true); dv.setUint32(p+20,it.data.length,true); dv.setUint32(p+24,it.data.length,true);
    dv.setUint16(p+28,it.name.length,true); dv.setUint16(p+30,0,true); dv.setUint16(p+32,0,true);
    dv.setUint16(p+34,0,true); dv.setUint16(p+36,0,true); dv.setUint32(p+38,0,true);
    dv.setUint32(p+42,it.off,true);
    p+=46; out.set(it.name,p); p+=it.name.length;
  }
  dv.setUint32(p,0x06054b50,true); dv.setUint16(p+4,0,true); dv.setUint16(p+6,0,true);
  dv.setUint16(p+8,items.length,true); dv.setUint16(p+10,items.length,true);
  dv.setUint32(p+12,p-cdStart,true); dv.setUint32(p+16,cdStart,true); dv.setUint16(p+20,0,true);
  return out;
}

/* мінімальний xlsx: один аркуш, один стовпець рядків */
function xlsxOneColumn(sheetName, header, rows){
  const NS="http://schemas.openxmlformats.org/spreadsheetml/2006/main";
  const REL="http://schemas.openxmlformats.org/officeDocument/2006/relationships";
  const map=new Map(), si=[];
  const idx=s=>{ if(!map.has(s)){ map.set(s, si.length); si.push(s); } return map.get(s); };
  const cells=[header].concat(rows).map((s,i)=>({r:i+1, s:idx(s)}));
  const xml=s=>'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+s;

  const parts=[
    ["[Content_Types].xml", xml('<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'+
      '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'+
      '<Default Extension="xml" ContentType="application/xml"/>'+
      '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>'+
      '<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'+
      '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>'+
      '<Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/>'+
      '</Types>')],
    ["_rels/.rels", xml('<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+
      '<Relationship Id="rId1" Type="'+REL+'/officeDocument" Target="xl/workbook.xml"/></Relationships>')],
    ["xl/workbook.xml", xml('<workbook xmlns="'+NS+'" xmlns:r="'+REL+'"><sheets>'+
      '<sheet name="'+esc(sheetName)+'" sheetId="1" r:id="rId1"/></sheets></workbook>')],
    ["xl/_rels/workbook.xml.rels", xml('<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+
      '<Relationship Id="rId1" Type="'+REL+'/worksheet" Target="worksheets/sheet1.xml"/>'+
      '<Relationship Id="rId2" Type="'+REL+'/styles" Target="styles.xml"/>'+
      '<Relationship Id="rId3" Type="'+REL+'/sharedStrings" Target="sharedStrings.xml"/></Relationships>')],
    ["xl/styles.xml", xml('<styleSheet xmlns="'+NS+'">'+
      '<fonts count="1"><font><sz val="11"/><name val="Calibri"/></font></fonts>'+
      '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>'+
      '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>'+
      '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>'+
      '<cellXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/></cellXfs>'+
      '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>')],
    ["xl/sharedStrings.xml", xml('<sst xmlns="'+NS+'" count="'+cells.length+'" uniqueCount="'+si.length+'">'+
      si.map(s=>'<si><t xml:space="preserve">'+esc(s)+'</t></si>').join("")+'</sst>')],
    ["xl/worksheets/sheet1.xml", xml('<worksheet xmlns="'+NS+'">'+
      '<dimension ref="A1:A'+cells.length+'"/><sheetViews><sheetView workbookViewId="0"/></sheetViews>'+
      '<sheetFormatPr defaultRowHeight="15"/><cols><col min="1" max="1" width="70" customWidth="1"/></cols>'+
      '<sheetData>'+cells.map(c=>'<row r="'+c.r+'"><c r="A'+c.r+'" t="s"><v>'+c.s+'</v></c></row>').join("")+
      '</sheetData></worksheet>')]
  ];

  const te=new TextEncoder();
  return zipStore(parts.map(p=>({name:p[0], data:te.encode(p[1])})));
}

// частина року для файлу: усі уроки, І або ІІ семестр
const NIT_SEG = {
  all:{label:'усі уроки', suffix:''},
  s1: {label:'І семестр', suffix:'-І-семестр'},
  s2: {label:'ІІ семестр', suffix:'-ІІ-семестр'},
};
function nitNums(seg){
  const out = [];
  for(let i=1; i<=INFO.calendar.lessons; i++){
    if(seg==='s1' && i>=INFO.s2) continue;
    if(seg==='s2' && i<INFO.s2) continue;
    out.push(i);
  }
  return out;
}

function downloadNit(g, seg){
  const s = NIT_SEG[seg] ? seg : 'all', nums = nitNums(s);
  if(!nums.length) return;
  const bytes = xlsxOneColumn(NIT_SHEET, NIT_HEADER, nums.map(i=>INFO[g].ktp[i-1].topic));
  const blob = new Blob([bytes], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'Інформатика-'+g.slice(1)+'-клас'+NIT_SEG[s].suffix+'.xlsx';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url), 2000);
  toast('Файл для НІТ: '+INFO[g].label+', '+NIT_SEG[s].label+', '+nums.length+' '+infoPlural(nums.length,'тема','теми','тем'));
}
