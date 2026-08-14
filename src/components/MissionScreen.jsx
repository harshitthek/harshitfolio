import React, { useEffect } from 'react';
import { SoundFX } from './SoundFX';
import HologramCanvas from './HologramCanvas';

export default function MissionScreen({ isActive, onAccept, onOpenModal }) {
  const handleAccept = () => {
    SoundFX.playClick();
    onAccept();
  };

  // Keyboard accessibility: Press Enter or Space to proceed
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleAccept();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);

  return (
    <div id="s-mission" className={`screen ${isActive ? 'active' : ''}`}>
      <div className="corner-dec tl"></div>
      <div className="corner-dec tr"></div>
      <div className="corner-dec bl"></div>
      <div className="corner-dec br"></div>

      <div className="mission-content-wrapper">
        {/* Minimalist Top Origin Tag */}
        <div className="mission-origin-tag">
          <span className="origin-dot"></span>
          <span>NEW DELHI &bull; USAR (GGSIPU) &bull; PORTFOLIO_V2</span>
        </div>

        {/* Massive Hero Name Header */}
        <div className="hero-name-container">
          <h1 className="mission-hero-name">
            HARSHIT <span className="hero-name-glow">SHARMA</span>
          </h1>
          <div className="hero-sub-discipline">
            ARTIFICIAL INTELLIGENCE &bull; MACHINE LEARNING &bull; SYSTEMS ARCHITECTURE
          </div>
        </div>

        {/* Centerpiece 3D 360-Degree Rotating Quantum Hologram */}
        <div className="mission-holo-center">
          <HologramCanvas isActive={isActive} />
        </div>

        {/* Compact, Ultra-Sleek Glass Action Pod */}
        <div className="mission-action-pod">
          <span className="corner tl"></span>
          <span className="corner tr"></span>
          <span className="corner bl"></span>
          <span className="corner br"></span>

          <p className="pod-personal-quote">
            Driven by curiosity and a passion for turning complex ideas into intelligent, living systems. Step inside to explore my engineering mindset and creations.
          </p>

          <button
            type="button"
            className="step-inside-cta"
            onClick={handleAccept}
            onMouseEnter={() => SoundFX.playHover('primary')}
          >
            <span className="corner tl"></span>
            <span className="corner tr"></span>
            <span className="corner bl"></span>
            <span className="corner br"></span>
            <span className="cta-icon">▶</span>
            <span className="cta-text">STEP INSIDE MY MULTIVERSE</span>
          </button>

          <div className="mission-key-hint">
            <span className="hint-bracket">[</span> PRESS <span className="key-badge">SPACE</span> OR <span className="key-badge">ENTER</span> TO ENGAGE <span className="hint-bracket">]</span>
          </div>
        </div>
      </div>
    </div>
  );
}
