import React from 'react';
import { useVoice } from './VoiceContext';
import { SoundFX } from './SoundFX';

export default function Navbar({ onOpenModal, activeScreen, onJumpToScreen }) {
  const { voiceEnabled, isSpeaking, toggleVoice } = useVoice();
  const [sfxOn, setSfxOn] = React.useState(SoundFX.isEnabled());

  // Only show the top HUD navbar on the Cards Hub screen to keep Video and Mission screens 100% clean and cinematic
  if (activeScreen !== 's-cards') {
    return null;
  }

  const handleToggleSFX = () => {
    const next = SoundFX.toggle();
    setSfxOn(next);
    if (next) SoundFX.playClick();
  };

  return (
    <header className="cyber-hud-nav">
      <div className="nav-left">
        <button
          className="brand-badge-btn"
          onClick={() => {
            SoundFX.playClick();
            onJumpToScreen('s-cards');
          }}
          title="Go to Multiverse Hub"
        >
          <span className="brand-dot live"></span>
          <span className="brand-title">HARSHIT<span className="text-glow">.EXE</span></span>
          <span className="brand-tag">AI_ENGINEER</span>
        </button>

        {/* AI Audio-Reactive Waveform Visualizer */}
        <div className={`ai-waveform-hud ${isSpeaking ? 'active' : ''}`} title={isSpeaking ? 'AI Voice Transmission Active' : 'AI Voice Standby'}>
          <span className="bar b1"></span>
          <span className="bar b2"></span>
          <span className="bar b3"></span>
          <span className="bar b4"></span>
          <span className="waveform-label">{isSpeaking ? 'AI_TRANSMITTING' : 'AI_STANDBY'}</span>
        </div>
      </div>

      <div className="nav-center">
        <div className="quick-modal-actions">
          <button
            className="hud-quick-btn"
            onClick={() => { SoundFX.playClick(); onOpenModal('terminal'); }}
            title="Open Interactive Hacker Shell"
          >
            <span>💻</span> TERMINAL
          </button>
          <button
            className="hud-quick-btn"
            onClick={() => { SoundFX.playClick(); onOpenModal('ml-sim'); }}
            title="Open Live ML Valuation Simulator"
          >
            <span>🚲</span> ML SIM
          </button>
          <button
            className="hud-quick-btn"
            onClick={() => { SoundFX.playClick(); onOpenModal('code-inspect'); }}
            title="Inspect Production Source Code"
          >
            <span>📋</span> CODE
          </button>
          <button
            className="hud-quick-btn"
            onClick={() => { SoundFX.playClick(); onOpenModal('architecture'); }}
            title="View Multi-Agent Architecture Diagrams"
          >
            <span>⚙️</span> ARCH
          </button>
          <button
            className="hud-quick-btn"
            onClick={() => { SoundFX.playClick(); onOpenModal('dossier'); }}
            title="View Personnel Dossier & Skills"
          >
            <span>👤</span> DOSSIER
          </button>
        </div>
      </div>

      <div className="nav-right">
        <button
          className="hud-contact-btn"
          onClick={() => { SoundFX.playClick(); onOpenModal('contact'); }}
          title="Open Direct Comms Channel"
        >
          <span>COMMS</span> →
        </button>

        <button
          className={`hud-toggle-btn ${!sfxOn ? 'muted' : ''}`}
          onClick={handleToggleSFX}
          title={sfxOn ? 'Disable SFX Audio' : 'Enable SFX Audio'}
          aria-label="Toggle SFX"
        >
          <span>{sfxOn ? '🔊 SFX' : '🔇 SFX'}</span>
        </button>

        <button
          className={`hud-toggle-btn voice ${!voiceEnabled ? 'muted' : ''}`}
          onClick={() => {
            SoundFX.playClick();
            toggleVoice();
          }}
          title={voiceEnabled ? 'Mute AI Voice Narration' : 'Enable AI Voice Narration'}
          aria-label="Toggle Voice"
        >
          <span className="voice-dot"></span>
          <span>{voiceEnabled ? 'VOICE' : 'MUTED'}</span>
        </button>
      </div>
    </header>
  );
}
