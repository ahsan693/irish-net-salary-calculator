// FishSVG.jsx
export function FishSVG({ x, y, facingRight, size = 1, color = '#1a7aaa', opacity = 0.85 }) {
  const flip = facingRight ? 1 : -1;
  return (
    <g transform={`translate(${x},${y}) scale(${flip * size},${size})`} opacity={opacity}>
      {/* Main body */}
      <ellipse cx={0} cy={0} rx={32} ry={14} fill={color} />
      {/* Tail */}
      <polygon points="0,0 -35,-12 -35,12" fill={color} opacity={0.8} />
      {/* Dorsal fin */}
      <polygon points="-5,-14 -2,-28 2,-14" fill={color} opacity={0.9} />
      {/* Belly */}
      <ellipse cx={0} cy={3} rx={28} ry={8} fill={`${color}dd`} opacity={0.6} />
      {/* Eye */}
      <circle cx={18} cy={-3} r={3.5} fill="rgba(255,255,255,0.8)" />
      <circle cx={19} cy={-3} r={1.5} fill="rgba(0,0,0,0.6)" />
      {/* Gill line */}
      <line x1={8} y1={-10} x2={8} y2={10} stroke={color} strokeWidth={1} opacity={0.6} />
    </g>
  );
}

export function SharkSVG({ x, y, facingRight }) {
  const flip = facingRight ? 1 : -1;
  return (
    <g transform={`translate(${x},${y}) scale(${flip},1)`} opacity={0.75}>
      {/* Main body - larger, more tapered */}
      <ellipse cx={0} cy={0} rx={75} ry={28} fill="rgba(15,40,60,0.9)" />
      {/* Shark head/snout */}
      <polygon points="75,0 95,-8 95,8" fill="rgba(10,30,50,0.95)" />
      {/* Dorsal fin - large and menacing */}
      <polygon points="-15,-28 -8,-52 0,-28" fill="rgba(20,50,75,0.8)" />
      {/* Second dorsal fin */}
      <polygon points="20,-25 25,-40 30,-25" fill="rgba(20,50,75,0.7)" />
      {/* Tail fin - wide and powerful */}
      <polygon points="-70,0 -100,-20 -100,20" fill="rgba(15,40,60,0.85)" />
      {/* Bottom fin */}
      <polygon points="-10,28 -5,42 5,28" fill="rgba(20,50,75,0.6)" />
      {/* Gill marks */}
      <line x1={20} y1={-20} x2={20} y2={20} stroke="rgba(200,220,240,0.15)" strokeWidth={2} />
      <line x1={30} y1={-18} x2={30} y2={18} stroke="rgba(200,220,240,0.15)" strokeWidth={2} />
      <line x1={40} y1={-16} x2={40} y2={16} stroke="rgba(200,220,240,0.15)" strokeWidth={2} />
      {/* Eye */}
      <circle cx={50} cy={-15} r={5} fill="rgba(255,100,100,0.7)" />
      <circle cx={51} cy={-14} r={2} fill="rgba(0,0,0,0.8)" />
    </g>
  );
}

export function JumpingFishSVG({ x, y, jumpPhase, size = 1.2, color = '#2a9acd' }) {
  // jumpPhase: 0 to 1, represents where it is in the jump arc
  const jumpHeight = 80;
  const arc = Math.sin(jumpPhase * Math.PI) * jumpHeight;
  const rotation = jumpPhase * 60 - 30; // rotates during jump
  
  return (
    <g transform={`translate(${x},${y - arc}) rotate(${rotation})`} opacity={1}>
      {/* Main body - medium sized */}
      <ellipse cx={0} cy={0} rx={28} ry={12} fill={color} />
      {/* Tail */}
      <polygon points="0,0 -32,-10 -32,10" fill={color} opacity={0.85} />
      {/* Dorsal fin */}
      <polygon points="-4,-13 0,-26 4,-13" fill={color} opacity={0.9} />
      {/* Belly shine */}
      <ellipse cx={0} cy={2} rx={24} ry={6} fill={`${color}cc`} opacity={0.5} />
      {/* Eye highlight */}
      <circle cx={16} cy={-2} r={3} fill="rgba(255,255,255,0.9)" />
      <circle cx={17} cy={-2} r={1.2} fill="rgba(0,0,0,0.7)" />
      {/* Water splash effect at base */}
      {jumpPhase < 0.3 && (
        <>
          <circle cx={-8} cy={12} r={3} fill="rgba(200,230,255,0.4)" opacity={0.6 - jumpPhase * 2} />
          <circle cx={8} cy={12} r={2.5} fill="rgba(200,230,255,0.35)" opacity={0.5 - jumpPhase * 1.5} />
        </>
      )}
    </g>
  );
}
