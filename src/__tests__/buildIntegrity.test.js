import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

describe('Production Build & SEO Asset Integrity', () => {
  it('should have a valid index.html with meta tags and title', () => {
    const indexPath = path.resolve(process.cwd(), 'index.html');
    expect(fs.existsSync(indexPath)).toBe(true);
    const content = fs.readFileSync(indexPath, 'utf-8');

    expect(content.toLowerCase()).toContain('<!doctype html>');
    expect(content).toContain('<meta name="viewport"');
    expect(content).toContain(
      '<title>HARSHIT.EXE | Harshit Sharma — AI & Systems Engineer</title>'
    );
    expect(content).toContain('<meta property="og:title"');
    expect(content).toContain('<meta name="twitter:card"');
    expect(content).toContain('application/ld+json');
    expect(content).not.toMatch(/USAR/i);
    expect(content).not.toMatch(/GGSIPU/i);
  });

  it('should have a standalone 404.html error handling page', () => {
    const errorPagePath = path.resolve(process.cwd(), 'public/404.html');
    expect(fs.existsSync(errorPagePath)).toBe(true);
    const content = fs.readFileSync(errorPagePath, 'utf-8');
    expect(content).toContain('matrix-canvas');
    expect(content).toContain('QUANTUM RECOVERY PROTOCOL');
    expect(content).not.toMatch(/USAR/i);
  });

  it('should have valid Nginx virtual host template', () => {
    const nginxPath = path.resolve(process.cwd(), 'portfolio.nginx.conf');
    expect(fs.existsSync(nginxPath)).toBe(true);
    const content = fs.readFileSync(nginxPath, 'utf-8');
    expect(content).toContain('gzip on;');
    expect(content).toContain('try_files $uri $uri/ /index.html;');
    expect(content).toContain('add_header Cache-Control');
  });

  it('should have valid biome.json configuration', () => {
    const biomePath = path.resolve(process.cwd(), 'biome.json');
    expect(fs.existsSync(biomePath)).toBe(true);
    const content = fs.readFileSync(biomePath, 'utf-8');
    expect(content).toContain('biomejs.dev');
    expect(content).toContain('formatter');
    expect(content).toContain('linter');
  });
});
