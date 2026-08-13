import React, { useRef, useEffect } from 'react';

export default function HologramCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    const width = 220;
    const height = 150;
    canvas.width = width;
    canvas.height = height;

    let angleX = 0.2;
    let angleY = 0;
    let mouseX = 0;
    let mouseY = 0;

    // 3D 12-vertex Icosahedron geometry
    const phi = (1 + Math.sqrt(5)) / 2;
    const rawVertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ].map(([x, y, z]) => {
      const len = Math.sqrt(x * x + y * y + z * z);
      return [x / len, y / len, z / len];
    });

    const edges = [
      [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
      [1, 5], [1, 9], [1, 8], [1, 7],
      [2, 11], [2, 10], [2, 6], [2, 4], [2, 3],
      [3, 9], [3, 4], [3, 8], [3, 6],
      [4, 9], [4, 5], [4, 11],
      [5, 9], [5, 11],
      [6, 7], [6, 8], [6, 10],
      [7, 8], [7, 10],
      [8, 9],
      [10, 11]
    ];

    // Orbital particles
    const particles = Array.from({ length: 32 }, (_, i) => ({
      orbitRadius: 45 + Math.random() * 25,
      angle: (i / 32) * Math.PI * 2,
      speed: (0.015 + Math.random() * 0.015) * (i % 2 === 0 ? 1 : -1),
      size: 1.2 + Math.random() * 1.8,
      color: i % 3 === 0 ? '#38bdf8' : '#00ff88'
    }));

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      angleY += 0.015 + mouseX * 0.005;
      angleX += 0.01 + mouseY * 0.005;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const cx = width / 2;
      const cy = height / 2;
      const radius = 42;

      // Project vertices to 2D
      const projected = rawVertices.map(([vx, vy, vz]) => {
        let x1 = vx * cosY + vz * sinY;
        let y1 = vy;
        let z1 = -vx * sinY + vz * cosY;

        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        const scale = 160 / (160 + z2 * radius);
        return {
          x: cx + x2 * radius * scale,
          y: cy + y2 * radius * scale,
          z: z2
        };
      });

      // Center Radial Glow
      const glowGrad = ctx.createRadialGradient(cx, cy, 3, cx, cy, 55);
      glowGrad.addColorStop(0, 'rgba(0, 255, 136, 0.28)');
      glowGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.12)');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 55, 0, Math.PI * 2);
      ctx.fill();

      // Draw Wireframe Edges
      ctx.lineWidth = 1.1;
      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.2, (avgZ + 1) / 2);

        ctx.strokeStyle = `rgba(0, 255, 136, ${alpha * 0.85})`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Draw Nodes
      projected.forEach(p => {
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      // Draw Orbital Particles
      particles.forEach(p => {
        p.angle += p.speed;
        const px = cx + Math.cos(p.angle) * p.orbitRadius;
        const py = cy + Math.sin(p.angle) * p.orbitRadius * 0.5 + Math.sin(p.angle * 2) * 6;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="hologram-canvas-container">
      <canvas
        ref={canvasRef}
        width={220}
        height={150}
        className="hologram-canvas"
      />
      <div className="hologram-label">
        <span className="holo-dot"></span>
        <span>QUANTUM NEURAL CORE // 60 FPS</span>
      </div>
    </div>
  );
}
