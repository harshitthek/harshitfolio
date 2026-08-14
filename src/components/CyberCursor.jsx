import React, { useEffect, useRef, useState } from 'react';

// Style 1: Ambient Mouse Spotlight & Surface Glow (Active on Hub Screens)
export default function CyberCursor({ activeScreen }) {
  const spotlightRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mousePos = useRef({ x: -500, y: -500 });
  const auraPos = useRef({ x: -500, y: -500 });
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

      const target = e.target;
      if (target) {
        const interactive = target.closest(
          'button, a, input, textarea, select, [role="button"], .portal-card, .btn-cyber, .unmute-overlay, .tab-btn, .action-btn, .hud-quick-btn, .hud-toggle-btn, .skip-btn'
        );
        setIsHovered(!!interactive);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    // Ultra-smooth 120fps spring follow loop
    const renderLoop = () => {
      const ease = 0.15;
      auraPos.current.x += (mousePos.current.x - auraPos.current.x) * ease;
      auraPos.current.y += (mousePos.current.y - auraPos.current.y) * ease;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${auraPos.current.x}px, ${auraPos.current.y}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(renderLoop);
    };

    rafRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible]);

  // Keep Screen 1 100% clean and free of compositing overhead
  if (isTouch || activeScreen === 's-video') return null;

  return (
    <div className={`cursor-spotlight-container ${isVisible ? 'active' : ''}`}>
      {/* Smooth Ambient Neon Radial Spotlight */}
      <div
        ref={spotlightRef}
        className={`cursor-spotlight-aura ${isHovered ? 'hovered' : ''}`}
      />
    </div>
  );
}
