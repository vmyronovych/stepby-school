// The physics/drawing engine owns only the SVG groups, not the React controls.
export function CircuitScene() {
  return (
    <svg
      id="cbSvg"
      viewBox="0 0 1200 680"
      role="img"
      aria-label="Поле для складання електричного кола"
    >
      <defs>
        <pattern
          id="cbCell"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M40,0 H0 V40"
            fill="none"
            stroke="var(--cb-cell)"
            strokeWidth="1.5"
          />
        </pattern>
      </defs>
      <rect
        id="cbGrid"
        x="0"
        y="0"
        width="1200"
        height="680"
        fill="url(#cbCell)"
      />
      <g id="cbWires" />
      <g id="cbParts" />
      <g id="cbTerms" />
      <g id="cbDots" />
      <g id="cbLabels" />
      <path
        id="cbRubber"
        d=""
        fill="none"
        stroke="#4dabf7"
        strokeWidth="6"
        strokeDasharray="10 8"
        strokeLinecap="round"
      />
      <rect
        id="cbMarq"
        className="cb-marq"
        x="0"
        y="0"
        width="0"
        height="0"
        rx="6"
        {...{ hidden: true }}
      />
    </svg>
  );
}
