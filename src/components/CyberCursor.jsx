import React, { useEffect, useRef, useState } from 'react';

export default function CyberCursor({ activeScreen }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const spotlightRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mousePos = useRef({ x: -500, y: -500 });
  const ringPos = useRef({ x: -500, y: -500 });
  const rafRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
        setIsTouch(true);
        return;
      }
    }

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Direct instant reposition for center dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check for interactive element hover
      const target = e.target;
      if (target) {
        const interactive = target.closest(
          'button, a, input, textarea, select, [role="button"], .portal-card, .btn-cyber, .vibe-pill, .cmd-pill, .interactive-pad-btn, .hud-social-btn, .hud-quick-btn, .hud-toggle-btn'
        );
        setIsHovered(!!interactive);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    // Smooth spring physics loop for the trailing outer target ring
    const renderLoop = () => {
      const ease = 0.22;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(renderLoop);
    };

    rafRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible]);

  // Keep touch devices clean
  if (isTouch || activeScreen === 's-video') return null;

  return (
    <div className={`cyber-custom-cursor-root ${isVisible ? 'visible' : ''}`} aria-hidden="true">
      {/* 1. Ambient Radial Spotlight */}
      <div ref={spotlightRef} className={`cursor-spotlight-glow ${isHovered ? 'hovered' : ''}`} />

      {/* 2. Precision Laser Center Dot (Zero Latency) */}
      <div
        ref={dotRef}
        className={`cursor-laser-dot ${isHovered ? 'hovered' : ''} ${isClicking ? 'clicking' : ''}`}
      />

      {/* 3. Trailing Cyber Target Crosshair Ring */}
      <div
        ref={ringRef}
        className={`cursor-reticle-ring ${isHovered ? 'hovered' : ''} ${isClicking ? 'clicking' : ''}`}
      >
        <span className="reticle-pip top"></span>
        <span className="reticle-pip right"></span>
        <span className="reticle-pip bottom"></span>
        <span className="reticle-pip left"></span>
      </div>
    </div>
  );
}
