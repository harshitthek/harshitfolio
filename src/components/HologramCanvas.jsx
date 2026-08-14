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

// 20 Triangular faces for true 3D shard fracturing
const faces = [
  [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
  [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
  [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
  [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
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
    polygons: [],
    shockwaves: []
  });

  // Trigger high-impact 3D Supernova explosion
  useEffect(() => {
    if (explosionTrigger > 0) {
      // 1. 20 Fracturing 3D Triangular Polygonal Shards
      const polygons = faces.map((faceIndices) => {
        const v0 = rawVertices[faceIndices[0]];
        const v1 = rawVertices[faceIndices[1]];
        const v2 = rawVertices[faceIndices[2]];

        const faceCenterX = (v0[0] + v1[0] + v2[0]) / 3;
        const faceCenterY = (v0[1] + v1[1] + v2[1]) / 3;
        const faceCenterZ = (v0[2] + v1[2] + v2[2]) / 3;
        const speed = 12 + Math.random() * 20;

        return {
          faceIndices,
          x: 0, y: 0, z: 0,
          vx: faceCenterX * speed,
          vy: faceCenterY * speed,
          vz: faceCenterZ * speed,
          rotX: 0, rotY: 0, rotZ: 0,
          vRotX: (Math.random() - 0.5) * 0.25,
          vRotY: (Math.random() - 0.5) * 0.25,
          vRotZ: (Math.random() - 0.5) * 0.25,
          color: Math.random() > 0.5 ? 'rgba(0, 255, 136, 0.45)' : 'rgba(56, 189, 248, 0.45)',
          strokeColor: Math.random() > 0.5 ? '#00ff88' : '#38bdf8'
        };
      });

      // 2. 180 High-Velocity Kinetic Sparks
      const shards = Array.from({ length: 180 }, () => {
        const phi = Math.random() * Math.PI * 2;
        const theta = Math.random() * Math.PI;
        const speed = 8 + Math.random() * 26;
        return {
          x: 0, y: 0, z: 0,
          vx: Math.sin(theta) * Math.cos(phi) * speed,
          vy: Math.sin(theta) * Math.sin(phi) * speed,
          vz: Math.cos(theta) * speed,
          size: 1.5 + Math.random() * 3.5,
          color: Math.random() > 0.35 ? '#00ff88' : Math.random() > 0.5 ? '#38bdf8' : '#ffffff',
          alpha: 1,
          tail: []
        };
      });

      explosionRef.current = {
        active: true,
        startTime: performance.now(),
        shards,
        polygons,
        shockwaves: [
          { radius: 6, speed: 22, maxRadius: 750, alpha: 1, color: '#ffffff', width: 3.5 },
          { radius: 6, speed: 16, maxRadius: 650, alpha: 0.9, color: '#00ff88', width: 3 },
          { radius: 6, speed: 11, maxRadius: 560, alpha: 0.85, color: '#38bdf8', width: 2.5 }
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
      let elapsed = 0;
      let explosionExpansion = 1;
      let explosionAlpha = 1;

      if (isExploding) {
        elapsed = (now - explosionRef.current.startTime) / 1000;
        if (elapsed < 2.0) {
          if (elapsed < 0.65) {
            explosionExpansion = 1 + elapsed * 5.2;
            explosionAlpha = Math.max(0.1, 1 - elapsed * 1.4);
          } else {
            const reformT = (elapsed - 0.65) / 1.35;
            const easeOutElastic = Math.sin(reformT * Math.PI * 2.5) * Math.exp(-reformT * 3.5);
            explosionExpansion = 1 + easeOutElastic * 1.8;
            explosionAlpha = Math.min(1, reformT * 1.6);
          }
        } else {
          explosionRef.current.active = false;
          isExploding = false;
        }
      }

      angleY += 0.018 + targetRotY * 0.02;
      angleX = 0.25 + Math.sin(time * 0.7) * 0.22 + targetRotX * 0.2;
      angleZ += 0.006;

      const cosY = Math.cos(angleY), sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX), sinX = Math.sin(angleX);
      const cosZ = Math.cos(angleZ), sinZ = Math.sin(angleZ);

      const cx = width / 2;
      const cy = height / 2;
      const outerRadius = 45 * explosionExpansion;
      const innerRadius = 24 * explosionExpansion;

      // 1. Core Detonation Flash (Violent instant flash at t=0ms..120ms)
      if (isExploding && elapsed < 0.25) {
        const flashIntensity = (1 - elapsed / 0.25);
        const flashRad = 15 + flashIntensity * 120;
        const flashGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, flashRad);
        flashGrad.addColorStop(0, `rgba(255, 255, 255, ${flashIntensity * 0.95})`);
        flashGrad.addColorStop(0.3, `rgba(0, 255, 136, ${flashIntensity * 0.85})`);
        flashGrad.addColorStop(0.7, `rgba(56, 189, 248, ${flashIntensity * 0.4})`);
        flashGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = flashGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, flashRad, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Center Ambient Glow
      const glowRadius = Math.min(240, 75 * explosionExpansion);
      const glowGrad = ctx.createRadialGradient(cx, cy, 3, cx, cy, glowRadius);
      glowGrad.addColorStop(0, isExploding ? 'rgba(0, 255, 136, 0.8)' : 'rgba(0, 255, 136, 0.35)');
      glowGrad.addColorStop(0.4, 'rgba(56, 189, 248, 0.25)');
      glowGrad.addColorStop(0.8, 'rgba(0, 255, 136, 0.02)');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // 3. 3D Rotation Point Projector
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

          const scale = 220 / (220 + z3 * rad);
          return {
            x: cx + x3 * rad * scale,
            y: cy + y3 * rad * scale,
            z: z3
          };
        });
      };

      const outerProjected = projectPoints(rawVertices, outerRadius, false);
      const innerProjected = projectPoints(innerVertices, innerRadius, true);

      // 4. Counter-Rotating Gimbal Ring
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

      // 5. Outer 360 Wireframe
      ctx.lineWidth = 1.35;
      edges.forEach(([i, j]) => {
        const p1 = outerProjected[i];
        const p2 = outerProjected[j];
        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.15, (avgZ + 1) / 2) * explosionAlpha;

        ctx.strokeStyle = `rgba(0, 255, 136, ${alpha * 0.95})`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // 6. Inner Core Wireframe
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

      // 7. Glowing Nodes
      outerProjected.forEach(p => {
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
        ctx.fill();
      });

      innerProjected.forEach(p => {
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      // 8. 3D Tumbling Polygonal Shards (When Exploded)
      if (isExploding) {
        explosionRef.current.polygons.forEach(poly => {
          if (elapsed < 0.65) {
            poly.x += poly.vx;
            poly.y += poly.vy;
            poly.z += poly.vz;
            poly.vx *= 0.95;
            poly.vy *= 0.95;
            poly.rotX += poly.vRotX;
            poly.rotY += poly.vRotY;
            poly.rotZ += poly.vRotZ;
          } else {
            const pullT = (elapsed - 0.65) / 1.35;
            const pull = Math.pow(pullT, 2.5) * 0.35;
            poly.vx += -poly.x * pull;
            poly.vy += -poly.y * pull;
            poly.x += poly.vx * 0.5;
            poly.y += poly.vy * 0.5;
          }

          const p0 = outerProjected[poly.faceIndices[0]];
          const p1 = outerProjected[poly.faceIndices[1]];
          const p2 = outerProjected[poly.faceIndices[2]];

          if (p0 && p1 && p2) {
            ctx.save();
            ctx.fillStyle = poly.color;
            ctx.strokeStyle = poly.strokeColor;
            ctx.lineWidth = 1.2;
            ctx.shadowColor = poly.strokeColor;
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.moveTo(p0.x + poly.x * 0.3, p0.y + poly.y * 0.3);
            ctx.lineTo(p1.x + poly.x * 0.3, p1.y + poly.y * 0.3);
            ctx.lineTo(p2.x + poly.x * 0.3, p2.y + poly.y * 0.3);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();
          }
        });

        // High-Speed Shockwave Rings
        explosionRef.current.shockwaves.forEach(sw => {
          sw.radius += sw.speed;
          sw.alpha = Math.max(0, sw.alpha - 0.016);
          if (sw.alpha > 0) {
            ctx.save();
            ctx.strokeStyle = sw.color;
            ctx.globalAlpha = sw.alpha;
            ctx.lineWidth = sw.width;
            ctx.shadowColor = sw.color;
            ctx.shadowBlur = 14;
            ctx.beginPath();
            ctx.arc(cx, cy, sw.radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
          }
        });

        // 180 Kinetic Sparks with Motion Trails
        explosionRef.current.shards.forEach(sh => {
          if (elapsed < 0.65) {
            sh.x += sh.vx;
            sh.y += sh.vy;
            sh.z += sh.vz;
            sh.vx *= 0.95;
            sh.vy *= 0.95;
          } else {
            const pullT = (elapsed - 0.65) / 1.35;
            const pull = Math.pow(pullT, 2.5) * 0.38;
            sh.vx += -sh.x * pull;
            sh.vy += -sh.y * pull;
            sh.x += sh.vx * 0.5;
            sh.y += sh.vy * 0.5;
          }

          sh.tail.unshift({ x: sh.x, y: sh.y });
          if (sh.tail.length > 5) sh.tail.pop();

          if (sh.alpha > 0) {
            ctx.save();
            // Tail
            if (sh.tail.length > 1) {
              ctx.strokeStyle = sh.color;
              ctx.lineWidth = sh.size * 0.6;
              ctx.beginPath();
              ctx.moveTo(cx + sh.tail[0].x, cy + sh.tail[0].y);
              for (let i = 1; i < sh.tail.length; i++) {
                ctx.lineTo(cx + sh.tail[i].x, cy + sh.tail[i].y);
              }
              ctx.stroke();
            }
            // Head
            ctx.fillStyle = sh.color;
            ctx.shadowColor = sh.color;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(cx + sh.x, cy + sh.y, sh.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        });
      }

      // 9. Ambient Orbital Particles
      particles.forEach(p => {
        p.angle += p.speed;
        const px = cx + Math.cos(p.angle) * p.orbitRadius * Math.cos(angleY * 0.5) * explosionExpansion;
        const py = cy + Math.sin(p.angle) * p.orbitRadius * 0.45 * explosionExpansion + Math.sin(time * 2 + p.angle) * 5;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 10. Scanning laser line sweep
      scanY = (scanY + 1.2) % height;
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.16)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - 65, scanY);
      ctx.lineTo(cx + 65, scanY);
      ctx.stroke();

      // 11. Base projection rings
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
