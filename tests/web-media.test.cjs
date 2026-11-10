const { test } = require('node:test');
const assert = require('node:assert/strict');
const { loadTypeScript } = require('./helpers/load-typescript.cjs');
const { embedLessonImages, restoreLessonImages, lessonImageAssets, isLessonImageSource } = loadTypeScript('src/features/web-development/media.ts');

test('local image references embed in HTML and CSS and restore to editable filenames', () => {
  const source = '<style>body {background-image:url("meadow.svg")}</style><img src="flower.svg" alt="Квітка"><img src=leaf.svg><img data-src="rabbit.svg" src="bird.svg">';
  const embedded = embedLessonImages(source);
  for (const name of ['flower.svg', 'leaf.svg', 'bird.svg', 'meadow.svg'])
    assert.ok(embedded.includes(lessonImageAssets.find(asset => asset.filename === name).src));
  assert.ok(embedded.includes('data-src="rabbit.svg"'));
  assert.equal(restoreLessonImages(embedded), source.replace('src=leaf.svg', 'src="leaf.svg"'));
  assert.equal(embedLessonImages(embedded), embedded);
  assert.equal(embedLessonImages('<img src="https://example.com/flower.svg">'), '<img src="https://example.com/flower.svg">');
});

test('only original SVG data and embedded raster images pass the preview image allowlist', () => {
  for (const asset of lessonImageAssets) assert.equal(isLessonImageSource(asset.src), true);
  for (const source of ['https://example.com/a.png', 'flower.svg', 'data:image/svg+xml,<svg onload="alert(1)"></svg>', 'javascript:alert(1)'])
    assert.equal(isLessonImageSource(source), false);
  assert.equal(isLessonImageSource('data:image/png;base64,iVBORw0KGgo='), true);
});


test('embedding handles angle brackets and src-like text inside other attributes', () => {
  const source = '<img alt="a > b src=leaf.svg" src="flower.svg">';
  const embedded = embedLessonImages(source);
  assert.ok(embedded.includes('alt="a > b src=leaf.svg"'));
  assert.ok(embedded.includes(lessonImageAssets.find(asset => asset.filename === 'flower.svg').src));
  assert.equal(restoreLessonImages(embedded), source);
});
