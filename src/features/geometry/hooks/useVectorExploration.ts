import { useRef, useState, type PointerEvent, type KeyboardEvent } from 'react';
import type { Point, VectorEngine } from '../types';

const clamp = (value: number, max: number) => Math.max(1, Math.min(max, value));
const copyPoints = (points: Point[]) =>
  points.map((point) => [...point] as Point);

export function useVectorExploration(engine: VectorEngine) {
  const [lesson, setLesson] = useState(0);
  const [preset, setPreset] = useState(engine.lessons[0].preset);
  const [points, setPoints] = useState(() =>
    copyPoints(engine.presets[engine.lessons[0].preset].points),
  );
  const [selected, setSelected] = useState(1);
  const [lines, setLines] = useState(false);
  const drag = useRef<{ index: number; id: number } | null>(null);
  const result = engine.classify(points);
  const shift = (
    [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ] as Point[]
  ).find(([dx, dy]) =>
    points
      .slice(2)
      .every(
        ([x, y]) => x + dx >= 1 && x + dx <= 17 && y + dy >= 1 && y + dy <= 11,
      ),
  );

  function loadPreset(key: string) {
    setPreset(key);
    setPoints(copyPoints(engine.presets[key].points));
  }
  function changeLesson(index: number) {
    setLesson(index);
    setSelected(1);
    setLines(index === 3);
    loadPreset(engine.lessons[index].preset);
  }
  function move(index: number, dx: number, dy: number) {
    setPoints((current) =>
      current.map((point, i) =>
        i === index
          ? [clamp(point[0] + dx, 17), clamp(point[1] + dy, 11)]
          : point,
      ),
    );
  }
  function onPointerDown(event: PointerEvent<SVGSVGElement>) {
    const handle =
      event.target instanceof Element
        ? event.target.closest<SVGGElement>('[data-point]')
        : null;
    if (!handle) return;
    const index = Number(handle.dataset.point);
    setSelected(index);
    drag.current = { index, id: event.pointerId };
    event.currentTarget.setPointerCapture(event.pointerId);
    handle.focus();
    event.preventDefault();
  }
  function onPointerMove(event: PointerEvent<SVGSVGElement>) {
    const active = drag.current;
    const transform = event.currentTarget.getScreenCTM();
    if (!active || active.id !== event.pointerId || !transform) return;
    const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(
      transform.inverse(),
    );
    setPoints((current) =>
      current.map((value, index) =>
        index === active.index
          ? [
              clamp(Math.round(point.x / 40), 17),
              clamp(Math.round(point.y / 40), 11),
            ]
          : value,
      ),
    );
  }
  function onKeyDown(event: KeyboardEvent<SVGSVGElement>) {
    const handle =
      event.target instanceof Element
        ? event.target.closest<SVGGElement>('[data-point]')
        : null;
    const keys: Record<string, Point> = {
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
    };
    if (!handle || !keys[event.key]) return;
    const index = Number(handle.dataset.point);
    setSelected(index);
    move(index, ...keys[event.key]);
    event.preventDefault();
  }
  function translate() {
    if (!shift) return;
    setPoints((current) =>
      current.map((point, index) =>
        index < 2 ? point : [point[0] + shift[0], point[1] + shift[1]],
      ),
    );
  }
  return {
    lesson,
    preset,
    points,
    selected,
    lines,
    result,
    canTranslate: !!shift,
    setSelected,
    setLines,
    loadPreset,
    changeLesson,
    move,
    translate,
    reverse: () =>
      setPoints((current) => [current[1], current[0], ...current.slice(2)]),
    boardEvents: {
      onPointerDown,
      onPointerMove,
      onKeyDown,
      onPointerUp: () => {
        drag.current = null;
      },
      onPointerCancel: () => {
        drag.current = null;
      },
      onLostPointerCapture: () => {
        drag.current = null;
      },
    },
  };
}
