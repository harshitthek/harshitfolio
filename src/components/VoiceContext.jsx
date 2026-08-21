import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { SoundFX } from './SoundFX';

const VoiceContext = createContext();

const STORAGE_KEY = 'harshit_portfolio_voice_enabled';

export function VoiceProvider({ children }) {
  const [voiceEnabled, setVoiceEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored !== null) return stored === 'true';
      } catch {
        return true;
      }
    }
    return true;
  });

  const voiceEnabledRef = useRef(voiceEnabled);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentUtterance, setCurrentUtterance] = useState('');
  const timeoutRef = useRef(null);
  const keepAliveIntervalRef = useRef(null);
  const activeUtteranceRef = useRef(null);

  // Sync ref with state & persist
  useEffect(() => {
    voiceEnabledRef.current = voiceEnabled;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, String(voiceEnabled));
      } catch {}
      if (!voiceEnabled && window.speechSynthesis) {
        try {
          window.speechSynthesis.cancel();
        } catch {}
        setIsSpeaking(false);
        setCurrentUtterance('');
        if (keepAliveIntervalRef.current) clearInterval(keepAliveIntervalRef.current);
      }
    }
  }, [voiceEnabled]);

  // Load and cache voices
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const loadVoices = () => {
        try {
          window.speechSynthesis.getVoices();
        } catch {}
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;

      // Global user interaction listener to unlock speech synthesis audio engine
      const unlockSpeech = () => {
        try {
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
        } catch {}
      };

      window.addEventListener('click', unlockSpeech, { passive: true });
      window.addEventListener('touchstart', unlockSpeech, { passive: true });
      window.addEventListener('keydown', unlockSpeech, { passive: true });

      return () => {
        window.removeEventListener('click', unlockSpeech);
        window.removeEventListener('touchstart', unlockSpeech);
        window.removeEventListener('keydown', unlockSpeech);
        if (keepAliveIntervalRef.current) clearInterval(keepAliveIntervalRef.current);
      };
    }
  }, []);

  const speak = useCallback((text, rate = 0.95, pitch = 0.9) => {
    if (!voiceEnabledRef.current || typeof window === 'undefined' || !window.speechSynthesis) {
      return;
    }

    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.cancel();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (keepAliveIntervalRef.current) clearInterval(keepAliveIntervalRef.current);

      // 20ms debounce prevents Chromium from canceling the new utterance during the queue clear
      setTimeout(() => {
        if (!voiceEnabledRef.current) return;

        try {
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }

          const utterance = new SpeechSynthesisUtterance(text);
          utterance.rate = rate;
          utterance.pitch = pitch;
          utterance.volume = 1;
          utterance.lang = 'en-US';

          // Preserve reference on window and ref to prevent Chrome garbage-collection speech freeze
          window.__activeVoiceUtterance = utterance;
          activeUtteranceRef.current = utterance;

          const voices = window.speechSynthesis.getVoices();
          if (voices && voices.length > 0) {
            const preferredVoice = voices.find(
              (v) =>
                v.name.toLowerCase().includes('daniel') ||
                v.name.toLowerCase().includes('alex') ||
                v.name.toLowerCase().includes('google uk') ||
                v.name.toLowerCase().includes('natural') ||
                v.name.toLowerCase().includes('male') ||
                v.lang.startsWith('en')
            );

            if (preferredVoice) {
              utterance.voice = preferredVoice;
            }
          }

          utterance.onstart = () => {
            if (!voiceEnabledRef.current) {
              try {
                window.speechSynthesis.cancel();
              } catch {}
              setIsSpeaking(false);
              setCurrentUtterance('');
              return;
            }
            setIsSpeaking(true);
            setCurrentUtterance(text);

            // Chrome keep-alive pulse: prevents Chrome from pausing speech synthesis after 14 seconds
            if (keepAliveIntervalRef.current) clearInterval(keepAliveIntervalRef.current);
            keepAliveIntervalRef.current = setInterval(() => {
              try {
                if (window.speechSynthesis.speaking) {
                  window.speechSynthesis.pause();
                  window.speechSynthesis.resume();
                } else {
                  clearInterval(keepAliveIntervalRef.current);
                }
              } catch {}
            }, 8000);
          };

          utterance.onend = () => {
            setIsSpeaking(false);
            setCurrentUtterance('');
            window.__activeVoiceUtterance = null;
            activeUtteranceRef.current = null;
            if (keepAliveIntervalRef.current) clearInterval(keepAliveIntervalRef.current);
          };

          utterance.onerror = () => {
            setIsSpeaking(false);
            setCurrentUtterance('');
            window.__activeVoiceUtterance = null;
            activeUtteranceRef.current = null;
            if (keepAliveIntervalRef.current) clearInterval(keepAliveIntervalRef.current);
          };

          window.speechSynthesis.speak(utterance);

          // Failsafe auto-reset timer based on sentence word count
          const wordCount = text.split(' ').length;
          const estimatedDuration = Math.max(2500, (wordCount / 2.0) * 1000 + 1500);
          timeoutRef.current = setTimeout(() => {
            setIsSpeaking(false);
            if (keepAliveIntervalRef.current) clearInterval(keepAliveIntervalRef.current);
          }, estimatedDuration);
        } catch (innerErr) {
          console.warn('[VoiceContext] Dispatch error:', innerErr);
          setIsSpeaking(false);
        }
      }, 25);
    } catch (err) {
      console.warn('[VoiceContext] Speech error:', err);
      setIsSpeaking(false);
    }
  }, []);

  const toggleVoice = useCallback(() => {
    // Unlock speech synthesis immediately on user click gesture
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      } catch {}
    }

    setVoiceEnabled((prev) => {
      const next = !prev;
      voiceEnabledRef.current = next;

      if (!next) {
        SoundFX.playVoiceOff();
        if (typeof window !== 'undefined' && window.speechSynthesis) {
          try {
            window.speechSynthesis.cancel();
          } catch {}
          setIsSpeaking(false);
          setCurrentUtterance('');
          if (keepAliveIntervalRef.current) clearInterval(keepAliveIntervalRef.current);
        }
      } else {
        SoundFX.playVoiceOn();
        // Play clear voice confirmation when unmuting
        setTimeout(() => {
          speak('AI voice telemetry activated.');
        }, 120);
      }
      return next;
    });
  }, [speak]);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
      setIsSpeaking(false);
      setCurrentUtterance('');
      if (keepAliveIntervalRef.current) clearInterval(keepAliveIntervalRef.current);
    }
  }, []);

  return (
    <VoiceContext.Provider
      value={{ voiceEnabled, isSpeaking, currentUtterance, speak, toggleVoice, stopSpeaking }}
    >
      {children}
    </VoiceContext.Provider>
  );
}

export function useVoice() {
  const context = useContext(VoiceContext);
  if (!context) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
}
