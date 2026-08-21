import { describe, it, expect } from 'vitest';

// Virtual Filesystem logic isolated for testing
const VIRTUAL_FS = {
  '~': {
    type: 'dir',
    children: {
      'bio.txt': {
        type: 'file',
        size: '1.8 KB',
        content: 'HARSHIT SHARMA // ARTIFICIAL INTELLIGENCE & SYSTEMS ENGINEER'
      },
      'contact.json': {
        type: 'file',
        size: '620 B',
        content: JSON.stringify({
          name: "Harshit Sharma",
          role: "AI Engineer & ML Systems Architect",
          degree: "B.Tech AI & ML (Class of 2029)",
          email: "codewithharshitsharma@gmail.com"
        })
      },
      'projects': {
        type: 'dir',
        children: {
          '01_yggdrasil.py': { type: 'file', content: 'class YggdrasilOrchestrator:' },
          '02_resilient_agent.py': { type: 'file', content: 'class AgentSandboxTestRunner:' }
        }
      },
      'secrets': {
        type: 'dir',
        children: {
          'flag.txt': { type: 'file', content: 'FLAG{HARSHIT_AI_ROOT_ACCESS_GRANTED_2026}' }
        }
      }
    }
  }
};

const resolvePath = (input, current = '~') => {
  if (input === '~' || input === '/') return '~';
  if (input.startsWith('~/')) input = input.slice(2);
  let parts = current === '~' ? [] : current.replace(/^~\/?/, '').split('/').filter(Boolean);

  input.split('/').forEach(seg => {
    if (!seg || seg === '.') return;
    if (seg === '..') {
      if (parts.length > 0) parts.pop();
    } else {
      parts.push(seg);
    }
  });

  return parts.length === 0 ? '~' : `~/${parts.join('/')}`;
};

const getNodeFromVFS = (path) => {
  if (path === '~' || path === '/') return VIRTUAL_FS['~'];
  const clean = path.replace(/^~\/?/, '');
  const segments = clean.split('/').filter(Boolean);
  let curr = VIRTUAL_FS['~'];

  for (const seg of segments) {
    if (!curr || curr.type !== 'dir' || !curr.children[seg]) {
      return null;
    }
    curr = curr.children[seg];
  }
  return curr;
};

describe('Virtual Filesystem & Path Resolution Engine', () => {
  it('should resolve root ~ path correctly', () => {
    expect(resolvePath('~')).toBe('~');
    expect(resolvePath('/')).toBe('~');
  });

  it('should resolve child directory paths correctly', () => {
    expect(resolvePath('projects', '~')).toBe('~/projects');
    expect(resolvePath('secrets', '~')).toBe('~/secrets');
  });

  it('should resolve relative parent .. paths correctly', () => {
    expect(resolvePath('..', '~/projects')).toBe('~');
    expect(resolvePath('..', '~')).toBe('~');
  });

  it('should retrieve root directory node from VFS', () => {
    const root = getNodeFromVFS('~');
    expect(root).toBeTruthy();
    expect(root.type).toBe('dir');
    expect(root.children['bio.txt']).toBeTruthy();
  });

  it('should retrieve nested file content from VFS', () => {
    const file = getNodeFromVFS('~/projects/01_yggdrasil.py');
    expect(file).toBeTruthy();
    expect(file.type).toBe('file');
    expect(file.content).toContain('class YggdrasilOrchestrator:');
  });

  it('should return null for non-existent paths in VFS', () => {
    const node = getNodeFromVFS('~/non_existent_directory/file.js');
    expect(node).toBeNull();
  });

  it('should parse contact.json successfully from VFS', () => {
    const contactNode = getNodeFromVFS('~/contact.json');
    expect(contactNode).toBeTruthy();
    const data = JSON.parse(contactNode.content);
    expect(data.name).toBe('Harshit Sharma');
    expect(data.email).toBe('codewithharshitsharma@gmail.com');
  });
});
