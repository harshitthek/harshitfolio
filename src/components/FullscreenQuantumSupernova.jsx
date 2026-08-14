import React, { useRef, useEffect } from 'react';

export default function FullscreenQuantumSupernova({ triggerCount }) {
  const canvasRef = useRef(null);
  const blastRef = useRef({
    active: false,
    startTime: 0,
    particles: [],
    shockwaves: [],
    rays: []
  });

  useEffect(() => {
    if (triggerCount <= 0) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const cx = w / 2;
    const cy = h / 2 - 20;

    // 1. 260+ Luminous High-Velocity Sparks & Shards
    const particles = Array.from({ length: 260 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 6 + Math.random() * 24; // High speed to blast across entire screen
      const colors = ['#00ff88', '#38bdf8', '#ffffff', '#f43f5e', '#a855f7', '#fbbf24'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      return {
        x: cx,
        y: cy,
        originX: cx,
        originY: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        targetDist: 150 + Math.random() * (Math.max(w, h) * 0.75),
        size: 1.5 + Math.random() * 3.5,
        color,
        tail: [],
        maxTail: 8
      };
    });

    // 2. Fullscreen Expanding Shockwaves
    const shockwaves = [
      { radius: 10, speed: 28, maxRadius: Math.max(w, h) * 1.1, color: '#00ff88', alpha: 0.9, width: 4 },
      { radius: 10, speed: 20, maxRadius: Math.max(w, h) * 1.1, color: '#38bdf8', alpha: 0.8, width: 3 },
      { radius: 10, speed: 36, maxRadius: Math.max(w, h) * 1.2, color: '#ffffff', alpha: 0.95, width: 5 }
    ];

    // 3. Volumetric Laser Rays
    const rays = Array.from({ length: 24 }, (_, i) => ({
      angle: (i / 24) * Math.PI * 2 + (Math.random() - 0.5) * 0.15,
      length: 0,
      maxLength: Math.max(w, h) * 0.9,
      width: 2 + Math.random() * 5,
      color: i % 2 === 0 ? '#00ff88' : '#38bdf8',
      alpha: 0.85
    }));

    blastRef.current = {
      active: true,
      startTime: performance.now(),
      particles,
      shockwaves,
      rays,
      flashAlpha: 0.85
    };
  }, [triggerCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = (now) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (blastRef.current.active) {
        const elapsed = (now - blastRef.current.startTime) / 1000;
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2 - 20;

        // Total explosion timeline: 2.4 seconds
        if (elapsed < 2.4) {
          // --- Phase 1: Screen Flashbang (0.0s - 0.4s) ---
          if (elapsed < 0.4) {
            const flashOpacity = (1 - elapsed / 0.4) * 0.45;
            const flashGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.max(window.innerWidth, window.innerHeight) * 0.8);
            flashGrad.addColorStop(0, `rgba(255, 255, 255, ${flashOpacity * 1.5})`);
            flashGrad.addColorStop(0.3, `rgba(0, 255, 136, ${flashOpacity})`);
            flashGrad.addColorStop(0.7, `rgba(56, 189, 248, ${flashOpacity * 0.5})`);
            flashGrad.addColorStop(1, 'transparent');

            ctx.fillStyle = flashGrad;
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
          }

          // --- Phase 2: Expanding Fullscreen Shockwave Rings ---
          blastRef.current.shockwaves.forEach(sw => {
            sw.radius += sw.speed;
            const lifeRatio = sw.radius / sw.maxRadius;
            const currentAlpha = Math.max(0, (1 - lifeRatio) * sw.alpha);

            if (currentAlpha > 0) {
              ctx.save();
              ctx.strokeStyle = sw.color;
              ctx.globalAlpha = currentAlpha;
              ctx.lineWidth = sw.width * (1 - lifeRatio * 0.6);
              ctx.shadowColor = sw.color;
              ctx.shadowBlur = 15;
              ctx.beginPath();
              ctx.arc(cx, cy, sw.radius, 0, Math.PI * 2);
              ctx.stroke();
              ctx.restore();
            }
          });

          // --- Phase 3: Volumetric Light Streaks ---
          blastRef.current.rays.forEach(ray => {
            if (elapsed < 0.7) {
              ray.length += (ray.maxLength - ray.length) * 0.25;
            } else {
              ray.alpha = Math.max(0, ray.alpha - 0.04);
            }

            if (ray.alpha > 0) {
              ctx.save();
              ctx.strokeStyle = ray.color;
              ctx.globalAlpha = ray.alpha * (elapsed < 0.5 ? 1 : Math.max(0, 1 - (elapsed - 0.5) / 0.8));
              ctx.lineWidth = ray.width;
              ctx.shadowColor = ray.color;
              ctx.shadowBlur = 10;
              ctx.beginPath();
              ctx.moveTo(cx, cy);
              ctx.lineTo(
                cx + Math.cos(ray.angle) * ray.length,
                cy + Math.sin(ray.angle) * ray.length
              );
              ctx.stroke();
              ctx.restore();
            }
          });

          // --- Phase 4: Fullscreen Physics Particles (Blast -> Magnetic Snapback) ---
          blastRef.current.particles.forEach(p => {
            if (elapsed < 0.65) {
              // Outward explosive blast velocity
              p.x += p.vx;
              p.y += p.vy;
              p.vx *= 0.94;
              p.vy *= 0.94;
            } else {
              // Magnetic reverse gravitational pull back to center
              const t = (elapsed - 0.65) / 1.5;
              const pullStrength = Math.pow(t, 2.2) * 0.28;
              const dx = cx - p.x;
              const dy = cy - p.y;
              p.vx += dx * pullStrength;
              p.vy += dy * pullStrength;
              p.x += p.vx * 0.45;
              p.y += p.vy * 0.45;
            }

            // Save position tail for motion blur laser streaks
            p.tail.unshift({ x: p.x, y: p.y });
            if (p.tail.length > p.maxTail) p.tail.pop();

            // Draw motion blur trail
            if (p.tail.length > 1) {
              ctx.save();
              ctx.strokeStyle = p.color;
              ctx.lineWidth = p.size * 0.75;
              ctx.shadowColor = p.color;
              ctx.shadowBlur = 8;
              ctx.beginPath();
              ctx.moveTo(p.tail[0].x, p.tail[0].y);
              for (let i = 1; i < p.tail.length; i++) {
                ctx.lineTo(p.tail[i].x, p.tail[i].y);
              }
              ctx.stroke();
              ctx.restore();
            }

            // Draw particle head
            ctx.save();
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          });

        } else {
          blastRef.current.active = false;
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fullscreen-supernova-canvas"
      aria-hidden="true"
    />
  );
}
