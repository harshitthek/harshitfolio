import React, { useRef, useEffect } from 'react';

// 3D 12-vertex Icosahedron geometry definition
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

// Inner Octahedron Core
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

export default function HologramCanvas({ isActive, explosionTrigger = 0 }) {
  const canvasRef = useRef(null);
  const explosionRef = useRef({
    active: false,
    startTime: 0,
    shards: [],
    vertexScatters: [],
    shockwaves: []
  });

  // Trigger whole-screen 3D Hologram Boom explosion
  useEffect(() => {
    if (explosionTrigger > 0) {
      // 1. Chaotic 3D scatter vectors for each of the 12 outer vertices and 6 inner vertices
      const vertexScatters = rawVertices.map(() => {
        const phiAngle = Math.random() * Math.PI * 2;
        const thetaAngle = Math.random() * Math.PI;
        const mag = 120 + Math.random() * 160;
        return {
          dx: Math.sin(thetaAngle) * Math.cos(phiAngle) * mag,
          dy: Math.sin(thetaAngle) * Math.sin(phiAngle) * mag,
          dz: Math.cos(thetaAngle) * mag
        };
      });

      // 2. 140 Kinetic particle sparks blasting outward
      const shards = Array.from({ length: 140 }, () => {
        const phiAngle = Math.random() * Math.PI * 2;
        const thetaAngle = Math.random() * Math.PI;
        const speed = 7 + Math.random() * 20;
        return {
          x: 0, y: 0, z: 0,
          vx: Math.sin(thetaAngle) * Math.cos(phiAngle) * speed,
          vy: Math.sin(thetaAngle) * Math.sin(phiAngle) * speed,
          vz: Math.cos(thetaAngle) * speed,
          size: 1.4 + Math.random() * 3.2,
          color: Math.random() > 0.4 ? '#00ff88' : '#38bdf8',
          alpha: 1
        };
      });

      explosionRef.current = {
        active: true,
        startTime: performance.now(),
        vertexScatters,
        shards,
        shockwaves: [
          { radius: 6, speed: 18, maxRadius: 680, alpha: 1, color: '#00ff88', width: 3 },
          { radius: 6, speed: 12, maxRadius: 580, alpha: 0.85, color: '#38bdf8', width: 2 }
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
    const width = 1100;
    const height = 600;
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

      let isExploding = explosionRef.current.active;
      let explosionProgress = 0;
      let explosionExpansion = 1;
      let explosionAlpha = 1;
      let scatterStrength = 0;

      if (isExploding) {
        const elapsed = (now - explosionRef.current.startTime) / 1000;
        if (elapsed < 2.0) {
          if (elapsed < 0.65) {
            // Explosive outward expansion
            const t = elapsed / 0.65;
            explosionExpansion = 1 + Math.sin(t * Math.PI * 0.5) * 4.5;
            scatterStrength = Math.sin(t * Math.PI * 0.5);
            explosionAlpha = Math.max(0.2, 1 - t * 0.6);
          } else {
            // Magnetic return snap
            const reformT = (elapsed - 0.65) / 1.35;
            const elastic = Math.sin(reformT * Math.PI * 2.5) * Math.exp(-reformT * 3.5);
            explosionExpansion = 1 + elastic * 1.8;
            scatterStrength = Math.max(0, (1 - reformT) * Math.exp(-reformT * 2));
            explosionAlpha = Math.min(1, 0.4 + reformT * 0.6);
          }
        } else {
          explosionRef.current.active = false;
          isExploding = false;
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
      const cy = height / 2;
      const baseOuterRad = 45 * explosionExpansion;
      const baseInnerRad = 24 * explosionExpansion;

      // 1. Center Glowing Singularity
      const glowRadius = Math.min(220, 75 * explosionExpansion);
      const glowGrad = ctx.createRadialGradient(cx, cy, 3, cx, cy, glowRadius);
      glowGrad.addColorStop(0, isExploding ? 'rgba(0, 255, 136, 0.85)' : 'rgba(0, 255, 136, 0.35)');
      glowGrad.addColorStop(0.4, 'rgba(56, 189, 248, 0.25)');
      glowGrad.addColorStop(0.8, 'rgba(0, 255, 136, 0.02)');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // 2. 3D Point Projector with full-range perspective & scatter
      const projectPoints = (verts, rad, scatters = null, reverseRot = false) => {
        const mul = reverseRot ? -1.5 : 1;
        const curCosY = Math.cos(angleY * mul);
        const curSinY = Math.sin(angleY * mul);

        return verts.map(([vx, vy, vz], idx) => {
          let x1 = vx * curCosY + vz * curSinY;
          let y1 = vy;
          let z1 = -vx * curSinY + vz * curCosY;

          let x2 = x1;
          let y2 = y1 * cosX - z1 * sinX;
          let z2 = y1 * sinX + z1 * cosX;

          let x3 = x2 * cosZ - y2 * sinZ;
          let y3 = x2 * sinZ + y2 * cosZ;
          let z3 = z2;

          let extraX = 0;
          let extraY = 0;
          if (scatters && scatters[idx] && scatterStrength > 0) {
            extraX = scatters[idx].dx * scatterStrength;
            extraY = scatters[idx].dy * scatterStrength;
          }

          const scale = 1.0 + (z3 * 0.18);
          return {
            x: cx + x3 * rad * scale + extraX,
            y: cy + y3 * rad * scale + extraY,
            z: z3
          };
        });
      };

      const outerProjected = projectPoints(rawVertices, baseOuterRad, explosionRef.current.vertexScatters, false);
      const innerProjected = projectPoints(innerVertices, baseInnerRad, null, true);

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

      // 4. Outer 360 Wireframe Lines (Expanding violently with the boom!)
      ctx.lineWidth = isExploding ? 1.8 : 1.25;
      edges.forEach(([i, j]) => {
        const p1 = outerProjected[i];
        const p2 = outerProjected[j];
        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.2, (avgZ + 1) / 2) * explosionAlpha;

        ctx.strokeStyle = `rgba(0, 255, 136, ${alpha * 0.95})`;
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = isExploding ? 10 : 4;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });
      ctx.shadowBlur = 0;

      // 5. Inner Core Octahedron Wireframe Lines
      ctx.lineWidth = 1;
      innerEdges.forEach(([i, j]) => {
        const p1 = innerProjected[i];
        const p2 = innerProjected[j];
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.75 * explosionAlpha})`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // 6. Glowing 3D Nodes
      outerProjected.forEach(p => {
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = isExploding ? 14 : 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, isExploding ? 3.5 : 2.2, 0, Math.PI * 2);
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
      if (isExploding) {
        const elapsed = (now - explosionRef.current.startTime) / 1000;

        // Shockwaves
        explosionRef.current.shockwaves.forEach(sw => {
          sw.radius += sw.speed;
          sw.alpha = Math.max(0, sw.alpha - 0.016);
          if (sw.alpha > 0) {
            ctx.save();
            ctx.strokeStyle = sw.color;
            ctx.globalAlpha = sw.alpha;
            ctx.lineWidth = sw.width;
            ctx.shadowColor = sw.color;
            ctx.shadowBlur = 12;
            ctx.beginPath();
            ctx.arc(cx, cy, sw.radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
          }
        });

        // Kinetic Sparks
        explosionRef.current.shards.forEach(sh => {
          if (elapsed < 0.65) {
            sh.x += sh.vx;
            sh.y += sh.vy;
            sh.z += sh.vz;
            sh.vx *= 0.96;
            sh.vy *= 0.96;
          } else {
            const pullT = (elapsed - 0.65) / 1.35;
            const pull = Math.pow(pullT, 2.5) * 0.35;
            sh.vx += -sh.x * pull;
            sh.vy += -sh.y * pull;
            sh.x += sh.vx * 0.5;
            sh.y += sh.vy * 0.5;
          }

          if (sh.alpha > 0) {
            ctx.save();
            ctx.fillStyle = sh.color;
            ctx.globalAlpha = sh.alpha;
            ctx.shadowColor = sh.color;
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(cx + sh.x, cy + sh.y, sh.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
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
      ctx.ellipse(cx, cy + 55, 62, 8, 0, 0, Math.PI * 2);
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
    <div className="hologram-canvas-container">
      <canvas
        ref={canvasRef}
        className="hologram-canvas"
      />
    </div>
  );
}
