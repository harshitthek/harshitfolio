import React, { useState, useEffect, useRef } from 'react';

const LOG_LINES = [
  { tag: 'SYS', text: 'booting neural_hypervisor v2.4...', color: 'cyan' },
  { tag: 'OK', text: 'mounted /dev/nvme0n1 [64GB VRAM]', color: 'green' },
  { tag: 'CORE', text: 'tensor_flux synced @ 3.8 TFLOPS', color: 'cyan' },
  { tag: 'EXEC', text: 'spawn agentic_tree daemon (pid: 1337)', color: 'white' },
  { tag: 'LINK', text: 'satellite uplink active: 10 Gbps', color: 'green' },
  { tag: 'AUTH', text: 'security clearance: level-9 [HS-01]', color: 'cyan' },
  { tag: 'POLL', text: 'neural sync rate: 60Hz // 0.18ms', color: 'green' },
  { tag: 'INIT', text: 'multiverse hypervisor online.', color: 'cyan' }
];

export default function CyberTerminalWing({ isActive }) {
  const [displayedLogs, setDisplayedLogs] = useState([]);
  const logIndexRef = useRef(0);

  useEffect(() => {
    if (!isActive) {
      setDisplayedLogs([]);
      logIndexRef.current = 0;
      return;
    }

    setDisplayedLogs(LOG_LINES.slice(0, 4));
    logIndexRef.current = 4;

    const interval = setInterval(() => {
      const nextIndex = logIndexRef.current % LOG_LINES.length;
      setDisplayedLogs(prev => {
        const nextLog = LOG_LINES[nextIndex];
        return [...prev.slice(-5), { ...nextLog, id: Date.now() + Math.random() }];
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

        {/* Beautiful Linux Terminal Titlebar */}
        <div className="term-titlebar">
          <div className="term-dots">
            <span className="term-dot red"></span>
            <span className="term-dot yellow"></span>
            <span className="term-dot green"></span>
          </div>
          <div className="term-host-wrap">
            <span className="term-host">harshit@core:~# log_stream</span>
          </div>
          <span className="term-status-pill">TTY1</span>
        </div>

        {/* Streaming Buffer */}
        <div className="term-stream-body">
          <div className="term-scanline"></div>
          {displayedLogs.map((log) => (
            <div key={log.id || log.text} className="term-line">
              <span className={`term-tag ${log.color}`}>[{log.tag}]</span>
              <span className="term-msg">{log.text}</span>
            </div>
          ))}
          <div className="term-prompt-line">
            <span className="term-prompt">harshit@universe:~$</span>
            <span className="term-cursor"></span>
          </div>
        </div>
      </div>
    </aside>
  );
}
