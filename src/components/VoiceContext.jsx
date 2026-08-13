import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const VoiceContext = createContext();

export function VoiceProvider({ children }) {
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentUtterance, setCurrentUtterance] = useState('');
  const timeoutRef = useRef(null);

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
    if (!voiceEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;

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
  }, [voiceEnabled]);

  const toggleVoice = () => {
    if (voiceEnabled && typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setVoiceEnabled(prev => !prev);
  };

  return (
    <VoiceContext.Provider value={{ voiceEnabled, isSpeaking, currentUtterance, speak, toggleVoice }}>
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
