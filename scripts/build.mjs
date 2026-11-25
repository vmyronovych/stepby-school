import { build, context } from 'esbuild';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  cleanDist,
  createPublisher,
  distRoot,
  projectRoot,
  siteInputs,
} from './site-files.mjs';

cleanDist();
const publish = createPublisher();
const options = {
  absWorkingDir: projectRoot,
  entryPoints: ['src/main.tsx'],
  outfile: join(distRoot, 'assets/app.js'),
  bundle: true,
  format: 'iife',
  globalName: 'StepBySchool',
  target: ['es2020'],
  charset: 'utf8',
  minify: true,
  legalComments: 'linked',
  define: { 'process.env.NODE_ENV': '"production"' },
  plugins: [
    {
      name: 'site-publication',
      setup(builder) {
        builder.onStart(() => {
          publish();
        });
        builder.onLoad({ filter: /src\/main\.tsx$/ }, (args) => {
          const inputs = siteInputs();
          return {
            contents: readFileSync(args.path, 'utf8'),
            loader: 'tsx',
            watchFiles: inputs.files.map((file) => file.source),
            watchDirs: inputs.directories,
          };
        });
      },
    },
  ],
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
  const { port } = await ctx.serve({
    servedir: distRoot,
    host: '127.0.0.1',
    port: Number(process.env.STEPBY_PORT ?? 5173),
  });
  console.log(
    `StepBy School: http://127.0.0.1:${port} (dist; watching code, HTML, styles and course materials)`,
  );
} else {
  await build(options);
}
