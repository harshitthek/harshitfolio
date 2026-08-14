import React, { useEffect, useState } from 'react';
import { SoundFX } from './SoundFX';
import HologramCanvas from './HologramCanvas';

export default function MissionScreen({ isActive, onAccept, onOpenModal }) {
  const [liveEntropy, setLiveEntropy] = useState('0.942');

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

  // Subtle live telemetry pulse for ambient HUD
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      const entropy = (0.935 + Math.random() * 0.015).toFixed(3);
      setLiveEntropy(entropy);
    }, 1200);
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div id="s-mission" className={`screen ${isActive ? 'active' : ''}`}>
      <div className="corner-dec tl"></div>
      <div className="corner-dec tr"></div>
      <div className="corner-dec bl"></div>
      <div className="corner-dec br"></div>

      {/* Left Ambient Cyber HUD Telemetry Wing */}
      <aside className="mission-side-hud left-hud" aria-hidden="true">
        <div className="side-hud-card">
          <span className="corner tl"></span>
          <span className="corner tr"></span>
          <span className="corner bl"></span>
          <span className="corner br"></span>

          <div className="side-hud-header">
            <span className="hud-pulse-dot"></span>
            <span className="hud-title">SYSTEM TELEMETRY</span>
          </div>

          <div className="side-hud-list">
            <div className="side-hud-row">
              <span className="hud-k">NEURAL ENGINE</span>
              <span className="hud-v cyan">v2.4_ONLINE</span>
            </div>
            <div className="side-hud-row">
              <span className="hud-k">LATENCY</span>
              <span className="hud-v green">0.2 ms</span>
            </div>
            <div className="side-hud-row">
              <span className="hud-k">ENTROPY</span>
              <span className="hud-v">{liveEntropy} η</span>
            </div>
            <div className="side-hud-row">
              <span className="hud-k">AI PORTALS</span>
              <span className="hud-v green">8 MOUNTED</span>
            </div>
          </div>

          <div className="side-hud-waveform">
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
          </div>
        </div>
      </aside>

      {/* Center Hero Column */}
      <div className="mission-content-wrapper">
        {/* Minimalist Top Origin Tag */}
        <div className="mission-origin-tag">
          <span className="origin-dot"></span>
          <span>NEW DELHI &bull; USAR (GGSIPU) &bull; PORTFOLIO_V2</span>
        </div>

        {/* Massive Hero Name Header (Preserved Exactly) */}
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

        {/* Redesigned Cyber Command Capsule (Fixed Layout & Design) */}
        <div className="mission-command-capsule">
          <span className="corner tl"></span>
          <span className="corner tr"></span>
          <span className="corner bl"></span>
          <span className="corner br"></span>

          {/* Capsule Header Bar */}
          <div className="capsule-top-bar">
            <div className="capsule-bar-left">
              <span className="capsule-beacon-dot"></span>
              <span className="capsule-title">CREATOR DIRECTIVE</span>
            </div>
            <span className="capsule-status-pill">STATUS: READY</span>
          </div>

          {/* Authentic Statement Body */}
          <p className="capsule-narrative">
            Driven by curiosity and a passion for turning complex ideas into <span className="text-highlight">intelligent, living systems</span>. Step inside to explore my engineering mindset, research archives, and multiverse.
          </p>

          {/* Primary Magnetic CTA Button */}
          <button
            type="button"
            className="capsule-cta-btn"
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

      {/* Right Ambient Cyber HUD Telemetry Wing */}
      <aside className="mission-side-hud right-hud" aria-hidden="true">
        <div className="side-hud-card">
          <span className="corner tl"></span>
          <span className="corner tr"></span>
          <span className="corner bl"></span>
          <span className="corner br"></span>

          <div className="side-hud-header">
            <span className="hud-pulse-dot cyan"></span>
            <span className="hud-title">GEOLOCATION MATRIX</span>
          </div>

          <div className="side-hud-list">
            <div className="side-hud-row">
              <span className="hud-k">LOCATION</span>
              <span className="hud-v">NEW DELHI, IN</span>
            </div>
            <div className="side-hud-row">
              <span className="hud-k">COORDINATES</span>
              <span className="hud-v cyan">28.61° N, 77.20° E</span>
            </div>
            <div className="side-hud-row">
              <span className="hud-k">INSTITUTION</span>
              <span className="hud-v">USAR (GGSIPU)</span>
            </div>
            <div className="side-hud-row">
              <span className="hud-k">CLEARANCE</span>
              <span className="hud-v green">LEVEL-9_AUTH</span>
            </div>
          </div>

          <div className="side-hud-reticle">
            <span className="reticle-ring"></span>
            <span className="reticle-cross"></span>
            <span className="reticle-dot"></span>
          </div>
        </div>
      </aside>
    </div>
  );
}
