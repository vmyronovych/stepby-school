// Run after changing reference markup: node scripts/generate-web-targets.cjs
const { mkdir } = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('@playwright/test');
const { loadTypeScript } = require('../tests/helpers/load-typescript.cjs');
const { formsChoiceTasks } = loadTypeScript('src/features/web-development/forms-choice-tasks.ts');
const { review3Tasks } = loadTypeScript('src/features/web-development/web-review-3-tasks.ts');
const { project3Tasks } = loadTypeScript('src/features/web-development/project3-tasks.ts');
const { project3MapReference, project3MapReferenceHeight } = loadTypeScript('src/features/web-development/project3-tasks.ts');
const { blockElementsTasks } = loadTypeScript('src/features/web-development/block-elements-tasks.ts');
const { externalCssTasks } = loadTypeScript('src/features/web-development/external-css-tasks.ts');
const { flexBasicsTasks } = loadTypeScript('src/features/web-development/flex-basics-tasks.ts');
const { flexWrapTasks } = loadTypeScript('src/features/web-development/flex-wrap-tasks.ts');
const { formsTasks } = loadTypeScript('src/features/web-development/forms-tasks.ts');
const { webTasks } = loadTypeScript('src/features/web-development/tasks.ts');
const { formattingTasks } = loadTypeScript('src/features/web-development/formatting-tasks.ts');
const { cssIntroTasks } = loadTypeScript('src/features/web-development/css-intro-tasks.ts');

const { listsTasks } = loadTypeScript('src/features/web-development/lists-tasks.ts');

const { imagesTasks } = loadTypeScript('src/features/web-development/images-tasks.ts');
const { embedLessonImages } = loadTypeScript('src/features/web-development/media.ts');

const { reviewTasks } = loadTypeScript('src/features/web-development/review-tasks.ts');

const { projectTasks } = loadTypeScript('src/features/web-development/project-tasks.ts');

const { linksTasks } = loadTypeScript('src/features/web-development/links-tasks.ts');
const { imageLinksTasks } = loadTypeScript('src/features/web-development/image-links-tasks.ts');
const { tablesTasks } = loadTypeScript('src/features/web-development/tables-tasks.ts');
const { tableSpansTasks } = loadTypeScript('src/features/web-development/table-spans-tasks.ts');
const { review2Tasks } = loadTypeScript('src/features/web-development/review2-tasks.ts');

const { project2Tasks } = loadTypeScript('src/features/web-development/project2-tasks.ts');

(async () => {
  const folder = path.resolve(__dirname, '../assets/web-development');
  await mkdir(folder, { recursive: true });
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 720, height: 420 }, deviceScaleFactor: 1 });
    for (const task of [...webTasks, ...formattingTasks, ...cssIntroTasks, ...listsTasks, ...imagesTasks, ...reviewTasks, ...projectTasks, ...linksTasks, ...imageLinksTasks, ...tablesTasks, ...tableSpansTasks, ...review2Tasks, ...project2Tasks, ...blockElementsTasks, ...externalCssTasks, ...flexBasicsTasks, ...flexWrapTasks, ...formsTasks, ...formsChoiceTasks, ...review3Tasks, ...project3Tasks, { id: project3Tasks[0].id + '-map', reference: project3MapReference, referenceHeight: project3MapReferenceHeight }]) {
      await page.setViewportSize({ width: 720, height: task.referenceHeight ?? 420 });
      await page.setContent(embedLessonImages(task.reference));
      await page.locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
      await page.screenshot({ path: path.join(folder, task.id + '.png') });
    }
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
