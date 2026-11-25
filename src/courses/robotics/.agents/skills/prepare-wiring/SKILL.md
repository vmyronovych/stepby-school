---
name: robotics-prepare-wiring
description: Generate and verify Mcar wiring, editable projects and captured block programs for the StepBy School robotics course. Use when circuitry, block programs or their rendered assets change.
---

Read the course [CLAUDE.md](../../../CLAUDE.md), especially electrical and image requirements. Run commands from the repository root. Use the existing neighboring Mcar checkout (`../mcar` by default); inspect script arguments before choosing a different location.

Choose only the workflow needed by the change:

- Program projects: `node src/courses/robotics/scripts/generate-projects.mjs ../mcar` regenerates the course project set. Review the generated diff; do not run it for an image-only or prose-only change.
- Lesson 8 captures: `node src/courses/robotics/scripts/render-mcar.mjs ../mcar`.
- Other Mcar captures: `node src/courses/robotics/scripts/render-course.mjs --lessons=7`; use the relevant lesson numbers. The renderer requires an existing Mcar `web/dist` build. Inspect the renderer when changing a shared wiring figure.
- The first three circuit examples and wire-game illustration: `node src/courses/robotics/scripts/render-circuits.mjs`.
- Shared line decision diagrams: `node src/courses/robotics/scripts/render-line-diagrams.mjs`.

Generators write canonical course files. `npm run build` publishes them to the existing site URLs. Do not edit published copies.

Run `check.mjs ../mcar` and `check-course.mjs ../mcar` from the course's `scripts/` path, followed by the repository checks required in CLAUDE.md. Inspect the rendered result in its lesson at desktop and mobile sizes. A successful circuit simulation does not replace checking wire routing, readable labels and traceable capture sources.

If Mcar is unavailable, report the blocked generation/check precisely; do not draw a substitute that pretends to be a verified Mcar capture.
