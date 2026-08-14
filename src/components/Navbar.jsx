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
      {/* Brand Identity & AI Voice Transceiver */}
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

      {/* Center Quick Multiverse Modal Triggers (Cards Screen) */}
      <div className="nav-center">
        {isCardsScreen && (
          <div className="quick-modal-actions">
            <button
              className="hud-quick-btn"
              onClick={() => { if (sfxOn) SoundFX.playClick(); onOpenModal('terminal'); }}
              title="Open Interactive Hacker Shell"
            >
              <svg className="nav-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
              TERMINAL
            </button>
            <button
              className="hud-quick-btn"
              onClick={() => { if (sfxOn) SoundFX.playClick(); onOpenModal('ml-sim'); }}
              title="Open Live ML Valuation Simulator"
            >
              <svg className="nav-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/></svg>
              ML SIM
            </button>
            <button
              className="hud-quick-btn"
              onClick={() => { if (sfxOn) SoundFX.playClick(); onOpenModal('code-inspect'); }}
              title="Inspect Production Source Code"
            >
              <svg className="nav-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              CODE
            </button>
            <button
              className="hud-quick-btn"
              onClick={() => { if (sfxOn) SoundFX.playClick(); onOpenModal('architecture'); }}
              title="View Multi-Agent Architecture Diagrams"
            >
              <svg className="nav-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
              ARCH
            </button>
            <button
              className="hud-quick-btn"
              onClick={() => { if (sfxOn) SoundFX.playClick(); onOpenModal('dossier'); }}
              title="View Personnel Dossier & Skills"
            >
              <svg className="nav-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              DOSSIER
            </button>
          </div>
        )}
      </div>

      {/* Permanent Social & Comms Channels (GitHub Octocat, LinkedIn, Comms, Audio) */}
      <div className="nav-right">
        {/* Permanent GitHub Octocat Vector Link */}
        <a
          href="https://github.com/harshitthek"
          target="_blank"
          rel="noopener noreferrer"
          className="hud-social-btn git"
          title="Open Harshit's GitHub (@harshitthek)"
          onClick={() => { if (sfxOn) SoundFX.playClick(); }}
        >
          <svg className="social-svg-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          <span className="social-text">GITHUB</span>
        </a>

        {/* Permanent LinkedIn Vector Link */}
        <a
          href="https://www.linkedin.com/in/devharshitsharma"
          target="_blank"
          rel="noopener noreferrer"
          className="hud-social-btn linkedin"
          title="Connect with Harshit on LinkedIn"
          onClick={() => { if (sfxOn) SoundFX.playClick(); }}
        >
          <svg className="social-svg-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
          </svg>
          <span className="social-text">LINKEDIN</span>
        </a>

        {/* Permanent Direct Comms Modal */}
        {onOpenModal && (
          <button
            className="hud-social-btn comms"
            onClick={() => { if (sfxOn) SoundFX.playClick(); onOpenModal('contact'); }}
            title="Open Direct Comms / Email Channel"
          >
            <svg className="social-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            <span className="social-text">COMMS</span>
          </button>
        )}

        <div className="nav-divider"></div>

        {/* Sound Effects Toggle */}
        <button
          className={`hud-toggle-btn ${!sfxOn ? 'muted' : ''}`}
          onClick={handleToggleSFX}
          title={sfxOn ? 'Disable Sound Effects' : 'Enable Sound Effects'}
          aria-label="Toggle SFX"
        >
          {sfxOn ? (
            <svg className="toggle-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          ) : (
            <svg className="toggle-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
          )}
          <span>SFX</span>
        </button>

        {/* AI Voice Toggle */}
        <button
          className={`hud-toggle-btn voice ${!voiceEnabled ? 'muted' : ''}`}
          onClick={handleToggleVoice}
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
