import type { ReactNode } from 'react';
import type { WindowsController, WindowsWindow } from '../types';
import { Action, Artwork, Glyph } from './primitives';
function RibbonGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rbg">
      <div className="rbgb">{children}</div>
      <div className="rbgl">{title}</div>
    </div>
  );
}
export function ExplorerCommands({
  controller,
  window: w,
}: {
  controller: WindowsController;
  window: WindowsWindow;
}) {
  const s = controller.state(),
    h = controller.helpers,
    f = h.flags(w),
    visible = (typeof f.loc === 'number' && !s.by[f.loc]?.pc) || !!f.t.q;
  const command = (
    action: string,
    icon: string,
    label: string,
    disabled = false,
    value?: string,
    small = false,
  ) => (
    <Action
      key={action + label}
      className={small ? 'rbs' : 'rbb'}
      action={action}
      value={value}
      disabled={disabled}
    >
      {small ? (
        <Glyph controller={controller} name={icon} />
      ) : (
        <span className="bi c-bl">
          <Glyph controller={controller} name={icon} size={32} />
        </span>
      )}
      <span>{label}</span>
    </Action>
  );
  if (s.ver === '11')
    return (
      <div className="x-cmd">
        <Action className="cb nw" action="newm" disabled={!f.wr}>
          <span className="pl">
            <Glyph controller={controller} name="plus" />
          </span>
          Створити
          <Glyph controller={controller} name="chd" size={10} />
        </Action>
        <i className="cs" />
        {[
          ['cut', 'cut', 'Вирізати (Ctrl+X)', !f.canCut],
          ['copy', 'copy', 'Копіювати (Ctrl+C)', !f.any],
          ['paste', 'paste', 'Вставити (Ctrl+V)', !f.canPaste],
          ['ren', 'ren', 'Перейменувати (F2)', !f.canRen],
          ['', 'share', 'Поділитися', !f.any],
          ['del', 'del', 'Видалити (Delete)', !f.canDel],
        ].map(([action, icon, title, disabled]) => (
          <Action
            key={String(title)}
            className="ci"
            action={String(action)}
            disabled={!!disabled}
            title={String(title)}
          >
            <Glyph controller={controller} name={String(icon)} />
          </Action>
        ))}
        <i className="cs" />
        <Action className="cb" action="sortm" disabled={!visible}>
          <Glyph controller={controller} name="sort" />
          Сортувати
          <Glyph controller={controller} name="chd" size={10} />
        </Action>
        <Action className="cb" action="viewm" disabled={!visible}>
          <Glyph controller={controller} name="view" />
          Переглянути
          <Glyph controller={controller} name="chd" size={10} />
        </Action>
        {f.inBin && (
          <>
            <i className="cs" />
            <Action
              className="cb"
              action="emptybin"
              disabled={!s.bin.kids.length}
            >
              <Artwork html={h.icons.bin(16, true)} />
              Очистити кошик
            </Action>
            <Action
              className="cb"
              action="restoreall"
              disabled={!s.bin.kids.length}
            >
              <Glyph controller={controller} name="restore" />
              Відновити всі елементи
            </Action>
          </>
        )}
        <Action className="ci" action="more">
          <Glyph controller={controller} name="more" />
        </Action>
        <span className="sp" />
        <Action
          className={`cb${w.pane === 'details' ? ' on' : ''}`}
          action="pane"
          value="details"
        >
          <Glyph controller={controller} name="pane" />
          Відомості
        </Action>
      </div>
    );
  const tab = w.rtab === 'bin' && !f.inBin ? 'home' : w.rtab,
    open = !w.rmin || w.rpop;
  return (
    <>
      <div className={`rt${f.inBin ? ' ctxon' : ''}`}>
        <Action className="rf" action="filemenu">
          Файл
        </Action>
        {[
          ['home', 'Основне'],
          ['share', 'Спільний доступ'],
          ['view', 'Вигляд'],
          ...(f.inBin ? [['bin', 'Керування']] : []),
        ].map(([key, label]) => (
          <Action
            key={key}
            className={`rtb${open && tab === key ? ' on' : ''}${key === 'bin' ? ' ctx' : ''}`}
            action="rtab"
            value={key}
          >
            {key === 'bin' && <i>Засоби кошика</i>}
            {label}
          </Action>
        ))}
        <span className="sp" />
        <Action className="rmn" action="rmin">
          <Glyph
            controller={controller}
            name={w.rmin ? 'chd' : 'chu'}
            size={10}
          />
        </Action>
        <span className="rhelp">?</span>
      </div>
      {open && (
        <div className={`rb${w.rpop ? ' pop' : ''}`}>
          {tab === 'view' ? (
            <>
              <RibbonGroup title="Панелі">
                {command('navm', 'pane', 'Область переходів')}
                <div className="rbc">
                  {command(
                    'pane',
                    'eye',
                    'Область перегляду',
                    false,
                    'preview',
                    true,
                  )}
                  {command(
                    'pane',
                    'props',
                    'Панель відомостей',
                    false,
                    'details',
                    true,
                  )}
                </div>
              </RibbonGroup>
              <RibbonGroup title="Макет">
                <div className="rbl">
                  {h.views.map(([value, label]) => (
                    <Action
                      key={value}
                      className={`rbv${visible && h.viewOf(f.loc) === value ? ' on' : ''}`}
                      action="view"
                      value={value}
                      disabled={!visible}
                    >
                      <Glyph
                        controller={controller}
                        name={
                          value === 'details'
                            ? 'vdet'
                            : value === 'list' || value === 'small'
                              ? 'vlist'
                              : 'vbig'
                        }
                      />
                      {label}
                    </Action>
                  ))}
                </div>
              </RibbonGroup>
              <RibbonGroup title="Поточне подання">
                {command('sortm', 'sort', 'Сортувати за', !visible)}
              </RibbonGroup>
              <RibbonGroup title="Показати або приховати">
                <div className="rbc">
                  {[
                    ['boxes', 'Прапорці елементів', s.boxes],
                    ['ext', 'Розширення імен файлів', s.showExt],
                    ['hidden', 'Приховані елементи', s.hidden],
                  ].map(([key, label, on]) => (
                    <Action
                      key={String(key)}
                      className="rbs rck"
                      action="opt"
                      value={String(key)}
                    >
                      <span className={`ck${on ? ' on' : ''}`}>
                        {!!on && (
                          <Glyph
                            controller={controller}
                            name="check"
                            size={10}
                          />
                        )}
                      </span>
                      <span>{label}</span>
                    </Action>
                  ))}
                </div>
              </RibbonGroup>
            </>
          ) : tab === 'bin' ? (
            <>
              <RibbonGroup title="Керування">
                {command(
                  'emptybin',
                  'del',
                  'Очистити кошик',
                  !s.bin.kids.length,
                )}
                {command('', 'props', 'Властивості кошика', true)}
              </RibbonGroup>
              <RibbonGroup title="Відновити">
                {command(
                  'restoreall',
                  'restore',
                  'Відновити всі елементи',
                  !s.bin.kids.length,
                )}
                {command(
                  'restore',
                  'restore',
                  'Відновити вибрані елементи',
                  !f.any,
                )}
              </RibbonGroup>
            </>
          ) : tab === 'share' ? (
            <>
              <RibbonGroup title="Надіслати">
                {command('', 'share', 'Поділитися', !f.any)}
                {command('', 'mail', 'Надіслати поштою', !f.any)}
                {command('', 'zip', 'Стиснути (ZIP)', !f.any)}
              </RibbonGroup>
              <RibbonGroup title="Спільний доступ">
                {command('', 'user', 'Конкретні люди…', !f.any)}
                {command('', 'shield', 'Додаткові параметри безпеки', !f.any)}
              </RibbonGroup>
            </>
          ) : (
            <>
              <RibbonGroup title="Буфер обміну">
                {command(
                  'pin',
                  'pin',
                  'Закріпити на панелі швидкого доступу',
                  !f.canPin,
                )}
                {command('copy', 'copy', 'Копіювати', !f.any)}
                {command('paste', 'paste', 'Вставити', !f.canPaste)}
                <div className="rbc">
                  {command(
                    'cut',
                    'cut',
                    'Вирізати',
                    !f.canCut,
                    undefined,
                    true,
                  )}
                  {command(
                    'copypath',
                    'copy',
                    'Копіювати шлях',
                    !f.any,
                    undefined,
                    true,
                  )}
                  {command(
                    '',
                    'paste',
                    'Вставити ярлик',
                    true,
                    undefined,
                    true,
                  )}
                </div>
              </RibbonGroup>
              <RibbonGroup title="Упорядкувати">
                {command('movem', 'moveto', 'Перемістити до', !f.canCut)}
                {command('copym', 'copyto', 'Копіювати до', !f.any || f.inBin)}
                {command('del', 'x', 'Видалити', !f.canDel)}
                {command('ren', 'ren', 'Перейменувати', !f.canRen)}
              </RibbonGroup>
              <RibbonGroup title="Створити">
                {command('newdir', 'newdir', 'Нова папка', !f.wr)}
                <div className="rbc">
                  {command(
                    'newm',
                    'note',
                    'Новий елемент',
                    !f.wr,
                    undefined,
                    true,
                  )}
                  {command(
                    '',
                    'share',
                    'Простий доступ',
                    true,
                    undefined,
                    true,
                  )}
                </div>
              </RibbonGroup>
              <RibbonGroup title="Відкрити">
                {command(
                  'props',
                  'props',
                  'Властивості',
                  !(f.any || (typeof f.loc === 'number' && !s.by[f.loc].pc)),
                )}
                <div className="rbc">
                  {command('open', 'open', 'Відкрити', !f.one, undefined, true)}
                  {command('', 'edit', 'Редагувати', true, undefined, true)}
                  {command('', 'hist', 'Журнал', true, undefined, true)}
                </div>
              </RibbonGroup>
              <RibbonGroup title="Виділити">
                <div className="rbc">
                  {command(
                    'selall',
                    'selall',
                    'Виділити все',
                    false,
                    undefined,
                    true,
                  )}
                  {command(
                    'selnone',
                    'selnone',
                    'Скасувати виділення',
                    !f.any,
                    undefined,
                    true,
                  )}
                  {command(
                    'selinv',
                    'selinv',
                    'Інвертувати виділення',
                    false,
                    undefined,
                    true,
                  )}
                </div>
              </RibbonGroup>
            </>
          )}
        </div>
      )}
    </>
  );
}
