import confetti from 'canvas-confetti';
import { useCallback, useEffect, useRef, useState } from 'react';
import { projectsData } from '../../data/projectsData';
import { SoundFX } from '../SoundFX';

// Full Virtual Filesystem Structure
const VIRTUAL_FS = {
  '~': {
    type: 'dir',
    children: {
      'bio.txt': {
        type: 'file',
        size: '1.8 KB',
        content: `=====================================================
HARSHIT SHARMA // ARTIFICIAL INTELLIGENCE & SYSTEMS ENGINEER
=====================================================
Degree      : B.Tech in Artificial Intelligence & Machine Learning (Class of 2029)
Location    : New Delhi, India
GitHub      : https://github.com/harshitthek
LinkedIn    : https://www.linkedin.com/in/devharshitsharma
Email       : codewithharshitsharma@gmail.com
Server      : Oracle Cloud Infrastructure (OCI Ampere A1 ARM64) [144.24.104.31]
Domains     : harshitthek.is-a.dev · harshit.thedev.id

Core Technical Arsenal:
- Autonomous Multi-Agent LLM Orchestration & Evaluation Pipelines
- CatBoost & XGBoost Stacking ML Ensembles with 97.4% R² Confidence
- Fine-Tuned BERT NLP Deep Learning Departmental Classifiers
- High-Performance Chrome Manifest V3 Network Engines (DeclarativeNetRequest)
- Deterministic Constraint Reducers & Search-Space Budgeting
- Bare-Metal Linux Systems, Nginx Reverse Proxies & GitOps CI/CD
- GPU-Accelerated 3D WebGL / Three.js Visual Engines (60 FPS)`
      },
      'contact.json': {
        type: 'file',
        size: '620 B',
        content: JSON.stringify(
          {
            name: 'Harshit Sharma',
            role: 'AI Engineer & ML Systems Architect',
            degree: 'B.Tech AI & ML (Class of 2029)',
            location: 'New Delhi, India',
            email: 'codewithharshitsharma@gmail.com',
            github: 'https://github.com/harshitthek',
            linkedin: 'https://www.linkedin.com/in/devharshitsharma',
            discord: 'harshit0',
            domains: ['harshitthek.is-a.dev', 'harshit.thedev.id'],
            status: 'Open to AI/ML Research, LLM Agent Engineering & Systems Roles'
          },
          null,
          2
        )
      },
      'id_rsa.pub': {
        type: 'file',
        size: '740 B',
        content:
          'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIHarshitSharmaProductionAIKey2026 harshit@neural-core'
      },
      projects: {
        type: 'dir',
        children: {
          '01_yggdrasil.py': {
            type: 'file',
            size: '3.6 KB',
            content: `"""
PORT_01: Yggdrasil (World Tree) Platform
Architecture: Discord.js + Fastify Single-Process Backend on antiX Linux
Crypto: AES-256-GCM Session Encryption with HKDF Key Derivation
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
        print(f"[*] Parsing query through Yggdrasil Memory Graph: {user_prompt}")
        await asyncio.sleep(0.04)
        return [
            ThoughtNode("branch-01", "Vector similarity retrieval across knowledge base", 0.96),
            ThoughtNode("branch-02", "Autonomous code synthesis in isolated sandbox", 0.99)
        ]`
          },
          '02_resilient_agent.py': {
            type: 'file',
            size: '4.2 KB',
            content: `"""
PORT_02: Resilient AI Benchmark — Autonomous Agent Leaderboard
Isolation: Ephemeral Docker Git Sandboxes
Auth: RS256 JWT Authenticated GitHub App (resilient-bot)
Test Matrix: 47/47 Passing Pytests
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
            network_mode="none",
            mem_limit="4g"
        )
        print(f"[✓] Isolated container spawned for Issue #{self.issue_id}")
        return container`
          },
          '03_autovaluate_model.py': {
            type: 'file',
            size: '4.8 KB',
            content: `"""
PORT_03: AutoValuate AI — Dual-Engine Vehicle Resale Valuation Suite
Trained On: 40,000+ Real Transactions (32k Bikes + 8k Cars, 23+ Brands)
Stacking: CatBoost + XGBoost + LightGBM (97.4% R² Confidence)
Features: 5-Year TCO Lifecycle, Batch Appraisals, SHA-256 Certificates
Tests: 56 Automated Tests (37 Pytest + 19 Vitest)
"""
import pandas as pd
from catboost import CatBoostRegressor
from xgboost import XGBRegressor
from sklearn.ensemble import StackingRegressor, RandomForestRegressor

class AutoValuateDualEngine:
    def __init__(self, vehicle_type: str = "bike"):
        self.vehicle_type = vehicle_type
        self.base_estimators = [
            ("catboost", CatBoostRegressor(iterations=650, depth=7, learning_rate=0.04, verbose=0)),
            ("xgboost", XGBRegressor(n_estimators=500, max_depth=6, learning_rate=0.03, random_state=42))
        ]
        self.meta_regressor = RandomForestRegressor(n_estimators=120, max_depth=8, random_state=42)
        self.model = StackingRegressor(
            estimators=self.base_estimators,
            final_estimator=self.meta_regressor,
            cv=5
        )

    def predict_valuation(self, X):
        return self.model.predict(X)`
          },
          '04_support_dispatcher_bert.py': {
            type: 'file',
            size: '3.8 KB',
            content: `"""
PORT_04: Customer Support Ticket Dispatcher ML
NLP Model: Fine-Tuned BERT Self-Attention Transformer
Classification: Multi-Department Routing (Technical, Billing, Logistics, Accounts)
Latency: Sub-120ms Real-Time Inference
"""
import torch
from transformers import BertForSequenceClassification, BertTokenizer

class TicketDispatcher:
    def __init__(self):
        self.tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
        self.model = BertForSequenceClassification.from_pretrained("./saved_models/ticket_bert")
        self.departments = ["Technical", "Billing", "Logistics", "Accounts"]

    def route_ticket(self, email_body: str):
        inputs = self.tokenizer(email_body, return_tensors="pt", truncation=True, max_length=512)
        with torch.no_grad():
            logits = self.model(**inputs).logits
            probs = torch.softmax(logits, dim=-1)
            pred_idx = torch.argmax(probs, dim=-1).item()
            urgency_score = float(probs[0][pred_idx])
            
        return {
            "department": self.departments[pred_idx],
            "confidence": urgency_score,
            "sla_priority": "CRITICAL" if urgency_score > 0.85 else "NORMAL"
        }`
          },
          '05_shieldblock_mv3.js': {
            type: 'file',
            size: '3.1 KB',
            content: `// PORT_05: ShieldBlock — Next-Gen Manifest V3 Extension
// Engine: Native declarativeNetRequest (DNR) Zero-CPU Blocking
// Features: 16x Audio Ad Acceleration, Live Network Streaming Logger

chrome.declarativeNetRequest.updateDynamicRules({
  addRules: [
    {
      id: 101,
      priority: 1,
      action: { type: 'block' },
      condition: {
        urlFilter: '||doubleclick.net^',
        resourceTypes: ['script', 'image', 'xmlhttprequest']
      }
    }
  ]
});
console.log('[✓] ShieldBlock DNR Core Active. Zero main-thread CPU overhead.');`
          },
          '06_carbon_guardian.py': {
            type: 'file',
            size: '3.4 KB',
            content: `"""
PORT_06: Carbon Guardian AI — Enterprise ESG Telemetry Platform
Engine: TensorFlow Recommenders + FastAPI + React 19
Features: Hardware Telemetry, Grid Shift Insights, Dynamic RBAC Economy
"""
import tensorflow as tf
import numpy as np

class CarbonRecommender(tf.keras.Model):
    def __init__(self):
        super().__init__()
        self.user_embedding = tf.keras.layers.Embedding(1000, 32)
        self.action_embedding = tf.keras.layers.Embedding(250, 32)
        
    def call(self, inputs):
        user_vector = self.user_embedding(inputs["user_id"])
        action_vector = self.action_embedding(inputs["action_id"])
        return tf.reduce_sum(user_vector * action_vector, axis=1)`
          },
          '07_letter_guess_engine.py': {
            type: 'file',
            size: '3.2 KB',
            content: `"""
PORT_07: LetterGuess — Deterministic Constraint Analysis Engine
Architecture: Offline Python / SQLite Desktop Engine
Algorithms: Search-Space Budgeting, Conservative Regex Extraction, Replay Provenance
"""
import sqlite3
import re
from typing import List, Set

class ConstraintSolver:
    def __init__(self, db_path: str = "letter_guess.db"):
        self.conn = sqlite3.connect(db_path)
        
    def filter_candidates(self, pattern: str, excluded_chars: Set[str]) -> List[str]:
        regex_pattern = f"^{pattern.replace('_', '[a-zA-Z]')}$"
        cursor = self.conn.cursor()
        cursor.execute("SELECT word FROM dictionary WHERE length = ?", (len(pattern),))
        words = [row[0] for row in cursor.fetchall()]
        
        valid = [
            w for w in words 
            if re.match(regex_pattern, w) and not any(c in w for c in excluded_chars)
        ]
        return valid`
          },
          '08_browser_startpage.js': {
            type: 'file',
            size: '2.5 KB',
            content: `// PORT_08: Custom Browser Startpage v2.0
// Features: 13 Premium Themes, CSP Security, OpenWeatherMap Telemetry
// Bundle Size: <15KB Zero-Dependency Vanilla JavaScript

const THEMES = ['cyberpunk', 'aurora', 'northern-lights', 'sunset', 'midnight', 'dark-slate'];
function applyTheme(themeName) {
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('startpage_theme', themeName);
}`
          },
          '09_cosmic_webgl.js': {
            type: 'file',
            size: '3.0 KB',
            content: `// PORT_09: 3D Cosmic WebGL Engine
// Library: Three.js r128 + Custom GLSL Particle Vertex Shaders
// Performance: Locked 60 FPS across Desktop and Mobile

import * as THREE from 'three';

const scene = new THREE.Scene();
const geometry = new THREE.BufferGeometry();
const particleCount = 1200;
const positions = new Float32Array(particleCount * 3);`
          },
          '10_cyber_terminal.js': {
            type: 'file',
            size: '2.8 KB',
            content: `// PORT_10: Harshit's Cyber Terminal & Inspector
// Emulation: Interactive Zsh Shell with 16+ Built-in Commands
// Features: 60fps Arcade Canvas Snake, HMAC-SHA256 Verifier, PostgreSQL Schema Viewer`
          }
        }
      },
      skills: {
        type: 'dir',
        children: {
          'stack.json': {
            type: 'file',
            size: '980 B',
            content: JSON.stringify(
              {
                languages: [
                  'Python 3.12',
                  'JavaScript (ES6+)',
                  'TypeScript',
                  'C/C++',
                  'SQL',
                  'Bash'
                ],
                ai_machine_learning: [
                  'CatBoost',
                  'XGBoost',
                  'Scikit-Learn',
                  'PyTorch',
                  'BERT Transformers',
                  'TensorFlow',
                  'FastAPI'
                ],
                frontend_3d: [
                  'React 19 / 18',
                  'Three.js / WebGL',
                  'HTML5 Canvas 2D',
                  'Vite',
                  'Tailwind CSS'
                ],
                devops_systems: [
                  'Docker Containers',
                  'PostgreSQL',
                  'Async SQLite',
                  'Manifest V3',
                  'Linux (antiX / Ubuntu)',
                  'GitHub CI/CD'
                ]
              },
              null,
              2
            )
          }
        }
      },
      secrets: {
        type: 'dir',
        children: {
          'flag.txt': {
            type: 'file',
            size: '64 B',
            content: 'FLAG{HARSHIT_SHARMA_AI_SYSTEMS_ENGINEER_2026_VERIFIED}'
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
  '"Simplicity is prerequisite for reliability." — Edsger W. Dijkstra',
  '"The best way to predict the future is to invent it." — Alan Kay',
  '"Autonomous agents will write code, verify code, and deploy code — engineer the harness." — Harshit Sharma',
  '"Programs must be written for people to read, and only incidentally for machines to execute." — Hal Abelson',
  '"Talk is cheap. Show me the code." — Linus Torvalds',
  '"Any sufficiently advanced technology is indistinguishable from magic." — Arthur C. Clarke'
];

// Helper: Normalize Unix-like path relative to virtual filesystem
function resolvePath(targetPath, currentPath) {
  if (!targetPath || targetPath === '~' || targetPath === '/') return '~';

  let parts;
  if (targetPath.startsWith('~/')) {
    parts = targetPath.slice(2).split('/').filter(Boolean);
  } else if (targetPath.startsWith('/')) {
    parts = targetPath.slice(1).split('/').filter(Boolean);
  } else {
    const base = currentPath === '~' ? [] : currentPath.slice(2).split('/').filter(Boolean);
    const targetParts = targetPath.split('/').filter(Boolean);
    parts = [...base];
    for (const p of targetParts) {
      if (p === '.') continue;
      if (p === '..') {
        if (parts.length > 0) parts.pop();
      } else {
        parts.push(p);
      }
    }
  }

  if (parts.length === 0) return '~';
  return `~/${parts.join('/')}`;
}

function getNodeFromVFS(normalizedPath) {
  if (normalizedPath === '~') return VIRTUAL_FS['~'];
  const parts = normalizedPath.slice(2).split('/').filter(Boolean);
  let curr = VIRTUAL_FS['~'];
  for (const part of parts) {
    if (curr?.type !== 'dir' || !curr.children || !curr.children[part]) {
      return null;
    }
    curr = curr.children[part];
  }
  return curr;
}

export default function TerminalModal({ onClose, onLaunch }) {
  const [history, setHistory] = useState([
    {
      type: 'sys',
      text: '╔══════════════════════════════════════════════════════════════════════╗'
    },
    {
      type: 'sys',
      text: '║     HARSHIT SHARMA CYBER LAB INTERACTIVE ZSH SHELL [v6.9.0-PRO]      ║'
    },
    {
      type: 'sys',
      text: '║     Host: Neural AI Engine · Clearance: LEVEL 5 ROOT                 ║'
    },
    {
      type: 'sys',
      text: '╚══════════════════════════════════════════════════════════════════════╝'
    },
    {
      type: 'info',
      text: "Type 'help' for full command suite, or try: 'neofetch', 'ai <query>', 'snake', 'hack', 'top'."
    },
    { type: 'space', text: '' }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [draftInput, setDraftInput] = useState('');
  const [currentPath, setCurrentPath] = useState('~');
  const [currentTheme, setCurrentTheme] = useState('green');
  const [isFullScreen, setIsFullScreen] = useState(false);

  const activeThemeObj = THEMES[currentTheme] || THEMES.green;

  // ── MATRIX DIGITAL RAIN STATE ──
  const [matrixActive, setMatrixActive] = useState(false);
  const matrixCanvasRef = useRef(null);
  const matrixAnimRef = useRef(null);

  // ── 60FPS ARCADE CANVAS SNAKE STATE ──
  const [snakeGameActive, setSnakeGameActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [snakeScore, setSnakeScore] = useState(0);
  const [snakeMode, setSnakeMode] = useState('wrap'); // 'wrap' | 'walls'
  const [snakeSpeed, setSnakeSpeed] = useState('normal'); // 'normal' | 'fast' | 'insane'
  const [combo, setCombo] = useState(1);
  const [maxCombo, setMaxCombo] = useState(1);
  const [applesEaten, setApplesEaten] = useState(0);
  const [activePowerUp, setActivePowerUp] = useState(null); // 'SHIELD' | 'SLOW' | '2X' | 'MAGNET'
  const [snakeGameOver, setSnakeGameOver] = useState(false);
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  const getHighScoreKey = useCallback(
    () => `harshit_snake_hi_${snakeMode}_${snakeSpeed}`,
    [snakeMode, snakeSpeed]
  );

  const [snakeHighScore, setSnakeHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('harshit_snake_hi_wrap_normal') || '0', 10);
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    try {
      const saved = parseInt(localStorage.getItem(getHighScoreKey()) || '0', 10);
      setSnakeHighScore(saved);
    } catch {
      setSnakeHighScore(0);
    }
  }, [getHighScoreKey]);

  const snakeCanvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const lastTickTimeRef = useRef(0);

  // Mutable Game State Ref for zero-lag 60fps execution
  const snakeStateRef = useRef({
    snake: [
      { x: 7, y: 7 },
      { x: 6, y: 7 },
      { x: 5, y: 7 },
      { x: 4, y: 7 }
    ],
    food: { x: 18, y: 7 },
    goldenFood: null,
    powerUpItem: null,
    dir: { x: 1, y: 0 },
    dirQueue: [],
    particles: [],
    floatingTexts: [],
    deathFragments: [],
    shockwave: null,
    isDying: false,
    deathFrames: 0,
    lastEatTime: 0,
    hasShield: false,
    hasMagnet: false,
    score: 0,
    combo: 1,
    maxCombo: 1,
    apples: 0
  });

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const modalBodyRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const scrollToBottom = useCallback(() => {
    if (modalBodyRef.current && !snakeGameActive) {
      modalBodyRef.current.scrollTop = modalBodyRef.current.scrollHeight;
    }
  }, [snakeGameActive]);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  // Turn buffer queue
  const changeSnakeDirection = useCallback((dirKey) => {
    const state = snakeStateRef.current;
    if (state.isDying) return;

    const currentOrLastQueued =
      state.dirQueue.length > 0 ? state.dirQueue[state.dirQueue.length - 1] : state.dir;

    let nextDir = null;
    if (dirKey === 'UP' && currentOrLastQueued.y === 0) nextDir = { x: 0, y: -1 };
    if (dirKey === 'DOWN' && currentOrLastQueued.y === 0) nextDir = { x: 0, y: 1 };
    if (dirKey === 'LEFT' && currentOrLastQueued.x === 0) nextDir = { x: -1, y: 0 };
    if (dirKey === 'RIGHT' && currentOrLastQueued.x === 0) nextDir = { x: 1, y: 0 };

    if (nextDir && state.dirQueue.length < 3) {
      state.dirQueue.push(nextDir);
      SoundFX.playKey();
    }
  }, []);

  const startSnakeGame = useCallback(() => {
    lastTickTimeRef.current = 0;
    snakeStateRef.current = {
      snake: [
        { x: 7, y: 7 },
        { x: 6, y: 7 },
        { x: 5, y: 7 },
        { x: 4, y: 7 }
      ],
      food: { x: 18, y: 7 },
      goldenFood: null,
      powerUpItem: null,
      dir: { x: 1, y: 0 },
      dirQueue: [],
      particles: [],
      floatingTexts: [],
      deathFragments: [],
      shockwave: null,
      isDying: false,
      deathFrames: 0,
      lastEatTime: 0,
      hasShield: false,
      hasMagnet: false,
      invulnerableUntil: 0,
      score: 0,
      combo: 1,
      maxCombo: 1,
      apples: 0
    };
    setSnakeScore(0);
    setCombo(1);
    setMaxCombo(1);
    setApplesEaten(0);
    setActivePowerUp(null);
    setIsPaused(false);
    setSnakeGameOver(false);
    setIsNewHighScore(false);
    setSnakeGameActive(true);
    SoundFX.playClick();
  }, []);

  // Mobile Touch Swipe Handling
  const touchStartPosRef = useRef({ x: 0, y: 0 });
  const handleCanvasTouchStart = (e) => {
    if (e.touches?.[0]) {
      touchStartPosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };
  const handleCanvasTouchEnd = (e) => {
    if (e.changedTouches?.[0]) {
      const dx = e.changedTouches[0].clientX - touchStartPosRef.current.x;
      const dy = e.changedTouches[0].clientY - touchStartPosRef.current.y;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);
      if (Math.max(absX, absY) > 18) {
        if (absX > absY) {
          changeSnakeDirection(dx > 0 ? 'RIGHT' : 'LEFT');
        } else {
          changeSnakeDirection(dy > 0 ? 'DOWN' : 'UP');
        }
      }
    }
  };

  // ── 60FPS FULL-TERMINAL HIGH-PERFORMANCE SNAKE ENGINE ──
  useEffect(() => {
    if (!snakeGameActive || snakeGameOver) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const canvas = snakeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Full-terminal resolution: 28 cols x 18 rows with 20px grid
    const gridSize = 20;
    const cols = 28;
    const rows = 18;
    const width = cols * gridSize;
    const height = rows * gridSize;
    canvas.width = width;
    canvas.height = height;

    // High-performance speeds: Snappy, instant response
    const speedIntervals = { normal: 68, fast: 44, insane: 26 };

    // Pre-rendered Static Cyber Matrix Background Buffer (Offscreen Canvas)
    const bgCanvas = document.createElement('canvas');
    bgCanvas.width = width;
    bgCanvas.height = height;
    const bgCtx = bgCanvas.getContext('2d');
    if (bgCtx) {
      // 1. Ambient Gradient
      const bgGrad = bgCtx.createRadialGradient(
        width / 2,
        height / 2,
        40,
        width / 2,
        height / 2,
        width * 0.7
      );
      bgGrad.addColorStop(0, '#0c1218');
      bgGrad.addColorStop(1, '#040507');
      bgCtx.fillStyle = bgGrad;
      bgCtx.fillRect(0, 0, width, height);

      // 2. Micro-Dashed Sub-Grid Guide Lines
      bgCtx.setLineDash([2, 6]);
      bgCtx.strokeStyle = 'rgba(56, 189, 248, 0.05)';
      bgCtx.lineWidth = 1;
      for (let x = 1; x < cols; x++) {
        bgCtx.beginPath();
        bgCtx.moveTo(x * gridSize, 0);
        bgCtx.lineTo(x * gridSize, height);
        bgCtx.stroke();
      }
      for (let y = 1; y < rows; y++) {
        bgCtx.beginPath();
        bgCtx.moveTo(0, y * gridSize);
        bgCtx.lineTo(width, y * gridSize);
        bgCtx.stroke();
      }
      bgCtx.setLineDash([]);

      // 3. Glowing Micro-Crosshairs at intersections
      bgCtx.fillStyle = 'rgba(0, 255, 136, 0.16)';
      for (let x = 1; x < cols; x++) {
        for (let y = 1; y < rows; y++) {
          const px = x * gridSize;
          const py = y * gridSize;
          bgCtx.fillRect(px - 2, py, 5, 1);
          bgCtx.fillRect(px, py - 2, 1, 5);
        }
      }

      // 4. Center Sector Target Reticle
      const midX = Math.floor(cols / 2) * gridSize;
      const midY = Math.floor(rows / 2) * gridSize;
      bgCtx.strokeStyle = 'rgba(56, 189, 248, 0.18)';
      bgCtx.lineWidth = 1;
      bgCtx.beginPath();
      bgCtx.arc(midX, midY, 14, 0, Math.PI * 2);
      bgCtx.stroke();
      bgCtx.fillStyle = 'rgba(56, 189, 248, 0.25)';
      bgCtx.beginPath();
      bgCtx.arc(midX, midY, 2, 0, Math.PI * 2);
      bgCtx.fill();

      // 5. Corner HUD Brackets
      const bracketColor = snakeMode === 'walls' ? '#f87171' : 'rgba(0, 255, 136, 0.45)';
      bgCtx.strokeStyle = bracketColor;
      bgCtx.lineWidth = 2;
      bgCtx.beginPath();
      bgCtx.moveTo(14, 5);
      bgCtx.lineTo(5, 5);
      bgCtx.lineTo(5, 14);
      bgCtx.moveTo(width - 14, 5);
      bgCtx.lineTo(width - 5, 5);
      bgCtx.lineTo(width - 5, 14);
      bgCtx.moveTo(5, height - 14);
      bgCtx.lineTo(5, height - 5);
      bgCtx.lineTo(14, height - 5);
      bgCtx.moveTo(width - 14, height - 5);
      bgCtx.lineTo(width - 5, height - 5);
      bgCtx.lineTo(width - 5, height - 14);
      bgCtx.stroke();

      // 6. Perimeter Frame
      if (snakeMode === 'walls') {
        bgCtx.strokeStyle = '#f87171';
        bgCtx.lineWidth = 2;
        bgCtx.shadowColor = '#f87171';
        bgCtx.shadowBlur = 8;
        bgCtx.strokeRect(1, 1, width - 2, height - 2);
        bgCtx.shadowBlur = 0;
      } else {
        bgCtx.strokeStyle = 'rgba(0, 255, 136, 0.12)';
        bgCtx.lineWidth = 1;
        bgCtx.strokeRect(1, 1, width - 2, height - 2);
      }
    }

    const getRandomEmptyCell = () => {
      const state = snakeStateRef.current;
      let cell;
      let attempts = 0;
      while (
        (!cell || state.snake.some((s) => s.x === cell.x && s.y === cell.y)) &&
        attempts < 100
      ) {
        attempts++;
        cell = {
          x: Math.floor(Math.random() * cols),
          y: Math.floor(Math.random() * rows)
        };
      }
      return cell || { x: 5, y: 5 };
    };

    const stepGameLogic = () => {
      const state = snakeStateRef.current;
      const now = Date.now();

      if (state.dirQueue.length > 0) {
        state.dir = state.dirQueue.shift();
      }

      if (state.activePowerUp && state.activePowerUp.expiresAt <= now) {
        state.activePowerUp = null;
        state.hasShield = false;
        state.hasMagnet = false;
        setActivePowerUp(null);
      }

      if (state.lastEatTime > 0 && now - state.lastEatTime > 3500) {
        state.combo = 1;
        setCombo(1);
      }

      if (state.goldenFood && state.goldenFood.expiresAt <= now) {
        state.goldenFood = null;
      }

      if (state.powerUpItem && state.powerUpItem.expiresAt <= now) {
        state.powerUpItem = null;
      }

      // Magnetic Attraction Effect (Pulls nearby orbs towards head)
      if (state.hasMagnet) {
        const headCur = state.snake[0];
        const distFood = Math.hypot(state.food.x - headCur.x, state.food.y - headCur.y);
        if (distFood > 0 && distFood <= 4 && Math.random() > 0.4) {
          if (state.food.x < headCur.x) state.food.x++;
          else if (state.food.x > headCur.x) state.food.x--;
          if (state.food.y < headCur.y) state.food.y++;
          else if (state.food.y > headCur.y) state.food.y--;
        }
      }

      const head = {
        x: state.snake[0].x + state.dir.x,
        y: state.snake[0].y + state.dir.y
      };

      const isInvulnerable = Boolean(state.invulnerableUntil && state.invulnerableUntil > now);

      let hitWall = false;
      if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
        if (snakeMode === 'walls') {
          hitWall = true;
        } else {
          if (head.x < 0) head.x = cols - 1;
          if (head.x >= cols) head.x = 0;
          if (head.y < 0) head.y = rows - 1;
          if (head.y >= rows) head.y = 0;
        }
      }

      // In phase immunity or shield, self collisions are deflected/ignored
      const hitSelf =
        !isInvulnerable && state.snake.slice(1).some((seg) => seg.x === head.x && seg.y === head.y);

      // 💥 SHIELD DEFLECTION & INVULNERABILITY VS CYBER VOXEL DISINTEGRATION
      if (hitWall || hitSelf) {
        if (state.hasShield || isInvulnerable) {
          if (state.hasShield) {
            state.hasShield = false;
            state.activePowerUp = null;
            setActivePowerUp(null);
            state.invulnerableUntil = now + 2500; // 2.5s phase immunity!
            SoundFX.playDeploy();
            state.floatingTexts.push({
              x: canvas.width / 2,
              y: canvas.height / 2,
              text: '🛡️ SHIELD ABSORB! PHASE IMMUNITY (2.5s)',
              color: '#38bdf8',
              life: 1.5
            });

            // Glowing Cyan Shockwave Burst
            state.shockwave = {
              x: (head.x < 0 ? 0 : head.x >= cols ? cols - 1 : head.x) * gridSize + gridSize / 2,
              y: (head.y < 0 ? 0 : head.y >= rows ? rows - 1 : head.y) * gridSize + gridSize / 2,
              radius: 6,
              maxRadius: 180,
              alpha: 1.0,
              color: '#38bdf8'
            };

            // Shield Burst Plasma Sparks
            for (let i = 0; i < 14; i++) {
              state.particles.push({
                x: (head.x < 0 ? 0 : head.x >= cols ? cols - 1 : head.x) * gridSize + gridSize / 2,
                y: (head.y < 0 ? 0 : head.y >= rows ? rows - 1 : head.y) * gridSize + gridSize / 2,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: 1.0,
                color: '#38bdf8'
              });
            }
          }

          if (hitWall) {
            // Auto-deflect / bounce inside bounds and reverse direction
            if (head.x < 0) {
              head.x = 0;
              state.dir = { x: 1, y: 0 };
            } else if (head.x >= cols) {
              head.x = cols - 1;
              state.dir = { x: -1, y: 0 };
            }
            if (head.y < 0) {
              head.y = 0;
              state.dir = { x: 0, y: 1 };
            } else if (head.y >= rows) {
              head.y = rows - 1;
              state.dir = { x: 0, y: -1 };
            }
          }
        } else {
          // Fatal Crash
          state.isDying = true;
          state.deathFrames = 0;
          SoundFX.playDeploy();

          // Exploding Voxels
          state.deathFragments = [];
          state.snake.forEach((seg, i) => {
            for (let f = 0; f < 4; f++) {
              const angle = Math.random() * Math.PI * 2;
              const spd = 2.0 + Math.random() * 5.5;
              state.deathFragments.push({
                x: seg.x * gridSize + (f % 2) * 10,
                y: seg.y * gridSize + Math.floor(f / 2) * 10,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd,
                size: 3 + Math.random() * 4,
                rot: Math.random() * Math.PI * 2,
                vRot: (Math.random() - 0.5) * 0.4,
                color: i === 0 ? '#ff5f56' : i % 2 === 0 ? '#00ff88' : '#38bdf8',
                life: 1.0
              });
            }
          });

          // Shockwave Pulse
          state.shockwave = {
            x: (head.x < 0 ? 0 : head.x >= cols ? cols - 1 : head.x) * gridSize + gridSize / 2,
            y: (head.y < 0 ? 0 : head.y >= rows ? rows - 1 : head.y) * gridSize + gridSize / 2,
            radius: 4,
            maxRadius: 220,
            alpha: 1.0,
            color: '#00ff88'
          };
          return;
        }
      }

      state.snake.unshift(head);

      let ateFood = false;

      // Regular Food Collision
      if (head.x === state.food.x && head.y === state.food.y) {
        ateFood = true;
        SoundFX.playSuccess();

        const is2X =
          state.activePowerUp &&
          state.activePowerUp.type === '2X' &&
          state.activePowerUp.expiresAt > now;
        const currentMult = (is2X ? 2 : 1) * state.combo;
        const speedBonus = snakeSpeed === 'insane' ? 25 : snakeSpeed === 'fast' ? 15 : 10;
        const points = speedBonus * currentMult;

        state.score += points;
        state.apples += 1;
        setSnakeScore(state.score);
        setApplesEaten(state.apples);

        // Spawn Golden Glitch bit every 4 orbs
        if (state.apples % 4 === 0 && !state.goldenFood) {
          state.goldenFood = {
            ...getRandomEmptyCell(),
            expiresAt: Date.now() + 8000
          };
          SoundFX.playDeploy();
          state.floatingTexts.push({
            x: state.goldenFood.x * gridSize + gridSize / 2,
            y: state.goldenFood.y * gridSize,
            text: '⚡ GOLDEN GLITCH (8s)',
            color: '#fbbf24',
            life: 1.0
          });
        }

        // Spawn Power-Up every 6 orbs
        if (state.apples % 6 === 0 && !state.powerUpItem) {
          const types = ['SHIELD', 'SLOW', '2X', 'MAGNET'];
          const chosenType = types[Math.floor(Math.random() * types.length)];
          state.powerUpItem = {
            ...getRandomEmptyCell(),
            type: chosenType,
            expiresAt: Date.now() + 9000
          };
          state.floatingTexts.push({
            x: state.powerUpItem.x * gridSize + gridSize / 2,
            y: state.powerUpItem.y * gridSize,
            text: `🔮 POWER-UP: ${chosenType}`,
            color: '#c084fc',
            life: 1.0
          });
        }

        state.combo = Math.min(5, state.combo + 1);
        if (state.combo > state.maxCombo) state.maxCombo = state.combo;
        setCombo(state.combo);
        setMaxCombo(state.maxCombo);
        state.lastEatTime = now;

        state.floatingTexts.push({
          x: head.x * gridSize + gridSize / 2,
          y: head.y * gridSize,
          text: `+${points}${state.combo > 1 ? ` (x${state.combo})` : ''}`,
          color: '#00ff88',
          life: 1.0
        });

        for (let i = 0; i < 8; i++) {
          state.particles.push({
            x: head.x * gridSize + gridSize / 2,
            y: head.y * gridSize + gridSize / 2,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6,
            life: 1.0,
            color: '#00ff88'
          });
        }

        state.food = getRandomEmptyCell();
      }

      // Golden Glitch Collision
      if (state.goldenFood && head.x === state.goldenFood.x && head.y === state.goldenFood.y) {
        ateFood = true;
        SoundFX.playDeploy();
        const is2X =
          state.activePowerUp &&
          state.activePowerUp.type === '2X' &&
          state.activePowerUp.expiresAt > now;
        const goldPoints = 50 * (is2X ? 2 : 1);
        state.score += goldPoints;
        setSnakeScore(state.score);
        state.floatingTexts.push({
          x: head.x * gridSize + gridSize / 2,
          y: head.y * gridSize,
          text: `+${goldPoints} GOLD GLITCH! 🌟`,
          color: '#fbbf24',
          life: 1.2
        });
        for (let i = 0; i < 12; i++) {
          state.particles.push({
            x: head.x * gridSize + gridSize / 2,
            y: head.y * gridSize + gridSize / 2,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8,
            life: 1.0,
            color: '#fbbf24'
          });
        }
        state.goldenFood = null;
      }

      // Power-Up Collision
      if (state.powerUpItem && head.x === state.powerUpItem.x && head.y === state.powerUpItem.y) {
        ateFood = true;
        SoundFX.playDeploy();
        const pType = state.powerUpItem.type;
        const durationSec = pType === 'SHIELD' ? 16 : 9;
        const pObj = { type: pType, expiresAt: now + durationSec * 1000 };
        state.activePowerUp = pObj;
        setActivePowerUp(pObj);
        if (pType === 'SHIELD') state.hasShield = true;
        if (pType === 'MAGNET') state.hasMagnet = true;
        state.floatingTexts.push({
          x: head.x * gridSize + gridSize / 2,
          y: head.y * gridSize,
          text: `✨ ${pType} ACTIVE (${durationSec}s)`,
          color: '#c084fc',
          life: 1.2
        });
        state.powerUpItem = null;
      }

      if (!ateFood) {
        state.snake.pop();
      }
    };

    // ── 60FPS CONTINUOUS RENDER TICK ──
    const renderLoop = (timestamp) => {
      const state = snakeStateRef.current;
      const now = Date.now();

      // Dynamic acceleration based on snake length
      const baseInterval = speedIntervals[snakeSpeed] || 68;
      const lengthSpeedup = Math.min(18, Math.floor(state.snake.length / 3) * 1.5);
      let intervalMs = Math.max(22, baseInterval - lengthSpeedup);

      if (
        state.activePowerUp &&
        state.activePowerUp.type === 'SLOW' &&
        state.activePowerUp.expiresAt > now
      ) {
        intervalMs = Math.round(intervalMs * 1.6);
      }

      if (!state.isDying && !isPaused) {
        if (!lastTickTimeRef.current) lastTickTimeRef.current = timestamp;
        const delta = timestamp - lastTickTimeRef.current;
        if (delta >= intervalMs) {
          lastTickTimeRef.current = timestamp;
          stepGameLogic();
        }
      }

      // ── ULTRA-FAST ZERO-LAG BACKGROUND DRAW ──
      ctx.drawImage(bgCanvas, 0, 0);

      // 🍎 HOLOGRAPHIC QUANTUM FRUIT / APPLE
      const fx = state.food.x * gridSize + gridSize / 2;
      const fy = state.food.y * gridSize + gridSize / 2;
      const applePulse = Math.sin(now / 150) * 1.5;
      const rotAngle = (now / 500) % (Math.PI * 2);

      // Outer Radial Glow
      const foodGrad = ctx.createRadialGradient(fx, fy, 2, fx, fy, gridSize / 1.8 + applePulse);
      foodGrad.addColorStop(0, '#38bdf8');
      foodGrad.addColorStop(0.6, '#00ff88');
      foodGrad.addColorStop(1, 'rgba(0, 255, 136, 0)');
      ctx.fillStyle = foodGrad;
      ctx.beginPath();
      ctx.arc(fx, fy, gridSize / 1.5 + applePulse, 0, Math.PI * 2);
      ctx.fill();

      // Core Apple Body
      ctx.fillStyle = '#00ff88';
      ctx.shadowColor = '#00ff88';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(fx, fy, gridSize / 3 + applePulse * 0.3, 0, Math.PI * 2);
      ctx.fill();

      // Orbiting Micro-Data Nodes
      ctx.fillStyle = '#38bdf8';
      for (let o = 0; o < 3; o++) {
        const orbitAngle = rotAngle + (o * Math.PI * 2) / 3;
        const ox = fx + Math.cos(orbitAngle) * (gridSize / 2 + 1);
        const oy = fy + Math.sin(orbitAngle) * (gridSize / 2 + 1);
        ctx.beginPath();
        ctx.arc(ox, oy, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // 🌟 GOLDEN GLITCH (8-Point Shimmering Star)
      if (state.goldenFood) {
        const remainingMs = Math.max(0, state.goldenFood.expiresAt - now);
        const goldRatio = remainingMs / 8000;
        const gx = state.goldenFood.x * gridSize + gridSize / 2;
        const gy = state.goldenFood.y * gridSize + gridSize / 2;
        const starRot = (now / 300) % (Math.PI * 2);

        ctx.save();
        ctx.translate(gx, gy);
        ctx.rotate(starRot);

        ctx.fillStyle = '#fbbf24';
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 14;

        ctx.beginPath();
        for (let p = 0; p < 8; p++) {
          const a = (p * Math.PI) / 4;
          const r = p % 2 === 0 ? gridSize / 2.2 : gridSize / 4.5;
          const px = Math.cos(a) * r;
          const py = Math.sin(a) * r;
          if (p === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // Countdown Timer Ring
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(gx, gy, gridSize / 1.8, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * goldRatio);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // 🔮 POWER-UP CAPSULE
      if (state.powerUpItem) {
        const px = state.powerUpItem.x * gridSize + gridSize / 2;
        const py = state.powerUpItem.y * gridSize + gridSize / 2;
        const pType = state.powerUpItem.type;
        const iconColor =
          pType === 'SHIELD'
            ? '#38bdf8'
            : pType === '2X'
              ? '#fbbf24'
              : pType === 'MAGNET'
                ? '#f43f5e'
                : '#c084fc';

        ctx.fillStyle = iconColor;
        ctx.shadowColor = iconColor;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.roundRect(px - 7, py - 7, 14, 14, 4);
        ctx.fill();

        ctx.fillStyle = '#000';
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const glyph =
          pType === 'SHIELD' ? 'S' : pType === '2X' ? '2X' : pType === 'MAGNET' ? 'M' : 'T';
        ctx.fillText(glyph, px, py);
        ctx.shadowBlur = 0;
      }

      // 🐍 CYBER-VIPER SNAKE
      if (!state.isDying) {
        const len = state.snake.length;
        const isInvuln = Boolean(state.invulnerableUntil && state.invulnerableUntil > now);

        // Phase immunity visual blinking
        ctx.globalAlpha = isInvuln ? (Math.floor(now / 70) % 2 === 0 ? 0.35 : 0.95) : 1.0;

        // Draw Interconnecting Joint Lines
        ctx.lineWidth = gridSize - 6;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        for (let i = 0; i < len - 1; i++) {
          const s1 = state.snake[i];
          const s2 = state.snake[i + 1];
          if (Math.abs(s1.x - s2.x) > 1 || Math.abs(s1.y - s2.y) > 1) continue;

          const t = i / Math.max(1, len);
          const r = Math.round(0 + t * 40);
          const g = Math.round(255 - t * 70);
          const b = Math.round(136 + t * 110);
          ctx.strokeStyle = state.hasShield
            ? '#38bdf8'
            : isInvuln
              ? '#67e8f9'
              : `rgb(${r}, ${g}, ${b})`;

          ctx.beginPath();
          ctx.moveTo(s1.x * gridSize + gridSize / 2, s1.y * gridSize + gridSize / 2);
          ctx.lineTo(s2.x * gridSize + gridSize / 2, s2.y * gridSize + gridSize / 2);
          ctx.stroke();
        }

        // Draw Individual Segment Nodes
        state.snake.forEach((seg, idx) => {
          const isHead = idx === 0;
          const isTail = idx === len - 1;
          const t = idx / Math.max(1, len);
          const cx = seg.x * gridSize + gridSize / 2;
          const cy = seg.y * gridSize + gridSize / 2;

          if (isHead) {
            // Shield Aura Ring & Rotating Plasma Nodes
            if (state.hasShield) {
              const shieldPulse = Math.sin(now / 120) * 2;
              const shieldRad = gridSize * 0.88 + shieldPulse;
              ctx.strokeStyle = '#38bdf8';
              ctx.lineWidth = 2.5;
              ctx.shadowColor = '#38bdf8';
              ctx.shadowBlur = 14;
              ctx.beginPath();
              ctx.arc(cx, cy, shieldRad, 0, Math.PI * 2);
              ctx.stroke();

              // 4 Orbiting Forcefield Energy Nodes
              for (let fn = 0; fn < 4; fn++) {
                const fa = now / 350 + (fn * Math.PI) / 2;
                const fpx = cx + Math.cos(fa) * shieldRad;
                const fpy = cy + Math.sin(fa) * shieldRad;
                ctx.fillStyle = '#38bdf8';
                ctx.beginPath();
                ctx.arc(fpx, fpy, 2.2, 0, Math.PI * 2);
                ctx.fill();
              }
              ctx.shadowBlur = 0;
            }

            // Head Helm
            ctx.fillStyle = state.hasShield ? '#38bdf8' : '#00ff88';
            ctx.shadowColor = state.hasShield ? '#38bdf8' : '#00ff88';
            ctx.shadowBlur = 12;
            ctx.beginPath();
            ctx.roundRect(
              seg.x * gridSize + 1.5,
              seg.y * gridSize + 1.5,
              gridSize - 3,
              gridSize - 3,
              5
            );
            ctx.fill();

            // Directional Cyber Visor / Robot Eyes
            ctx.fillStyle = '#050505';
            let e1 = { x: cx - 4, y: cy - 4 };
            let e2 = { x: cx + 4, y: cy - 4 };
            if (state.dir.x === 1) {
              e1 = { x: cx + 3, y: cy - 4 };
              e2 = { x: cx + 3, y: cy + 4 };
            } else if (state.dir.x === -1) {
              e1 = { x: cx - 3, y: cy - 4 };
              e2 = { x: cx - 3, y: cy + 4 };
            } else if (state.dir.y === 1) {
              e1 = { x: cx - 4, y: cy + 3 };
              e2 = { x: cx + 4, y: cy + 3 };
            } else if (state.dir.y === -1) {
              e1 = { x: cx - 4, y: cy - 3 };
              e2 = { x: cx + 4, y: cy - 3 };
            }

            ctx.beginPath();
            ctx.arc(e1.x, e1.y, 2.2, 0, Math.PI * 2);
            ctx.arc(e2.x, e2.y, 2.2, 0, Math.PI * 2);
            ctx.fill();

            // Pupil Glimmer
            ctx.fillStyle = '#38bdf8';
            ctx.beginPath();
            ctx.arc(e1.x, e1.y, 1.0, 0, Math.PI * 2);
            ctx.arc(e2.x, e2.y, 1.0, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          } else {
            // Body Node
            const r = Math.round(0 + t * 40);
            const g = Math.round(255 - t * 70);
            const b = Math.round(136 + t * 110);
            ctx.fillStyle = state.hasShield ? '#0284c7' : `rgb(${r}, ${g}, ${b})`;

            const segRadius = isTail ? gridSize / 4 : gridSize / 3;
            ctx.beginPath();
            ctx.arc(cx, cy, segRadius, 0, Math.PI * 2);
            ctx.fill();

            // Inner Core Node
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.beginPath();
            ctx.arc(cx, cy, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        });
        ctx.globalAlpha = 1.0;
      }

      // 💥 SHOCKWAVE BURST (Deflection & Death)
      if (state.shockwave && state.shockwave.alpha > 0) {
        ctx.strokeStyle = state.shockwave.color
          ? `rgba(56, 189, 248, ${state.shockwave.alpha})`
          : `rgba(0, 255, 136, ${state.shockwave.alpha})`;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(state.shockwave.x, state.shockwave.y, state.shockwave.radius, 0, Math.PI * 2);
        ctx.stroke();
        state.shockwave.radius += 7;
        state.shockwave.alpha -= 0.035;
      }

      // 💥 VOXEL DISINTEGRATION DEATH ANIMATION
      if (state.isDying) {
        state.deathFrames++;

        state.deathFragments.forEach((f) => {
          f.x += f.vx;
          f.y += f.vy;
          f.vx *= 0.95;
          f.vy *= 0.95;
          f.rot += f.vRot;
          f.life -= 0.025;

          if (f.life > 0) {
            ctx.save();
            ctx.translate(f.x, f.y);
            ctx.rotate(f.rot);
            ctx.fillStyle = f.color;
            ctx.globalAlpha = f.life;
            ctx.shadowColor = f.color;
            ctx.shadowBlur = 8;
            ctx.fillRect(-f.size / 2, -f.size / 2, f.size, f.size);
            ctx.restore();
          }
        });

        if (state.deathFrames >= 40) {
          setSnakeGameOver(true);
          if (state.score > snakeHighScore) {
            setIsNewHighScore(true);
            try {
              localStorage.setItem(getHighScoreKey(), String(state.score));
            } catch {}
            confetti({
              particleCount: 75,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#00ff88', '#38bdf8', '#fbbf24', '#c084fc']
            });
          }
        }
      }

      // Particles
      state.particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.05;
        if (p.life > 0) {
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.life;
          ctx.fillRect(p.x, p.y, 3, 3);
          ctx.globalAlpha = 1.0;
        } else {
          state.particles.splice(idx, 1);
        }
      });

      // Floating Texts
      state.floatingTexts.forEach((ft, idx) => {
        ft.y -= 0.7;
        ft.life -= 0.035;
        if (ft.life > 0) {
          ctx.font = 'bold 11px "Space Mono", monospace';
          ctx.fillStyle = ft.color;
          ctx.globalAlpha = ft.life;
          ctx.textAlign = 'center';
          ctx.fillText(ft.text, ft.x, ft.y);
          ctx.globalAlpha = 1.0;
        } else {
          state.floatingTexts.splice(idx, 1);
        }
      });

      if (!snakeGameOver) {
        animFrameRef.current = requestAnimationFrame(renderLoop);
      }
    };

    animFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [
    snakeGameActive,
    snakeGameOver,
    isPaused,
    snakeMode,
    snakeSpeed,
    snakeHighScore,
    getHighScoreKey
  ]);

  // ── 60FPS MATRIX DIGITAL RAIN ENGINE ──
  useEffect(() => {
    if (!matrixActive) {
      if (matrixAnimRef.current) cancelAnimationFrame(matrixAnimRef.current);
      return;
    }

    const canvas = matrixCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.parentElement ? canvas.parentElement.clientWidth : 800;
    canvas.height = canvas.parentElement ? canvas.parentElement.clientHeight : 500;

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -40));
    const chars = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ01234567890ABCDEFXYZ{}[]<>=+*~#$_HARSHIT';

    const renderMatrix = () => {
      ctx.fillStyle = 'rgba(4, 5, 7, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Glowing white-green head for leading droplet
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = activeThemeObj.primary;
        ctx.shadowBlur = 10;
        ctx.fillText(text, x, y);

        // Body stream
        ctx.fillStyle = activeThemeObj.primary;
        ctx.shadowBlur = 0;
        if (drops[i] > 1) {
          const prevChar = chars.charAt(Math.floor(Math.random() * chars.length));
          ctx.fillText(prevChar, x, (drops[i] - 1) * fontSize);
        }

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      matrixAnimRef.current = requestAnimationFrame(renderMatrix);
    };

    matrixAnimRef.current = requestAnimationFrame(renderMatrix);

    return () => {
      if (matrixAnimRef.current) cancelAnimationFrame(matrixAnimRef.current);
    };
  }, [matrixActive, activeThemeObj]);

  // Window-level key listener
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (matrixActive) {
        const k = e.key.toLowerCase();
        if (k === 'escape' || k === 'q' || k === 'enter' || k === ' ') {
          e.preventDefault();
          e.stopPropagation();
          setMatrixActive(false);
          SoundFX.playClick();
          return;
        }
      }

      if (snakeGameActive) {
        const k = e.key.toLowerCase();

        if (k === 'p' || (e.key === ' ' && !snakeGameOver)) {
          e.preventDefault();
          e.stopPropagation();
          setIsPaused((prev) => !prev);
          SoundFX.playClick();
          return;
        }

        if (k === 'arrowup' || k === 'w') {
          e.preventDefault();
          e.stopPropagation();
          if (!isPaused) changeSnakeDirection('UP');
          return;
        }
        if (k === 'arrowdown' || k === 's') {
          e.preventDefault();
          e.stopPropagation();
          if (!isPaused) changeSnakeDirection('DOWN');
          return;
        }
        if (k === 'arrowleft' || k === 'a') {
          e.preventDefault();
          e.stopPropagation();
          if (!isPaused) changeSnakeDirection('LEFT');
          return;
        }
        if (k === 'arrowright' || k === 'd') {
          e.preventDefault();
          e.stopPropagation();
          if (!isPaused) changeSnakeDirection('RIGHT');
          return;
        }

        if (snakeGameOver && (k === 'r' || k === 'enter')) {
          e.preventDefault();
          e.stopPropagation();
          startSnakeGame();
          return;
        }

        if (k === 'escape' || k === 'q') {
          e.preventDefault();
          e.stopPropagation();
          setSnakeGameActive(false);
          setHistory((h) => [
            ...h,
            { type: 'info', text: `🎮 Arcade Snake Session Terminated. Score: ${snakeScore} PTS` }
          ]);
          return;
        }

        if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(k)) {
          e.preventDefault();
          e.stopPropagation();
        }
        return;
      }

      if (inputRef.current && document.activeElement !== inputRef.current) {
        if (!e.ctrlKey && !e.metaKey && !e.altKey && e.key.length === 1) {
          inputRef.current.focus();
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown, true);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown, true);
  }, [
    snakeGameActive,
    snakeGameOver,
    isPaused,
    snakeScore,
    changeSnakeDirection,
    startSnakeGame,
    matrixActive
  ]);

  useEffect(() => {
    if (snakeGameActive) {
      snakeCanvasRef.current?.focus();
    } else {
      inputRef.current?.focus();
    }
  }, [snakeGameActive]);

  const handleCommand = (raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    setCmdHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);
    setDraftInput('');

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    const newHistory = [
      ...history,
      { type: 'cmd', text: `harshit@neural-core ${currentPath} % ${trimmed}` }
    ];

    switch (cmd) {
      case 'help':
      case '?':
        newHistory.push(
          { type: 'sys', text: '⚡ HARSHIT.EXE SHELL COMMAND DIRECTORY:' },
          { type: 'info', text: '── SYSTEM TELEMETRY & PROFILE ──' },
          {
            type: 'out',
            text: "  neofetch          - Hardware specs, OS telemetry & Harshit's ASCII crest"
          },
          {
            type: 'out',
            text: '  whoami            - Current session UID, clearance level & host'
          },
          {
            type: 'out',
            text: '  uptime            - Server uptime, active load average & memory stats'
          },
          {
            type: 'out',
            text: '  uname [-a]        - Operating system & Linux kernel architecture'
          },
          {
            type: 'out',
            text: '  bio / about       - Full personal bio, degree program & engineering background'
          },
          {
            type: 'out',
            text: '  skills / stack    - Breakdown of AI/ML, full-stack, and systems proficiencies'
          },
          {
            type: 'out',
            text: `  projects          - List all ${projectsData.length} flagship engineering universes with live links`
          },
          {
            type: 'out',
            text: '  contact / socials - Direct email, GitHub, LinkedIn, and Discord endpoints'
          },
          {
            type: 'out',
            text: '  top / ps          - Real-time running background daemon telemetry'
          },
          { type: 'out', text: '  weather           - Live telemetry weather radar for New Delhi' },
          { type: 'info', text: '── NETWORKING & CLOUD INFRASTRUCTURE ──' },
          {
            type: 'out',
            text: '  ping [<host>]     - ICMP latency probe to Oracle Cloud & DNS nodes'
          },
          { type: 'out', text: '  curl [<url>]      - Inspect HTTP headers & response payloads' },
          { type: 'info', text: '── FILESYSTEM NAVIGATION ──' },
          {
            type: 'out',
            text: '  ls [-l] [<path>]  - List directory contents (e.g. ls, ls -l, ls projects)'
          },
          {
            type: 'out',
            text: '  cd <dir>          - Change directory (e.g. cd projects, cd .., cd ~)'
          },
          { type: 'out', text: '  pwd               - Print current working directory path' },
          {
            type: 'out',
            text: '  cat <file>        - Inspect formatted source code files (e.g. cat bio.txt, cat 03_autovaluate_model.py)'
          },
          {
            type: 'out',
            text: '  tree              - Render complete hierarchical directory tree'
          },
          { type: 'info', text: '── AI ASSISTANT & LAUNCHER ──' },
          {
            type: 'out',
            text: '  ai / ask <query>  - Ask the built-in AI reasoning engine technical questions'
          },
          {
            type: 'out',
            text: `  deploy <1-${projectsData.length}|name> - Initiate deployment sequence for a target universe`
          },
          { type: 'info', text: '── GAMES, CYBER FX & CUSTOMIZATION ──' },
          { type: 'out', text: '  matrix / rain     - 60FPS Cascading Neural Digital Rain Canvas' },
          {
            type: 'out',
            text: '  snake             - Full-Terminal 60fps Cyber-Serpent Arcade Engine'
          },
          {
            type: 'out',
            text: '  hack / pwn        - Cinematic Hollywood cyber penetration sequence'
          },
          { type: 'out', text: '  cowsay <text>     - Classic ASCII cow wisdom speech' },
          { type: 'out', text: '  fortune           - Random developer & AI aphorism' },
          {
            type: 'out',
            text: '  echo <text>       - Print text with $USER, $HOST, $IP variable expansion'
          },
          { type: 'out', text: '  date              - Current system timestamp & timezone' },
          { type: 'out', text: '  history           - Chronological log of entered commands' },
          {
            type: 'out',
            text: '  theme <name>      - Switch palette (green, cyan, amber, purple, red)'
          },
          { type: 'out', text: '  clear / banner    - Clear screen or render MOTD header' },
          { type: 'out', text: '  exit              - Dismiss terminal window' }
        );
        break;

      case 'neofetch':
        newHistory.push({
          type: 'neofetch',
          text: `
      ██╗  ██╗███████╗      harshit@neural-core
      ██║  ██║██╔════╝      -------------------
      ███████║███████╗      OS: Oracle Linux Server 9.8 (aarch64)
      ██╔══██║╚════██║      Host: Neural AI Engine · OCI Ampere A1
      ██║  ██║███████║      Degree: B.Tech Artificial Intelligence & ML (Class of 2029)
      ╚═╝  ╚═╝╚══════╝      Kernel: Linux 6.12.0-204.92.4.2.el9uek.aarch64
                            Uptime: 43 Days Continuous Server Engineering
                            Shell: zsh 5.9 (harshit-powerlevel10k)
                            Theme: ${THEMES[currentTheme]?.label || 'CLASSIC MATRIX GREEN'}
                            CPU: ARM Neoverse-N1 @ 3.00GHz (Ampere A1)
                            RAM: 6.0 GB Unified (5.5 GiB Usable · 2.7 GiB Free)
                            Disk: 46.6 GB NVMe Block Storage (18 GB Available)
                            Web Server: Nginx 1.20.1 (Reverse Proxy · HTTP/2)
                            Domains: harshitthek.is-a.dev · harshit.thedev.id
                            Server IP: 144.24.104.31 (OCI ap-mumbai-1)
                            AI Stack: CatBoost, XGBoost, PyTorch, BERT, FastAPI, Three.js
                            GitHub: https://github.com/harshitthek
          `
        });
        break;

      case 'whoami':
        newHistory.push({
          type: 'sys',
          text: `harshit (uid=0[root] gid=0[root] groups=0[root],4[adm],27[sudo],998[ai-lab])\nRole: AI & Systems Engineer · Class of 2029\nHost: ygg [Oracle Cloud Infrastructure ARM64 · 144.24.104.31]\nStatus: LEVEL 5 ROOT CLEARANCE ACTIVE`
        });
        break;

      case 'uptime':
        newHistory.push({
          type: 'info',
          text: ' 01:36:12 up 43 days, 19:40,  1 user,  load average: 0.08, 0.02, 0.01\nMemory: 5.5 GiB Total · 2.7 GiB Free · 0.9 GiB Used · 2.2 GiB Buff/Cache'
        });
        break;

      case 'uname':
        newHistory.push({
          type: 'out',
          text:
            arg.includes('-a') || !arg
              ? 'Linux ygg 6.12.0-204.92.4.2.el9uek.aarch64 #2 SMP Thu Jul 2 08:13:04 PDT 2026 aarch64 aarch64 aarch64 GNU/Linux'
              : 'Linux'
        });
        break;

      case 'date':
        newHistory.push({
          type: 'out',
          text: new Date().toString()
        });
        break;

      case 'echo': {
        let outStr = arg || '';
        outStr = outStr
          .replace(/\$USER/g, 'harshit')
          .replace(/\$HOST/g, 'ygg (Oracle Cloud VM)')
          .replace(/\$IP/g, '144.24.104.31')
          .replace(/\$DOMAIN/g, 'harshitthek.is-a.dev')
          .replace(/\$ROLE/g, 'AI & Systems Engineer (Class of 2029)')
          .replace(/\$DEGREE/g, 'B.Tech AI & ML');
        newHistory.push({ type: 'out', text: outStr });
        break;
      }

      case 'history':
        newHistory.push(
          { type: 'sys', text: '📜 SESSION COMMAND HISTORY:' },
          ...cmdHistory.map((h, i) => ({
            type: 'out',
            text: `  ${(i + 1).toString().padStart(3, ' ')}  ${h}`
          }))
        );
        break;

      case 'ping': {
        const host = arg || 'harshitthek.is-a.dev';
        newHistory.push(
          { type: 'info', text: `PING ${host} (144.24.104.31): 56 data bytes` },
          { type: 'out', text: `64 bytes from 144.24.104.31: icmp_seq=0 ttl=64 time=11.4 ms` },
          { type: 'out', text: `64 bytes from 144.24.104.31: icmp_seq=1 ttl=64 time=12.1 ms` },
          { type: 'out', text: `64 bytes from 144.24.104.31: icmp_seq=2 ttl=64 time=10.9 ms` },
          {
            type: 'ok',
            text: `--- ${host} ping statistics ---\n3 packets transmitted, 3 packets received, 0.0% packet loss\nround-trip min/avg/max/stddev = 10.9/11.4/12.1/0.48 ms`
          }
        );
        break;
      }

      case 'curl': {
        const _target = arg || 'http://144.24.104.31/';
        newHistory.push({
          type: 'code',
          text: `HTTP/1.1 200 OK
Server: nginx/1.20.1 (Oracle Cloud Linux aarch64)
Date: ${new Date().toUTCString()}
Content-Type: text/html; charset=UTF-8
Connection: keep-alive
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=31536000

<!DOCTYPE html>
<title>HARSHIT.EXE | Harshit Sharma — AI & Systems Engineer</title>
<!-- 🚀 10 Flagship Universes Live on Oracle Cloud Infrastructure -->`
        });
        break;
      }

      case 'banner':
      case 'motd':
        newHistory.push(
          {
            type: 'sys',
            text: '╔══════════════════════════════════════════════════════════════════════╗'
          },
          {
            type: 'sys',
            text: '║     HARSHIT SHARMA CYBER LAB INTERACTIVE ZSH SHELL [v6.9.0-PRO]      ║'
          },
          {
            type: 'sys',
            text: '║     Host: Neural AI Engine · Clearance: LEVEL 5 ROOT                 ║'
          },
          {
            type: 'sys',
            text: '╚══════════════════════════════════════════════════════════════════════╝'
          }
        );
        break;

      case 'bio':
      case 'about':
        newHistory.push(
          { type: 'sys', text: '👤 HARSHIT SHARMA — BIOGRAPHICAL DOSSIER' },
          { type: 'out', text: '  Name: Harshit Sharma' },
          {
            type: 'out',
            text: '  Degree: B.Tech in Artificial Intelligence & Machine Learning (Class of 2029)'
          },
          { type: 'out', text: '  Location: New Delhi, India' },
          { type: 'out', text: '  Server: Oracle Cloud VM (144.24.104.31) · harshitthek.is-a.dev' },
          {
            type: 'out',
            text: '  Focus: Autonomous AI Agent Benchmarks, Dual-Engine ML Regression, BERT Transformers, 3D WebGL'
          },
          { type: 'out', text: '  GitHub: https://github.com/harshitthek' },
          { type: 'out', text: '  LinkedIn: https://www.linkedin.com/in/devharshitsharma' },
          { type: 'out', text: '  Email: codewithharshitsharma@gmail.com' }
        );
        break;

      case 'snake':
      case 'game':
        startSnakeGame();
        newHistory.push({
          type: 'info',
          text: '🎮 INITIATING FULL-TERMINAL 60FPS ARCADE SNAKE. Use Arrow Keys / WASD. Press ESC or Q to quit.'
        });
        break;

      case 'hack':
      case 'pwn':
        SoundFX.playDeploy();
        newHistory.push(
          { type: 'info', text: '⚡ INITIATING PENETRATION SEQUENCE: TARGET = HARSHIT_MAINFRAME' },
          {
            type: 'out',
            text: '[01/05] Resolving satellite proxy hop... 185.220.101.4 -> 10.0.4.1 [CONNECTED]'
          },
          {
            type: 'out',
            text: '[02/05] Injecting payload into sandbox firewall (Bypassing WAF & CORS)... [100% OK]'
          },
          {
            type: 'out',
            text: '[03/05] Exploiting zero-day in memory buffer [0x7ffeefbff490]... [OVERFLOW INJECTED]'
          },
          {
            type: 'ok',
            text: '[04/05] Cracking 4096-bit RSA master key... [FOUND: HARSHIT_AI_ACCESS_GRANTED]'
          },
          {
            type: 'ok',
            text: `[05/05] 🚀 ACCESS GRANTED. LEVEL 5 ROOT CLEARANCE UNLOCKED. ALL ${projectsData.length} UNIVERSES LIVE.`
          }
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
            text: `Usage: theme <name>. Available palettes: ${Object.keys(THEMES).join(', ')}`
          });
        } else {
          const t = arg.toLowerCase();
          setCurrentTheme(t);
          SoundFX.playClick();
          newHistory.push({ type: 'ok', text: `✓ Terminal theme switched to ${THEMES[t].label}` });
        }
        break;

      case 'ls':
      case 'dir': {
        const isLong = parts.includes('-l');
        const targetArg = parts.slice(1).find((p) => !p.startsWith('-')) || '';
        const targetPath = targetArg ? resolvePath(targetArg, currentPath) : currentPath;
        const dirNode = getNodeFromVFS(targetPath);

        if (!dirNode) {
          newHistory.push({
            type: 'err',
            text: `ls: cannot access '${targetArg || currentPath}': No such file or directory`
          });
        } else if (dirNode.type === 'file') {
          newHistory.push({ type: 'out', text: `📄 ${targetArg} (${dirNode.size || '1.0 KB'})` });
        } else {
          const entries = Object.keys(dirNode.children || {});
          if (isLong) {
            newHistory.push({ type: 'info', text: `total ${entries.length * 4}` });
            entries.forEach((e) => {
              const item = dirNode.children[e];
              const perm = item.type === 'dir' ? 'drwxr-xr-x' : '-rw-r--r--';
              const size = item.size || (item.type === 'dir' ? '4.0 KB' : '1.2 KB');
              newHistory.push({
                type: item.type === 'dir' ? 'info' : 'out',
                text: `${perm}  1 harshit harshit  ${size.padEnd(7)} Aug 16 00:00  ${e}${item.type === 'dir' ? '/' : ''}`
              });
            });
          } else {
            const list = entries
              .map((e) => (dirNode.children[e].type === 'dir' ? `📁 ${e}/` : `📄 ${e}`))
              .join('   ');
            newHistory.push({ type: 'out', text: list || '(empty directory)' });
          }
        }
        break;
      }

      case 'cd': {
        if (!arg || arg === '~' || arg === '/') {
          setCurrentPath('~');
        } else {
          const targetPath = resolvePath(arg, currentPath);
          const targetNode = getNodeFromVFS(targetPath);
          if (!targetNode) {
            newHistory.push({ type: 'err', text: `cd: no such file or directory: ${arg}` });
          } else if (targetNode.type !== 'dir') {
            newHistory.push({ type: 'err', text: `cd: not a directory: ${arg}` });
          } else {
            setCurrentPath(targetPath);
          }
        }
        break;
      }

      case 'pwd':
        newHistory.push({ type: 'out', text: `/home/harshit/${currentPath.replace(/^~\/?/, '')}` });
        break;

      case 'cat': {
        if (!arg) {
          newHistory.push({
            type: 'err',
            text: "Usage: cat <filename> (e.g. 'cat bio.txt', 'cat projects/01_yggdrasil.py', 'cat contact.json')"
          });
        } else {
          const targetPath = resolvePath(arg, currentPath);
          const targetNode = getNodeFromVFS(targetPath);

          if (!targetNode) {
            newHistory.push({
              type: 'err',
              text: `cat: ${arg}: No such file. Try 'ls' to see available files.`
            });
          } else if (targetNode.type === 'dir') {
            newHistory.push({
              type: 'err',
              text: `cat: ${arg}: Is a directory. Use 'ls ${arg}' to list contents.`
            });
          } else {
            newHistory.push({ type: 'code', text: targetNode.content });
          }
        }
        break;
      }

      case 'tree':
        newHistory.push({
          type: 'code',
          text: `.
├── bio.txt
├── contact.json
├── id_rsa.pub
├── projects/
│   ├── 01_yggdrasil.py
│   ├── 02_resilient_agent.py
│   ├── 03_autovaluate_model.py
│   ├── 04_support_dispatcher_bert.py
│   ├── 05_shieldblock_mv3.js
│   ├── 06_carbon_guardian.py
│   ├── 07_letter_guess_engine.py
│   ├── 08_browser_startpage.js
│   ├── 09_cosmic_webgl.js
│   └── 10_cyber_terminal.js
├── secrets/
│   └── flag.txt
└── skills/
    └── stack.json

3 directories, 14 files`
        });
        break;

      case 'ai':
      case 'ask':
        if (!arg) {
          newHistory.push({
            type: 'err',
            text: "Usage: ai <query> (e.g. 'ai why hire Harshit?', 'ai explain AutoValuate AI', 'ai what is Resilient?')"
          });
        } else {
          const lower = arg.toLowerCase();
          let ans =
            'Harshit Sharma specializes in autonomous agent architecture, multi-turn LLM reasoning trees, dual-engine ML regression stacking, and production systems engineering. He studies B.Tech in Artificial Intelligence & Machine Learning (Class of 2029).';

          if (lower.includes('why hire') || lower.includes('hire') || lower.includes('recruit')) {
            ans =
              '🌟 Why hire Harshit:\nHe bridges deep algorithmic foundations (CatBoost/XGBoost, BERT Transformers, TensorFlow Recommenders) with elite production systems engineering (Docker, FastAPI, Three.js WebGL, Fastify). He builds real, production-tested architectures with full test matrices (56 tests in AutoValuate, 47 tests in Resilient).';
          } else if (
            lower.includes('yggdrasil') ||
            lower.includes('world tree') ||
            lower.includes('discord')
          ) {
            ans =
              '🌲 Yggdrasil Platform:\nA self-hosted modular Discord platform combining a Fastify REST API with Discord.js inside a single Node.js runtime, secured with AES-256-GCM + HKDF cryptographic sessions.';
          } else if (
            lower.includes('resilient') ||
            lower.includes('benchmark') ||
            lower.includes('docker') ||
            lower.includes('sandbox')
          ) {
            ans =
              '🤖 Resilient AI Benchmark:\nAn automated testing harness for autonomous software engineering agents with isolated Docker git sandboxes and 47/47 passing Pytests.';
          } else if (
            lower.includes('bike') ||
            lower.includes('car') ||
            lower.includes('price') ||
            lower.includes('autovaluate') ||
            lower.includes('ml')
          ) {
            ans =
              '📊 AutoValuate AI — Dual-Engine Valuation Suite:\nA 97.4% R² gradient-boosted stacking regressor (CatBoost + XGBoost) trained on 40,000+ real transactions across 32k motorcycles and 8k passenger cars. Features 5-year TCO lifecycle simulation, fleet batch appraisal for 50 vehicles, cryptographic SHA-256 valuation certificates, and 56 passing automated tests. Live on Vercel at https://moto-value-ai.vercel.app/';
          } else if (
            lower.includes('ticket') ||
            lower.includes('support') ||
            lower.includes('bert') ||
            lower.includes('dispatcher')
          ) {
            ans =
              '📩 Customer Support Ticket Dispatcher ML:\nA fine-tuned BERT transformer NLP model for automated departmental email classification and real-time urgency scoring with sub-120ms inference latency.';
          } else if (
            lower.includes('shield') ||
            lower.includes('block') ||
            lower.includes('mv3') ||
            lower.includes('extension')
          ) {
            ans =
              '🛡️ ShieldBlock MV3 Blocker:\nHigh-performance Manifest V3 ad and tracker blocker using native declarativeNetRequest (DNR) with 16x audio ad bypass and real-time network streaming debug logger.';
          } else if (lower.includes('carbon') || lower.includes('green') || lower.includes('esg')) {
            ans =
              '🌱 Carbon Guardian AI:\nEnterprise ESG sustainability platform powered by TensorFlow Recommenders and dynamic gamification economy to optimize corporate carbon footprints.';
          } else if (
            lower.includes('letter') ||
            lower.includes('guess') ||
            lower.includes('constraint')
          ) {
            ans =
              '🔤 LetterGuess Deterministic Solver:\nOffline Python / SQLite candidate generation and search-space reduction engine with conservative regex constraint analysis.';
          } else if (
            lower.includes('startpage') ||
            lower.includes('browser') ||
            lower.includes('theme')
          ) {
            ans =
              '🖥️ Custom Browser Startpage v2.0:\nPrivacy launchpad with 13 premium themes, CSP hardening, and live weather radar telemetry. Live on Netlify at https://dailycosmos.netlify.app/';
          } else if (
            lower.includes('cosmic') ||
            lower.includes('3d') ||
            lower.includes('webgl') ||
            lower.includes('three')
          ) {
            ans =
              '🌌 3D Cosmic WebGL Engine:\nGPU-accelerated Three.js r128 visualizer featuring 6-in-1 physics modes (Galaxy Vortex, Solar System, Supernova, Retrowave Sun) running at 60 FPS.';
          } else if (
            lower.includes('college') ||
            lower.includes('degree') ||
            lower.includes('university') ||
            lower.includes('grad') ||
            lower.includes('education')
          ) {
            ans =
              '🎓 Harshit is pursuing his B.Tech in Artificial Intelligence & Machine Learning (Class of 2029) based in New Delhi.';
          } else if (
            lower.includes('contact') ||
            lower.includes('email') ||
            lower.includes('reach')
          ) {
            ans =
              '📬 Reach Harshit:\n- Email: codewithharshitsharma@gmail.com\n- GitHub: https://github.com/harshitthek\n- LinkedIn: https://www.linkedin.com/in/devharshitsharma\n- Discord: harshit0';
          } else {
            ans = `Harshit Sharma is an AI Systems Engineer specializing in Machine Learning, Deep Learning (BERT), LLM Agent sandboxes, and full-stack systems (Class of 2029).`;
          }

          newHistory.push({ type: 'ai', text: `🧠 AI REASONING SYNTHESIS:\n${ans}` });
        }
        break;

      case 'projects':
        newHistory.push(
          { type: 'sys', text: `🚀 HARSHIT SHARMA'S ${projectsData.length} FLAGSHIP UNIVERSES:` },
          ...projectsData.map((p, i) => ({
            type: 'out',
            text: `  [${i + 1}] ${p.title.padEnd(32)} // ${p.categoryLabel} (Run: 'deploy ${i + 1}')\n      Source: ${p.githubUrl || p.url}`
          }))
        );
        break;

      case 'deploy':
      case 'launch':
        if (!arg) {
          newHistory.push({
            type: 'err',
            text: `Usage: deploy <1-${projectsData.length}> or deploy <name> (e.g. 'deploy 1' or 'deploy autovaluate')`
          });
        } else {
          const num = parseInt(arg, 10);
          let target = null;
          if (!Number.isNaN(num) && num >= 1 && num <= projectsData.length) {
            target = projectsData[num - 1];
          } else {
            target = projectsData.find(
              (p) =>
                p.id.toLowerCase().includes(arg.toLowerCase()) ||
                p.title.toLowerCase().includes(arg.toLowerCase())
            );
          }

          if (target) {
            newHistory.push({
              type: 'ok',
              text: `🚀 INITIATING DEPLOYMENT SEQUENCE FOR: ${target.title.toUpperCase()}...`
            });
            SoundFX.playDeploy();
            setTimeout(() => {
              onClose();
              if (onLaunch) onLaunch(target.title, target.demoUrl || target.url);
            }, 750);
          } else {
            newHistory.push({
              type: 'err',
              text: `Portal '${arg}' not found. Type 'projects' to list all ${projectsData.length} portals.`
            });
          }
        }
        break;

      case 'skills':
      case 'stack':
        newHistory.push(
          { type: 'sys', text: "🛠️ HARSHIT'S TECHNICAL ARSENAL:" },
          {
            type: 'out',
            text: '  Languages: Python 3.12, JavaScript (ES6+), TypeScript, C/C++, Bash, SQL'
          },
          {
            type: 'out',
            text: '  AI & ML: CatBoost, XGBoost, Scikit-Learn, PyTorch, BERT Transformers, TensorFlow, FastAPI'
          },
          {
            type: 'out',
            text: '  Frontend & 3D: React 19 / 18, Three.js / WebGL, HTML5 Canvas 2D, Vite, Tailwind CSS'
          },
          {
            type: 'out',
            text: '  DevOps & Systems: Docker, Manifest V3, PostgreSQL, Async SQLite, antiX Linux, Git CI/CD'
          }
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

      case 'cowsay': {
        const msg = arg || 'Harshit Sharma builds resilient autonomous AI systems!';
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
      }

      case 'fortune': {
        const randomFortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
        newHistory.push({ type: 'info', text: `🔮 ${randomFortune}` });
        break;
      }

      case 'matrix':
      case 'rain':
        setMatrixActive(true);
        SoundFX.playDeploy();
        newHistory.push({
          type: 'ok',
          text: '⚡ INITIATING MATRIX DIGITAL RAIN. Press ESC, Q, or click anywhere to exit.'
        });
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'exit':
        onClose();
        return;

      default:
        newHistory.push({
          type: 'err',
          text: `zsh: command not found: ${cmd}. Type 'help' to see all commands.`
        });
        break;
    }

    setHistory(newHistory);
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && (e.key === 'c' || e.key === 'C')) {
      e.preventDefault();
      e.stopPropagation();
      setHistory((prev) => [
        ...prev,
        { type: 'cmd', text: `harshit@neural-core ${currentPath} % ${inputVal}^C` }
      ]);
      setInputVal('');
      setHistoryIndex(-1);
      return;
    }

    if (e.ctrlKey && (e.key === 'l' || e.key === 'L')) {
      e.preventDefault();
      e.stopPropagation();
      setHistory([]);
      return;
    }

    if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
      e.preventDefault();
      e.stopPropagation();
      setInputVal('');
      return;
    }

    SoundFX.playKey();

    if (e.key === 'Enter') {
      handleCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const curr = inputVal.trim();
      if (!curr) return;

      const allCommands = [
        'help',
        'neofetch',
        'whoami',
        'uptime',
        'uname',
        'ping',
        'curl',
        'history',
        'date',
        'echo',
        'banner',
        'motd',
        'bio',
        'about',
        'skills',
        'stack',
        'projects',
        'contact',
        'socials',
        'top',
        'ps',
        'weather',
        'ls',
        'cd',
        'pwd',
        'cat',
        'tree',
        'ai',
        'ask',
        'deploy',
        'launch',
        'snake',
        'hack',
        'pwn',
        'matrix',
        'rain',
        'cowsay',
        'fortune',
        'theme',
        'clear',
        'exit'
      ];

      const parts = curr.split(/\s+/);

      if (parts.length === 1) {
        const match = allCommands.find((c) => c.startsWith(parts[0].toLowerCase()));
        if (match) setInputVal(match);
      } else if (parts[0].toLowerCase() === 'cat') {
        const filePrefix = parts[1].toLowerCase();
        const dirNode = getNodeFromVFS(currentPath);
        if (dirNode?.children) {
          const files = Object.keys(dirNode.children);
          const matchFile = files.find((f) => f.toLowerCase().startsWith(filePrefix));
          if (matchFile) setInputVal(`cat ${matchFile}`);
        }
      } else if (parts[0].toLowerCase() === 'cd') {
        const dirPrefix = parts[1].toLowerCase();
        const dirNode = getNodeFromVFS(currentPath);
        if (dirNode?.children) {
          const dirs = Object.keys(dirNode.children).filter(
            (k) => dirNode.children[k].type === 'dir'
          );
          const matchDir = dirs.find((d) => d.toLowerCase().startsWith(dirPrefix));
          if (matchDir) setInputVal(`cd ${matchDir}`);
        }
      } else if (parts[0].toLowerCase() === 'theme') {
        const themePrefix = parts[1].toLowerCase();
        const themeKeys = Object.keys(THEMES);
        const matchTheme = themeKeys.find((t) => t.startsWith(themePrefix));
        if (matchTheme) setInputVal(`theme ${matchTheme}`);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        if (historyIndex === -1) {
          setDraftInput(inputVal);
        }
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
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal(draftInput);
      }
    }
  };

  const quickChips = [
    { label: '⚡ neofetch', cmd: 'neofetch' },
    { label: '👤 whoami', cmd: 'whoami' },
    { label: '📡 ping', cmd: 'ping' },
    { label: '🌐 curl', cmd: 'curl' },
    { label: '🌧️ matrix', cmd: 'matrix' },
    { label: '🎮 snake', cmd: 'snake' },
    { label: '🤖 ai why hire?', cmd: 'ai why hire Harshit?' },
    { label: '🎨 theme cyan', cmd: 'theme cyan' }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className={`modal-card glass-modal terminal-modal ${isFullScreen ? 'fullscreen-terminal' : ''}`}
        style={{
          borderColor: activeThemeObj.primary,
          boxShadow: `0 25px 90px rgba(0,0,0,0.95), 0 0 45px ${activeThemeObj.glow}`
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-header terminal-hud-header">
          <div className="terminal-dots">
            <span
              className="t-dot red"
              role="button"
              tabIndex={0}
              onClick={onClose}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onClose();
              }}
              title="Close Terminal"
            ></span>
            <span
              className="t-dot yellow"
              role="button"
              tabIndex={0}
              onClick={() => setHistory([])}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setHistory([]);
              }}
              title="Clear Terminal (Ctrl+L)"
            ></span>
            <span
              className="t-dot green"
              role="button"
              tabIndex={0}
              onClick={() => setIsFullScreen(!isFullScreen)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setIsFullScreen(!isFullScreen);
              }}
              title="Toggle Fullscreen"
            ></span>
          </div>

          <div className="terminal-title-text" style={{ color: activeThemeObj.primary }}>
            {matrixActive
              ? `MATRIX DIGITAL RAIN · 60FPS STREAM · [${activeThemeObj.label}]`
              : snakeGameActive
                ? `CYBER-VIPER ARCADE 60FPS · ${activeThemeObj.label}`
                : `harshit@neural-core: ${currentPath} (zsh) · [${activeThemeObj.label}]`}
          </div>

          <div className="terminal-header-actions">
            <button
              type="button"
              className="btn-term-fs"
              onClick={() => setIsFullScreen(!isFullScreen)}
              title={isFullScreen ? 'Restore Window' : 'Expand Fullscreen'}
            >
              {isFullScreen ? '🗗 RESTORE' : '🗖 FULLSCREEN'}
            </button>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => {
                SoundFX.playClick();
                onClose();
              }}
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Body: Scroll-Locked Full-Screen Arcade / Matrix when active */}
        <div
          ref={modalBodyRef}
          className={`modal-body terminal-modal-body custom-scroll ${snakeGameActive || matrixActive ? 'snake-active-body' : ''}`}
          onClick={() => {
            if (!snakeGameActive && !matrixActive) inputRef.current?.focus();
            else if (snakeGameActive) snakeCanvasRef.current?.focus();
          }}
        >
          {matrixActive && (
            <div
              className="matrix-canvas-container"
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                minHeight: '440px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#040507',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              onClick={() => setMatrixActive(false)}
            >
              <canvas
                ref={matrixCanvasRef}
                style={{ width: '100%', height: '100%', display: 'block' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  background: 'rgba(0, 0, 0, 0.88)',
                  border: `1px solid ${activeThemeObj.primary}`,
                  color: activeThemeObj.primary,
                  padding: '8px 20px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontFamily: '"Space Mono", monospace',
                  letterSpacing: '1px',
                  pointerEvents: 'none',
                  boxShadow: `0 0 20px ${activeThemeObj.glow}`
                }}
              >
                ⚡ MATRIX STREAM ACTIVE · CLICK TO RETURN OR PRESS [ESC] / [Q]
              </div>
            </div>
          )}

          {!snakeGameActive && !matrixActive && (
            <>
              {history.map((line, idx) => (
                <div key={idx} className={`term-line line-${line.type}`}>
                  {line.type === 'neofetch' || line.type === 'code' ? (
                    <pre style={{ color: activeThemeObj.primary }}>{line.text}</pre>
                  ) : line.type === 'sys' || line.type === 'ok' ? (
                    <span style={{ color: activeThemeObj.primary }}>{line.text}</span>
                  ) : (
                    <span>{line.text}</span>
                  )}
                </div>
              ))}

              <div className="term-input-row">
                <span className="term-prompt" style={{ color: activeThemeObj.primary }}>
                  harshit@neural-core {currentPath} %
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
              <div ref={bottomRef} />
            </>
          )}

          {/* ── FULL-TERMINAL 60FPS ARCADE SNAKE STATION ── */}
          {snakeGameActive && (
            <div
              className="arcade-snake-container full-terminal-arcade"
              style={{ borderColor: activeThemeObj.primary }}
              onClick={() => snakeCanvasRef.current?.focus()}
            >
              {/* Arcade Top Telemetry Bar */}
              <div className="snake-arcade-hud">
                <div className="snake-stats-left">
                  <span className="snake-badge" style={{ color: activeThemeObj.primary }}>
                    🐍 CYBER ARCADE
                  </span>
                  <span className="snake-score-display">
                    SCORE: <strong>{snakeScore}</strong>
                  </span>
                  <span className="snake-hi-display">
                    HI: <strong>{snakeHighScore}</strong>
                  </span>
                  {combo > 1 && (
                    <span className="snake-combo-badge" style={{ color: activeThemeObj.primary }}>
                      COMBO x{combo} 🔥
                    </span>
                  )}
                  {activePowerUp && (
                    <span className="snake-powerup-badge">
                      {activePowerUp.type === 'SHIELD'
                        ? '🛡️ SHIELD'
                        : activePowerUp.type === 'SLOW'
                          ? '❄️ MATRIX TIME'
                          : activePowerUp.type === 'MAGNET'
                            ? '🧲 MAGNET'
                            : '⚡ 2X OVERCLOCK'}
                    </span>
                  )}
                </div>

                <div className="snake-controls-right">
                  <div className="snake-mode-selector">
                    <button
                      type="button"
                      className={`btn-mode-chip ${snakeMode === 'wrap' ? 'active' : ''}`}
                      onClick={() => {
                        SoundFX.playKey();
                        setSnakeMode('wrap');
                      }}
                      title="Wrap around borders"
                    >
                      WRAP
                    </button>
                    <button
                      type="button"
                      className={`btn-mode-chip ${snakeMode === 'walls' ? 'active' : ''}`}
                      onClick={() => {
                        SoundFX.playKey();
                        setSnakeMode('walls');
                      }}
                      title="Lethal electrified perimeter"
                    >
                      WALLS ⚡
                    </button>
                  </div>

                  <div className="snake-speed-selector">
                    {['normal', 'fast', 'insane'].map((s) => (
                      <button
                        type="button"
                        key={s}
                        className={`btn-speed-chip ${snakeSpeed === s ? 'active' : ''}`}
                        onClick={() => {
                          SoundFX.playKey();
                          setSnakeSpeed(s);
                        }}
                      >
                        {s.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Seamless Fitting Game Canvas Screen with Touch Swipe */}
              <div
                className="snake-canvas-wrapper"
                onTouchStart={handleCanvasTouchStart}
                onTouchEnd={handleCanvasTouchEnd}
              >
                <canvas
                  ref={snakeCanvasRef}
                  className="snake-game-canvas"
                  tabIndex={0}
                  onClick={(e) => e.stopPropagation()}
                />

                {/* Pause Overlay */}
                {isPaused && !snakeGameOver && (
                  <div className="snake-pause-overlay">
                    <span className="pause-title">⏸ SYSTEM PAUSED</span>
                    <span className="pause-subtitle">PRESS [P] OR [SPACE] TO RESUME</span>
                    <button
                      type="button"
                      className="btn-snake-act retry"
                      onClick={() => setIsPaused(false)}
                    >
                      RESUME MISSION
                    </button>
                  </div>
                )}

                {/* Game Over Mission Summary Overlay */}
                {snakeGameOver && (
                  <div className="snake-gameover-overlay">
                    <span className="over-title">
                      💀 MISSION TERMINATED {/* SCORE: */}
                      {snakeScore} PTS
                    </span>
                    {isNewHighScore && (
                      <span className="new-hi-banner" style={{ color: activeThemeObj.primary }}>
                        🏆 NEW RECORD SET IN {snakeMode.toUpperCase()} MODE!
                      </span>
                    )}
                    <div className="gameover-stats-grid">
                      <span>
                        Data Orbs: <strong>{applesEaten}</strong>
                      </span>
                      <span>
                        Max Combo: <strong>x{maxCombo}</strong>
                      </span>
                      <span>
                        Difficulty: <strong>{snakeSpeed.toUpperCase()}</strong>
                      </span>
                      <span>
                        Arena: <strong>{snakeMode.toUpperCase()}</strong>
                      </span>
                    </div>
                    <div className="over-buttons">
                      <button
                        type="button"
                        className="btn-snake-act retry"
                        onClick={startSnakeGame}
                      >
                        ↺ RESTART (R / ENTER)
                      </button>
                      <button
                        type="button"
                        className="btn-snake-act quit"
                        onClick={() => setSnakeGameActive(false)}
                      >
                        QUIT TO SHELL (Q / ESC)
                      </button>
                    </div>
                  </div>
                )}

                {/* On-Screen D-Pad Controls for Mobile */}
                <div className="snake-dpad-controls">
                  <button
                    type="button"
                    className="dpad-btn up"
                    onClick={() => changeSnakeDirection('UP')}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      changeSnakeDirection('UP');
                    }}
                  >
                    ▲
                  </button>
                  <div className="dpad-mid-row">
                    <button
                      type="button"
                      className="dpad-btn left"
                      onClick={() => changeSnakeDirection('LEFT')}
                      onTouchStart={(e) => {
                        e.preventDefault();
                        changeSnakeDirection('LEFT');
                      }}
                    >
                      ◀
                    </button>
                    <button
                      type="button"
                      className="dpad-btn pause"
                      onClick={() => setIsPaused(!isPaused)}
                      onTouchStart={(e) => {
                        e.preventDefault();
                        setIsPaused(!isPaused);
                      }}
                    >
                      {isPaused ? '▶' : '⏸'}
                    </button>
                    <button
                      type="button"
                      className="dpad-btn right"
                      onClick={() => changeSnakeDirection('RIGHT')}
                      onTouchStart={(e) => {
                        e.preventDefault();
                        changeSnakeDirection('RIGHT');
                      }}
                    >
                      ▶
                    </button>
                  </div>
                  <button
                    type="button"
                    className="dpad-btn down"
                    onClick={() => changeSnakeDirection('DOWN')}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      changeSnakeDirection('DOWN');
                    }}
                  >
                    ▼
                  </button>
                </div>
              </div>

              {!snakeGameOver && (
                <div className="snake-game-footer-bar">
                  <span>
                    Steer: <kbd>↑</kbd>
                    <kbd>↓</kbd>
                    <kbd>←</kbd>
                    <kbd>→</kbd> or <kbd>W</kbd>
                    <kbd>A</kbd>
                    <kbd>S</kbd>
                    <kbd>D</kbd>
                  </span>
                  <span>·</span>
                  <span>
                    <kbd>P</kbd> Pause
                  </span>
                  <span>·</span>
                  <span>
                    <kbd>R</kbd> Restart
                  </span>
                  <span>·</span>
                  <button
                    type="button"
                    className="btn-snake-quit-inline"
                    onClick={() => setSnakeGameActive(false)}
                  >
                    QUIT TO SHELL (ESC)
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips (Visible only when in shell mode) */}
        {!snakeGameActive && (
          <div className="terminal-quick-chips-bar">
            <span className="chips-label">QUICK CMDS:</span>
            {quickChips.map((chip) => (
              <button
                type="button"
                key={chip.cmd || chip.label}
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
        )}

        <div className="modal-footer terminal-footer-tips">
          {snakeGameActive ? (
            <span>
              ARCADE CONTROLS: <kbd>Arrow Keys</kbd> or <kbd>WASD</kbd> · <kbd>P</kbd> Pause ·{' '}
              <kbd>R</kbd> Quick Restart · <kbd>ESC</kbd> Exit to Terminal
            </span>
          ) : (
            <span>
              TIPS: Press <kbd>Tab</kbd> to autocomplete · <kbd>Ctrl+C</kbd> cancel ·{' '}
              <kbd>Ctrl+L</kbd> clear · <kbd>↑</kbd>/<kbd>↓</kbd> history
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
