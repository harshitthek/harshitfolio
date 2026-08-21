import { describe, it, expect } from 'vitest';
import { dossierData } from '../data/dossierData';

describe('Dossier Executive Data Matrix Integrity', () => {
  it('should have complete personal background info', () => {
    const { personal } = dossierData;
    expect(personal.name).toBe('Harshit Sharma');
    expect(personal.role).toBeTruthy();
    expect(personal.degree).toContain('Artificial Intelligence & Machine Learning');
    expect(personal.duration).toContain('2029');
    expect(personal.email).toBe('codewithharshitsharma@gmail.com');
    expect(personal.github).toBe('https://github.com/harshitthek');
    expect(personal.linkedin).toContain('linkedin.com/in/devharshitsharma');
    expect(personal.location).toBe('New Delhi, India');
  });

  it('should have 4 valid core engineering stats', () => {
    expect(Array.isArray(dossierData.stats)).toBe(true);
    expect(dossierData.stats.length).toBe(4);
    dossierData.stats.forEach(s => {
      expect(s.value).toBeTruthy();
      expect(s.label).toBeTruthy();
    });
  });

  it('should have structured experience timeline', () => {
    expect(Array.isArray(dossierData.experience)).toBe(true);
    expect(dossierData.experience.length).toBeGreaterThanOrEqual(2);
    dossierData.experience.forEach(exp => {
      expect(exp.period).toBeTruthy();
      expect(exp.role).toBeTruthy();
      expect(exp.organization).toBeTruthy();
      expect(Array.isArray(exp.highlights)).toBe(true);
      expect(exp.highlights.length).toBeGreaterThan(0);
    });
  });

  it('should have valid education record for Class of 2029', () => {
    expect(Array.isArray(dossierData.education)).toBe(true);
    const edu = dossierData.education[0];
    expect(edu.degree).toContain('Bachelor of Technology');
    expect(edu.major).toContain('Artificial Intelligence & Machine Learning');
    expect(edu.status).toContain('Class of 2029');
    expect(Array.isArray(edu.coursework)).toBe(true);
    expect(edu.coursework.length).toBeGreaterThanOrEqual(5);
  });

  it('should have 4 competency domains with non-empty skills', () => {
    expect(Array.isArray(dossierData.competencies)).toBe(true);
    expect(dossierData.competencies.length).toBe(4);
    dossierData.competencies.forEach(comp => {
      expect(comp.area).toBeTruthy();
      expect(Array.isArray(comp.skills)).toBe(true);
      expect(comp.skills.length).toBeGreaterThan(3);
    });
  });

  it('should be 100% free of legacy institutional abbreviations (USAR / GGSIPU)', () => {
    const rawJson = JSON.stringify(dossierData);
    expect(rawJson).not.toMatch(/USAR/i);
    expect(rawJson).not.toMatch(/GGSIPU/i);
  });
});
