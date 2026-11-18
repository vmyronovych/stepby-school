const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { loadTypeScript } = require('./helpers/load-typescript.cjs');
const { embedAvMedia, restoreAvMedia, lessonAvAssets, isLessonAvSource } = loadTypeScript('src/features/web-development/av-media.ts');
const { embedLessonMedia, restoreLessonMedia, lessonImageAssets } = loadTypeScript('src/features/web-development/media.ts');

test('original audio/video/caption sources match downloadable bytes and allowed playback kinds', () => {
  for (const asset of lessonAvAssets) {
    const data = Buffer.from(asset.src.split(',')[1], 'base64');
    assert.deepEqual(data, fs.readFileSync('assets/web-development/av/' + asset.filename));
    assert.equal(isLessonAvSource(asset.src, asset.mime.startsWith('audio') ? 'audio' : asset.mime.startsWith('video') ? 'video' : 'track'), true);
    assert.equal(isLessonAvSource('https://example.com/' + asset.filename, 'source'), false);
  }
  assert.equal(isLessonAvSource(lessonAvAssets[0].src, 'video'), false);
  assert.equal(isLessonAvSource(lessonAvAssets[2].src, 'source'), false);
});

test('media embedding changes real src and video poster attributes while preserving unrelated quoted content', () => {
  const original = `<video title="Example: src='motion.webm'" data-note="poster='leaf.svg'" poster="leaf.svg"><source src="./motion.webm" type="video/webm"><track src=motion.vtt kind="captions"></video><audio src='signal.wav'></audio><p>motion.webm</p>`;
  const embedded = embedLessonMedia(original);
  assert.ok(embedded.includes(`title="Example: src='motion.webm'"`));
  assert.ok(embedded.includes(`data-note="poster='leaf.svg'"`));
  assert.ok(embedded.includes('poster="' + lessonImageAssets.find(asset => asset.filename === 'leaf.svg').src + '"'));
  for (const asset of lessonAvAssets) assert.ok(embedded.includes(asset.src));
  assert.ok(embedded.includes('<p>motion.webm</p>'));
  assert.equal(restoreLessonMedia(embedded), original.replace('./motion.webm', 'motion.webm').replace('src=motion.vtt', 'src="motion.vtt"'));
  const unrelated = `<video title="Example: src='motion.webm'" src="https://example.com/v.webm"></video>`;
  assert.equal(embedAvMedia(unrelated), unrelated);
  assert.equal(restoreAvMedia(unrelated), unrelated);
});
