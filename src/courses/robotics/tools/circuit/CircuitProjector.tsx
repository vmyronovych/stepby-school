import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import type {
  CircuitController,
  CircuitControls,
  CircuitSession,
  CircuitPreset,
} from './types';
import { CircuitToolbar } from './components/CircuitToolbar';
import { CircuitPalette } from './components/CircuitPalette';
import { CircuitScene } from './components/CircuitScene';
import { CircuitProperties } from './components/CircuitProperties';

const initialControls: CircuitControls = {
  view: 'schem',
  canUndo: false,
  canRedo: false,
  disabledParts: [],
  properties: null,
  message: '',
};
export function CircuitProjector({
  controller,
  preset,
  active = true,
  compact = false,
}: {
  controller: CircuitController;
  preset?: CircuitPreset;
  active?: boolean;
  compact?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const session = useRef<CircuitSession | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [controls, setControls] = useState(initialControls);
  const palette = useMemo(() => controller.palette(), [controller]);
  useLayoutEffect(() => {
    session.current = controller.mount(root.current!, setControls, { preset });
    return () => {
      session.current?.dispose();
      session.current = null;
    };
  }, [controller, preset]);
  useLayoutEffect(() => {
    session.current?.setActive(active);
  }, [active, controller, preset]);
  useLayoutEffect(() => {
    if (controls.properties) session.current?.positionPop();
  }, [controls.properties]);

  return (
    <div
      className={`circuit-editor${preset ? ' cb-experiment' : ''}${zoomed ? ' cb-zoomed' : ''}${compact ? ' cb-compact' : ''}`}
      ref={root}
    >
      {preset && !compact && (
        <>
          <h3>{preset.title}</h3>
          <p>{preset.description}</p>
        </>
      )}
      {preset && (
        <button
          className="sec cb-zoom-toggle"
          type="button"
          aria-pressed={zoomed}
          onClick={() => setZoomed((v) => !v)}
        >
          {zoomed ? 'Показати все коло' : 'Збільшити схему'}
        </button>
      )}
      <CircuitToolbar
        controls={controls}
        session={session.current}
        preset={!!preset}
      />
      <div
        className={`cb-main${controls.view === 'bb' ? ' bb' : ''}`}
        id="cbMain"
      >
        {!preset && (
          <CircuitPalette
            items={palette}
            disabled={controls.disabledParts}
            session={session.current}
          />
        )}
        <div className="cb-stage" id="cbStage">
          <div className="cb-canvas-scroll">
            <div className={zoomed ? 'cb-zoom-canvas' : undefined}>
              <CircuitScene />
            </div>
          </div>
          <CircuitProperties
            properties={controls.properties}
            session={session.current}
          />
        </div>
      </div>
      <div className="msg" id="cbMsg">
        {controls.message}
      </div>
      {preset && compact && (
        <details className="cb-experiment-help">
          <summary>Як працює дослід</summary>
          <p>{preset.description}</p>
        </details>
      )}
      {preset && (
        <p className="cb-flow-legend">
          <span>Сині проводи — сигнали</span>
          <span>Охристі — силовий шлях</span>
          <span>Темні — спільний мінус</span>. Рухомі крапки позначають
          електрони; їхній рух сповільнений для спостереження. Колір проводу
          позначає його роль, а не інший вид електронів.
        </p>
      )}
    </div>
  );
}
