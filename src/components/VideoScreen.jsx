import React, { useRef, useState, useEffect } from 'react';
import { SoundFX } from './SoundFX';
import { useVoice } from './VoiceContext';

export default function VideoScreen({ isActive, onComplete }) {
  const vidRef = useRef(null);
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState('00:00');
  const [durationStr, setDurationStr] = useState('00:08');
  const fallbackTimerRef = useRef(null);
  const { voiceEnabled, toggleVoice } = useVoice();
  const [sfxOn, setSfxOn] = useState(SoundFX.isEnabled());

  const handleToggleSFX = (e) => {
    e.stopPropagation();
    const next = SoundFX.toggle();
    setSfxOn(next);
    if (next) SoundFX.playClick();
  };

  const handleToggleVoice = (e) => {
    e.stopPropagation();
    SoundFX.playClick();
    toggleVoice();
  };

  const afterVideo = () => {
    if (videoEnded) return;
    setVideoEnded(true);
    if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);

    // Immediately stop and mute the video so sound never lingers
    if (vidRef.current) {
      try {
        vidRef.current.pause();
        vidRef.current.currentTime = 0;
        vidRef.current.muted = true;
      } catch (e) {
        // Ignore
      }
    }

    // Immediately cancel any ongoing speech synthesis narration
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        // Ignore
      }
    }

    SoundFX.playClick();
    onComplete();
  };

  const unmuteVideo = () => {
    if (videoStarted) return;
    setVideoStarted(true);
    SoundFX.playClick();

    if (vidRef.current) {
      vidRef.current.muted = false;
      vidRef.current.currentTime = 0;
      vidRef.current.play().catch(() => {
        // Autoplay restricted fallback
        afterVideo();
      });
    } else {
      afterVideo();
    }

    // Safety timeout in case video stalls
    fallbackTimerRef.current = setTimeout(afterVideo, 8500);
  };

  const handleSkip = (e) => {
    e.stopPropagation();
    afterVideo();
  };

  const handleTimeUpdate = () => {
    if (!vidRef.current) return;
    const cur = vidRef.current.currentTime || 0;
    const dur = vidRef.current.duration || 8;
    setProgress(Math.min(100, (cur / dur) * 100));

    const curSec = Math.floor(cur);
    const durSec = Math.floor(dur);
    setCurrentTimeStr(`00:0${curSec}`);
    setDurationStr(`00:0${durSec}`);
  };

  // Keyboard accessibility: ESC or Space to skip video
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        if (!videoStarted) {
          unmuteVideo();
        } else {
          afterVideo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, videoStarted]);

  useEffect(() => {
    if (!isActive && fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
    }
  }, [isActive]);

  return (
    <div id="s-video" className={`screen ${isActive ? 'active' : ''}`}>
      <video
        playsInline
        id="intro-video"
        src="/videoplayback.mp4"
        ref={vidRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={afterVideo}
        onError={() => {
          if (videoStarted) afterVideo();
        }}
      />

      {/* Cyber Cinematic Scanline & Vignette Overlay */}
      <div className="video-scanlines-overlay"></div>
      <div className="video-vignette-overlay"></div>

      {/* Top Floating Controls Bar */}
      <div className="video-top-hud">
        <div className="video-hud-left">
          <div className="video-brand-pill">
            <span className="brand-dot live"></span>
            <span className="brand-title">HARSHIT<span className="text-glow">.EXE</span></span>
            <span className="brand-badge">USAR_DELHI</span>
          </div>

          <div className="video-telemetry-chip">
            <span className="telemetry-dot"></span>
            <span>FEED: ONLINE // 1080p 60FPS</span>
          </div>
        </div>

        <div className="video-hud-right">
          <button
            className={`video-hud-btn ${!sfxOn ? 'muted' : ''}`}
            onClick={handleToggleSFX}
            title={sfxOn ? 'Disable SFX Audio' : 'Enable SFX Audio'}
          >
            <span>{sfxOn ? '🔊 SFX ON' : '🔇 SFX OFF'}</span>
          </button>

          <button
            className={`video-hud-btn voice ${!voiceEnabled ? 'muted' : ''}`}
            onClick={handleToggleVoice}
            title={voiceEnabled ? 'Mute AI Voice Narration' : 'Enable AI Voice Narration'}
          >
            <span className="voice-dot"></span>
            <span>{voiceEnabled ? 'VOICE ON' : 'VOICE OFF'}</span>
          </button>

          <a
            href="https://github.com/harshitthek"
            target="_blank"
            rel="noopener noreferrer"
            className="video-hud-btn git"
            onClick={(e) => {
              e.stopPropagation();
              SoundFX.playClick();
            }}
          >
            <span>🐙 GITHUB</span>
          </a>
        </div>
      </div>

      {/* Futuristic HUD Corner Decors */}
      <div className="corner-dec tl"></div>
      <div className="corner-dec tr"></div>
      <div className="corner-dec bl"></div>
      <div className="corner-dec br"></div>

      {/* Interactive Unmute Banner */}
      {!videoStarted && (
        <div id="unmute-overlay" className="unmute-overlay" onClick={unmuteVideo}>
          <div className="unmute-box">
            <span className="corner tl"></span>
            <span className="corner tr"></span>
            <span className="corner bl"></span>
            <span className="corner br"></span>

            <div className="unmute-badge">
              <span className="unmute-pulse-dot"></span>
              <span>AUDIO TRANSMISSION READY // 48kHz HIGH-FIDELITY</span>
            </div>

            <h2 className="unmute-headline">
              INITIALIZE THE EXPERIENCE
            </h2>

            <div className="unmute-sub">
              <span>HARSHIT SHARMA</span>
              <span className="dot-sep">•</span>
              <span>ARTIFICIAL INTELLIGENCE</span>
              <span className="dot-sep">•</span>
              <span>USAR (GGSIPU)</span>
            </div>

            {/* Micro Equalizer Waveform */}
            <div className="unmute-equalizer">
              <span className="eq-bar"></span>
              <span className="eq-bar"></span>
              <span className="eq-bar"></span>
              <span className="eq-bar"></span>
              <span className="eq-bar"></span>
              <span className="eq-bar"></span>
              <span className="eq-bar"></span>
            </div>

            <button className="unmute-cta-btn" onClick={unmuteVideo}>
              <span className="corner tl"></span>
              <span className="corner tr"></span>
              <span className="corner bl"></span>
              <span className="corner br"></span>
              <span className="play-icon-glow">▶</span>
              <span>ENGAGE AUDIO & ENTER SYSTEM</span>
            </button>

            <div className="unmute-hint">
              <span className="hint-bracket">[</span> CLICK ANYWHERE OR PRESS SPACE TO UNMUTE <span className="hint-bracket">]</span>
            </div>
          </div>
        </div>
      )}

      {/* Live Playback Telemetry Bar (when video is actively playing) */}
      {videoStarted && (
        <div className="video-playback-hud">
          <div className="playback-telemetry-left">
            <span className="telemetry-rec-dot"></span>
            <span className="rec-label">STREAMING NEURAL RECON</span>
            <span className="time-code">{currentTimeStr} / {durationStr}</span>
          </div>

          <div className="playback-progress-track">
            <div className="playback-progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}

      {/* Skip Button with Cyber Glow & Keyboard Hint */}
      <button
        className="skip-btn"
        onClick={handleSkip}
        onMouseEnter={() => SoundFX.playHover()}
        title="Skip intro video (Esc / Space)"
      >
        <span className="corner tl"></span>
        <span className="corner tr"></span>
        <span className="corner bl"></span>
        <span className="corner br"></span>
        <span>SKIP ›</span>
      </button>
    </div>
  );
}
