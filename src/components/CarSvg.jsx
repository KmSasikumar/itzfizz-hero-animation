/**
 * Original, stylized side-profile car illustration drawn for this assignment.
 * It is not the reference demo's artwork: simple flat shapes only.
 * The two wheel groups carry the `car-wheel` class so GSAP can rotate them
 * (rotation is a transform, so it stays on the compositor).
 */
export default function CarSvg() {
  const wheel = (cx) => (
    <g className="car-wheel">
      <circle cx={cx} cy="92" r="24" fill="#10151c" />
      <circle cx={cx} cy="92" r="24" fill="none" stroke="#3a4552" strokeWidth="2" />
      {/* Spokes, so the rotation is visible while scrolling. */}
      <line x1={cx} y1="92" x2={cx} y2="72" stroke="#9aa7b4" strokeWidth="4" strokeLinecap="round" />
      <line x1={cx} y1="92" x2={cx + 17} y2="102" stroke="#9aa7b4" strokeWidth="4" strokeLinecap="round" />
      <line x1={cx} y1="92" x2={cx - 17} y2="102" stroke="#9aa7b4" strokeWidth="4" strokeLinecap="round" />
      <circle cx={cx} cy="92" r="7" fill="#d4ff3f" />
    </g>
  );

  return (
    <svg
      viewBox="0 0 380 122"
      className="h-auto w-full"
      role="img"
      aria-label="Stylized car illustration"
    >
      {/* Ground shadow */}
      <ellipse cx="190" cy="112" rx="158" ry="7" fill="#000000" opacity="0.4" />
      {/* Body */}
      <path
        d="M20 90 Q24 62 66 56 L108 50 Q138 24 196 22 L246 22 Q300 24 330 52 Q356 62 360 90 L360 95 L20 95 Z"
        fill="#e8edf2"
      />
      {/* Cabin glass */}
      <path
        d="M118 52 Q142 31 190 29 L232 29 Q276 31 304 52 L118 52 Z"
        fill="#0b0f14"
        opacity="0.85"
      />
      {/* Accent stripe + headlight */}
      <rect x="20" y="82" width="340" height="4" rx="2" fill="#d4ff3f" />
      <circle cx="344" cy="70" r="6" fill="#d4ff3f" />
      {wheel(92)}
      {wheel(288)}
    </svg>
  );
}
