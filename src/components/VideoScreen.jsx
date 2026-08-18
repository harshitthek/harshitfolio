import React, { useRef, useState, useEffect } from 'react';
import { SoundFX } from './SoundFX';
import { useVoice } from './VoiceContext';

export default function VideoScreen({ isActive, onComplete }) {
  const vidRef = useRef(null);
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const fallbackTimerRef = useRef(null);
  const { voiceEnabled, toggleVoice } = useVoice();
  const [sfxOn, setSfxOn] = useState(SoundFX.isEnabled());

  const killAllAudio = () => {
    if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);

    // Stop and mute HTML5 video completely
    if (vidRef.current) {
      try {
        vidRef.current.pause();
        vidRef.current.currentTime = 0;
        vidRef.current.muted = true;
        vidRef.current.volume = 0;
      } catch (err) {
        // Ignore
      }
    }

    // Cancel any queued speech synthesis audio
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch (err) {
        // Ignore
      }
    }
  };

  const handleToggleSFX = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const next = SoundFX.toggle();
    setSfxOn(next);
    if (vidRef.current) {
      vidRef.current.muted = !next;
    }
    if (next) SoundFX.playClick();
  };

  const handleToggleVoice = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    toggleVoice();
  };

  const afterVideo = (e) => {
    if (e) {
      if (e.preventDefault) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
    }
    setVideoEnded(true);
    killAllAudio();

    if (sfxOn) SoundFX.playClick();
    if (onComplete) onComplete();
  };

  const unmuteVideo = (e) => {
    if (e) {
      if (e.preventDefault) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
    }
    if (videoStarted) return;

    setVideoStarted(true);
    if (sfxOn) SoundFX.playClick();

    if (vidRef.current) {
      vidRef.current.currentTime = 0;
      vidRef.current.muted = !sfxOn;
      vidRef.current.volume = 1;
      const playPromise = vidRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Playback error fallback:', err);
          afterVideo();
        });
      }
    } else {
      afterVideo();
    }

    if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
    fallbackTimerRef.current = setTimeout(() => {
      afterVideo();
    }, 8500);
  };

  const handleSkip = (e) => {
    if (e) {
      if (e.preventDefault) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
    }
    afterVideo();
  };

  // Full state reset on screen reactivation
  useEffect(() => {
    if (isActive) {
      setVideoStarted(false);
      setVideoEnded(false);
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);

      if (vidRef.current) {
        try {
          vidRef.current.pause();
          vidRef.current.currentTime = 0;
          vidRef.current.muted = !sfxOn;
          vidRef.current.volume = 1;
        } catch (err) {
          // Ignore
        }
      }
    } else {
      killAllAudio();
    }
  }, [isActive, sfxOn]);

  // Keyboard accessibility: Space or Enter to unmute and start video
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (!videoStarted) {
          unmuteVideo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, videoStarted, sfxOn]);

  return (
    <div id="s-video" className={`screen ${isActive ? 'active' : ''}`}>
      <video
        playsInline
        webkit-playsinline="true"
        preload="auto"
        muted={!videoStarted}
        id="intro-video"
        src={`${import.meta.env.BASE_URL}videoplayback.mp4`}
        ref={vidRef}
        onPlay={(e) => {
          if (!videoStarted) {
            e.target.pause();
            e.target.currentTime = 0;
          }
        }}
        onEnded={afterVideo}
        onError={() => {
          if (videoStarted) afterVideo();
        }}
      />

      {/* Subtle Vignette Mask */}
      <div className="video-vignette-overlay"></div>

      {/* Top Floating Controls Bar */}
      <header className="video-top-hud">
        <div className="video-hud-left">
          <div className="video-brand-pill">
            <span className="brand-dot live"></span>
            <span className="brand-title">HARSHIT<span className="text-glow">.EXE</span></span>
            <span className="brand-badge">USAR_DELHI</span>
          </div>
        </div>

        <div className="video-hud-right">
          <button
            type="button"
            className={`video-hud-btn ${!sfxOn ? 'muted' : ''}`}
            onClick={handleToggleSFX}
            onMouseEnter={() => sfxOn && SoundFX.playHover('normal')}
            title={sfxOn ? 'Disable SFX Audio' : 'Enable SFX Audio'}
          >
            <span>{sfxOn ? '🔊 SFX ON' : '🔇 SFX OFF'}</span>
          </button>

          <button
            type="button"
            className={`video-hud-btn voice ${!voiceEnabled ? 'muted' : ''}`}
            onClick={handleToggleVoice}
            onMouseEnter={() => sfxOn && SoundFX.playHover('normal')}
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
            onMouseEnter={() => sfxOn && SoundFX.playHover('high')}
            onClick={(e) => {
              e.stopPropagation();
              if (sfxOn) SoundFX.playClick();
            }}
          >
            <span>🐙 GITHUB</span>
          </a>
        </div>
      </header>

      {/* Futuristic HUD Corner Decors */}
      <div className="corner-dec tl"></div>
      <div className="corner-dec tr"></div>
      <div className="corner-dec bl"></div>
      <div className="corner-dec br"></div>

      {/* Interactive Unmute Banner */}
      {!videoStarted && (
        <div
          id="unmute-overlay"
          className="unmute-overlay"
          onClick={unmuteVideo}
          role="button"
          tabIndex={0}
        >
          <div className="unmute-box" onClick={unmuteVideo}>
            <span className="corner tl"></span>
            <span className="corner tr"></span>
            <span className="corner bl"></span>
            <span className="corner br"></span>

            <div className="unmute-badge">
              <span className="unmute-pulse-dot"></span>
              <span>AUDIO TRANSMISSION READY // 48kHz</span>
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

            <button
              type="button"
              className="unmute-cta-btn"
              onClick={unmuteVideo}
              onMouseEnter={() => sfxOn && SoundFX.playHover('primary')}
            >
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
    </div>
  );
}
