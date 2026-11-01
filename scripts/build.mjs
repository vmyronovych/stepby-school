import { engineRuntimePlugin } from './engine-runtime.mjs';
import { build, context } from 'esbuild';
const options = {
  plugins: [engineRuntimePlugin()],
  entryPoints: ['src/main.tsx'],
  outfile: 'assets/app.js',
  bundle: true,
  format: 'iife',
  globalName: 'StepBySchool',
  target: ['es2020'],
  charset: 'utf8',
  minify: true,
  legalComments: 'linked',
  define: { 'process.env.NODE_ENV': '"production"' },
};
if (process.argv.includes('--watch')) {
  const ctx = await context(options);
  const stop = async () => {
    await ctx.dispose();
    process.exit(0);
  };
  process.once('SIGINT', stop);
  process.once('SIGTERM', stop);
  await ctx.watch();
  await ctx.serve({ servedir: '.', host: '127.0.0.1', port: 5173 });
  console.log('StepBy School: http://127.0.0.1:5173 (watching src/ and js/)');
} else {
  await build(options);
}
