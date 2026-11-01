import { Fragment, useLayoutEffect, useRef, type MouseEvent } from 'react';
import type { KeyboardController, KeyboardSnapshot } from '../types';

export function TypingArea({
  controller,
  snapshot,
}: {
  controller: KeyboardController;
  snapshot: KeyboardSnapshot;
}) {
  const caretRef = useRef<HTMLSpanElement>(null);
  const selection =
    snapshot.anchor !== null && snapshot.anchor !== snapshot.caret
      ? [
          Math.min(snapshot.anchor, snapshot.caret),
          Math.max(snapshot.anchor, snapshot.caret),
        ]
      : null;
  useLayoutEffect(() => {
    caretRef.current?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [snapshot.text, snapshot.caret, snapshot.ghost?.id]);

  function placeCaret(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    const character =
      event.target instanceof Element
        ? event.target.closest<HTMLElement>('[data-i]')
        : null;
    let index = snapshot.text.length;
    if (character) {
      const position = Number(character.dataset.i);
      const rect = character.getBoundingClientRect();
      index =
        snapshot.text[position] === '\n'
          ? position
          : position + (event.clientX > rect.left + rect.width / 2 ? 1 : 0);
    }
    controller.placeCaret(index);
  }

  const ghost = snapshot.ghost && (
    <span
      className="ghost"
      style={{ maxWidth: `${snapshot.ghost.ch.length}ch` }}
    >
      {snapshot.ghost.ch.replace(/\n/g, '↵')}
    </span>
  );
  return (
    <div className="kb-typebar">
      <div
        className="kb-type"
        id="kbType"
        aria-label="Поле для друку"
        onMouseDown={placeCaret}
      >
        {Array.from({ length: snapshot.text.length + 1 }, (_, index) => (
          <Fragment key={index}>
            {index === snapshot.caret && (
              <>
                {snapshot.ghost?.side === 'l' && ghost}
                <span
                  ref={caretRef}
                  className={`car${snapshot.overwrite ? ' ovr' : ''}`}
                />
                {snapshot.ghost?.side === 'r' && ghost}
              </>
            )}
            {index < snapshot.text.length && (
              <span
                data-i={index}
                className={
                  selection && index >= selection[0] && index < selection[1]
                    ? 'sel'
                    : undefined
                }
              >
                {snapshot.text[index]}
              </span>
            )}
          </Fragment>
        ))}
        {!snapshot.text && !snapshot.ghost && (
          <span className="ph">Друкуй — літери з'являться тут</span>
        )}
      </div>
      <div className="kb-tyctl">
        <span id="kbMode">
          {snapshot.overwrite ? (
            <>
              <b>Режим заміни.</b> Нова літера стирає ту, що праворуч. Вимкнути
              — Insert.
            </>
          ) : (
            "Друкуй на клавіатурі — текст з'являється тут. Курсор ставиться стрілками або клацанням."
          )}
        </span>
        <button
          type="button"
          className="nav"
          id="kbClear"
          onClick={() => controller.clearText()}
        >
          Очистити
        </button>
      </div>
    </div>
  );
}
