import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SoundFX } from '../SoundFX';
import { projectsData } from '../../data/projectsData';

// Virtual Filesystem Structure
const VIRTUAL_FS = {
  '~': {
    type: 'dir',
    children: {
      'bio.txt': {
        type: 'file',
        size: '1.4 KB',
        content: `=====================================================
HARSHIT SHARMA // ARTIFICIAL INTELLIGENCE & SYSTEMS ENGINEER
=====================================================
Institution : University School of Automation & Robotics (USAR, GGSIPU), New Delhi
Degree      : B.Tech in Artificial Intelligence & Machine Learning
Location    : New Delhi, India
GitHub      : https://github.com/harshitthek
LinkedIn    : https://www.linkedin.com/in/devharshitsharma
Email       : codewithharshitsharma@gmail.com

Core Focus  :
- Autonomous Multi-Agent LLM Orchestration & Reasoning Trees
- High-Accuracy Machine Learning Valuations & Feature Engineering
- Production Sandboxing, Docker Isolation & Benchmarking
- GPU-Accelerated 3D WebGL / Three.js Visual Engines`
      },
      'contact.json': {
        type: 'file',
        size: '520 B',
        content: JSON.stringify({
          name: "Harshit Sharma",
          role: "AI Engineer & ML Architect",
          email: "codewithharshitsharma@gmail.com",
          github: "https://github.com/harshitthek",
          linkedin: "https://www.linkedin.com/in/devharshitsharma",
          discord: "harshit0",
          location: "New Delhi, India",
          status: "Available for AI/ML Engineering roles & Autonomous Agent research"
        }, null, 2)
      },
      'id_rsa.pub': {
        type: 'file',
        size: '740 B',
        content: 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIHarshitSharmaProductionAIKey2026 harshit@usar-delhi'
      },
      'projects': {
        type: 'dir',
        children: {
          'yggdrasil.py': {
            type: 'file',
            size: '3.6 KB',
            content: `"""
Yggdrasil AI Bot — Hierarchical Tree Reasoning Discord Engine
Author: Harshit Sharma [USAR (GGSIPU), New Delhi]
"""
import asyncio
from typing import List, Dict, Any

class ThoughtNode:
    def __init__(self, node_id: str, hypothesis: str, score: float):
        self.node_id = node_id
        self.hypothesis = hypothesis
        self.score = score
        self.branches: List['ThoughtNode'] = []

class YggdrasilOrchestrator:
    def __init__(self, depth_limit: int = 5):
        self.depth_limit = depth_limit
        self.memory_graph: Dict[str, Any] = {}

    async def evaluate_tree(self, user_prompt: str) -> List[ThoughtNode]:
        print(f"[*] Parsing multi-turn query through Yggdrasil Tree: {user_prompt}")
        await asyncio.sleep(0.04)
        return [
            ThoughtNode("branch-01", "Vector similarity retrieval across knowledge base", 0.96),
            ThoughtNode("branch-02", "Autonomous code synthesis in isolated sandbox", 0.99)
        ]`
          },
          'autovaluate_model.py': {
            type: 'file',
            size: '3.6 KB',
            content: `"""
AutoValuate AI — Dual-Engine Stacking Regressor (97.4% R² Score)
Stacking: CatBoost + XGBoost + LightGBM on 40,000+ Real Transactions
Features: 5-Year TCO Lifecycle, Batch Fleet Appraisals, SHA-256 Certificates
"""
import pandas as pd
from catboost import CatBoostRegressor
from xgboost import XGBRegressor
from sklearn.ensemble import StackingRegressor, RandomForestRegressor

def train_dual_engine(vehicle_type: str = "bike"):
    base_models = [
        ('cb', CatBoostRegressor(iterations=650, depth=7, verbose=0)),
        ('xgb', XGBRegressor(n_estimators=500, max_depth=6, random_state=42))
    ]
    model = StackingRegressor(estimators=base_models, final_estimator=RandomForestRegressor(n_estimators=100))
    print(f"✓ {vehicle_type.upper()} Dual-Engine Stacking Matrix Fitted (97.4% R² Confidence)")
    return model`
          },
          'resilient_agent.py': {
            type: 'file',
            size: '4.2 KB',
            content: `"""
Resilient — Autonomous Coding Agent Evaluation Pipeline
Orchestrates multi-model git sandboxes against strict unit tests
"""
import docker
import jwt

class ResilientSandboxRunner:
    def __init__(self, repo_url: str, issue_number: int):
        self.repo = repo_url
        self.issue_id = issue_number
        self.docker_client = docker.from_env()

    def spawn_isolated_container(self):
        container = self.docker_client.containers.run(
            "harshit/resilient-sandbox:v2.4",
            detach=True,
            network_mode="none",  # Strict zero-leak isolation
            mem_limit="4g"
        )
        return container`
          }
        }
      },
      'skills': {
        type: 'dir',
        children: {
          'stack.json': {
            type: 'file',
            size: '880 B',
            content: JSON.stringify({
              languages: ["Python 3.12", "JavaScript (ES6+)", "TypeScript", "C++", "SQL", "Bash"],
              ai_machine_learning: ["PyTorch", "Scikit-Learn", "Pandas", "NumPy", "FastAPI", "Flask", "HuggingFace"],
              frontend_3d: ["React 18", "Next.js", "Three.js", "WebGL / GLSL", "Vite", "Tailwind CSS"],
              devops_databases: ["Docker", "PostgreSQL", "Redis", "Linux (Ubuntu)", "Git & CI/CD Actions"]
            }, null, 2)
          }
        }
      },
      'secrets': {
        type: 'dir',
        children: {
          'flag.txt': {
            type: 'file',
            size: '64 B',
            content: 'FLAG{HARSHIT_SHARMA_AI_MASTER_AGENT_2026_VERIFIED}'
          }
        }
      }
    }
  }
};

const THEMES = {
  green: { label: 'CLASSIC MATRIX GREEN', primary: '#00ff88', glow: 'rgba(0, 255, 136, 0.4)' },
  cyan: { label: 'NEON CYBER SKY', primary: '#38bdf8', glow: 'rgba(56, 189, 248, 0.4)' },
  amber: { label: 'FALLOUT CRT AMBER', primary: '#fbbf24', glow: 'rgba(251, 191, 36, 0.4)' },
  purple: { label: 'SYNTHWAVE VIOLET', primary: '#c084fc', glow: 'rgba(192, 132, 252, 0.4)' },
  red: { label: 'KALI RED ALERT', primary: '#f87171', glow: 'rgba(248, 113, 113, 0.4)' }
};

const FORTUNES = [
  "\"Simplicity is prerequisite for reliability.\" — Edsger W. Dijkstra",
  "\"The best way to predict the future is to invent it.\" — Alan Kay",
  "\"Autonomous agents will write code, verify code, and deploy code — engineer the harness.\" — Harshit Sharma",
  "\"Programs must be written for people to read, and only incidentally for machines to execute.\" — Hal Abelson",
  "\"Talk is cheap. Show me the code.\" — Linus Torvalds"
];

export default function TerminalModal({ onClose, onLaunch }) {
  const [history, setHistory] = useState([
    { type: 'sys', text: '╔══════════════════════════════════════════════════════════════════════╗' },
    { type: 'sys', text: '║     HARSHIT SHARMA CYBER LAB INTERACTIVE ZSH SHELL [v6.4.0-PRO]      ║' },
    { type: 'sys', text: '║     Host: USAR (GGSIPU) Neural Engine · Clearance: LEVEL 5 ROOT      ║' },
    { type: 'sys', text: '╚══════════════════════════════════════════════════════════════════════╝' },
    { type: 'info', text: "Type 'help' for full command suite, or try: 'neofetch', 'ai <query>', 'snake', 'hack', 'top'." },
    { type: 'space', text: '' }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState('~');
  const [currentTheme, setCurrentTheme] = useState('green');
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Snake Arcade Game State
  const [snakeGameActive, setSnakeGameActive] = useState(false);
  const [snakeScore, setSnakeScore] = useState(0);
  const [snakeHighScore, setSnakeHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('harshit_snake_highscore') || '0', 10);
    } catch {
      return 0;
    }
  });
  const [snakeGameOver, setSnakeGameOver] = useState(false);
  const [snakeSpeed, setSnakeSpeed] = useState('normal'); // normal: 120ms, fast: 80ms, insane: 50ms

  const snakeCanvasRef = useRef(null);
  const snakeStateRef = useRef({
    snake: [{ x: 6, y: 6 }, { x: 5, y: 6 }, { x: 4, y: 6 }],
    food: { x: 12, y: 6 },
    dir: { x: 1, y: 0 },
    nextDir: { x: 1, y: 0 },
    particles: []
  });

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const snakeLoopRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, snakeGameActive]);

  // ── ARCADE CANVAS SNAKE GAME ENGINE ──
  useEffect(() => {
    if (!snakeGameActive || snakeGameOver) {
      if (snakeLoopRef.current) clearInterval(snakeLoopRef.current);
      return;
    }

    const canvas = snakeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gridSize = 20; // 20x15 grid
    const cols = 20;
    const rows = 15;
    canvas.width = cols * gridSize;
    canvas.height = rows * gridSize;

    const speedIntervals = { normal: 110, fast: 75, insane: 48 };
    const intervalMs = speedIntervals[snakeSpeed] || 110;

    snakeLoopRef.current = setInterval(() => {
      const state = snakeStateRef.current;
      state.dir = state.nextDir;

      const head = {
        x: state.snake[0].x + state.dir.x,
        y: state.snake[0].y + state.dir.y
      };

      // Wrap around grid boundaries
      if (head.x < 0) head.x = cols - 1;
      if (head.x >= cols) head.x = 0;
      if (head.y < 0) head.y = rows - 1;
      if (head.y >= rows) head.y = 0;

      // Check self collision
      if (state.snake.some(seg => seg.x === head.x && seg.y === head.y)) {
        setSnakeGameOver(true);
        SoundFX.playDeploy();
        return;
      }

      state.snake.unshift(head);

      // Check food collision
      if (head.x === state.food.x && head.y === state.food.y) {
        SoundFX.playSuccess();
        const multiplier = snakeSpeed === 'insane' ? 30 : snakeSpeed === 'fast' ? 20 : 10;
        setSnakeScore(prev => {
          const next = prev + multiplier;
          if (next > snakeHighScore) {
            setSnakeHighScore(next);
            try { localStorage.setItem('harshit_snake_highscore', String(next)); } catch {}
          }
          return next;
        });

        // Spawn food particles
        for (let i = 0; i < 8; i++) {
          state.particles.push({
            x: head.x * gridSize + gridSize / 2,
            y: head.y * gridSize + gridSize / 2,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6,
            life: 1.0,
            color: '#38bdf8'
          });
        }

        // Reposition food
        let newFood;
        while (!newFood || state.snake.some(s => s.x === newFood.x && s.y === newFood.y)) {
          newFood = {
            x: Math.floor(Math.random() * cols),
            y: Math.floor(Math.random() * rows)
          };
        }
        state.food = newFood;
      } else {
        state.snake.pop();
      }

      // Render Canvas Frame
      ctx.fillStyle = '#060606';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Grid Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x <= cols; x++) {
        ctx.beginPath();
        ctx.moveTo(x * gridSize, 0);
        ctx.lineTo(x * gridSize, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y <= rows; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * gridSize);
        ctx.lineTo(canvas.width, y * gridSize);
        ctx.stroke();
      }

      // Draw Food
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(
        state.food.x * gridSize + gridSize / 2,
        state.food.y * gridSize + gridSize / 2,
        gridSize / 2.8,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Draw Particles
      state.particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.08;
        if (p.life > 0) {
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.life;
          ctx.fillRect(p.x, p.y, 2, 2);
          ctx.globalAlpha = 1.0;
        } else {
          state.particles.splice(idx, 1);
        }
      });

      // Draw Snake Segments
      state.snake.forEach((seg, idx) => {
        const isHead = idx === 0;
        ctx.fillStyle = isHead ? '#00ff88' : 'rgba(0, 255, 136, 0.75)';
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = isHead ? 14 : 6;
        ctx.fillRect(
          seg.x * gridSize + 1,
          seg.y * gridSize + 1,
          gridSize - 2,
          gridSize - 2
        );
      });
      ctx.shadowBlur = 0;

    }, intervalMs);

    return () => clearInterval(snakeLoopRef.current);
  }, [snakeGameActive, snakeGameOver, snakeSpeed, snakeHighScore]);

  const changeSnakeDirection = useCallback((dirKey) => {
    const state = snakeStateRef.current;
    if (dirKey === 'UP' && state.dir.y === 0) state.nextDir = { x: 0, y: -1 };
    if (dirKey === 'DOWN' && state.dir.y === 0) state.nextDir = { x: 0, y: 1 };
    if (dirKey === 'LEFT' && state.dir.x === 0) state.nextDir = { x: -1, y: 0 };
    if (dirKey === 'RIGHT' && state.dir.x === 0) state.nextDir = { x: 1, y: 0 };
  }, []);

  const startSnakeGame = () => {
    snakeStateRef.current = {
      snake: [{ x: 6, y: 6 }, { x: 5, y: 6 }, { x: 4, y: 6 }],
      food: { x: 12, y: 6 },
      dir: { x: 1, y: 0 },
      nextDir: { x: 1, y: 0 },
      particles: []
    };
    setSnakeScore(0);
    setSnakeGameOver(false);
    setSnakeGameActive(true);
    SoundFX.playClick();
  };

  const getDirNode = useCallback((path) => {
    if (path === '~') return VIRTUAL_FS['~'];
    if (path === '~/projects') return VIRTUAL_FS['~'].children.projects;
    if (path === '~/skills') return VIRTUAL_FS['~'].children.skills;
    if (path === '~/secrets') return VIRTUAL_FS['~'].children.secrets;
    return null;
  }, []);

  const handleCommand = (raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    setCmdHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    const newHistory = [...history, { type: 'cmd', text: `harshit@usar-delhi ${currentPath} % ${trimmed}` }];

    switch (cmd) {
      case 'help':
      case '?':
        newHistory.push(
          { type: 'sys', text: '⚡ HARSHIT.EXE SHELL COMMAND DIRECTORY:' },
          { type: 'info', text: '── SYSTEM TELEMETRY & PROFILE ──' },
          { type: 'out', text: '  neofetch          - Hardware specs, OS telemetry & Harshit\'s ASCII crest' },
          { type: 'out', text: '  bio / about       - Full personal bio, degree program & university background' },
          { type: 'out', text: '  skills / stack    - Breakdown of AI/ML, full-stack, and DevOps proficiencies' },
          { type: 'out', text: '  projects          - List all 8 flagship engineering universes with live links' },
          { type: 'out', text: '  contact / socials - Direct email, GitHub, LinkedIn, and Discord endpoints' },
          { type: 'out', text: '  top / ps          - Real-time running background daemon telemetry' },
          { type: 'out', text: '  weather           - Live telemetry weather radar for New Delhi' },
          { type: 'info', text: '── FILESYSTEM NAVIGATION ──' },
          { type: 'out', text: '  ls [-l]           - List directory contents (files & folders)' },
          { type: 'out', text: '  cd <dir>          - Change directory (e.g. cd projects, cd skills, cd ..)' },
          { type: 'out', text: '  pwd               - Print current working directory path' },
          { type: 'out', text: '  cat <file>        - Inspect formatted source code files' },
          { type: 'out', text: '  tree              - Render complete hierarchical directory tree' },
          { type: 'info', text: '── AI ASSISTANT & LAUNCHER ──' },
          { type: 'out', text: '  ai / ask <query>  - Ask the built-in AI reasoning engine technical questions' },
          { type: 'out', text: '  deploy <1-8|name> - Initiate deployment sequence for a target universe' },
          { type: 'info', text: '── GAMES, CYBER FX & CUSTOMIZATION ──' },
          { type: 'out', text: '  snake             - Play the 60fps Arcade Canvas Snake Game' },
          { type: 'out', text: '  hack / pwn        - Cinematic Hollywood cyber penetration sequence' },
          { type: 'out', text: '  matrix            - Digital green cascading code stream' },
          { type: 'out', text: '  cowsay <text>     - Classic ASCII cow wisdom speech' },
          { type: 'out', text: '  fortune           - Random developer & AI aphorism' },
          { type: 'out', text: '  theme <name>      - Switch palette (green, cyan, amber, purple, red)' },
          { type: 'out', text: '  clear             - Clear terminal buffer' },
          { type: 'out', text: '  exit              - Dismiss terminal window' }
        );
        break;

      case 'neofetch':
        newHistory.push({
          type: 'neofetch',
          text: `
      ██╗  ██╗███████╗      harshit@usar-delhi
      ██║  ██║██╔════╝      ------------------
      ███████║███████╗      OS: Ubuntu Linux 24.04 LTS (x86_64)
      ██╔══██║╚════██║      Host: USAR (GGSIPU) Neural Research Lab
      ██║  ██║███████║      Degree: B.Tech Artificial Intelligence & ML
      ╚═╝  ╚═╝╚══════╝      Kernel: Linux 6.8.0-ai-custom-rt
                            Uptime: 4+ Years Continuous Engineering
                            Shell: zsh 5.9 (harshit-powerlevel10k)
                            Theme: ${THEMES[currentTheme].label}
                            CPU: Intel i9-14900K @ 5.80GHz (24 Cores)
                            GPU: NVIDIA RTX 4090 24GB VRAM
                            AI Stack: PyTorch, Scikit-Learn, FastAPI, LangGraph
                            Primary Repos: AutoValuate AI, Resilient, Yggdrasil, ShieldBlock, Carbon Guardian AI, Support Ticket Dispatcher ML
                            Email: codewithharshitsharma@gmail.com
                            GitHub: https://github.com/harshitthek
          `
        });
        break;

      case 'bio':
      case 'about':
        newHistory.push(
          { type: 'sys', text: '👤 HARSHIT SHARMA — BIOGRAPHICAL DOSSIER' },
          { type: 'out', text: '  Name: Harshit Sharma' },
          { type: 'out', text: '  Institution: University School of Automation & Robotics (USAR, GGSIPU), New Delhi' },
          { type: 'out', text: '  Degree: B.Tech in Artificial Intelligence & Machine Learning' },
          { type: 'out', text: '  Focus: Autonomous AI Agent Benchmarks, Dual-Engine ML Regression, BERT Transformers, 3D WebGL' },
          { type: 'out', text: '  GitHub: https://github.com/harshitthek' },
          { type: 'out', text: '  LinkedIn: https://www.linkedin.com/in/devharshitsharma' },
          { type: 'out', text: '  Email: codewithharshitsharma@gmail.com' }
        );
        break;

      case 'snake':
      case 'game':
        startSnakeGame();
        newHistory.push({ type: 'info', text: '🎮 INITIATING 60FPS ARCADE CANVAS SNAKE. Use Arrow Keys or WASD to steer. Press ESC or Q to quit to shell.' });
        break;

      case 'hack':
      case 'pwn':
        SoundFX.playDeploy();
        newHistory.push(
          { type: 'info', text: '⚡ INITIATING PENETRATION SEQUENCE: TARGET = HARSHIT_MAINFRAME' },
          { type: 'out', text: '[01/05] Resolving satellite proxy hop... 185.220.101.4 -> 10.0.4.1 [CONNECTED]' },
          { type: 'out', text: '[02/05] Injecting payload into sandbox firewall (Bypassing WAF & CORS)... [100% OK]' },
          { type: 'out', text: '[03/05] Exploiting zero-day in memory buffer [0x7ffeefbff490]... [OVERFLOW INJECTED]' },
          { type: 'ok', text: '[04/05] Cracking 4096-bit RSA master key... [FOUND: HARSHIT_AI_ACCESS_GRANTED]' },
          { type: 'ok', text: '[05/05] 🚀 ACCESS GRANTED. LEVEL 5 ROOT CLEARANCE UNLOCKED. ALL 10 UNIVERSES LIVE.' }
        );
        break;

      case 'top':
      case 'htop':
      case 'ps':
        newHistory.push({
          type: 'code',
          text: `PID    USER     PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
1042   harshit  20   0   4.2g   1.8g   420m R  38.4   2.8   42:15.82 node yggdrasil_fastify_server.js
1089   harshit  20   0   8.6g   3.4g   890m S  62.1   5.3   18:04.11 docker-sandbox --benchmark resilient
1104   harshit  20   0   1.8g   520m   180m S   8.4   1.2   14:32.40 uvicorn src.api:app (autovaluate_ai_fastapi)
1120   harshit  20   0   2.4g   850m   210m S  14.2   1.3   24:19.04 node carbon_guardian_telemetry.js
1140   harshit  20   0   3.1g   1.1g   320m S  18.6   1.7   11:05.18 python bert_support_dispatcher.py
1155   harshit  20   0   3.8g   1.2g   540m S  22.8   1.9   12:55.70 threejs_glsl_webgl_engine (60 FPS)

Tasks: 172 total, 2 running, 170 sleeping | Load average: 0.45, 0.38, 0.31 | RAM: 41% Used`
        });
        break;

      case 'theme':
        if (!arg || !THEMES[arg.toLowerCase()]) {
          newHistory.push({
            type: 'info',
            text: `Usage: theme <name>. Available themes: ${Object.keys(THEMES).join(', ')}`
          });
        } else {
          const t = arg.toLowerCase();
          setCurrentTheme(t);
          SoundFX.playClick();
          newHistory.push({ type: 'ok', text: `✓ Terminal theme switched to ${THEMES[t].label}` });
        }
        break;

      case 'ls':
      case 'dir':
        const dirNode = getDirNode(currentPath);
        if (!dirNode || dirNode.type !== 'dir') {
          newHistory.push({ type: 'err', text: 'ls: cannot access directory' });
        } else {
          const isLong = arg.includes('-l');
          const entries = Object.keys(dirNode.children);
          if (isLong) {
            newHistory.push({ type: 'info', text: `total ${entries.length * 4}` });
            entries.forEach(e => {
              const item = dirNode.children[e];
              const perm = item.type === 'dir' ? 'drwxr-xr-x' : '-rw-r--r--';
              const size = item.size || '4.0 KB';
              newHistory.push({
                type: item.type === 'dir' ? 'info' : 'out',
                text: `${perm}  1 harshit harshit  ${size.padEnd(7)} Aug 16 00:00  ${e}${item.type === 'dir' ? '/' : ''}`
              });
            });
          } else {
            const list = entries.map(e => dirNode.children[e].type === 'dir' ? `📁 ${e}/` : `📄 ${e}`).join('   ');
            newHistory.push({ type: 'out', text: list });
          }
        }
        break;

      case 'cd':
        if (!arg || arg === '~' || arg === '/') {
          setCurrentPath('~');
        } else if (arg === '..') {
          setCurrentPath('~');
        } else if (arg === 'projects' || arg === './projects' || arg === '~/projects') {
          setCurrentPath('~/projects');
        } else if (arg === 'skills' || arg === './skills' || arg === '~/skills') {
          setCurrentPath('~/skills');
        } else if (arg === 'secrets' || arg === './secrets' || arg === '~/secrets') {
          setCurrentPath('~/secrets');
        } else {
          newHistory.push({ type: 'err', text: `cd: no such file or directory: ${arg}` });
        }
        break;

      case 'pwd':
        newHistory.push({ type: 'out', text: `/home/harshit/${currentPath.replace('~/', '')}` });
        break;

      case 'cat':
        if (!arg) {
          newHistory.push({ type: 'err', text: "Usage: cat <filename> (e.g. 'cat bio.txt', 'cat contact.json', 'cat yggdrasil.py')" });
        } else {
          const dir = getDirNode(currentPath);
          const target = dir?.children?.[arg];
          if (target && target.type === 'file') {
            newHistory.push({ type: 'code', text: target.content });
          } else if (arg === 'bio.txt' || arg === 'contact.json') {
            newHistory.push({ type: 'code', text: VIRTUAL_FS['~'].children[arg].content });
          } else {
            newHistory.push({ type: 'err', text: `cat: ${arg}: No such file. Try 'ls' to see available files.` });
          }
        }
        break;

      case 'tree':
        newHistory.push({
          type: 'code',
          text: `.
├── bio.txt
├── contact.json
├── id_rsa.pub
├── projects/
│   ├── autovaluate_model.py
│   ├── resilient_agent.py
│   ├── support_dispatcher_bert.py
│   └── yggdrasil.py
├── secrets/
│   └── flag.txt
└── skills/
    └── stack.json

3 directories, 8 files`
        });
        break;

      case 'ai':
      case 'ask':
        if (!arg) {
          newHistory.push({ type: 'err', text: "Usage: ai <query> (e.g. 'ai why hire Harshit?', 'ai explain AutoValuate AI', 'ai what is PhishShield?')" });
        } else {
          const lower = arg.toLowerCase();
          let ans = "Harshit Sharma specializes in autonomous agent architecture, on-device LLMs, dual-engine ML regression stacking, Chrome Manifest V3 privacy engines, and production systems engineering. He studies B.Tech AI & ML at USAR (GGSIPU), New Delhi.";

          if (lower.includes('why hire') || lower.includes('hire') || lower.includes('recruit')) {
            ans = "🌟 Why hire Harshit:\nHe bridges deep algorithmic machine learning (CatBoost/XGBoost, Random Forest, BERT Transformers, TensorFlow Recommenders) with elite production systems engineering (Docker, FastAPI, Kotlin Jetpack Compose, Three.js WebGL, Fastify). He builds real, production-tested architectures with full test matrices (102 tests in AutoValuate, 47 tests in Resilient).";
          } else if (lower.includes('phish') || lower.includes('security') || lower.includes('threat') || lower.includes('entropy')) {
            ans = "🛡️ PhishShield AI — Enterprise Threat Intelligence Engine:\nA real-time security analysis system combining Random Forest (250 estimators) & TF-IDF N-grams with a 15-dimensional heuristic feature matrix (raw IP URLs, high-risk TLDs, typosquatting on 50+ global brands, Shannon domain entropy). Achieves 94.29% 5-fold CV accuracy and 100% holdout test accuracy with explainable diagnostics.";
          } else if (lower.includes('finvaria') || lower.includes('loan') || lower.includes('legal') || lower.includes('kotlin') || lower.includes('android')) {
            ans = "📱 Finvaria — Youth Empowerment & On-Device AI Mentor:\nBuilt for Startup Hackathon 2.0 with 100% Kotlin & Jetpack Compose. Runs private, on-device local LLM inferences (RunAnywhere SDK / Llama.cpp ARM64) with dynamic knowledge base injection providing offline guidance on loans, legal rights, and education across 11 Indian languages.";
          } else if (lower.includes('pageshield') || lower.includes('form') || lower.includes('groq') || lower.includes('stealth')) {
            ans = "🥷 Page Shield — Privacy Defender & Stealth Form AI:\nDual-layer Manifest V3 Chrome Extension disguised as a glassmorphic ad-blocker popup with a secret triple-click configuration drawer. Houses an ultra-stealthy Google Forms solver powered by Groq Llama 3.3 70B & Gemini 2.0 Flash Lite with dual-speed human typing simulation and zero DevTools console logs.";
          } else if (lower.includes('yggdrasil') || lower.includes('bot') || lower.includes('tree') || lower.includes('discord')) {
            ans = "🌲 Yggdrasil Platform:\nA self-hosted modular Discord platform combining a Fastify REST API with Discord.js inside a single Node.js runtime, secured with AES-256-GCM + HKDF cryptographic sessions.";
          } else if (lower.includes('resilient') || lower.includes('benchmark') || lower.includes('docker') || lower.includes('sandbox')) {
            ans = "🤖 Resilient AI Benchmark:\nAn automated testing harness for autonomous software engineering agents with isolated Docker git sandboxes and 47/47 passing Pytests.";
          } else if (lower.includes('bike') || lower.includes('car') || lower.includes('price') || lower.includes('autovaluate') || lower.includes('ml')) {
            ans = "📊 AutoValuate AI — Dual-Engine Valuation Suite:\nA 97.4% R² (bikes) / 97.3% R² (cars) gradient-boosted stacking regressor (CatBoost + XGBoost) trained on 40,000+ real transactions. Features 5-year TCO lifecycle simulation, fleet batch appraisal for 50 vehicles, cryptographic SHA-256 valuation certificates, and 102 passing automated tests (58 Pytest + 44 Vitest). Live on Vercel at https://moto-value-ai.vercel.app/";
          } else if (lower.includes('ticket') || lower.includes('support') || lower.includes('bert') || lower.includes('dispatcher')) {
            ans = "📩 Customer Support Ticket Dispatcher ML:\nA fine-tuned BERT transformer NLP model for automated departmental email classification and real-time urgency scoring with sub-120ms inference latency.";
          } else if (lower.includes('college') || lower.includes('degree') || lower.includes('usar') || lower.includes('ggsipu') || lower.includes('university')) {
            ans = "🎓 Harshit is pursuing his B.Tech in Artificial Intelligence & Machine Learning at the University School of Automation & Robotics (USAR, GGSIPU), New Delhi.";
          } else if (lower.includes('contact') || lower.includes('email') || lower.includes('reach')) {
            ans = "📬 Reach Harshit:\n- Email: codewithharshitsharma@gmail.com\n- GitHub: https://github.com/harshitthek\n- LinkedIn: https://www.linkedin.com/in/devharshitsharma\n- Discord: harshit0";
          }

          newHistory.push({ type: 'ai', text: `🧠 AI REASONING SYNTHESIS:\n${ans}` });
        }
        break;

      case 'projects':
        newHistory.push(
          { type: 'sys', text: `🚀 HARSHIT SHARMA'S ${projectsData.length} FLAGSHIP UNIVERSES:` },
          ...projectsData.map((p, i) => ({
            type: 'out',
            text: `  [${i + 1}] ${p.title.padEnd(30)} // ${p.categoryLabel} (Run: 'deploy ${i + 1}')\n      Source: ${p.githubUrl || p.url}`
          }))
        );
        break;

      case 'deploy':
      case 'launch':
        if (!arg) {
          newHistory.push({ type: 'err', text: `Usage: deploy <1-${projectsData.length}> or deploy <name> (e.g. 'deploy 1' or 'deploy autovaluate')` });
        } else {
          const num = parseInt(arg, 10);
          let target = null;
          if (!isNaN(num) && num >= 1 && num <= projectsData.length) {
            target = projectsData[num - 1];
          } else {
            target = projectsData.find(p => p.id.toLowerCase().includes(arg.toLowerCase()) || p.title.toLowerCase().includes(arg.toLowerCase()));
          }

          if (target) {
            newHistory.push({ type: 'ok', text: `🚀 INITIATING DEPLOYMENT SEQUENCE FOR: ${target.title.toUpperCase()}...` });
            SoundFX.playDeploy();
            setTimeout(() => {
              onClose();
              if (onLaunch) onLaunch(target.title, target.demoUrl || target.url);
            }, 750);
          } else {
            newHistory.push({ type: 'err', text: `Portal '${arg}' not found. Type 'projects' to list all valid portals.` });
          }
        }
        break;

      case 'skills':
      case 'stack':
        newHistory.push(
          { type: 'sys', text: "🛠️ HARSHIT'S TECHNICAL ARSENAL:" },
          { type: 'out', text: '  Languages: Python 3.12, Kotlin, JavaScript (ES6+), TypeScript, C/C++, Bash, SQL' },
          { type: 'out', text: '  AI & ML: CatBoost, XGBoost, Scikit-Learn, PyTorch, BERT, On-Device Llama.cpp, FastAPI' },
          { type: 'out', text: '  Frontend & Mobile: React 19/18, Jetpack Compose, Three.js / Canvas 2D, Tailwind CSS' },
          { type: 'out', text: '  DevOps & Systems: Docker, Manifest V3, PostgreSQL, Async SQLite, Linux/antiX, Git Actions' }
        );
        break;

      case 'contact':
      case 'socials':
        newHistory.push(
          { type: 'sys', text: '📬 SECURE COMMUNICATIONS DIRECTORY:' },
          { type: 'out', text: '  Email:    codewithharshitsharma@gmail.com' },
          { type: 'out', text: '  GitHub:   https://github.com/harshitthek' },
          { type: 'out', text: '  LinkedIn: https://www.linkedin.com/in/devharshitsharma' },
          { type: 'out', text: '  Discord:  harshit0' }
        );
        break;

      case 'weather':
        newHistory.push({
          type: 'info',
          text: `📡 NEW DELHI TELEMETRY RADAR [28.6139° N, 77.2090° E]
Condition: Clear Cyber Sky · Temp: 29°C / 84°F · Humidity: 54% · Wind: 8 km/h NW`
        });
        break;

      case 'cowsay':
        const msg = arg || "Harshit Sharma builds resilient autonomous AI systems!";
        const bar = '-'.repeat(msg.length + 2);
        newHistory.push({
          type: 'code',
          text: ` ${bar}
< ${msg} >
 ${bar}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`
        });
        break;

      case 'fortune':
        const randomFortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
        newHistory.push({ type: 'info', text: `🔮 ${randomFortune}` });
        break;

      case 'matrix':
        newHistory.push(
          { type: 'ok', text: '01001000 01100001 01110010 01110011 01101000 01101001 01110100' },
          { type: 'ok', text: '日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ 01010101 01010011 01000001 01010010' },
          { type: 'ok', text: '10110001 01110100 01101000 01100101 01101011 // HARSHIT_NEURAL_STREAM' },
          { type: 'ok', text: 'AI_PIPELINE_CONVERGED // NEURAL SYNAPSE ONLINE 100%' }
        );
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'exit':
        onClose();
        return;

      default:
        newHistory.push({ type: 'err', text: `zsh: command not found: ${cmd}. Type 'help' to see all commands.` });
        break;
    }

    setHistory(newHistory);
  };

  const handleKeyDown = (e) => {
    // If inside Snake Game, intercept all game keys and ESC so ESC does NOT close modal!
    if (snakeGameActive) {
      if (['ArrowUp', 'w', 'W'].includes(e.key)) {
        e.preventDefault();
        changeSnakeDirection('UP');
      } else if (['ArrowDown', 's', 'S'].includes(e.key)) {
        e.preventDefault();
        changeSnakeDirection('DOWN');
      } else if (['ArrowLeft', 'a', 'A'].includes(e.key)) {
        e.preventDefault();
        changeSnakeDirection('LEFT');
      } else if (['ArrowRight', 'd', 'D'].includes(e.key)) {
        e.preventDefault();
        changeSnakeDirection('RIGHT');
      } else if (['Escape', 'q', 'Q'].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        setSnakeGameActive(false);
        setHistory(h => [...h, { type: 'info', text: `🎮 Snake session exited. Score: ${snakeScore} PTS` }]);
      }
      return;
    }

    // Handle Ctrl+C inside terminal to cancel active line without opening Code modal
    if (e.ctrlKey && (e.key === 'c' || e.key === 'C')) {
      e.preventDefault();
      e.stopPropagation();
      setHistory(prev => [...prev, { type: 'cmd', text: `harshit@usar-delhi ${currentPath} % ${inputVal}^C` }]);
      setInputVal('');
      return;
    }

    SoundFX.playKey();

    if (e.key === 'Enter') {
      handleCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const curr = inputVal.trim().toLowerCase();
      if (!curr) return;
      const allCommands = [
        'help', 'neofetch', 'bio', 'about', 'ai', 'ask', 'snake', 'hack', 'top', 'theme',
        'ls', 'cd', 'pwd', 'cat', 'tree', 'projects', 'skills', 'deploy', 'contact',
        'socials', 'weather', 'cowsay', 'fortune', 'matrix', 'clear', 'exit'
      ];
      const match = allCommands.find(c => c.startsWith(curr));
      if (match) setInputVal(match);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = historyIndex + 1 < cmdHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx] || '');
      } else {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  const quickChips = [
    { label: '⚡ neofetch', cmd: 'neofetch' },
    { label: '🤖 ai "Why hire Harshit?"', cmd: 'ai why hire Harshit?' },
    { label: '🎮 snake (60fps)', cmd: 'snake' },
    { label: '🔓 hack', cmd: 'hack' },
    { label: '📊 top', cmd: 'top' },
    { label: '🌲 tree', cmd: 'tree' },
    { label: '🚀 deploy 1', cmd: 'deploy 1' },
    { label: '🎨 theme cyan', cmd: 'theme cyan' }
  ];

  const activeThemeObj = THEMES[currentTheme] || THEMES.green;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className={`modal-card glass-modal terminal-modal ${isFullScreen ? 'fullscreen-terminal' : ''}`}
        style={{
          borderColor: activeThemeObj.primary,
          boxShadow: `0 25px 90px rgba(0,0,0,0.95), 0 0 45px ${activeThemeObj.glow}`
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header terminal-hud-header">
          <div className="terminal-dots">
            <span className="t-dot red" onClick={onClose} title="Close Terminal"></span>
            <span className="t-dot yellow" onClick={() => setHistory([])} title="Clear Terminal"></span>
            <span className="t-dot green" onClick={() => setIsFullScreen(!isFullScreen)} title="Toggle Fullscreen"></span>
          </div>

          <div className="terminal-title-text" style={{ color: activeThemeObj.primary }}>
            harshit@usar-delhi: {currentPath} (zsh) · [{activeThemeObj.label}]
          </div>

          <div className="terminal-header-actions">
            <button
              className="btn-term-fs"
              onClick={() => setIsFullScreen(!isFullScreen)}
              title={isFullScreen ? 'Restore Window' : 'Expand Fullscreen'}
            >
              {isFullScreen ? '🗗 RESTORE' : '🗖 FULLSCREEN'}
            </button>
            <button
              className="modal-close-btn"
              onClick={() => { SoundFX.playClick(); onClose(); }}
            >
              ✕
            </button>
          </div>
        </div>

        <div
          className="modal-body terminal-modal-body custom-scroll"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((line, idx) => (
            <div key={idx} className={`term-line line-${line.type}`}>
              {line.type === 'neofetch' || line.type === 'code' ? (
                <pre style={{ color: activeThemeObj.primary }}>{line.text}</pre>
              ) : (
                <span>{line.text}</span>
              )}
            </div>
          ))}

          {/* Arcade Canvas Snake Game */}
          {snakeGameActive && (
            <div className="arcade-snake-container">
              <div className="snake-arcade-hud">
                <div className="snake-stats-left">
                  <span className="snake-badge">🐍 ARCADE CANVAS ENGINE</span>
                  <span className="snake-score-display">SCORE: <strong>{snakeScore}</strong></span>
                  <span className="snake-hi-display">HIGH: <strong>{snakeHighScore}</strong></span>
                </div>
                <div className="snake-speed-selector">
                  <span>SPEED:</span>
                  {['normal', 'fast', 'insane'].map(s => (
                    <button
                      key={s}
                      className={`btn-speed-chip ${snakeSpeed === s ? 'active' : ''}`}
                      onClick={() => { SoundFX.playKey(); setSnakeSpeed(s); }}
                    >
                      {s.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="snake-canvas-wrapper">
                <canvas
                  ref={snakeCanvasRef}
                  className="snake-game-canvas"
                />

                {/* On-Screen D-Pad Controls for Touch / Mouse */}
                <div className="snake-dpad-controls">
                  <button className="dpad-btn up" onClick={() => changeSnakeDirection('UP')}>▲</button>
                  <div className="dpad-mid-row">
                    <button className="dpad-btn left" onClick={() => changeSnakeDirection('LEFT')}>◀</button>
                    <button className="dpad-btn right" onClick={() => changeSnakeDirection('RIGHT')}>▶</button>
                  </div>
                  <button className="dpad-btn down" onClick={() => changeSnakeDirection('DOWN')}>▼</button>
                </div>
              </div>

              {snakeGameOver ? (
                <div className="snake-gameover-overlay">
                  <span className="over-title">💀 GAME OVER // FINAL SCORE: {snakeScore} PTS</span>
                  <div className="over-buttons">
                    <button className="btn-snake-act retry" onClick={startSnakeGame}>↺ PLAY AGAIN</button>
                    <button className="btn-snake-act quit" onClick={() => setSnakeGameActive(false)}>QUIT TO SHELL</button>
                  </div>
                </div>
              ) : (
                <div className="snake-game-footer-bar">
                  <span>Controls: Arrow Keys or W / A / S / D</span>
                  <button className="btn-snake-quit-inline" onClick={() => setSnakeGameActive(false)}>QUIT GAME (ESC)</button>
                </div>
              )}
            </div>
          )}

          {!snakeGameActive && (
            <div className="term-input-row">
              <span className="term-prompt" style={{ color: activeThemeObj.primary }}>
                harshit@usar {currentPath} %
              </span>
              <input
                ref={inputRef}
                type="text"
                className="term-input-field"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                spellCheck="false"
                placeholder="type 'help'..."
              />
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="terminal-quick-chips-bar">
          <span className="chips-label">QUICK CMDS:</span>
          {quickChips.map((chip, idx) => (
            <button
              key={idx}
              className="term-chip-btn"
              onClick={() => {
                SoundFX.playClick();
                handleCommand(chip.cmd);
              }}
            >
              {chip.label}
            </button>
          ))}
        </div>

        <div className="modal-footer terminal-footer-tips">
          <span>TIPS: Press <kbd>Tab</kbd> to autocomplete · <kbd>Ctrl+C</kbd> to cancel line · <kbd>↑</kbd>/<kbd>↓</kbd> for history</span>
        </div>
      </div>
    </div>
  );
}
