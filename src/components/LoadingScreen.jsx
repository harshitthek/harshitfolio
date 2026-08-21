import confetti from 'canvas-confetti';
import { useEffect, useRef, useState } from 'react';
import { SoundFX } from './SoundFX';

export default function LoadingScreen({ isActive, targetName, onComplete }) {
  const [lines, setLines] = useState([]);
  const [progressPct, setProgressPct] = useState(0);
  const [progressLabel, setProgressLabel] = useState('INITIALIZING...');
  const boxRef = useRef(null);

  useEffect(() => {
    if (!isActive) {
      setLines([]);
      setProgressPct(0);
      setProgressLabel('INITIALIZING...');
      return;
    }

    SoundFX.playDeploy();

    const steps = [
      { type: 'cmd', prompt: '$', cmd: `ping harshit-neural.internal -c 3`, delay: 80 },
      {
        type: 'res',
        res: `64 bytes from 192.168.1.42: icmp_seq=1 ttl=64 time=9.4ms`,
        cls: 'ok',
        delay: 480
      },
      {
        type: 'cmd',
        prompt: '$',
        cmd: `ssh harshit@neural-core.internal -p 2244 -i ~/.ssh/ai_key`,
        delay: 800
      },
      {
        type: 'res',
        res: `Authentication verified. Welcome Operator: Harshit Sharma.`,
        cls: 'ok',
        delay: 1150
      },
      {
        type: 'cmd',
        prompt: '$',
        cmd: `fetch --portal "${targetName}" --pipeline autonomous --cache-hit`,
        delay: 1400
      },
      {
        type: 'res',
        res: `Streaming neural weights & repo assets... [████████░░] 84%`,
        cls: 'res',
        delay: 1750
      },
      {
        type: 'res',
        res: `Synthesizing runtime container... done (${Math.floor(Math.random() * 200 + 120)}KB optimized)`,
        cls: 'dim',
        delay: 2050
      },
      {
        type: 'res',
        res: `✓ AI Sandbox isolated & unit test matrix verified (100% PASS)`,
        cls: 'ok',
        delay: 2320
      },
      {
        type: 'cmd',
        prompt: '$',
        cmd: `deploy --target browser --env prod --ssl strict`,
        delay: 2550
      },
      { type: 'res', res: `🚀 Launching ${targetName} universe...`, cls: 'ok', delay: 2850 }
    ];

    const labels = [
      'SCANNING NODES...',
      'CONNECTING PROTOCOLS...',
      'AUTHENTICATING OPERATOR...',
      'STREAMING ASSETS...',
      'DECOMPOSING GRAPH...',
      'COMPILING BUNDLE...',
      'VERIFYING SANDBOX...',
      'INITIALIZING GATEWAY...',
      'DEPLOYING TARGET...',
      'LAUNCH COMPLETE!'
    ];

    const timeouts = [];

    steps.forEach((step, i) => {
      const t = setTimeout(() => {
        setLines((prev) => [...prev, step]);
        const pct = Math.round(((i + 1) / steps.length) * 100);
        setProgressPct(pct);
        setProgressLabel(labels[i] || 'PROCESSING...');
        SoundFX.playKey();
      }, step.delay);
      timeouts.push(t);
    });

    const completeTimeout = setTimeout(() => {
      setProgressPct(100);
      setProgressLabel('MISSION COMPLETE // TARGET ACTIVE');
      SoundFX.playSuccess();

      // Trigger celebratory cyber confetti burst
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00ff88', '#38bdf8', '#ffffff', '#a3e635']
        });
      } catch (_e) {
        // Ignore
      }

      onComplete();
    }, 3200);
    timeouts.push(completeTimeout);

    return () => timeouts.forEach(clearTimeout);
  }, [isActive, targetName, onComplete]);

  // Keep terminal scrolled to bottom
  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, []);

  return (
    <div id="s-loading" className={`screen ${isActive ? 'active' : ''}`}>
      <div className="load-grid"></div>
      <div className="load-vignette"></div>

      <div className="corner-dec tl"></div>
      <div className="corner-dec tr"></div>
      <div className="corner-dec bl"></div>
      <div className="corner-dec br"></div>

      <div className="load-content">
        <div className="load-glyph" data-text="DEPLOYING">
          DEPLOYING
        </div>
        <div className="load-label">TARGET ACQUIRED {/* HARSHIT'S MULTIVERSE */}</div>
        <div className="load-target">{targetName?.toUpperCase() || 'PORTAL'}</div>

        <div className="load-ring"></div>

        <div className="terminal-box" ref={boxRef}>
          {lines.map((line, idx) => (
            <div
              key={`line-${idx}-${line.cmd || line.res || line.type}`}
              className="terminal-line show"
            >
              {line.type === 'cmd' ? (
                <>
                  <span className="prompt">{line.prompt}</span>
                  <span className="cmd">{line.cmd}</span>
                </>
              ) : (
                <span className={line.cls || 'res'}>&nbsp;&nbsp;{line.res}</span>
              )}
            </div>
          ))}
        </div>

        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressPct}%` }}></div>
          <div className="progress-glow" style={{ right: `${100 - progressPct}%` }}></div>
        </div>

        <div className="progress-stats">
          <span className="progress-label-text">{progressLabel}</span>
          <span className="progress-pct">{progressPct}%</span>
        </div>
      </div>
    </div>
  );
}
