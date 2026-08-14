import React, { useState, useEffect, useRef } from 'react';
import { SoundFX } from './SoundFX';

export default function QuantumLaboratoryWing({ isActive }) {
  const [fluxLevel, setFluxLevel] = useState(88);
  const [overclockActive, setOverclockActive] = useState(false);
  const [activeAction, setActiveAction] = useState('STANDBY');

  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleOverclock = () => {
    SoundFX.playChirp();
    setOverclockActive(true);
    setActiveAction('⚡ OVERCLOCKED');
    setFluxLevel(100);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setOverclockActive(false);
      setActiveAction('STANDBY');
    }, 1800);
  };

  const handleSynthPulse = () => {
    SoundFX.playTone(520, 'sine', 0.25);
    setActiveAction('🔊 SYNTH_PULSE');

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setActiveAction('STANDBY'), 1200);
  };

  const handleWarp = () => {
    SoundFX.playLaser();
    setActiveAction('🌌 WARP_BURST');

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setActiveAction('STANDBY'), 1400);
  };

  const calculatedTflops = ((fluxLevel / 100) * 4.2).toFixed(2);
  const calculatedTemp = (32 + (fluxLevel / 100) * 16).toFixed(0);

  return (
    <aside className="cyber-flank-lab right-flank" aria-label="Quantum Laboratory Controls">
      <div className={`lab-window ${overclockActive ? 'overclocked' : ''}`} role="region" aria-label="Laboratory Controller">
        <span className="corner tl"></span>
        <span className="corner tr"></span>
        <span className="corner bl"></span>
        <span className="corner br"></span>

        {/* Laboratory Titlebar */}
        <div className="lab-titlebar">
          <div className="lab-title-left">
            <span className="lab-pulse-dot"></span>
            <span className="lab-title">QUANTUM LAB // CONTROLLER</span>
          </div>
          <span className="lab-status-badge">{activeAction}</span>
        </div>

        {/* Live Interactive Flux Slider Control */}
        <div className="lab-slider-section">
          <div className="slider-header-row">
            <span className="slider-label">NEURAL FLUX:</span>
            <span className="slider-val cyan">{fluxLevel}% // {calculatedTflops} TFLOPS</span>
          </div>
          <input
            type="range"
            min="20"
            max="100"
            value={fluxLevel}
            onChange={(e) => {
              setFluxLevel(Number(e.target.value));
              SoundFX.playHover('soft');
            }}
            className="lab-range-slider"
            aria-label="Neural Flux Slider"
          />
        </div>

        {/* Live Equalizer Visualizer reacting to Flux */}
        <div className="lab-eq-strip" aria-hidden="true">
          {Array.from({ length: 10 }).map((_, idx) => (
            <span
              key={idx}
              className="lab-eq-bar"
              style={{
                height: `${Math.min(100, (fluxLevel / 100) * (30 + (idx % 4) * 22))}%`,
                animationDuration: `${Math.max(0.4, 1.8 - (fluxLevel / 100))}s`
              }}
            />
          ))}
        </div>

        {/* Interactive Action Trigger Buttons */}
        <div className="lab-actions-grid">
          <button
            type="button"
            className="lab-btn primary"
            onClick={handleOverclock}
            onMouseEnter={() => SoundFX.playHover('primary')}
            aria-label="Overclock neural core"
          >
            ⚡ OVERCLOCK
          </button>
          <button
            type="button"
            className="lab-btn secondary"
            onClick={handleSynthPulse}
            onMouseEnter={() => SoundFX.playHover('soft')}
            aria-label="Trigger synth audio pulse"
          >
            🔊 SYNTH PULSE
          </button>
          <button
            type="button"
            className="lab-btn tertiary"
            onClick={handleWarp}
            onMouseEnter={() => SoundFX.playHover('soft')}
            aria-label="Trigger warp particle burst"
          >
            🌌 WARP BURST
          </button>
        </div>

        {/* Live Lab Diagnostics Telemetry */}
        <div className="lab-telemetry-row">
          <span className="lab-stat">TEMP: {calculatedTemp}°C</span>
          <span className="lab-stat cyan">VOLT: 1.18V</span>
          <span className="lab-stat green">STATUS: OPTIMAL</span>
        </div>
      </div>
    </aside>
  );
}
