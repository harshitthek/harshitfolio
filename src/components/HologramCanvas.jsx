import React, { useRef, useEffect } from 'react';

export default function HologramCanvas({ isActive, explosionTrigger = 0 }) {
  const canvasRef = useRef(null);
  const explosionRef = useRef({
    active: false,
    progress: 0,
    shards: [],
    shockwaves: []
  });

  // Trigger explosion animation when explosionTrigger changes
  useEffect(() => {
    if (explosionTrigger > 0) {
      const shards = Array.from({ length: 90 }, () => {
        const phi = Math.random() * Math.PI * 2;
        const theta = Math.random() * Math.PI;
        const speed = 2.5 + Math.random() * 5.5;
        return {
          x: 0,
          y: 0,
          z: 0,
          vx: Math.sin(theta) * Math.cos(phi) * speed,
          vy: Math.sin(theta) * Math.sin(phi) * speed,
          vz: Math.cos(theta) * speed,
          size: 1.2 + Math.random() * 2.4,
          color: Math.random() > 0.4 ? '#00ff88' : '#38bdf8',
          alpha: 1
        };
      });

      explosionRef.current = {
        active: true,
        startTime: performance.now(),
        shards,
        shockwaves: [
          { radius: 2, speed: 4.8, alpha: 1, color: '#00ff88' },
          { radius: 2, speed: 3.6, alpha: 0.8, color: '#38bdf8' }
        ]
      };
    }
  }, [explosionTrigger]);

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

    let time = 0;
    let angleY = 0;
    let angleX = 0.3;
    let angleZ = 0;
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

    // 40 Ambient Quantum Orbital Particles
    const particles = Array.from({ length: 40 }, (_, i) => ({
      orbitRadius: 40 + Math.random() * 28,
      angle: (i / 40) * Math.PI * 2,
      speed: (0.016 + Math.random() * 0.016) * (i % 2 === 0 ? 1 : -1),
      size: 1.1 + Math.random() * 1.6,
      color: i % 3 === 0 ? '#38bdf8' : i % 3 === 1 ? '#00ff88' : '#e0f2fe'
    }));

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetRotX = ((e.clientY - rect.top) / rect.height - 0.5) * 1.2;
      targetRotY = ((e.clientX - rect.left) / rect.width - 0.5) * 1.2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let scanY = 0;

    const render = (now) => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      // Handle Quantum Explosion Dynamics
      let explosionExpansion = 1;
      let explosionAlpha = 1;

      if (explosionRef.current.active) {
        const elapsed = (now - explosionRef.current.startTime) / 1000;
        if (elapsed < 2.0) {
          // Outward blast -> Magnetic collapse & reformation
          if (elapsed < 0.6) {
            explosionExpansion = 1 + elapsed * 3.5;
            explosionAlpha = Math.max(0.2, 1 - elapsed * 1.2);
          } else {
            const reformT = (elapsed - 0.6) / 1.4;
            const easeOutElastic = Math.sin(reformT * Math.PI * 2.5) * Math.exp(-reformT * 3);
            explosionExpansion = 1 + easeOutElastic * 1.5;
            explosionAlpha = Math.min(1, reformT * 1.5);
          }
        } else {
          explosionRef.current.active = false;
        }
      }

      // Continuous 360-degree rotation
      angleY += 0.018 + targetRotY * 0.02;
      angleX = 0.25 + Math.sin(time * 0.7) * 0.22 + targetRotX * 0.2;
      angleZ += 0.006;

      const cosY = Math.cos(angleY), sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX), sinX = Math.sin(angleX);
      const cosZ = Math.cos(angleZ), sinZ = Math.sin(angleZ);

      const cx = width / 2;
      const cy = height / 2 - 4;
      const outerRadius = 45 * explosionExpansion;
      const innerRadius = 24 * explosionExpansion;

      // 1. Center Glow
      const glowRadius = Math.min(110, 75 * explosionExpansion);
      const glowGrad = ctx.createRadialGradient(cx, cy, 3, cx, cy, glowRadius);
      glowGrad.addColorStop(0, explosionRef.current.active ? 'rgba(0, 255, 136, 0.7)' : 'rgba(0, 255, 136, 0.35)');
      glowGrad.addColorStop(0.4, 'rgba(56, 189, 248, 0.2)');
      glowGrad.addColorStop(0.8, 'rgba(0, 255, 136, 0.02)');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // 2. 3D Rotation Point Projector
      const projectPoints = (verts, rad, reverseRot = false) => {
        const mul = reverseRot ? -1.5 : 1;
        const curCosY = Math.cos(angleY * mul);
        const curSinY = Math.sin(angleY * mul);

        return verts.map(([vx, vy, vz]) => {
          let x1 = vx * curCosY + vz * curSinY;
          let y1 = vy;
          let z1 = -vx * curSinY + vz * curCosY;

          let x2 = x1;
          let y2 = y1 * cosX - z1 * sinX;
          let z2 = y1 * sinX + z1 * cosX;

          let x3 = x2 * cosZ - y2 * sinZ;
          let y3 = x2 * sinZ + y2 * cosZ;
          let z3 = z2;

          const scale = 180 / (180 + z3 * rad);
          return {
            x: cx + x3 * rad * scale,
            y: cy + y3 * rad * scale,
            z: z3
          };
        });
      };

      const outerProjected = projectPoints(rawVertices, outerRadius, false);
      const innerProjected = projectPoints(innerVertices, innerRadius, true);

      // 3. Counter-Rotating Gimbal Ring
      ctx.strokeStyle = `rgba(56, 189, 248, ${0.3 * explosionAlpha})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let a = 0; a <= Math.PI * 2; a += 0.15) {
        const rx = Math.cos(a) * 58 * explosionExpansion;
        const ry = Math.sin(a) * 58 * explosionExpansion;
        const gx = rx * cosY;
        const gy = ry * cosX - rx * sinY * sinX;
        if (a === 0) ctx.moveTo(cx + gx, cy + gy);
        else ctx.lineTo(cx + gx, cy + gy);
      }
      ctx.closePath();
      ctx.stroke();

      // 4. Outer 360 Wireframe
      ctx.lineWidth = 1.25;
      edges.forEach(([i, j]) => {
        const p1 = outerProjected[i];
        const p2 = outerProjected[j];
        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.2, (avgZ + 1) / 2) * explosionAlpha;

        ctx.strokeStyle = `rgba(0, 255, 136, ${alpha * 0.95})`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // 5. Inner Core Wireframe
      ctx.lineWidth = 1;
      innerEdges.forEach(([i, j]) => {
        const p1 = innerProjected[i];
        const p2 = innerProjected[j];
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.7 * explosionAlpha})`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // 6. Glowing Nodes
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

      // 7. Ambient Orbital Particles
      particles.forEach(p => {
        p.angle += p.speed;
        const px = cx + Math.cos(p.angle) * p.orbitRadius * Math.cos(angleY * 0.5) * explosionExpansion;
        const py = cy + Math.sin(p.angle) * p.orbitRadius * 0.45 * explosionExpansion + Math.sin(time * 2 + p.angle) * 5;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 8. Explosion Shards & Shockwaves
      if (explosionRef.current.active) {
        // Shockwave rings
        explosionRef.current.shockwaves.forEach(sw => {
          sw.radius += sw.speed;
          sw.alpha = Math.max(0, sw.alpha - 0.02);
          if (sw.alpha > 0) {
            ctx.strokeStyle = sw.color;
            ctx.globalAlpha = sw.alpha;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(cx, cy, sw.radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });

        // Flying Debris Shards
        explosionRef.current.shards.forEach(sh => {
          sh.x += sh.vx;
          sh.y += sh.vy;
          sh.z += sh.vz;
          sh.vx *= 0.96;
          sh.vy *= 0.96;
          sh.alpha = Math.max(0, sh.alpha - 0.016);

          if (sh.alpha > 0) {
            ctx.fillStyle = sh.color;
            ctx.globalAlpha = sh.alpha;
            ctx.shadowColor = sh.color;
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.arc(cx + sh.x, cy + sh.y, sh.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
          }
        });
      }

      // 9. Scanning laser line sweep
      scanY = (scanY + 1.2) % height;
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.16)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - 65, scanY);
      ctx.lineTo(cx + 65, scanY);
      ctx.stroke();

      // 10. Base projection rings
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.25)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(cx, height - 8, 62, 8, 0, 0, Math.PI * 2);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isActive]);

  return (
    <div className={`hologram-canvas-container ${explosionTrigger > 0 ? 'active-burst' : ''}`}>
      <canvas
        ref={canvasRef}
        className="hologram-canvas"
      />
    </div>
  );
}
