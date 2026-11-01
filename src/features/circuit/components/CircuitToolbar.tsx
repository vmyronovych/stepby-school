import type { CircuitControls, CircuitSession } from '../types';

export function CircuitToolbar({
  controls,
  session,
}: {
  controls: CircuitControls;
  session: CircuitSession | null;
}) {
  return (
    <div className="cb-bar">
      <div className="cb-seg cb-view" role="group" aria-label="Вигляд">
        <button
          className={`rb${controls.view === 'schem' ? ' on' : ''}`}
          data-view="schem"
          onClick={() => session?.setView('schem')}
        >
          Схема
        </button>
        <button
          className={`rb${controls.view === 'bb' ? ' on' : ''}`}
          data-view="bb"
          onClick={() => session?.setView('bb')}
        >
          Макетка
        </button>
      </div>
      <span className="cb-hint" id="cbHint">
        {controls.view === 'bb' ? (
          <>
            Те саме коло на макетці, і складати його можна тут: тягни деталі в
            отвори, а <b>перемичку</b> веди від отвору до отвору. Отвори одного
            стовпчика з'єднані смужкою всередині (вона підсвічена), довгі ряди
            «+» і «−» — шини живлення. Схема оновлюється сама.
          </>
        ) : (
          <>
            Тягни деталі з панелі на поле, а можна <b>просто на дріт</b>: деталь
            розріже його й стане в коло. З'єднуй дротом: від кружечка до
            кружечка. <b>Двічі клацни</b> на деталь, щоб змінити її властивості
            або вийняти з кола.
          </>
        )}
      </span>
      <label className="speed">
        швидкість{' '}
        <input
          id="cbSpeed"
          type="range"
          min="1"
          max="6"
          step="1"
          defaultValue="3"
        />
      </label>
      <span className="cb-hist">
        <button
          className="sec icon"
          id="cbUndo"
          title="Скасувати (Ctrl+Z)"
          aria-label="Скасувати"
          disabled={!controls.canUndo}
          onClick={() => session?.undo()}
        >
          <svg viewBox="0 0 24 24">
            <path d="M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />
          </svg>
        </button>
        <button
          className="sec icon"
          id="cbRedo"
          title="Повернути (Ctrl+Shift+Z)"
          aria-label="Повернути"
          disabled={!controls.canRedo}
          onClick={() => session?.redo()}
        >
          <svg viewBox="0 0 24 24">
            <path d="m15 14 5-5-5-5M20 9H9.5a5.5 5.5 0 0 0 0 11H13" />
          </svg>
        </button>
      </span>
      <button className="sec" id="cbClear" onClick={() => session?.clear()}>
        Очистити поле
      </button>
    </div>
  );
}
