const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createHash } = require('node:crypto');
const { loadTypeScript } = require('./helpers/load-typescript.cjs');
const baseline = require('./fixtures/documents-baseline.json');
const content = loadTypeScript('src/features/documents/content/index.ts');
const sha = (value) => createHash('sha256').update(value).digest('hex');

function unpackStoredZip(bytes) {
  const data = Buffer.from(bytes);
  const entries = new Map();
  let offset = 0;
  while (data.readUInt32LE(offset) === 0x04034b50) {
    assert.equal(data.readUInt16LE(offset + 8), 0, 'ZIP method is store');
    const size = data.readUInt32LE(offset + 18);
    const nameLength = data.readUInt16LE(offset + 26);
    const extraLength = data.readUInt16LE(offset + 28);
    const name = data.subarray(offset + 30, offset + 30 + nameLength).toString();
    const start = offset + 30 + nameLength + extraLength;
    const value = data.subarray(start, start + size);
    assert.equal(content.crc32(value), data.readUInt32LE(offset + 14));
    entries.set(name, value.toString());
    offset = start + size;
  }
  assert.equal(data.readUInt32LE(offset), 0x02014b50, 'ZIP central directory follows files');
  assert.equal(data.readUInt32LE(data.length - 22), 0x06054b50, 'ZIP end record exists');
  assert.equal(data.readUInt16LE(data.length - 12), entries.size);
  return entries;
}

function unescapeXml(text) {
  return text.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}

function workbookRows(files) {
  const strings = [...files.get('xl/sharedStrings.xml').matchAll(/<t xml:space="preserve">([\s\S]*?)<\/t>/g)]
    .map((match) => unescapeXml(match[1]));
  return [...files.get('xl/worksheets/sheet1.xml').matchAll(/<c r="A(\d+)" t="s"><v>(\d+)<\/v><\/c>/g)]
    .map((match, index) => {
      assert.equal(Number(match[1]), index + 1, 'column A has consecutive row numbers');
      return strings[Number(match[2])];
    });
}

test('document IDs, lesson text, static SVG, anchors and projector metadata match the original source', () => {
  const definitions = content.composeDocuments();
  assert.deepEqual(Object.keys(definitions).filter((id) => !['web-page', 'text-formatting', 'css-intro', 'lists-lines', 'page-images', 'web-review', 'mini-project-1'].includes(id)).sort(), Object.keys(baseline.documents).sort());
  for (const [id, expected] of Object.entries(baseline.documents)) {
    const actual = definitions[id];
    assert.equal(actual.title, expected.title, id);
    assert.equal(actual.app, expected.app, id);
    assert.equal(sha(actual.html), expected.htmlSHA256, id);
    assert.equal(actual.html, actual.html, 'cached content is stable');
  }
});

test('React projector documents no longer expose obsolete imperative lifecycle hooks', () => {
  for (const [id, doc] of Object.entries(content.composeDocuments())) {
    if (!id.endsWith('-keyboard') && !id.endsWith('-windows')) continue;
    assert.equal(doc.init, undefined, id);
    assert.equal(doc.onSub, undefined, id);
    assert.equal(doc.leave, undefined, id);
    assert.match(doc.html, /class="inf-mount"/);
  }
});

test('school calendar retains 32 Monday lessons, semester split and spare Monday', () => {
  const { INFO } = content;
  assert.equal(INFO.dates.length, 32);
  assert.equal(INFO.dates[0], '2026-09-07');
  assert.equal(INFO.dates.at(-1), '2027-05-24');
  assert.equal(INFO.s2, 16);
  assert.deepEqual(INFO.spare, ['2027-05-31']);
  assert(!INFO.dates.includes('2027-03-08'));
  assert(INFO.dates.every((date) => new Date(date + 'T12:00:00Z').getUTCDay() === 1));
  assert.throws(() => content.lessonDates({ ...INFO.calendar, lessons: 100 }), /навчальних днів/);
});

for (const g of ['g3', 'g4']) {
  for (const segment of ['all', 's1', 's2']) {
    test(`NIT ${g} ${segment}: original workbook bytes and exact lesson order`, () => {
      const { bytes, filename } = content.buildNitWorkbook(g, segment);
      const expected = baseline.workbooks[g + '-' + segment];
      assert.equal(sha(bytes), expected.bytesSHA256);
      const files = unpackStoredZip(bytes);
      assert.equal(files.size, 7);
      assert.match(files.get('xl/workbook.xml'), /<sheet name="План навчання" sheetId="1"/);
      const rows = workbookRows(files);
      assert.deepEqual(rows, ['Зміст робіт', ...expected.rows]);
      assert.equal(rows.length, { all: 33, s1: 16, s2: 18 }[segment]);
      assert(rows.slice(1).every((row) => row.startsWith('Інструктаж з БЖД.')));
      const suffix = { all: '', s1: '-І-семестр', s2: '-ІІ-семестр' }[segment];
      assert.equal(filename, `Інформатика-${g.slice(1)}-клас${suffix}.xlsx`);
    });
  }
}

test('unknown NIT segments use the original all-lessons fallback', () => {
  assert.deepEqual(content.buildNitWorkbook('g3', 'unknown'), content.buildNitWorkbook('g3', 'all'));
});

test('workbook strings preserve XML-sensitive characters and duplicate row references', () => {
  const values = ['A & B', '<topic> "quote"', 'A & B'];
  const files = unpackStoredZip(content.xlsxOneColumn('A & B', 'Header', values));
  assert.deepEqual(workbookRows(files), ['Header', ...values]);
  assert.match(files.get('xl/workbook.xml'), /name="A &amp; B"/);
  assert.equal(content.crc32(new TextEncoder().encode('123456789')), 0xcbf43926);
});
