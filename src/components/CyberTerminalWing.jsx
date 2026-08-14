import React, { useState, useEffect, useRef } from 'react';

const LOG_LINES = [
  { tag: 'SYS', text: 'booting neural_hypervisor v2.4...', color: 'cyan' },
  { tag: 'OK', text: 'mounted /dev/nvme0n1 [64GB VRAM]', color: 'green' },
  { tag: 'INFO', text: 'tensor_core [0-7] online @ 3.8 TFLOPS', color: 'cyan' },
  { tag: 'EXEC', text: 'yggdrasil_agent daemon (pid: 1337)', color: 'white' },
  { tag: 'NET', text: 'establishing satellite link: 10 Gbps', color: 'green' },
  { tag: 'AUTH', text: 'clearance level-9 granted (HS-01)', color: 'cyan' },
  { tag: 'SYS', text: 'entropy_flux calibrated: 0.942 η', color: 'green' },
  { tag: 'READY', text: 'multiverse portals initialized.', color: 'green' },
  { tag: 'POLL', text: 'neural sync rate: 60 Hz // 0.18ms latency', color: 'cyan' },
  { tag: 'OK', text: 'awaiting user input clearance...', color: 'green' }
];

export default function CyberTerminalWing({ isActive }) {
  const [displayedLogs, setDisplayedLogs] = useState([]);
  const logIndexRef = useRef(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isActive) {
      setDisplayedLogs([]);
      logIndexRef.current = 0;
      return;
    }

    // Initial 4 logs
    setDisplayedLogs(LOG_LINES.slice(0, 4));
    logIndexRef.current = 4;

    const interval = setInterval(() => {
      const nextIndex = logIndexRef.current % LOG_LINES.length;
      setDisplayedLogs(prev => {
        const nextLog = LOG_LINES[nextIndex];
        const updated = [...prev.slice(-6), { ...nextLog, id: Date.now() + Math.random() }];
        return updated;
      });
      logIndexRef.current += 1;
    }, 1400);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <aside className="cyber-flank-terminal left-flank" aria-hidden="true">
      <div className="terminal-window">
        <span className="corner tl"></span>
        <span className="corner tr"></span>
        <span className="corner bl"></span>
        <span className="corner br"></span>

        {/* Linux Terminal Title Bar */}
        <div className="term-titlebar">
          <div className="term-dots">
            <span className="term-dot red"></span>
            <span className="term-dot yellow"></span>
            <span className="term-dot green"></span>
          </div>
          <span className="term-host">harshit@core:~# log_stream</span>
        </div>

        {/* Live Scrolling Buffer */}
        <div ref={containerRef} className="term-stream-body">
          {displayedLogs.map((log) => (
            <div key={log.id || log.text} className="term-line">
              <span className={`term-tag ${log.color}`}>[{log.tag}]</span>
              <span className="term-msg">{log.text}</span>
            </div>
          ))}
          <div className="term-prompt-line">
            <span className="term-prompt">root@hs-01:~#</span>
            <span className="term-cursor"></span>
          </div>
        </div>
      </div>
    </aside>
  );
}
