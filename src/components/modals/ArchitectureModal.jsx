import React, { useState } from 'react';
import { architectureData } from '../../data/architectureData';
import { SoundFX } from '../SoundFX';

export default function ArchitectureModal({ onClose }) {
  const [activeArch, setActiveArch] = useState('yggdrasil');

  const current = architectureData[activeArch] || architectureData.yggdrasil;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card glass-modal arch-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-category">SYSTEM DESIGN & ARCHITECTURAL FLOW</span>
            <h2 className="modal-title">{current.title}</h2>
          </div>
          <button
            className="modal-close-btn"
            onClick={() => { SoundFX.playClick(); onClose(); }}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="arch-tabs-bar">
          <button
            className={`arch-tab-btn ${activeArch === 'yggdrasil' ? 'active' : ''}`}
            onClick={() => { SoundFX.playClick(); setActiveArch('yggdrasil'); }}
          >
            <span>🌲</span> Yggdrasil Bot
          </button>
          <button
            className={`arch-tab-btn ${activeArch === 'resilient' ? 'active' : ''}`}
            onClick={() => { SoundFX.playClick(); setActiveArch('resilient'); }}
          >
            <span>🤖</span> Resilient Pipeline
          </button>
          <button
            className={`arch-tab-btn ${activeArch === 'bike' ? 'active' : ''}`}
            onClick={() => { SoundFX.playClick(); setActiveArch('bike'); }}
          >
            <span>🚲</span> ML Regressor
          </button>
          <button
            className={`arch-tab-btn ${activeArch === 'carbon' ? 'active' : ''}`}
            onClick={() => { SoundFX.playClick(); setActiveArch('carbon'); }}
          >
            <span>🌿</span> Carbon Guardian
          </button>
        </div>

        <div className="modal-body custom-scroll">
          <div className="arch-sub-heading">// {current.subtitle}</div>

          <div className="arch-steps-grid">
            {current.steps.map((step, idx) => (
              <div key={idx} className="arch-step-card">
                <div className="arch-step-header">
                  <span className="arch-step-num">STAGE {step.step}</span>
                  <span className="arch-step-dot"></span>
                </div>
                <h4 className="arch-step-title">{step.title}</h4>
                <p className="arch-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="btn-modal-close"
            onClick={() => { SoundFX.playClick(); onClose(); }}
          >
            DISMISS ARCHITECTURE
          </button>
        </div>
      </div>
    </div>
  );
}
