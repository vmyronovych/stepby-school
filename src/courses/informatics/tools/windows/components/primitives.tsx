import type { CSSProperties, ReactNode } from 'react';
import type {
  FileNode,
  Selection,
  WindowsController,
  WindowsWindow,
} from '../types';
export function Artwork({ html }: { html: string }) {
  return (
    <span
      style={{ display: 'contents' }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
export function Glyph({
  controller,
  name,
  size,
}: {
  controller: WindowsController;
  name: string;
  size?: number;
}) {
  return <Artwork html={controller.helpers.g(name, size)} />;
}
export function Action({
  action,
  value,
  children,
  className,
  disabled,
  title,
  style,
}: {
  action?: string;
  value?: string | number;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  title?: string;
  style?: CSSProperties;
}) {
  return (
    <button
      type="button"
      className={className}
      data-a={action ?? ''}
      data-v={value}
      disabled={disabled}
      title={title}
      style={style}
    >
      {children}
    </button>
  );
}
export function WindowCaps({
  controller,
  window,
  dialog = false,
}: {
  controller: WindowsController;
  window: WindowsWindow;
  dialog?: boolean;
}) {
  return (
    <span className="caps">
      {!dialog && (
        <>
          <Action className="cap" action="min">
            <Glyph controller={controller} name="min" size={10} />
          </Action>
          <Action className="cap" action="max">
            <Glyph
              controller={controller}
              name={window.max ? 'rest' : 'max'}
              size={10}
            />
          </Action>
        </>
      )}
      <Action className="cap x" action="close">
        <Glyph controller={controller} name="x" size={10} />
      </Action>
    </span>
  );
}
export function ResizeHandles({ window }: { window: WindowsWindow }) {
  return window.max ? null : (
    <>
      {['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'].map((direction) => (
        <i
          key={direction}
          className={`rs rs-${direction}`}
          data-rs={direction}
        />
      ))}
    </>
  );
}
export function FileName({
  controller,
  surface,
  node,
  line = false,
}: {
  controller: WindowsController;
  surface: string;
  node: FileNode;
  line?: boolean;
}) {
  const edit = controller.state().edit;
  return edit && edit.sf === surface && edit.id === node.id ? (
    <textarea
      className={`ren${line ? ' line' : ''}`}
      data-fk="ren"
      rows={1}
      spellCheck={false}
      autoComplete="off"
      defaultValue={edit.val}
    />
  ) : (
    <span className="nm">{controller.helpers.full(node)}</span>
  );
}
export function FileCheckbox({
  controller,
  selection,
  node,
}: {
  controller: WindowsController;
  selection: Selection;
  node: FileNode;
}) {
  return controller.state().boxes ? (
    <span
      className={`cbx${selection.sel.includes(node.id) ? ' on' : ''}`}
      data-a="chk"
      data-v={node.id}
    >
      <Glyph controller={controller} name="check" size={10} />
    </span>
  ) : null;
}
