import React, { useState } from 'react';
import { snippetsData } from '../../data/snippetsData';
import { SoundFX } from '../SoundFX';

export default function CodeInspectorModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('yggdrasil');
  const [copied, setCopied] = useState(false);

  const snippet = snippetsData[activeTab] || snippetsData.webhook;

  const handleCopy = () => {
    SoundFX.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card glass-modal code-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-category">PRODUCTION SOURCE CODE INSPECTOR</span>
            <h2 className="modal-title">{snippet.filename}</h2>
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
        <div className="code-tabs-bar">
          <button
            className={`code-tab-btn ${activeTab === 'yggdrasil' ? 'active' : ''}`}
            onClick={() => { SoundFX.playClick(); setActiveTab('yggdrasil'); }}
          >
            <span>🌲</span> yggdrasil_tree_agent.py
          </button>
          <button
            className={`code-tab-btn ${activeTab === 'webhook' ? 'active' : ''}`}
            onClick={() => { SoundFX.playClick(); setActiveTab('webhook'); }}
          >
            <span>🛡️</span> webhook_receiver.py
          </button>
          <button
            className={`code-tab-btn ${activeTab === 'ml' ? 'active' : ''}`}
            onClick={() => { SoundFX.playClick(); setActiveTab('ml'); }}
          >
            <span>📊</span> used_bike_model.py
          </button>
          <button
            className={`code-tab-btn ${activeTab === 'schema' ? 'active' : ''}`}
            onClick={() => { SoundFX.playClick(); setActiveTab('schema'); }}
          >
            <span>🐘</span> schema.sql
          </button>
        </div>

        <div className="code-desc-strip">
          <span>// {snippet.description}</span>
          <button
            className={`btn-copy-code ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
            title="Copy code snippet to clipboard"
          >
            <span>{copied ? 'COPIED TO CLIPBOARD! ✅' : 'COPY CODE 📋'}</span>
          </button>
        </div>

        <div className="modal-body code-body custom-scroll">
          <pre className="code-syntax-display">
            <code>{snippet.code}</code>
          </pre>
        </div>

        <div className="modal-footer">
          <a
            href="https://github.com/harshitthek"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-modal-launch"
            onClick={() => SoundFX.playClick()}
          >
            <span>EXPLORE HARSHIT'S GITHUB REPOSITORIES</span> ↗
          </a>
        </div>
      </div>
    </div>
  );
}
