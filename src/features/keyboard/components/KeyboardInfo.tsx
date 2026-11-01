import { Fragment } from 'react';
import type { KeyboardSnapshot } from '../types';

export function KeyboardInfo({ info }: { info: KeyboardSnapshot['info'] }) {
  return (
    <div className="kb-info" id="kbInfo" aria-live="polite">
      <div className="kb-combo">
        {info.keyCaps
          ? info.parts.map((part, index) => (
              <Fragment key={index}>
                {index > 0 && <span className="plus">+</span>}
                <kbd>{part}</kbd>
              </Fragment>
            ))
          : info.parts[0]}
        {info.result !== null && (
          <>
            <span className="arr">→</span>
            <span className="res">{info.result}</span>
          </>
        )}
      </div>
      <p className="kb-desc">{info.description}</p>
    </div>
  );
}
