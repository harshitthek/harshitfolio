import { useEffect, useRef, useState } from 'react';
import { SoundFX } from './SoundFX';

const TELEMETRY_STEPS = [
  { time: '0.1s', text: 'INITIALIZING NEURAL UPLINK // 10.0 Gbps', status: 'OK' },
  { time: '0.5s', text: 'AGENT IDENTITY VERIFIED: HARSHIT SHARMA [SYS_AUTH]', status: 'AUTH' },
  { time: '1.0s', text: 'DECRYPTING CLASSIFIED PORTFOLIO DATABASE [LEVEL-9]', status: 'DONE' },
  { time: '1.6s', text: 'INITIALIZING 8 MULTIVERSE PORTALS // ALL SYSTEMS GO', status: 'READY' }
];

export default function IntermediateScreen({ isActive, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [hexCode, setHexCode] = useState('0x7F...9A');
  const [logIndex, setLogIndex] = useState(0);
  const [isExitFlash, setIsExitFlash] = useState(false);
  const animIntervalRef = useRef(null);
  const prevLogRef = useRef(0);
  const transitionTimeoutRef = useRef(null);

  useEffect(() => {
    if (!isActive) {
      setProgress(0);
      setLogIndex(0);
      setIsExitFlash(false);
      prevLogRef.current = 0;
      if (animIntervalRef.current) clearInterval(animIntervalRef.current);
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
      return;
    }

    // Play initial data deploy sweep
    if (SoundFX.isEnabled()) {
      SoundFX.playDeploy();
    }

    const startTime = Date.now();
    const countDuration = 1850; // Reaches 100% cleanly before transition

    animIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentPct = Math.min(100, Math.floor((elapsed / countDuration) * 100));
      setProgress(currentPct);

      // Random cycling hex hash until 100%
      if (currentPct < 100) {
        const randomHex =
          '0x' +
          Math.floor(Math.random() * 0xffffff)
            .toString(16)
            .toUpperCase()
            .padStart(6, '0');
        setHexCode(randomHex);
      } else {
        setHexCode('0x00FF88 // DECRYPTED');
      }

      // Update telemetry log steps with tactile key audio ticks
      let newLogIdx = 0;
      if (elapsed > 350 && elapsed <= 800) newLogIdx = 1;
      else if (elapsed > 800 && elapsed <= 1400) newLogIdx = 2;
      else if (elapsed > 1400) newLogIdx = 3;

      if (newLogIdx !== prevLogRef.current) {
        prevLogRef.current = newLogIdx;
        setLogIndex(newLogIdx);
        if (SoundFX.isEnabled()) {
          SoundFX.playKey();
        }
      }

      // When 100% is reached
      if (currentPct >= 100) {
        clearInterval(animIntervalRef.current);
        setIsExitFlash(true);

        if (SoundFX.isEnabled()) {
          SoundFX.playSuccess();
        }

        // Allow 380ms for the 100% milestone and flash before transitioning
        transitionTimeoutRef.current = setTimeout(() => {
          if (onComplete) onComplete();
        }, 380);
      }
    }, 35);

    return () => {
      if (animIntervalRef.current) clearInterval(animIntervalRef.current);
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    };
  }, [isActive, onComplete]);

  return (
    <div
      id="s-intermediate"
      className={`screen ${isActive ? 'active' : ''} ${isExitFlash ? 'glitch-exit-flash' : ''}`}
    >
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
          <span>NEURAL HANDSHAKE IN PROGRESS {/* DECRYPTING DATASTREAM */}</span>
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
            <div className="intermediate-progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Streaming Neural Telemetry Logs */}
        <div className="intermediate-telemetry-box">
          {TELEMETRY_STEPS.slice(0, logIndex + 1).map((step) => (
            <div key={`step-${step.time}-${step.status}`} className="telemetry-log-row">
              <span className="log-time">[{step.time}]</span>
              <span className="log-arrow">&gt;&gt;</span>
              <span className="log-text">{step.text}</span>
              <span className={`log-status ${step.status.toLowerCase()}`}>[{step.status}]</span>
            </div>
          ))}
        </div>

        <div className="load-sublabel">
          AUTHENTICATED AGENT: HARSHIT SHARMA &bull; ARTIFICIAL INTELLIGENCE &bull; CLASS OF 2029
        </div>
      </div>
    </div>
  );
}
