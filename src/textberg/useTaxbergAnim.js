import { useEffect, useRef } from 'react';

export function useTaxbergAnim(canvasRef) {
  const frameRef = useRef(null);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function drawWaves() {
      const { width: W, height: H } = canvas;
      const WATER_Y = H * 0.33; // Adjusted for smaller iceberg - water line at upper third

      ctx.clearRect(0, 0, W, H);

      // Draw 3 wave layers — different speed, amplitude, opacity
      const layers = [
        { amp: 7, freq: 0.018, speed: 0.7, alpha: 0.18 },
        { amp: 5, freq: 0.026, speed: 1.1, alpha: 0.14 },
        { amp: 3, freq: 0.038, speed: 1.6, alpha: 0.1 },
      ];

      layers.forEach(({ amp, freq, speed, alpha }) => {
        ctx.beginPath();
        ctx.moveTo(0, WATER_Y);
        for (let x = 0; x <= W; x += 3) {
          const y =
            WATER_Y +
            Math.sin(x * freq + tRef.current * speed) * amp +
            Math.sin(x * freq * 1.7 + tRef.current * speed * 0.5) * (amp * 0.4);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();
        ctx.fillStyle = `rgba(30,80,140,${alpha})`;
        ctx.fill();
      });

      // Surface sparkle lines - brighter
      for (let i = 0; i < 8; i++) {
        const sx = (W * (i + 0.5)) / 8 + Math.sin(tRef.current * 1.1 + i) * 10;
        const sy = WATER_Y + Math.sin(sx * 0.025 + tRef.current * 0.9) * 3;
        const a = 0.35 + 0.3 * Math.sin(tRef.current * 2 + i * 1.5);
        ctx.beginPath();
        ctx.moveTo(sx - 12, sy);
        ctx.lineTo(sx + 12, sy);
        ctx.strokeStyle = `rgba(200,240,255,${a})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      // Additional water highlights
      ctx.fillStyle = 'rgba(100,180,220,0.05)';
      for (let i = 0; i < 4; i++) {
        const hx = Math.sin(tRef.current * (0.3 + i * 0.1)) * W * 0.3 + W * 0.5;
        const hy = WATER_Y + 20 + i * 40;
        const amplitude = 15 + i * 5;
        ctx.beginPath();
        for (let x = 0; x < W; x += 5) {
          const y = hy + Math.sin(x * 0.015 + tRef.current * (0.5 + i * 0.1)) * amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();
        ctx.fill();
      }
    }

    function tick() {
      tRef.current += 0.016;
      drawWaves();
      frameRef.current = requestAnimationFrame(tick);
    }
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [canvasRef]);

  // Expose current t so SVG fish can sync
  return tRef;
}
