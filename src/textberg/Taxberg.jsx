import { useRef, useState, useEffect } from 'react';
import { useTaxbergAnim } from './useTaxbergAnim';
import { FishSVG, SharkSVG, JumpingFishSVG } from './FishSVG';
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
  const [jumpingFish, setJumpingFish] = useState(0);
  useEffect(() => {
    let raf;
    function update() {
      const t = tRef.current;
      setFishState({
        f1x: 80  + Math.sin(t * 0.5)  * 60,
        f1y: 380 + Math.cos(t * 0.5)  * 45,
        f1r: Math.cos(t * 0.5) > 0,
        f2x: 410 + Math.sin(t * 0.7 + 1) * 50,
        f2y: 340 + Math.cos(t * 0.7 + 1) * 55,
        f2r: Math.cos(t * 0.7 + 1) > 0,
        sx:  260 + Math.sin(t * 0.28) * 100,
        sy:  700 + Math.sin(t * 0.2)  * 15,
        sr:  Math.cos(t * 0.28) > 0,
      });
      
      // Jumping fish animation - jumps every 3 seconds, takes 1 second
      const jumpCycle = (t % 3) / 1; // 0-1 for jump phase, then 1-3 for rest
      const jumpPhase = jumpCycle < 1 ? jumpCycle : 0; // Reset to 0 when not jumping
      setJumpingFish(jumpPhase);
      
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
      <svg className="taxberg-svg" viewBox="0 0 520 820">
        {/* Large menacing shark at bottom */}
        <SharkSVG x={fishState.sx}  y={fishState.sy}  facingRight={fishState.sr} />
        
        {/* Main fish - bigger and more visible */}
        <FishSVG  x={fishState.f1x} y={fishState.f1y} facingRight={fishState.f1r} color="#2a9acd" size={1.4} />
        
        {/* Secondary fish - also bigger */}
        <FishSVG  x={fishState.f2x} y={fishState.f2y} facingRight={fishState.f2r} color="#1a7aaa" size={1.1} opacity={0.8} />
        
        {/* Jumping fish from side - appears every 3 seconds */}
        {jumpingFish > 0 && (
          <JumpingFishSVG x={-15} y={650} jumpPhase={jumpingFish} size={1.3} color="#3bb3e8" />
        )}

        {/* Dashed label lines — positions are % of 420×620 viewbox */}
        {/* "Tax you pay" line — sits at ~50% depth below waterline */}
        <circle cx={120} cy={380} r={5} fill="#f0c040" />
        <line x1={125} y1={380} x2={200} y2={380} stroke="#f0c040" strokeWidth={2} strokeDasharray="4 3" />
        <text x={110} y={400} fontSize={12} fill="#7ecfe8" textAnchor="end" fontFamily="sans-serif">Tax you pay</text>
        <text x={110} y={415} fontSize={12} fill="#7ecfe8" textAnchor="end" fontFamily="sans-serif" fontWeight="600">€{Math.round(taxYouPay)}</text>

        {/* "Employer tax" line */}
        <circle cx={400} cy={450} r={5} fill="#f0c040" />
        <line x1={320} y1={450} x2={395} y2={450} stroke="#f0c040" strokeWidth={2} strokeDasharray="4 3" />
        <text x={410} y={445} fontSize={12} fill="#7ecfe8" fontFamily="sans-serif" fontWeight="600">€{Math.round(employerTax)}</text>
        <text x={410} y={460} fontSize={11}  fill="#5aaccc" fontFamily="sans-serif">Tax employer pays</text>
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
