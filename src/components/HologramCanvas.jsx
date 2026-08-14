import React, { useRef, useEffect } from 'react';

export default function HologramCanvas({ isActive }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    const width = 280;
    const height = 140;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    let angleX = 0.25;
    let angleY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

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

    // Inner Core Octahedron vertices
    const innerVertices = [
      [1, 0, 0], [-1, 0, 0],
      [0, 1, 0], [0, -1, 0],
      [0, 0, 1], [0, 0, -1]
    ];
    const innerEdges = [
      [0, 2], [2, 1], [1, 3], [3, 0],
      [0, 4], [2, 4], [1, 4], [3, 4],
      [0, 5], [2, 5], [1, 5], [3, 5]
    ];

    // 36 Ambient Quantum Orbital Particles
    const particles = Array.from({ length: 36 }, (_, i) => ({
      orbitRadius: 42 + Math.random() * 26,
      angle: (i / 36) * Math.PI * 2,
      speed: (0.014 + Math.random() * 0.016) * (i % 2 === 0 ? 1 : -1),
      yOffset: (Math.random() - 0.5) * 20,
      size: 1.1 + Math.random() * 1.6,
      color: i % 3 === 0 ? '#38bdf8' : i % 3 === 1 ? '#00ff88' : '#a7f3d0'
    }));

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetRotX = ((e.clientY - rect.top) / rect.height - 0.5) * 1.4;
      targetRotY = ((e.clientX - rect.left) / rect.width - 0.5) * 1.4;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let scanY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse rotation spring
      angleY += 0.014 + (targetRotY - angleY) * 0.04;
      angleX += 0.008 + (targetRotX - angleX) * 0.04;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const cx = width / 2;
      const cy = height / 2 - 4;
      const outerRadius = 45;
      const innerRadius = 24;

      // 1. Holographic Projection Base Cone & Radial Ambient Glow
      const glowGrad = ctx.createRadialGradient(cx, cy, 4, cx, cy, 75);
      glowGrad.addColorStop(0, 'rgba(0, 255, 136, 0.32)');
      glowGrad.addColorStop(0.4, 'rgba(56, 189, 248, 0.12)');
      glowGrad.addColorStop(0.8, 'rgba(0, 255, 136, 0.02)');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 75, 0, Math.PI * 2);
      ctx.fill();

      // 2. Hologram Scanner Line Sweep
      scanY = (scanY + 1.1) % height;
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.16)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - 70, scanY);
      ctx.lineTo(cx + 70, scanY);
      ctx.stroke();

      // Project vertices helper
      const projectPoints = (verts, rad) => {
        return verts.map(([vx, vy, vz]) => {
          let x1 = vx * cosY + vz * sinY;
          let y1 = vy;
          let z1 = -vx * sinY + vz * cosY;

          let x2 = x1;
          let y2 = y1 * cosX - z1 * sinX;
          let z2 = y1 * sinX + z1 * cosX;

          const scale = 180 / (180 + z2 * rad);
          return {
            x: cx + x2 * rad * scale,
            y: cy + y2 * rad * scale,
            z: z2
          };
        });
      };

      const outerProjected = projectPoints(rawVertices, outerRadius);
      const innerProjected = projectPoints(innerVertices, innerRadius);

      // 3. Draw Outer Icosahedron Wireframe
      ctx.lineWidth = 1.2;
      edges.forEach(([i, j]) => {
        const p1 = outerProjected[i];
        const p2 = outerProjected[j];
        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.25, (avgZ + 1) / 2);

        ctx.strokeStyle = `rgba(0, 255, 136, ${alpha * 0.9})`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // 4. Draw Inner Core Wireframe (Cyan)
      ctx.lineWidth = 1;
      innerEdges.forEach(([i, j]) => {
        const p1 = innerProjected[i];
        const p2 = innerProjected[j];
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.65)';
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // 5. Draw Glowing Nodes
      outerProjected.forEach(p => {
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      });

      innerProjected.forEach(p => {
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      // 6. Draw Orbital Quantum Particles
      particles.forEach(p => {
        p.angle += p.speed;
        const px = cx + Math.cos(p.angle) * p.orbitRadius;
        const py = cy + Math.sin(p.angle) * p.orbitRadius * 0.42 + Math.sin(p.angle * 2) * 4 + p.yOffset * 0.1;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 7. Base Projection Ring
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.25)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(cx, height - 10, 60, 9, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(56, 189, 248, 0.18)';
      ctx.beginPath();
      ctx.ellipse(cx, height - 10, 36, 5, 0, 0, Math.PI * 2);
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
    <div className="hologram-canvas-container">
      <canvas
        ref={canvasRef}
        className="hologram-canvas"
      />
    </div>
  );
}
