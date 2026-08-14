import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SoundFX } from './SoundFX';

const INITIAL_LOGS = [
  { tag: 'SYS', text: 'booting neural_hypervisor v2.4...', color: 'cyan' },
  { tag: 'OK', text: 'nvme0n1 mounted [64GB VRAM]', color: 'green' },
  { tag: 'CORE', text: 'tensor_flux synced @ 3.84 TFLOPS', color: 'cyan' },
  { tag: 'EXEC', text: 'yggdrasil daemon online (pid: 1337)', color: 'white' },
  { tag: 'INFO', text: 'type "help" or click quick commands below', color: 'green' }
];

export default function CyberTerminalWing({ isActive }) {
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const executeCommand = useCallback((cmdStr) => {
    const rawCmd = cmdStr.trim();
    const cmd = rawCmd.toLowerCase();
    SoundFX.playClick();

    if (rawCmd) {
      setHistory(prev => [...prev, rawCmd]);
      setHistoryIndex(-1);
    }

    const userEntry = { tag: 'CMD', text: `$ ${rawCmd || ''}`, color: 'white' };

    let reply = [];
    if (!cmd) {
      reply = [];
    } else if (cmd === 'help') {
      reply = [
        { tag: 'HELP', text: 'Commands: whoami, skills, matrix, contact, stats, clear', color: 'cyan' }
      ];
    } else if (cmd === 'whoami') {
      reply = [
        { tag: 'USER', text: 'Harshit Sharma // AI/ML & Systems @ USAR Delhi', color: 'green' }
      ];
    } else if (cmd === 'skills') {
      reply = [
        { tag: 'SKILL', text: 'Python, PyTorch, Autonomous Agents, LLMs, WebGL', color: 'cyan' }
      ];
    } else if (cmd === 'matrix') {
      reply = [
        { tag: 'SYNC', text: '0x7FA2 :: Entropy 0.942 :: Flux 3.84 TFLOPS', color: 'green' }
      ];
    } else if (cmd === 'contact') {
      reply = [
        { tag: 'MAIL', text: 'codewithharshitsharma@gmail.com', color: 'cyan' },
        { tag: 'LINK', text: 'linkedin.com/in/devharshitsharma', color: 'green' }
      ];
    } else if (cmd === 'stats') {
      reply = [
        { tag: 'STAT', text: 'CPU 12% // Temp 36°C // 8 Portals Calibrated', color: 'cyan' }
      ];
    } else if (cmd === 'clear') {
      setLogs([]);
      setInputVal('');
      return;
    } else {
      reply = [
        { tag: 'ERR', text: `Unknown command: "${rawCmd}". Type "help"`, color: 'red' }
      ];
    }

    setLogs(prev => [...prev, userEntry, ...reply]);
    setInputVal('');
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(history[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= history.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx] || '');
      }
    }
  };

  const handleWindowClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <aside className="cyber-flank-terminal left-flank" aria-label="Interactive Linux Shell">
      <div className="terminal-window" onClick={handleWindowClick} role="region" aria-label="Terminal Interface">
        <span className="corner tl"></span>
        <span className="corner tr"></span>
        <span className="corner bl"></span>
        <span className="corner br"></span>

        {/* Crisp Linux Terminal Titlebar */}
        <div className="term-titlebar">
          <div className="term-dots">
            <span className="term-dot red"></span>
            <span className="term-dot yellow"></span>
            <span className="term-dot green"></span>
          </div>
          <div className="term-host-wrap">
            <span className="term-host">hs@delhi:~/core</span>
          </div>
          <span className="term-status-pill">CLI_v2.4</span>
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

          {/* Interactive Prompt Input Line */}
          <div className="term-input-line">
            <span className="term-prompt">harshit:~$</span>
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
              aria-label="Terminal input"
            />
          </div>
        </div>

        {/* Quick-Click Command Pills */}
        <div className="term-cmd-pills">
          <button type="button" className="cmd-pill" onClick={(e) => { e.stopPropagation(); executeCommand('whoami'); }}>
            whoami
          </button>
          <button type="button" className="cmd-pill" onClick={(e) => { e.stopPropagation(); executeCommand('skills'); }}>
            skills
          </button>
          <button type="button" className="cmd-pill" onClick={(e) => { e.stopPropagation(); executeCommand('matrix'); }}>
            matrix
          </button>
          <button type="button" className="cmd-pill" onClick={(e) => { e.stopPropagation(); executeCommand('clear'); }}>
            clear
          </button>
        </div>
      </div>
    </aside>
  );
}
