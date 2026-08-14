import React, { useEffect } from 'react';
import { SoundFX } from './SoundFX';
import HologramCanvas from './HologramCanvas';

export default function MissionScreen({ isActive, onAccept, onOpenModal }) {
  const handleAccept = () => {
    SoundFX.playClick();
    onAccept();
  };

  // Keyboard accessibility: Press Enter or Space to Accept Mission
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
        {/* Top Classified Mission Badge */}
        <div className="mission-badge-strip">
          <span className="mission-status-dot"></span>
          <span className="mission-tag">CLASSIFIED MISSION BRIEFING // LEVEL-9 CLEARANCE</span>
        </div>

        {/* Hero Title */}
        <h1 className="mission-title">
          HARSHIT <span className="text-glow">SHARMA</span>
        </h1>

        <div className="mission-sub">
          ARTIFICIAL INTELLIGENCE &bull; MACHINE LEARNING &bull; SYSTEMS ENGINEERING &bull; USAR (GGSIPU)
        </div>

        {/* Centerpiece 3D Interactive Hologram */}
        <div className="mission-holo-center">
          <HologramCanvas isActive={isActive} />
        </div>

        {/* Centered Operational Directive Glass Pod */}
        <div className="mission-directive-card">
          <span className="corner tl"></span>
          <span className="corner tr"></span>
          <span className="corner bl"></span>
          <span className="corner br"></span>

          <div className="directive-header">
            <div className="directive-title-row">
              <span className="directive-icon">🎯</span>
              <span className="directive-title">OPERATIONAL DIRECTIVE</span>
            </div>
            <span className="directive-telemetry-chip">8 AI UNIVERSES READY</span>
          </div>

          <p className="mission-desc">
            Your directive: <span className="highlight">infiltrate the engineering multiverse</span> of Harshit Sharma. Explore autonomous tree agents (<span className="tag-inline">Yggdrasil Bot</span>), LLM sandboxes (<span className="tag-inline">Resilient</span>), real-time valuation models (<span className="tag-inline">Used Bike ML</span>), and WebGL engines.
          </p>

          <button
            type="button"
            className="accept-btn"
            onClick={handleAccept}
            onMouseEnter={() => SoundFX.playHover('primary')}
          >
            <span className="corner tl"></span>
            <span className="corner tr"></span>
            <span className="corner bl"></span>
            <span className="corner br"></span>
            <span className="accept-arrow">▶</span>
            <span>ACCEPT MISSION &amp; ENTER MULTIVERSE</span>
          </button>

          <div className="mission-key-hint">
            <span className="hint-bracket">[</span> PRESS <span className="key-badge">SPACE</span> OR <span className="key-badge">ENTER</span> TO ENGAGE <span className="hint-bracket">]</span>
          </div>
        </div>
      </div>
    </div>
  );
}
