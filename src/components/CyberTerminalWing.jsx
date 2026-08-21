import { useEffect, useRef, useState } from 'react';

const SCRIPT_SEQUENCE = [
  {
    cmd: 'whoami',
    outputs: [
      { tag: 'USER', text: 'Harshit Sharma // Creator & Thinker', color: 'green' },
      { tag: 'ACAD', text: 'B.Tech AI & ML (Class of 2029), New Delhi', color: 'cyan' }
    ]
  },
  {
    cmd: 'cat about_me.txt',
    outputs: [
      { tag: 'MISSION', text: 'Curiosity-driven creator & multiverse architect.', color: 'white' },
      { tag: 'PASSION', text: 'Building neural systems, agentic flows & WebGL 3D.', color: 'cyan' }
    ]
  },
  {
    cmd: 'cat skills.env',
    outputs: [
      {
        tag: 'AI/ML',
        text: 'CatBoost, XGBoost, On-Device Llama.cpp, Scikit-Learn',
        color: 'green'
      },
      { tag: 'STACK', text: 'React 19, FastAPI, Kotlin Jetpack Compose, Canvas 2D', color: 'cyan' }
    ]
  },
  {
    cmd: 'cat projects.status',
    outputs: [
      {
        tag: 'ML_97.4%',
        text: 'AutoValuate AI: Stacking Valuation Suite (102 Tests)',
        color: 'green'
      },
      { tag: 'AGENT_CI', text: 'Resilient: Autonomous AI Benchmark Pipeline', color: 'cyan' },
      { tag: 'SECURITY', text: 'PhishShield: Real-Time Phishing Threat Engine', color: 'green' },
      { tag: 'ON_DEVICE', text: 'Finvaria: Offline Local LLM Youth Empowerment', color: 'cyan' }
    ]
  },
  {
    cmd: 'cat mindset.md',
    outputs: [
      { tag: 'MINDSET', text: '"Curiosity without boundaries. Make cool things."', color: 'green' }
    ]
  },
  {
    cmd: 'cat comms.info',
    outputs: [
      { tag: 'MAIL', text: 'codewithharshitsharma@gmail.com', color: 'cyan' },
      { tag: 'HUB', text: 'github.com/harshitthek // in/devharshitsharma', color: 'green' }
    ]
  },
  {
    cmd: 'clear',
    outputs: []
  }
];

export default function CyberTerminalWing({ isActive: _isActive }) {
  const [logs, setLogs] = useState([
    { tag: 'SYS', text: 'neural_kernel v2.4 initialized', color: 'cyan' },
    { tag: 'OK', text: 'harshit.exe telemetry daemon [ONLINE]', color: 'green' }
  ]);
  const [currentTyping, setCurrentTyping] = useState('');
  const scrollRef = useRef(null);
  const timeoutsRef = useRef([]);

  // Auto-scroll instantly on log updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  });

  const addTimeout = useCallback((fn, delay) => {
    const id = setTimeout(fn, delay);
    timeoutsRef.current.push(id);
    return id;
  }, []);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  useEffect(() => {
    let isCancelled = false;
    let stepIndex = 0;

    const playSequenceStep = () => {
      if (isCancelled) return;

      const item = SCRIPT_SEQUENCE[stepIndex];
      const cmdText = item.cmd;
      let charIdx = 0;
      setCurrentTyping('');

      // Fast, snappy character typing (30ms-50ms)
      const typeChar = () => {
        if (isCancelled) return;

        if (charIdx <= cmdText.length) {
          setCurrentTyping(cmdText.slice(0, charIdx));
          charIdx++;
          addTimeout(typeChar, 35 + Math.random() * 25);
        } else {
          // Finished typing command -> short pause then execute
          addTimeout(() => {
            if (isCancelled) return;

            if (cmdText === 'clear') {
              setLogs([
                { tag: 'SYS', text: 'terminal buffer reset // telemetry live', color: 'cyan' }
              ]);
              setCurrentTyping('');
              stepIndex = (stepIndex + 1) % SCRIPT_SEQUENCE.length;
              addTimeout(playSequenceStep, 800);
            } else {
              setLogs((prev) => [...prev, { tag: 'CMD', text: `$ ${cmdText}`, color: 'white' }]);
              setCurrentTyping('');

              // Emit outputs with fast cadence
              let outIdx = 0;
              const emitOutput = () => {
                if (isCancelled) return;

                if (outIdx < item.outputs.length) {
                  const outLine = item.outputs[outIdx];
                  setLogs((prev) => [...prev, outLine]);
                  outIdx++;
                  addTimeout(emitOutput, 220);
                } else {
                  // Pause to let user read the response
                  stepIndex = (stepIndex + 1) % SCRIPT_SEQUENCE.length;
                  addTimeout(playSequenceStep, 2200);
                }
              };

              addTimeout(emitOutput, 150);
            }
          }, 250);
        }
      };

      addTimeout(typeChar, 250);
    };

    // Begin autotyping immediately on load
    addTimeout(playSequenceStep, 350);

    return () => {
      isCancelled = true;
      clearAllTimeouts();
    };
  }, [clearAllTimeouts, addTimeout]);

  return (
    <aside
      className="cyber-flank-terminal left-flank read-only-feed"
      aria-label="Autonomous Terminal Feed"
    >
      <section className="terminal-window non-interactive" aria-label="Harshit Terminal Feed">
        <span className="corner tl"></span>
        <span className="corner tr"></span>
        <span className="corner bl"></span>
        <span className="corner br"></span>

        {/* Terminal Title Bar */}
        <div className="term-bar-top">
          <div className="term-lights">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="term-window-title">HARSHIT_CORE_STREAM // SYS_RADAR</span>
          <span className="term-badge" title="Continuous Real-time Log Stream">
            AUTOTYPE
          </span>
        </div>

        {/* Continuous Autotyping Terminal Feed */}
        <div ref={scrollRef} className="term-stream-body autotype-stream">
          <div className="term-scanline"></div>

          {logs.map((log) => (
            <div key={`log-${log.tag}-${log.text}`} className="term-line">
              <span className={`term-tag ${log.color}`}>[{log.tag}]</span>
              <span className="term-msg">{log.text}</span>
            </div>
          ))}

          {/* Active Autotyping Cursor Line */}
          <div className="term-active-prompt-line">
            <span className="term-prompt">harshit:~$</span>
            <span className="term-typed-text">{currentTyping}</span>
            <span className="term-live-caret"></span>
          </div>
        </div>

        {/* Terminal Telemetry Footer */}
        <div className="term-autotype-footer">
          <span className="footer-stat cyan">FEED: LIVE_TELEMETRY</span>
          <span className="footer-stat green">STATUS: STREAMING</span>
        </div>
      </section>
    </aside>
  );
}
