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

        {/* Dashed label lines — positioned at correct water depths on smaller iceberg */}
        {/* "Net pay" label at top - visible ice tip */}
        <circle cx={85} cy={110} r={4} fill="#f0c040" />
        <line x1={89} y1={110} x2={150} y2={110} stroke="#f0c040" strokeWidth={2} strokeDasharray="4 3" />
        <text x={75} y={128} fontSize={14} fill="#000000" textAnchor="end" fontFamily="sans-serif" fontWeight="bold">Net pay</text>
        <text x={75} y={145} fontSize={16} fill="#000000" textAnchor="end" fontFamily="sans-serif" fontWeight="900">€{Math.round(netPay)}</text>

        {/* "Tax you pay" line — upper underwater section */}
        <circle cx={100} cy={280} r={4} fill="#f0c040" />
        <line x1={104} y1={280} x2={160} y2={280} stroke="#f0c040" strokeWidth={2} strokeDasharray="4 3" />
        <text x={90} y={297} fontSize={14} fill="#ffffff" textAnchor="end" fontFamily="sans-serif" fontWeight="bold">Tax you pay</text>
        <text x={90} y={314} fontSize={18} fill="#ffffff" textAnchor="end" fontFamily="sans-serif" fontWeight="900">€{Math.round(taxYouPay)}</text>

        {/* "Employer tax" line — deeper underwater section */}
        <circle cx={420} cy={380} r={4} fill="#f0c040" />
        <line x1={360} y1={380} x2={416} y2={380} stroke="#f0c040" strokeWidth={2} strokeDasharray="4 3" />
        <text x={430} y={375} fontSize={18} fill="#ffffff" fontFamily="sans-serif" fontWeight="900">€{Math.round(employerTax)}</text>
        <text x={430} y={393} fontSize={13}  fill="#ffffff" fontFamily="sans-serif" fontWeight="bold">Tax employer pays</text>
      </svg>

      {/* ── LAYER 3: Animated water canvas ── */}
      <canvas ref={canvasRef} className="taxberg-canvas" />

      {/* ── LAYER 4: Static UI labels ── */}
      <div className="taxberg-label taxberg-label--net">
        <span className="taxberg-amount">€ {Math.round(netPay)}</span>
        <span className="taxberg-desc">Net pay</span>
      </div>

      {/* ── LAYER 5: Bottom stats section with total tax and rate ── */}
      <div className="taxberg-stats">
        <div className="taxberg-stats-grid">
          <div className="taxberg-stat-box">
            <div className="taxberg-stat-label">Total tax paid</div>
            <div className="taxberg-stat-value">€{Math.round(totalTax).toLocaleString()}</div>
            <div className="taxberg-stat-desc">Did you know your employer also pays €{Math.round(employerTax).toLocaleString()} in tax on your salary. It costs the employer €{Math.round(grossSalary * 0.111).toLocaleString()} to pay you €{Math.round(grossSalary / 12).toLocaleString()} a month.</div>
          </div>
          <div className="taxberg-stat-box">
            <div className="taxberg-stat-label">Real tax rate</div>
            <div className="taxberg-stat-value">
              {grossSalary > 0
                ? `${((totalTax / grossSalary) * 100).toFixed(1)}%`
                : '0.0%'}
            </div>
            <div className="taxberg-stat-desc">So, with you and the employer both paying tax, what used to be a 24.7% tax rate now rises to {grossSalary > 0 ? `${((totalTax / grossSalary) * 100).toFixed(1)}%` : '0.0%'}, meaning your real tax ratio is actually higher than what it seemed at first.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
