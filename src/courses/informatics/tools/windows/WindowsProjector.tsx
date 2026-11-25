import {
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
  type CSSProperties,
} from 'react';
import type { WindowsController } from './types';
import { Artwork } from './components/primitives';
import { Desktop } from './components/Desktop';
import { Taskbar } from './components/Taskbar';
import { StartMenu } from './components/StartMenu';
import { ExplorerWindow } from './components/ExplorerWindow';
import { ApplicationWindow } from './components/ApplicationWindow';
import {
  SaveDialog,
  PropertiesDialog,
  MessageDialog,
} from './components/Dialogs';
import { ContextMenu } from './components/ContextMenu';

export function WindowsProjector({
  controller,
  sub,
}: {
  controller: WindowsController;
  sub: string | null;
}) {
  const host = useRef<HTMLDivElement>(null),
    revision = useSyncExternalStore(
      controller.subscribe,
      controller.getRevision,
    ),
    state = controller.state(),
    h = controller.helpers;
  useLayoutEffect(() => {
    if (host.current) return controller.mount(host.current, sub);
  }, [controller]);
  useLayoutEffect(() => controller.setPreset(sub), [controller, sub]);
  useLayoutEffect(() => controller.afterRender(), [controller, revision]);
  const chip = (
    action: string,
    value: string | undefined,
    label: string,
    pressed?: boolean,
  ) => (
    <button
      type="button"
      className="chip"
      data-wnc={action}
      data-v={value}
      aria-pressed={pressed}
      onClick={() => controller.toolbar(action, value)}
    >
      {label}
    </button>
  );
  const dialog = state.root ? h.modal() : null;
  return (
    <div
      className="proj wnx"
      ref={host}
      role="region"
      aria-label="Windows на проєктор"
    >
      <div className="proj-bar">
        <h2>Windows</h2>
        <div className="proj-chips">
          {chip('ver', '10', 'Windows 10', state.ver === '10')}
          {chip('ver', '11', 'Windows 11', state.ver === '11')}
          <span className="proj-sep" />
          {chip('big', undefined, 'Крупніше', state.big)}
          {chip('cast', undefined, 'Показувати клавіші', state.cast)}
          <span className="proj-sep" />
          {chip('wine', undefined, 'Win + E')}
          {chip('reset', undefined, 'Скинути')}
        </div>
        <button
          type="button"
          className="nav"
          id="wnFull"
          onClick={() => controller.toolbar('fullscreen')}
        >
          На весь екран
        </button>
      </div>
      <div className="wn-stage">
        <div
          className={`wn-scr w${state.ver}`}
          id="wnScr"
          tabIndex={-1}
          style={
            {
              width: h.w(),
              height: h.h(),
              '--vh': `${h.h()}px`,
            } as CSSProperties
          }
        >
          <Artwork html={h.defs} />
          <div className="wn-wall">
            <Artwork html={h.wallpaper[state.ver]} />
          </div>
          {state.root && (
            <>
              <Desktop controller={controller} />
              <div id="wnWins">
                {state.wins.map((window) => (
                  <div
                    key={window.id}
                    className={`wn-win k-${window.kind}${window.kind === 'app' ? ' a-' + window.app : ''}${state.act === window.id ? ' act' : ''}${window.max ? ' max' : ''}${window.min ? ' min' : ''}${Date.now() - window.born < 260 ? ' born' : ''}`}
                    data-w={window.id}
                    style={
                      window.max
                        ? {
                            left: 0,
                            top: 0,
                            width: h.w(),
                            height: h.h() - h.tb(),
                            zIndex: window.z,
                          }
                        : {
                            left: window.x,
                            top: window.y,
                            width: window.w,
                            ...(window.h ? { height: window.h } : {}),
                            zIndex: window.z,
                          }
                    }
                  >
                    {window.kind === 'exp' ? (
                      <ExplorerWindow controller={controller} window={window} />
                    ) : window.kind === 'app' ? (
                      <ApplicationWindow
                        controller={controller}
                        window={window}
                      />
                    ) : window.kind === 'save' ? (
                      <SaveDialog controller={controller} window={window} />
                    ) : window.kind === 'props' ? (
                      <PropertiesDialog
                        controller={controller}
                        window={window}
                      />
                    ) : (
                      <MessageDialog controller={controller} window={window} />
                    )}
                  </div>
                ))}
                {dialog && (
                  <div className="wn-block" style={{ zIndex: dialog.z - 1 }} />
                )}
              </div>
              <Taskbar controller={controller} />
              <StartMenu controller={controller} />
              <div id="wnMenuBox">
                <ContextMenu controller={controller} />
              </div>
            </>
          )}
          <div className="wn-fx" id="wnFx">
            {state.reactFx?.kind === 'band' ? (
              <div
                className="band"
                style={{
                  left: state.reactFx.x,
                  top: state.reactFx.y,
                  width: state.reactFx.width,
                  height: state.reactFx.height,
                }}
              />
            ) : state.reactFx?.kind === 'drag' ? (
              <>
                <div
                  className="ghost"
                  style={{ left: state.reactFx.x, top: state.reactFx.y }}
                >
                  {state.reactFx.node && (
                    <Artwork
                      html={h.ico(
                        state.reactFx.node,
                        state.reactFx.size ?? 48,
                        true,
                      )}
                    />
                  )}
                  <b>
                    {(state.reactFx.count ?? 0) > 1
                      ? state.reactFx.count
                      : null}
                  </b>
                </div>
                {state.reactFx.label && (
                  <div
                    className="dtip"
                    style={{
                      display: 'block',
                      left: (state.reactFx.x ?? 0) + 16,
                      top: (state.reactFx.y ?? 0) + 22,
                    }}
                  >
                    {state.reactFx.label}
                  </div>
                )}
              </>
            ) : null}
            {state.reactBalloon && (
              <div
                className="bln"
                style={{
                  left: state.reactBalloon.x,
                  top: state.reactBalloon.y,
                }}
              >
                Ім'я файлу не може містити такі символи:
                <br />
                <span>{'\\ / : * ? " < > |'}</span>
              </div>
            )}
          </div>
          <div
            className={`wn-cast${state.reactCast ? ' on' : ''}`}
            id="wnCast"
            style={{ bottom: h.tb() + 28 }}
          >
            {state.reactCast?.split(' + ').map((key, index) => (
              <span key={index}>
                {index > 0 && <span>+</span>}
                <kbd>{key}</kbd>
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="wn-hint">
        Клавішу Win браузер віддає схемі лише в режимі «На весь екран» (Chrome,
        Edge): тоді працюють Win, Win + E, Win + D, Alt + F4. Поза ним — кнопка
        «Win + E» угорі. Вийти з повного екрана — затиснути Esc.
      </p>
    </div>
  );
}
