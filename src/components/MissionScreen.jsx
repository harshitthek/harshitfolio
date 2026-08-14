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

      {/* Left Atmospheric Cyber Soundwave & Resonance Pillar */}
      <aside className="ambient-cyber-pillar left-pillar" aria-hidden="true">
        <div className="pillar-header">
          <span className="pillar-pulse-dot green"></span>
          <span className="pillar-tag">AUDIO RESONANCE</span>
        </div>

        <div className="pillar-bars-eq">
          <span className="eq-bar"></span>
          <span className="eq-bar"></span>
          <span className="eq-bar"></span>
          <span className="eq-bar"></span>
          <span className="eq-bar"></span>
          <span className="eq-bar"></span>
          <span className="eq-bar"></span>
          <span className="eq-bar"></span>
          <span className="eq-bar"></span>
          <span className="eq-bar"></span>
          <span className="eq-bar"></span>
          <span className="eq-bar"></span>
        </div>

        <div className="pillar-metrics">
          <span className="metric-chip cyan">44.1 kHz</span>
          <span className="metric-chip green">SYNTH_ONLINE</span>
        </div>
      </aside>

      {/* Center Hero Column */}
      <div className="mission-content-wrapper">
        {/* Minimalist Top Status Tag */}
        <div className="mission-origin-tag">
          <span className="origin-dot"></span>
          <span>ENTERING HARSHIT'S UNIVERSE &bull; SYSTEM_ONLINE &bull; PORTFOLIO_V2</span>
        </div>

        {/* Massive Hero Name Header (Preserved Exactly) */}
        <div className="hero-name-container">
          <h1 className="mission-hero-name">
            HARSHIT <span className="hero-name-glow">SHARMA</span>
          </h1>
          <div className="hero-sub-discipline">
            CREATOR &bull; THINKER &bull; MULTIVERSE ARCHITECT &bull; NEW DELHI
          </div>
        </div>

        {/* Centerpiece 3D 360-Degree Rotating Quantum Hologram */}
        <div className="mission-holo-center">
          <HologramCanvas isActive={isActive} />
        </div>

        {/* Sleek, Atmospheric Welcome & Access Pod */}
        <div className="mission-welcome-pod">
          <span className="corner tl"></span>
          <span className="corner tr"></span>
          <span className="corner bl"></span>
          <span className="corner br"></span>

          {/* Pod Top Header */}
          <div className="welcome-pod-header">
            <div className="welcome-header-left">
              <span className="welcome-beacon-dot"></span>
              <span className="welcome-title">ACCESS GRANTED // PORTAL READY</span>
            </div>
            <span className="welcome-status-badge">CLEARANCE: LEVEL-9</span>
          </div>

          {/* Authentic, Intriguing Welcome Quote */}
          <p className="welcome-quote">
            “Step past the digital boundary. Welcome to my creative sandbox, my thoughts, and the multiverses I've brought to life. Take your time and explore.”
          </p>

          {/* Cool Personality & Vibe Badges */}
          <div className="welcome-vibe-strip">
            <span className="vibe-pill">💡 CURIOSITY</span>
            <span className="vibe-pill">⚡ CREATION</span>
            <span className="vibe-pill cyan">🌌 MULTIVERSE</span>
            <span className="vibe-pill green">✨ EXPLORATION</span>
          </div>

          {/* Primary Magnetic CTA Button */}
          <button
            type="button"
            className="welcome-cta-btn"
            onClick={handleAccept}
            onMouseEnter={() => SoundFX.playHover('primary')}
          >
            <span className="corner tl"></span>
            <span className="corner tr"></span>
            <span className="corner bl"></span>
            <span className="corner br"></span>
            <span className="cta-icon">▶</span>
            <span className="cta-text">ENTER THE MULTIVERSE</span>
          </button>

          <div className="mission-key-hint">
            <span className="hint-bracket">[</span> PRESS <span className="key-badge">SPACE</span> OR <span className="key-badge">ENTER</span> TO ENGAGE <span className="hint-bracket">]</span>
          </div>
        </div>
      </div>

      {/* Right Atmospheric Gyroscopic Cyber Compass & Spatial Reticle */}
      <aside className="ambient-cyber-pillar right-pillar" aria-hidden="true">
        <div className="pillar-header">
          <span className="pillar-pulse-dot cyan"></span>
          <span className="pillar-tag">SPATIAL RADAR</span>
        </div>

        <div className="pillar-gyro-reticle">
          <span className="gyro-ring outer"></span>
          <span className="gyro-ring inner"></span>
          <span className="gyro-cross h"></span>
          <span className="gyro-cross v"></span>
          <span className="gyro-laser-beam"></span>
          <span className="gyro-center-dot"></span>
        </div>

        <div className="pillar-metrics">
          <span className="metric-chip cyan">28.61° N, 77.20° E</span>
          <span className="metric-chip green">ORBIT_STABLE</span>
        </div>
      </aside>
    </div>
  );
}
