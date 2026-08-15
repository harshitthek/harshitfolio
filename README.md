<div align="center">

```
██╗  ██╗ █████╗ ██████╗ ███████╗██╗  ██╗██╗████████╗    ███████╗ ██████╗ ██╗     ██╗ ██████╗
██║  ██║██╔══██╗██╔══██╗██╔════╝██║  ██║██║╚══██╔══╝    ██╔════╝██╔═══██╗██║     ██║██╔═══██╗
███████║███████║██████╔╝███████╗███████║██║   ██║       █████╗  ██║   ██║██║     ██║██║   ██║
██╔══██║██╔══██║██╔══██╗╚════██║██╔══██║██║   ██║       ██╔══╝  ██║   ██║██║     ██║██║   ██║
██║  ██║██║  ██║██║  ██║███████║██║  ██║██║   ██║       ██║     ╚██████╔╝███████╗██║╚██████╔╝
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝   ╚═╝       ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝
```

**`HARSHIT SHARMA // v2.0.0 // AI & ML ENGINEER`**

[![React](https://img.shields.io/badge/React-18.3-61dafb?style=flat-square&logo=react&logoColor=61dafb&labelColor=0d1117)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff?style=flat-square&logo=vite&logoColor=646cff&labelColor=0d1117)](https://vitejs.dev)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-f7df1e?style=flat-square&logo=javascript&logoColor=f7df1e&labelColor=0d1117)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Canvas API](https://img.shields.io/badge/Canvas_API-WebGL_2D-00ff88?style=flat-square&labelColor=0d1117)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
[![Web Audio](https://img.shields.io/badge/Web_Audio-Procedural-38bdf8?style=flat-square&labelColor=0d1117)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

*A sci-fi HUD portfolio experience — built like mission control, not a webpage.*

[Live Demo](https://harshitthek.github.io/harshitfolio) &nbsp;·&nbsp; [LinkedIn](https://www.linkedin.com/in/devharshitsharma) &nbsp;·&nbsp; [GitHub](https://github.com/harshitthek)

</div>

---

## Overview

**HarshitFolio** is not a portfolio — it's an **operational command interface**. Designed as a fictional AI mission control terminal, it immerses visitors in a cinematic sci-fi experience while presenting real information about Harshit Sharma: B.Tech student in Artificial Intelligence & Machine Learning at USAR, GGSIPU, New Delhi.

Every element has a purpose. Every animation has physics. Every panel transmits data.

---

## Architecture

```
src/
├── App.jsx                      — Screen orchestrator & route state machine
├── index.css                    — Full design system (tokens, animations, layout)
├── main.jsx                     — React entrypoint
│
└── components/
    ├── LoadingScreen.jsx         — Boot sequence with system diagnostics
    ├── IntermediateScreen.jsx    — Transition gateway between screens
    ├── MissionScreen.jsx         — Primary HUD: terminal + hologram + lab controller
    │
    ├── CyberTerminalWing.jsx     — Left: autonomous autotyping Linux telemetry stream
    ├── HologramCanvas.jsx        — Center: live 3D icosahedron hologram (Canvas 2D)
    ├── QuantumLaboratoryWing.jsx — Right: interactive lab controls (BOOM, Overclock...)
    │
    ├── Navbar.jsx                — Top HUD navigation with AI voice transmission
    ├── NeuralBackground.jsx      — Animated neural network background layer
    ├── NeuralSynapseWing.jsx     — Synaptic pulse visualizer wing
    ├── CyberRadarTelemetry.jsx   — Radar sweep telemetry display
    ├── NeuralOscilloscope.jsx    — Live oscilloscope waveform display
    ├── CyberCursor.jsx           — Custom cyber cursor with trail
    │
    ├── VideoScreen.jsx           — Screen 2: project showcase
    ├── CardsScreen.jsx           — Screen 3: AI Multiverse portals hub
    │
    ├── VoiceContext.jsx          — AI speech synthesis engine (Chromium-safe)
    ├── SoundFX.js                — Procedural Web Audio synthesizer
    │
    └── modals/
        └── ContactModal.jsx      — COMMS direct transmission modal
```

---

## Features

### Holographic 3D Render Engine
A real-time 3D **icosahedron wireframe** rendered on the HTML5 Canvas API — no WebGL, no Three.js. Pure matrix math: Y-axis, X-axis, and Z-axis rotation computed from scratch every frame at 60fps with mouse-reactive parallax and perspective projection.

- 12-vertex icosahedron outer shell with 30 wireframe edges
- 6-vertex octahedron inner core with counter-rotation
- Glowing vertex nodes with depth-sorted luminance
- 36 ambient quantum orbital particles in elliptical paths
- Gimbal stabilizer ring with independent axis rotation
- Scanning laser sweep line with radial base projection rings

### Quantum BOOM Explosion System
Clicking `[ QUANTUM BOOM ]` triggers a physics-based detonation sequence:

- The actual 3D hologram **expands 7.5× to fullscreen** — no overlays, no fakes
- 12 vertex scatter vectors computed with full spherical distribution
- 120 kinetic sparks with tail trails fly across the entire viewport
- 2 concentric shockwave rings expand outward at different speeds
- Smooth cubic ease-out reassembly — the hologram locks back into place
- Rendered on a `position: fixed; z-index: 9999` canvas, on top of all UI layers

### Autonomous Telemetry Terminal
The left terminal is a **100% read-only, non-interactive** live stream. No typing, no input. It autotypes at 35–50ms cadence streaming Harshit's identity, education, skills, and mindset like a live system feed. `pointer-events: none` — purely cinematic.

### AI Voice Synthesis
The navbar AI transmission system uses the Web Speech Synthesis API with Chromium GC freeze protection — pinned to `window.__activeVoiceUtterance` to prevent the browser's garbage collector from silently killing the audio pipeline mid-sentence.

### Procedural Audio Engine
`SoundFX.js` synthesizes all sounds in real time using the Web Audio API:
- Sub-bass explosion drops (oscillator + gain envelope)
- Laser chirps (frequency sweep)
- Interface clicks and synth pulses
- Zero external audio files — everything computed on demand

### Cyber Cursor
Custom cursor system with a trailing plasma dot that follows mouse movement with spring physics, replacing the OS cursor entirely for maximum immersion.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| Rendering | Canvas 2D API (custom 3D engine) |
| Audio | Web Audio API (procedural synthesis) |
| Speech | Web Speech Synthesis API |
| Styling | Vanilla CSS (HSL design tokens, no Tailwind) |
| Animations | `requestAnimationFrame` + CSS keyframes |
| Build | Vite (ESM, HMR, tree-shaking) |

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/harshitthek/harshitfolio.git
cd harshitfolio

# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build
```

Open **`http://localhost:5173`** in your browser.

> Recommended: Chrome or Edge for best Web Speech Synthesis and Canvas performance.

---

## About

**Harshit Sharma**
B.Tech — Artificial Intelligence & Machine Learning
USAR, GGSIPU, New Delhi

| | |
|---|---|
| Email | codewithharshitsharma@gmail.com |
| GitHub | [@harshitthek](https://github.com/harshitthek) |
| LinkedIn | [devharshitsharma](https://www.linkedin.com/in/devharshitsharma) |

---

<div align="center">

*"The interface is the message."*

`SYSTEM ONLINE // ALL CHANNELS OPERATIONAL // STANDING BY`

</div>
