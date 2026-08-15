import React, { useState, useEffect } from 'react';
import { SoundFX } from './SoundFX';
import HologramCanvas from './HologramCanvas';
import CyberTerminalWing from './CyberTerminalWing';
import QuantumLaboratoryWing from './QuantumLaboratoryWing';

export default function MissionScreen({ isActive, onAccept, onOpenModal }) {
  const [explosionCount, setExplosionCount] = useState(0);
  const [pixarKey, setPixarKey] = useState(0);

  useEffect(() => {
    if (isActive) {
      setPixarKey(prev => prev + 1);
    }
  }, [isActive]);

  const replayPixar = () => {
    SoundFX.playChirp();
    setPixarKey(prev => prev + 1);
  };

  const handleAccept = () => {
    SoundFX.playClick();
    onAccept();
  };

  const triggerHologramExplosion = () => {
    setExplosionCount(prev => prev + 1);
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

      {/* Left Flank: Autonomous Autotyping Linux Cyber Terminal */}
      <CyberTerminalWing isActive={isActive} />

      {/* Center Hero Column */}
      <div className="mission-content-wrapper">
        {/* Minimalist Top Status Tag */}
        <div className="mission-origin-tag">
          <span className="origin-dot"></span>
          <span>ENTERING HARSHIT'S UNIVERSE &bull; SYSTEM_ONLINE &bull; PORTFOLIO_V2</span>
        </div>

        {/* Massive Hero Name Header (Preserved Exactly with Layered Pixar Animation) */}
        <div className="hero-name-container">
          <h1 className="mission-hero-name">
            HARSH<span key={pixarKey} className="pixar-i-layer" onClick={replayPixar} title="Click to replay Pixar stomp!">
              <span className="pixar-i-text">I</span>
              <span className="pixar-lamp-rig" aria-hidden="true">
                <svg className="luxo-lamp-svg" viewBox="0 0 100 120" fill="none">
                  <defs>
                    <linearGradient id="luxoSpotlightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                      <stop offset="25%" stopColor="#00ff88" stopOpacity="0.4" />
                      <stop offset="65%" stopColor="#38bdf8" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Forward Conical Spotlight Beam */}
                  <polygon className="luxo-spotlight-cone" points="24,23 -40,130 110,130" />
                  
                  {/* Luxo Jr. Articulated Lamp Body */}
                  <g className="luxo-body-group">
                    {/* Weighted Base Plate */}
                    <path className="luxo-base" d="M22,112 C22,106 78,106 78,112 L82,116 L18,116 Z" />
                    <ellipse className="luxo-base-rim" cx="50" cy="116" rx="28" ry="3" />
                    <circle className="luxo-joint" cx="50" cy="108" r="4.5" />
                    
                    {/* Lower Articulated Parallel Arm Struts & Tension Spring */}
                    <line className="luxo-strut" x1="45" y1="108" x2="35" y2="70" />
                    <line className="luxo-strut" x1="55" y1="108" x2="45" y2="70" />
                    <path d="M48,102 Q38,88 47,76" fill="none" stroke="#38bdf8" strokeWidth="1.4" opacity="0.85" />
                    
                    {/* Middle Elbow Pivot Joint */}
                    <circle className="luxo-joint" cx="40" cy="70" r="5.5" />
                    <circle className="luxo-joint-core" cx="40" cy="70" r="2.2" />
                    
                    {/* Upper Arm Struts */}
                    <line className="luxo-strut" x1="40" y1="70" x2="52" y2="34" />
                    <line className="luxo-strut" x1="42" y1="67" x2="54" y2="31" />
                    
                    {/* Articulated Head & Lampshade Group (Swivels to Viewer) */}
                    <g className="luxo-head-group">
                      <circle className="luxo-joint" cx="52" cy="34" r="4.5" />
                      <circle className="luxo-joint-core" cx="52" cy="34" r="2" />
                      {/* Iconic Bell Lampshade */}
                      <path className="luxo-shade" d="M48,34 C44,20 34,16 22,22 C32,36 44,44 56,38 Z" />
                      <ellipse cx="23" cy="23" rx="4" ry="7.5" transform="rotate(-30 23 23)" fill="#1e293b" stroke="#00ff88" strokeWidth="1.2" />
                      {/* Inner Glowing Bulb */}
                      <ellipse className="luxo-bulb" cx="24" cy="23" rx="4" ry="4" />
                    </g>
                  </g>
                </svg>
              </span>
            </span>T <span className="hero-name-glow">SHARMA</span>
          </h1>
          <div className="hero-sub-discipline">
            CREATOR &bull; THINKER &bull; MULTIVERSE ARCHITECT &bull; NEW DELHI
          </div>
        </div>

        {/* Centerpiece 3D 360-Degree Rotating Quantum Hologram (Explosion Reactive) */}
        <div className="mission-holo-center">
          <HologramCanvas isActive={isActive} explosionTrigger={explosionCount} />
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

          {/* Clean Personality & Vibe Badges (Zero Emojis) */}
          <div className="welcome-vibe-strip">
            <span className="vibe-pill">
              <span className="vibe-dot cyan"></span>
              CURIOSITY
            </span>
            <span className="vibe-pill">
              <span className="vibe-dot green"></span>
              CREATION
            </span>
            <span className="vibe-pill cyan">
              <span className="vibe-dot cyan"></span>
              MULTIVERSE
            </span>
            <span className="vibe-pill green">
              <span className="vibe-dot green"></span>
              EXPLORATION
            </span>
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
            <svg className="cta-svg-arrow" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            <span className="cta-text">ENTER THE MULTIVERSE</span>
          </button>

          <div className="mission-key-hint">
            <span className="hint-bracket">[</span> PRESS <span className="key-badge">SPACE</span> OR <span className="key-badge">ENTER</span> TO ENGAGE <span className="hint-bracket">]</span>
          </div>
        </div>
      </div>

      {/* Right Flank: Interactive Quantum Sound & Neural Laboratory (Boom Trigger) */}
      <QuantumLaboratoryWing isActive={isActive} onExplode={triggerHologramExplosion} />
    </div>
  );
}
