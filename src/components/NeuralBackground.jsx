import { useEffect, useRef } from 'react';
import { useVoice } from './VoiceContext';

export default function NeuralBackground() {
  const canvasRef = useRef(null);
  const { isSpeaking } = useVoice();
  const isSpeakingRef = useRef(isSpeaking);

  useEffect(() => {
    isSpeakingRef.current = isSpeaking;
  }, [isSpeaking]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let width = canvas.width;
    let height = canvas.height;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      width = canvas.width;
      height = canvas.height;
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates
    const mouse = { x: -1000, y: -1000, radius: 140 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleTouchMove = (e) => {
      if (e.touches?.[0]) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Optimal Node particle count (capped at 42 for silky smooth 60fps)
    const nodeCount = Math.min(Math.floor((width * height) / 28000), 42);
    const nodes = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.65,
        vy: (Math.random() - 0.5) * 0.65,
        radius: Math.random() * 1.8 + 1.2,
        baseRadius: Math.random() * 1.8 + 1.2,
        pulsePhase: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.35 + 0.2
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      const isSpeaking = isSpeakingRef.current;
      const speakingBoost = isSpeaking ? 1.5 : 1.0;
      const connectionDist = isSpeaking ? 140 : 110;
      const connectionDistSq = connectionDist * connectionDist;
      const mouseRadiusSq = mouse.radius * mouse.radius;

      // 1. Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Move
        n.x += n.vx * speakingBoost;
        n.y += n.vy * speakingBoost;

        // Boundary wrap
        if (n.x < 0) n.x = width;
        else if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        else if (n.y > height) n.y = 0;

        // Mouse interaction (using squared distance for speed)
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < mouseRadiusSq && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = (mouse.radius - dist) / mouse.radius;
          n.x -= (dx / dist) * force * 2.5;
          n.y -= (dy / dist) * force * 2.5;
        }

        // Draw node with fast clean fill (zero software shadowBlur lag)
        const currentRadius = n.baseRadius * (1 + 0.25 * Math.sin(time * 2.5 + n.pulsePhase));
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = isSpeaking
          ? `rgba(56, 189, 248, ${n.alpha * 1.4})`
          : `rgba(0, 255, 136, ${n.alpha})`;
        ctx.fill();
      }

      // 2. Batched Line Connections (Single Draw Call!)
      ctx.beginPath();
      ctx.strokeStyle = isSpeaking ? 'rgba(56, 189, 248, 0.18)' : 'rgba(0, 255, 136, 0.12)';
      ctx.lineWidth = 0.8;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dX = n.x - n2.x;
          const dY = n.y - n2.y;
          const dSq = dX * dX + dY * dY;

          if (dSq < connectionDistSq) {
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
          }
        }
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="neural-canvas"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 5,
        opacity: 0.85
      }}
    />
  );
}
