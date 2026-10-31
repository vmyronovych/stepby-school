import { build, context } from 'esbuild';
const options = {
  entryPoints: ['src/main.tsx'],
  outfile: 'assets/app.js',
  bundle: true,
  format: 'iife',
  globalName: 'ReactUI',
  target: ['es2020'],
  minify: true,
  legalComments: 'linked',
  define: { 'process.env.NODE_ENV': '"production"' },
};
if (process.argv.includes('--watch')) {
  const ctx = await context(options);
  await ctx.watch();
  await ctx.serve({ servedir: '.', host: '127.0.0.1', port: 5173 });
  console.log('StepBy School: http://127.0.0.1:5173 (watching src/)');
} else {
  await build(options);
}
