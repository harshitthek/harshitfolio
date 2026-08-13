import React, { useRef, useState, useEffect } from 'react';
import { SoundFX } from './SoundFX';

export default function VideoScreen({ isActive, onComplete }) {
  const vidRef = useRef(null);
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const fallbackTimerRef = useRef(null);

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
        onEnded={afterVideo}
        onError={() => {
          if (videoStarted) afterVideo();
        }}
      />

      {/* Cyber Cinematic Scanline & Vignette Overlay */}
      <div className="video-scanlines-overlay"></div>
      <div className="video-vignette-overlay"></div>

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
              <span>AUDIO TRANSMISSION READY</span>
            </div>

            <div className="unmute-title">
              <span className="play-icon-glow">▶</span>
              <span>INITIALIZE EXPERIENCE</span>
            </div>

            <div className="unmute-sub">
              HARSHIT SHARMA · ARTIFICIAL INTELLIGENCE · USAR (GGSIPU)
            </div>

            <div className="unmute-hint">
              <span className="hint-bracket">[</span> CLICK ANYWHERE OR PRESS SPACE TO UNMUTE & ENTER <span className="hint-bracket">]</span>
            </div>
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
