import React, { useEffect, useRef } from 'react';
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

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates
    let mouse = { x: -1000, y: -1000, radius: 140 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Neural Node particle count
    const nodeCount = Math.min(Math.floor((width * height) / 16000), 75);
    const nodes = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.75,
        vy: (Math.random() - 0.5) * 0.75,
        radius: Math.random() * 2 + 1.2,
        baseRadius: Math.random() * 2 + 1.2,
        pulsePhase: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.4 + 0.2
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      const speakingBoost = isSpeakingRef.current ? 1.8 : 1.0;
      const connectionDist = isSpeakingRef.current ? 160 : 120;

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Move
        n.x += n.vx * (isSpeakingRef.current ? 1.5 : 1);
        n.y += n.vy * (isSpeakingRef.current ? 1.5 : 1);

        // Boundary wrap
        if (n.x < 0) n.x = width;
        else if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        else if (n.y > height) n.y = 0;

        // Mouse interaction
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          n.x -= (dx / dist) * force * 3;
          n.y -= (dy / dist) * force * 3;
        }

        // Pulse size
        const currentRadius = n.baseRadius * (1 + 0.3 * Math.sin(time * 3 + n.pulsePhase)) * speakingBoost;

        // Draw node
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = isSpeakingRef.current
          ? `rgba(0, 255, 180, ${n.alpha * 1.5})`
          : `rgba(0, 255, 136, ${n.alpha})`;
        ctx.shadowBlur = isSpeakingRef.current ? 12 : 4;
        ctx.shadowColor = '#00ff88';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const distNodes = Math.hypot(n.x - n2.x, n.y - n2.y);

          if (distNodes < connectionDist) {
            const lineAlpha = (1 - distNodes / connectionDist) * 0.22 * speakingBoost;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = isSpeakingRef.current
              ? `rgba(0, 255, 200, ${lineAlpha})`
              : `rgba(0, 255, 136, ${lineAlpha})`;
            ctx.lineWidth = isSpeakingRef.current ? 1.2 : 0.75;
            ctx.stroke();
          }
        }
      }

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
