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
                    <linearGradient id="luxoSpotlightGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                      <stop offset="25%" stopColor="#00ff88" stopOpacity="0.5" />
                      <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
                    </linearGradient>
                    <radialGradient id="luxoBulbGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                      <stop offset="35%" stopColor="#00ff88" stopOpacity="0.7" />
                      <stop offset="75%" stopColor="#38bdf8" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  
                  {/* Forward Volumetric Spotlight Beam */}
                  <polygon className="luxo-spotlight-cone" points="38,30 62,30 115,130 -15,130" />
                  
                  {/* Luxo Jr. Articulated Lamp Body */}
                  <g className="luxo-body-group">
                    {/* Stepped Weighted Base */}
                    <path className="luxo-base" d="M22,112 C22,105 78,105 78,112 L82,116 L18,116 Z" />
                    <ellipse className="luxo-base-rim" cx="50" cy="116" rx="28" ry="3" />
                    <circle className="luxo-joint" cx="50" cy="107" r="4.5" />
                    
                    {/* Lower Articulated Parallel Arm Struts & Tension Spring */}
                    <line className="luxo-strut" x1="45" y1="107" x2="35" y2="68" />
                    <line className="luxo-strut" x1="55" y1="107" x2="45" y2="68" />
                    <path d="M47,100 Q39,85 47,72" fill="none" stroke="#38bdf8" strokeWidth="1.6" opacity="0.9" />
                    
                    {/* Middle Elbow Pivot Joint */}
                    <circle className="luxo-joint" cx="40" cy="68" r="6" />
                    <circle className="luxo-joint-core" cx="40" cy="68" r="2.5" />
                    
                    {/* Upper Arm Struts */}
                    <line className="luxo-strut" x1="40" y1="68" x2="50" y2="34" />
                    <line className="luxo-strut" x1="42" y1="65" x2="52" y2="31" />
                    <path d="M43,62 Q49,49 43,36" fill="none" stroke="#38bdf8" strokeWidth="1.4" opacity="0.85" />
                    
                    {/* 1. Side Profile Head (Active during hops & stomps) */}
                    <g className="luxo-side-head">
                      <circle className="luxo-joint" cx="52" cy="34" r="4.5" />
                      <circle className="luxo-joint-core" cx="52" cy="34" r="2" />
                      {/* Bell Shade Silhouette */}
                      <path className="luxo-shade" d="M48,34 C44,18 34,14 20,20 C30,36 42,44 56,38 Z" />
                      <ellipse cx="21" cy="21" rx="4" ry="8" transform="rotate(-30 21 21)" fill="#0f172a" stroke="#00ff88" strokeWidth="1.4" />
                      <ellipse className="luxo-bulb" cx="22" cy="21" rx="3.8" ry="3.8" />
                    </g>
                    
                    {/* 2. Front-Facing Head Aperture (Swivels to face viewer directly at the end!) */}
                    <g className="luxo-front-head">
                      <circle className="luxo-joint" cx="50" cy="30" r="5" />
                      {/* Concentric Bell Shade Aperture facing camera */}
                      <ellipse cx="50" cy="30" rx="15" ry="15" fill="#0f172a" stroke="#00ff88" strokeWidth="2.2" />
                      <circle cx="50" cy="30" r="10.5" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.6" />
                      {/* Brilliant White-Hot Glowing Bulb */}
                      <circle className="luxo-bulb" cx="50" cy="30" r="5.5" />
                      <circle cx="50" cy="30" r="22" fill="url(#luxoBulbGlow)" opacity="0.85" />
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
