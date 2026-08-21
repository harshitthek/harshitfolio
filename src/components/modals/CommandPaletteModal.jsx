import React, { useEffect, useMemo, useRef, useState } from 'react';
import { projectsData } from '../../data/projectsData';
import { SoundFX } from '../SoundFX';
import { useVoice } from '../VoiceContext';

export default function CommandPaletteModal({
  isOpen,
  onClose,
  onJumpToScreen,
  onOpenModal,
  onLaunchProject,
  onTriggerQuantumBlast,
  currentScreen
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const { voiceEnabled, toggleVoice } = useVoice();
  const [sfxOn, setSfxOn] = useState(SoundFX.isEnabled());

  useEffect(() => {
    return SoundFX.subscribe((val) => {
      setSfxOn(val);
    });
  }, []);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      SoundFX.playChirp();
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 50);
    }
  }, [isOpen]);

  // Master command registry
  const allCommands = useMemo(() => {
    const list = [
      // 1. Navigation Commands
      {
        id: 'nav-cards',
        category: 'NAVIGATION',
        icon: '🌌',
        title: 'Multiverse Engineering Portals',
        subtitle: 'Browse all 13 interactive projects and systems',
        shortcut: 'Screen 4',
        action: () => onJumpToScreen('s-cards')
      },
      {
        id: 'nav-mission',
        category: 'NAVIGATION',
        icon: '🛡️',
        title: 'Classified Mission Control',
        subtitle: 'Quantum hologram, Pixar lamp, and system overview',
        shortcut: 'Screen 3',
        action: () => onJumpToScreen('s-mission')
      },
      {
        id: 'nav-video',
        category: 'NAVIGATION',
        icon: '🎬',
        title: 'Replay Cinematic Intro Hologram',
        subtitle: 'Experience the 3D cinematic opening sequence',
        shortcut: 'Screen 1',
        action: () => onJumpToScreen('s-video')
      },

      // 2. Interactive Modals
      {
        id: 'modal-terminal',
        category: 'PORTALS & MODALS',
        icon: '💻',
        title: 'Launch Interactive Terminal & Retro Arcade',
        subtitle: 'Live command-line sandbox and 60FPS Arcade Snake game',
        shortcut: 'T',
        action: () => onOpenModal('terminal')
      },
      {
        id: 'modal-ml-sim',
        category: 'PORTALS & MODALS',
        icon: '🧠',
        title: 'Neural ML Valuation Simulator',
        subtitle: 'Run live machine learning inference in the browser',
        shortcut: 'M',
        action: () => onOpenModal('ml-sim')
      },
      {
        id: 'modal-code-inspect',
        category: 'PORTALS & MODALS',
        icon: '🔍',
        title: 'Interactive Python Code Inspector',
        subtitle: 'Inspect AST, algorithms, and core engineering code',
        shortcut: 'C',
        action: () => onOpenModal('code-inspect')
      },
      {
        id: 'modal-architecture',
        category: 'PORTALS & MODALS',
        icon: '📐',
        title: 'System Architecture & Blueprints',
        subtitle: 'Explore full-stack microservices & agentic pipeline diagrams',
        shortcut: 'A',
        action: () => onOpenModal('architecture')
      },
      {
        id: 'modal-dossier',
        category: 'PORTALS & MODALS',
        icon: '📋',
        title: 'Executive Dossier & Full Resume',
        subtitle: 'Review engineering background, degree, and tech stack',
        shortcut: 'D',
        action: () => onOpenModal('dossier')
      },
      {
        id: 'modal-github',
        category: 'PORTALS & MODALS',
        icon: '🐙',
        title: 'Live GitHub Telemetry & Activity Stream',
        subtitle: 'Real-time repository fleet, language distribution, and commit stream',
        shortcut: 'G',
        action: () => onOpenModal('github')
      },
      {
        id: 'modal-contact',
        category: 'PORTALS & MODALS',
        icon: '📡',
        title: 'Direct Neural Comms // Contact',
        subtitle: 'Transmit message or collaborate with Harshit',
        shortcut: 'COMMS',
        action: () => onOpenModal('contact')
      },

      // 3. Audio & SFX Controls
      {
        id: 'audio-voice',
        category: 'AUDIO & SYSTEM',
        icon: voiceEnabled ? '🔊' : '🔇',
        title: voiceEnabled ? 'Mute AI Voice Transceiver' : 'Enable AI Voice Transceiver',
        subtitle: voiceEnabled
          ? 'AI speech synthesis is currently active'
          : 'AI speech synthesis is currently muted',
        shortcut: 'VOICE',
        action: () => {
          toggleVoice();
        }
      },
      {
        id: 'audio-sfx',
        category: 'AUDIO & SYSTEM',
        icon: sfxOn ? '🔔' : '🔕',
        title: sfxOn ? 'Mute Retro Cyber SFX' : 'Enable Retro Cyber SFX',
        subtitle: sfxOn ? 'Synthesizer UI sound effects are active' : 'Sound effects are muted',
        shortcut: 'SFX',
        action: () => {
          SoundFX.toggle();
        }
      },

      // 4. External Links
      {
        id: 'ext-github',
        category: 'EXTERNAL PROFILES',
        icon: '🐙',
        title: 'Open GitHub Profile',
        subtitle: 'Explore 50+ repositories @ harshitthek',
        shortcut: 'github.com/harshitthek',
        action: () => window.open('https://github.com/harshitthek', '_blank')
      },
      {
        id: 'ext-linkedin',
        category: 'EXTERNAL PROFILES',
        icon: '💼',
        title: 'Open LinkedIn Profile',
        subtitle: 'Connect with Harshit Sharma',
        shortcut: 'linkedin.com/in/harshit-sharma',
        action: () => window.open('https://linkedin.com/in/harshit-sharma-513a9624b', '_blank')
      },

      // 5. Easter Eggs & Special Effects
      {
        id: 'sys-quantum',
        category: 'SPECIAL EFFECTS',
        icon: '💥',
        title: 'Trigger Quantum Hologram Supernova',
        subtitle: 'Detonate a high-energy 3D particle blast wave',
        shortcut: 'EXPLODE',
        action: () => {
          if (onTriggerQuantumBlast) onTriggerQuantumBlast();
          if (currentScreen !== 's-mission') onJumpToScreen('s-mission');
        }
      }
    ];

    // Add Projects to searchable list
    projectsData.forEach((p, idx) => {
      list.push({
        id: `proj-${p.id || idx}`,
        category: 'PROJECTS VAULT',
        icon: '⚡',
        title: p.title,
        subtitle: `${p.tagline || p.desc} [${p.tech ? p.tech.slice(0, 3).join(', ') : 'AI/ML'}]`,
        shortcut: `P#${idx + 1}`,
        action: () => {
          if (onLaunchProject) {
            onLaunchProject(p.title, p.demoUrl || p.url);
          } else if (p.demoUrl || p.url) {
            window.open(p.demoUrl || p.url, '_blank');
          }
        }
      });
    });

    return list;
  }, [
    voiceEnabled,
    sfxOn,
    currentScreen,
    onJumpToScreen,
    onOpenModal,
    onLaunchProject,
    onTriggerQuantumBlast,
    toggleVoice
  ]);

  // Filter commands by search query
  const filteredCommands = useMemo(() => {
    if (!query.trim()) return allCommands;
    const q = query.toLowerCase().trim();
    return allCommands.filter(
      (cmd) =>
        cmd.title.toLowerCase().includes(q) ||
        cmd.subtitle.toLowerCase().includes(q) ||
        cmd.category.toLowerCase().includes(q) ||
        cmd.shortcut.toLowerCase().includes(q)
    );
  }, [allCommands, query]);

  // Keep selected index within bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, []);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector('.cmd-item.selected');
      if (activeEl && typeof activeEl.scrollIntoView === 'function') {
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, []);

  // Handle keyboard navigation inside command palette
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      SoundFX.playKey();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      SoundFX.playKey();
      setSelectedIndex(
        (prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length)
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = filteredCommands[selectedIndex];
      if (target) {
        SoundFX.playClick();
        onClose();
        target.action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      SoundFX.playClick();
      onClose();
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    SoundFX.playKey();
  };

  const handleItemClick = (cmd) => {
    SoundFX.playClick();
    onClose();
    cmd.action();
  };

  if (!isOpen) return null;

  return (
    <div className="cmd-palette-backdrop" onClick={onClose} role="presentation">
      <div
        className="cmd-palette-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <span className="corner tl"></span>
        <span className="corner tr"></span>
        <span className="corner bl"></span>
        <span className="corner br"></span>

        {/* Top Header & Search Input Bar */}
        <div className="cmd-search-header">
          <div className="cmd-search-icon">
            <span className="cmd-search-dot"></span>
            <span className="cmd-icon-symbol">⌘</span>
          </div>

          <input
            ref={inputRef}
            type="text"
            className="cmd-search-input"
            placeholder="Type a command or search multiverse portals, projects, audio..."
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck="false"
          />

          <div className="cmd-header-badges">
            <span
              className="cmd-esc-badge"
              role="button"
              tabIndex={0}
              onClick={onClose}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onClose();
              }}
              title="Close palette"
            >
              ESC
            </span>
          </div>
        </div>

        {/* Results Counter & Telemetry Strip */}
        <div className="cmd-telemetry-strip">
          <span className="telemetry-label">SYSTEM_INDEX {/* COMMAND_MATRIX */}</span>
          <span className="telemetry-count">
            {filteredCommands.length} {filteredCommands.length === 1 ? 'COMMAND' : 'COMMANDS'}{' '}
            AVAILABLE
          </span>
        </div>

        {/* Command Items List */}
        <div ref={listRef} className="cmd-results-list">
          {filteredCommands.length === 0 ? (
            <div className="cmd-empty-state">
              <span className="empty-glyph">∅</span>
              <p className="empty-title">NO MATCHING COMMANDS FOUND</p>
              <p className="empty-sub">
                Try searching for "terminal", "resume", "projects", or "audio"
              </p>
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              const showCategoryHeader =
                idx === 0 || filteredCommands[idx - 1].category !== cmd.category;

              return (
                <React.Fragment key={cmd.id}>
                  {showCategoryHeader && (
                    <div className="cmd-category-divider">
                      <span className="cat-line"></span>
                      <span className="cat-text">
                        {/*  */}
                        {cmd.category}
                      </span>
                    </div>
                  )}

                  <div
                    role="button"
                    tabIndex={0}
                    className={`cmd-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleItemClick(cmd)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') handleItemClick(cmd);
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                  >
                    <div className="cmd-item-left">
                      <span className="cmd-item-icon">{cmd.icon}</span>
                      <div className="cmd-item-info">
                        <div className="cmd-item-title-row">
                          <span className="cmd-item-title">{cmd.title}</span>
                        </div>
                        <span className="cmd-item-sub">{cmd.subtitle}</span>
                      </div>
                    </div>

                    <div className="cmd-item-right">
                      {cmd.shortcut && <span className="cmd-shortcut-tag">{cmd.shortcut}</span>}
                      <span className="cmd-enter-arrow">↵</span>
                    </div>
                  </div>
                </React.Fragment>
              );
            })
          )}
        </div>

        {/* Futuristic Bottom Controls Hint Footer */}
        <div className="cmd-palette-footer">
          <div className="footer-hint-group">
            <span className="hint-pill">
              <kbd>↑</kbd> <kbd>↓</kbd> NAVIGATE
            </span>
            <span className="hint-pill">
              <kbd>ENTER</kbd> EXECUTE
            </span>
            <span className="hint-pill">
              <kbd>ESC</kbd> CLOSE
            </span>
          </div>
          <span className="footer-status">HARSHIT.EXE {/* CMD_V2.0 */}</span>
        </div>
      </div>
    </div>
  );
}
