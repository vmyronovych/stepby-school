# Remaining JavaScript migration baseline

Captured on 2026-11-01 before application source changes.

## Checks

| Command | Result |
| --- | --- |
| `npm run format:check` | Passed. All source files match Prettier. |
| `npm run build` | Passed, including strict TypeScript checking. |
| `npm test` | Passed: 127 tests, zero failures or skipped tests. |
| `npm run test:browser` | Passed: 31 Chromium scenarios in 6.6 seconds. |

Logs are preserved at `/tmp/stepby-baseline-{format,build,unit,browser}.log`.
These commands did not change tracked generated assets.

## Canonical behavior capture

`/tmp/stepby-migration-baseline.json` contains:

- All 77 catalog task models, built from their original configurations.
- All 656 rendered task-step strings, using `definition.view(model, { step, index, anim: null })`.
- All 23 document IDs, titles, HTML strings, and application flags.
- The complete topic catalog, including lesson prose and task configurations.

Every task model and step rendered successfully without DOM effects.
BigInt values use the JSON representation `{ "$bigint": "<integer>" }`.
The capture script is `/tmp/stepby-capture-baseline.mjs`.
The bundled original engine is `/tmp/stepby-baseline-engine.cjs`.
Final verification can bundle `src/runtime/index.ts` with esbuild, then run the same capture logic.
Compare parsed structures, including full model and step output, rather than only counts.

Browser test screenshots are preserved in `/tmp/stepby-baseline-screenshots/`:

- `notebook-desktop.png`
- `notebook-mobile.png`
- `windows-react.png`
- `circuit-react.png`

The four screenshots were visually inspected. Desktop controls, notebook formulas, and the mobile layout render correctly.

## Initial generated hashes

- `assets/app.js`: `64bbd7591e7f3e05cb07da8b2b70da14c7e5805bea01f84762aef988c87e3802`
- `assets/app.js.LEGAL.txt`: `cd7dec749043f2074e9799163f9c46a6ba714fd4889f07150cc1165c816ea1d3`

## Existing limits

The current unit tests load JavaScript engines through VM contexts.
The production engine uses source concatenation and regex patches.
These are the migration targets, not baseline failures.
