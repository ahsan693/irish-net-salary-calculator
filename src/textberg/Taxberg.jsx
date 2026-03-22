import { useRef, useState, useEffect } from 'react';
import { useTaxbergAnim } from './useTaxbergAnim';
import { FishSVG, SharkSVG } from './FishSVG';
import icebergPng from './iceberg.png';
import './Taxberg.css';

// ─── Props from your calculator ───────────────────────────────────────────────
// netPay         : number  e.g. 196
// taxYouPay      : number  e.g. 150
// employerTax    : number  e.g. 4
// totalTax       : number  e.g. 200
// grossSalary    : number  e.g. 350
// ──────────────────────────────────────────────────────────────────────────────

export default function Taxberg({ netPay, taxYouPay, employerTax, totalTax, grossSalary }) {
  const canvasRef = useRef(null);
  const tRef = useTaxbergAnim(canvasRef);  // starts wave animation, gives us time ref

  // Fish positions derived from animation time
  const [fishState, setFishState] = useState({ 
    f1x: 60, f1y: 300, f1r: true, 
    f2x: 340, f2y: 260, f2r: false, 
    sx: 200, sy: 540, sr: true 
  });

  useEffect(() => {
    let raf;
    function update() {
      const t = tRef.current;
      setFishState({
        f1x: 65  + Math.sin(t * 0.5)  * 50,
        f1y: 310 + Math.cos(t * 0.5)  * 35,
        f1r: Math.cos(t * 0.5) > 0,
        f2x: 340 + Math.sin(t * 0.7 + 1) * 38,
        f2y: 265 + Math.cos(t * 0.7 + 1) * 45,
        f2r: Math.cos(t * 0.7 + 1) > 0,
        sx:  205 + Math.sin(t * 0.28) * 85,
        sy:  555 + Math.sin(t * 0.2)  * 10,
        sr:  Math.cos(t * 0.28) > 0,
      });
      raf = requestAnimationFrame(update);
    }
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [tRef]);

  // Iceberg bob — CSS var updated each frame
  const icebergRef = useRef(null);
  useEffect(() => {
    let raf;
    function bob() {
      const translateY = Math.sin(tRef.current * 0.4) * 3;
      if (icebergRef.current) {
        icebergRef.current.style.transform = `translateY(${translateY}px)`;
      }
      raf = requestAnimationFrame(bob);
    }
    raf = requestAnimationFrame(bob);
    return () => cancelAnimationFrame(raf);
  }, [tRef]);

  return (
    <div className="taxberg-scene">

      {/* ── LAYER 1: Iceberg PNG (your image) ── */}
      <img
        ref={icebergRef}
        src={icebergPng}
        alt="taxberg"
        className="taxberg-img"
      />

      {/* ── LAYER 2: Fish + Shark SVG overlay ── */}
      <svg className="taxberg-svg" viewBox="0 0 420 620">
        <SharkSVG x={fishState.sx}  y={fishState.sy}  facingRight={fishState.sr} />
        <FishSVG  x={fishState.f1x} y={fishState.f1y} facingRight={fishState.f1r} color="#1a7aaa" />
        <FishSVG  x={fishState.f2x} y={fishState.f2y} facingRight={fishState.f2r} color="#0d5c8a" size={0.75} opacity={0.7} />

        {/* Dashed label lines — positions are % of 420×620 viewbox */}
        {/* "Tax you pay" line — sits at ~50% depth below waterline */}
        <circle cx={95} cy={290} r={4} fill="#f0c040" />
        <line x1={99} y1={290} x2={160} y2={290} stroke="#f0c040" strokeWidth={1.5} strokeDasharray="4 3" />
        <text x={88} y={305} fontSize={10} fill="#7ecfe8" textAnchor="end" fontFamily="sans-serif">Tax you pay</text>
        <text x={88} y={317} fontSize={10} fill="#7ecfe8" textAnchor="end" fontFamily="sans-serif" fontWeight="600">€{Math.round(taxYouPay)}</text>

        {/* "Employer tax" line */}
        <circle cx={325} cy={345} r={4} fill="#f0c040" />
        <line x1={260} y1={345} x2={321} y2={345} stroke="#f0c040" strokeWidth={1.5} strokeDasharray="4 3" />
        <text x={335} y={340} fontSize={10} fill="#7ecfe8" fontFamily="sans-serif" fontWeight="600">€{Math.round(employerTax)}</text>
        <text x={335} y={352} fontSize={9}  fill="#5aaccc" fontFamily="sans-serif">Tax employer pays</text>
      </svg>

      {/* ── LAYER 3: Animated water canvas ── */}
      <canvas ref={canvasRef} className="taxberg-canvas" />

      {/* ── LAYER 4: Static UI labels ── */}
      <div className="taxberg-label taxberg-label--net">
        <span className="taxberg-amount">€ {Math.round(netPay)}</span>
        <span className="taxberg-desc">Net pay</span>
      </div>

      {/* ── LAYER 5: Bottom summary bar ── */}
      <div className="taxberg-footer">
        <p className="taxberg-footer__label">Total tax paid</p>
        <p className="taxberg-footer__total">€ {Math.round(totalTax)}</p>
        <p className="taxberg-footer__note">
          Your employer also pays €{Math.round(employerTax)} in tax on your salary.
          Your gross cost to them is €{Math.round(grossSalary)}.
        </p>
      </div>
    </div>
  );
}
