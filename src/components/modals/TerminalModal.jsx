import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { SoundFX } from '../SoundFX';
import { projectsData } from '../../data/projectsData';

// Full Virtual Filesystem Structure
const VIRTUAL_FS = {
  '~': {
    type: 'dir',
    children: {
      'bio.txt': {
        type: 'file',
        size: '1.6 KB',
        content: `=====================================================
HARSHIT SHARMA // ARTIFICIAL INTELLIGENCE & SYSTEMS ENGINEER
=====================================================
Institution : University School of Automation & Robotics (USAR, GGSIPU), New Delhi
Degree      : B.Tech in Artificial Intelligence & Machine Learning
Location    : New Delhi, India
GitHub      : https://github.com/harshitthek
LinkedIn    : https://www.linkedin.com/in/devharshitsharma
Email       : codewithharshitsharma@gmail.com

Core Technical Arsenal:
- Autonomous Multi-Agent LLM Orchestration & Evaluation Pipelines
- CatBoost & XGBoost Stacking ML Ensembles with 97.4% R² Confidence
- Fine-Tuned BERT NLP Deep Learning Departmental Classifiers
- High-Performance Chrome Manifest V3 Network Engines (DeclarativeNetRequest)
- Deterministic Constraint Reducers & Search-Space Budgeting
- GPU-Accelerated 3D WebGL / Three.js Visual Engines (60 FPS)`
      },
      'contact.json': {
        type: 'file',
        size: '560 B',
        content: JSON.stringify({
          name: "Harshit Sharma",
          role: "AI Engineer & ML Systems Architect",
          institution: "USAR (GGSIPU), New Delhi",
          degree: "B.Tech AI & ML",
          email: "codewithharshitsharma@gmail.com",
          github: "https://github.com/harshitthek",
          linkedin: "https://www.linkedin.com/in/devharshitsharma",
          discord: "harshit0",
          status: "Open to AI/ML Research, LLM Agent Engineering & Systems Roles"
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
const positions = new Float32Array(particleCount * 3);
// Steered by mouse raycasting in real-time`
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
      'skills': {
        type: 'dir',
        children: {
          'stack.json': {
            type: 'file',
            size: '980 B',
            content: JSON.stringify({
              languages: ["Python 3.12", "JavaScript (ES6+)", "TypeScript", "C/C++", "SQL", "Bash"],
              ai_machine_learning: ["CatBoost", "XGBoost", "Scikit-Learn", "PyTorch", "BERT Transformers", "TensorFlow", "FastAPI"],
              frontend_3d: ["React 19 / 18", "Three.js / WebGL", "HTML5 Canvas 2D", "Vite", "Tailwind CSS"],
              devops_systems: ["Docker Containers", "PostgreSQL", "Async SQLite", "Manifest V3", "Linux (antiX / Ubuntu)", "GitHub CI/CD"]
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
  "\"Simplicity is prerequisite for reliability.\" — Edsger W. Dijkstra",
  "\"The best way to predict the future is to invent it.\" — Alan Kay",
  "\"Autonomous agents will write code, verify code, and deploy code — engineer the harness.\" — Harshit Sharma",
  "\"Programs must be written for people to read, and only incidentally for machines to execute.\" — Hal Abelson",
  "\"Talk is cheap. Show me the code.\" — Linus Torvalds",
  "\"Any sufficiently advanced technology is indistinguishable from magic.\" — Arthur C. Clarke"
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

// Helper: Get node in VFS from normalized path
function getNodeFromVFS(normalizedPath) {
  if (normalizedPath === '~') return VIRTUAL_FS['~'];
  const parts = normalizedPath.slice(2).split('/').filter(Boolean);
  let curr = VIRTUAL_FS['~'];
  for (const part of parts) {
    if (!curr || curr.type !== 'dir' || !curr.children || !curr.children[part]) {
      return null;
    }
    curr = curr.children[part];
  }
  return curr;
}

export default function TerminalModal({ onClose, onLaunch }) {
  const [history, setHistory] = useState([
    { type: 'sys', text: '╔══════════════════════════════════════════════════════════════════════╗' },
    { type: 'sys', text: '║     HARSHIT SHARMA CYBER LAB INTERACTIVE ZSH SHELL [v6.6.0-PRO]      ║' },
    { type: 'sys', text: '║     Host: USAR (GGSIPU) Neural Engine · Clearance: LEVEL 5 ROOT      ║' },
    { type: 'sys', text: '╚══════════════════════════════════════════════════════════════════════╝' },
    { type: 'info', text: "Type 'help' for full command suite, or try: 'neofetch', 'ai <query>', 'snake', 'hack', 'top'." },
    { type: 'space', text: '' }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [draftInput, setDraftInput] = useState('');
  const [currentPath, setCurrentPath] = useState('~');
  const [currentTheme, setCurrentTheme] = useState('green');
  const [isFullScreen, setIsFullScreen] = useState(false);

  // ── SUPERCHARGED SNAKE ARCADE GAME STATE ──
  const [snakeGameActive, setSnakeGameActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [snakeScore, setSnakeScore] = useState(0);
  const [snakeMode, setSnakeMode] = useState('wrap'); // 'wrap' (pass through) | 'walls' (lethal walls)
  const [snakeSpeed, setSnakeSpeed] = useState('normal'); // 'normal' (110ms) | 'fast' (75ms) | 'insane' (48ms)
  const [combo, setCombo] = useState(1);
  const [maxCombo, setMaxCombo] = useState(1);
  const [applesEaten, setApplesEaten] = useState(0);
  const [activePowerUp, setActivePowerUp] = useState(null); // { type: 'SHIELD'|'SLOW'|'2X', expiresAt: number }
  const [snakeGameOver, setSnakeGameOver] = useState(false);
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  const getHighScoreKey = useCallback(() => `harshit_snake_hi_${snakeMode}_${snakeSpeed}`, [snakeMode, snakeSpeed]);

  const [snakeHighScore, setSnakeHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('harshit_snake_hi_wrap_normal') || '0', 10);
    } catch {
      return 0;
    }
  });

  // Sync high score when speed or mode changes
  useEffect(() => {
    try {
      const saved = parseInt(localStorage.getItem(getHighScoreKey()) || '0', 10);
      setSnakeHighScore(saved);
    } catch {
      setSnakeHighScore(0);
    }
  }, [getHighScoreKey]);

  const snakeCanvasRef = useRef(null);
  const snakeStateRef = useRef({
    snake: [{ x: 7, y: 7 }, { x: 6, y: 7 }, { x: 5, y: 7 }, { x: 4, y: 7 }],
    food: { x: 14, y: 7 },
    goldenFood: null, // { x, y, expiresAt }
    powerUpItem: null, // { x, y, type: 'SHIELD'|'SLOW'|'2X', expiresAt }
    dir: { x: 1, y: 0 },
    dirQueue: [],
    particles: [],
    floatingTexts: [],
    lastEatTime: 0,
    scanLineY: 0,
    hasShield: false
  });

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const modalBodyRef = useRef(null);
  const snakeLoopRef = useRef(null);

  // Focus input automatically on mount
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  // Auto scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (modalBodyRef.current) {
      modalBodyRef.current.scrollTop = modalBodyRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, snakeGameActive, scrollToBottom]);

  // Direction changer with input queue buffer
  const changeSnakeDirection = useCallback((dirKey) => {
    const state = snakeStateRef.current;
    const currentOrLastQueued = state.dirQueue.length > 0 
      ? state.dirQueue[state.dirQueue.length - 1] 
      : state.dir;

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

  // ── SUPERCHARGED SNAKE ARCADE GAME ENGINE LOOP ──
  useEffect(() => {
    if (!snakeGameActive || snakeGameOver || isPaused) {
      if (snakeLoopRef.current) clearInterval(snakeLoopRef.current);
      return;
    }

    const canvas = snakeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gridSize = 20;
    const cols = 24;
    const rows = 16;
    canvas.width = cols * gridSize;
    canvas.height = rows * gridSize;

    const speedIntervals = { normal: 110, fast: 75, insane: 48 };
    let intervalMs = speedIntervals[snakeSpeed] || 110;
    if (activePowerUp && activePowerUp.type === 'SLOW' && activePowerUp.expiresAt > Date.now()) {
      intervalMs = Math.round(intervalMs * 1.5);
    }

    snakeLoopRef.current = setInterval(() => {
      const state = snakeStateRef.current;
      const now = Date.now();

      // Process queued direction
      if (state.dirQueue.length > 0) {
        state.dir = state.dirQueue.shift();
      }

      // Check power-up expiration
      if (activePowerUp && activePowerUp.expiresAt <= now) {
        setActivePowerUp(null);
        state.hasShield = false;
      }

      // Check combo expiration (3.5s window)
      if (state.lastEatTime > 0 && now - state.lastEatTime > 3500) {
        setCombo(1);
      }

      // Expire golden food
      if (state.goldenFood && state.goldenFood.expiresAt <= now) {
        state.goldenFood = null;
      }

      // Expire power up on map
      if (state.powerUpItem && state.powerUpItem.expiresAt <= now) {
        state.powerUpItem = null;
      }

      const head = {
        x: state.snake[0].x + state.dir.x,
        y: state.snake[0].y + state.dir.y
      };

      // Wall collision or wrap
      let hitWall = false;
      if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
        if (snakeMode === 'walls') {
          hitWall = true;
        } else {
          // Wrap
          if (head.x < 0) head.x = cols - 1;
          if (head.x >= cols) head.x = 0;
          if (head.y < 0) head.y = rows - 1;
          if (head.y >= rows) head.y = 0;
        }
      }

      // Self collision
      const hitSelf = state.snake.some(seg => seg.x === head.x && seg.y === head.y);

      if (hitWall || hitSelf) {
        // Check Shield Power-Up Protection
        if (state.hasShield) {
          state.hasShield = false;
          setActivePowerUp(null);
          SoundFX.playDeploy();
          state.floatingTexts.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            text: '🛡️ SHIELD BROKEN! SAVED FROM CRASH',
            color: '#38bdf8',
            life: 1.2
          });
          // Bounce back to safe coordinate inside arena
          if (head.x < 0) head.x = 0;
          if (head.x >= cols) head.x = cols - 1;
          if (head.y < 0) head.y = 0;
          if (head.y >= rows) head.y = rows - 1;
        } else {
          setSnakeGameOver(true);
          SoundFX.playDeploy();
          // Check High Score
          if (snakeScore > snakeHighScore) {
            setIsNewHighScore(true);
            try {
              localStorage.setItem(getHighScoreKey(), String(snakeScore));
            } catch {}
            confetti({
              particleCount: 75,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#00ff88', '#38bdf8', '#fbbf24', '#c084fc']
            });
          }
          return;
        }
      }

      state.snake.unshift(head);

      // Helper function to find empty cell
      const getRandomEmptyCell = () => {
        let cell;
        while (!cell || state.snake.some(s => s.x === cell.x && s.y === cell.y)) {
          cell = {
            x: Math.floor(Math.random() * cols),
            y: Math.floor(Math.random() * rows)
          };
        }
        return cell;
      };

      let ateFood = false;

      // 1. Check Normal Data Orb Collision
      if (head.x === state.food.x && head.y === state.food.y) {
        ateFood = true;
        SoundFX.playSuccess();

        // Calculate score with combo and 2X multiplier
        const is2X = activePowerUp && activePowerUp.type === '2X' && activePowerUp.expiresAt > now;
        const currentMult = (is2X ? 2 : 1) * combo;
        const speedBonus = snakeSpeed === 'insane' ? 25 : snakeSpeed === 'fast' ? 15 : 10;
        const points = speedBonus * currentMult;

        setSnakeScore(prev => {
          const next = prev + points;
          if (next > snakeHighScore) setSnakeHighScore(next);
          return next;
        });

        setApplesEaten(prev => {
          const nextCount = prev + 1;
          // Spawn Golden Glitch Bit every 4 normal orbs
          if (nextCount % 4 === 0 && !state.goldenFood) {
            state.goldenFood = {
              ...getRandomEmptyCell(),
              expiresAt: Date.now() + 8000
            };
            SoundFX.playDeploy();
            state.floatingTexts.push({
              x: state.goldenFood.x * gridSize + gridSize / 2,
              y: state.goldenFood.y * gridSize,
              text: '⚡ GOLDEN GLITCH DETECTED!',
              color: '#fbbf24',
              life: 1.0
            });
          }

          // Spawn random Power-Up every 6 normal orbs
          if (nextCount % 6 === 0 && !state.powerUpItem) {
            const types = ['SHIELD', 'SLOW', '2X'];
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

          return nextCount;
        });

        // Update combo
        setCombo(prev => {
          const nextCombo = Math.min(5, prev + 1);
          if (nextCombo > maxCombo) setMaxCombo(nextCombo);
          return nextCombo;
        });
        state.lastEatTime = now;

        // Floating score popup
        state.floatingTexts.push({
          x: head.x * gridSize + gridSize / 2,
          y: head.y * gridSize,
          text: `+${points}${combo > 1 ? ` (x${combo} COMBO!)` : ''}`,
          color: '#00ff88',
          life: 1.0
        });

        // Particle explosion
        for (let i = 0; i < 10; i++) {
          state.particles.push({
            x: head.x * gridSize + gridSize / 2,
            y: head.y * gridSize + gridSize / 2,
            vx: (Math.random() - 0.5) * 7,
            vy: (Math.random() - 0.5) * 7,
            life: 1.0,
            color: '#00ff88'
          });
        }

        // New regular food
        state.food = getRandomEmptyCell();
      }

      // 2. Check Golden Glitch Collision
      if (state.goldenFood && head.x === state.goldenFood.x && head.y === state.goldenFood.y) {
        ateFood = true;
        SoundFX.playDeploy();
        const goldPoints = 50 * (activePowerUp && activePowerUp.type === '2X' ? 2 : 1);
        setSnakeScore(prev => {
          const next = prev + goldPoints;
          if (next > snakeHighScore) setSnakeHighScore(next);
          return next;
        });
        state.floatingTexts.push({
          x: head.x * gridSize + gridSize / 2,
          y: head.y * gridSize,
          text: `+${goldPoints} GOLD GLITCH! 🌟`,
          color: '#fbbf24',
          life: 1.2
        });
        for (let i = 0; i < 14; i++) {
          state.particles.push({
            x: head.x * gridSize + gridSize / 2,
            y: head.y * gridSize + gridSize / 2,
            vx: (Math.random() - 0.5) * 9,
            vy: (Math.random() - 0.5) * 9,
            life: 1.0,
            color: '#fbbf24'
          });
        }
        state.goldenFood = null;
      }

      // 3. Check Power-Up Collision
      if (state.powerUpItem && head.x === state.powerUpItem.x && head.y === state.powerUpItem.y) {
        ateFood = true;
        SoundFX.playDeploy();
        const pType = state.powerUpItem.type;
        setActivePowerUp({ type: pType, expiresAt: now + 8000 });
        if (pType === 'SHIELD') state.hasShield = true;
        state.floatingTexts.push({
          x: head.x * gridSize + gridSize / 2,
          y: head.y * gridSize,
          text: `✨ ${pType} ACTIVATED! (8s)`,
          color: '#c084fc',
          life: 1.2
        });
        for (let i = 0; i < 12; i++) {
          state.particles.push({
            x: head.x * gridSize + gridSize / 2,
            y: head.y * gridSize + gridSize / 2,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8,
            life: 1.0,
            color: '#c084fc'
          });
        }
        state.powerUpItem = null;
      }

      if (!ateFood) {
        state.snake.pop();
      }

      // ── RENDER HIGH-TECH CYBER CANVAS FRAME ──
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Scanning Laser Radar Line
      state.scanLineY = (state.scanLineY + 2) % canvas.height;
      const gradScan = ctx.createLinearGradient(0, state.scanLineY - 15, 0, state.scanLineY + 15);
      gradScan.addColorStop(0, 'rgba(0, 255, 136, 0)');
      gradScan.addColorStop(0.5, 'rgba(0, 255, 136, 0.08)');
      gradScan.addColorStop(1, 'rgba(0, 255, 136, 0)');
      ctx.fillStyle = gradScan;
      ctx.fillRect(0, state.scanLineY - 15, canvas.width, 30);

      // 2. Draw Subtle Cyber Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
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

      // 3. Draw Hardcore Lethal Wall Perimeter
      if (snakeMode === 'walls') {
        ctx.strokeStyle = '#f87171';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#f87171';
        ctx.shadowBlur = 10;
        ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);
        ctx.shadowBlur = 0;
      }

      // 4. Draw Regular Food (Cyan Glowing Data Orb)
      const foodPulse = Math.sin(now / 160) * 2;
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(
        state.food.x * gridSize + gridSize / 2,
        state.food.y * gridSize + gridSize / 2,
        gridSize / 2.8 + foodPulse * 0.4,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.shadowBlur = 0;

      // 5. Draw Golden Glitch Bit (if active)
      if (state.goldenFood) {
        const remainingGoldMs = Math.max(0, state.goldenFood.expiresAt - now);
        const goldRatio = remainingGoldMs / 8000;
        const gx = state.goldenFood.x * gridSize + gridSize / 2;
        const gy = state.goldenFood.y * gridSize + gridSize / 2;

        ctx.fillStyle = '#fbbf24';
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(gx, gy, gridSize / 2.4, 0, Math.PI * 2);
        ctx.fill();

        // Countdown timer arc
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(gx, gy, gridSize / 2 + 2, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * goldRatio));
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // 6. Draw Power-Up Item (if active on grid)
      if (state.powerUpItem) {
        const px = state.powerUpItem.x * gridSize + gridSize / 2;
        const py = state.powerUpItem.y * gridSize + gridSize / 2;
        ctx.fillStyle = '#c084fc';
        ctx.shadowColor = '#c084fc';
        ctx.shadowBlur = 15;
        ctx.fillRect(px - gridSize / 3, py - gridSize / 3, (gridSize / 3) * 2, (gridSize / 3) * 2);
        ctx.shadowBlur = 0;
      }

      // 7. Draw Snake Body & Cyber Head with Directional Eyes
      state.snake.forEach((seg, idx) => {
        const isHead = idx === 0;
        const t = idx / Math.max(1, state.snake.length);

        if (isHead) {
          ctx.fillStyle = '#00ff88';
          ctx.shadowColor = state.hasShield ? '#38bdf8' : '#00ff88';
          ctx.shadowBlur = state.hasShield ? 20 : 14;

          // Shield Aura Ring
          if (state.hasShield) {
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 2;
            ctx.strokeRect(seg.x * gridSize - 2, seg.y * gridSize - 2, gridSize + 4, gridSize + 4);
          }

          ctx.fillRect(seg.x * gridSize + 1, seg.y * gridSize + 1, gridSize - 2, gridSize - 2);

          // Draw Cyber Head Eyes
          ctx.fillStyle = '#060606';
          const ex = seg.x * gridSize;
          const ey = seg.y * gridSize;
          let eye1 = { x: ex + 5, y: ey + 5 };
          let eye2 = { x: ex + 15, y: ey + 5 };

          if (state.dir.x === 1) { // Right
            eye1 = { x: ex + 13, y: ey + 5 };
            eye2 = { x: ex + 13, y: ey + 15 };
          } else if (state.dir.x === -1) { // Left
            eye1 = { x: ex + 5, y: ey + 5 };
            eye2 = { x: ex + 5, y: ey + 15 };
          } else if (state.dir.y === 1) { // Down
            eye1 = { x: ex + 5, y: ey + 13 };
            eye2 = { x: ex + 15, y: ey + 13 };
          } else if (state.dir.y === -1) { // Up
            eye1 = { x: ex + 5, y: ey + 5 };
            eye2 = { x: ex + 15, y: ey + 5 };
          }

          ctx.beginPath();
          ctx.arc(eye1.x, eye1.y, 2, 0, Math.PI * 2);
          ctx.arc(eye2.x, eye2.y, 2, 0, Math.PI * 2);
          ctx.fill();

        } else {
          // Gradient Tail Interpolation (Electric Green -> Neon Cyan/Dark Emerald)
          const r = Math.round(0 + t * 14);
          const g = Math.round(255 - t * 100);
          const b = Math.round(136 + t * 90);
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.shadowBlur = 0;
          ctx.fillRect(seg.x * gridSize + 2, seg.y * gridSize + 2, gridSize - 4, gridSize - 4);
        }
      });
      ctx.shadowBlur = 0;

      // 8. Draw Particles
      state.particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.06;
        if (p.life > 0) {
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.life;
          ctx.fillRect(p.x, p.y, 3, 3);
          ctx.globalAlpha = 1.0;
        } else {
          state.particles.splice(idx, 1);
        }
      });

      // 9. Draw Floating Text Popups
      state.floatingTexts.forEach((ft, idx) => {
        ft.y -= 0.75;
        ft.life -= 0.035;
        if (ft.life > 0) {
          ctx.font = 'bold 11px "Space Mono", monospace';
          ctx.fillStyle = ft.color;
          ctx.globalAlpha = ft.life;
          ctx.shadowColor = ft.color;
          ctx.shadowBlur = 8;
          ctx.textAlign = 'center';
          ctx.fillText(ft.text, ft.x, ft.y);
          ctx.globalAlpha = 1.0;
          ctx.shadowBlur = 0;
        } else {
          state.floatingTexts.splice(idx, 1);
        }
      });

    }, intervalMs);

    return () => clearInterval(snakeLoopRef.current);
  }, [snakeGameActive, snakeGameOver, isPaused, snakeMode, snakeSpeed, snakeScore, snakeHighScore, activePowerUp, combo, maxCombo, getHighScoreKey]);

  // Global window-level key listener with capture phase
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      // 1. SNAKE GAME ACTIVE
      if (snakeGameActive) {
        const k = e.key.toLowerCase();

        // Pause Toggle
        if (k === 'p' || (e.key === ' ' && !snakeGameOver)) {
          e.preventDefault();
          e.stopPropagation();
          setIsPaused(prev => !prev);
          SoundFX.playClick();
          return;
        }

        // Direction steering
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

        // Game Over Quick Restart
        if (snakeGameOver && (k === 'r' || k === 'enter')) {
          e.preventDefault();
          e.stopPropagation();
          startSnakeGame();
          return;
        }

        // Quit to Shell
        if (k === 'escape' || k === 'q') {
          e.preventDefault();
          e.stopPropagation();
          setSnakeGameActive(false);
          setHistory(h => [
            ...h,
            { type: 'info', text: `🎮 Snake session completed. Final Score: ${snakeScore} PTS (Max Combo: x${maxCombo})` }
          ]);
          return;
        }

        if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(k)) {
          e.preventDefault();
          e.stopPropagation();
        }
        return;
      }

      // 2. NORMAL TERMINAL MODE
      if (inputRef.current && document.activeElement !== inputRef.current) {
        if (!e.ctrlKey && !e.metaKey && !e.altKey && e.key.length === 1) {
          inputRef.current.focus();
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown, true);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown, true);
  }, [snakeGameActive, snakeGameOver, isPaused, snakeScore, maxCombo, changeSnakeDirection]);

  // Focus management
  useEffect(() => {
    if (snakeGameActive) {
      snakeCanvasRef.current?.focus();
    } else {
      inputRef.current?.focus();
    }
  }, [snakeGameActive]);

  const startSnakeGame = () => {
    snakeStateRef.current = {
      snake: [{ x: 7, y: 7 }, { x: 6, y: 7 }, { x: 5, y: 7 }, { x: 4, y: 7 }],
      food: { x: 14, y: 7 },
      goldenFood: null,
      powerUpItem: null,
      dir: { x: 1, y: 0 },
      dirQueue: [],
      particles: [],
      floatingTexts: [],
      lastEatTime: 0,
      scanLineY: 0,
      hasShield: false
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
  };

  const handleCommand = (raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    setCmdHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);
    setDraftInput('');

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
          { type: 'out', text: '  skills / stack    - Breakdown of AI/ML, full-stack, and systems proficiencies' },
          { type: 'out', text: `  projects          - List all ${projectsData.length} flagship engineering universes with live links` },
          { type: 'out', text: '  contact / socials - Direct email, GitHub, LinkedIn, and Discord endpoints' },
          { type: 'out', text: '  top / ps          - Real-time running background daemon telemetry' },
          { type: 'out', text: '  weather           - Live telemetry weather radar for New Delhi' },
          { type: 'info', text: '── FILESYSTEM NAVIGATION ──' },
          { type: 'out', text: '  ls [-l] [<path>]  - List directory contents (e.g. ls, ls -l, ls projects)' },
          { type: 'out', text: '  cd <dir>          - Change directory (e.g. cd projects, cd .., cd ~)' },
          { type: 'out', text: '  pwd               - Print current working directory path' },
          { type: 'out', text: '  cat <file>        - Inspect formatted source code files (e.g. cat bio.txt, cat 03_autovaluate_model.py)' },
          { type: 'out', text: '  tree              - Render complete hierarchical directory tree' },
          { type: 'info', text: '── AI ASSISTANT & LAUNCHER ──' },
          { type: 'out', text: '  ai / ask <query>  - Ask the built-in AI reasoning engine technical questions' },
          { type: 'out', text: `  deploy <1-${projectsData.length}|name> - Initiate deployment sequence for a target universe` },
          { type: 'info', text: '── GAMES, CYBER FX & CUSTOMIZATION ──' },
          { type: 'out', text: '  snake             - Play the 60fps Arcade Canvas Snake Game with Combos & Power-ups' },
          { type: 'out', text: '  hack / pwn        - Cinematic Hollywood cyber penetration sequence' },
          { type: 'out', text: '  matrix            - Digital cascading neural code stream' },
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
                            Theme: ${THEMES[currentTheme]?.label || 'CLASSIC MATRIX GREEN'}
                            CPU: Intel i9-14900K @ 5.80GHz (24 Cores)
                            GPU: NVIDIA RTX 4090 24GB VRAM
                            AI Stack: CatBoost, XGBoost, PyTorch, BERT, FastAPI, Three.js
                            Primary Repos: AutoValuate AI, Resilient, Yggdrasil, Ticket Dispatcher ML
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
        newHistory.push({ type: 'info', text: '🎮 INITIATING 60FPS ARCADE CANVAS SNAKE ENGINE. Arrow Keys or WASD to steer · P to Pause · R to Restart · Q to Quit.' });
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
          { type: 'ok', text: `[05/05] 🚀 ACCESS GRANTED. LEVEL 5 ROOT CLEARANCE UNLOCKED. ALL ${projectsData.length} UNIVERSES LIVE.` }
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
        const targetArg = parts.slice(1).find(p => !p.startsWith('-')) || '';
        const targetPath = targetArg ? resolvePath(targetArg, currentPath) : currentPath;
        const dirNode = getNodeFromVFS(targetPath);

        if (!dirNode) {
          newHistory.push({ type: 'err', text: `ls: cannot access '${targetArg || currentPath}': No such file or directory` });
        } else if (dirNode.type === 'file') {
          newHistory.push({ type: 'out', text: `📄 ${targetArg} (${dirNode.size || '1.0 KB'})` });
        } else {
          const entries = Object.keys(dirNode.children || {});
          if (isLong) {
            newHistory.push({ type: 'info', text: `total ${entries.length * 4}` });
            entries.forEach(e => {
              const item = dirNode.children[e];
              const perm = item.type === 'dir' ? 'drwxr-xr-x' : '-rw-r--r--';
              const size = item.size || (item.type === 'dir' ? '4.0 KB' : '1.2 KB');
              newHistory.push({
                type: item.type === 'dir' ? 'info' : 'out',
                text: `${perm}  1 harshit harshit  ${size.padEnd(7)} Aug 16 00:00  ${e}${item.type === 'dir' ? '/' : ''}`
              });
            });
          } else {
            const list = entries.map(e => dirNode.children[e].type === 'dir' ? `📁 ${e}/` : `📄 ${e}`).join('   ');
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
          newHistory.push({ type: 'err', text: "Usage: cat <filename> (e.g. 'cat bio.txt', 'cat projects/01_yggdrasil.py', 'cat contact.json')" });
        } else {
          const targetPath = resolvePath(arg, currentPath);
          const targetNode = getNodeFromVFS(targetPath);

          if (!targetNode) {
            newHistory.push({ type: 'err', text: `cat: ${arg}: No such file. Try 'ls' to see available files.` });
          } else if (targetNode.type === 'dir') {
            newHistory.push({ type: 'err', text: `cat: ${arg}: Is a directory. Use 'ls ${arg}' to list contents.` });
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
          newHistory.push({ type: 'err', text: "Usage: ai <query> (e.g. 'ai why hire Harshit?', 'ai explain AutoValuate AI', 'ai what is Resilient?')" });
        } else {
          const lower = arg.toLowerCase();
          let ans = "Harshit Sharma specializes in autonomous agent architecture, multi-turn LLM reasoning trees, dual-engine ML regression stacking, and production systems engineering. He studies B.Tech AI & ML at USAR (GGSIPU), New Delhi.";

          if (lower.includes('why hire') || lower.includes('hire') || lower.includes('recruit')) {
            ans = "🌟 Why hire Harshit:\nHe bridges deep algorithmic foundations (CatBoost/XGBoost, BERT Transformers, TensorFlow Recommenders) with elite production systems engineering (Docker, FastAPI, Three.js WebGL, Fastify). He builds real, production-tested architectures with full test matrices (56 tests in AutoValuate, 47 tests in Resilient).";
          } else if (lower.includes('yggdrasil') || lower.includes('world tree') || lower.includes('discord')) {
            ans = "🌲 Yggdrasil Platform:\nA self-hosted modular Discord platform combining a Fastify REST API with Discord.js inside a single Node.js runtime, secured with AES-256-GCM + HKDF cryptographic sessions.";
          } else if (lower.includes('resilient') || lower.includes('benchmark') || lower.includes('docker') || lower.includes('sandbox')) {
            ans = "🤖 Resilient AI Benchmark:\nAn automated testing harness for autonomous software engineering agents with isolated Docker git sandboxes and 47/47 passing Pytests.";
          } else if (lower.includes('bike') || lower.includes('car') || lower.includes('price') || lower.includes('autovaluate') || lower.includes('ml')) {
            ans = "📊 AutoValuate AI — Dual-Engine Valuation Suite:\nA 97.4% R² gradient-boosted stacking regressor (CatBoost + XGBoost) trained on 40,000+ real transactions across 32k motorcycles and 8k passenger cars. Features 5-year TCO lifecycle simulation, fleet batch appraisal for 50 vehicles, cryptographic SHA-256 valuation certificates, and 56 passing automated tests. Live on Vercel at https://moto-value-ai.vercel.app/";
          } else if (lower.includes('ticket') || lower.includes('support') || lower.includes('bert') || lower.includes('dispatcher')) {
            ans = "📩 Customer Support Ticket Dispatcher ML:\nA fine-tuned BERT transformer NLP model for automated departmental email classification and real-time urgency scoring with sub-120ms inference latency.";
          } else if (lower.includes('shield') || lower.includes('block') || lower.includes('mv3') || lower.includes('extension')) {
            ans = "🛡️ ShieldBlock MV3 Blocker:\nHigh-performance Manifest V3 ad and tracker blocker using native declarativeNetRequest (DNR) with 16x audio ad bypass and real-time network streaming debug logger.";
          } else if (lower.includes('carbon') || lower.includes('green') || lower.includes('esg')) {
            ans = "🌱 Carbon Guardian AI:\nEnterprise ESG sustainability platform powered by TensorFlow Recommenders and dynamic gamification economy to optimize corporate carbon footprints.";
          } else if (lower.includes('letter') || lower.includes('guess') || lower.includes('constraint')) {
            ans = "🔤 LetterGuess Deterministic Solver:\nOffline Python / SQLite candidate generation and search-space reduction engine with conservative regex constraint analysis.";
          } else if (lower.includes('startpage') || lower.includes('browser') || lower.includes('theme')) {
            ans = "🖥️ Custom Browser Startpage v2.0:\nPrivacy launchpad with 13 premium themes, CSP hardening, and live weather radar telemetry. Live on Netlify at https://dailycosmos.netlify.app/";
          } else if (lower.includes('cosmic') || lower.includes('3d') || lower.includes('webgl') || lower.includes('three')) {
            ans = "🌌 3D Cosmic WebGL Engine:\nGPU-accelerated Three.js r128 visualizer featuring 6-in-1 physics modes (Galaxy Vortex, Solar System, Supernova, Retrowave Sun) running at 60 FPS.";
          } else if (lower.includes('college') || lower.includes('degree') || lower.includes('usar') || lower.includes('ggsipu') || lower.includes('university')) {
            ans = "🎓 Harshit is pursuing his B.Tech in Artificial Intelligence & Machine Learning at the University School of Automation & Robotics (USAR, GGSIPU), New Delhi.";
          } else if (lower.includes('contact') || lower.includes('email') || lower.includes('reach')) {
            ans = "📬 Reach Harshit:\n- Email: codewithharshitsharma@gmail.com\n- GitHub: https://github.com/harshitthek\n- LinkedIn: https://www.linkedin.com/in/devharshitsharma\n- Discord: harshit0";
          } else {
            ans = `Harshit Sharma is an AI Systems Engineer specializing in Machine Learning, Deep Learning (BERT), LLM Agent sandboxes, and full-stack systems. He built 10 flagship universes showcased in this portfolio.`;
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
            newHistory.push({ type: 'err', text: `Portal '${arg}' not found. Type 'projects' to list all ${projectsData.length} portals.` });
          }
        }
        break;

      case 'skills':
      case 'stack':
        newHistory.push(
          { type: 'sys', text: "🛠️ HARSHIT'S TECHNICAL ARSENAL:" },
          { type: 'out', text: '  Languages: Python 3.12, JavaScript (ES6+), TypeScript, C/C++, Bash, SQL' },
          { type: 'out', text: '  AI & ML: CatBoost, XGBoost, Scikit-Learn, PyTorch, BERT Transformers, TensorFlow, FastAPI' },
          { type: 'out', text: '  Frontend & 3D: React 19 / 18, Three.js / WebGL, HTML5 Canvas 2D, Vite, Tailwind CSS' },
          { type: 'out', text: '  DevOps & Systems: Docker, Manifest V3, PostgreSQL, Async SQLite, antiX Linux, Git CI/CD' }
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
      }

      case 'fortune': {
        const randomFortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
        newHistory.push({ type: 'info', text: `🔮 ${randomFortune}` });
        break;
      }

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
    // Handle Ctrl+C inside terminal to cancel active line without opening Code modal
    if (e.ctrlKey && (e.key === 'c' || e.key === 'C')) {
      e.preventDefault();
      e.stopPropagation();
      setHistory(prev => [...prev, { type: 'cmd', text: `harshit@usar-delhi ${currentPath} % ${inputVal}^C` }]);
      setInputVal('');
      setHistoryIndex(-1);
      return;
    }

    // Handle Ctrl+L to clear screen (standard UNIX shortcut)
    if (e.ctrlKey && (e.key === 'l' || e.key === 'L')) {
      e.preventDefault();
      e.stopPropagation();
      setHistory([]);
      return;
    }

    // Handle Ctrl+U to clear current line
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
        'help', 'neofetch', 'bio', 'about', 'skills', 'stack', 'projects', 'contact',
        'socials', 'top', 'ps', 'weather', 'ls', 'cd', 'pwd', 'cat', 'tree', 'ai',
        'ask', 'deploy', 'launch', 'snake', 'hack', 'pwn', 'matrix', 'cowsay',
        'fortune', 'theme', 'clear', 'exit'
      ];

      const parts = curr.split(/\s+/);
      
      if (parts.length === 1) {
        const match = allCommands.find(c => c.startsWith(parts[0].toLowerCase()));
        if (match) setInputVal(match);
      } else if (parts[0].toLowerCase() === 'cat') {
        const filePrefix = parts[1].toLowerCase();
        const dirNode = getNodeFromVFS(currentPath);
        if (dirNode && dirNode.children) {
          const files = Object.keys(dirNode.children);
          const matchFile = files.find(f => f.toLowerCase().startsWith(filePrefix));
          if (matchFile) setInputVal(`cat ${matchFile}`);
        }
      } else if (parts[0].toLowerCase() === 'cd') {
        const dirPrefix = parts[1].toLowerCase();
        const dirNode = getNodeFromVFS(currentPath);
        if (dirNode && dirNode.children) {
          const dirs = Object.keys(dirNode.children).filter(k => dirNode.children[k].type === 'dir');
          const matchDir = dirs.find(d => d.toLowerCase().startsWith(dirPrefix));
          if (matchDir) setInputVal(`cd ${matchDir}`);
        }
      } else if (parts[0].toLowerCase() === 'theme') {
        const themePrefix = parts[1].toLowerCase();
        const themeKeys = Object.keys(THEMES);
        const matchTheme = themeKeys.find(t => t.startsWith(themePrefix));
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
            <span className="t-dot yellow" onClick={() => setHistory([])} title="Clear Terminal (Ctrl+L)"></span>
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
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>

        <div
          ref={modalBodyRef}
          className="modal-body terminal-modal-body custom-scroll"
          onClick={() => {
            if (!snakeGameActive) inputRef.current?.focus();
            else snakeCanvasRef.current?.focus();
          }}
        >
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

          {/* ── SUPERCHARGED 60FPS ARCADE CANVAS SNAKE GAME ── */}
          {snakeGameActive && (
            <div
              className="arcade-snake-container"
              style={{ borderColor: activeThemeObj.primary }}
              tabIndex={0}
              onClick={() => snakeCanvasRef.current?.focus()}
            >
              {/* Arcade Top Control Bar */}
              <div className="snake-arcade-hud">
                <div className="snake-stats-left">
                  <span className="snake-badge" style={{ color: activeThemeObj.primary }}>🐍 CYBER ARCADE</span>
                  <span className="snake-score-display">SCORE: <strong>{snakeScore}</strong></span>
                  <span className="snake-hi-display">HI: <strong>{snakeHighScore}</strong></span>
                  {combo > 1 && (
                    <span className="snake-combo-badge" style={{ color: activeThemeObj.primary }}>
                      COMBO x{combo} 🔥
                    </span>
                  )}
                  {activePowerUp && (
                    <span className="snake-powerup-badge">
                      {activePowerUp.type === 'SHIELD' ? '🛡️ SHIELD' : activePowerUp.type === 'SLOW' ? '❄️ MATRIX TIME' : '⚡ 2X SCORE'}
                    </span>
                  )}
                </div>

                <div className="snake-controls-right">
                  <div className="snake-mode-selector">
                    <button
                      className={`btn-mode-chip ${snakeMode === 'wrap' ? 'active' : ''}`}
                      onClick={() => { SoundFX.playKey(); setSnakeMode('wrap'); }}
                      title="Wrap around arena edges"
                    >
                      WRAP
                    </button>
                    <button
                      className={`btn-mode-chip ${snakeMode === 'walls' ? 'active' : ''}`}
                      onClick={() => { SoundFX.playKey(); setSnakeMode('walls'); }}
                      title="Lethal electrified perimeter walls"
                    >
                      WALLS ⚡
                    </button>
                  </div>

                  <div className="snake-speed-selector">
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
              </div>

              {/* Main Game Canvas with Interactive HUD Overlay */}
              <div className="snake-canvas-wrapper">
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
                    <button className="btn-snake-act retry" onClick={() => setIsPaused(false)}>
                      RESUME MISSION
                    </button>
                  </div>
                )}

                {/* Game Over Mission Summary Overlay */}
                {snakeGameOver && (
                  <div className="snake-gameover-overlay">
                    <span className="over-title">💀 SESSION TERMINATED // SCORE: {snakeScore} PTS</span>
                    {isNewHighScore && (
                      <span className="new-hi-banner" style={{ color: activeThemeObj.primary }}>
                        🏆 NEW RECORD SET IN {snakeMode.toUpperCase()} MODE!
                      </span>
                    )}
                    <div className="gameover-stats-grid">
                      <span>Data Orbs: <strong>{applesEaten}</strong></span>
                      <span>Max Combo: <strong>x{maxCombo}</strong></span>
                      <span>Difficulty: <strong>{snakeSpeed.toUpperCase()}</strong></span>
                      <span>Arena: <strong>{snakeMode.toUpperCase()}</strong></span>
                    </div>
                    <div className="over-buttons">
                      <button className="btn-snake-act retry" onClick={startSnakeGame}>
                        ↺ RESTART (R / ENTER)
                      </button>
                      <button className="btn-snake-act quit" onClick={() => setSnakeGameActive(false)}>
                        QUIT TO SHELL (Q / ESC)
                      </button>
                    </div>
                  </div>
                )}

                {/* On-Screen D-Pad Controls for Touch / Mobile */}
                <div className="snake-dpad-controls">
                  <button className="dpad-btn up" onClick={() => changeSnakeDirection('UP')}>▲</button>
                  <div className="dpad-mid-row">
                    <button className="dpad-btn left" onClick={() => changeSnakeDirection('LEFT')}>◀</button>
                    <button className="dpad-btn pause" onClick={() => setIsPaused(!isPaused)}>
                      {isPaused ? '▶' : '⏸'}
                    </button>
                    <button className="dpad-btn right" onClick={() => changeSnakeDirection('RIGHT')}>▶</button>
                  </div>
                  <button className="dpad-btn down" onClick={() => changeSnakeDirection('DOWN')}>▼</button>
                </div>
              </div>

              {!snakeGameOver && (
                <div className="snake-game-footer-bar">
                  <span>Steer: <kbd>↑</kbd><kbd>↓</kbd><kbd>←</kbd><kbd>→</kbd> or <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd></span>
                  <span>·</span>
                  <span><kbd>P</kbd> Pause</span>
                  <span>·</span>
                  <span><kbd>R</kbd> Restart</span>
                  <span>·</span>
                  <button className="btn-snake-quit-inline" onClick={() => setSnakeGameActive(false)}>
                    QUIT (ESC)
                  </button>
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
          <span>TIPS: Press <kbd>Tab</kbd> to autocomplete · <kbd>Ctrl+C</kbd> cancel · <kbd>Ctrl+L</kbd> clear · <kbd>↑</kbd>/<kbd>↓</kbd> history</span>
        </div>
      </div>
    </div>
  );
}
