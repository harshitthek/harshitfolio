/**
 * ⚡ CyberModalSkeleton: Futuristic Cyberpunk Shimmer Skeleton Loader
 * Displayed while asynchronous React.lazy modal chunks are streaming.
 */
export default function CyberModalSkeleton({ onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal-card glass-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        style={{
          maxWidth: '860px',
          width: '94%',
          minHeight: '460px',
          border: '1px solid rgba(0, 255, 136, 0.3)',
          boxShadow: '0 0 35px rgba(0, 255, 136, 0.15)'
        }}
      >
        <span className="corner tl"></span>
        <span className="corner tr"></span>
        <span className="corner bl"></span>
        <span className="corner br"></span>

        {/* Skeleton Header */}
        <div className="modal-header" style={{ paddingBottom: '16px' }}>
          <div className="modal-title-group" style={{ width: '60%' }}>
            <div
              className="cyber-skeleton"
              style={{ width: '140px', height: '14px', marginBottom: '8px' }}
            ></div>
            <div className="cyber-skeleton" style={{ width: '260px', height: '24px' }}></div>
          </div>
          <div
            className="cyber-skeleton cyan"
            style={{ width: '80px', height: '32px', borderRadius: '4px' }}
          ></div>
        </div>

        {/* Skeleton Tab Strip */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            padding: '12px 24px',
            borderBottom: '1px solid rgba(255,255,255,0.06)'
          }}
        >
          <div className="cyber-skeleton" style={{ width: '130px', height: '34px' }}></div>
          <div className="cyber-skeleton" style={{ width: '150px', height: '34px' }}></div>
          <div className="cyber-skeleton" style={{ width: '140px', height: '34px' }}></div>
        </div>

        {/* Skeleton Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Top Hero Skeleton Row */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div
              className="cyber-skeleton cyan"
              style={{ width: '74px', height: '74px', borderRadius: '50%', flexShrink: 0 }}
            ></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
              <div className="cyber-skeleton" style={{ width: '40%', height: '20px' }}></div>
              <div className="cyber-skeleton" style={{ width: '85%', height: '14px' }}></div>
              <div className="cyber-skeleton" style={{ width: '65%', height: '14px' }}></div>
            </div>
          </div>

          {/* 3 Metric Card Placeholders */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '14px'
            }}
          >
            <div className="cyber-skeleton" style={{ height: '78px' }}></div>
            <div className="cyber-skeleton cyan" style={{ height: '78px' }}></div>
            <div className="cyber-skeleton" style={{ height: '78px' }}></div>
          </div>

          {/* Code Box Placeholder */}
          <div className="cyber-skeleton" style={{ height: '110px', width: '100%' }}></div>

          {/* Decryption Status Tag */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              marginTop: '8px'
            }}
          >
            <span
              style={{
                color: '#00ff88',
                fontSize: '0.75rem',
                fontFamily: "'Fira Code', monospace",
                letterSpacing: '1.5px',
                animation: 'pulse 1s infinite alternate'
              }}
            >
              ⚡ [ DECRYPTING NEURAL COMPONENT CHUNK... ]
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
