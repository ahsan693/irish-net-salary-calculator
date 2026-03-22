// FishSVG.jsx
export function FishSVG({ x, y, facingRight, size = 1, color = '#1a7aaa', opacity = 0.85 }) {
  const flip = facingRight ? 1 : -1;
  return (
    <g transform={`translate(${x},${y}) scale(${flip * size},${size})`} opacity={opacity}>
      <ellipse cx={0} cy={0} rx={18} ry={7} fill={color} />
      <polygon points="0,0 -20,-6 -20,6" fill={color} opacity={0.7} />
      <circle cx={7} cy={-2} r={2} fill="rgba(255,255,255,0.55)" />
    </g>
  );
}

export function SharkSVG({ x, y, facingRight }) {
  const flip = facingRight ? 1 : -1;
  return (
    <g transform={`translate(${x},${y}) scale(${flip},1)`} opacity={0.65}>
      <ellipse cx={0} cy={0} rx={55} ry={20} fill="rgba(5,15,35,0.7)" />
      <polygon points="0,-20 35,0 0,20" fill="rgba(5,15,35,0.6)" />
      <polygon points="0,-14 -12,-36 12,-36" fill="rgba(5,15,35,0.6)" />
    </g>
  );
}
