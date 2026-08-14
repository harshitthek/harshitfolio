import React, { useRef, useEffect } from 'react';

export default function Interactive3DWing({ isActive }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    const width = 175;
    const height = 145;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    let time = 0;
    let rotY = 0;
    let rotX = 0.4;
    let targetX = 0;
    let targetY = 0;

    // 3D 16-point Rotating Cyber Cube Geometry
    const size = 32;
    const vertices = [
      [-size, -size, -size], [size, -size, -size], [size, size, -size], [-size, size, -size],
      [-size, -size, size], [size, -size, size], [size, size, size], [-size, size, size],
      // Inner core
      [-size/2, -size/2, -size/2], [size/2, -size/2, -size/2], [size/2, size/2, -size/2], [-size/2, size/2, -size/2],
      [-size/2, -size/2, size/2], [size/2, -size/2, size/2], [size/2, size/2, size/2], [-size/2, size/2, size/2]
    ];

    const edges = [
      // Outer cube
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
      // Inner cube
      [8, 9], [9, 10], [10, 11], [11, 8],
      [12, 13], [13, 14], [14, 15], [15, 12],
      [8, 12], [9, 13], [10, 14], [11, 15]
    ];

    // 24 Floating Orbital Particle Sparkles
    const particles = Array.from({ length: 24 }, (_, i) => ({
      angle: (i / 24) * Math.PI * 2,
      radius: 38 + Math.random() * 16,
      speed: (0.02 + Math.random() * 0.02) * (i % 2 === 0 ? 1 : -1),
      size: 1 + Math.random() * 1.5,
      color: i % 2 === 0 ? '#38bdf8' : '#00ff88'
    }));

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetX = ((e.clientY - rect.top) / rect.height - 0.5) * 0.8;
      targetY = ((e.clientX - rect.left) / rect.width - 0.5) * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const cx = width / 2;
    const cy = height / 2 - 2;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.03;
      rotY += 0.02 + targetY * 0.02;
      rotX = 0.35 + Math.sin(time * 0.8) * 0.2 + targetX * 0.2;

      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

      // Project 3D to 2D
      const projected = vertices.map(([x, y, z]) => {
        // Rotate Y
        let x1 = x * cosY + z * sinY;
        let y1 = y;
        let z1 = -x * sinY + z * cosY;

        // Rotate X
        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        const scale = 140 / (140 + z2);
        return {
          x: cx + x2 * scale,
          y: cy + y2 * scale,
          z: z2
        };
      });

      // 1. Draw Edges
      ctx.lineWidth = 1;
      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        const isInner = i >= 8;
        ctx.strokeStyle = isInner ? 'rgba(56, 189, 248, 0.75)' : 'rgba(0, 255, 136, 0.65)';
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // 2. Draw Glowing Vertex Nodes
      projected.forEach((p, idx) => {
        ctx.fillStyle = idx >= 8 ? '#38bdf8' : '#ffffff';
        ctx.shadowColor = idx >= 8 ? '#38bdf8' : '#00ff88';
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, idx >= 8 ? 1.8 : 2.2, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      // 3. Draw Orbiting Sparkle Cloud
      particles.forEach(p => {
        p.angle += p.speed;
        const px = cx + Math.cos(p.angle) * p.radius;
        const py = cy + Math.sin(p.angle) * p.radius * 0.45 + Math.sin(time * 2 + p.angle) * 4;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Gimbal ring
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.22)';
      ctx.beginPath();
      ctx.ellipse(cx, cy, 48, 16, rotY * 0.3, 0, Math.PI * 2);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isActive]);

  return (
    <aside className="cyber-flank-3d right-flank" aria-hidden="true">
      <div className="cube-window">
        <span className="corner tl"></span>
        <span className="corner tr"></span>
        <span className="corner bl"></span>
        <span className="corner br"></span>

        <div className="cube-header">
          <span className="cube-pulse-dot"></span>
          <span className="cube-title">3D_QUANTUM_CORE // WebGL</span>
        </div>

        <canvas ref={canvasRef} className="cube-canvas" />

        <div className="cube-telemetry-row">
          <span className="cube-stat cyan">FPS: 60</span>
          <span className="cube-stat green">GYRO: ACTIVE</span>
          <span className="cube-stat">VERT: 16</span>
        </div>
      </div>
    </aside>
  );
}
