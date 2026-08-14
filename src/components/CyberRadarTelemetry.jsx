import React, { useRef, useEffect } from 'react';

export default function CyberRadarTelemetry({ isActive }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    const width = 170;
    const height = 210;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    let sweepAngle = 0;
    const cx = width / 2;
    const cy = 95;
    const radius = 55;

    // 6 Tracked blip targets
    const blips = [
      { r: 24, a: 0.8, baseAlpha: 0.8 },
      { r: 38, a: 2.3, baseAlpha: 0.9 },
      { r: 48, a: 4.1, baseAlpha: 0.7 },
      { r: 18, a: 5.2, baseAlpha: 0.95 },
      { r: 42, a: 3.5, baseAlpha: 0.6 }
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      sweepAngle = (sweepAngle + 0.045) % (Math.PI * 2);

      // 1. Radar Concentric Rings
      ctx.lineWidth = 1;
      [18, 34, 52].forEach((r, idx) => {
        ctx.strokeStyle = idx === 2 ? 'rgba(0, 255, 136, 0.28)' : 'rgba(0, 255, 136, 0.12)';
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      });

      // 2. Radar Crosshair Axes
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.15)';
      ctx.beginPath();
      ctx.moveTo(cx - radius - 5, cy);
      ctx.lineTo(cx + radius + 5, cy);
      ctx.moveTo(cx, cy - radius - 5);
      ctx.lineTo(cx, cy + radius + 5);
      ctx.stroke();

      // 3. Rotating Radar Sweep Beam (Pie sector)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, sweepAngle - 0.45, sweepAngle);
      ctx.closePath();
      const sweepGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, radius);
      sweepGrad.addColorStop(0, 'rgba(0, 255, 136, 0.35)');
      sweepGrad.addColorStop(1, 'rgba(0, 255, 136, 0.02)');
      ctx.fillStyle = sweepGrad;
      ctx.fill();

      // Leading beam line
      ctx.strokeStyle = '#00ff88';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(sweepAngle) * radius, cy + Math.sin(sweepAngle) * radius);
      ctx.stroke();
      ctx.restore();

      // 4. Draw Targets / Blips with proximity illumination
      blips.forEach(b => {
        const bx = cx + Math.cos(b.a) * b.r;
        const by = cy + Math.sin(b.a) * b.r;

        // Proximity to sweep angle
        let diff = (sweepAngle - b.a + Math.PI * 4) % (Math.PI * 2);
        const glow = diff < 0.6 ? 1 - diff / 0.6 : 0.2;

        ctx.fillStyle = diff < 0.6 ? '#ffffff' : '#38bdf8';
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = diff < 0.6 ? 8 : 2;
        ctx.beginPath();
        ctx.arc(bx, by, diff < 0.6 ? 2.5 : 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 5. Bottom Hex Telemetry Matrix snippet
      ctx.font = '8px monospace';
      ctx.fillStyle = 'rgba(56, 189, 248, 0.75)';
      const hexLine = '0x' + Math.floor(Math.sin(sweepAngle) * 0xFFFFFF + 0xFFFFFF).toString(16).toUpperCase().padStart(6, '0');
      ctx.fillText(`SYS_RADAR // ${hexLine}`, 14, 180);
      ctx.fillStyle = 'rgba(0, 255, 136, 0.6)';
      ctx.fillText(`LAT: 28.61° N`, 14, 194);
      ctx.fillText(`LON: 77.20° E`, 95, 194);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isActive]);

  return (
    <aside className="simulation-wing right-wing" aria-hidden="true">
      <div className="sim-panel-box">
        <span className="corner tl"></span>
        <span className="corner tr"></span>
        <span className="corner bl"></span>
        <span className="corner br"></span>

        <div className="sim-header">
          <span className="sim-dot live"></span>
          <span className="sim-title">ORBITAL RADAR</span>
        </div>

        <canvas ref={canvasRef} className="sim-canvas" />

        <div className="sim-telemetry-feed">
          <div className="sim-feed-row">
            <span className="feed-key">TARGETING:</span>
            <span className="feed-val cyan">ACTIVE</span>
          </div>
          <div className="sim-feed-row">
            <span className="feed-key">SAT_UPLINK:</span>
            <span className="feed-val green">10.0 Gbps</span>
          </div>
          <div className="sim-feed-row">
            <span className="feed-key">LOCATION:</span>
            <span className="feed-val">DELHI, IN</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
