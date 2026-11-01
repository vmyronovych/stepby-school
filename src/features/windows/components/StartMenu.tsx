import { Fragment } from 'react';
import type { WindowsController, SearchResult } from '../types';
import { Action, Artwork, Glyph } from './primitives';
function SearchPanel({ controller }: { controller: WindowsController }) {
  const s = controller.state(),
    h = controller.helpers,
    q = s.sq.trim(),
    results = h.find(q);
  const item = (result: SearchResult, index: number) => (
    <Action
      key={`${result.kind}-${result.id ?? result.k}`}
      className={`sr-it${index === 0 ? ' best' : ''}`}
      action="sres"
      value={index}
    >
      <Artwork html={h.resIco(result, index === 0 ? 32 : 20)} />
      <span>
        <b>{result.name}</b>
        <small>{result.sub}</small>
      </span>
    </Action>
  );
  return (
    <div className="sr">
      <div className="sr-tabs">
        <b>Усі</b>
        <span>Програми</span>
        <span>Документи</span>
        <span>Інтернет</span>
        <span>{s.ver === '11' ? 'Параметри' : 'Інше'}</span>
      </div>
      {!q ? (
        <div className="sr-e">
          <div className="sr-h">Основні програми</div>
          <div className="sr-tops">
            {['edge', 'word', 'paint', 'calc', 'settings'].map((app) => (
              <Action key={app} className="sr-top" action="app" value={app}>
                <Artwork html={h.appIco(app, 32)} />
                <span>{h.apps[app].n}</span>
              </Action>
            ))}
          </div>
          <div className="sr-h">Останні</div>
          {s.recent
            .slice(0, 4)
            .map((id) => s.by[id])
            .filter(Boolean)
            .map((node) => (
              <Action
                key={node.id}
                className="sr-it"
                action="sopen"
                value={node.id}
              >
                <Artwork html={h.ico(node, 20)} />
                <span>
                  <b>{h.full(node)}</b>
                </span>
              </Action>
            ))}
        </div>
      ) : (
        <div className="sr-b">
          <div className="sr-l" data-sk="srl">
            {results.length ? (
              results.map(item)
            ) : (
              <Action className="sr-it best" action="app" value="edge">
                <Glyph controller={controller} name="search" size={20} />
                <span>
                  <b>{q}</b>
                  <small>Переглянути результати з Інтернету</small>
                </span>
              </Action>
            )}
          </div>
          <div className="sr-r">
            {results[0] ? (
              <>
                <Artwork html={h.resIco(results[0], 64)} />
                <b>{results[0].name}</b>
                <small>{results[0].sub}</small>
                <div className="sr-acts">
                  <Action action="sres" value="0">
                    <Glyph controller={controller} name="open" />
                    Відкрити
                  </Action>
                  {results[0].kind !== 'app' && (
                    <Action action="sloc2" value={results[0].id}>
                      Відкрити розташування файлу
                    </Action>
                  )}
                </div>
              </>
            ) : (
              <>
                <Glyph controller={controller} name="search" size={48} />
                <b>{q}</b>
                <small>Переглянути результати з Інтернету</small>
                <div className="sr-acts">
                  <Action action="app" value="edge">
                    Відкрити в браузері
                  </Action>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export function StartMenu({ controller }: { controller: WindowsController }) {
  const s = controller.state(),
    h = controller.helpers;
  const app = (key: string, deep = false) => (
    <Action
      key={key}
      className={`sa${deep ? ' deep' : ''}`}
      action="app"
      value={key}
    >
      <span className="sai">
        <Artwork html={h.appIco(key, 24)} />
      </span>
      {h.apps[key].n}
    </Action>
  );
  const search = (
    <div className={`s11q${s.start === 'search' ? ' on' : ''}`}>
      <Glyph controller={controller} name="search" size={16} />
      <input
        data-fk="ssearch"
        value={s.sq}
        onChange={() => {}}
        placeholder="Пошук програм, параметрів і документів"
        spellCheck={false}
        autoComplete="off"
      />
    </div>
  );
  const foot = (
    <div className="s11f">
      <button className="usr">
        <Glyph controller={controller} name="user" size={28} />
        <span>Учень</span>
      </button>
      <Action className="pw" action="power">
        <Glyph controller={controller} name="power" size={16} />
      </Action>
    </div>
  );
  return (
    <div
      className={`wn-start${s.start ? ' on m-' + s.start : ''}`}
      id="wnStart"
      style={{ bottom: h.tb() }}
    >
      {s.start &&
        (s.ver === '11' ? (
          <div className="s11">
            {search}
            {s.start === 'search' ? (
              <SearchPanel controller={controller} />
            ) : s.start === 'all' ? (
              <>
                <div className="s11h">
                  <b>Усі програми</b>
                  <Action className="sm" action="sback">
                    ← Назад
                  </Action>
                </div>
                <div className="s11all" data-sk="s11a">
                  {h.all11.map(([letter, apps]) => (
                    <Fragment key={letter}>
                      <div className="sl">{letter}</div>
                      {apps.map((key) => app(key))}
                    </Fragment>
                  ))}
                </div>
                {foot}
              </>
            ) : (
              <>
                <div className="s11h">
                  <b>Закріплені</b>
                  <Action className="sm" action="sall">
                    Усі програми →
                  </Action>
                </div>
                <div className="s11p">
                  {h.pins11.map((key) => (
                    <Action key={key} className="pi" action="app" value={key}>
                      <Artwork html={h.appIco(key, 32)} />
                      <span>{h.apps[key].n}</span>
                    </Action>
                  ))}
                </div>
                <div className="s11h">
                  <b>Рекомендовані</b>
                  <button className="sm">Більше →</button>
                </div>
                <div className="s11r">
                  {s.recent.length ? (
                    s.recent
                      .slice(0, 6)
                      .map((id) => s.by[id])
                      .filter(Boolean)
                      .map((node) => (
                        <Action
                          key={node.id}
                          className="rc"
                          action="sopen"
                          value={node.id}
                        >
                          <Artwork html={h.ico(node, 32)} />
                          <span>
                            <b>{h.full(node)}</b>
                            <small>{h.dt(node.date).slice(0, 10)}</small>
                          </span>
                        </Action>
                      ))
                  ) : (
                    <p className="s11n">
                      Щойно ви відкриєте файли, вони з’являться тут.
                    </p>
                  )}
                </div>
                {foot}
              </>
            )}
          </div>
        ) : s.start === 'search' ? (
          <SearchPanel controller={controller} />
        ) : (
          <div className={`s10${s.srail ? ' rail' : ''}`}>
            <div className="rail">
              <Action className="rl" action="srail">
                <Glyph controller={controller} name="ham" />
                <span>
                  <b>ПУСК</b>
                </span>
              </Action>
              <span className="sp" />
              {[
                ['sloc', 'docs', 'note', 'Документи'],
                ['sloc', 'pics', 'pic', 'Зображення'],
                ['app', 'settings', 'gear', 'Параметри'],
                ['power', '', 'power', 'Живлення'],
              ].map(([action, value, icon, label]) => (
                <Action
                  key={label}
                  className="rl"
                  action={action}
                  value={value}
                >
                  <Glyph controller={controller} name={icon} />
                  <span>{label}</span>
                </Action>
              ))}
            </div>
            <div className="sl-list" data-sk="s10l">
              {h.start10.map(([letter, items]) => (
                <Fragment key={letter}>
                  <div className="sl">{letter}</div>
                  {items.map((item) =>
                    typeof item === 'string' ? (
                      app(item)
                    ) : (
                      <Fragment key={item.f}>
                        <Action className="sa fo" action="sfold" value={item.f}>
                          <span className="sai fold">
                            <Artwork html={h.folder(24, false)} />
                          </span>
                          {item.f}
                          <span className="sch">
                            <Glyph
                              controller={controller}
                              name={s.sfold[item.f] ? 'chu' : 'chd'}
                              size={10}
                            />
                          </span>
                        </Action>
                        {s.sfold[item.f] && item.k.map((key) => app(key, true))}
                      </Fragment>
                    ),
                  )}
                </Fragment>
              ))}
            </div>
            <div className="tiles" data-sk="s10t">
              {h.tiles10.map(([title, items]) => (
                <Fragment key={title}>
                  <div className="tgh">{title}</div>
                  <div className="tg">
                    {items.map(([key, wide]) => (
                      <Action
                        key={key}
                        className={`tl${wide ? ' w2' : ''}`}
                        action="app"
                        value={key}
                      >
                        <Artwork html={h.appIco(key, wide ? 40 : 36)} />
                        <span>{h.apps[key].n}</span>
                      </Action>
                    ))}
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
