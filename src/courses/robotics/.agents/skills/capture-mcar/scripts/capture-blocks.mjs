export const PROGRAM_BLOCKS =
  '#blocklyDiv .blocklyWorkspace > .blocklyBlockCanvas > .blocklyBlock';
export const DEFINITION_BLOCKS =
  '#myBlockCanvas .blocklyWorkspace > .blocklyBlockCanvas > .blocklyBlock';

export async function captureBlockSvgs(page, selector = PROGRAM_BLOCKS) {
  await page.locator(selector).first().waitFor({ state: 'visible' });
  await page.evaluate(() => document.fonts.ready);
  return await page.locator(selector).evaluateAll((nodes) =>
    nodes.map((node) => {
      const box = node.getBBox(),
        clone = node.cloneNode(true);
      clone.removeAttribute('transform');
      const originals = [node, ...node.querySelectorAll('*')],
        copies = [clone, ...clone.querySelectorAll('*')];
      originals.forEach((el, i) => {
        const css = getComputedStyle(el);
        for (const prop of [
          'fill',
          'stroke',
          'stroke-width',
          'font-family',
          'font-size',
          'font-weight',
          'font-style',
          'text-anchor',
          'display',
          'visibility',
          'opacity',
        ])
          copies[i].style.setProperty(prop, css.getPropertyValue(prop));
      });
      const defs = new XMLSerializer().serializeToString(
        node.closest('svg').querySelector('defs') ||
          document.createElementNS('http://www.w3.org/2000/svg', 'defs'),
      );
      const w = Math.ceil(box.width + 32),
        h = Math.ceil(box.height + 32);
      return {
        width: w,
        height: h,
        svg: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" height="${h}" viewBox="${box.x - 16} ${box.y - 16} ${w} ${h}"><rect x="${box.x - 16}" y="${box.y - 16}" width="${w}" height="${h}" fill="#fff"/>${defs}${new XMLSerializer().serializeToString(clone)}</svg>`,
      };
    }),
  );
}

export async function captureBlockPng(page, output, selector = PROGRAM_BLOCKS) {
  await page.locator(selector).first().waitFor({ state: 'visible' });
  await page.evaluate(() => document.fonts.ready);
  const boxes = await page.locator(selector).evaluateAll((nodes) =>
    nodes.map((node) => {
      const r = node.getBoundingClientRect();
      return { x: r.x, y: r.y, right: r.right, bottom: r.bottom };
    }),
  );
  const x = Math.floor(Math.min(...boxes.map((b) => b.x)));
  const y = Math.floor(Math.min(...boxes.map((b) => b.y)));
  const width = Math.ceil(Math.max(...boxes.map((b) => b.right))) - x;
  const height = Math.ceil(Math.max(...boxes.map((b) => b.bottom))) - y;
  await page.screenshot({
    path: output,
    clip: { x, y, width, height },
    animations: 'disabled',
  });
  return { width, height };
}

export async function openBlockDefinition(
  page,
  project,
  definitionId,
  loadProject,
) {
  const definition = project.workspace.myBlocks?.find(
    (item) => item.id === definitionId,
  );
  if (!definition) throw new Error(`Unknown block definition: ${definitionId}`);
  const temporary = structuredClone(project);
  temporary.workspace.blocks.blocks = [
    {
      type: 'usb_start',
      x: 40,
      y: 40,
      next: { block: { type: 'my_block_call', extraState: { definitionId } } },
    },
  ];
  await loadProject(temporary);
  await page
    .locator('#blocklyDiv .blocklyBlockCanvas .blocklyText')
    .filter({ hasText: definition.name })
    .first()
    .dblclick()
    .catch(async (error) => {
      const labels = await page
        .locator('#blocklyDiv .blocklyBlockCanvas .blocklyText')
        .allTextContents();
      throw new Error(
        `Cannot open definition ${definitionId}: ${error.message}; visible labels: ${JSON.stringify(labels)}`,
      );
    });
  await page.locator('#myBlockDialog').waitFor({ state: 'visible' });
  return DEFINITION_BLOCKS;
}
