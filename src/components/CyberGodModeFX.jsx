import { useEffect, useRef } from 'react';

/**
 * ⚡ CyberGodModeFX: High-Energy Fullscreen Supernova Shockwave & Screen Shake
 * Detonates when Konami Code or God Mode Easter Egg is triggered.
 */
export default function CyberGodModeFX({ isActive, onClose }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    const cx = w / 2;
    const cy = h / 2;

    // 150 kinetic glowing voxel fragments
    const colors = ['#00ff88', '#38bdf8', '#ff007f', '#fbbf24', '#c084fc', '#ffffff'];
    const shards = Array.from({ length: 140 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 6 + Math.random() * 22;
      return {
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1.0,
        decay: 0.012 + Math.random() * 0.02,
        rot: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.3
      };
    });

    // 3 expanding concentric shockwave rings
    const shockwaves = [
      { radius: 10, maxRadius: Math.max(w, h) * 0.85, speed: 28, color: '#ff007f', alpha: 1.0 },
      { radius: 5, maxRadius: Math.max(w, h) * 0.75, speed: 20, color: '#38bdf8', alpha: 1.0 },
      { radius: 0, maxRadius: Math.max(w, h) * 0.65, speed: 14, color: '#00ff88', alpha: 1.0 }
    ];

    let animId;
    const startTime = performance.now();

    const render = (now) => {
      const elapsed = (now - startTime) / 1000;
      ctx.clearRect(0, 0, w, h);

      // Flash background overlay in first 0.25 seconds
      if (elapsed < 0.25) {
        const flashAlpha = (1 - elapsed / 0.25) * 0.45;
        ctx.fillStyle = `rgba(0, 255, 136, ${flashAlpha})`;
        ctx.fillRect(0, 0, w, h);
      }

      // Draw and expand shockwave rings
      shockwaves.forEach((sw) => {
        if (sw.radius < sw.maxRadius && sw.alpha > 0) {
          ctx.strokeStyle = sw.color;
          ctx.lineWidth = 3.5;
          ctx.globalAlpha = Math.max(0, sw.alpha);
          ctx.shadowColor = sw.color;
          ctx.shadowBlur = 18;
          ctx.beginPath();
          ctx.arc(cx, cy, sw.radius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.shadowBlur = 0;

          sw.radius += sw.speed;
          sw.alpha -= 0.022;
        }
      });

      // Draw and update glowing kinetic shards
      let activeShards = 0;
      shards.forEach((s) => {
        if (s.life > 0) {
          activeShards++;
          s.x += s.vx;
          s.y += s.vy;
          s.vx *= 0.96;
          s.vy *= 0.96;
          s.rot += s.vRot;
          s.life -= s.decay;

          ctx.save();
          ctx.translate(s.x, s.y);
          ctx.rotate(s.rot);
          ctx.globalAlpha = Math.max(0, s.life);
          ctx.fillStyle = s.color;
          ctx.shadowColor = s.color;
          ctx.shadowBlur = 10;
          ctx.fillRect(-s.size / 2, -s.size / 2, s.size, s.size);
          ctx.restore();
        }
      });

      ctx.globalAlpha = 1.0;

      if (elapsed < 2.5 && (activeShards > 0 || shockwaves.some((sw) => sw.alpha > 0))) {
        animId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, w, h);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <>
      {/* Fullscreen Canvas FX Layer */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 999998
        }}
      />

      {/* Floating God Mode HUD Badge */}
      <div
        className="godmode-floating-banner"
        style={{
          position: 'fixed',
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 999999,
          background: 'linear-gradient(90deg, #ff007f, #00ff88, #38bdf8, #fbbf24)',
          padding: '2px',
          borderRadius: '8px',
          boxShadow: '0 0 35px rgba(0, 255, 136, 0.7)'
        }}
      >
        <div
          style={{
            background: '#050508',
            padding: '8px 18px',
            borderRadius: '6px',
            color: '#00ff88',
            fontFamily: "'Fira Code', monospace",
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '2px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <span style={{ color: '#fbbf24' }}>⚡</span>
          <span>CYBER OVERDRIVE // GOD MODE ACTIVE</span>
          <span style={{ color: '#ff007f' }}>[CLEARANCE: 999]</span>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              marginLeft: '8px',
              fontWeight: 700
            }}
            title="Dismiss God Mode"
          >
            ✕
          </button>
        </div>
      </div>
    </>
  );
}
