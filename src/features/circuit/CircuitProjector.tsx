import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import type {
  CircuitController,
  CircuitControls,
  CircuitSession,
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
}: {
  controller: CircuitController;
}) {
  const root = useRef<HTMLDivElement>(null);
  const session = useRef<CircuitSession | null>(null);
  const [controls, setControls] = useState(initialControls);
  const palette = useMemo(() => controller.palette(), [controller]);
  useLayoutEffect(() => {
    session.current = controller.mount(root.current!, setControls);
    return () => {
      session.current?.dispose();
      session.current = null;
    };
  }, [controller]);
  useLayoutEffect(() => {
    if (controls.properties) session.current?.positionPop();
  }, [controls.properties]);

  return (
    <div className="circuit-editor" ref={root}>
      <CircuitToolbar controls={controls} session={session.current} />
      <div
        className={`cb-main${controls.view === 'bb' ? ' bb' : ''}`}
        id="cbMain"
      >
        <CircuitPalette
          items={palette}
          disabled={controls.disabledParts}
          session={session.current}
        />
        <div className="cb-stage" id="cbStage">
          <CircuitScene />
          <CircuitProperties
            properties={controls.properties}
            session={session.current}
          />
        </div>
      </div>
      <div className="msg" id="cbMsg">
        {controls.message}
      </div>
    </div>
  );
}
