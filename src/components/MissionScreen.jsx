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
                    {/* High-Sheen Cylindrical Chrome Strut Gradient */}
                    <linearGradient id="luxoChromeTube" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#64748b" />
                      <stop offset="25%" stopColor="#ffffff" />
                      <stop offset="60%" stopColor="#cbd5e1" />
                      <stop offset="85%" stopColor="#94a3b8" />
                      <stop offset="100%" stopColor="#334155" />
                    </linearGradient>
                    
                    {/* Brushed Titanium & Metallic Anthracite Gradient */}
                    <linearGradient id="luxoMetallicShade" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#475569" />
                      <stop offset="22%" stopColor="#94a3b8" />
                      <stop offset="45%" stopColor="#1e293b" />
                      <stop offset="75%" stopColor="#334155" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                    
                    {/* Heavy Brushed Cast-Metallic Base Gradient */}
                    <linearGradient id="luxoMetallicBase" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#1e293b" />
                      <stop offset="20%" stopColor="#64748b" />
                      <stop offset="48%" stopColor="#f8fafc" />
                      <stop offset="75%" stopColor="#475569" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                    
                    {/* Polished Radial Metallic Joint Gradient */}
                    <radialGradient id="luxoJointMetallic" cx="35%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#f8fafc" />
                      <stop offset="40%" stopColor="#64748b" />
                      <stop offset="80%" stopColor="#1e293b" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </radialGradient>
                    
                    {/* Bezel Lip Specular Gradient */}
                    <linearGradient id="luxoBezelChrome" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="45%" stopColor="#94a3b8" />
                      <stop offset="75%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#ffffff" />
                    </linearGradient>
                    
                    {/* Forward Spotlight Volumetric Beam */}
                    <linearGradient id="luxoSpotlightGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                      <stop offset="25%" stopColor="#00ff88" stopOpacity="0.5" />
                      <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
                    </linearGradient>
                    
                    {/* Radiant Bulb Glow */}
                    <radialGradient id="luxoBulbGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                      <stop offset="40%" stopColor="#00ff88" stopOpacity="0.75" />
                      <stop offset="80%" stopColor="#38bdf8" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  
                  {/* Forward Volumetric Spotlight Beam */}
                  <polygon className="luxo-spotlight-cone" points="36,30 64,30 115,130 -15,130" />
                  
                  {/* Luxo Jr. Articulated Lamp Body */}
                  <g className="luxo-body-group">
                    {/* Brushed Metallic Weighted Base Plate */}
                    <path className="luxo-base" d="M22,112 C22,106 78,106 78,112 L82,116 L18,116 Z" fill="url(#luxoMetallicBase)" stroke="#38bdf8" strokeWidth="1.8" filter="drop-shadow(0 0 5px rgba(56,189,248,0.6))" />
                    <ellipse cx="50" cy="108" rx="8" ry="3" fill="#0f172a" stroke="#00ff88" strokeWidth="1.2" />
                    <circle cx="50" cy="108" r="2.5" fill="#38bdf8" />
                    
                    {/* Lower High-Sheen Chrome Tubular Struts */}
                    <line x1="45" y1="108" x2="35" y2="70" stroke="url(#luxoChromeTube)" strokeWidth="3.2" strokeLinecap="round" />
                    <line x1="55" y1="108" x2="45" y2="70" stroke="url(#luxoChromeTube)" strokeWidth="3.2" strokeLinecap="round" />
                    
                    {/* Middle Radial Metallic Elbow Pivot Joint */}
                    <circle cx="40" cy="70" r="6" fill="url(#luxoJointMetallic)" stroke="#00ff88" strokeWidth="1.8" />
                    <circle cx="40" cy="70" r="2.5" fill="#38bdf8" />
                    
                    {/* Upper High-Sheen Chrome Tubular Struts */}
                    <line x1="40" y1="70" x2="52" y2="34" stroke="url(#luxoChromeTube)" strokeWidth="3.2" strokeLinecap="round" />
                    <line x1="42" y1="67" x2="54" y2="31" stroke="url(#luxoChromeTube)" strokeWidth="3.2" strokeLinecap="round" />
                    
                    {/* 1. Side Profile Head (Brushed Titanium Bell Shade) */}
                    <g className="luxo-side-head">
                      <rect x="46" y="24" width="12" height="12" rx="3" fill="url(#luxoMetallicShade)" stroke="#38bdf8" strokeWidth="1.4" />
                      <circle cx="52" cy="34" r="4.5" fill="url(#luxoJointMetallic)" stroke="#38bdf8" strokeWidth="1.5" />
                      {/* Brushed Titanium Bell Lampshade */}
                      <path d="M48,30 C44,16 32,12 14,18 C24,36 38,44 54,34 Z" fill="url(#luxoMetallicShade)" stroke="#00ff88" strokeWidth="2" filter="drop-shadow(0 0 10px rgba(0,255,136,0.75))" />
                      {/* Chrome Bezel Lip */}
                      <ellipse cx="16" cy="19" rx="4.5" ry="9" transform="rotate(-30 16 19)" fill="#0f172a" stroke="url(#luxoBezelChrome)" strokeWidth="1.8" />
                      {/* Incandescent Bulb */}
                      <circle cx="17" cy="19" r="4" fill="#ffffff" filter="drop-shadow(0 0 12px #ffffff)" />
                    </g>
                    
                    {/* 2. Front-Facing Head Aperture (Brushed Metallic Concentric Reflector) */}
                    <g className="luxo-front-head">
                      <ellipse cx="50" cy="14" rx="8" ry="4" fill="url(#luxoMetallicShade)" stroke="#38bdf8" strokeWidth="1.4" />
                      <circle cx="50" cy="30" r="4.5" fill="url(#luxoJointMetallic)" stroke="#38bdf8" strokeWidth="1.4" />
                      {/* Concentric Brushed Titanium Bell Shade facing camera */}
                      <circle cx="50" cy="30" r="16" fill="url(#luxoMetallicShade)" stroke="#00ff88" strokeWidth="2.6" filter="drop-shadow(0 0 14px rgba(0,255,136,0.85))" />
                      <circle cx="50" cy="30" r="11" fill="url(#luxoJointMetallic)" stroke="url(#luxoBezelChrome)" strokeWidth="1.6" />
                      {/* Glowing Bulb Core */}
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
