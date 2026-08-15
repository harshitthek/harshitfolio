import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null, copied: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("HARSHIT.EXE // CRITICAL FAULT CAPTURED BY ERROR BOUNDARY:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleCopyDiagnostics = () => {
    const diag = `HARSHIT.EXE ERROR DIAGNOSTICS\nTimestamp: ${new Date().toISOString()}\nError: ${this.state.error?.toString()}\nStack:\n${this.state.errorInfo?.componentStack || 'N/A'}`;
    navigator.clipboard?.writeText(diag).then(() => {
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 2500);
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#05080e',
          color: '#e2e8f0',
          fontFamily: "'Space Mono', monospace, sans-serif",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '24px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            maxWidth: '640px',
            width: '100%',
            background: 'rgba(15, 23, 42, 0.9)',
            border: '1px solid #ff0055',
            boxShadow: '0 0 30px rgba(255, 0, 85, 0.2)',
            padding: '32px',
            borderRadius: '4px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255, 0, 85, 0.3)',
              paddingBottom: '12px',
              marginBottom: '20px',
              color: '#ff0055',
              fontSize: '0.8rem',
              letterSpacing: '2px',
              fontWeight: 700
            }}>
              <span>SYS_FAULT // RECOVERY_PROTOCOL</span>
              <span>ERR_CRITICAL</span>
            </div>

            <h1 style={{
              fontSize: '1.8rem',
              color: '#ffffff',
              marginBottom: '12px',
              letterSpacing: '2px'
            }}>
              CORE ENGINE EXCEPTION
            </h1>

            <p style={{
              fontSize: '0.85rem',
              color: '#94a3b8',
              lineHeight: 1.6,
              marginBottom: '20px'
            }}>
              An unexpected neural anomaly interrupted runtime telemetry. Emergency failsafe circuits isolated the affected module to protect system integrity.
            </p>

            <div style={{
              background: 'rgba(0, 0, 0, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '14px',
              fontFamily: "'Fira Code', monospace",
              fontSize: '0.75rem',
              color: '#ff0055',
              marginBottom: '24px',
              overflowX: 'auto',
              maxHeight: '160px'
            }}>
              <div>&gt; FAULT: {this.state.error?.toString() || 'Unknown runtime fault'}</div>
              {this.state.errorInfo?.componentStack && (
                <div style={{ color: '#64748b', marginTop: '8px', whiteSpace: 'pre-wrap' }}>
                  {this.state.errorInfo.componentStack.slice(0, 300)}...
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <button
                onClick={this.handleReload}
                style={{
                  padding: '12px 24px',
                  background: 'rgba(0, 255, 136, 0.15)',
                  border: '1px solid #00ff88',
                  color: '#00ff88',
                  fontFamily: "'Fira Code', monospace",
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  cursor: 'pointer'
                }}
              >
                REBOOT CORE ENGINE
              </button>

              <button
                onClick={this.handleCopyDiagnostics}
                style={{
                  padding: '12px 20px',
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: this.state.copied ? '#00ff88' : '#94a3b8',
                  fontFamily: "'Fira Code', monospace",
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                {this.state.copied ? '✓ COPIED TO CLIPBOARD' : 'COPY DIAGNOSTICS'}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
