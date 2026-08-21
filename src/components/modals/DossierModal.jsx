import { useState } from 'react';
import { dossierData } from '../../data/dossierData';
import { skillsCategories, skillsData } from '../../data/skillsData';
import { SoundFX } from '../SoundFX';

export default function DossierModal({ onClose, _onOpenContact }) {
  const [activeTab, setActiveTab] = useState('summary');
  const [activeSkillCategory, setActiveSkillCategory] = useState('all');
  const [copied, setCopied] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const { personal, stats, experience, education, competencies, certifications } = dossierData;

  const filteredSkills =
    activeSkillCategory === 'all'
      ? skillsData
      : skillsData.filter((s) => s.category === activeSkillCategory);

  const handleCopyIntel = () => {
    SoundFX.playClick();
    const intelText = `
HARSHIT SHARMA — AI & Machine Learning Engineer
Institution: ${personal.institution}
Degree: ${personal.degree} (${personal.duration})
Email: ${personal.email}
GitHub: ${personal.github}
LinkedIn: ${personal.linkedin}

Summary: ${personal.summary}
    `.trim();

    if (navigator.clipboard) {
      navigator.clipboard.writeText(intelText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const handlePrintResume = () => {
    SoundFX.playDeploy();
    setIsPrinting(true);

    try {
      const printWindow = window.open('', '_blank', 'width=920,height=1100');
      if (!printWindow) {
        window.print();
        setIsPrinting(false);
        return;
      }

      const printHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Harshit_Sharma_Resume.pdf</title>
          <style>
            @page {
              margin: 12mm 15mm;
              size: A4 portrait;
            }
            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              color: #0f172a;
              background: #ffffff;
              line-height: 1.42;
              font-size: 9.5pt;
              padding: 15px 25px;
            }
            .header {
              border-bottom: 2px solid #0f172a;
              padding-bottom: 8px;
              margin-bottom: 12px;
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
            }
            .name {
              font-size: 22pt;
              font-weight: 800;
              color: #0f172a;
              letter-spacing: -0.5px;
              line-height: 1.1;
            }
            .role {
              font-size: 10.5pt;
              font-weight: 600;
              color: #059669;
              margin-top: 2px;
            }
            .contact {
              font-size: 9pt;
              color: #334155;
              text-align: right;
              line-height: 1.45;
            }
            .contact a {
              color: #0284c7;
              text-decoration: none;
            }
            .section {
              margin-bottom: 12px;
              page-break-inside: avoid;
            }
            .sec-title {
              font-size: 10pt;
              font-weight: 700;
              color: #0f172a;
              border-bottom: 1.5px solid #cbd5e1;
              padding-bottom: 2px;
              margin-bottom: 6px;
              letter-spacing: 0.8px;
              text-transform: uppercase;
            }
            .summary {
              font-size: 9pt;
              color: #334155;
              line-height: 1.45;
              text-align: justify;
            }
            .row-between {
              display: flex;
              justify-content: space-between;
              align-items: baseline;
              font-size: 9.5pt;
            }
            .item-role {
              font-weight: 700;
              color: #0f172a;
            }
            .item-period {
              font-size: 8.5pt;
              font-weight: 600;
              color: #475569;
            }
            .item-sub {
              font-size: 9pt;
              font-weight: 600;
              color: #059669;
              margin-bottom: 2px;
            }
            .item-desc {
              font-size: 8.5pt;
              color: #334155;
              margin-bottom: 3px;
            }
            ul.bullets {
              padding-left: 16px;
              font-size: 8.5pt;
              color: #334155;
              margin: 0;
            }
            ul.bullets li {
              margin-bottom: 2px;
              line-height: 1.35;
            }
            .skills-table {
              width: 100%;
              border-collapse: collapse;
              font-size: 8.5pt;
            }
            .skills-table td {
              padding: 2px 0;
              vertical-align: top;
            }
            .skills-table td.label {
              font-weight: 700;
              color: #0f172a;
              width: 26%;
            }
            .skills-table td.val {
              color: #334155;
            }
            .certs-list {
              font-size: 8.5pt;
              color: #334155;
              line-height: 1.45;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1 class="name">${personal.name}</h1>
              <p class="role">${personal.role}</p>
            </div>
            <div class="contact">
              <div>📧 ${personal.email}</div>
              <div>🐙 <a href="${personal.github}">${personal.github}</a></div>
              <div>💼 <a href="${personal.linkedin}">${personal.linkedin}</a></div>
              <div>📍 ${personal.location}</div>
            </div>
          </div>

          <div class="section">
            <div class="sec-title">Executive Summary</div>
            <p class="summary">${personal.summary}</p>
          </div>

          <div class="section">
            <div class="sec-title">Education</div>
            ${education
              .map(
                (edu) => `
              <div style="margin-bottom: 6px;">
                <div class="row-between">
                  <span class="item-role">${edu.degree} — ${edu.major}</span>
                  <span class="item-period">${edu.period}</span>
                </div>
                <div class="item-sub">${edu.institution}, ${edu.university} (${edu.status})</div>
                <div style="font-size: 8pt; color: #475569; margin-top: 2px;">
                  <strong>Core Coursework:</strong> ${edu.coursework.join(', ')}
                </div>
              </div>
            `
              )
              .join('')}
          </div>

          <div class="section">
            <div class="sec-title">Technical Arsenal</div>
            <table class="skills-table">
              ${competencies
                .map(
                  (c) => `
                <tr>
                  <td class="label">${c.area}:</td>
                  <td class="val">${c.skills.join(', ')}</td>
                </tr>
              `
                )
                .join('')}
            </table>
          </div>

          <div class="section">
            <div class="sec-title">Engineering Experience & Deployed Systems</div>
            ${experience
              .map(
                (exp) => `
              <div style="margin-bottom: 8px;">
                <div class="row-between">
                  <span class="item-role">${exp.role}</span>
                  <span class="item-period">${exp.period}</span>
                </div>
                <div class="item-sub">${exp.organization} · ${exp.badge}</div>
                <p class="item-desc">${exp.description}</p>
                <ul class="bullets">
                  ${exp.highlights.map((h) => `<li>${h}</li>`).join('')}
                </ul>
              </div>
            `
              )
              .join('')}
          </div>

          <div class="section">
            <div class="sec-title">Certifications & Research Milestones</div>
            <div class="certs-list">
              ${certifications
                .map(
                  (cert) => `
                <div>• <strong>${cert.title}</strong> — ${cert.issuer} (${cert.year}) [${cert.tag}]</div>
              `
                )
                .join('')}
            </div>
          </div>

          <script>
            window.onload = function() {
              window.focus();
              setTimeout(function() {
                window.print();
              }, 150);
            };
          </script>
        </body>
        </html>
      `;

      printWindow.document.open();
      printWindow.document.write(printHtml);
      printWindow.document.close();
    } catch (err) {
      console.warn('Fallback printing:', err);
      window.print();
    } finally {
      setIsPrinting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal-card glass-modal dossier-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <span className="corner tl"></span>
        <span className="corner tr"></span>
        <span className="corner bl"></span>
        <span className="corner br"></span>

        {/* Modal Top Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-category">CLASSIFIED PERSONNEL DOSSIER {/* TOP SECRET */}</span>
            <h2 className="modal-title">{personal.name}</h2>
          </div>

          <div className="dossier-header-actions">
            <button
              type="button"
              className="dossier-action-btn print-btn"
              onClick={handlePrintResume}
              title="Print or Save as PDF Resume"
            >
              <svg
                className="action-svg-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              <span>{isPrinting ? 'GENERATING...' : 'SAVE PDF / PRINT'}</span>
            </button>

            <button
              type="button"
              className={`dossier-action-btn copy-btn ${copied ? 'success' : ''}`}
              onClick={handleCopyIntel}
              title="Copy Summary Intel to Clipboard"
            >
              <svg
                className="action-svg-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>{copied ? 'COPIED!' : 'COPY INTEL'}</span>
            </button>

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
        </div>

        {/* Dossier Navigation Tab Strip */}
        <div className="dossier-tabs-strip">
          <button
            type="button"
            className={`dossier-tab ${activeTab === 'summary' ? 'active' : ''}`}
            onClick={() => {
              SoundFX.playKey();
              setActiveTab('summary');
            }}
          >
            <span className="tab-num">01</span>
            <span>EXECUTIVE SUMMARY</span>
          </button>
          <button
            type="button"
            className={`dossier-tab ${activeTab === 'experience' ? 'active' : ''}`}
            onClick={() => {
              SoundFX.playKey();
              setActiveTab('experience');
            }}
          >
            <span className="tab-num">02</span>
            <span>EXPERIENCE & OPS</span>
          </button>
          <button
            type="button"
            className={`dossier-tab ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => {
              SoundFX.playKey();
              setActiveTab('skills');
            }}
          >
            <span className="tab-num">03</span>
            <span>TECHNICAL MATRIX</span>
          </button>
          <button
            type="button"
            className={`dossier-tab ${activeTab === 'education' ? 'active' : ''}`}
            onClick={() => {
              SoundFX.playKey();
              setActiveTab('education');
            }}
          >
            <span className="tab-num">04</span>
            <span>EDUCATION & CERTS</span>
          </button>
        </div>

        {/* Printable & Scrollable Modal Body */}
        <div className="modal-body custom-scroll dossier-body-scrollable">
          {/* TAB 1: EXECUTIVE SUMMARY */}
          {activeTab === 'summary' && (
            <div className="dossier-tab-pane tab-summary animate-fade-in">
              {/* Bio & Identification Hero Card */}
              <div className="dossier-bio-card">
                <div className="dossier-avatar-box">
                  <div className="dossier-avatar-fallback">HS</div>
                  <span className="clearance-badge">{personal.clearance}</span>
                </div>

                <div className="dossier-bio-info">
                  <div className="dossier-name-row">
                    <h3>{personal.name}</h3>
                    <span className="dossier-callsign">{personal.callsign}</span>
                  </div>
                  <p className="dossier-role">{personal.role}</p>

                  <div className="dossier-meta-grid">
                    <div className="meta-item">
                      <span className="meta-lbl">INSTITUTION</span>
                      <span className="meta-val">{personal.institution}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-lbl">DEGREE / BATCH</span>
                      <span className="meta-val">
                        {personal.degree} ({personal.duration})
                      </span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-lbl">PRIMARY COMMS</span>
                      <a href={`mailto:${personal.email}`} className="meta-val link">
                        {personal.email}
                      </a>
                    </div>
                    <div className="meta-item">
                      <span className="meta-lbl">GITHUB / CODE REPO</span>
                      <a
                        href={personal.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="meta-val link"
                      >
                        {personal.githubHandle} ↗
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio Description Narrative */}
              <div className="dossier-narrative-box">
                <div className="narrative-label">{/* MISSION STATEMENT & SPECIALIZATION */}</div>
                <p className="narrative-text">{personal.summary}</p>
              </div>

              {/* Telemetry Stats Strip */}
              <div className="dossier-stats-strip">
                {stats.map((st, i) => (
                  <div key={i} className={`d-stat-box ${st.highlight ? 'highlight' : ''}`}>
                    <span className="d-stat-val">{st.value}</span>
                    <span className="d-stat-lbl">{st.label}</span>
                  </div>
                ))}
              </div>

              {/* Quick Competency Snapshot */}
              <div className="dossier-competencies-grid">
                {competencies.map((comp, idx) => (
                  <div key={idx} className="competency-card">
                    <h5 className="comp-area-title">{comp.area}</h5>
                    <div className="comp-tags-wrap">
                      {comp.skills.map((sk, sIdx) => (
                        <span key={sIdx} className="comp-tag-pill">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: EXPERIENCE & OPS */}
          {activeTab === 'experience' && (
            <div className="dossier-tab-pane tab-experience animate-fade-in">
              <div className="section-label">
                {/* ENGINEERING CHRONOLOGY & DEPLOYED OPERATIONS */}
              </div>

              <div className="dossier-timeline">
                {experience.map((exp, idx) => (
                  <div key={idx} className="timeline-node">
                    <div className="timeline-marker">
                      <span className="node-dot"></span>
                      <span className="node-line"></span>
                    </div>

                    <div className="timeline-content-card">
                      <div className="timeline-header-row">
                        <div>
                          <h4 className="timeline-role">{exp.role}</h4>
                          <span className="timeline-org">{exp.organization}</span>
                        </div>
                        <div className="timeline-badges">
                          <span className="timeline-period-badge">{exp.period}</span>
                          <span className="timeline-status-badge">{exp.badge}</span>
                        </div>
                      </div>

                      <p className="timeline-desc">{exp.description}</p>

                      <ul className="timeline-highlights-list">
                        {exp.highlights.map((item, hIdx) => (
                          <li key={hIdx}>
                            <span className="list-bullet">›</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TECHNICAL MATRIX */}
          {activeTab === 'skills' && (
            <div className="dossier-tab-pane tab-skills animate-fade-in">
              <div className="section-label">{/* TECHNICAL ARSENAL & PROFICIENCIES */}</div>

              <div className="skills-filter-chips">
                {skillsCategories.map((cat) => (
                  <button
                    type="button"
                    key={cat.id}
                    className={`skill-filter-chip ${activeSkillCategory === cat.id ? 'active' : ''}`}
                    onClick={() => {
                      SoundFX.playClick();
                      setActiveSkillCategory(cat.id);
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="skills-card-grid">
                {filteredSkills.map((skill) => (
                  <div key={`skill-${skill.name}`} className="skill-item-card">
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
          )}

          {/* TAB 4: EDUCATION & CERTIFICATIONS */}
          {activeTab === 'education' && (
            <div className="dossier-tab-pane tab-education animate-fade-in">
              <div className="section-label">{/* ACADEMIC BACKGROUND & CURRICULUM */}</div>

              {education.map((edu) => (
                <div key={`edu-${edu.degree}-${edu.period}`} className="education-card">
                  <div className="edu-header-row">
                    <div>
                      <h4 className="edu-degree">{edu.degree}</h4>
                      <div className="edu-major">{edu.major}</div>
                      <div className="edu-inst">
                        {edu.institution} — {edu.university}
                      </div>
                    </div>
                    <div className="edu-period-tag">{edu.period}</div>
                  </div>

                  <div className="edu-coursework-box">
                    <span className="coursework-label">CORE COURSEWORK & RESEARCH FOCUS:</span>
                    <div className="coursework-chips">
                      {edu.coursework.map((course, cIdx) => (
                        <span key={`course-${cIdx}-${course}`} className="coursework-chip">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <div className="section-label" style={{ marginTop: '24px' }}>
                {/* CREDENTIALS & CERTIFICATIONS */}
              </div>

              <div className="certifications-grid">
                {certifications.map((cert) => (
                  <div key={`cert-${cert.tag}-${cert.title}`} className="cert-card">
                    <div className="cert-top-row">
                      <span className="cert-tag">{cert.tag}</span>
                      <span className="cert-year">{cert.year}</span>
                    </div>
                    <h5 className="cert-title">{cert.title}</h5>
                    <span className="cert-issuer">{cert.issuer}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Strip */}
        <div className="modal-footer dossier-footer-wrap">
          <div className="footer-left-status">
            <span className="status-indicator-dot"></span>
            <span>CLEARANCE VERIFIED {/* READY FOR EMPLOYMENT & COLLABORATION */}</span>
          </div>

          <div className="footer-btns-group">
            <button type="button" className="btn-modal-action print" onClick={handlePrintResume}>
              📄 SAVE PDF
            </button>

            <button
              type="button"
              className="btn-modal-close"
              onClick={() => {
                SoundFX.playClick();
                onClose();
              }}
            >
              DISMISS DOSSIER
            </button>
          </div>
        </div>
      </div>

      {/* DEDICATED RECRUITER-READY PRINTABLE RESUME (Visible only during print/PDF export) */}
      <div className="dossier-printable-resume">
        <header className="print-header">
          <div className="print-name-title">
            <h1 className="print-name">{personal.name}</h1>
            <p className="print-role">{personal.role}</p>
          </div>
          <div className="print-contact-info">
            <div>📧 {personal.email}</div>
            <div>🐙 {personal.github}</div>
            <div>💼 {personal.linkedin}</div>
            <div>📍 {personal.location}</div>
          </div>
        </header>

        <section className="print-section">
          <h2 className="print-sec-title">PROFESSIONAL SUMMARY</h2>
          <p className="print-text">{personal.summary}</p>
        </section>

        <section className="print-section">
          <h2 className="print-sec-title">EDUCATION</h2>
          {education.map((edu, idx) => (
            <div key={idx} className="print-edu-item">
              <div className="print-row-between">
                <strong>
                  {edu.degree} — {edu.major}
                </strong>
                <span>{edu.period}</span>
              </div>
              <div className="print-inst">
                {edu.institution}, {edu.university}
              </div>
              <div className="print-coursework">
                <em>Core Coursework:</em> {edu.coursework.join(', ')}
              </div>
            </div>
          ))}
        </section>

        <section className="print-section">
          <h2 className="print-sec-title">TECHNICAL PROFICIENCIES</h2>
          <div className="print-skills-grid">
            {competencies.map((c, i) => (
              <div key={i} className="print-skill-group">
                <strong>{c.area}:</strong> {c.skills.join(', ')}
              </div>
            ))}
          </div>
        </section>

        <section className="print-section">
          <h2 className="print-sec-title">ENGINEERING EXPERIENCE & NOTABLE PROJECTS</h2>
          {experience.map((exp, idx) => (
            <div key={idx} className="print-exp-item">
              <div className="print-row-between">
                <strong>{exp.role}</strong>
                <span>{exp.period}</span>
              </div>
              <div className="print-exp-org">{exp.organization}</div>
              <p className="print-exp-desc">{exp.description}</p>
              <ul className="print-bullet-list">
                {exp.highlights.map((h, hIdx) => (
                  <li key={hIdx}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="print-section">
          <h2 className="print-sec-title">CERTIFICATIONS & CREDENTIALS</h2>
          <div className="print-cert-list">
            {certifications.map((cert, idx) => (
              <div key={idx} className="print-cert-item">
                • <strong>{cert.title}</strong> — {cert.issuer} ({cert.year})
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
