const { test, expect } = require('@playwright/test');
const { readFile } = require('node:fs/promises');

async function definitionCanvas(page) {
  await page.setContent(`
    <style>.blocklyPath { fill: rgb(35, 139, 137); } .blocklyText { font: 16px Arial; }</style>
    <div id="myBlockCanvas"><svg xmlns="http://www.w3.org/2000/svg" width="600" height="200">
      <defs><filter id="shadow"><feGaussianBlur stdDeviation="1"/></filter></defs>
      <g class="blocklyWorkspace"><g class="blocklyBlockCanvas">
        <g class="my_block_body blocklyBlock blocklyNotDeletable" transform="translate(30,30)">
          <rect class="blocklyPath" width="150" height="60"/>
          <text class="blocklyText" x="10" y="35">Перша команда</text>
        </g>
        <g class="my_block_body blocklyBlock blocklyNotDeletable" transform="translate(280,100)">
          <rect class="blocklyPath" width="180" height="60"/>
          <text class="blocklyText" x="10" y="35">Друга команда</text>
        </g>
      </g></g>
    </svg></div>`);
}

test('Mcar SVG capture includes fixed definition roots and preserves standalone styles', async ({
  page,
}) => {
  const { captureBlockSvgs, DEFINITION_BLOCKS } =
    await import('../../.agents/skills/capture-mcar/scripts/capture-blocks.mjs');
  await definitionCanvas(page);
  const pieces = await captureBlockSvgs(page, DEFINITION_BLOCKS);
  expect(pieces).toHaveLength(2);
  for (const [index, piece] of pieces.entries()) {
    expect(piece.svg).toContain(
      index === 0 ? 'Перша команда' : 'Друга команда',
    );
    expect(piece.svg).toContain('rgb(35, 139, 137)');
    expect(piece.svg).toContain('id="shadow"');
    await page.setContent(piece.svg);
    await expect(page.locator('svg')).toBeVisible();
    expect(
      await page
        .locator('.blocklyPath')
        .evaluate((node) => getComputedStyle(node).fill),
    ).toBe('rgb(35, 139, 137)');
    const root = await page.locator('svg').boundingBox();
    const block = await page.locator('.blocklyBlock').boundingBox();
    expect(block.x).toBeGreaterThanOrEqual(root.x);
    expect(block.x + block.width).toBeLessThanOrEqual(root.x + root.width);
  }
});

test('Mcar PNG capture covers all definition stacks without silently taking only the first', async ({
  page,
}, testInfo) => {
  const { captureBlockPng, DEFINITION_BLOCKS } =
    await import('../../.agents/skills/capture-mcar/scripts/capture-blocks.mjs');
  await definitionCanvas(page);
  const output = testInfo.outputPath('definitions.png');
  const box = await captureBlockPng(page, output, DEFINITION_BLOCKS);
  expect(box.width).toBe(430);
  expect(box.height).toBe(130);
  const png = await readFile(output);
  expect(png.subarray(1, 4).toString()).toBe('PNG');
  expect(png.readUInt32BE(16)).toBe(430);
  expect(png.readUInt32BE(20)).toBe(130);
});
