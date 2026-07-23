export function HillsBackground() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0 w-full"
      viewBox="0 0 1440 300"
      preserveAspectRatio="none"
      style={{ height: '35%' }}
    >
      <path d="M0 180 C 240 100 360 220 600 140 C 840 60 960 200 1200 120 C 1320 90 1380 130 1440 110 L1440 300 L0 300 Z" fill="#1FA37D" opacity="0.55" />
      <path d="M0 220 C 200 160 420 260 680 190 C 940 120 1100 240 1440 180 L1440 300 L0 300 Z" fill="#12291B" opacity="0.25" />
    </svg>
  );
}

export function HillsBackgroundYellow() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0 w-full"
      viewBox="0 0 1440 300"
      preserveAspectRatio="none"
      style={{ height: "35%" }}
    >
      {/* Дальний холм */}
      <path
        d="M0 180 C 240 100 360 220 600 140 C 840 60 960 200 1200 120 C 1320 90 1380 130 1440 110 L1440 300 L0 300 Z"
        fill="#FFE082"
      />

      {/* Ближний холм */}
      <path
        d="M0 220 C 200 160 420 260 680 190 C 940 120 1100 240 1440 180 L1440 300 L0 300 Z"
        fill="#FFC531"
      />
    </svg>
  );
}

// ABOUT — полутоновая точечная сетка, затухающая к краям
export function HalftoneBackground() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-25"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="halftone" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle
            cx="13"
            cy="13"
            r="3.5"
            fill="rgba(255,255,255,0.45)"
          />
        </pattern>

        <radialGradient id="fade" cx="50%" cy="50%" r="75%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="65%" stopColor="white" stopOpacity="0.5" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        <mask id="fadeMask">
          <rect width="100%" height="100%" fill="url(#fade)" />
        </mask>
      </defs>

      <rect
        width="100%"
        height="100%"
        fill="url(#halftone)"
        mask="url(#fadeMask)"
      />
    </svg>
  );
}
// COUNTDOWN — расходящиеся лучи прожектора
// PARK — природный фон
export function NatureBackground() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.18]"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Холмы */}
      <path
        d="M0 650C220 560 420 740 720 640C980 550 1180 720 1440 600V900H0Z"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
      />

      <path
        d="M0 720C260 620 520 820 760 700C980 600 1220 760 1440 680"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
      />

      {/* Волнистые линии рельефа */}
      {[0, 40, 80, 120].map((offset) => (
        <path
          key={offset}
          d={`
            M0 ${220 + offset}
            C250 ${170 + offset}
            450 ${300 + offset}
            720 ${230 + offset}
            S1180 ${150 + offset}
            1440 ${250 + offset}
          `}
          fill="none"
          stroke="#fff"
          strokeWidth="1.5"
        />
      ))}

      {/* Листья */}
      {[
        [170, 180],
        [350, 110],
        [1230, 170],
        [1080, 120],
        [250, 650],
        [1180, 650],
      ].map(([x, y], i) => (
        <g
          key={i}
          transform={`translate(${x},${y}) rotate(${i * 25})`}
        >
          <path
  d="
    M0 0
    C8 -18 24 -30 42 -22
    C58 -15 58 15 42 22
    C24 30 8 18 0 0Z
  "
  fill="none"
  stroke="#fff"
  strokeWidth="1.5"
/>

<path
  d="M2 0 L42 0"
  stroke="#fff"
  strokeWidth="1"
/>

<path d="M16 -8 L24 0" stroke="#fff" strokeWidth=".8" />
<path d="M16 8 L24 0" stroke="#fff" strokeWidth=".8" />
<path d="M28 -10 L36 0" stroke="#fff" strokeWidth=".8" />
<path d="M28 10 L36 0" stroke="#fff" strokeWidth=".8" />
        </g>
      ))}

      {/* Веточки */}
      {[
        [100, 500],
        [1320, 300],
        [1230, 730],
        [220, 770],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x},${y})`}>
          <path
            d="M0 0 Q40 -30 80 0"
            fill="none"
            stroke="#fff"
            strokeWidth="1.5"
          />
          <path
            d="M30 -15 q8 -12 18 -4"
            fill="none"
            stroke="#fff"
            strokeWidth="1"
          />
          <path
            d="M55 -18 q8 -10 16 -2"
            fill="none"
            stroke="#fff"
            strokeWidth="1"
          />
        </g>
      ))}

      {/* Маленькие листочки */}
      {Array.from({ length: 25 }).map((_, i) => {
        const x = 60 + (i * 53) % 1320;
        const y = 80 + (i * 89) % 720;

        return (
          <g key={i} transform={`translate(${x},${y}) rotate(${i * 17})`}>
            <path
              d="M0 0 C4 -6 10 -6 14 0 C10 6 4 6 0 0Z"
              fill="none"
              stroke="#fff"
              strokeWidth="0.8"
            />
          </g>
        );
      })}
    </svg>
  );
}

// SPEAKERS — рассеянные круги-споты
export function SpotCirclesBackground() {
  const spots = [
    { cx: 120, cy: 100, r: 90 },
    { cx: 1300, cy: 180, r: 130 },
    { cx: 700, cy: 60, r: 70 },
    { cx: 200, cy: 700, r: 110 },
    { cx: 1250, cy: 650, r: 90 },
  ];
  return (
    <svg className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.15]" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 800">
      {spots.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="#FFFFFF" />
      ))}
    </svg>
  );
}