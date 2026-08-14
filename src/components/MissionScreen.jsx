import React from 'react';
import { SoundFX } from './SoundFX';
import HologramCanvas from './HologramCanvas';

export default function MissionScreen({ isActive, onAccept, onOpenModal }) {
  const handleAccept = () => {
    SoundFX.playClick();
    onAccept();
  };

  return (
    <div id="s-mission" className={`screen ${isActive ? 'active' : ''}`}>
      <div className="corner-dec tl"></div>
      <div className="corner-dec tr"></div>
      <div className="corner-dec bl"></div>
      <div className="corner-dec br"></div>

      <div className="mission-content-wrapper">
        <div className="mission-badge-strip">
          <span className="mission-status-dot"></span>
          <span className="mission-tag">▶ INCOMING CLASSIFIED MISSION // AGENT_ID: HS-01</span>
        </div>

        <h1 className="mission-title">HARSHIT'S<br />PORTFOLIO</h1>
        <div className="mission-sub">CLASSIFIED · ARTIFICIAL INTELLIGENCE · SYSTEMS ENGINEERING</div>

        {/* 3D Wireframe Quantum Core */}
        <HologramCanvas isActive={isActive} />

        {/* Operational Directive Card */}
        <div className="mission-directive-card">
          <div className="directive-header">
            <span>🎯 OPERATIONAL DIRECTIVE</span>
            <span>// AUTHORIZED BY USAR-DELHI</span>
          </div>
          <p className="mission-desc">
            Your directive: <span className="highlight">explore the digital universe</span> of Harshit Sharma (USAR, GGSIPU, New Delhi).<br />
            <span className="highlight">8 flagship engineering portals</span> await — from autonomous AI tree agents (<span className="tag-inline">Yggdrasil Bot</span>) and sandbox benchmarks (<span className="tag-inline">Resilient</span>) to real-time machine learning valuation (<span className="tag-inline">Used Bike ML</span>) and 3D WebGL physics engines.<br />
            Choose your destination. Proceed with curiosity.
          </p>

          <button
            className="accept-btn"
            onClick={handleAccept}
            onMouseEnter={() => SoundFX.playHover()}
          >
            <span className="corner tl"></span>
            <span className="corner tr"></span>
            <span className="corner bl"></span>
            <span className="corner br"></span>
            ▶ ACCEPT MISSION
          </button>
        </div>
      </div>
    </div>
  );
}
