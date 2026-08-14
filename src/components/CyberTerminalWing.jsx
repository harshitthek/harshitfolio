import React, { useState, useEffect, useRef } from 'react';
import { SoundFX } from './SoundFX';

const INITIAL_LOGS = [
  { tag: 'SYS', text: 'booting neural_hypervisor v2.4...', color: 'cyan' },
  { tag: 'OK', text: 'mounted /dev/nvme0n1 [64GB VRAM]', color: 'green' },
  { tag: 'CORE', text: 'tensor_flux synced @ 3.8 TFLOPS', color: 'cyan' },
  { tag: 'EXEC', text: 'spawn agentic_tree daemon (pid: 1337)', color: 'white' },
  { tag: 'INFO', text: 'type "help" or click quick commands below', color: 'green' }
];

export default function CyberTerminalWing({ isActive }) {
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [inputVal, setInputVal] = useState('');
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const executeCommand = (cmdStr) => {
    const cmd = cmdStr.trim().toLowerCase();
    SoundFX.playClick();

    const userEntry = { tag: 'CMD', text: `$ ${cmdStr}`, color: 'white' };

    let reply = [];
    if (!cmd) {
      reply = [];
    } else if (cmd === 'help') {
      reply = [
        { tag: 'HELP', text: 'Available: whoami, skills, matrix, contact, clear, stats', color: 'cyan' }
      ];
    } else if (cmd === 'whoami') {
      reply = [
        { tag: 'USER', text: 'Harshit Sharma // AI/ML & Systems Explorer @ USAR Delhi', color: 'green' }
      ];
    } else if (cmd === 'skills') {
      reply = [
        { tag: 'AI/ML', text: 'Python, PyTorch, Autonomous Agents, LLM Pipelines', color: 'cyan' },
        { tag: 'WEB', text: 'React, WebGL, 3D Canvas, Node.js, Systems Arch', color: 'green' }
      ];
    } else if (cmd === 'matrix') {
      reply = [
        { tag: 'MATRIX', text: '0x7FA2 :: Entropy 0.942 :: Tensor flux 3.84 TFLOPS', color: 'green' }
      ];
    } else if (cmd === 'contact') {
      reply = [
        { tag: 'EMAIL', text: 'codewithharshitsharma@gmail.com', color: 'cyan' },
        { tag: 'LINK', text: 'linkedin.com/in/devharshitsharma', color: 'green' }
      ];
    } else if (cmd === 'stats') {
      reply = [
        { tag: 'CPU', text: 'Usage: 12% // Temp: 38°C // VRAM: 64GB', color: 'cyan' },
        { tag: 'PORTALS', text: '8 AI Universes Online & Calibrated', color: 'green' }
      ];
    } else if (cmd === 'clear') {
      setLogs([]);
      setInputVal('');
      return;
    } else {
      reply = [
        { tag: 'ERR', text: `Command not found: "${cmd}". Type "help"`, color: 'red' }
      ];
    }

    setLogs(prev => [...prev, userEntry, ...reply]);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputVal);
    }
  };

  return (
    <aside className="cyber-flank-terminal left-flank">
      <div className="terminal-window">
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
            <span className="term-host">harshit@core:~# terminal</span>
          </div>
          <span className="term-status-pill">INTERACTIVE</span>
        </div>

        {/* Scrollable Terminal Stream */}
        <div ref={scrollRef} className="term-stream-body">
          <div className="term-scanline"></div>
          {logs.map((log, i) => (
            <div key={i} className="term-line">
              <span className={`term-tag ${log.color}`}>[{log.tag}]</span>
              <span className="term-msg">{log.text}</span>
            </div>
          ))}

          {/* Real Interactive Input Line */}
          <div className="term-input-line">
            <span className="term-prompt">root@hs:~$</span>
            <input
              ref={inputRef}
              type="text"
              className="term-real-input"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type help..."
              autoComplete="off"
              spellCheck="false"
            />
          </div>
        </div>

        {/* Quick-Click Command Pills */}
        <div className="term-cmd-pills">
          <button type="button" className="cmd-pill" onClick={() => executeCommand('whoami')}>
            whoami
          </button>
          <button type="button" className="cmd-pill" onClick={() => executeCommand('skills')}>
            skills
          </button>
          <button type="button" className="cmd-pill" onClick={() => executeCommand('matrix')}>
            matrix
          </button>
          <button type="button" className="cmd-pill" onClick={() => executeCommand('clear')}>
            clear
          </button>
        </div>
      </div>
    </aside>
  );
}
