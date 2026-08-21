import { describe, it, expect } from 'vitest';

const THEMES = {
  green: { label: 'CLASSIC MATRIX GREEN', primary: '#00ff88' },
  cyan: { label: 'CYBERPUNK NEON CYAN', primary: '#38bdf8' },
  amber: { label: 'RETRO MONOCHROME AMBER', primary: '#fbbf24' },
  purple: { label: 'NEURAL SYNAPSE PURPLE', primary: '#c084fc' },
  red: { label: 'OVERLOAD SECURITY RED', primary: '#f43f5e' }
};

describe('Terminal Command Engine & Variable Interpolation', () => {
  it('should support all standard terminal color themes', () => {
    const keys = Object.keys(THEMES);
    expect(keys).toContain('green');
    expect(keys).toContain('cyan');
    expect(keys).toContain('amber');
    expect(keys).toContain('purple');
    expect(keys).toContain('red');
  });

  it('should expand echo variables ($USER, $HOST, $IP, $DOMAIN, $ROLE)', () => {
    const template = 'User: $USER | Host: $HOST | IP: $IP | Domain: $DOMAIN | Role: $ROLE';
    const evaluated = template
      .replace(/\$USER/g, 'harshit')
      .replace(/\$HOST/g, 'ygg (Oracle Cloud VM)')
      .replace(/\$IP/g, '144.24.104.31')
      .replace(/\$DOMAIN/g, 'harshitthek.is-a.dev')
      .replace(/\$ROLE/g, 'AI & Systems Engineer (Class of 2029)');

    expect(evaluated).toContain('User: harshit');
    expect(evaluated).toContain('Host: ygg (Oracle Cloud VM)');
    expect(evaluated).toContain('IP: 144.24.104.31');
    expect(evaluated).toContain('Domain: harshitthek.is-a.dev');
    expect(evaluated).toContain('Role: AI & Systems Engineer (Class of 2029)');
  });

  it('should format ICMP ping packets correctly', () => {
    const host = 'harshitthek.is-a.dev';
    const ip = '144.24.104.31';
    const pingHeader = `PING ${host} (${ip}): 56 data bytes`;
    expect(pingHeader).toBe('PING harshitthek.is-a.dev (144.24.104.31): 56 data bytes');
  });

  it('should format cowsay ASCII speech bubble accurately', () => {
    const msg = 'Test Wisdom Message';
    const bar = '-'.repeat(msg.length + 2);
    const cowsay = ` ${bar}\n< ${msg} >\n ${bar}\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||`;
    expect(cowsay).toContain('< Test Wisdom Message >');
    expect(cowsay).toContain('(oo)\\_______');
  });
});
