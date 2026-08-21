import React, { useState, useEffect } from 'react';
import { projectsData } from '../data/projectsData';
import { SoundFX } from './SoundFX';

function PortCard({ card, onLaunch, onQuickIntel }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleLaunchPrimary = (e) => {
    e.stopPropagation();
    SoundFX.playClick();
    onLaunch(card.title, card.demoUrl || card.url);
  };

  return (
    <div
      className="port-card"
      onClick={handleLaunchPrimary}
      onMouseEnter={() => SoundFX.playHover()}
    >
      <div className={`card-img ${imgLoaded || imgError ? 'img-loaded' : ''}`}>
        {!imgError ? (
          <picture>
            <source srcSet={card.img.replace(/\.jpg$/, '.webp')} type="image/webp" />
            <img
              src={card.img}
              alt={card.title}
              loading="lazy"
              decoding="async"
              width="800"
              height="448"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
            />
          </picture>
        ) : (
          <div className="card-img-fallback">
            <span className="fallback-glyph">{card.blueprintIcon || '⚡'}</span>
            <span className="fallback-badge">{card.badge}</span>
            <span className="fallback-sub">NEURAL BLUEPRINT ACQUIRED</span>
          </div>
        )}
        <div className="card-img-overlay"></div>
        <div className="card-badge">{card.badge}</div>
        <div className="card-scan"></div>
        <div className="card-category-tag">{card.categoryLabel}</div>
      </div>

      <div className="card-body">
        <div className="card-num-row">
          <span className="card-num">{card.num}</span>
          <span className="card-status-pill">{card.statusTag || 'OPERATIONAL'}</span>
        </div>

        <h3 className="card-title">{card.title}</h3>
        <p className="card-desc">{card.desc}</p>

        <div className="card-tags">
          {card.tags.map((tag, i) => (
            <span key={i} className="tag">{tag}</span>
          ))}
        </div>

        {/* Dual Actions: Primary Launch + GitHub Repo + Deep-Dive Intel */}
        <div className="card-actions-row">
          <button
            type="button"
            className="btn-quick-intel"
            onClick={(e) => {
              e.stopPropagation();
              SoundFX.playClick();
              onQuickIntel(card);
            }}
            title="Inspect project blueprint & architecture"
          >
            <span>👁️ INTEL</span>
          </button>

          {card.githubUrl && (
            <a
              href={card.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-card-gh"
              onClick={(e) => {
                e.stopPropagation();
                SoundFX.playClick();
              }}
              title="Open GitHub source repository"
            >
              <span>🐙 GIT</span>
            </a>
          )}

          <button
            type="button"
            className="btn-launch-deploy"
            onClick={handleLaunchPrimary}
            title={`Deploy & Launch ${card.title}`}
          >
            <span className="arrow">→</span> {card.hasLiveDemo ? 'LIVE DEMO' : 'DEPLOY'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CardsScreen({ isActive, onLaunch, onOpenModal, onQuickIntel }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Automatically reset scroll position to top whenever this screen activates
  useEffect(() => {
    if (isActive) {
      const el = document.getElementById('s-cards');
      if (el) {
        el.scrollTop = 0;
      }
      window.scrollTo(0, 0);
    }
  }, [isActive]);

  const categories = [
    { id: 'all', label: `ALL PORTALS [${projectsData.length}]` },
    { id: 'ai-agents', label: `🤖 AI & AGENTS [${projectsData.filter(c => c.category === 'ai-agents').length}]` },
    { id: 'ml-models', label: `📊 ML & DEEP LEARNING [${projectsData.filter(c => c.category === 'ml-models').length}]` },
    { id: 'systems', label: `⚙️ SYSTEMS & SECURITY [${projectsData.filter(c => c.category === 'systems').length}]` },
    { id: 'web-3d', label: `🌌 3D & GRAPHICS [${projectsData.filter(c => c.category === 'web-3d').length}]` }
  ];

  const filteredCards = projectsData.filter(card => {
    const matchesCategory = selectedCategory === 'all' || card.category === selectedCategory;
    const matchesSearch =
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="s-cards" className={`screen ${isActive ? 'active' : ''}`}>
      {/* Top Banner Navigation with Quick Search & Telemetry */}
      <div className="cards-top-bar">
        <div className="top-bar-left">
          <a
            href="https://github.com/harshitthek"
            target="_blank"
            rel="noopener noreferrer"
            className="top-action-btn github"
            onMouseEnter={() => SoundFX.playHover()}
            onClick={() => SoundFX.playClick()}
          >
            <span className="icon">🐙</span> GITHUB PROFILE ↗
          </a>
          <button
            className="top-action-btn simulator"
            onClick={() => { SoundFX.playClick(); onOpenModal('ml-sim'); }}
            onMouseEnter={() => SoundFX.playHover()}
          >
            <span className="icon">🏍️</span> LIVE ML SIMULATOR
          </button>
          <button
            className="top-action-btn terminal"
            onClick={() => { SoundFX.playClick(); onOpenModal('terminal'); }}
            onMouseEnter={() => SoundFX.playHover()}
          >
            <span className="icon">💻</span> HARSHIT SHELL
          </button>
        </div>

        <div className="top-bar-right">
          <div className="search-filter-box top-search">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search portals by name, tag, stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="telemetry-chip">
            <span className="telemetry-dot"></span>
            <span>{filteredCards.length}/{projectsData.length} PORTALS ONLINE</span>
          </div>
        </div>
      </div>

      {/* Main Cards Header */}
      <div className="cards-header">
        <div className="header-badge-tag">// MULTIVERSE DESTINATION SELECTOR</div>
        <h2>SELECT YOUR DESTINATION</h2>
        <p>// AI neural pipelines ready. Pick a flagship universe to deploy or inspect intel</p>

        {/* Category Filter Chips */}
        <div className="cards-filter-wrapper">
          <div className="category-chips">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`category-chip ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => {
                  SoundFX.playClick();
                  setSelectedCategory(cat.id);
                }}
                onMouseEnter={() => SoundFX.playHover()}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="cards-hotkey-hint">
          <span>HOTKEYS:</span>
          <span><kbd>1</kbd>–<kbd>9</kbd>, <kbd>0</kbd> Launch</span>
          <span>·</span>
          <span><kbd>T</kbd> Terminal</span>
          <span>·</span>
          <span><kbd>M</kbd> ML Sim</span>
          <span>·</span>
          <span><kbd>C</kbd> Code</span>
          <span>·</span>
          <span><kbd>D</kbd> Dossier</span>
          <span>·</span>
          <span><kbd>G</kbd> Git Intel</span>
          <span>·</span>
          <span><kbd>⌘K</kbd> Palette</span>
        </div>
      </div>

      {/* Portals Cards Grid */}
      <div className="cards-grid">
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <PortCard
              key={card.id}
              card={card}
              onLaunch={onLaunch}
              onQuickIntel={onQuickIntel}
            />
          ))
        ) : (
          <div className="no-portals-found">
            <span className="empty-icon">⚠️</span>
            <h3>NO MATCHING PORTALS DISCOVERED</h3>
            <p>No project portals match "{searchQuery}". Clear your search query to restore all universes.</p>
            <button
              className="btn-reset-filters"
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            >
              RESET FILTERS
            </button>
          </div>
        )}
      </div>

      {/* Footer System Dossier Strip */}
      <div className="cards-footer-strip">
        <div className="footer-strip-content">
          <span>HARSHIT SHARMA · B.TECH AI & ML · USAR (GGSIPU) NEW DELHI</span>
          <span className="strip-divider">·</span>
          <span>EMAIL: <a href="mailto:codewithharshitsharma@gmail.com" className="email-link">codewithharshitsharma@gmail.com</a></span>
          <span className="strip-divider">·</span>
          <span>DISCORD: harshit0</span>
        </div>
      </div>
    </div>
  );
}
