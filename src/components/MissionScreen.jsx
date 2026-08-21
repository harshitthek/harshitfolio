import { useCallback, useEffect, useState } from 'react';
import CyberTerminalWing from './CyberTerminalWing';
import HologramCanvas from './HologramCanvas';
import QuantumLaboratoryWing from './QuantumLaboratoryWing';
import { SoundFX } from './SoundFX';

export default function MissionScreen({ isActive, onAccept, _onOpenModal }) {
  const [explosionCount, setExplosionCount] = useState(0);
  const [pixarKey, setPixarKey] = useState(0);

  useEffect(() => {
    if (isActive) {
      setPixarKey((prev) => prev + 1);
    }
  }, [isActive]);

  const replayPixar = () => {
    SoundFX.playChirp();
    setPixarKey((prev) => prev + 1);
  };

  const handleAccept = useCallback(() => {
    SoundFX.playClick();
    onAccept();
  }, [onAccept]);

  const triggerHologramExplosion = () => {
    setExplosionCount((prev) => prev + 1);
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
  }, [isActive, handleAccept]);

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
            <span className="hero-word-main">HARS</span>
            <span key={`h-${pixarKey}`} className="pixar-adjacent-letter pixar-letter-h">
              H
            </span>
            <span
              key={pixarKey}
              className="pixar-i-layer"
              role="button"
              tabIndex={0}
              onClick={replayPixar}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  replayPixar();
                }
              }}
              title="Click to replay Pixar stomp!"
            >
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

                    {/* Parabolic White Reflector Interior */}
                    <radialGradient id="luxoInnerReflector" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="35%" stopColor="#e2e8f0" />
                      <stop offset="70%" stopColor="#1e293b" />
                      <stop offset="100%" stopColor="#38bdf8" />
                    </radialGradient>

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
                      <stop offset="40%" stopColor="#00ff88" stopOpacity="0.8" />
                      <stop offset="80%" stopColor="#38bdf8" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Forward Volumetric Spotlight Beam */}
                  <polygon className="luxo-spotlight-cone" points="34,30 66,30 130,130 -30,130" />

                  {/* Luxo Jr. Articulated Lamp Body */}
                  <g className="luxo-body-group">
                    {/* Brushed Metallic Weighted Base Plate */}
                    <path
                      className="luxo-base"
                      d="M26,112 C26,105 74,105 74,112 L78,116 L22,116 Z"
                      fill="url(#luxoMetallicBase)"
                      stroke="#38bdf8"
                      strokeWidth="1.8"
                      filter="drop-shadow(0 0 5px rgba(56,189,248,0.6))"
                    />
                    <ellipse
                      cx="50"
                      cy="107"
                      rx="7"
                      ry="2.8"
                      fill="#0f172a"
                      stroke="#00ff88"
                      strokeWidth="1.2"
                    />
                    <circle cx="50" cy="107" r="2.2" fill="#38bdf8" />

                    {/* Lower High-Sheen Chrome Tubular Struts & External Tension Spring */}
                    <line
                      x1="45"
                      y1="106"
                      x2="35"
                      y2="66"
                      stroke="url(#luxoChromeTube)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <line
                      x1="55"
                      y1="106"
                      x2="45"
                      y2="66"
                      stroke="url(#luxoChromeTube)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <path
                      d="M48,98 Q38,87 47,76 Q38,67 44,58"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      opacity="0.95"
                    />

                    {/* Middle Radial Metallic Elbow Pivot Joint & Axis Pin */}
                    <circle
                      cx="40"
                      cy="66"
                      r="5.5"
                      fill="url(#luxoJointMetallic)"
                      stroke="#00ff88"
                      strokeWidth="1.8"
                    />
                    <circle cx="40" cy="66" r="2.2" fill="#38bdf8" />

                    {/* Upper High-Sheen Chrome Tubular Struts */}
                    <line
                      x1="40"
                      y1="66"
                      x2="50"
                      y2="30"
                      stroke="url(#luxoChromeTube)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <line
                      x1="42"
                      y1="63"
                      x2="52"
                      y2="27"
                      stroke="url(#luxoChromeTube)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* 1. Side Profile Head (Jac Jacobsen L-1 Flared Bell Shade) */}
                    <g className="luxo-side-head">
                      <rect
                        x="46"
                        y="21"
                        width="11"
                        height="11"
                        rx="2.5"
                        fill="url(#luxoMetallicShade)"
                        stroke="#38bdf8"
                        strokeWidth="1.4"
                      />
                      <rect x="55" y="24" width="2.5" height="3.5" rx="1" fill="#38bdf8" />
                      <circle
                        cx="51"
                        cy="30"
                        r="4.2"
                        fill="url(#luxoJointMetallic)"
                        stroke="#38bdf8"
                        strokeWidth="1.4"
                      />
                      {/* Flared Bell Lampshade */}
                      <path
                        d="M50,27 C46,14 34,10 16,16 C25,35 38,43 53,33 Z"
                        fill="url(#luxoMetallicShade)"
                        stroke="#00ff88"
                        strokeWidth="2.2"
                        filter="drop-shadow(0 0 12px rgba(0,255,136,0.85))"
                      />
                      {/* Rolled Chrome Bezel Lip */}
                      <ellipse
                        cx="16"
                        cy="16"
                        rx="4.5"
                        ry="9.5"
                        transform="rotate(-30 16 16)"
                        fill="#0f172a"
                        stroke="url(#luxoBezelChrome)"
                        strokeWidth="2"
                      />
                      {/* Frosted Incandescent Bulb */}
                      <circle
                        cx="17"
                        cy="16"
                        r="4.2"
                        fill="#ffffff"
                        filter="drop-shadow(0 0 14px #ffffff)"
                      />
                    </g>

                    {/* 2. Front-Facing Head Aperture (Stepped White Reflector Aperture) */}
                    <g className="luxo-front-head">
                      <ellipse
                        cx="50"
                        cy="12"
                        rx="8.5"
                        ry="3.8"
                        fill="url(#luxoMetallicShade)"
                        stroke="#38bdf8"
                        strokeWidth="1.4"
                      />
                      <circle
                        cx="50"
                        cy="30"
                        r="4.2"
                        fill="url(#luxoJointMetallic)"
                        stroke="#38bdf8"
                        strokeWidth="1.4"
                      />
                      {/* Concentric Brushed Titanium Bell Shade facing camera */}
                      <circle
                        cx="50"
                        cy="30"
                        r="17"
                        fill="url(#luxoMetallicShade)"
                        stroke="#00ff88"
                        strokeWidth="2.6"
                        filter="drop-shadow(0 0 16px rgba(0,255,136,0.95))"
                      />
                      <circle
                        cx="50"
                        cy="30"
                        r="12"
                        fill="url(#luxoInnerReflector)"
                        stroke="#38bdf8"
                        strokeWidth="1.5"
                      />
                      {/* Glowing Bulb Core */}
                      <circle className="luxo-bulb" cx="50" cy="30" r="5.5" />
                      <circle cx="50" cy="30" r="24" fill="url(#luxoBulbGlow)" opacity="0.9" />
                    </g>
                  </g>
                </svg>
              </span>
            </span>
            <span key={`t-${pixarKey}`} className="pixar-adjacent-letter pixar-letter-t">
              T
            </span>{' '}
            <span className="hero-name-glow">SHARMA</span>
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
              <span className="welcome-title">ACCESS GRANTED {/* PORTAL READY */}</span>
            </div>
            <span className="welcome-status-badge">CLEARANCE: LEVEL-9</span>
          </div>

          {/* Authentic, Intriguing Welcome Quote */}
          <p className="welcome-quote">
            “Step past the digital boundary. Welcome to my creative sandbox, my thoughts, and the
            multiverses I've brought to life. Take your time and explore.”
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
            <svg className="cta-svg-arrow" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <span className="cta-text">ENTER THE MULTIVERSE</span>
          </button>

          <div className="mission-key-hint">
            <span className="hint-bracket">[</span> PRESS <span className="key-badge">SPACE</span>{' '}
            OR <span className="key-badge">ENTER</span> TO ENGAGE{' '}
            <span className="hint-bracket">]</span>
          </div>
        </div>
      </div>

      {/* Right Flank: Interactive Quantum Sound & Neural Laboratory (Boom Trigger) */}
      <QuantumLaboratoryWing isActive={isActive} onExplode={triggerHologramExplosion} />
    </div>
  );
}
