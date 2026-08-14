import React, { useState, useEffect } from 'react';
import { useVoice } from './VoiceContext';
import { SoundFX } from './SoundFX';

export default function Navbar({ onOpenModal, activeScreen, onJumpToScreen }) {
  const { voiceEnabled, isSpeaking, toggleVoice } = useVoice();
  const [sfxOn, setSfxOn] = useState(SoundFX.isEnabled());

  useEffect(() => {
    return SoundFX.subscribe((val) => {
      setSfxOn(val);
    });
  }, []);

  // Screen 1 has its own embedded floating HUD to avoid duplicate overlays
  if (activeScreen === 's-video') {
    return null;
  }

  const handleToggleSFX = (e) => {
    e.stopPropagation();
    const next = SoundFX.toggle();
    if (next) SoundFX.playClick();
  };

  const handleToggleVoice = (e) => {
    e.stopPropagation();
    if (sfxOn) SoundFX.playClick();
    toggleVoice();
  };

  const isCardsScreen = activeScreen === 's-cards';

  return (
    <header className="cyber-hud-nav">
      <div className="nav-left">
        <button
          className="brand-badge-btn"
          onClick={() => {
            if (sfxOn) SoundFX.playClick();
            onJumpToScreen('s-cards');
          }}
          title="Go to Multiverse Hub"
        >
          <span className="brand-dot live"></span>
          <span className="brand-title">HARSHIT<span className="text-glow">.EXE</span></span>
          <span className="brand-tag">USAR_DELHI</span>
        </button>

        {/* AI Audio-Reactive Waveform Visualizer */}
        <div
          className={`ai-waveform-hud ${isSpeaking ? 'active' : ''}`}
          title={isSpeaking ? 'AI Voice Narration Transmitting' : 'AI Voice Standby'}
        >
          <span className="bar b1"></span>
          <span className="bar b2"></span>
          <span className="bar b3"></span>
          <span className="bar b4"></span>
          <span className="waveform-label">{isSpeaking ? 'AI_TRANSMITTING' : 'AI_STANDBY'}</span>
        </div>
      </div>

      {/* Quick Modal Actions on Cards Screen */}
      <div className="nav-center">
        {isCardsScreen && (
          <div className="quick-modal-actions">
            <button
              className="hud-quick-btn"
              onClick={() => { if (sfxOn) SoundFX.playClick(); onOpenModal('terminal'); }}
              title="Open Interactive Hacker Shell"
            >
              <span>💻</span> TERMINAL
            </button>
            <button
              className="hud-quick-btn"
              onClick={() => { if (sfxOn) SoundFX.playClick(); onOpenModal('ml-sim'); }}
              title="Open Live ML Valuation Simulator"
            >
              <span>🚲</span> ML SIM
            </button>
            <button
              className="hud-quick-btn"
              onClick={() => { if (sfxOn) SoundFX.playClick(); onOpenModal('code-inspect'); }}
              title="Inspect Production Source Code"
            >
              <span>📋</span> CODE
            </button>
            <button
              className="hud-quick-btn"
              onClick={() => { if (sfxOn) SoundFX.playClick(); onOpenModal('architecture'); }}
              title="View Multi-Agent Architecture Diagrams"
            >
              <span>⚙️</span> ARCH
            </button>
            <button
              className="hud-quick-btn"
              onClick={() => { if (sfxOn) SoundFX.playClick(); onOpenModal('dossier'); }}
              title="View Personnel Dossier & Skills"
            >
              <span>👤</span> DOSSIER
            </button>
          </div>
        )}
      </div>

      <div className="nav-right">
        {onOpenModal && (
          <button
            className="hud-contact-btn"
            onClick={() => { if (sfxOn) SoundFX.playClick(); onOpenModal('contact'); }}
            title="Open Direct Comms Channel"
          >
            <span>COMMS</span> →
          </button>
        )}

        <button
          className={`hud-toggle-btn ${!sfxOn ? 'muted' : ''}`}
          onClick={handleToggleSFX}
          title={sfxOn ? 'Disable Sound Effects' : 'Enable Sound Effects'}
          aria-label="Toggle SFX"
        >
          <span>{sfxOn ? '🔊 SFX' : '🔇 SFX'}</span>
        </button>

        <button
          className={`hud-toggle-btn voice ${!voiceEnabled ? 'muted' : ''}`}
          onClick={handleToggleVoice}
          title={voiceEnabled ? 'Mute AI Voice Narration' : 'Enable AI Voice Narration'}
          aria-label="Toggle Voice"
        >
          <span className="voice-dot"></span>
          <span>{voiceEnabled ? 'VOICE' : 'MUTED'}</span>
        </button>

        <a
          href="https://github.com/harshitthek"
          target="_blank"
          rel="noopener noreferrer"
          className="hud-toggle-btn git"
          title="Open Harshit's GitHub"
          onClick={() => { if (sfxOn) SoundFX.playClick(); }}
        >
          <span>🐙 GIT</span>
        </a>
      </div>
    </header>
  );
}
