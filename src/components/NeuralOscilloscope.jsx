import React, { useRef, useEffect } from 'react';

export default function NeuralOscilloscope({ isActive }) {
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

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.035;

      // 1. Grid lines
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.08)';
      ctx.lineWidth = 1;
      for (let y = 15; y < height - 15; y += 20) {
        ctx.beginPath();
        ctx.moveTo(10, y);
        ctx.lineTo(width - 10, y);
        ctx.stroke();
      }
      for (let x = 15; x < width - 15; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 15);
        ctx.lineTo(x, height - 15);
        ctx.stroke();
      }

      // 2. Frequency Equalizer Spectrum Bars (Top half)
      const barCount = 14;
      const barWidth = 7;
      const gap = 3;
      const startX = (width - (barCount * (barWidth + gap))) / 2;

      for (let i = 0; i < barCount; i++) {
        const barHeight = Math.abs(Math.sin(time * 2 + i * 0.45) * 32) + Math.abs(Math.cos(time * 1.2 + i * 0.7) * 18) + 4;
        const bx = startX + i * (barWidth + gap);
        const by = 75 - barHeight;

        const grad = ctx.createLinearGradient(0, by, 0, 75);
        grad.addColorStop(0, i % 2 === 0 ? '#38bdf8' : '#00ff88');
        grad.addColorStop(1, 'rgba(0, 255, 136, 0.15)');

        ctx.fillStyle = grad;
        ctx.fillRect(bx, by, barWidth, barHeight);

        // Peak dot
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(bx, by - 2, barWidth, 1.5);
      }

      // 3. Neural Oscilloscope Waveform (Bottom half)
      const centerY = 145;
      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#00ff88';
      ctx.shadowColor = '#00ff88';
      ctx.shadowBlur = 6;

      for (let x = 10; x < width - 10; x += 2) {
        const wave1 = Math.sin(x * 0.06 + time * 3) * 16;
        const wave2 = Math.sin(x * 0.12 - time * 2) * 8;
        const y = centerY + wave1 + wave2;

        if (x === 10) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 4. Secondary Cyan Harmonic Echo Line
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
      for (let x = 10; x < width - 10; x += 2) {
        const wave = Math.sin(x * 0.05 + time * 2.5 + 1.2) * 12;
        const y = centerY + wave;
        if (x === 10) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isActive]);

  return (
    <aside className="simulation-wing left-wing" aria-hidden="true">
      <div className="sim-panel-box">
        <span className="corner tl"></span>
        <span className="corner tr"></span>
        <span className="corner bl"></span>
        <span className="corner br"></span>

        <div className="sim-header">
          <span className="sim-dot live"></span>
          <span className="sim-title">NEURAL SPECTRUM</span>
        </div>

        <canvas ref={canvasRef} className="sim-canvas" />

        <div className="sim-telemetry-feed">
          <div className="sim-feed-row">
            <span className="feed-key">FREQ_FLUX:</span>
            <span className="feed-val cyan">44.1 kHz</span>
          </div>
          <div className="sim-feed-row">
            <span className="feed-key">ENTROPY:</span>
            <span className="feed-val green">0.942 η</span>
          </div>
          <div className="sim-feed-row">
            <span className="feed-key">SYNAPSE:</span>
            <span className="feed-val">ONLINE</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
