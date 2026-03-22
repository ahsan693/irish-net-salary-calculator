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
      const WATER_Y = H * 0.36; // tune this to match where your PNG waterline is

      ctx.clearRect(0, 0, W, H);

      // Draw 3 wave layers — different speed, amplitude, opacity
      const layers = [
        { amp: 5, freq: 0.018, speed: 0.7, alpha: 0.13 },
        { amp: 3, freq: 0.026, speed: 1.1, alpha: 0.09 },
        { amp: 1.5, freq: 0.038, speed: 1.6, alpha: 0.06 },
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
        ctx.fillStyle = `rgba(10,45,100,${alpha})`;
        ctx.fill();
      });

      // Surface sparkle lines
      for (let i = 0; i < 5; i++) {
        const sx = (W * (i + 0.5)) / 5 + Math.sin(tRef.current * 1.1 + i) * 10;
        const sy = WATER_Y + Math.sin(sx * 0.025 + tRef.current * 0.9) * 3;
        const a = 0.25 + 0.2 * Math.sin(tRef.current * 2 + i * 1.5);
        ctx.beginPath();
        ctx.moveTo(sx - 10, sy);
        ctx.lineTo(sx + 10, sy);
        ctx.strokeStyle = `rgba(180,230,245,${a})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
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
