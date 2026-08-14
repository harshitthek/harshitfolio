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
        {/* Top Header Row */}
        <header className="mission-top-header">
          <div className="mission-badge-strip">
            <span className="mission-status-dot"></span>
            <span className="mission-tag">INCOMING CLASSIFIED MISSION // AGENT_ID: HS-01</span>
          </div>

          <h1 className="mission-title">
            HARSHIT<span className="text-glow">.EXE</span> PORTFOLIO
          </h1>

          <div className="mission-sub">
            CLASSIFIED &bull; ARTIFICIAL INTELLIGENCE &bull; SYSTEMS ENGINEERING &bull; USAR (GGSIPU)
          </div>
        </header>

        {/* 2-Column Split Cockpit Layout (Fits in 100vh without scrolling) */}
        <div className="mission-body-grid">
          {/* Left Column: 3D Hologram */}
          <div className="mission-left-col">
            <div className="holo-pod-wrapper">
              <span className="corner tl"></span>
              <span className="corner tr"></span>
              <span className="corner bl"></span>
              <span className="corner br"></span>
              <HologramCanvas isActive={isActive} />
            </div>
          </div>

          {/* Right Column: Operational Directive & Action */}
          <div className="mission-right-col">
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
                <span className="directive-clearance">// LEVEL-9 CLEARANCE</span>
              </div>

              {/* Quick Telemetry Status Badges */}
              <div className="directive-telemetry-row">
                <span className="telemetry-chip">
                  <span className="chip-dot ok"></span>
                  <span>SYSTEM: ONLINE</span>
                </span>
                <span className="telemetry-chip">
                  <span className="chip-dot info"></span>
                  <span>8 PORTALS MOUNTED</span>
                </span>
                <span className="telemetry-chip">
                  <span className="chip-dot glow"></span>
                  <span>USAR_DELHI</span>
                </span>
              </div>

              <p className="mission-desc">
                Your directive: <span className="highlight">explore the engineering universe</span> of <span className="highlight">Harshit Sharma</span>.<br />
                <span className="highlight">8 flagship AI portals</span> await — from autonomous tree agents (<span className="tag-inline">Yggdrasil Bot</span>) and AI sandboxes (<span className="tag-inline">Resilient</span>) to real-time valuation models (<span className="tag-inline">Used Bike ML</span>) and WebGL simulations.
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
      </div>
    </div>
  );
}
