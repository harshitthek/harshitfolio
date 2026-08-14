import React, { useEffect, useRef, useState } from 'react';

export default function CyberCursor({ activeScreen }) {
  const dotWrapperRef = useRef(null);
  const ringWrapperRef = useRef(null);
  const spotlightWrapperRef = useRef(null);

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

      // Direct zero-latency hardware translation on wrapper
      if (dotWrapperRef.current) {
        dotWrapperRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check for interactive element hover
      const target = e.target;
      if (target) {
        const interactive = target.closest(
          'button, a, input, textarea, select, [role="button"], .portal-card, .btn-cyber, .vibe-pill, .cmd-pill, .lab-btn, .hud-social-btn, .hud-quick-btn, .hud-toggle-btn, .tab-btn, .action-btn'
        );
        setIsHovered(!!interactive);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    // Spring physics loop for smooth lagging trailing ring
    const renderLoop = () => {
      const ease = 0.24;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (ringWrapperRef.current) {
        ringWrapperRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      if (spotlightWrapperRef.current) {
        spotlightWrapperRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
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
      {/* 1. Ambient Radial Spotlight Wrapper */}
      <div ref={spotlightWrapperRef} className="cursor-pos-wrapper">
        <div className={`cursor-spotlight-inner ${isHovered ? 'hovered' : ''}`} />
      </div>

      {/* 2. Trailing Precision Target Crosshair Ring Wrapper */}
      <div ref={ringWrapperRef} className="cursor-pos-wrapper">
        <div className={`cursor-reticle-inner ${isHovered ? 'hovered' : ''} ${isClicking ? 'clicking' : ''}`}>
          <span className="reticle-pip top"></span>
          <span className="reticle-pip right"></span>
          <span className="reticle-pip bottom"></span>
          <span className="reticle-pip left"></span>
        </div>
      </div>

      {/* 3. Precision Laser Center Dot Wrapper (Zero Latency) */}
      <div ref={dotWrapperRef} className="cursor-pos-wrapper">
        <div className={`cursor-dot-inner ${isHovered ? 'hovered' : ''} ${isClicking ? 'clicking' : ''}`} />
      </div>
    </div>
  );
}
