import React, { useEffect, useRef, useState } from 'react';

export default function CyberCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    // Disable on touch / mobile devices for native performance
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
        setIsTouch(true);
        return;
      }
    }

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Instant 1:1 hardware synchronization for the center dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Detect hover over interactive elements
      const target = e.target;
      if (target) {
        const interactive = target.closest(
          'button, a, input, textarea, select, [role="button"], .portal-card, .btn-cyber, .unmute-overlay, .tab-btn, .action-btn, .hud-quick-btn, .hud-toggle-btn, .skip-btn'
        );
        setIsHovered(!!interactive);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    // Smooth 120fps spring lerp for the trailing sci-fi ring
    const renderLoop = () => {
      const ease = 0.22;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
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

  if (isTouch) return null;

  return (
    <div className={`cyber-cursor-hud ${isVisible ? 'active' : ''}`}>
      {/* Precision 4px Neon Core Dot */}
      <div
        ref={dotRef}
        className={`cursor-core-dot ${isHovered ? 'hovered' : ''} ${isClicked ? 'clicked' : ''}`}
      />

      {/* Trailing Sci-Fi Wireframe Ring */}
      <div
        ref={ringRef}
        className={`cursor-trailing-ring ${isHovered ? 'hovered' : ''} ${isClicked ? 'clicked' : ''}`}
      >
        <span className="ring-bracket tl"></span>
        <span className="ring-bracket tr"></span>
        <span className="ring-bracket bl"></span>
        <span className="ring-bracket br"></span>
      </div>
    </div>
  );
}
