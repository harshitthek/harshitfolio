import React from 'react';

export default function IntermediateScreen({ isActive }) {
  return (
    <div id="s-intermediate" className={`screen ${isActive ? 'active' : ''}`}>
      <div className="load-grid"></div>
      <div className="load-vignette"></div>

      <div className="corner-dec tl"></div>
      <div className="corner-dec tr"></div>
      <div className="corner-dec bl"></div>
      <div className="corner-dec br"></div>

      <div className="load-content">
        <div className="load-glyph" data-text="LOADING">LOADING</div>
        <div className="load-ring" style={{ marginTop: '2rem' }}></div>
        <div className="load-label">ACCESSING CLASSIFIED DATABASE</div>
        <div className="load-sublabel">// AUTHENTICATING AGENT: HARSHIT SHARMA [USAR-DELHI]</div>
      </div>
    </div>
  );
}
