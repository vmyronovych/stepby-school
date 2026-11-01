# Simulation migration contracts

Stage 0 dependency analysis, followed by the completed implementation recorded in the migration ledger.

## Keyboard

`js/info/show/keyboard.js` has no engine-source dependencies. Its native dependencies are `document`, `window`, `navigator.clipboard`, and timers. Migrate into `src/features/keyboard/engine/`:

- `presets.ts`: `KB_GROUPS`, `KB_PRESETS`, keyboard geometry, descriptions, modifier labels, and language metadata. Export immutable data with `KeyboardKey` / `KeyboardPreset` contracts.
- `editor.ts`: editor text, caret, anchor, undo history, overwrite mode, word/line navigation, edit commands. Keep the current in-memory state owner; pure edit functions must not mount an app.
- `controller.ts`: one state owner, subscriptions and stable snapshots, key handling, ghost/flash timers, and `KeyboardEngine` matching the existing controller interface.
- `index.ts`: the domain test entry point. Re-export controller, editor helpers, and presets.

The React `useKeyboardController` hook already owns keydown/keyup/blur listener installation and cleanup. `deactivate` clears the ghost timer; `releaseKeys` must clear every flash timer. Keep same-document preset updates separate from activation. Use `Set<() => void>` and typed timer sets rather than loose collections. Browser key input can use a structural contract for the event fields actually read; avoid fabricating a complete native event for click-to-type.

## Windows

Current actual source-level dependencies:

| Source | Dependencies |
| --- | --- |
| `10-model.js` | `INFO_MONTHS`, `esc`, publication (`wnRender`) |
| `20-icons.js` | Windows state (`wn.ver`, filesystem lookup) |
| `30-view.js` | model queries, icons, `WN_REACT.invalidate` |
| `40-input.js` | model operations, icons, view-model helpers, publication, `docReplaceSub`, `esc` |

The source already removed interactive template ownership. `30-view.js` contains view-model queries, static SVG helpers, menu sizing, and the publication shim. Convert into:

- `types.ts`: discriminated filesystem nodes, windows/dialogs, pointer interaction state, menus, clipboard, and explicit internal state fields.
- `data.ts`: demo filesystem construction, type/app/new-item metadata, keyboard layout, and view sizes. `INFO_MONTHS` should come from shared document calendar data or a formatting dependency.
- `state.ts`: one `wn` state owner and subscription/publication/focus-memory state. It exposes `invalidate` directly. Neither model operations nor view helpers import the controller.
- `model.ts`: filesystem operations, window operations, navigation, clipboard and save flow. Import `invalidate` from state for the few operations that publish directly.
- `icons.ts`: icons and wallpaper; depend on state and model queries only where currently required.
- `view-model.ts`: current `30-view.js` query helpers and static layout metadata. `wnRender` becomes an alias/wrapper around state publication; no controller import.
- `commands.ts`: menu building, pointer and keyboard commands, input events. Imports model, view-model, icons, and state. No imports point from those lower layers back to commands.
- `controller.ts`: mount, preset, toolbar, full-screen handling, observers, listeners and timers. Export existing `WindowsController` plus its typed helpers.
- `index.ts`: one domain test entry point.

Avoid the current cycle `model -> view-model -> controller -> model` by moving invalidation and focus-memory capture to `state.ts`. Command callbacks stored in dialog state must be typed; remove them when closing windows. Window union members need only their own fields: explorer tabs/navigation, application/file fields, properties fields, save dialog fields, or message dialog fields. Keep safe narrowing at React boundaries instead of one interface requiring every field on every variant.

Native boundary checks: `Event.target instanceof Element`, input/textarea guards for value/selection APIs, optional host queries, and a local keyboard-lock capability interface. Mount owns document/window listeners, `ResizeObserver`, clock, cast/balloon/slow timers, and scheduled frame work. Preserve focus restoration after synchronous publication.

## Circuit

Two cycles need explicit extraction:

1. `parts.js` reads `CIRC_WIRE_R` from `solver.js`; `solver.js` reads `CIRC.parts`.
2. `breadboard.js` reads `cbTerm` and `cbAddWire` from `sim.js`; `sim.js` reads breadboard helpers.

Convert into `src/features/circuit/engine/`:

- `types.ts`: parts/props/state/runtime, terminals/wires, boards/history, breadboard holes/placements/jumpers, discriminated electrical elements (`R`, `V`, `D`, `open`), solver results, drawing environment and interaction state.
- `constants.ts`: wire resistance/leak, schematic dimensions/grid and breadboard-independent constants.
- `parts.ts`: part definitions, exact property option contracts, init/elec/draw/paint/tick/action hooks. Imports shared constants, never solver/controller.
- `geometry.ts`: rotation/terminal/box/polyline/routing helpers. It depends on part definitions and types only.
- `board.ts`: board creation, add-wire/part, links, extraction/insertion, snapshots/restoration and clipboard. It must not import breadboard/controller.
- `solver.ts`: pure solver importing definitions, constants and types.
- `breadboard.ts`: mapping, placement, net joining, strip/jumper routing and SVG. Import `cbTerm` from geometry and `cbAddWire` from board.
- `audio.ts`: audio context and voices; release/disconnect voices on dispose.
- `controller.ts`: existing simulator session, SVG painting, interactions, frame lifecycle. It imports lower modules and React controller contracts.
- `state.ts`: circuit board/view/generation state, independent of document content. Robotics content should not own the simulator's mutable state.
- `index.ts`: one domain test entry point exposing pure solver/model helpers and the controller.

Current `dispose` cancels the main frame, stops pointer tracking, removes document keydown, releases held buttons and calls `cbSound([])`. Preserve those effects and audit any added scheduled frames. `cbSound([])` stops/disconnects oscillators; gains/context handling should remain explicit. No solver or board helper should read the DOM.

## Obsolete document hooks

All public keyboard, Windows, geometry and circuit document routes use `src/app/documentViews.tsx`. Keyboard/Windows IDs match `endsWith('-keyboard')` / `endsWith('-windows')`; their source documents are copied into React sections containing only title/html/app. The old hooks are discarded on this path. `INFO_SCREENS` can become typed title/icon/preset metadata. Remove its `open`, `sub`, `close` functions and the projector document `init`/`onSub`/`leave` hooks together. The Windows `sub` hook still calls removed `wnChips`, which is further evidence it is obsolete.

Keep the KTP document `init` handler: normal document routes still invoke it to download NIT workbooks. Robotics `sim` content currently has no lifecycle methods to remove; `CircuitProjector` exclusively mounts `CircuitEngine`.

The unused `wnOpen` / `wnHide` compatibility wrappers can be removed once no document metadata references remain. `kbOpen` / `kbClose` remain useful controller activate/deactivate implementations and can be renamed without changing their behavior.
