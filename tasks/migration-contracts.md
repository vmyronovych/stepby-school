# Migration contracts

## Foundation and assembly

All mathematical helpers use explicit ES imports. Their modules do not register tools.
`defineTool<Model>(id, definition)` creates the public heterogeneous `ToolDefinition`.
The typed internal definition accepts `ToolConfig`, returns `Model`, and receives typed model steps.
The adapter tracks built model identity before invoking callbacks through the unknown facade.
`build` alone determines model inference; callback parameters use `NoInfer<Model>`.
Step callbacks receive the actual step selected from that model, plus `index`, `anim`, and optional mounted `root`.
Animation payloads remain `unknown` at the app boundary. Consumers must narrow them before field access.
`registerTools(definitions)` validates all IDs before mutating the catalog, with duplicate checks.
Application composition calls it once after importing definitions.
The existing `engineState` remains the single route-state mirror; no second app store is introduced.

## Shared mathematical and rendering types

- `Rational`: `{ n: number; d: number }`, preserving the current numeric rational arithmetic.
- `FormulaNode`: discriminated recursive AST with `t`, optional `fid`, and fields specific to each node.
- `Polynomial`: `Rational[]`, coefficients in ascending degree order.
- `Pen`: `{ writing: true; order: number } | { writing: false; order?: number }`.
- `FormulaOptions`: optional formula-ID marks with class and badge.
- `GridCell`, `GridRow`: notebook cells, optional corner superscripts, and underline rows.
- `ColumnMark`, `ColumnNote`, `ColumnStep`, `ColumnSheet`: column arithmetic, scratch operations, snapshots, and flights.
- `NumberLinePoint`, `NumberLineRange`, `NumberLineConfig`: interval diagram boundaries and rendering inputs.

`FormulaNode` includes the same text, IDs, operators, and output markup as the previous source.
BigInt irrational arithmetic remains feature-local and distinct from `Rational`.
Pure helpers can be imported without mounting the app or reading the DOM.
Navigation and toast utilities use the existing typed `runtimeServices` service object.
No source patches, implicit global app lookup, or new ordered loader are introduced.

## Tests

Each feature exports one domain entry point that includes its definitions and pure model helpers.
A bundled test import uses one registry/catalog/state instance throughout that domain.
Tests can call pure builders for mathematics. Views call the public definition's own `build` first.
This preserves the model identity contract at the heterogeneous dispatch boundary.
