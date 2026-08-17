// Robust Procedural Web Audio API Sound Synthesizer
let audioCtx = null;
const STORAGE_KEY = 'harshit_portfolio_sfx_enabled';

let soundEnabled = true;
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored !== null) {
    soundEnabled = stored === 'true';
  }
}

const listeners = new Set();

function notifyListeners() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, String(soundEnabled));
  }
  listeners.forEach(fn => {
    try {
      fn(soundEnabled);
    } catch (e) {
      // Ignore
    }
  });
}

function initAudioContext() {
  if (typeof window === 'undefined') return null;
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  } catch (e) {
    console.warn('[SoundFX] AudioContext initialization notice:', e);
  }
  return audioCtx;
}

// Global user interaction listener to unlock Web Audio on first gesture
if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    const ctx = initAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }
  };
  window.addEventListener('click', unlockAudio, { passive: true });
  window.addEventListener('touchstart', unlockAudio, { passive: true });
  window.addEventListener('keydown', unlockAudio, { passive: true });
  window.addEventListener('pointerdown', unlockAudio, { passive: true });
}

export const SoundFX = {
  isEnabled: () => soundEnabled,

  toggle: () => {
    soundEnabled = !soundEnabled;
    notifyListeners();
    return soundEnabled;
  },

  setEnabled: (val) => {
    soundEnabled = !!val;
    notifyListeners();
  },

  subscribe: (fn) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },

  // AI Voice Transceiver Enabled Chime
  playVoiceOn: () => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudioContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      [580, 880, 1160].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.05);
        gain.gain.setValueAtTime(0.08, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.05 + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.12);
      });
    } catch (e) {}
  },

  // AI Voice Transceiver Muted Chime
  playVoiceOff: () => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudioContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      [880, 580, 320].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.05);
        gain.gain.setValueAtTime(0.07, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.05 + 0.14);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.14);
      });
    } catch (e) {}
  },

  // Soft sci-fi blip on hover with dynamic pitch modulation
  playHover: (type = 'normal') => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudioContext();
      if (!ctx || ctx.state !== 'running') return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      let startFreq = 520;
      let endFreq = 880;
      let duration = 0.055;
      let volume = 0.06;

      if (type === 'primary') {
        startFreq = 640;
        endFreq = 1120;
        duration = 0.08;
        volume = 0.08;
        osc.type = 'triangle';
      } else if (type === 'high') {
        startFreq = 780;
        endFreq = 1250;
        duration = 0.045;
        volume = 0.05;
        osc.type = 'sine';
      } else {
        osc.type = 'sine';
      }

      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.linearRampToValueAtTime(endFreq, now + duration);

      gain.gain.setValueAtTime(volume, now);
      gain.gain.linearRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      // Audio locked or ignored
    }
  },

  // Crisp cyber click
  playClick: () => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudioContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.linearRampToValueAtTime(320, now + 0.09);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.0001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {
      // Ignore
    }
  },

  // Deep Massive Quantum Supernova Explosion
  playExplosion: () => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudioContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;

      // 1. Sub-bass shockwave drop (160Hz -> 24Hz)
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(160, now);
      subOsc.frequency.exponentialRampToValueAtTime(24, now + 0.85);

      subGain.gain.setValueAtTime(0.35, now);
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.9);

      // 2. White noise explosive burst (lowpass filtered)
      const bufferSize = ctx.sampleRate * 0.7;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.frequency.exponentialRampToValueAtTime(80, now + 0.7);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.28, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.75);

      // 3. High electrical crackle discharge
      const crackleOsc = ctx.createOscillator();
      const crackleGain = ctx.createGain();
      crackleOsc.type = 'sawtooth';
      crackleOsc.frequency.setValueAtTime(480, now);
      crackleOsc.frequency.exponentialRampToValueAtTime(60, now + 0.4);

      crackleGain.gain.setValueAtTime(0.15, now);
      crackleGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

      crackleOsc.connect(crackleGain);
      crackleGain.connect(ctx.destination);
      crackleOsc.start(now);
      crackleOsc.stop(now + 0.45);
    } catch (e) {
      // Ignore
    }
  },

  // High tech laser pulse
  playLaser: () => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudioContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.18);

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.linearRampToValueAtTime(0.0001, now + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.18);
    } catch (e) {
      // Ignore
    }
  },

  // Rapid frequency chirp for overclock
  playChirp: () => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudioContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const freqs = [500, 900, 1400, 2000];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + idx * 0.035;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.08, start);
        gain.gain.linearRampToValueAtTime(0.0001, start + 0.045);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.045);
      });
    } catch (e) {
      // Ignore
    }
  },

  // Custom synthesizer harmonic tone
  playTone: (freq = 440, type = 'sine', duration = 0.2) => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudioContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      // Ignore
    }
  },

  // Sci-fi Warp / System Engagement Riser
  playWarp: () => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudioContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;

      const oscLow = ctx.createOscillator();
      const gainLow = ctx.createGain();
      oscLow.type = 'sine';
      oscLow.frequency.setValueAtTime(90, now);
      oscLow.frequency.exponentialRampToValueAtTime(35, now + 0.35);
      gainLow.gain.setValueAtTime(0.18, now);
      gainLow.gain.linearRampToValueAtTime(0.0001, now + 0.35);
      oscLow.connect(gainLow);
      gainLow.connect(ctx.destination);
      oscLow.start(now);
      oscLow.stop(now + 0.35);

      const oscHigh = ctx.createOscillator();
      const gainHigh = ctx.createGain();
      oscHigh.type = 'sawtooth';
      oscHigh.frequency.setValueAtTime(240, now);
      oscHigh.frequency.exponentialRampToValueAtTime(1480, now + 0.32);
      gainHigh.gain.setValueAtTime(0.1, now);
      gainHigh.gain.linearRampToValueAtTime(0.0001, now + 0.35);
      oscHigh.connect(gainHigh);
      gainHigh.connect(ctx.destination);
      oscHigh.start(now);
      oscHigh.stop(now + 0.35);
    } catch (e) {
      // Ignore
    }
  },

  // Deployment launch riser sweep
  playDeploy: () => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudioContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(980, now + 0.45);

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.linearRampToValueAtTime(0.0001, now + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    } catch (e) {
      // Ignore
    }
  },

  // Terminal keystroke click
  playKey: () => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudioContext();
      if (!ctx || ctx.state !== 'running') return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(950 + Math.random() * 250, now);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.linearRampToValueAtTime(0.0001, now + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.035);
    } catch (e) {
      // Ignore
    }
  },

  // Launch celebration chime
  playSuccess: () => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudioContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + i * 0.09;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.1, startTime);
        gain.gain.linearRampToValueAtTime(0.0001, startTime + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.28);
      });
    } catch (e) {
      // Ignore
    }
  }
};
