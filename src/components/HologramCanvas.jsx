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

      // 1. Coherent 3D model-space scatter vectors for the 12 vertices (Zero jitter / zero shearing)
      const vertexScatters = rawVertices.map(([vx, vy, vz]) => ({
        sx: vx * (1.0 + Math.random() * 0.8),
        sy: vy * (1.0 + Math.random() * 0.8),
        sz: vz * (1.0 + Math.random() * 0.8)
      }));

      // 2. 180 High-Velocity Relativistic Quantum Photons
      const shards = Array.from({ length: 180 }, () => {
        const phiAngle = Math.random() * Math.PI * 2;
        const thetaAngle = Math.random() * Math.PI;
        const speed = 26 + Math.random() * 48; // High-energy blast across full viewport
        return {
          x: 0, y: 0, z: 0,
          vx: Math.sin(thetaAngle) * Math.cos(phiAngle) * speed,
          vy: Math.sin(thetaAngle) * Math.sin(phiAngle) * speed,
          vz: Math.cos(thetaAngle) * speed,
          spinDir: Math.random() > 0.5 ? 1 : -1,
          orbitTargetRad: 40 + Math.random() * 32,
          orbitAngle: phiAngle,
          size: 2.0 + Math.random() * 3.0,
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
          { radius: 10, speed: 45, maxRadius: maxScreenDim * 1.5, alpha: 1, color: '#00ff88', width: 4.5 },
          { radius: 10, speed: 30, maxRadius: maxScreenDim * 1.25, alpha: 0.9, color: '#38bdf8', width: 3.5 },
          { radius: 10, speed: 20, maxRadius: maxScreenDim * 0.95, alpha: 0.8, color: '#ffffff', width: 2.5 }
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
        const totalDuration = 2.8;
        if (elapsed < totalDuration) {
          if (elapsed < 0.65) {
            // Rapid high-energy outward expansion blast (peaking smoothly at 8.5x original size)
            const t = elapsed / 0.65;
            explosionExpansion = 1 + Math.sin(t * Math.PI * 0.5) * 7.5;
            scatterStrength = Math.sin(t * Math.PI * 0.5);
            explosionAlpha = 1;
          } else {
            // Smooth continuous return from 8.5x down to 1.0x (100% continuous, zero mid-flight snap!)
            const reformT = (elapsed - 0.65) / (totalDuration - 0.65); // 0 to 1 over 2.15s
            
            // Continuous smooth decay from 8.5 -> 1.0
            const returnCurve = Math.cos(reformT * Math.PI * 0.5) * Math.exp(-reformT * 1.5);
            explosionExpansion = 1 + returnCurve * 7.5;
            scatterStrength = returnCurve;
            
            // Smooth fade-out of extra explosion sparks into the permanent orbital ring
            explosionAlpha = reformT < 0.65 ? 1 : Math.max(0, 1 - (reformT - 0.65) / 0.35);
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

      const isMobile = window.innerWidth < 768;
      const baseOuterRad = (isMobile ? 32 : 45) * explosionExpansion;
      const baseInnerRad = (isMobile ? 17 : 24) * explosionExpansion;

      // 1. Center Glowing Singularity Core
      const glowRadius = Math.min(380, (isMobile ? 55 : 75) * explosionExpansion);
      const glowGrad = ctx.createRadialGradient(cx, cy, 3, cx, cy, glowRadius);
      glowGrad.addColorStop(0, isExploding ? 'rgba(0, 255, 136, 0.85)' : 'rgba(0, 255, 136, 0.35)');
      glowGrad.addColorStop(0.4, 'rgba(56, 189, 248, 0.25)');
      glowGrad.addColorStop(0.8, 'rgba(0, 255, 136, 0.02)');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // 2. 3D Point Projector with coherent 3D rotation (Zero glitching / zero wire twisting)
      const projectPoints = (verts, rad, scatters = null, reverseRot = false) => {
        const mul = reverseRot ? -1.5 : 1;
        const curCosY = Math.cos(angleY * mul);
        const curSinY = Math.sin(angleY * mul);

        return verts.map(([vx, vy, vz], idx) => {
          // Displace vertex in 3D model space so rotation is 100% smooth and continuous
          let px = vx;
          let py = vy;
          let pz = vz;

          if (scatters && scatters[idx] && scatterStrength > 0) {
            px += scatters[idx].sx * scatterStrength;
            py += scatters[idx].sy * scatterStrength;
            pz += scatters[idx].sz * scatterStrength;
          }

          let x1 = px * curCosY + pz * curSinY;
          let y1 = py;
          let z1 = -px * curSinY + pz * curCosY;

          let x2 = x1;
          let y2 = y1 * cosX - z1 * sinX;
          let z2 = y1 * sinX + z1 * cosX;

          let x3 = x2 * cosZ - y2 * sinZ;
          let y3 = x2 * sinZ + y2 * cosZ;
          let z3 = z2;

          const scale = 180 / (180 + z3 * rad * 0.4);
          return {
            x: cx + x3 * rad * scale,
            y: cy + y3 * rad * scale,
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
      const gimbalRadius = (isMobile ? 42 : 58) * explosionExpansion;
      for (let a = 0; a <= Math.PI * 2; a += 0.2) {
        const rx = Math.cos(a) * gimbalRadius;
        const ry = Math.sin(a) * gimbalRadius;
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

        // Quantum Photons: Blast Outward -> Spiral into Circular 3D Orbit around Hologram -> Reintegrate
        explosionRef.current.shards.forEach(sh => {
          // Continuous Fluid Gravitational + Vortex Flow (Full screen blast -> Smooth orbit)
          const normDist = Math.sqrt(sh.x * sh.x + sh.y * sh.y) || 1;
          const dirX = sh.x / normDist;
          const dirY = sh.y / normDist;

          // Outward explosive blast for first 0.55s, then inward gravity engages smoothly
          const gravityPull = Math.min(2.0, Math.max(0, elapsed - 0.55) * 1.1);
          
          // Tangential swirling vortex acceleration (creates circular orbits around hologram)
          const vortexForce = Math.min(1.5, Math.max(0, elapsed - 0.6) * 0.9) * (sh.spinDir || 1);

          // Force integration (dv = a * dt)
          sh.vx += -dirX * gravityPull - dirY * vortexForce;
          sh.vy += -dirY * gravityPull + dirX * vortexForce;
          
          // Damping (starts low during blast, increases during orbit)
          const damp = elapsed < 0.55 ? 0.98 : 0.962;
          sh.vx *= damp;
          sh.vy *= damp;

          // Continuous position integration (dx = v * dt)
          sh.x += sh.vx;
          sh.y += sh.vy;

          sh.tail.unshift({ x: sh.x, y: sh.y });
          if (sh.tail.length > 7) sh.tail.pop();

          if (sh.alpha > 0) {
            ctx.save();
            // Smooth glowing particle stream orbiting the hologram
            if (sh.tail.length > 1) {
              for (let i = 0; i < sh.tail.length - 1; i++) {
                const segAlpha = (1 - i / sh.tail.length) * 0.6 * explosionAlpha;
                ctx.strokeStyle = sh.color;
                ctx.globalAlpha = segAlpha;
                ctx.lineWidth = Math.max(0.75, sh.size * (1 - i / sh.tail.length) * 0.7);
                ctx.beginPath();
                ctx.moveTo(cx + sh.tail[i].x, cy + sh.tail[i].y);
                ctx.lineTo(cx + sh.tail[i + 1].x, cy + sh.tail[i + 1].y);
                ctx.stroke();
              }
            }

            // Glowing orbital photon bead
            ctx.globalAlpha = explosionAlpha;
            ctx.fillStyle = sh.color;
            ctx.shadowColor = sh.color;
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(cx + sh.x, cy + sh.y, sh.size * 0.9, 0, Math.PI * 2);
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
      ctx.ellipse(cx, cy + (isMobile ? 38 : 55), isMobile ? 44 : 62, isMobile ? 6 : 8, 0, 0, Math.PI * 2);
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

  if (!isActive) {
    return null;
  }

  return (
    <>
      {/* Anchor placeholder in layout flow */}
      <div ref={anchorRef} className="hologram-anchor-box" style={{ width: '100%', height: '110px' }} />

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
