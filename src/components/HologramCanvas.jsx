import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

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
  const anchorRef = useRef(null);
  const centerPosRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight * 0.44 });

  const explosionRef = useRef({
    active: false,
    startTime: 0,
    shards: [],
    vertexScatters: [],
    shockwaves: []
  });

  // Pre-calculate whole-screen explosion physics on trigger
  useEffect(() => {
    if (explosionTrigger > 0) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const maxScreenDim = Math.max(w, h);

      // 1. Massive 3D scatter vectors for the 12 vertices
      const vertexScatters = rawVertices.map(() => {
        const phiAngle = Math.random() * Math.PI * 2;
        const thetaAngle = Math.random() * Math.PI;
        const mag = maxScreenDim * (0.35 + Math.random() * 0.3); // 350px - 650px radius
        return {
          dx: Math.sin(thetaAngle) * Math.cos(phiAngle) * mag,
          dy: Math.sin(thetaAngle) * Math.sin(phiAngle) * mag,
          dz: Math.cos(thetaAngle) * mag
        };
      });

      // 2. 120 Optimized Kinetic Sparks
      const shards = Array.from({ length: 120 }, () => {
        const phiAngle = Math.random() * Math.PI * 2;
        const thetaAngle = Math.random() * Math.PI;
        const speed = 12 + Math.random() * 26;
        return {
          x: 0, y: 0, z: 0,
          vx: Math.sin(thetaAngle) * Math.cos(phiAngle) * speed,
          vy: Math.sin(thetaAngle) * Math.sin(phiAngle) * speed,
          vz: Math.cos(thetaAngle) * speed,
          size: 1.8 + Math.random() * 3.0,
          color: Math.random() > 0.4 ? '#00ff88' : '#38bdf8',
          alpha: 1,
          tail: []
        };
      });

      explosionRef.current = {
        active: true,
        startTime: performance.now(),
        vertexScatters,
        shards,
        shockwaves: [
          { radius: 8, speed: 26, maxRadius: maxScreenDim * 1.05, alpha: 1, color: '#00ff88', width: 3.5 },
          { radius: 8, speed: 18, maxRadius: maxScreenDim * 0.9, alpha: 0.85, color: '#38bdf8', width: 2.5 }
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

    // Cache center position on mount and resize ONLY (prevents layout thrashing freeze)
    const updateCenter = () => {
      if (anchorRef.current) {
        const rect = anchorRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          centerPosRef.current = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          };
          return;
        }
      }
      centerPosRef.current = {
        x: window.innerWidth / 2,
        y: window.innerHeight * 0.44
      };
    };

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1); // Cap DPR to 2 to prevent GPU memory blowups
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      // Safe clean transform reset
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      updateCenter();
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', updateCenter, { passive: true });

    let time = 0;
    let angleY = 0;
    let angleX = 0.3;
    let angleZ = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    // 36 Ambient Quantum Orbital Particles
    const particles = Array.from({ length: 36 }, (_, i) => ({
      orbitRadius: 42 + Math.random() * 28,
      angle: (i / 36) * Math.PI * 2,
      speed: (0.016 + Math.random() * 0.016) * (i % 2 === 0 ? 1 : -1),
      size: 1.2 + Math.random() * 1.6,
      color: i % 3 === 0 ? '#38bdf8' : i % 3 === 1 ? '#00ff88' : '#e0f2fe'
    }));

    const handleMouseMove = (e) => {
      targetRotX = (e.clientY / window.innerHeight - 0.5) * 1.2;
      targetRotY = (e.clientX / window.innerWidth - 0.5) * 1.2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let scanY = 0;

    const render = (now) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      time += 0.02;

      const cx = centerPosRef.current.x;
      const cy = centerPosRef.current.y;

      let isExploding = explosionRef.current.active;
      let explosionExpansion = 1;
      let explosionAlpha = 1;
      let scatterStrength = 0;

      if (isExploding) {
        const elapsed = (now - explosionRef.current.startTime) / 1000;
        if (elapsed < 2.2) {
          if (elapsed < 0.65) {
            // Explosive outward expansion
            const t = elapsed / 0.65;
            explosionExpansion = 1 + Math.sin(t * Math.PI * 0.5) * 7.5; // Huge expansion
            scatterStrength = Math.sin(t * Math.PI * 0.5);
            explosionAlpha = Math.max(0.2, 1 - t * 0.5);
          } else {
            // Magnetic return snap
            const reformT = (elapsed - 0.65) / 1.55;
            const elastic = Math.sin(reformT * Math.PI * 2.5) * Math.exp(-reformT * 3.5);
            explosionExpansion = 1 + elastic * 2.0;
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

      const baseOuterRad = 45 * explosionExpansion;
      const baseInnerRad = 24 * explosionExpansion;

      // 1. Center Glowing Singularity Core
      const glowRadius = Math.min(380, 75 * explosionExpansion);
      const glowGrad = ctx.createRadialGradient(cx, cy, 3, cx, cy, glowRadius);
      glowGrad.addColorStop(0, isExploding ? 'rgba(0, 255, 136, 0.85)' : 'rgba(0, 255, 136, 0.35)');
      glowGrad.addColorStop(0.4, 'rgba(56, 189, 248, 0.25)');
      glowGrad.addColorStop(0.8, 'rgba(0, 255, 136, 0.02)');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // 2. 3D Point Projector with full-screen perspective & massive scatter
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
      for (let a = 0; a <= Math.PI * 2; a += 0.2) {
        const rx = Math.cos(a) * 58 * explosionExpansion;
        const ry = Math.sin(a) * 58 * explosionExpansion;
        const gx = rx * cosY;
        const gy = ry * cosX - rx * sinY * sinX;
        if (a === 0) ctx.moveTo(cx + gx, cy + gy);
        else ctx.lineTo(cx + gx, cy + gy);
      }
      ctx.closePath();
      ctx.stroke();

      // 4. Outer 360 Wireframe Lines (Expanding across the whole screen on TOP layer)
      ctx.lineWidth = isExploding ? 2.2 : 1.3;
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

      // 5. Inner Core Octahedron Wireframe Lines
      ctx.lineWidth = 1.1;
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
        ctx.arc(p.x, p.y, isExploding ? 4.0 : 2.2, 0, Math.PI * 2);
        ctx.fill();
      });

      innerProjected.forEach(p => {
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, isExploding ? 2.8 : 1.8, 0, Math.PI * 2);
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

      // 8. Massive Explosion Shockwaves & Kinetic Sparks (Rendered on top of all layers)
      if (isExploding) {
        const elapsed = (now - explosionRef.current.startTime) / 1000;

        // Shockwave rings
        explosionRef.current.shockwaves.forEach(sw => {
          sw.radius += sw.speed;
          sw.alpha = Math.max(0, sw.alpha - 0.015);
          if (sw.alpha > 0) {
            ctx.save();
            ctx.strokeStyle = sw.color;
            ctx.globalAlpha = sw.alpha;
            ctx.lineWidth = sw.width;
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
            const pullT = (elapsed - 0.65) / 1.55;
            const pull = Math.pow(pullT, 2.5) * 0.36;
            sh.vx += -sh.x * pull;
            sh.vy += -sh.y * pull;
            sh.x += sh.vx * 0.5;
            sh.y += sh.vy * 0.5;
          }

          sh.tail.unshift({ x: sh.x, y: sh.y });
          if (sh.tail.length > 5) sh.tail.pop();

          if (sh.alpha > 0) {
            ctx.save();
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
            ctx.fillStyle = sh.color;
            ctx.beginPath();
            ctx.arc(cx + sh.x, cy + sh.y, sh.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        });
      }

      // 9. Scanning laser line sweep
      scanY = (scanY + 1.2) % 130;
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.16)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - 65, cy - 65 + scanY);
      ctx.lineTo(cx + 65, cy - 65 + scanY);
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
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', updateCenter);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isActive]);

  return (
    <>
      {/* Anchor placeholder in layout flow */}
      <div ref={anchorRef} className="hologram-anchor-box" style={{ width: '280px', height: '130px' }} />

      {/* Top-Level Fullscreen Canvas rendered via Body Portal (Flies OVER Top Header Bar!) */}
      {typeof document !== 'undefined' && ReactDOM.createPortal(
        <canvas
          ref={canvasRef}
          className="fullscreen-hologram-canvas"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 99999
          }}
        />,
        document.body
      )}
    </>
  );
}
