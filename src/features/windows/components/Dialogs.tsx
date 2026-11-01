import type { ReactNode } from 'react';
import type { WindowsController, WindowsWindow } from '../types';
import {
  Action,
  Artwork,
  Glyph,
  ResizeHandles,
  WindowCaps,
} from './primitives';
import { ExplorerAddress, ExplorerNavigation } from './ExplorerNavigation';
import { ComputerContent, FileItems } from './FileContent';
function DialogTitle({
  controller,
  window: w,
  title,
  icon,
}: {
  controller: WindowsController;
  window: WindowsWindow;
  title: string;
  icon?: string;
}) {
  return (
    <div className="a-tb dlg" data-drag="1">
      {icon && <Artwork html={controller.helpers.appIco(icon, 16)} />}
      <span className="tt">{title}</span>
      <WindowCaps controller={controller} window={w} dialog />
    </div>
  );
}
export function SaveDialog({
  controller,
  window: w,
}: {
  controller: WindowsController;
  window: WindowsWindow;
}) {
  const s = controller.state(),
    h = controller.helpers,
    t = h.tab(w),
    loc = t.loc,
    items = (
      loc === 'quick' && !t.q
        ? s.pins.map((id) => s.by[id]).filter(Boolean)
        : h.shown(w)
    ).filter(
      (node) =>
        node.kind === 'dir' ||
        node.drive ||
        w.ftype === 'all' ||
        node.ext === 'txt',
    );
  const types: Record<string, string> = {
    txt: 'Текстові документи (*.txt)',
    all: 'Усі файли (*.*)',
  };
  return (
    <>
      <DialogTitle
        controller={controller}
        window={w}
        title="Зберегти як"
        icon="notepad"
      />
      <ExplorerAddress controller={controller} window={w} />
      <div className="sv-tb">
        <button className="sv-b">
          Упорядкувати <Glyph controller={controller} name="chd" size={10} />
        </button>
        <Action
          className="sv-b"
          action="newdir"
          disabled={!!t.q || !h.writable(loc)}
        >
          Нова папка
        </Action>
        <span className="sp" />
        <button className="sv-b">
          <Glyph controller={controller} name="vdet" />
          <Glyph controller={controller} name="chd" size={10} />
        </button>
      </div>
      <div className="x-bd">
        <div className="x-nav" data-sk={`nav${w.id}`}>
          <ExplorerNavigation controller={controller} window={w} />
        </div>
        <div
          className="x-ct"
          data-sf={`w${w.id}`}
          data-sk={`ct${w.id}-${loc}-${t.q}`}
        >
          {!t.q && typeof loc === 'number' && s.by[loc]?.pc ? (
            <ComputerContent controller={controller} window={w} />
          ) : (
            <FileItems
              controller={controller}
              window={w}
              items={items}
              view="details"
              mode={t.q ? 'search' : 'std'}
            />
          )}
        </div>
      </div>
      <div className="sv-ft">
        <label>Ім'я файлу:</label>
        <input
          data-fk={`sn${w.id}`}
          defaultValue={w.fname}
          spellCheck={false}
          autoComplete="off"
        />
        <label>Тип файлу:</label>
        <Action className="sv-sel" action="svtype">
          {types[w.ftype]}
          <Glyph controller={controller} name="chd" size={10} />
        </Action>
      </div>
      <div className="sv-bt">
        <button className="sv-hide">
          <Glyph controller={controller} name="chu" size={10} /> Сховати папки
        </button>
        <span className="sp" />
        <span className="sv-enc">
          Кодування:
          <span className="sv-sel sm">
            UTF-8
            <Glyph controller={controller} name="chd" size={10} />
          </span>
        </span>
        <Action className="btn def" action="svok">
          Зберегти
        </Action>
        <Action className="btn" action="close">
          Скасувати
        </Action>
      </div>
      <ResizeHandles window={w} />
    </>
  );
}
function PropertyRow({
  label,
  children,
}: {
  label: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="pr">
      <span>{label}</span>
      <span>{children}</span>
    </div>
  );
}
export function PropertiesDialog({
  controller,
  window: w,
}: {
  controller: WindowsController;
  window: WindowsWindow;
}) {
  const s = controller.state(),
    h = controller.helpers,
    node = s.by[w.id2];
  if (!node)
    return (
      <DialogTitle controller={controller} window={w} title="Властивості" />
    );
  const tabs =
    node.kind === 'file'
      ? ['Загальні', 'Безпека', 'Докладно', 'Попередні версії']
      : node.drive
        ? ['Загальні', 'Знаряддя', 'Обладнання', 'Спільний доступ', 'Безпека']
        : [
            'Загальні',
            'Спільний доступ',
            'Безпека',
            'Попередні версії',
            'Настроїти',
          ];
  const bytes = (value: number) =>
      `${h.human(value)} (${h.num.format(value)} байт)`,
    disk = (value: number) => Math.ceil(value / 4096) * 4096,
    size = node.kind === 'dir' ? h.dirSize(node) : null,
    app = h.appOf(node);
  return (
    <>
      <DialogTitle
        controller={controller}
        window={w}
        title={`Властивості: ${h.full(node)}`}
      />
      <div className="p-bd">
        <div className="ptabs">
          {tabs.map((label, index) => (
            <span key={label} className={index === 0 ? 'on' : ''}>
              {label}
            </span>
          ))}
        </div>
        <div className="ppg">
          <div className="phd">
            <span className="pic">
              <Artwork html={h.ico(node, 32)} />
            </span>
            <input
              data-fk={`pn${w.id}`}
              defaultValue={w.val}
              readOnly={!!node.lock || h.inBin(node.id)}
              spellCheck={false}
              autoComplete="off"
            />
          </div>
          <div className="phr" />
          {node.drive ? (
            <>
              <PropertyRow label="Тип:">Локальний диск</PropertyRow>
              <PropertyRow label="Файлова система:">NTFS</PropertyRow>
              <div className="phr" />
              <PropertyRow
                label={
                  <>
                    <i className="sw u" />
                    Зайнято:
                  </>
                }
              >
                {bytes(Math.round((node.cap - node.free) * 1073741824))}
              </PropertyRow>
              <PropertyRow
                label={
                  <>
                    <i className="sw f" />
                    Вільно:
                  </>
                }
              >
                {bytes(Math.round(node.free * 1073741824))}
              </PropertyRow>
              <div className="phr" />
              <PropertyRow label="Місткість:">
                {bytes(node.cap * 1073741824)}
              </PropertyRow>
              <div className="ppie">
                <span
                  style={{
                    background: `conic-gradient(#2A7AE2 0 ${Math.round(((node.cap - node.free) / node.cap) * 360)}deg,#D6D6D6 0)`,
                  }}
                />
                <b>Диск {node.drive}:</b>
              </div>
            </>
          ) : (
            <>
              <PropertyRow label={node.kind === 'file' ? 'Тип файлу:' : 'Тип:'}>
                {h.type(node)}
                {node.kind === 'file' && node.ext ? ` (.${node.ext})` : ''}
              </PropertyRow>
              {node.kind === 'file' && (
                <>
                  <PropertyRow label="Програма:">
                    {app ? (
                      <>
                        <Artwork html={h.appIco(app, 16)} /> {h.apps[app].n}
                        <button className="btn sm" disabled>
                          Змінити…
                        </button>
                      </>
                    ) : (
                      'Вибрати програму'
                    )}
                  </PropertyRow>
                  <div className="phr" />
                </>
              )}
              <PropertyRow label="Розташування:">
                {h.inBin(node.id)
                  ? h.real(node.orig)
                  : h.real(s.up[node.id]) || 'Цей ПК'}
              </PropertyRow>
              <PropertyRow label="Розмір:">
                {bytes(size ? size.s : node.size)}
              </PropertyRow>
              <PropertyRow label="На диску:">
                {bytes(disk(size ? size.s : node.size))}
              </PropertyRow>
              {size && (
                <PropertyRow label="Вміст:">
                  Файлів: {size.f}; папок: {size.d}
                </PropertyRow>
              )}
              <div className="phr" />
              <PropertyRow label="Створено:">
                {h.dtLong(node.made || node.date)}
              </PropertyRow>
              {node.kind === 'file' && (
                <>
                  <PropertyRow label="Змінено:">
                    {h.dtLong(node.date)}
                  </PropertyRow>
                  <PropertyRow label="Відкрито:">
                    {h.dtLong(node.date)}
                  </PropertyRow>
                </>
              )}
              <div className="phr" />
              <PropertyRow label="Атрибути:">
                <span className="pat">
                  <label>
                    <i className={`ck${size ? ' mix' : ''}`} />
                    Лише для читання{size ? ' (тільки для файлів у папці)' : ''}
                  </label>
                  <label>
                    <i className="ck" />
                    Прихований
                  </label>
                </span>
              </PropertyRow>
            </>
          )}
        </div>
      </div>
      <div className="dg-bt">
        <Action className="btn def" action="pok">
          OK
        </Action>
        <Action className="btn" action="close">
          Скасувати
        </Action>
        <Action className="btn" action="papply">
          Застосувати
        </Action>
      </div>
    </>
  );
}
export function MessageDialog({
  controller,
  window: w,
}: {
  controller: WindowsController;
  window: WindowsWindow;
}) {
  const h = controller.helpers,
    d = w.d,
    node = d.about;
  return (
    <>
      <DialogTitle controller={controller} window={w} title={d.title} />
      <div className="dg-bd">
        {d.icon && (
          <span className="dg-ic">
            <Artwork html={h.svg(32, '0 0 32 32', h.dialogIcons[d.icon])} />
          </span>
        )}
        <div className="dg-tx">
          {d.main && (
            <div
              className="dg-main"
              dangerouslySetInnerHTML={{ __html: d.main }}
            />
          )}
          {d.text && <div dangerouslySetInnerHTML={{ __html: d.text }} />}
          {node && (
            <div className="dg-ab">
              <Artwork html={h.ico(node, 48, true)} />
              <div>
                <b>{h.full(node)}</b>
                <span>Тип: {h.type(node)}</span>
                {node.kind === 'file' && (
                  <span>Розмір: {h.human(node.size)}</span>
                )}
                <span>Дата змінення: {h.dt(node.date)}</span>
              </div>
            </div>
          )}
          {d.opts?.map((option, index) => (
            <Action
              key={index}
              className="dg-op"
              action="dlgb"
              value={-index - 1}
            >
              <Glyph
                controller={controller}
                name={index ? 'fwd' : 'check'}
                size={20}
              />
              <span>{option.t}</span>
            </Action>
          ))}
        </div>
      </div>
      <div className="dg-bt">
        {d.btns.map((button, index) => (
          <Action
            key={index}
            className={`btn${button.def ? ' def' : ''}`}
            action="dlgb"
            value={index}
          >
            {button.shield && (
              <Artwork html={h.svg(14, '0 0 32 32', h.dialogIcons.shield)} />
            )}{' '}
            {button.t}
          </Action>
        ))}
      </div>
    </>
  );
}
