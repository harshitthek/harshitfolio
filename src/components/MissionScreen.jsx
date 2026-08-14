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
        {/* Top Badge Strip */}
        <div className="mission-badge-strip">
          <span className="mission-status-dot"></span>
          <span className="mission-tag">EXPLORER DOSSIER // HARSHIT'S SPACE</span>
        </div>

        {/* Grand Hero Name */}
        <h1 className="mission-hero-name">
          HARSHIT <span className="hero-name-glow">SHARMA</span>
        </h1>

        {/* Subtitle Identity Badges */}
        <div className="mission-creds-strip">
          <span className="cred-pill primary">BUILDER &bull; RESEARCHER</span>
          <span className="cred-pill">USAR (GGSIPU), NEW DELHI</span>
          <span className="cred-pill cyan">AI &bull; CREATIVE COMPUTATION</span>
        </div>

        {/* Centerpiece 3D Interactive Hologram */}
        <div className="mission-holo-center">
          <HologramCanvas isActive={isActive} />
        </div>

        {/* Redesigned Personal Statement Card */}
        <div className="mission-personal-card">
          <span className="corner tl"></span>
          <span className="corner tr"></span>
          <span className="corner bl"></span>
          <span className="corner br"></span>

          {/* Header Bar */}
          <div className="personal-card-header">
            <div className="personal-header-left">
              <span className="personal-sparkle-dot"></span>
              <span className="personal-heading">A GLIMPSE INTO MY WORLD</span>
            </div>
            <span className="personal-location-tag">📍 NEW DELHI, INDIA</span>
          </div>

          {/* Authentic Personal Story */}
          <div className="personal-narrative">
            <p className="narrative-lead">
              Driven by curiosity and a relentless desire to turn bold thoughts into reality. I love exploring how intelligent systems learn, deconstructing complex ideas, and crafting digital creations that feel alive, intuitive, and meaningful.
            </p>
            <div className="narrative-invitation">
              <span className="invite-quote-symbol">“</span>
              <span>This space is an unfiltered window into my mindset, experiments, and creative journey.</span>
              <span className="invite-quote-symbol">”</span>
            </div>
          </div>

          {/* Primary Warm Magnetic Button */}
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
            <span className="cta-text">STEP INSIDE MY UNIVERSE</span>
          </button>

          <div className="mission-key-hint">
            <span className="hint-bracket">[</span> PRESS <span className="key-badge">SPACE</span> OR <span className="key-badge">ENTER</span> TO EXPLORE <span className="hint-bracket">]</span>
          </div>
        </div>
      </div>
    </div>
  );
}
