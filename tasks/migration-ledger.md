# JavaScript migration ledger

Completed migration inventory. Every original source has a typed replacement or a documented removal decision.
Top-level declarations below are export candidates, not a requirement to expose private helpers.
Dependencies come from TypeScript symbol resolution in the existing shared script scope.
`DB`, `S`, `DOCS`, navigation helpers, and `runtimeServices` are injected by the current build bridge.

## `js/core/column.js`

- Destination: `src/engines/core/column.ts`
- Status: migrated, integrated, and verified. Original JavaScript removed.
- Top-level declarations: `COL_FLY`, `COL_GAP`, `COL_ANN_CELLS`, `colCells`, `colPlain`, `colAsk`, `colMind`, `colWritten`, `colAnn`, `colAnnOf`, `colList`, `colNum`, `colSheet`, `colFly`, `colAddPlan`, `colAddRun`, `colToolBase`, `COL_GEN`, `COL_INS`.
- Shared dependencies: `js/core/handwriting.js`: `HW_DUR`, `HW_STEP`; `js/core/notebook.js`: `colGrid`.

## `js/core/formula.js`

- Destination: `src/engines/core/formula.ts`
- Status: migrated, integrated, and verified. Original JavaScript removed.
- Top-level declarations: `Q`, `qFromStr`, `qAdd`, `qNeg`, `qSub`, `qMul`, `qDiv`, `qNum`, `qIsZero`, `qEq`, `qKey`, `qSqrt`, `F`, `qAst`, `qAstP`, `tokenizeFormula`, `parseFormula`, `fStrip`, `polyTrim`, `polyDeg`, `polyAdd`, `polyMul`, `polyEval`, `constInt`, `toPoly`, `polyAst`, `SUPS`, `fmlText`, `renderFormula`, `formulaHtml`.
- Shared dependencies: `js/core/util.js`: `gcd`; `js/core/handwriting.js`: `hwGlyphs`, `hwTick`.

## `js/core/handwriting.js`

- Destination: `src/engines/core/handwriting.ts`
- Status: migrated, integrated, and verified. Original JavaScript removed.
- Top-level declarations: `HW_STEP`, `HW_DUR`, `HW`, `hwGlyphs`, `hwEqline`, `hwTick`.
- Shared dependencies: none.

## `js/core/notebook.js`

- Destination: `src/engines/core/notebook.ts`
- Status: migrated, integrated, and verified. Original JavaScript removed.
- Top-level declarations: `colGrid`, `mkRow`, `lessonNote`.
- Shared dependencies: `js/core/handwriting.js`: `hwGlyphs`; `js/core/registry.js`: `topicForTool`; `js/core/util.js`: `esc`.
- Build bridge dependencies: `hrefTopic`.

## `js/core/numline.js`

- Destination: `src/engines/core/numline.ts`
- Status: migrated, integrated, and verified. Original JavaScript removed.
- Top-level declarations: `NL_UID`, `numLine`.
- Shared dependencies: `js/core/handwriting.js`: `HW_DUR`, `HW_STEP`, `hwGlyphs`, `hwTick`; `js/core/formula.js`: `formulaHtml`.

## `js/core/registry.js`

- Destination: `src/engines/core/registry.ts`
- Status: migrated, integrated, and verified. Original JavaScript removed.
- Top-level declarations: `TOOL_REQUIRED`, `registerTool`, `toolDef`, `topicForTool`.
- Shared dependencies: none.
- Build bridge dependencies: `DB`, `S`.

## `js/core/util.js`

- Destination: `src/engines/core/util.ts`
- Status: migrated, integrated, and verified. Original JavaScript removed.
- Top-level declarations: `app`, `toast`, `esc`, `gcd`, `fmtNum`, `prefersReducedMotion`, `readField`.
- Shared dependencies: none.

## `js/geometry/scalar-product.js`

- Destination: `src/features/geometry/engines/scalar-product.ts`
- Status: migrated and integrated. Original source removed after exact parity and strict verification.
- Top-level declarations: `ScalarProduct`.
- Shared dependencies: none.

## `js/geometry/vector-notebook.js`

- Destination: `src/features/geometry/engines/vector-notebook.ts`
- Status: migrated and integrated. Original source removed after exact parity and strict verification.
- Top-level declarations: `VectorNotebook`.
- Shared dependencies: `js/core/handwriting.js`: `hwGlyphs`, `hwTick`; `js/core/formula.js`: `fmlText`, `renderFormula`; `js/core/util.js`: `esc`.

## `js/geometry/vector-practice.js`

- Destination: `src/features/geometry/engines/vector-practice.ts`
- Status: migrated and integrated. Original source removed after exact parity and strict verification.
- Top-level declarations: `VectorPractice`.
- Shared dependencies: none.

## `js/geometry/vector-scaling.js`

- Destination: `src/features/geometry/engines/vector-scaling.ts`
- Status: migrated and integrated. Original source removed after exact parity and strict verification.
- Top-level declarations: `VectorScaling`.
- Shared dependencies: none.

## `js/geometry/vectors.js`

- Destination: `src/features/geometry/engines/vectors.ts`
- Status: migrated and integrated. Original source removed after exact parity and strict verification.
- Top-level declarations: `VectorLesson`.
- Shared dependencies: none.

## `js/info/info.js`

- Destination: `src/features/documents/data/info.ts`.
- Status: TypeScript implementation complete; integrated into runtime composition. Document HTML hashes and all six workbook byte hashes match original source. Focused document tests: 11 passed.
- Top-level declarations: `INFO`, `INFO_MONTHS`, `lessonDates`, `infoDate`, `infoDateShort`, `infoPlural`.
- Shared dependencies: none.

## `js/info/ktp3.js`

- Destination: `src/features/documents/data/ktp3.ts`.
- Status: TypeScript implementation complete; integrated into runtime composition. Document HTML hashes and all six workbook byte hashes match original source. Focused document tests: 11 passed.
- Top-level declarations: .
- Shared dependencies: `js/info/info.js`: `INFO`.

## `js/info/ktp4.js`

- Destination: `src/features/documents/data/ktp4.ts`.
- Status: TypeScript implementation complete; integrated into runtime composition. Document HTML hashes and all six workbook byte hashes match original source. Focused document tests: 11 passed.
- Top-level declarations: .
- Shared dependencies: `js/info/info.js`: `INFO`.

## `js/info/nit.js`

- Destination: `src/features/documents/services/nit.ts` and `src/features/documents/services/workbook.ts`.
- Status: TypeScript implementation complete; integrated into runtime composition. Document HTML hashes and all six workbook byte hashes match original source. Focused document tests: 11 passed.
- Top-level declarations: `NIT_SHEET`, `NIT_HEADER`, `crcTable`, `crc32`, `zipStore`, `xlsxOneColumn`, `NIT_SEG`, `nitNums`, `downloadNit`.
- Shared dependencies: `js/core/util.js`: `esc`, `toast`; `js/info/info.js`: `INFO`, `infoPlural`.

## `js/info/plans3.js`

- Destination: `src/features/documents/data/plans3.ts`.
- Status: TypeScript implementation complete; integrated into runtime composition. Document HTML hashes and all six workbook byte hashes match original source. Focused document tests: 11 passed.
- Top-level declarations: .
- Shared dependencies: `js/info/info.js`: `INFO`.

## `js/info/plans4.js`

- Destination: `src/features/documents/data/plans4.ts`.
- Status: TypeScript implementation complete; integrated into runtime composition. Document HTML hashes and all six workbook byte hashes match original source. Focused document tests: 11 passed.
- Top-level declarations: .
- Shared dependencies: `js/info/info.js`: `INFO`.

## `js/info/sections.js`

- Destination: `src/features/documents/content/info-sections.ts`.
- Status: TypeScript implementation complete; integrated into runtime composition. Document HTML hashes and all six workbook byte hashes match original source. Focused document tests: 11 passed.
- Top-level declarations: `INFO_SCREENS`.
- Shared dependencies: `js/info/show/keyboard.js`: `KB_GROUPS`, `KB_PRESETS`, `kbApply`, `kbClose`, `kbOpen`; `js/info/show/win/40-input.js`: `WN_PRESETS`, `wnFit`, `wnHide`, `wnOpen`; `js/info/show/win/10-model.js`: `wn`, `wnLayoutDesk`; `js/info/show/win/30-view.js`: `wnRender`; `js/info/info.js`: `INFO`, `infoDate`, `infoDateShort`, `infoPlural`; `js/core/util.js`: `esc`; `js/info/nit.js`: `downloadNit`.
- Build bridge dependencies: `DB`, `docTopicFor`, `hrefDoc`, `hrefHome`, `hrefTopic`.

## `js/info/show/keyboard.js`

- Destination: `src/features/keyboard/engine/keyboard.ts`
- Status: migrated and integrated. Original source removed after exact parity and strict verification.
- Top-level declarations: `KB_GROUPS`, `KB_PRESETS`, `KB_HINT`, `KB_KEYS`, `KB_BY`, `KB_DESC`, `KB_KEY_DESC`, `kbDesc`, `kbName`, `kb`, `keyboardListeners`, `keyboardFlashTimers`, `keyboardSnapshot`, `kbSnapshot`, `kbPublish`, `kbOpen`, `kbClose`, `kbApply`, `KB_COMBOS`, `KB_MOD_ORDER`, `kbModType`, `kbCombo`, `kbComboDesc`, `kbLetterDesc`, `kbShowKey`, `KB_LANG_LABEL`, `kbSetLang`, `kbLangHotkey`, `kbLangOf`, `kbLeds`, `kbReleaseAll`, `kbKeyEvent`, `kbTypeKey`, `kbClip`, `kbTypeRender`, `KeyboardEngine`.
- Shared dependencies: none.

## `js/info/show/win/10-model.js`

- Destination: `src/features/windows/engine/model.ts, window-state.ts, contracts.ts`
- Status: migrated and integrated. Original source removed after exact parity and strict verification.
- Top-level declarations: `WN_BADCH`, `WN_TYPES`, `WN_APPS`, `WN_NEW`, `WN_KEYS`, `WN_VIEWS`, `WN_DICO`, `wnDemo`, `wn`, `wnW`, `wnH`, `wnTB`, `wnIndex`, `wnReset`, `wnPath`, `wnInBin`, `wnKey`, `wnFull`, `wnType`, `wnAppOf`, `wnReal`, `wnDrive`, `wnAdm`, `wnWritable`, `wnLocName`, `wnLocOk`, `wnUnique`, `wnNow`, `wnDt`, `wnDtLong`, `wnNum`, `wnKB`, `wnHuman`, `wnDirSize`, `wnCell`, `wnRows`, `wnCols`, `wnDeskItems`, `wnPlace`, `wnLayoutDesk`, `wnDeskSort`, `wnColl`, `wnSorted`, `wnSortOf`, `wnViewOf`, `wnWin`, `wnTab`, `wnHold`, `wnSelOnly`, `wnStartEdit`, `wnCommit`, `wnRename`, `wnCreate`, `wnDetach`, `wnFix`, `wnTrash`, `wnPurge`, `wnEmptyBin`, `wnRestore`, `wnClone`, `wnCopyName`, `wnTransfer`, `wnPaste`, `wnCopyTo`, `wnAdd`, `wnTop`, `wnFocus`, `wnClose`, `wnMin`, `wnMax`, `wnNewTab`, `wnSpot`, `wnOpenExplorer`, `wnOpenApp`, `wnOpenItem`, `wnProps`, `wnDialog`, `wnDlgBtn`, `wnDeny`, `wnNotepadAsk`, `wnSaveNote`, `wnNoteSave`, `wnSaveDlg`, `wnSaveAs`, `wnShowDesk`, `wnAppKey`, `wnTask`, `wnExpand`, `wnNav`, `wnBack`, `wnFwd`, `wnUpLoc`, `wnUp`, `wnResolve`.
- Shared dependencies: `js/info/info.js`: `INFO_MONTHS`; `js/core/util.js`: `esc`; `js/info/show/win/30-view.js`: `wnRender`.

## `js/info/show/win/20-icons.js`

- Destination: `src/features/windows/engine/icons.ts`
- Status: migrated and integrated. Original source removed after exact parity and strict verification.
- Top-level declarations: `wnSvg`, `WN_DEFS`, `WN_EMB10`, `WN_SP11`, `wnFolder`, `wnSpecial`, `WN_WINLOGO`, `WN_I`, `WN_BADGE`, `wnFileIco`, `wnIco`, `wnLocIco`, `WN_APPI`, `wnAppIco`, `WN_G`, `wnG`, `wnPicBody`, `wnPic`, `WN_WALL`.
- Shared dependencies: `js/info/show/win/10-model.js`: `wn`.

## `js/info/show/win/30-view.js`

- Destination: `src/features/windows/engine/view.ts, publication.ts`
- Status: migrated and integrated. Original source removed after exact parity and strict verification.
- Top-level declarations: `WN_COLS`, `WN_VPX`, `wnItCls`, `WN_PINNED`, `wnClock`, `wnLogo`, `WN_S10`, `WN_T10`, `WN_P11`, `WN_A11`, `wnFind`, `wnResIco`, `wnTitle`, `wnFlags`, `wnAddrText`, `wnShown`, `wnSearchIn`, `WN_DLGI`, `wnMenuItem`, `wnGrow`, `wnFitMenu`, `wnRender`.
- Shared dependencies: `js/info/show/win/10-model.js`: `WN_APPS`, `wn`, `wnAdm`, `wnDt`, `wnFull`, `wnH`, `wnKB`, `wnLocName`, `wnReal`, `wnSortOf`, `wnSorted`, `wnTB`, `wnTab`, `wnType`, `wnW`, `wnWritable`; `js/info/show/win/20-icons.js`: `WN_WINLOGO`, `wnAppIco`, `wnIco`, `wnSvg`; `js/info/show/win/40-input.js`: `WN_REACT`.

## `js/info/show/win/40-input.js`

- Destination: `src/features/windows/engine/input.ts, index.ts`
- Status: migrated and integrated. Original source removed after exact parity and strict verification.
- Top-level declarations: `wnPt`, `wnRectV`, `wnPressKey`, `wnKeyOf`, `wnModal`, `wnCell4`, `wnSurfEl`, `wnDomIds`, `wnRange`, `wnPDown`, `wnPMove`, `wnDropAt`, `wnDrop`, `wnPUp`, `wnNewItems`, `wnSortItems`, `wnSetView`, `wnClip`, `wnPin`, `wnCopyPath`, `wnPinText`, `wnItemMenu`, `wnDeskMenu`, `wnBgMenu`, `wnWinXMenu`, `wnTaskMenu`, `wnCtx`, `wnTabAdd`, `wnPropsApply`, `wnAct`, `wnCast`, `wnBalloon`, `wnArrow`, `wnJump`, `wnLang`, `wnLangNext`, `wnChar`, `wnLangMenu`, `wnKeyCmd`, `wnKeyDown`, `wnKeyUp`, `wnInput`, `WN_PRESETS`, `wnFit`, `wnClamp`, `wnOpen`, `wnHide`, `WN_REACT`.
- Shared dependencies: `js/info/show/win/10-model.js`: `WN_APPS`, `WN_BADCH`, `WN_KEYS`, `WN_NEW`, `WN_VIEWS`, `wn`, `wnAppKey`, `wnAppOf`, `wnBack`, `wnCell`, `wnClose`, `wnCols`, `wnCommit`, `wnCopyTo`, `wnCreate`, `wnDeskItems`, `wnDeskSort`, `wnDialog`, `wnDirSize`, `wnDlgBtn`, `wnDrive`, `wnDt`, `wnDtLong`, `wnEmptyBin`, `wnExpand`, `wnFocus`, `wnFull`, `wnFwd`, `wnH`, `wnHold`, `wnHuman`, `wnInBin`, `wnKB`, `wnLayoutDesk`, `wnLocName`, `wnMax`, `wnMin`, `wnNav`, `wnNewTab`, `wnNoteSave`, `wnNum`, `wnOpenApp`, `wnOpenExplorer`, `wnOpenItem`, `wnPaste`, `wnPath`, `wnPlace`, `wnProps`, `wnPurge`, `wnReal`, `wnRename`, `wnReset`, `wnResolve`, `wnRestore`, `wnRows`, `wnSaveAs`, `wnShowDesk`, `wnSortOf`, `wnSorted`, `wnStartEdit`, `wnTB`, `wnTab`, `wnTask`, `wnTransfer`, `wnTrash`, `wnType`, `wnUp`, `wnUpLoc`, `wnViewOf`, `wnW`, `wnWin`, `wnWritable`; `js/info/show/win/30-view.js`: `WN_A11`, `WN_COLS`, `WN_DLGI`, `WN_P11`, `WN_PINNED`, `WN_S10`, `WN_T10`, `WN_VPX`, `wnFind`, `wnFitMenu`, `wnFlags`, `wnGrow`, `wnItCls`, `wnLogo`, `wnMenuItem`, `wnRender`, `wnResIco`, `wnShown`, `wnTitle`; `js/info/show/win/20-icons.js`: `WN_DEFS`, `WN_I`, `WN_WALL`, `wnAppIco`, `wnFileIco`, `wnFolder`, `wnG`, `wnIco`, `wnLocIco`, `wnPic`, `wnSpecial`, `wnSvg`; `js/core/util.js`: `esc`.
- Build bridge dependencies: `docReplaceSub`.

## `js/robo/circuit/breadboard.js`

- Destination: `src/features/circuit/engine/breadboard.ts`
- Status: migrated and integrated. Original source removed after exact parity and strict verification.
- Top-level declarations: `BB`, `BB_UP`, `BB_DN`, `BB_JUMP`, `bbX`, `bbRailHole`, `bbIsRail`, `bbValid`, `bbStrip`, `bbKey`, `bbPt`, `bbLegs`, `cbUF`, `cbSchemNets`, `bbBattery`, `bbPB`, `bbLeads`, `bbOcc`, `bbBoardNets`, `cbSchemFromBoard`, `cbBoardFromSchem`, `bbAutoPlace`, `bbConnect`, `bbJoin`, `bbRoute`, `BB_BOARD`, `bbBoardSvg`, `cbBreadboard`, `bbModuleSvg`, `bbCircuitSvg`.
- Shared dependencies: `js/robo/circuit/sim.js`: `cbAddWire`, `cbTerm`; `js/robo/circuit/parts.js`: `CIRC`.

- Dependency resolution: `cbTerm` comes from `geometry.ts`; `cbAddWire` comes from `board.ts`. No import points back to the controller.

## `js/robo/circuit/parts.js`

- Destination: `src/features/circuit/engine/parts.ts`
- Status: migrated and integrated. Original source removed after exact parity and strict verification.
- Top-level declarations: `CIRC`, `LEAD`, `TWO_TERMS`, `circFlow`, `circMix`, `smokeSvg`, `paintSmoke`, `circHeat`, `FRESH`, `FIX`, `BAT_CAP`, `isPB`, `BAT_SAY`, `RES_COLORS`, `resText`, `resBands`, `anodeT`, `polLabels`, `LED_COLORS`, `ledWord`.
- Shared dependencies: `js/robo/circuit/solver.js`: `CIRC_WIRE_R`.

## `js/robo/circuit/sim.js`

- Destination: `src/features/circuit/engine/controller.ts, geometry.ts, board.ts, snapshot.ts, audio.ts, state.ts`
- Status: migrated and integrated. Original source removed after exact parity and strict verification.
- Top-level declarations: `CB_W`, `CB_H`, `CB_GRID`, `cbRot`, `cbTerm`, `cbBox`, `cbPoly`, `cbAt`, `cbSimplify`, `cbRoute`, `cbRouteCost`, `cbNewBoard`, `cbAddPart`, `cbAddWire`, `cbLinks`, `cbInCircuit`, `cbExtract`, `cbInsert`, `cbSnap`, `cbRestore`, `CB_CLIP`, `cbCopy`, `cbPaste`, `CB_AUDIO`, `cbSound`, `initRoboSim`, `CircuitEngine`.
- Shared dependencies: `js/robo/circuit/parts.js`: `CIRC`, `circFlow`; `js/robo/robo.js`: `ROBO`; `js/core/util.js`: `esc`, `prefersReducedMotion`; `js/robo/circuit/breadboard.js`: `BB`, `BB_JUMP`, `bbBoardSvg`, `bbCircuitSvg`, `bbKey`, `bbLegs`, `bbOcc`, `bbPt`, `bbRoute`, `bbStrip`, `bbValid`, `bbX`, `cbBoardFromSchem`, `cbBreadboard`, `cbSchemFromBoard`; `js/robo/circuit/solver.js`: `solveCircuit`.

- Dependency resolution: simulator state no longer depends on robotics content. Geometry and board operations are imported below the breadboard/controller layer. Controller disposal cancels the tracked frame and removes SVG/window/document listeners; audio disposal disconnects voices and closes the context. Generation guards protect the current session from stale disposal.

## `js/robo/circuit/solver.js`

- Destinations: `src/features/circuit/engine/solver.ts` and `constants.ts` (`CIRC_WIRE_R`, `CIRC_LEAK`).
- Status: migrated and integrated. Original source removed after exact parity and strict verification.
- Top-level declarations: `CIRC_WIRE_R`, `CIRC_LEAK`, `solveCircuit`, `branchCurrent`, `solveLinear`.
- Shared dependencies: `js/robo/circuit/parts.js`: `CIRC`.

- Dependency resolution: electrical constants are imported by both parts and solver; parts never import solver.

## `js/robo/mod1.js`

- Destination: `src/features/documents/content/robo-mod1.ts`.
- Status: TypeScript implementation complete; integrated into runtime composition. Document HTML hashes and all six workbook byte hashes match original source. Focused document tests: 11 passed.
- Top-level declarations: .
- Shared dependencies: `js/robo/robo.js`: `ROBO`.

## `js/robo/mod2.js`

- Destination: `src/features/documents/content/robo-mod2.ts`.
- Status: TypeScript implementation complete; integrated into runtime composition. Document HTML hashes and all six workbook byte hashes match original source. Focused document tests: 11 passed.
- Top-level declarations: .
- Shared dependencies: `js/robo/robo.js`: `ROBO`.

## `js/robo/robo.js`

- Destination: `src/features/documents/services/robotics-state.ts` (KTP); circuit state owned by circuit feature; composition owns registry facade`.
- Status: TypeScript implementation complete; integrated into runtime composition. Document HTML hashes and all six workbook byte hashes match original source. Focused document tests: 11 passed.
- Top-level declarations: `ROBO`.
- Shared dependencies: none.

## `js/robo/sections.js`

- Destination: `src/features/documents/content/robo-sections.ts`.
- Status: TypeScript implementation complete; integrated into runtime composition. Document HTML hashes and all six workbook byte hashes match original source. Focused document tests: 11 passed.
- Top-level declarations: .
- Shared dependencies: `js/robo/robo.js`: `ROBO`.

## `js/tools/add.js`

- Destination: `src/features/tools/engines/add.ts`
- Status: migrated and integrated. Original source removed after exact parity and strict verification.
- Top-level declarations: `addSteps`.
- Shared dependencies: `js/core/column.js`: `colAddPlan`, `colAddRun`, `colNum`, `colSheet`, `colToolBase`; `js/core/handwriting.js`: `hwEqline`; `js/core/registry.js`: `registerTool`.

## `js/tools/div.js`

- Destination: `src/features/tools/engines/div.ts`
- Status: migrated and integrated. Original source removed after exact parity and strict verification.
- Top-level declarations: `divDigits`, `divSteps`.
- Shared dependencies: `js/core/column.js`: `colAsk`, `colNum`, `colSheet`, `colToolBase`, `colWritten`; `js/core/handwriting.js`: `hwEqline`; `js/core/registry.js`: `registerTool`.

## `js/tools/domain.js`

- Destination: `src/features/tools/engines/domain.ts`
- Status: migrated, integrated, and verified. Original JavaScript removed.
- Top-level declarations: `D_CIRC`, `D_EPS`, `D_HINT`, `domCollect`, `domConditions`, `dRq`, `dFmt`, `dRootsParts`, `dIrrRoot`, `domQuad`, `domSat`, `domPieces`, `domUniq`, `domIntervalParts`, `domIntervalText`, `buildDomainModel`, `domHatch`, `domDroppedText`, `domSigns`, `domDangerText`, `domLineText`, `domParts`, `dPen`, `dMk`, `domSysSchedule`, `domView`, `domPrepare`, `domFlySystem`, `domAnimate`, `domPreviewHtml`.
- Shared dependencies: `js/core/formula.js`: `F`, `Q`, `SUPS`, `constInt`, `fStrip`, `fmlText`, `parseFormula`, `polyAst`, `polyDeg`, `polyEval`, `qAdd`, `qAst`, `qAstP`, `qDiv`, `qEq`, `qIsZero`, `qKey`, `qMul`, `qNeg`, `qNum`, `qSqrt`, `qSub`, `renderFormula`, `toPoly`; `js/tools/linear.js`: `buildLinearRows`, `captureEqRects`, `eqRowsHtml`, `runEqAnim`; `js/core/handwriting.js`: `HW_DUR`, `HW_STEP`, `hwGlyphs`, `hwTick`; `js/core/util.js`: `esc`; `js/core/numline.js`: `numLine`; `js/core/registry.js`: `registerTool`.

## `js/tools/dvk.js`

- Destination: `src/features/tools/engines/dvk.ts`
- Status: migrated and integrated. Original source removed after exact parity and strict verification.
- Top-level declarations: `buildDvkModel`, `dvkView`, `pairsText`.
- Shared dependencies: `js/core/registry.js`: `registerTool`.

## `js/tools/equation.js`

- Destination: `src/features/tools/engines/equation.ts`
- Status: migrated, integrated, and verified. Original JavaScript removed.
- Top-level declarations: `buildEqModel`.
- Shared dependencies: `js/tools/linear.js`: `buildLinearRows`, `linearSteps`, `linearToolBase`, `parseSide`; `js/core/registry.js`: `registerTool`.

## `js/tools/factor.js`

- Destination: `src/features/tools/engines/factor.ts`
- Status: migrated and integrated. Original source removed after exact parity and strict verification.
- Top-level declarations: `FAC_DELAY`, `FAC_DUR`, `FAC_PEN`, `facIsPrime`, `facNextPrime`, `facRule`, `buildFactorModel`, `cap`, `plural`, `facLadder`, `facProbe`, `facRules`, `facLine`, `facView`, `prepareFacAnim`, `runFacFly`.
- Shared dependencies: `js/core/handwriting.js`: `HW_STEP`, `hwGlyphs`; `js/core/notebook.js`: `colGrid`, `mkRow`; `js/core/registry.js`: `registerTool`.

## `js/tools/fractions.js`

- Destination: `src/features/tools/engines/fractions.ts`
- Status: migrated and integrated. Original source removed after exact parity and strict verification.
- Top-level declarations: `buildFracModel`, `hwNum`, `fbar`, `renderFUnit`, `renderDenom`, `fracStageInner`, `runFracMulAnim`, `prepareFracAnim`, `runFracFlip`.
- Shared dependencies: `js/core/util.js`: `fmtNum`, `gcd`, `prefersReducedMotion`; `js/core/handwriting.js`: `HW_DUR`, `HW_STEP`, `hwGlyphs`; `js/core/registry.js`: `registerTool`.

## `js/tools/irrational.js`

- Destination: `src/features/tools/engines/irrational.ts`
- Status: migrated, integrated, and verified. Original JavaScript removed.
- Top-level declarations: `IR_FORM`, `irSubPoly`, `irEq`, `irSide`, `irCondition`, `irIntervals`, `irRat`, `irFromQ`, `irAdd`, `irNeg`, `irMul`, `irDiv`, `irSign`, `irPair`, `irPairAdd`, `irPairMul`, `irPairSign`, `irExactRoot`, `irExactPoly`, `irSubstitute`, `buildIrrationalModel`, `irReplacementPoly`, `irRenameVariable`, `irReplacementParts`, `irRationalQ`, `irSurdAst`, `buildSubstitutionModel`, `irView`.
- Shared dependencies: `js/core/formula.js`: `F`, `Q`, `fStrip`, `fmlText`, `formulaHtml`, `parseFormula`, `polyAdd`, `polyAst`, `polyDeg`, `polyEval`, `polyMul`, `qAst`, `qDiv`, `qEq`, `qIsZero`, `qMul`, `qNeg`, `toPoly`; `js/tools/domain.js`: `dRootsParts`, `dRq`, `domIntervalParts`, `domIntervalText`, `domParts`, `domPieces`, `domQuad`; `js/core/util.js`: `esc`, `gcd`; `js/tools/linear.js`: `buildLinearRows`, `captureEqRects`, `eqRowsHtml`, `runEqAnim`; `js/core/notebook.js`: `lessonNote`; `js/core/handwriting.js`: `hwTick`; `js/core/registry.js`: `registerTool`.
- Build bridge dependencies: `DB`.

## `js/tools/linear.js`

- Destination: `src/features/tools/engines/linear.ts`
- Status: migrated, integrated, and verified. Original JavaScript removed.
- Top-level declarations: `parseSide`, `fmtExact`, `fmtX`, `REL_FLIP`, `buildLinearRows`, `eqStageInner`, `eqRowsHtml`, `captureEqRects`, `prepareEqAnim`, `runEqAnim`, `linearToolBase`, `linearSteps`.
- Shared dependencies: `js/core/util.js`: `fmtNum`; `js/core/handwriting.js`: `HW_STEP`, `hwGlyphs`.

## `js/tools/mult.js`

- Destination: `src/features/tools/engines/mult.ts`
- Status: migrated and integrated. Original source removed after exact parity and strict verification.
- Top-level declarations: `MULT_ZEROS`, `multSteps`.
- Shared dependencies: `js/core/column.js`: `COL_GEN`, `COL_INS`, `colAddPlan`, `colAddRun`, `colAnnOf`, `colAsk`, `colMind`, `colNum`, `colPlain`, `colSheet`, `colToolBase`, `colWritten`; `js/core/handwriting.js`: `hwEqline`; `js/core/registry.js`: `registerTool`.

## `js/tools/nsd.js`

- Destination: `src/features/tools/engines/nsd.ts`
- Status: migrated and integrated. Original source removed after exact parity and strict verification.
- Top-level declarations: `buildNsdModel`, `nsdWhyLack`, `nsdState`, `nsdTicks`, `nsdLadderHtml`, `nsdRowsHtml`, `nsdAnswerHtml`, `nsdView`, `prepareNsdAnim`, `runNsdFly`.
- Shared dependencies: `js/tools/nsk.js`: `nskCells`, `nskFlySlots`, `nskLadder`; `js/core/handwriting.js`: `HW_DUR`, `HW_STEP`, `hwTick`; `js/core/notebook.js`: `lessonNote`; `js/core/registry.js`: `registerTool`.

## `js/tools/nsk.js`

- Destination: `src/features/tools/engines/nsk.ts`
- Status: migrated and integrated. Original source removed after exact parity and strict verification.
- Top-level declarations: `NSK_FLY`, `NSK_GAP`, `NSK_TAG`, `nskLadder`, `buildNskModel`, `pluralUsed`, `nskCells`, `nskState`, `nskTicks`, `nskLadderHtml`, `nskAnswerHtml`, `nskView`, `prepareNskAnim`, `runNskFly`, `nskFlySlots`.
- Shared dependencies: `js/core/handwriting.js`: `HW_DUR`, `HW_STEP`, `hwGlyphs`, `hwTick`; `js/core/notebook.js`: `lessonNote`; `js/core/registry.js`: `registerTool`.

## `js/tools/proportion.js`

- Destination: `src/features/tools/engines/proportion.ts`
- Status: migrated, integrated, and verified. Original JavaScript removed.
- Top-level declarations: `mulLin`, `buildProportion`.
- Shared dependencies: `js/tools/linear.js`: `buildLinearRows`, `linearSteps`, `linearToolBase`, `parseSide`; `js/core/registry.js`: `registerTool`.

## `js/tools/rational-power.js`

- Destination: `src/features/tools/engines/rational-power.ts`
- Status: migrated, integrated, and verified. Original JavaScript removed.
- Top-level declarations: `RP`, `buildRationalPower`.
- Shared dependencies: `js/core/formula.js`: `F`, `Q`, `fmlText`, `formulaHtml`, `qAst`, `qFromStr`, `renderFormula`; `js/core/registry.js`: `registerTool`; `js/core/util.js`: `esc`; `js/core/handwriting.js`: `hwGlyphs`, `hwTick`.
- Build bridge dependencies: `DB`.

## `js/tools/scalar-product.js`

- Destination: `src/features/geometry/engines/tools/scalar-product.ts`
- Status: migrated and integrated. Original source removed after exact parity and strict verification.
- Top-level declarations: `ScalarNotebook`.
- Shared dependencies: `js/core/formula.js`: `F`; `js/geometry/scalar-product.js`: `ScalarProduct`; `js/geometry/vector-notebook.js`: `VectorNotebook`; `js/core/registry.js`: `registerTool`.
- Build bridge dependencies: `DB`, `hrefTool`, `hrefTopic`.

## `js/tools/sub.js`

- Destination: `src/features/tools/engines/sub.ts`
- Status: migrated and integrated. Original source removed after exact parity and strict verification.
- Top-level declarations: `subSteps`.
- Shared dependencies: `js/core/column.js`: `COL_GEN`, `colAnn`, `colAsk`, `colNum`, `colPlain`, `colSheet`, `colToolBase`, `colWritten`; `js/core/handwriting.js`: `hwEqline`; `js/core/registry.js`: `registerTool`.

## `js/tools/vector-scaling.js`

- Destination: `src/features/geometry/engines/tools/vector-scaling.ts`
- Status: migrated and integrated. Original source removed after exact parity and strict verification.
- Top-level declarations: `ScalingNotebook`.
- Shared dependencies: `js/core/formula.js`: `F`, `Q`; `js/core/registry.js`: `registerTool`; `js/geometry/vector-notebook.js`: `VectorNotebook`.
- Build bridge dependencies: `DB`, `hrefTool`, `hrefTopic`.


## Foundation and algebra verification

- All seven foundation modules and the six algebra modules pass isolated strict TypeScript checks.
- The 97 existing irrational/rational-power mathematical tests now import the TypeScript domain entry point.
- All 34 algebra catalog models and all 226 rendered step views match the captured JavaScript baseline.
- Both generated algebra lesson texts match the captured lesson HTML byte for byte.
- Five persistent canonical parity tests cover the algebra definitions through their public build/view boundary.
- Independent review compared 675 additional arithmetic models and rendered views against the baseline.
- Independent review compared 343 vector-scaling models/diagrams and 150 scalar-product models against the baseline.
- No arithmetic or geometry behavior difference was found in those 1,168 additional comparisons.

## Final source removal

All 49 original source paths have typed replacements above.
The final runtime imports each domain normally and assembles 16 tools and 23 documents once.
The temporary Windows-only legacy bridge has been removed with `scripts/engine-runtime.mjs`
and `src/runtime/virtual.d.ts`. No source is concatenated or patched at build time.

## Removal decisions

- The unused `app` lookup in `util.js` had no consumers. Notifications call the typed runtime service.
- Keyboard and Windows document lifecycle hooks were discarded by the React document route path.
  Their replacements contain preset metadata only; React owns controller mounting and disposal.
- Shared lexical bindings, ordered source loading, regex patches, the virtual declaration, and VM test evaluation
  have no replacements. Explicit ES imports, runtime composition, and imported domain tests replace those mechanisms.

Final verification: 182 unit tests and 33 browser scenarios pass. All 77 task models,
656 step views, 23 documents, complete catalog, and six workbook byte hashes match baseline.
