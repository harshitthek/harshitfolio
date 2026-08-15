const BASE_PATH = import.meta.env.BASE_URL || '/';

export const projectsData = [
  {
    id: 'yggdrasil-platform',
    title: 'Yggdrasil (World Tree) Platform',
    url: 'https://github.com/harshitthek/Yggdrasil',
    githubUrl: 'https://github.com/harshitthek/Yggdrasil',
    demoUrl: 'https://github.com/harshitthek/Yggdrasil',
    hasLiveDemo: false,
    img: `${BASE_PATH}projects/yggdrasil-bot.jpg`,
    blueprintIcon: '🌲',
    num: 'PORT_01 / ARCHITECTURE',
    category: 'ai-agents',
    categoryLabel: 'DISCORD PLATFORM & ENCRYPTED API',
    desc: 'Self-hosted modular Discord platform with Fastify REST API, encrypted AES-256-GCM sessions with HKDF key derivation, and multi-source audio streaming.',
    longDesc: 'World Tree is an enterprise-grade modular backend platform running on antiX Linux. Features a single-process architecture where Discord.js and Fastify coexist with strict service boundaries, AES-256-GCM encrypted session tokens with HKDF key derivation, Discord OAuth2 + PKCE authentication, and MongoDB Atlas persistence.',
    tags: ['NODE.JS', 'FASTIFY', 'DISCORD.JS', 'AES-256-GCM', 'HKDF', 'MONGODB'],
    badge: '🌲 PORT_01',
    stats: {
      stat1: 'Node.js / Fastify',
      stat1Lbl: 'RUNTIME ENGINE',
      stat2: 'AES-256-GCM',
      stat2Lbl: 'ENCRYPTION',
      stat3: 'MIT',
      stat3Lbl: 'LICENSE'
    },
    highlights: [
      'Single-process architecture running Discord client & Fastify API in one Node.js process managed by PM2',
      'Cryptographic session management with AES-256-GCM encryption & HKDF SHA-256 key derivation',
      'Discord OAuth2 with PKCE verification and fine-grained role-based API route guards',
      'Multi-source audio playback pipeline supporting YouTube, Spotify, and SoundCloud sources'
    ],
    hasInteractiveModal: 'dossier',
    statusTag: 'PRODUCTION'
  },
  {
    id: 'resilient',
    title: 'Resilient AI Benchmark',
    url: 'https://github.com/harshitthek/resilient',
    githubUrl: 'https://github.com/harshitthek/resilient',
    demoUrl: 'https://github.com/harshitthek/resilient',
    hasLiveDemo: false,
    img: `${BASE_PATH}projects/resilient.jpg`,
    blueprintIcon: '🤖',
    num: 'PORT_02 / AI_PIPELINE',
    category: 'ai-agents',
    categoryLabel: 'EMPIRICAL BENCHMARK & PIPELINE',
    desc: 'Autonomous Open-Source AI Coding Agent Leaderboard & Remediation Pipeline dispatching agents in isolated git sandboxes to solve real unit-tested issues.',
    longDesc: 'Resilient is an enterprise-grade autonomous pipeline and empirical benchmarking platform that scans GitHub trending repositories, dispatches AI coding agents in isolated branch sandboxes, executes local test suites (pytest, npm, cargo, go), enforces 24h rolling rate caps, and submits authenticated pull requests upstream using a dedicated GitHub App (RS256 JWT auth).',
    tags: ['AI AGENTS', 'FASTAPI', 'POSTGRESQL', 'THREE.JS', 'PYTEST (47 PASSED)', 'DOCKER'],
    badge: '🤖 PORT_02',
    stats: {
      stat1: '47/47 Passed',
      stat1Lbl: 'PYTEST SUITE',
      stat2: '100% Isolated',
      stat2Lbl: 'GIT SANDBOX',
      stat3: 'RS256 JWT',
      stat3Lbl: 'GITHUB APP AUTH'
    },
    highlights: [
      'Autonomous issue discovery scanning GitHub repositories for reproducible test failures',
      'Isolated git fork sandboxes preventing untrusted code execution leaks',
      'Continuous multi-model leaderboard scoring comparing Claude, GPT-4, and DeepSeek',
      'Automated authenticated PR generation using resilient-bot GitHub App with RS256 JWTs'
    ],
    hasInteractiveModal: 'architecture',
    statusTag: '47_TESTS_PASSING'
  },
  {
    id: 'autovaluate-ai',
    title: 'AutoValuate AI — Vehicle Valuation Suite',
    url: 'https://github.com/harshitthek/used-bike-price',
    githubUrl: 'https://github.com/harshitthek/used-bike-price',
    demoUrl: 'https://moto-value-ai.vercel.app/',
    hasLiveDemo: true,
    img: `${BASE_PATH}projects/used-bike-price.jpg`,
    blueprintIcon: '🏍️',
    num: 'PORT_03 / ML_STACKING',
    category: 'ml-models',
    categoryLabel: 'DUAL-ENGINE STACKING ML',
    desc: 'Dual-engine CatBoost & XGBoost resale intelligence suite trained on 40,000+ real transactions, yielding 97.4% R² confidence with 5-year forecasts and instant PDF certificates.',
    longDesc: 'Full-stack enterprise automotive resale intelligence platform trained on 40,000+ Indian vehicle transactions across 23+ manufacturers. Features dual CatBoost and XGBoost gradient-boosted ensembles (97.4% R² on bikes, 97.3% R² on cars), 5-year forward depreciation curves, TCO lifecycle simulator, instant vector PDF certificate generator (jsPDF), and zero-config public demo REST API.',
    tags: ['CATBOOST', 'XGBOOST', 'FASTAPI', 'REACT 19', 'DOCKER', '97.4% R²'],
    badge: '🏍️ PORT_03',
    stats: {
      stat1: '97.4% R²',
      stat1Lbl: 'MODEL CONFIDENCE',
      stat2: '40,000+ Rows',
      stat2Lbl: 'DATASET SIZE',
      stat3: 'CatBoost + XGBoost',
      stat3Lbl: 'ENSEMBLE'
    },
    highlights: [
      'Dual-Engine gradient-boosted stacking model (CatBoost + XGBoost) with native categorical embeddings',
      '5-Year forward resale forecast with interactive bezier depreciation curves and TCO calculation',
      '1-Click cryptographic in-memory vector PDF valuation certificate generator (jsPDF)',
      'Public zero-config REST API endpoints with wildcard CORS for seamless external integration'
    ],
    hasInteractiveModal: 'ml-sim',
    statusTag: 'LIVE_VERCEL_APP'
  },
  {
    id: 'shieldblock',
    title: 'ShieldBlock — Next-Gen MV3 Blocker',
    url: 'https://github.com/harshitthek/ShieldBlock',
    githubUrl: 'https://github.com/harshitthek/ShieldBlock',
    demoUrl: 'https://github.com/harshitthek/ShieldBlock',
    hasLiveDemo: false,
    img: `${BASE_PATH}projects/shieldblock.jpg`,
    blueprintIcon: '🛡️',
    num: 'PORT_04 / CYBER_SEC',
    category: 'systems',
    categoryLabel: 'MANIFEST V3 & PRIVACY ENGINE',
    desc: 'High-performance Manifest V3 ad, tracker, and anti-adblock blocker with native DNR engine, 16x Spotify/YouTube ad speed bypass, and real-time network logger.',
    longDesc: 'Ultra-fast Chrome extension engineered for Manifest V3. Intercepts ads, telemetry, and trackers at the browser network core using native declarativeNetRequest (DNR) without consuming main-thread CPU. Features a 16x Spotify & YouTube ad speed accelerator, live streaming network debug logger, element zapper/picker, anti-adblock overlay cleaner, and zero-innerHTML security.',
    tags: ['MANIFEST V3', 'DECLARATIVE NET REQUEST', 'CHROME API', 'JAVASCRIPT', 'CYBERSECURITY'],
    badge: '🛡️ PORT_04',
    stats: {
      stat1: '0% Main CPU',
      stat1Lbl: 'DNR ENGINE',
      stat2: '16x Speed',
      stat2Lbl: 'AD ACCELERATOR',
      stat3: 'Zero-innerHTML',
      stat3Lbl: 'SECURITY'
    },
    highlights: [
      'Native declarativeNetRequest (DNR) network blocking eliminating main-thread CPU & RAM overhead',
      'Main World window.Audio proxy interceptor bypassing Spotify & YouTube ads at 16x organic speed',
      'Real-time network streaming debug logger displaying blocked rules and resource types',
      'Strict DOM node creation (zero innerHTML) eliminating all cross-site scripting (XSS) vectors'
    ],
    hasInteractiveModal: 'dossier',
    statusTag: 'MANIFEST_V3'
  },
  {
    id: 'carbon-guardian-ai',
    title: 'Carbon Guardian AI — ESG Platform',
    url: 'https://github.com/harshitthek/carbon-guardian-ai',
    githubUrl: 'https://github.com/harshitthek/carbon-guardian-ai',
    demoUrl: 'https://github.com/harshitthek/carbon-guardian-ai',
    hasLiveDemo: false,
    img: `${BASE_PATH}projects/carbon-guardian-ai.jpg`,
    blueprintIcon: '🌱',
    num: 'PORT_05 / GREEN_AI',
    category: 'systems',
    categoryLabel: 'AI SUSTAINABILITY & TELEMETRY',
    desc: 'Enterprise ESG sustainability platform with TensorFlow Recommenders analyzing user telemetry to optimize transit, energy, and carbon footprints.',
    longDesc: 'Full-stack AI sustainability and ESG compliance platform. Powered by TensorFlow Recommender models analyzing user logs to generate high-impact personalized ecological action suggestions. Includes an RBAC gamification economy, dark-mode Glassmorphism UI with Framer Motion, real-time audit logging, and interactive CSV data exports.',
    tags: ['REACT', 'FASTAPI', 'TENSORFLOW', 'SQLITE', 'ESG SUSTAINABILITY', 'JWT RBAC'],
    badge: '🌱 PORT_05',
    stats: {
      stat1: 'TensorFlow Recommenders',
      stat1Lbl: 'AI ENGINE',
      stat2: 'FastAPI + React',
      stat2Lbl: 'FULL-STACK',
      stat3: 'MIT',
      stat3Lbl: 'LICENSE'
    },
    highlights: [
      'TensorFlow-powered AI recommender engine suggesting personalized carbon reduction strategies',
      'Dynamic RBAC gamification economy with tunable point multipliers and administrator triggers',
      'Glassmorphism dark UI with Framer Motion micro-interactions and contextual skeleton loaders',
      'Enterprise audit logging with real-time CSV data exports and automated report generator'
    ],
    hasInteractiveModal: 'architecture',
    statusTag: 'AI_RECOMMENDER_ON'
  },
  {
    id: 'browser-startpage',
    title: 'Custom Browser Startpage v2.0',
    url: 'https://github.com/harshitthek/Customizable-Browser-Startpage',
    githubUrl: 'https://github.com/harshitthek/Customizable-Browser-Startpage',
    demoUrl: 'https://github.com/harshitthek/Customizable-Browser-Startpage',
    hasLiveDemo: false,
    img: `${BASE_PATH}projects/browser-startpage.jpg`,
    blueprintIcon: '🖥️',
    num: 'PORT_06 / UTILITY',
    category: 'web-3d',
    categoryLabel: 'PRIVACY LAUNCHPAD & 13 THEMES',
    desc: 'Zero-dependency browser homepage replacement with 13 premium themes, drag-and-drop bookmarks, live weather radar, and strict privacy controls.',
    longDesc: 'A privacy-hardened developer new tab launchpad with 13 premium themes (Cyberpunk particles, Aurora Wave, Northern Lights, Sunset, Midnight, Dark Slate). Includes drag-and-drop smart bookmarks, multi-engine search switcher (Google, DuckDuckGo, Brave), live OpenWeatherMap radar, GitHub profile telemetry, and zero external tracking.',
    tags: ['JAVASCRIPT', 'HTML5', 'CSS3', 'LOCAL STORAGE', 'OPENWEATHERMAP', 'ZERO-DEP'],
    badge: '🖥️ PORT_06',
    stats: {
      stat1: '13 Themes',
      stat1Lbl: 'THEME SUITE',
      stat2: '<15KB',
      stat2Lbl: 'BUNDLE SIZE',
      stat3: '0ms Tracking',
      stat3Lbl: 'PRIVACY'
    },
    highlights: [
      '13 Built-in premium themes including animated Aurora Wave, Cyberpunk particles, and Dark Slate',
      'Drag-and-drop smart bookmark manager with XSS-safe rendering and JSON import/export',
      'Multi-engine instant search bar switching between Google, DuckDuckGo, Yahoo, and Brave',
      'Live weather radar telemetry API integration with full date and time greetings'
    ],
    hasInteractiveModal: 'dossier',
    statusTag: 'v2.0_HARDENED'
  },
  {
    id: 'cosmic-3d-portfolio',
    title: '3D Cosmic WebGL Engine',
    url: 'https://harshitthek.github.io/portfolio/',
    githubUrl: 'https://github.com/harshitthek/portfolio',
    demoUrl: 'https://harshitthek.github.io/portfolio/',
    hasLiveDemo: true,
    img: `${BASE_PATH}projects/cosmic-3d-portfolio.jpg`,
    blueprintIcon: '🌌',
    num: 'PORT_07 / 3D_WebGL',
    category: 'web-3d',
    categoryLabel: '3D GRAPHICS & THREE.JS',
    desc: '6-in-1 real-time 3D WebGL physics portfolio featuring Cyberpunk Gravitational Vortex, Retrowave Highway, DNA double helix, and Matrix rain.',
    longDesc: 'A showcase of GPU-accelerated WebGL physics, raycasting pointer tracking, and real-time custom shader effects. Built with vanilla Three.js without bloat, achieving a locked 60fps across desktop and mobile devices.',
    tags: ['THREE.JS', 'WEBGL', 'GLSL SHADERS', 'VANILLA JS', '60 FPS'],
    badge: '🌌 PORT_07',
    stats: {
      stat1: '60 FPS',
      stat1Lbl: 'GPU RENDER',
      stat2: '6 Engines',
      stat2Lbl: 'THEME MODES',
      stat3: 'Three.js r128',
      stat3Lbl: 'LIBRARY'
    },
    highlights: [
      'Cursor-following 1,200 particle gravitational vortex with dynamic light steering',
      'Infinite deforming wave terrain plane with horizon retrowave neon sun',
      '3D DNA double-helix molecular strand rotating with dynamic distance line bonds',
      'Zero-dependency Vanilla CSS & JS architecture with persistent theme memory'
    ],
    hasInteractiveModal: 'dossier',
    statusTag: 'LIVE_DEPLOYED'
  },
  {
    id: 'terminal-console-port',
    title: 'Harshit\'s Cyber Terminal & Inspector',
    url: 'https://github.com/harshitthek',
    githubUrl: 'https://github.com/harshitthek',
    demoUrl: 'https://github.com/harshitthek',
    hasLiveDemo: true,
    img: `${BASE_PATH}projects/cyber-terminal.jpg`,
    blueprintIcon: '⚡',
    num: 'PORT_08 / SHELL',
    category: 'systems',
    categoryLabel: 'INTERACTIVE CLI & AI SHELL',
    desc: 'Interactive lab terminal console executing commands (neofetch, snake 60fps, hack, top, ai, cat, whoami) with cryptographic inspection suites.',
    longDesc: 'A fully interactive in-browser Zsh shell workstation featuring 16+ built-in commands (neofetch, 60fps arcade canvas snake game, matrix stream simulations, system diagnostic cards, and AI query engine) combined with cryptographic HMAC-SHA256 signature verifiers and PostgreSQL relational schema inspectors.',
    tags: ['ZSH SHELL', 'INTERACTIVE CLI', 'SNAKE 60FPS', 'HMAC-SHA256', 'FASTAPI'],
    badge: '⚡ PORT_08',
    stats: {
      stat1: '16+ Cmds',
      stat1Lbl: 'CLI SUITE',
      stat2: 'Canvas 60fps',
      stat2Lbl: 'SNAKE ARCADE',
      stat3: 'ZSH Emulation',
      stat3Lbl: 'TERMINAL'
    },
    highlights: [
      'Interactive command parsing with autocomplete for commands and code files',
      '60fps HTML5 Canvas arcade snake game with particle bursts and speed controls',
      'Neofetch system diagnostic card summarizing Harshit\'s hardware, OS, and stack',
      'Production cryptographic HMAC signature validator and PostgreSQL transaction schema viewer'
    ],
    hasInteractiveModal: 'terminal',
    statusTag: 'LIVE_WORKSTATION'
  }
];
