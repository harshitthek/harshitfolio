import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const VoiceContext = createContext();

const STORAGE_KEY = 'harshit_portfolio_voice_enabled';

export function VoiceProvider({ children }) {
  const [voiceEnabled, setVoiceEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) return stored === 'true';
    }
    return true;
  });

  const voiceEnabledRef = useRef(voiceEnabled);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentUtterance, setCurrentUtterance] = useState('');
  const timeoutRef = useRef(null);

  // Keep ref in sync with state at all times
  useEffect(() => {
    voiceEnabledRef.current = voiceEnabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, String(voiceEnabled));
      if (!voiceEnabled && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setCurrentUtterance('');
      }
    }
  }, [voiceEnabled]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const loadVoices = () => {
        try {
          window.speechSynthesis.getVoices();
        } catch (e) {
          // Ignore
        }
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const speak = useCallback((text, rate = 0.95, pitch = 0.9) => {
    // ALWAYS check live ref directly to prevent stale closure executions from setTimeout
    if (!voiceEnabledRef.current || typeof window === 'undefined' || !window.speechSynthesis) {
      return;
    }

    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.cancel();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = 1;
      utterance.lang = 'en-US';

      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const preferredVoice = voices.find(v =>
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
        // Double check ref in case user muted right as speech started
        if (!voiceEnabledRef.current) {
          window.speechSynthesis.cancel();
          setIsSpeaking(false);
          setCurrentUtterance('');
          return;
        }
        setIsSpeaking(true);
        setCurrentUtterance(text);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setCurrentUtterance('');
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setCurrentUtterance('');
      };

      window.speechSynthesis.speak(utterance);

      // Failsafe auto-reset
      const estimatedDuration = Math.max(2000, (text.split(' ').length / 2.2) * 1000 + 1000);
      timeoutRef.current = setTimeout(() => {
        setIsSpeaking(false);
      }, estimatedDuration);

    } catch (err) {
      console.warn('[VoiceContext] Speech error:', err);
      setIsSpeaking(false);
    }
  }, []);

  const toggleVoice = useCallback(() => {
    setVoiceEnabled(prev => {
      const next = !prev;
      voiceEnabledRef.current = next;
      if (!next && typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setCurrentUtterance('');
      }
      return next;
    });
  }, []);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentUtterance('');
    }
  }, []);

  return (
    <VoiceContext.Provider value={{ voiceEnabled, isSpeaking, currentUtterance, speak, toggleVoice, stopSpeaking }}>
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
