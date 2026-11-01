import type { SVGProps } from 'react';
import type { Point, VectorEngine, VectorClassification } from '../types';

const names = ['A', 'B', 'C', 'D'];
function VectorArrow({
  start,
  end,
  color,
  lines,
}: {
  start: Point;
  end: Point;
  color: string;
  lines: boolean;
}) {
  const [x, y] = start.map((coordinate) => coordinate * 40);
  const [tx, ty] = end.map((coordinate) => coordinate * 40);
  if (x === tx && y === ty)
    return (
      <circle cx={x} cy={y} r={12} fill="none" stroke={color} strokeWidth={3} />
    );
  const length = Math.hypot(tx - x, ty - y),
    ux = (tx - x) / length,
    uy = (ty - y) / length;
  return (
    <>
      {lines && (
        <line
          x1={x - ux * 1200}
          y1={y - uy * 1200}
          x2={x + ux * 1200}
          y2={y + uy * 1200}
          stroke={color}
          opacity={0.35}
          strokeWidth={2}
          strokeDasharray="8 8"
        />
      )}
      <line
        x1={x}
        y1={y}
        x2={tx - ux * 9}
        y2={ty - uy * 9}
        stroke={color}
        strokeWidth={5}
        strokeLinecap="round"
      />
      <path
        d={`M ${tx} ${ty} L ${tx - ux * 20 + uy * 8} ${ty - uy * 20 - ux * 8} L ${tx - ux * 20 - uy * 8} ${ty - uy * 20 + ux * 8} Z`}
        fill={color}
      />
    </>
  );
}
interface VectorBoardProps extends Omit<
  SVGProps<SVGSVGElement>,
  'points' | 'result'
> {
  points: Point[];
  selected: number;
  lines: boolean;
  result: VectorClassification;
  formatLength: VectorEngine['length'];
}
export function VectorBoard({
  points,
  selected,
  lines,
  result,
  formatLength,
  ...events
}: VectorBoardProps) {
  return (
    <svg
      {...events}
      className="vec-board"
      viewBox="0 0 720 480"
      role="group"
      aria-label="Рухомі точки A, B, C, D"
    >
      <desc>
        Фіолетовий вектор AB: модуль {formatLength(result.n)}. Бірюзовий вектор
        CD: модуль {formatLength(result.m)}.{' '}
        {result.equal ? 'Вектори рівні.' : 'Вектори не рівні.'}
      </desc>
      <defs>
        <pattern
          id="vec-grid"
          width={40}
          height={40}
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 H 0 V 40"
            fill="none"
            stroke="#dddff0"
            strokeWidth={1}
          />
        </pattern>
      </defs>
      <rect width={720} height={480} fill="#fafaff" />
      <rect width={720} height={480} fill="url(#vec-grid)" />
      <g className="vec-arrows">
        <VectorArrow
          start={points[0]}
          end={points[1]}
          color="#6450c8"
          lines={lines}
        />
        <VectorArrow
          start={points[2]}
          end={points[3]}
          color="#087f8c"
          lines={lines}
        />
      </g>
      {points.map((point, index) => {
        const paired = points[index ^ 1];
        const coincides = point[0] === paired[0] && point[1] === paired[1];
        const otherPair = points[index < 2 ? 2 : 0];
        const sharedStart =
          index % 2 === 0 &&
          point[0] === otherPair[0] &&
          point[1] === otherPair[1];
        const label = coincides
          ? index % 2 === 1
            ? `${names[index - 1]} = ${names[index]}`
            : ''
          : names[index];
        return (
          <g
            key={index}
            data-point={index}
            tabIndex={0}
            role="button"
            className={`vec-point${index < 2 ? '' : ' teal'}${selected === index ? ' selected' : ''}`}
            transform={`translate(${point[0] * 40} ${point[1] * 40})`}
            aria-label={`Точка ${names[index]}. Клавіші зі стрілками пересувають на одну клітинку.`}
          >
            <circle r={21} className="vec-hit" />
            <circle r={6} className="vec-handle" />
            <text
              x={0}
              y={index % 2 === 0 ? (sharedStart && index === 2 ? 28 : -18) : 28}
              textAnchor="middle"
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
