const { chromium } = require('@playwright/test');
const fs = require('node:fs/promises');
(async () => {
  const browser = await chromium.launch();
  let base64;
  try {
    const page = await browser.newPage();
    base64 = await page.evaluate(async () => {
      const canvas = document.createElement('canvas');
      canvas.width = 320;
      canvas.height = 180;
      const ctx = canvas.getContext('2d');
      function draw(t) {
        ctx.fillStyle = '#ecfeff';
        ctx.fillRect(0, 0, 320, 180);
        ctx.strokeStyle = '#0f766e';
        ctx.lineWidth = 4;
        ctx.strokeRect(10, 10, 300, 160);
        ctx.fillStyle = '#99f6e4';
        ctx.fillRect(30, 80, 260, 20);
        ctx.fillStyle = '#115e59';
        ctx.beginPath();
        ctx.arc(45 + 230 * t, 90, 15, 0, Math.PI * 2);
        ctx.fill();
      }
      draw(0);
      const stream = canvas.captureStream(10);
      const recorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp8',
        videoBitsPerSecond: 80000,
      });
      const chunks = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size) chunks.push(event.data);
      };
      const done = new Promise((resolve) => (recorder.onstop = resolve));
      recorder.start();
      const start = performance.now();
      await new Promise((resolve) => {
        function tick() {
          const t = Math.min((performance.now() - start) / 4000, 1);
          draw(t);
          if (t < 1) requestAnimationFrame(tick);
          else resolve();
        }
        tick();
      });
      recorder.stop();
      await done;
      stream.getTracks().forEach((track) => track.stop());
      const bytes = new Uint8Array(
        await new Blob(chunks, { type: 'video/webm' }).arrayBuffer(),
      );
      let binary = '';
      for (const byte of bytes) binary += String.fromCharCode(byte);
      return btoa(binary);
    });
    await fs.mkdir('assets/web-development/av', { recursive: true });
    await fs.writeFile(
      'assets/web-development/av/motion.webm',
      Buffer.from(base64, 'base64'),
    );
  } finally {
    await browser.close();
  }
  const folder = 'assets/web-development/av/';
  const wav = Buffer.alloc(44 + 4800 * 2);
  wav.write('RIFF');
  wav.writeUInt32LE(wav.length - 8, 4);
  wav.write('WAVEfmt ', 8);
  wav.writeUInt32LE(16, 16);
  wav.writeUInt16LE(1, 20);
  wav.writeUInt16LE(1, 22);
  wav.writeUInt32LE(8000, 24);
  wav.writeUInt32LE(16000, 28);
  wav.writeUInt16LE(2, 32);
  wav.writeUInt16LE(16, 34);
  wav.write('data', 36);
  wav.writeUInt32LE(9600, 40);
  for (let i = 0; i < 4800; i++)
    wav.writeInt16LE(
      Math.trunc(
        6500 *
          Math.sin((2 * Math.PI * 440 * i) / 8000) *
          Math.min(i / 400, 1, (4800 - i) / 400),
      ),
      44 + i * 2,
    );
  await fs.writeFile(folder + 'signal.wav', wav);
  await fs.writeFile(
    folder + 'motion.vtt',
    'WEBVTT\n\n00:00.000 --> 00:04.500\nКругла позначка рухається вправо. Мовлення немає.\n',
  );
  const definitions = [
    ['signal.wav', 'Тональний сигнал', 'audio/wav'],
    ['motion.webm', 'Рух позначки без звуку', 'video/webm'],
    ['motion.vtt', 'Українські описи відео', 'text/vtt'],
  ];
  const assets = [];
  const entries = [];
  for (const [filename, label, mime] of definitions) {
    const data = await fs.readFile(folder + filename);
    assets.push({
      filename,
      label,
      mime,
      src: 'data:' + mime + ';base64,' + data.toString('base64'),
    });
    entries.push({ filename, data });
  }
  const prettier = require('prettier');
  await fs.writeFile(
    'src/features/web-development/av-assets.ts',
    await prettier.format(
      '// Original local teaching media. Generated from assets/web-development/av/.\nexport const lessonAvAssets = ' +
        JSON.stringify(assets, null, 2) +
        ';\n',
      { parser: 'typescript', singleQuote: true },
    ),
  );
  const { loadTypeScript } = require('../tests/helpers/load-typescript.cjs');
  const { zipStore } = loadTypeScript(
    'src/features/documents/services/workbook.ts',
  );
  await fs.writeFile(
    folder + 'media.zip',
    zipStore(
      entries.map((entry) => ({ name: entry.filename, data: entry.data })),
    ),
  );
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
