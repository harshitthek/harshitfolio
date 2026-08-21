import { describe, it, expect } from 'vitest';
import { SoundFX } from '../components/SoundFX';

describe('SoundFX Acoustic Synthesis Engine', () => {
  it('should expose audio trigger API methods', () => {
    expect(typeof SoundFX.playHover).toBe('function');
    expect(typeof SoundFX.playClick).toBe('function');
    expect(typeof SoundFX.playKey).toBe('function');
    expect(typeof SoundFX.playDeploy).toBe('function');
    expect(typeof SoundFX.playVoiceOn).toBe('function');
    expect(typeof SoundFX.playVoiceOff).toBe('function');
    expect(typeof SoundFX.toggle).toBe('function');
  });

  it('should execute audio methods gracefully without throwing unhandled exceptions', () => {
    expect(() => {
      SoundFX.playHover('normal');
      SoundFX.playClick();
      SoundFX.playKey();
      SoundFX.playDeploy();
      SoundFX.playVoiceOn();
      SoundFX.playVoiceOff();
    }).not.toThrow();
  });
});
