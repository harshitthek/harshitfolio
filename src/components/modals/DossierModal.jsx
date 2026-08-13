import React, { useState } from 'react';
import { skillsData, skillsCategories } from '../../data/skillsData';
import { SoundFX } from '../SoundFX';

export default function DossierModal({ onClose }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredSkills = activeCategory === 'all'
    ? skillsData
    : skillsData.filter(s => s.category === activeCategory);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card glass-modal dossier-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-category">CLASSIFIED PERSONNEL DOSSIER</span>
            <h2 className="modal-title">Agent Harshit Sharma</h2>
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
          {/* Personal Bio Card */}
          <div className="dossier-bio-card">
            <div className="dossier-avatar-box">
              <div className="dossier-avatar-fallback">HS</div>
              <span className="clearance-badge">LEVEL 5 VERIFIED</span>
            </div>
            <div className="dossier-bio-info">
              <h3>Harshit Sharma</h3>
              <p className="dossier-role">AI & Systems Engineer · Machine Learning Architect</p>
              <div className="dossier-meta-grid">
                <div className="meta-item">
                  <span className="meta-lbl">INSTITUTION</span>
                  <span className="meta-val">USAR (GGSIPU), New Delhi</span>
                </div>
                <div className="meta-item">
                  <span className="meta-lbl">DEGREE</span>
                  <span className="meta-val">B.Tech in Artificial Intelligence & ML</span>
                </div>
                <div className="meta-item">
                  <span className="meta-lbl">LOCATION</span>
                  <span className="meta-val">New Delhi, India</span>
                </div>
                <div className="meta-item">
                  <span className="meta-lbl">GITHUB</span>
                  <a href="https://github.com/harshitthek" target="_blank" rel="noopener noreferrer" className="meta-val link">
                    github.com/harshitthek ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Telemetry Metrics */}
          <div className="dossier-stats-strip">
            <div className="d-stat-box">
              <span className="d-stat-val">600+</span>
              <span className="d-stat-lbl">AI TRAINING RUNS</span>
            </div>
            <div className="d-stat-box">
              <span className="d-stat-val">98.4%</span>
              <span className="d-stat-lbl">RANDOMFOREST R²</span>
            </div>
            <div className="d-stat-box">
              <span className="d-stat-val">840+</span>
              <span className="d-stat-lbl">COMMITS RECORDED</span>
            </div>
            <div className="d-stat-box">
              <span className="d-stat-val">100%</span>
              <span className="d-stat-lbl">OPEN SOURCE</span>
            </div>
          </div>

          {/* Categorized Skills Matrix */}
          <div className="dossier-section">
            <div className="section-label">TECHNICAL ARSENAL & PROFICIENCIES</div>

            <div className="skills-filter-chips">
              {skillsCategories.map(cat => (
                <button
                  key={cat.id}
                  className={`skill-filter-chip ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => {
                    SoundFX.playClick();
                    setActiveCategory(cat.id);
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="skills-card-grid">
              {filteredSkills.map((skill, idx) => (
                <div key={idx} className="skill-item-card">
                  <div className="skill-card-top">
                    <span className="skill-icon-emoji">{skill.icon}</span>
                    <span className="skill-level-tag">{skill.level}</span>
                  </div>
                  <h4 className="skill-name-title">{skill.name}</h4>
                  <p className="skill-desc-text">{skill.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="btn-modal-close"
            onClick={() => { SoundFX.playClick(); onClose(); }}
          >
            DISMISS DOSSIER
          </button>
        </div>
      </div>
    </div>
  );
}
