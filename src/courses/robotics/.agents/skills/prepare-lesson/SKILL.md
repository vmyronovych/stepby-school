---
name: robotics-prepare-lesson
description: Create or revise a StepBy School robotics lesson, its teaching sequence and classroom/practice/teacher materials. Use for lesson content changes, not mechanical file moves.
---

Read the course [CLAUDE.md](../../../CLAUDE.md) and [progression](../../../docs/progression.md). Paths in this skill are relative to its directory; run commands from the repository root.

1. Read the target lesson and its prerequisites in `lessons/`. Identify what pupils already know and the one new capability they must demonstrate.
2. Edit the target lesson's metadata/content. Reuse `shared/` only for material that already has multiple consumers. Keep unique visuals and projects in the lesson directory.
3. Follow the course [layout rules](../../../docs/layout-guidelines.md). Associate each explanation with its material; keep distinct teacher and pupil deliverables.
4. If a circuit or program changes, use [prepare-wiring](../prepare-wiring/SKILL.md). Otherwise reuse the existing verified assets.
5. Run the course and repository checks listed in the course rules. Inspect the target's four modes and its transition from prerequisites; shared UI changes require the whole-course browser scenario.

Report the learning change, affected lessons and actual verification. Do not change neighboring lessons merely to make their wording uniform.
