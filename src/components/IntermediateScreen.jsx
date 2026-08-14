import React, { useState, useEffect, useRef } from 'react';
import { SoundFX } from './SoundFX';

const TELEMETRY_STEPS = [
  { time: '0.1s', text: 'INITIALIZING NEURAL UPLINK // 10.0 Gbps', status: 'OK' },
  { time: '0.6s', text: 'AGENT IDENTITY VERIFIED: HARSHIT SHARMA [USAR_DELHI]', status: 'AUTH' },
  { time: '1.2s', text: 'DECRYPTING CLASSIFIED PORTFOLIO DATABASE [LEVEL-9]', status: 'DONE' },
  { time: '1.8s', text: 'INITIALIZING 8 MULTIVERSE PORTALS // ALL SYSTEMS GO', status: 'READY' }
];

export default function IntermediateScreen({ isActive }) {
  const [progress, setProgress] = useState(0);
  const [hexCode, setHexCode] = useState('0x7F...9A');
  const [logIndex, setLogIndex] = useState(0);
  const animIntervalRef = useRef(null);

  useEffect(() => {
    if (!isActive) {
      setProgress(0);
      setLogIndex(0);
      if (animIntervalRef.current) clearInterval(animIntervalRef.current);
      return;
    }

    // Play initial data chirp
    if (SoundFX.isEnabled()) {
      SoundFX.playDeploy();
    }

    const startTime = Date.now();
    const duration = 2400; // Matches transition duration in App.jsx

    animIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentPct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(currentPct);

      // Random cycling hex hash
      const randomHex = '0x' + Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase().padStart(6, '0');
      setHexCode(randomHex);

      // Update telemetry log steps
      if (elapsed > 400 && elapsed <= 900) setLogIndex(1);
      else if (elapsed > 900 && elapsed <= 1600) setLogIndex(2);
      else if (elapsed > 1600) setLogIndex(3);

      if (currentPct >= 100) {
        clearInterval(animIntervalRef.current);
      }
    }, 45);

    return () => {
      if (animIntervalRef.current) clearInterval(animIntervalRef.current);
    };
  }, [isActive]);

  return (
    <div id="s-intermediate" className={`screen ${isActive ? 'active' : ''}`}>
      <div className="load-grid"></div>
      <div className="load-vignette"></div>

      <div className="corner-dec tl"></div>
      <div className="corner-dec tr"></div>
      <div className="corner-dec bl"></div>
      <div className="corner-dec br"></div>

      <div className="load-content">
        {/* Top Status Pill */}
        <div className="intermediate-badge">
          <span className="badge-pulse-dot"></span>
          <span>NEURAL HANDSHAKE IN PROGRESS // DECRYPTING DATASTREAM</span>
        </div>

        {/* Glitch Glyph */}
        <div className="load-glyph" data-text="INITIALIZING">
          INITIALIZING
        </div>

        {/* Dual Neon Counter-Rotating Spinner HUD */}
        <div className="intermediate-spinner-hud">
          <div className="load-ring"></div>
          <div className="spinner-center-pct">
            <span className="pct-num">{progress}</span>
            <span className="pct-symbol">%</span>
          </div>
        </div>

        {/* Live Hex Stream & Progress Bar Track */}
        <div className="intermediate-progress-container">
          <div className="progress-info-row">
            <span className="progress-label">CRYPTOGRAPHIC_DECRYPTION:</span>
            <span className="progress-hex">{hexCode}</span>
          </div>

          <div className="intermediate-progress-track">
            <div
              className="intermediate-progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Streaming Neural Telemetry Logs */}
        <div className="intermediate-telemetry-box">
          {TELEMETRY_STEPS.slice(0, logIndex + 1).map((step, idx) => (
            <div key={idx} className="telemetry-log-row">
              <span className="log-time">[{step.time}]</span>
              <span className="log-arrow">&gt;&gt;</span>
              <span className="log-text">{step.text}</span>
              <span className={`log-status ${step.status.toLowerCase()}`}>
                [{step.status}]
              </span>
            </div>
          ))}
        </div>

        <div className="load-sublabel">
          AUTHENTICATED AGENT: HARSHIT SHARMA &bull; ARTIFICIAL INTELLIGENCE &bull; USAR (GGSIPU)
        </div>
      </div>
    </div>
  );
}
