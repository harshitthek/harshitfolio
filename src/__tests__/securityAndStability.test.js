import { describe, expect, it, vi } from 'vitest';
import { SoundFX } from '../components/SoundFX';

describe('Security, Edge Case & Stability Integrity Matrix', () => {
  it('should prevent path traversal out of virtual filesystem root', () => {
    function resolvePath(targetPath, currentPath) {
      if (!targetPath || targetPath === '~' || targetPath === '/') return '~';

      let parts;
      if (targetPath.startsWith('~/')) {
        parts = targetPath.slice(2).split('/').filter(Boolean);
      } else if (targetPath.startsWith('/')) {
        parts = targetPath.slice(1).split('/').filter(Boolean);
      } else {
        const base = currentPath === '~' ? [] : currentPath.slice(2).split('/').filter(Boolean);
        const targetParts = targetPath.split('/').filter(Boolean);
        parts = [...base];
        for (const p of targetParts) {
          if (p === '.') continue;
          if (p === '..') {
            if (parts.length > 0) parts.pop();
          } else {
            parts.push(p);
          }
        }
      }

      if (parts.length === 0) return '~';
      return `~/${parts.join('/')}`;
    }

    // Attempt deep traversal attacks
    expect(resolvePath('../../../../../etc/shadow', '~')).toBe('~/etc/shadow');
    expect(resolvePath('../../../../', '~/projects')).toBe('~');
    expect(resolvePath('../../..', '~')).toBe('~');
    expect(resolvePath('/root/private', '~')).toBe('~/root/private');
  });

  it('should survive and operate normally when LocalStorage throws SecurityError', () => {
    const originalSetItem = localStorage.setItem;
    const originalGetItem = localStorage.getItem;

    // Simulate Safari private browsing or blocked cookie environment
    localStorage.setItem = vi.fn(() => {
      throw new DOMException('Storage quota exceeded or restricted', 'QuotaExceededError');
    });
    localStorage.getItem = vi.fn(() => {
      throw new DOMException('The operation is insecure', 'SecurityError');
    });

    expect(() => {
      SoundFX.toggle();
      SoundFX.setEnabled(true);
      SoundFX.isEnabled();
    }).not.toThrow();

    // Restore
    localStorage.setItem = originalSetItem;
    localStorage.getItem = originalGetItem;
  });

  it('should clamp ML engine numeric inputs and prevent NaN or Infinity prices', () => {
    const computeValuation = (basePrice, age, kms, power, defCC) => {
      const safeAge = Math.max(0, Math.min(30, Number(age) || 0));
      const safeKms = Math.max(0, Number(kms) || 0);
      const safePower = Math.max(50, Number(power) || defCC);

      const ageFactor = 0.89 ** safeAge;
      const kmFactor = Math.max(0.42, 1 - (safeKms / 120000) * 0.44);
      const ccDiff = safePower - defCC;
      const ccBonus = ccDiff * 140;

      const rawEst = basePrice * ageFactor * kmFactor + ccBonus;
      const estimated = Number.isFinite(rawEst) ? rawEst : basePrice;
      return Math.max(22000, Math.round(estimated / 500) * 500);
    };

    // Extreme/invalid edge cases
    expect(computeValuation(200000, -10, -5000, 'invalid', 350)).toBeGreaterThan(22000);
    expect(computeValuation(200000, 999, 9999999, 350, 350)).toBe(22000); // Floor hit
    expect(Number.isFinite(computeValuation(200000, NaN, undefined, null, 350))).toBe(true);
  });

  it('should reject empty or whitespace-only contact submissions', () => {
    const validateForm = (name, email, message) => {
      const cleanName = (name || '').trim();
      const cleanEmail = (email || '').trim();
      const cleanMsg = (message || '').trim();
      return Boolean(cleanName && cleanEmail && cleanMsg);
    };

    expect(validateForm('', '', '')).toBe(false);
    expect(validateForm('   ', 'test@test.com', 'Valid message')).toBe(false);
    expect(validateForm('Operator', '   ', 'Valid message')).toBe(false);
    expect(validateForm('Operator', 'test@test.com', '   ')).toBe(false);
    expect(validateForm('Harshit', 'test@example.com', 'Hello world')).toBe(true);
  });
});
