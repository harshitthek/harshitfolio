<div align="center">
  <img src="public/banner.jpg" alt="HarshitFolio — Sci-Fi HUD Portfolio" width="100%"/>
</div>

<br/>

<div align="center">

[![React](https://img.shields.io/badge/React_18-61dafb?style=for-the-badge&logo=react&logoColor=000)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite_5-646cff?style=for-the-badge&logo=vite&logoColor=fff)](https://vitejs.dev)
[![Canvas API](https://img.shields.io/badge/Canvas_2D-Custom_3D_Engine-00ff88?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
[![Web Audio](https://img.shields.io/badge/Web_Audio-Procedural_Synth-38bdf8?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

**A sci-fi HUD portfolio experience — built like mission control, not a webpage.**

[View Live](https://harshitthek.github.io/harshitfolio) &nbsp;·&nbsp;
[LinkedIn](https://www.linkedin.com/in/devharshitsharma) &nbsp;·&nbsp;
[GitHub](https://github.com/harshitthek)

</div>

---

## What is this?

HarshitFolio is not a portfolio. It is an **operational command interface**.

Designed as a fictional AI mission control terminal, it immerses visitors in a cinematic sci-fi experience while transmitting real information about Harshit Sharma — B.Tech student in Artificial Intelligence & Machine Learning at USAR, GGSIPU, New Delhi.

Every panel has a function. Every animation has physics. Every element earns its place.

---

## Features

### Live 3D Hologram — No WebGL, No Three.js
A real-time 3D **icosahedron wireframe** rendered entirely on the HTML5 Canvas 2D API. Pure matrix math from scratch — Y/X/Z axis rotation, perspective projection, depth-sorted luminance — running at locked 60fps with mouse-reactive parallax.

```
12-vertex icosahedron outer shell  ·  30 wireframe edges
6-vertex octahedron inner core     ·  counter-rotating axis
36 ambient quantum orbital particles  ·  gimbal stabilizer ring
Scanning laser sweep  ·  radial base projection rings
```

### Quantum BOOM Explosion
One button. The entire 3D hologram **detonates fullscreen** — 7.5× expansion across the whole viewport, 120 kinetic spark trails, dual shockwave rings, then smooth lock-in reassembly. Rendered at `z-index: 9999`, on top of every UI layer.

### Autonomous Telemetry Terminal
The left terminal is 100% read-only. No input. No cursor. It autotypes Harshit's identity, education, skills, and mindset as a live system feed at 35–50ms cadence — purely cinematic.

### AI Voice Synthesis
Web Speech API with Chromium GC freeze protection. Utterances are pinned to `window.__activeVoiceUtterance` so the browser's garbage collector can't silently kill the audio pipeline mid-sentence.

### Procedural Audio Engine
All sound synthesized live via the Web Audio API. Sub-bass explosion drops, laser chirps, interface clicks — zero external audio files.

---

## Stack

| | Technology |
|:--|:--|
| Framework | React 18 + Vite 5 |
| 3D Rendering | Canvas 2D API — custom matrix projection engine |
| Audio | Web Audio API — procedural synthesis |
| Speech | Web Speech Synthesis API |
| Styling | Vanilla CSS — HSL design tokens |
| Animations | `requestAnimationFrame` + CSS keyframes |

---

## Project Structure

```
src/
├── App.jsx                       Screen orchestrator & state machine
├── index.css                     Full design system
│
└── components/
    ├── LoadingScreen.jsx          Boot sequence diagnostics
    ├── MissionScreen.jsx          Primary HUD layout
    │
    ├── CyberTerminalWing.jsx      Autonomous autotyping telemetry stream
    ├── HologramCanvas.jsx         Live 3D icosahedron (Canvas 2D engine)
    ├── QuantumLaboratoryWing.jsx  Lab controller — BOOM, Overclock, Synth
    │
    ├── Navbar.jsx                 AI voice transmission nav
    ├── NeuralBackground.jsx       Animated neural network layer
    ├── CyberCursor.jsx            Custom plasma cursor with trail
    │
    ├── VoiceContext.jsx           Speech synthesis engine
    ├── SoundFX.js                 Procedural Web Audio synthesizer
    └── modals/ContactModal.jsx    COMMS direct transmission modal
```

---

## Getting Started

```bash
git clone https://github.com/harshitthek/harshitfolio.git
cd harshitfolio
npm install
npm run dev
```

Open `http://localhost:5173` — Chrome or Edge recommended for best Canvas + Speech performance.

---

<div align="center">

**Harshit Sharma** &nbsp;|&nbsp; B.Tech AI & ML &nbsp;|&nbsp; USAR, GGSIPU, New Delhi

[codewithharshitsharma@gmail.com](mailto:codewithharshitsharma@gmail.com) &nbsp;·&nbsp;
[LinkedIn](https://www.linkedin.com/in/devharshitsharma) &nbsp;·&nbsp;
[GitHub @harshitthek](https://github.com/harshitthek)

<br/>

`SYSTEM ONLINE // ALL CHANNELS OPERATIONAL // STANDING BY`

</div>
