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

      {/* Left Floating Cyber HUD Spine: Engineering Mindset Nodes */}
      <aside className="mission-spine-rail left-spine" aria-hidden="true">
        <div className="spine-header">
          <span className="spine-dot green"></span>
          <span className="spine-title">ENGINEERING MINDSET</span>
        </div>

        <div className="spine-nodes-track">
          <div className="spine-track-line"></div>

          <div className="spine-node-item">
            <span className="node-bullet green">01</span>
            <div className="node-text-wrap">
              <span className="node-name">NEURAL AGENTS</span>
              <span className="node-desc">Autonomous decision trees &amp; LLM labs</span>
            </div>
          </div>

          <div className="spine-node-item">
            <span className="node-bullet cyan">02</span>
            <div className="node-text-wrap">
              <span className="node-name">SYSTEMS &amp; ML</span>
              <span className="node-desc">Predictive valuation &amp; scalable code</span>
            </div>
          </div>

          <div className="spine-node-item">
            <span className="node-bullet">03</span>
            <div className="node-text-wrap">
              <span className="node-name">INTERACTIVE WEBGL</span>
              <span className="node-desc">Dynamic simulations &amp; living UI</span>
            </div>
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

        {/* Rich, Structured Cyber Command Dossier Pod */}
        <div className="mission-dossier-pod">
          <span className="corner tl"></span>
          <span className="corner tr"></span>
          <span className="corner bl"></span>
          <span className="corner br"></span>

          {/* Pod Top Header Bar */}
          <div className="dossier-top-bar">
            <div className="dossier-bar-left">
              <span className="dossier-pulse-dot"></span>
              <span className="dossier-header-title">CREATOR BIOGRAPHY // AGENT_ID: HS-01</span>
            </div>
            <span className="dossier-clearance-badge">CLEARANCE: LEVEL-9 // DELHI, IN</span>
          </div>

          {/* Structured 2-Column Content Grid */}
          <div className="dossier-body-grid">
            {/* Left Quick Intel Column */}
            <div className="dossier-intel-col">
              <div className="intel-row">
                <span className="intel-label">IDENTITY:</span>
                <span className="intel-val">Harshit Sharma</span>
              </div>
              <div className="intel-row">
                <span className="intel-label">FOCUS:</span>
                <span className="intel-val cyan">Neural Nets &amp; AI Agents</span>
              </div>
              <div className="intel-row">
                <span className="intel-label">CAMPUS:</span>
                <span className="intel-val">USAR (GGSIPU), Delhi</span>
              </div>
            </div>

            {/* Right Narrative & Philosophy Column */}
            <div className="dossier-narrative-col">
              <p className="dossier-quote">
                “Fascinated by the mechanics of machine cognition, mathematical models, and interactive software. I engineer systems that think, learn, and push boundaries.”
              </p>
              <div className="dossier-tags-row">
                <span className="dossier-tag">#NeuralAgents</span>
                <span className="dossier-tag">#MachineLearning</span>
                <span className="dossier-tag">#InteractiveWebGL</span>
              </div>
            </div>
          </div>

          {/* Primary Magnetic CTA Button */}
          <button
            type="button"
            className="dossier-cta-btn"
            onClick={handleAccept}
            onMouseEnter={() => SoundFX.playHover('primary')}
          >
            <span className="corner tl"></span>
            <span className="corner tr"></span>
            <span className="corner bl"></span>
            <span className="corner br"></span>
            <span className="cta-icon">▶</span>
            <span className="cta-text">STEP INSIDE MY MULTIVERSE &amp; EXPLORE WORK</span>
          </button>

          <div className="mission-key-hint">
            <span className="hint-bracket">[</span> PRESS <span className="key-badge">SPACE</span> OR <span className="key-badge">ENTER</span> TO ENGAGE <span className="hint-bracket">]</span>
          </div>
        </div>
      </div>

      {/* Right Floating Cyber HUD Spine: Multiverse Expedition Sectors */}
      <aside className="mission-spine-rail right-spine" aria-hidden="true">
        <div className="spine-header">
          <span className="spine-dot cyan"></span>
          <span className="spine-title">MULTIVERSE EXPEDITION</span>
        </div>

        <div className="spine-nodes-track">
          <div className="spine-track-line"></div>

          <div className="spine-node-item">
            <span className="node-bullet green">P1</span>
            <div className="node-text-wrap">
              <span className="node-name">YGGDRASIL LAB</span>
              <span className="node-desc">Tree-structured autonomous bots</span>
            </div>
          </div>

          <div className="spine-node-item">
            <span className="node-bullet cyan">P2</span>
            <div className="node-text-wrap">
              <span className="node-name">RESILIENT &amp; BIKE ML</span>
              <span className="node-desc">Algorithmic valuation engines</span>
            </div>
          </div>

          <div className="spine-node-item">
            <span className="node-bullet">P3</span>
            <div className="node-text-wrap">
              <span className="node-name">3D CANVAS WORLDS</span>
              <span className="node-desc">Real-time graphic engines</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
