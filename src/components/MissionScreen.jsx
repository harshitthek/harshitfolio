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
          <span className="mission-tag">ENGINEER DOSSIER // HS-01</span>
        </div>

        {/* Grand Hero Name */}
        <h1 className="mission-hero-name">
          HARSHIT <span className="hero-name-glow">SHARMA</span>
        </h1>

        {/* Subtitle Credential Pills */}
        <div className="mission-creds-strip">
          <span className="cred-pill primary">B.TECH AI &amp; ML</span>
          <span className="cred-pill">USAR (GGSIPU), NEW DELHI</span>
          <span className="cred-pill cyan">AI &amp; SYSTEMS ARCHITECT</span>
        </div>

        {/* Centerpiece 3D Interactive Hologram */}
        <div className="mission-holo-center">
          <HologramCanvas isActive={isActive} />
        </div>

        {/* Redesigned About Me & Dossier Card */}
        <div className="mission-directive-card">
          <span className="corner tl"></span>
          <span className="corner tr"></span>
          <span className="corner bl"></span>
          <span className="corner br"></span>

          {/* Card Top Header */}
          <div className="directive-top-bar">
            <div className="directive-bar-left">
              <span className="directive-pulse-dot"></span>
              <span className="directive-heading">ABOUT ME &amp; ENGINEERING PROFILE</span>
            </div>
            <div className="directive-bar-right">
              <span className="directive-level-badge">SPECIALIZATION: AI &amp; ML</span>
            </div>
          </div>

          {/* 3-Column Profile Pillars */}
          <div className="directive-grid-mini">
            <div className="mini-stat-card">
              <span className="stat-code">01 // CORE FOCUS</span>
              <span className="stat-val">Agentic AI &amp; Neural Nets</span>
            </div>
            <div className="mini-stat-card">
              <span className="stat-code">02 // ACADEMICS</span>
              <span className="stat-val">USAR (GGSIPU), Delhi</span>
            </div>
            <div className="mini-stat-card">
              <span className="stat-code">03 // PHILOSOPHY</span>
              <span className="stat-val">Intelligent Scalable Code</span>
            </div>
          </div>

          {/* About Me Narrative */}
          <p className="mission-brief-text">
            I am an Artificial Intelligence &amp; Machine Learning engineer based in New Delhi, obsessed with building autonomous systems, deep learning architectures, and high-performance interactive software. Step inside to explore my engineering mindset and multiverse.
          </p>

          {/* Primary Action Button */}
          <button
            type="button"
            className="accept-mission-cta"
            onClick={handleAccept}
            onMouseEnter={() => SoundFX.playHover('primary')}
          >
            <span className="corner tl"></span>
            <span className="corner tr"></span>
            <span className="corner bl"></span>
            <span className="corner br"></span>
            <span className="cta-icon">▶</span>
            <span className="cta-text">ENTER HARSHIT'S MULTIVERSE</span>
          </button>

          <div className="mission-key-hint">
            <span className="hint-bracket">[</span> PRESS <span className="key-badge">SPACE</span> OR <span className="key-badge">ENTER</span> TO PROCEED <span className="hint-bracket">]</span>
          </div>
        </div>
      </div>
    </div>
  );
}
