import type { WindowsController, WindowsWindow } from '../types';
import {
  Action,
  Artwork,
  Glyph,
  ResizeHandles,
  WindowCaps,
} from './primitives';
function TextLines({ count }: { count: number }) {
  return (
    <div className="ln">
      {Array.from({ length: count }, (_, index) => (
        <i key={index} style={{ width: `${60 + ((index * 37) % 35)}%` }} />
      ))}
    </div>
  );
}
export function ApplicationWindow({
  controller,
  window: w,
}: {
  controller: WindowsController;
  window: WindowsWindow;
}) {
  const s = controller.state(),
    h = controller.helpers,
    file = w.file != null ? s.by[w.file] : null,
    app = h.apps[w.app] ?? { n: w.app },
    name = file?.name.replace(/_/g, ' ') ?? '';
  const title =
    w.app === 'notepad'
      ? `${w.dirty ? '*' : ''}${file ? file.name : 'Без назви'} – Блокнот`
      : file
        ? `${file.name} – ${app.n}`
        : app.n;
  let content;
  if (w.app === 'notepad')
    content = (
      <>
        <div className="np-m">
          <Action action="npfile">Файл</Action>
          {['Редагування', 'Формат', 'Вигляд', 'Довідка'].map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
        <textarea
          className="np-t"
          data-fk={`np${w.id}`}
          spellCheck={false}
          defaultValue={w.text}
        />
        <div className="np-sb">
          <span>Рядок 1, стовпець 1</span>
          <span>100%</span>
          <span>Windows (CRLF)</span>
          <span>UTF-8</span>
        </div>
      </>
    );
  else if (w.app === 'photos')
    content = (
      <div className="ph">
        {file ? (
          <div className="ph-img">
            <Artwork html={h.pic(file, 560)} />
          </div>
        ) : (
          <p>Немає фотографій</p>
        )}
      </div>
    );
  else if (w.app === 'paint')
    content = (
      <>
        <div className="pt-rb">
          {['Файл', 'Основне', 'Вигляд'].map((label, index) => (
            <span key={label} className={index === 1 ? 'on' : ''}>
              {label}
            </span>
          ))}
        </div>
        <div className="pt-tl">
          {[
            '#000000',
            '#7F7F7F',
            '#880015',
            '#ED1C24',
            '#FF7F27',
            '#FFF200',
            '#22B14C',
            '#00A2E8',
            '#3F48CC',
            '#A349A4',
            '#FFFFFF',
            '#C3C3C3',
          ].map((color) => (
            <i key={color} style={{ background: color }} />
          ))}
        </div>
        <div className="pt-cv">
          <div className="pt-img">
            {file && (
              <Artwork
                html={h
                  .pic(file, 420)
                  .replace('viewBox="0 -20 160 160"', 'viewBox="0 0 160 120"')}
              />
            )}
          </div>
        </div>
      </>
    );
  else if (w.app === 'word')
    content = (
      <>
        <div className="wd-rb">
          {[
            'Файл',
            'Основне',
            'Вставлення',
            'Конструктор',
            'Макет',
            'Посилання',
            'Рецензування',
            'Вигляд',
          ].map((label, index) => (
            <span key={label} className={index === 1 ? 'on' : ''}>
              {label}
            </span>
          ))}
        </div>
        <div className="wd-bd">
          <div className="wd-pg">
            {file && (
              <>
                <h4>{name}</h4>
                <TextLines count={9} />
              </>
            )}
          </div>
        </div>
      </>
    );
  else if (w.app === 'ppt')
    content = (
      <>
        <div className="wd-rb pp">
          {[
            'Файл',
            'Основне',
            'Вставлення',
            'Конструктор',
            'Переходи',
            'Анімація',
            'Показ слайдів',
          ].map((label, index) => (
            <span key={label} className={index === 1 ? 'on' : ''}>
              {label}
            </span>
          ))}
        </div>
        <div className="pp-bd">
          <div className="pp-th">
            {[1, 2, 3].map((index) => (
              <i key={index} className={index === 1 ? 'on' : ''} />
            ))}
          </div>
          <div className="pp-sl">
            <b>{name || 'Натисніть, щоб додати заголовок'}</b>
            <span>{file ? 'Учень' : 'Підзаголовок'}</span>
          </div>
        </div>
      </>
    );
  else if (w.app === 'media')
    content = (
      <div className="md">
        <Artwork html={h.appIco('media', 96)} />
        <b>{file ? h.full(file, true) : 'Медіапрогравач'}</b>
        <div className="md-bar">
          <i />
        </div>
        <div className="md-t">
          <span>0:00</span>
          <span>
            {file ? '3:' + String(file.size % 60).padStart(2, '0') : '0:00'}
          </span>
        </div>
        <div className="md-c">
          <Glyph controller={controller} name="back" size={20} />
          <span className="pl">
            <svg width="20" height="20" viewBox="0 0 16 16">
              <path d="M5 3v10l8-5z" fill="currentColor" />
            </svg>
          </span>
          <Glyph controller={controller} name="fwd" size={20} />
        </div>
      </div>
    );
  else if (w.app === 'edge')
    content = (
      <>
        <div className="ed-tb">
          <span className="ed-tab">
            <Artwork html={h.appIco('edge', 14)} />
            {file ? h.full(file, true) : 'Нова вкладка'}
          </span>
        </div>
        <div className="ed-ad">
          <Glyph controller={controller} name="back" />
          <Glyph controller={controller} name="fwd" />
          <Glyph controller={controller} name="refresh" />
          <span className="ed-url">
            {file
              ? 'file:///' + h.real(file.id).replace(/\\/g, '/')
              : 'Пошук або введення веб-адреси'}
          </span>
        </div>
        <div className="ed-bd">
          {file ? (
            <div className="wd-pg">
              <h4>{name}</h4>
              <TextLines count={12} />
            </div>
          ) : (
            <div className="ed-new">
              <Artwork html={h.appIco('edge', 64)} />
            </div>
          )}
        </div>
      </>
    );
  else
    content = (
      <div className="gen">
        <Artwork html={h.appIco(w.app, 72)} />
        <b>{app.n}</b>
      </div>
    );
  return (
    <>
      <div className="a-tb" data-drag="1">
        <Artwork html={h.appIco(w.app, 16)} />
        <span className="tt">{title}</span>
        <WindowCaps controller={controller} window={w} />
      </div>
      <div className="a-bd">{content}</div>
      <ResizeHandles window={w} />
    </>
  );
}
