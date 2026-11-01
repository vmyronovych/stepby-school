import { useRef } from 'react';
import { KeyboardBoard } from './components/KeyboardBoard';
import { KeyboardPresets } from './components/KeyboardPresets';
import { KeyboardInfo } from './components/KeyboardInfo';
import { TypingArea } from './components/TypingArea';
import { useKeyboardController } from './hooks/useKeyboardController';
import type { KeyboardProjectorProps } from './types';

export type { KeyboardController, KeyboardProjectorProps } from './types';

export function KeyboardProjector({
  controller,
  preset,
  onPresetChange,
}: KeyboardProjectorProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const snapshot = useKeyboardController(controller, preset);
  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else rootRef.current?.requestFullscreen?.().catch(() => {});
  }
  function selectPreset(id: string | null) {
    const next = id === snapshot.focus ? null : id;
    controller.applyPreset(next);
    onPresetChange(next);
  }
  return (
    <div
      className="proj kbx"
      ref={rootRef}
      role="region"
      aria-label="Клавіатура і групи клавіш"
    >
      <div className="proj-bar">
        <h2>Клавіатура</h2>
        <span className="kb-lang">
          Мова:{' '}
          <b id="kbLang">
            {snapshot.lang
              ? controller.languageLabels[snapshot.lang] || '—'
              : '—'}
          </b>
        </span>
        <button
          type="button"
          className="nav"
          id="kbFull"
          onClick={toggleFullscreen}
        >
          На весь екран
        </button>
      </div>
      <KeyboardPresets
        controller={controller}
        focus={snapshot.focus}
        onSelect={selectPreset}
      />
      <KeyboardBoard controller={controller} snapshot={snapshot} />
      <TypingArea controller={controller} snapshot={snapshot} />
      <KeyboardInfo info={snapshot.info} />
    </div>
  );
}
