import type { WindowsController } from '../types';
import { Artwork, FileName } from './primitives';
export function Desktop({ controller }: { controller: WindowsController }) {
  const state = controller.state(),
    h = controller.helpers,
    c = h.cell();
  const position = (id: number) => state.pos[id] ?? [0, 0];
  const items = h
    .deskItems()
    .slice()
    .sort(
      (a, b) =>
        position(a.id)[0] - position(b.id)[0] ||
        position(a.id)[1] - position(b.id)[1],
    );
  return (
    <div
      className="wn-desk"
      id="wnDesk"
      data-sf="desk"
      style={{ bottom: h.tb() }}
    >
      {items.map((node) => (
        <div
          key={node.id}
          className={h.itClass(state.dk, node, 'di')}
          data-it={node.id}
          style={{
            left: 4 + position(node.id)[0] * c.w,
            top: 4 + position(node.id)[1] * c.h,
            width: c.w,
          }}
        >
          <span className="ic" style={{ height: c.i }}>
            <Artwork html={h.ico(node, c.i, true)} />
          </span>
          <FileName controller={controller} surface="desk" node={node} />
        </div>
      ))}
    </div>
  );
}
