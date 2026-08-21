import { useState } from 'react';
import { SoundFX } from '../SoundFX';

export default function ContactModal({ onClose }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanName = (form.name || '').trim();
    const cleanEmail = (form.email || '').trim();
    const cleanMsg = (form.message || '').trim();

    if (!cleanName || !cleanEmail || !cleanMsg) return;

    SoundFX.playSuccess();
    setSubmitted(true);

    // Open real email transmission prefilled with operator's data
    const subject = encodeURIComponent(`Transmission from ${cleanName} via Harshit.exe Portfolio`);
    const body = encodeURIComponent(
      `Operator Name: ${cleanName}\nReturn Email: ${cleanEmail}\n\nTransmission Payload:\n${cleanMsg}\n\n---\nSent via Harshit.exe Neural Portfolio`
    );
    const mailtoUrl = `mailto:codewithharshitsharma@gmail.com?subject=${subject}&body=${body}`;

    try {
      window.location.href = mailtoUrl;
    } catch {
      // Fallback
    }

    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', message: '' });
    }, 6000);
  };

  const handleCopyEmail = () => {
    SoundFX.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText('codewithharshitsharma@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal-card glass-modal contact-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-category">DIRECT COMMS CHANNEL</span>
            <h2 className="modal-title">Transmit Message to Harshit</h2>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={() => {
              SoundFX.playClick();
              onClose();
            }}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="modal-body custom-scroll contact-modal-body">
          <div className="contact-grid-container">
            {/* Contact Details Column */}
            <div className="contact-details-col">
              <div className="comms-header-tag">{/* SECURE COMMS ENDPOINTS */}</div>
              <p className="comms-intro">
                Open for AI/ML engineering roles, autonomous agent research collaborations, and
                creative systems architecture.
              </p>

              <div className="comms-endpoint-list">
                <div className="comms-item">
                  <div className="comms-info">
                    <span className="comms-lbl">DIRECT EMAIL</span>
                    <div className="email-copy-row">
                      <span className="comms-email-text">codewithharshitsharma@gmail.com</span>
                      <button
                        type="button"
                        className="btn-copy-tag"
                        onClick={handleCopyEmail}
                        title="Click to copy email"
                      >
                        {copiedEmail ? 'COPIED' : 'COPY'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="comms-item">
                  <div className="comms-info">
                    <span className="comms-lbl">BASE LOCATION</span>
                    <span className="comms-val">New Delhi, India</span>
                  </div>
                </div>

                <div className="comms-item">
                  <div className="comms-info">
                    <span className="comms-lbl">LINKEDIN PROFILE</span>
                    <a
                      href="https://www.linkedin.com/in/devharshitsharma"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="comms-link"
                    >
                      linkedin.com/in/devharshitsharma ↗
                    </a>
                  </div>
                </div>

                <div className="comms-item">
                  <div className="comms-info">
                    <span className="comms-lbl">GITHUB PROFILE</span>
                    <a
                      href="https://github.com/harshitthek"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="comms-link"
                    >
                      github.com/harshitthek ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Message Form Column */}
            <div className="contact-form-col">
              <form onSubmit={handleSubmit} className="contact-form-wrapper">
                <div className="form-field-group">
                  <label htmlFor="user-name">OPERATOR NAME</label>
                  <input
                    id="user-name"
                    type="text"
                    required
                    maxLength={100}
                    autoComplete="name"
                    placeholder="e.g. Alex Mercer"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="user-email">RETURN EMAIL</label>
                  <input
                    id="user-email"
                    type="email"
                    required
                    maxLength={120}
                    autoComplete="email"
                    placeholder="alex@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="user-msg">TRANSMISSION PAYLOAD</label>
                  <textarea
                    id="user-msg"
                    rows="4"
                    required
                    maxLength={3000}
                    placeholder="Hi Harshit, I'd like to connect on an AI project..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-send-transmission">
                  <span>TRANSMIT MESSAGE DIRECTLY</span> →
                </button>

                {submitted && (
                  <div className="transmission-feedback-alert">
                    <span>
                      TRANSMISSION INITIATED TO codewithharshitsharma@gmail.com. Email client
                      opened.
                    </span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn-modal-close"
            onClick={() => {
              SoundFX.playClick();
              onClose();
            }}
          >
            DISMISS COMMS
          </button>
        </div>
      </div>
    </div>
  );
}
