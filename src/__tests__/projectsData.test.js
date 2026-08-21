import { describe, it, expect } from 'vitest';
import { projectsData } from '../data/projectsData';

describe('Projects Data Matrix Integrity', () => {
  it('should export an array of flagship universe projects', () => {
    expect(Array.isArray(projectsData)).toBe(true);
    expect(projectsData.length).toBeGreaterThanOrEqual(10);
  });

  it('should have unique IDs for all projects', () => {
    const ids = projectsData.map(p => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have required schema attributes for every project', () => {
    projectsData.forEach((project, idx) => {
      expect(project.id, `Project at index ${idx} missing id`).toBeTruthy();
      expect(typeof project.id).toBe('string');

      expect(project.title, `Project ${project.id} missing title`).toBeTruthy();
      expect(typeof project.title).toBe('string');

      expect(project.desc, `Project ${project.id} missing desc`).toBeTruthy();
      expect(typeof project.desc).toBe('string');

      expect(project.category, `Project ${project.id} missing category`).toBeTruthy();
      expect(typeof project.category).toBe('string');

      expect(project.categoryLabel, `Project ${project.id} missing categoryLabel`).toBeTruthy();

      expect(Array.isArray(project.tags), `Project ${project.id} tags must be array`).toBe(true);
      expect(project.tags.length).toBeGreaterThan(0);

      expect(project.stats, `Project ${project.id} missing stats object`).toBeTruthy();
      expect(typeof project.stats).toBe('object');
    });
  });

  it('should have valid HTTP/HTTPS URLs for repository or demo links', () => {
    projectsData.forEach((project) => {
      const url = project.githubUrl || project.demoUrl || project.url;
      expect(url, `Project ${project.id} must have a valid URL`).toBeTruthy();
      expect(url.startsWith('http://') || url.startsWith('https://')).toBe(true);
    });
  });

  it('should have structured stats object with stat1, stat2, and stat3', () => {
    projectsData.forEach((project) => {
      expect(project.stats.stat1).toBeTruthy();
      expect(project.stats.stat1Lbl).toBeTruthy();
      expect(project.stats.stat2).toBeTruthy();
      expect(project.stats.stat2Lbl).toBeTruthy();
      expect(project.stats.stat3).toBeTruthy();
      expect(project.stats.stat3Lbl).toBeTruthy();
    });
  });
});
