import React, { useState, useEffect, useRef } from 'react';

const SCRIPT_SEQUENCE = [
  {
    cmd: 'whoami',
    outputs: [
      { tag: 'USER', text: 'Harshit Sharma // Creator & Thinker', color: 'green' },
      { tag: 'ACAD', text: 'B.Tech AI & ML @ USAR (GGSIPU), New Delhi', color: 'cyan' }
    ]
  },
  {
    cmd: 'cat about_me.txt',
    outputs: [
      { tag: 'PASSION', text: 'Curiosity-driven creator & multiverse architect.', color: 'white' },
      { tag: 'FOCUS', text: 'Building neural systems, agentic flows & WebGL 3D.', color: 'cyan' }
    ]
  },
  {
    cmd: 'cat skills.env',
    outputs: [
      { tag: 'AI/ML', text: 'PyTorch, Autonomous Agent Trees, Deep Learning', color: 'green' },
      { tag: 'STACK', text: 'React, WebGL Shaders, Node.js, Systems Arch', color: 'cyan' }
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

export default function CyberTerminalWing({ isActive }) {
  const [logs, setLogs] = useState([
    { tag: 'SYS', text: 'neural_kernel v2.4 initialized', color: 'cyan' },
    { tag: 'OK', text: 'harshit.exe telemetry daemon [ONLINE]', color: 'green' }
  ]);
  const [currentTyping, setCurrentTyping] = useState('');
  const scrollRef = useRef(null);
  const timeoutsRef = useRef([]);

  // Auto-scroll on log changes or typing
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, currentTyping]);

  // Clean timeout registration helper
  const addTimeout = (fn, delay) => {
    const id = setTimeout(fn, delay);
    timeoutsRef.current.push(id);
    return id;
  };

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  useEffect(() => {
    let isCancelled = false;
    let stepIndex = 0;

    const playSequenceStep = () => {
      if (isCancelled) return;

      const item = SCRIPT_SEQUENCE[stepIndex];
      const cmdText = item.cmd;
      let charIdx = 0;
      setCurrentTyping('');

      // Type the command character by character
      const typeChar = () => {
        if (isCancelled) return;

        if (charIdx <= cmdText.length) {
          setCurrentTyping(cmdText.slice(0, charIdx));
          charIdx++;
          addTimeout(typeChar, 45 + Math.random() * 30);
        } else {
          // Finished typing command -> Pause briefly then execute
          addTimeout(() => {
            if (isCancelled) return;

            if (cmdText === 'clear') {
              setLogs([
                { tag: 'SYS', text: 'terminal cleared // stream active', color: 'cyan' }
              ]);
              setCurrentTyping('');
              stepIndex = (stepIndex + 1) % SCRIPT_SEQUENCE.length;
              addTimeout(playSequenceStep, 1000);
            } else {
              // Add executed command to logs
              setLogs(prev => [
                ...prev,
                { tag: 'CMD', text: `$ ${cmdText}`, color: 'white' }
              ]);
              setCurrentTyping('');

              // Emit outputs sequentially
              let outIdx = 0;
              const emitOutput = () => {
                if (isCancelled) return;

                if (outIdx < item.outputs.length) {
                  const outLine = item.outputs[outIdx];
                  setLogs(prev => [...prev, outLine]);
                  outIdx++;
                  addTimeout(emitOutput, 280);
                } else {
                  // Wait for user to read before typing next command
                  stepIndex = (stepIndex + 1) % SCRIPT_SEQUENCE.length;
                  addTimeout(playSequenceStep, 2600);
                }
              };

              addTimeout(emitOutput, 200);
            }
          }, 350);
        }
      };

      addTimeout(typeChar, 400);
    };

    addTimeout(playSequenceStep, 1200);

    return () => {
      isCancelled = true;
      clearAllTimeouts();
    };
  }, []);

  return (
    <aside className="cyber-flank-terminal left-flank" aria-label="Automated Linux Shell Stream">
      <div className="terminal-window" role="region" aria-label="Harshit Terminal Telemetry">
        <span className="corner tl"></span>
        <span className="corner tr"></span>
        <span className="corner bl"></span>
        <span className="corner br"></span>

        {/* Linux Terminal Titlebar */}
        <div className="term-titlebar">
          <div className="term-dots">
            <span className="term-dot red"></span>
            <span className="term-dot yellow"></span>
            <span className="term-dot green"></span>
          </div>
          <div className="term-host-wrap">
            <span className="term-host">harshit@core:~# telemetry</span>
          </div>
          <span className="term-status-pill autotype-pill">
            <span className="live-rec-dot"></span>
            AUTOTYPE
          </span>
        </div>

        {/* Scrollable Auto-Typing Terminal Stream */}
        <div ref={scrollRef} className="term-stream-body autotype-stream">
          <div className="term-scanline"></div>

          {logs.map((log, i) => (
            <div key={i} className="term-line">
              <span className={`term-tag ${log.color}`}>[{log.tag}]</span>
              <span className="term-msg">{log.text}</span>
            </div>
          ))}

          {/* Active Live Prompt with Blinking Cursor */}
          <div className="term-active-prompt-line">
            <span className="term-prompt">harshit:~$</span>
            <span className="term-typed-text">{currentTyping}</span>
            <span className="term-live-caret"></span>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="term-autotype-footer">
          <span className="footer-stat cyan">FEED: LIVE_LOG</span>
          <span className="footer-stat green">STATUS: STREAMING</span>
        </div>
      </div>
    </aside>
  );
}
