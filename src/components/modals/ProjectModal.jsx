import React from 'react';
import { SoundFX } from '../SoundFX';

export default function ProjectModal({ card, onClose, onLaunch }) {
  if (!card) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card glass-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-category">{card.categoryLabel || 'CLASSIFIED DOSSIER'}</span>
            <h2 className="modal-title">{card.title}</h2>
          </div>
          <button
            className="modal-close-btn"
            onClick={() => { SoundFX.playClick(); onClose(); }}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="modal-body custom-scroll">
          <p className="modal-long-desc">{card.longDesc || card.desc}</p>

          {card.stats && (
            <div className="modal-stats-strip">
              <div className="modal-stat-box">
                <span className="m-stat-val">{card.stats.stat1}</span>
                <span className="m-stat-lbl">{card.stats.stat1Lbl}</span>
              </div>
              <div className="modal-stat-box">
                <span className="m-stat-val">{card.stats.stat2}</span>
                <span className="m-stat-lbl">{card.stats.stat2Lbl}</span>
              </div>
              <div className="modal-stat-box">
                <span className="m-stat-val">{card.stats.stat3}</span>
                <span className="m-stat-lbl">{card.stats.stat3Lbl}</span>
              </div>
            </div>
          )}

          {card.highlights && card.highlights.length > 0 && (
            <div className="modal-section">
              <div className="section-label">KEY ARCHITECTURAL HIGHLIGHTS</div>
              <ul className="modal-highlights-list">
                {card.highlights.map((item, idx) => (
                  <li key={idx}>
                    <span className="bullet-glow">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="modal-section">
            <div className="section-label">ENGINEERING TECH STACK</div>
            <div className="modal-tags-grid">
              {card.tags.map((t, idx) => (
                <span key={idx} className="modal-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="btn-modal-close"
            onClick={() => { SoundFX.playClick(); onClose(); }}
          >
            CLOSE DOSSIER
          </button>

          <button
            className="btn-modal-launch"
            onClick={() => {
              SoundFX.playClick();
              onClose();
              onLaunch(card.title, card.url);
            }}
          >
            <span>DEPLOY & LAUNCH UNIVERSE</span> →
          </button>
        </div>
      </div>
    </div>
  );
}
