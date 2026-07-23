export function HillsBackground() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0 w-full"
      viewBox="0 0 1440 300"
      preserveAspectRatio="none"
      style={{ height: '35%' }}
    >
      <path d="M0 180 C 240 100 360 220 600 140 C 840 60 960 200 1200 120 C 1320 90 1380 130 1440 110 L1440 300 L0 300 Z" fill="#4f791f" opacity="0.55" />
      <path d="M0 220 C 200 160 420 260 680 190 C 940 120 1100 240 1440 180 L1440 300 L0 300 Z" fill="#388c67" opacity="" />
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
        fill="#f9bf00"
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

// PARK — природный фон с PNG-листьями
const LEAF_IMAGES = [
  '/images/leafes/leaf-1.png',
  '/images/leafes/leaf-2.png',
  '/images/leafes/leaf-3.png',
  '/images/leafes/leaf-4.png',
  '/images/leafes/leaf-5.png',
];

// Позиции крупных листьев (в процентах от контейнера, чтобы адаптировалось под любой размер секции)
const LARGE_LEAVES = [
  { left: '12%', top: '20%', size: 70, rotate: -15 },
  { left: '24%', top: '12%', size: 55, rotate: 30 },
  { left: '85%', top: '19%', size: 65, rotate: -25 },
  { left: '75%', top: '13%', size: 50, rotate: 12 },
  { left: '17%', top: '72%', size: 60, rotate: 40 },
  { left: '82%', top: '72%', size: 68, rotate: -35 },
];

// Позиции мелких листочков-точек текстуры
const SMALL_LEAVES = Array.from({ length: 14 }).map((_, i) => ({
  left: `${(4 + ((i * 53) % 92)).toFixed(1)}%`,
  top: `${(6 + ((i * 89) % 88)).toFixed(1)}%`,
  size: 18 + (i % 3) * 4,
  rotate: i * 17,
}));

export function NatureBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 w-full h-full overflow-hidden opacity-[0.35]">
      {/* Холмы и рельеф — оставлены как тонкие линии для глубины */}
      <svg
        className="absolute inset-0 w-full h-full opacity-50"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
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
      </svg>

      {/* Крупные PNG-листья */}
      {LARGE_LEAVES.map((leaf, i) => (
        <img
          key={`large-${i}`}
          src={LEAF_IMAGES[i % LEAF_IMAGES.length]}
          alt=""
          aria-hidden="true"
          loading="lazy"
          style={{
            position: 'absolute',
            left: leaf.left,
            top: leaf.top,
            width: leaf.size,
            height: leaf.size,
            transform: `rotate(${leaf.rotate}deg)`,
            objectFit: 'contain',
          }}
        />
      ))}

      {/* Мелкие PNG-листочки для текстуры */}
      {SMALL_LEAVES.map((leaf, i) => (
        <img
          key={`small-${i}`}
          src={LEAF_IMAGES[i % LEAF_IMAGES.length]}
          alt=""
          aria-hidden="true"
          loading="lazy"
          style={{
            position: 'absolute',
            left: leaf.left,
            top: leaf.top,
            width: leaf.size,
            height: leaf.size,
            transform: `rotate(${leaf.rotate}deg)`,
            objectFit: 'contain',
            opacity: 0.6,
          }}
        />
      ))}
    </div>
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