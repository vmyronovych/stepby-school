import type { WindowsController } from '../types';
import { Action, Artwork, Glyph } from './primitives';
export function Taskbar({ controller }: { controller: WindowsController }) {
  const s = controller.state(),
    h = controller.helpers,
    active = h.win(s.act),
    activeApp = active && !active.min ? h.appKey(active) : null;
  const apps = [
    ...h.pinned,
    ...new Set(
      s.wins
        .map(h.appKey)
        .filter((app): app is string => !!app && !h.pinned.includes(app)),
    ),
  ];
  const appButtons = apps.map((app) => {
    const count = s.wins.filter((w) => h.appKey(w) === app).length;
    return (
      <button
        key={app}
        type="button"
        className={`tbi${count ? ' run' : ''}${count > 1 ? ' multi' : ''}${activeApp === app ? ' act' : ''}`}
        data-a="task"
        data-v={app}
        data-app={app}
      >
        <Artwork html={h.appIco(app, 24)} />
      </button>
    );
  });
  const now = new Date(),
    pad = (value: number) => String(value).padStart(2, '0');
  return (
    <div className="wn-bar" id="wnBar" style={{ height: h.tb() }}>
      {s.ver === '11' ? (
        <div className="tbc">
          <Action
            className={`tbi st${s.start && s.start !== 'search' ? ' act' : ''}`}
            action="start"
          >
            <Artwork html={h.logo(22)} />
          </Action>
          <Action
            className={`tsb${s.start === 'search' ? ' act' : ''}`}
            action="tsearch"
          >
            <Glyph controller={controller} name="search" size={16} />
            <span>Пошук</span>
          </Action>
          <button className="tbi tv">
            <Glyph controller={controller} name="taskv" size={20} />
          </button>
          {appButtons}
        </div>
      ) : (
        <>
          <Action
            className={`tbs st${s.start === 'menu' ? ' act' : ''}`}
            action="start"
          >
            <Artwork html={h.logo(16)} />
          </Action>
          <label className="tsb" data-a="tsearch">
            <Glyph controller={controller} name="search" size={16} />
            <input
              data-fk="tsearch"
              value={s.sq}
              onChange={() => {}}
              placeholder="Введіть тут текст для пошуку"
              spellCheck={false}
              autoComplete="off"
            />
          </label>
          <button className="tbi tv">
            <Glyph controller={controller} name="taskv" size={20} />
          </button>
          {appButtons}
        </>
      )}
      <div className="tray">
        <button className="tri">
          <Glyph controller={controller} name="chu" size={12} />
        </button>
        {s.ver === '11' ? (
          <>
            <Action className="lng" action="lang">
              <span id="wnLang">{s.lang}</span>
            </Action>
            <span className="tri qs">
              <Glyph controller={controller} name="wifi" />
              <Glyph controller={controller} name="vol" />
            </span>
          </>
        ) : (
          <>
            <span className="tri">
              <Glyph controller={controller} name="net" />
            </span>
            <span className="tri">
              <Glyph controller={controller} name="vol" />
            </span>
            <button className="lng" data-a="lang" id="wnLang">
              {s.lang}
            </button>
          </>
        )}
        <span className="clk" id="wnClk">
          {now.getHours()}:{pad(now.getMinutes())}
          <br />
          {pad(now.getDate())}.{pad(now.getMonth() + 1)}.{now.getFullYear()}
        </span>
        <span className="tri">
          <Glyph
            controller={controller}
            name={s.ver === '11' ? 'bell' : 'note'}
          />
        </span>
        <Action className="sdk" action="showdesk" />
      </div>
    </div>
  );
}
