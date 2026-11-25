import { context } from 'esbuild';
import { distRoot, requireBuiltSite } from './site-files.mjs';

requireBuiltSite();
const ctx = await context({});
const stop = async () => {
  await ctx.dispose();
  process.exit(0);
};
process.once('SIGINT', stop);
process.once('SIGTERM', stop);
const { port } = await ctx.serve({
  servedir: distRoot,
  host: '127.0.0.1',
  port: Number(process.env.STEPBY_PORT ?? 5173),
});
console.log(
  `StepBy School preview: http://127.0.0.1:${port} (dist; no rebuild)`,
);
