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
    fallbackTimerRef.current = setTimeout(afterVideo, 7500);
  };

  const handleSkip = (e) => {
    e.stopPropagation();
    afterVideo();
  };

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

      <div className="corner-dec tl"></div>
      <div className="corner-dec tr"></div>
      <div className="corner-dec bl"></div>
      <div className="corner-dec br"></div>

      {!videoStarted && (
        <div id="unmute-overlay" className="unmute-overlay" onClick={unmuteVideo}>
          <div className="unmute-box">
            <div className="unmute-title">
              <span className="play-triangle">▶</span> Tap Into the Experience
            </div>
            <div className="unmute-sub">AI NEURAL SYSTEMS · INITIALIZING HARSHIT.EXE</div>
            <div className="unmute-hint">CLICK ANYWHERE TO UNMUTE & ENTER</div>
          </div>
        </div>
      )}

      <button
        className="skip-btn"
        onClick={handleSkip}
        onMouseEnter={() => SoundFX.playHover()}
      >
        SKIP ›
      </button>
    </div>
  );
}
