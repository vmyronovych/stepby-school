// Run after changing reference markup: node src/courses/web-development/scripts/generate-web-targets.cjs
const { mkdir } = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('@playwright/test');
const {
  loadTypeScript,
} = require('../../../../tests/helpers/load-typescript.cjs');
const { webLessonPractice } = loadTypeScript(
  'src/courses/web-development/ui/lessons.ts',
);
const { project3MapReference, project3MapReferenceHeight } = loadTypeScript(
  'src/courses/web-development/lessons/mini-project-3/tasks.ts',
);
const { embedLessonMedia } = loadTypeScript(
  'src/courses/web-development/shared/content/media.ts',
);

(async () => {
  const outputRoot = path.resolve(
    process.argv[2] || path.join(__dirname, '..'),
  );
  const targets = Object.entries(webLessonPractice).flatMap(
    ([lesson, { tasks }]) => tasks.map((task) => ({ lesson, task })),
  );
  targets.push({
    lesson: 'mini-project-3',
    task: {
      id: 'project3-discovery-map',
      reference: project3MapReference,
      referenceHeight: project3MapReferenceHeight,
    },
  });
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({
      viewport: { width: 720, height: 420 },
      deviceScaleFactor: 1,
    });
    for (const { lesson, task } of targets) {
      const folder = path.join(outputRoot, 'lessons', lesson, 'assets');
      await mkdir(folder, { recursive: true });
      await page.setViewportSize({
        width: 720,
        height: task.referenceHeight ?? 420,
      });
      await page.mouse.move(0, 0);
      await page.setContent(embedLessonMedia(task.reference));
      await page
        .locator('img')
        .evaluateAll((images) =>
          Promise.all(images.map((img) => img.decode())),
        );
      await page.waitForFunction(() =>
        [...document.querySelectorAll('audio, video')].every(
          (media) => media.readyState >= 1,
        ),
      );
      if (task.referenceTimeMs !== undefined)
        await page.evaluate((time) => {
          for (const animation of document.getAnimations()) {
            animation.pause();
            animation.currentTime = time;
          }
        }, task.referenceTimeMs);
      if (task.referenceHover) await page.locator(task.referenceHover).hover();
      await page.screenshot({ path: path.join(folder, task.id + '.png') });
    }
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
