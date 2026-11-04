// Run after changing reference markup: node scripts/generate-web-targets.cjs
const { mkdir } = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('@playwright/test');
const { loadTypeScript } = require('../tests/helpers/load-typescript.cjs');
const { webTasks } = loadTypeScript('src/features/web-development/tasks.ts');
const { formattingTasks } = loadTypeScript('src/features/web-development/formatting-tasks.ts');
const { cssIntroTasks } = loadTypeScript('src/features/web-development/css-intro-tasks.ts');

(async () => {
  const folder = path.resolve(__dirname, '../assets/web-development');
  await mkdir(folder, { recursive: true });
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 720, height: 420 }, deviceScaleFactor: 1 });
    for (const task of [...webTasks, ...formattingTasks, ...cssIntroTasks]) {
      await page.setViewportSize({ width: 720, height: task.referenceHeight ?? 420 });
      await page.setContent(task.reference);
      await page.screenshot({ path: path.join(folder, task.id + '.png') });
    }
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
