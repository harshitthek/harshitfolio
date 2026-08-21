import{r as N,j as e}from"./vendor-react-CvfwqxSD.js";let j=null;const R="harshit_portfolio_sfx_enabled";let p=!0;if(typeof window<"u")try{const s=localStorage.getItem(R);s!==null&&(p=s==="true")}catch{}const w=new Set;function k(){if(typeof window<"u")try{localStorage.setItem(R,String(p))}catch{}w.forEach(s=>{try{s(p)}catch{}})}function u(){if(typeof window>"u")return null;try{if(!j){const s=window.AudioContext||window.webkitAudioContext;s&&(j=new s)}j&&j.state==="suspended"&&j.resume()}catch(s){console.warn("[SoundFX] AudioContext initialization notice:",s)}return j}if(typeof window<"u"){const s=()=>{const a=u();a&&a.state==="suspended"&&a.resume()};window.addEventListener("click",s,{passive:!0}),window.addEventListener("touchstart",s,{passive:!0}),window.addEventListener("keydown",s,{passive:!0}),window.addEventListener("pointerdown",s,{passive:!0})}const v={isEnabled:()=>p,toggle:()=>(p=!p,k(),p),setEnabled:s=>{p=!!s,k()},subscribe:s=>(w.add(s),()=>w.delete(s)),playVoiceOn:()=>{if(p)try{const s=u();if(!s)return;s.state==="suspended"&&s.resume();const a=s.currentTime;[580,880,1160].forEach((n,t)=>{const r=s.createOscillator(),l=s.createGain();r.type="sine",r.frequency.setValueAtTime(n,a+t*.05),l.gain.setValueAtTime(.08,a+t*.05),l.gain.exponentialRampToValueAtTime(1e-4,a+t*.05+.12),r.connect(l),l.connect(s.destination),r.start(a+t*.05),r.stop(a+t*.05+.12)})}catch{}},playVoiceOff:()=>{if(p)try{const s=u();if(!s)return;s.state==="suspended"&&s.resume();const a=s.currentTime;[880,580,320].forEach((n,t)=>{const r=s.createOscillator(),l=s.createGain();r.type="triangle",r.frequency.setValueAtTime(n,a+t*.05),l.gain.setValueAtTime(.07,a+t*.05),l.gain.exponentialRampToValueAtTime(1e-4,a+t*.05+.14),r.connect(l),l.connect(s.destination),r.start(a+t*.05),r.stop(a+t*.05+.14)})}catch{}},playHover:(s="normal")=>{if(p)try{const a=u();if(a?.state!=="running")return;const n=a.currentTime,t=a.createOscillator(),r=a.createGain();let l=520,m=880,d=.055,g=.06;s==="primary"?(l=640,m=1120,d=.08,g=.08,t.type="triangle"):(s==="high"&&(l=780,m=1250,d=.045,g=.05),t.type="sine"),t.frequency.setValueAtTime(l,n),t.frequency.linearRampToValueAtTime(m,n+d),r.gain.setValueAtTime(g,n),r.gain.linearRampToValueAtTime(1e-4,n+d),t.connect(r),r.connect(a.destination),t.start(n),t.stop(n+d)}catch{}},playClick:()=>{if(p)try{const s=u();if(!s)return;s.state==="suspended"&&s.resume();const a=s.currentTime,n=s.createOscillator(),t=s.createGain();n.type="triangle",n.frequency.setValueAtTime(750,a),n.frequency.linearRampToValueAtTime(320,a+.09),t.gain.setValueAtTime(.12,a),t.gain.linearRampToValueAtTime(1e-4,a+.09),n.connect(t),t.connect(s.destination),n.start(a),n.stop(a+.09)}catch{}},playExplosion:()=>{if(p)try{const s=u();if(!s)return;s.state==="suspended"&&s.resume();const a=s.currentTime,n=s.createOscillator(),t=s.createGain();n.type="sine",n.frequency.setValueAtTime(160,a),n.frequency.exponentialRampToValueAtTime(24,a+.85),t.gain.setValueAtTime(.35,a),t.gain.exponentialRampToValueAtTime(1e-4,a+.9),n.connect(t),t.connect(s.destination),n.start(a),n.stop(a+.9);const r=s.sampleRate*.7,l=s.createBuffer(1,r,s.sampleRate),m=l.getChannelData(0);for(let y=0;y<r;y++)m[y]=Math.random()*2-1;const d=s.createBufferSource();d.buffer=l;const g=s.createBiquadFilter();g.type="lowpass",g.frequency.setValueAtTime(1200,a),g.frequency.exponentialRampToValueAtTime(80,a+.7);const x=s.createGain();x.gain.setValueAtTime(.28,a),x.gain.exponentialRampToValueAtTime(1e-4,a+.75),d.connect(g),g.connect(x),x.connect(s.destination),d.start(a),d.stop(a+.75);const c=s.createOscillator(),f=s.createGain();c.type="sawtooth",c.frequency.setValueAtTime(480,a),c.frequency.exponentialRampToValueAtTime(60,a+.4),f.gain.setValueAtTime(.15,a),f.gain.exponentialRampToValueAtTime(1e-4,a+.45),c.connect(f),f.connect(s.destination),c.start(a),c.stop(a+.45)}catch{}},playLaser:()=>{if(p)try{const s=u();if(!s)return;s.state==="suspended"&&s.resume();const a=s.currentTime,n=s.createOscillator(),t=s.createGain();n.type="sawtooth",n.frequency.setValueAtTime(1400,a),n.frequency.exponentialRampToValueAtTime(80,a+.18),t.gain.setValueAtTime(.14,a),t.gain.linearRampToValueAtTime(1e-4,a+.18),n.connect(t),t.connect(s.destination),n.start(a),n.stop(a+.18)}catch{}},playChirp:()=>{if(p)try{const s=u();if(!s)return;s.state==="suspended"&&s.resume();const a=s.currentTime;[500,900,1400,2e3].forEach((t,r)=>{const l=s.createOscillator(),m=s.createGain(),d=a+r*.035;l.type="triangle",l.frequency.setValueAtTime(t,d),m.gain.setValueAtTime(.08,d),m.gain.linearRampToValueAtTime(1e-4,d+.045),l.connect(m),m.connect(s.destination),l.start(d),l.stop(d+.045)})}catch{}},playTone:(s=440,a="sine",n=.2)=>{if(p)try{const t=u();if(!t)return;t.state==="suspended"&&t.resume();const r=t.currentTime,l=t.createOscillator(),m=t.createGain();l.type=a,l.frequency.setValueAtTime(s,r),m.gain.setValueAtTime(.12,r),m.gain.linearRampToValueAtTime(1e-4,r+n),l.connect(m),m.connect(t.destination),l.start(r),l.stop(r+n)}catch{}},playWarp:()=>{if(p)try{const s=u();if(!s)return;s.state==="suspended"&&s.resume();const a=s.currentTime,n=s.createOscillator(),t=s.createGain();n.type="sine",n.frequency.setValueAtTime(90,a),n.frequency.exponentialRampToValueAtTime(35,a+.35),t.gain.setValueAtTime(.18,a),t.gain.linearRampToValueAtTime(1e-4,a+.35),n.connect(t),t.connect(s.destination),n.start(a),n.stop(a+.35);const r=s.createOscillator(),l=s.createGain();r.type="sawtooth",r.frequency.setValueAtTime(240,a),r.frequency.exponentialRampToValueAtTime(1480,a+.32),l.gain.setValueAtTime(.1,a),l.gain.linearRampToValueAtTime(1e-4,a+.35),r.connect(l),l.connect(s.destination),r.start(a),r.stop(a+.35)}catch{}},playDeploy:()=>{if(p)try{const s=u();if(!s)return;s.state==="suspended"&&s.resume();const a=s.currentTime,n=s.createOscillator(),t=s.createGain();n.type="sawtooth",n.frequency.setValueAtTime(160,a),n.frequency.exponentialRampToValueAtTime(980,a+.45),t.gain.setValueAtTime(.09,a),t.gain.linearRampToValueAtTime(1e-4,a+.5),n.connect(t),t.connect(s.destination),n.start(a),n.stop(a+.5)}catch{}},playKey:()=>{if(p)try{const s=u();if(s?.state!=="running")return;const a=s.currentTime,n=s.createOscillator(),t=s.createGain();n.type="sine",n.frequency.setValueAtTime(950+Math.random()*250,a),t.gain.setValueAtTime(.04,a),t.gain.linearRampToValueAtTime(1e-4,a+.035),n.connect(t),t.connect(s.destination),n.start(a),n.stop(a+.035)}catch{}},playSuccess:()=>{if(p)try{const s=u();if(!s)return;s.state==="suspended"&&s.resume();const a=s.currentTime;[523.25,659.25,783.99,1046.5].forEach((t,r)=>{const l=s.createOscillator(),m=s.createGain(),d=a+r*.09;l.type="triangle",l.frequency.setValueAtTime(t,d),m.gain.setValueAtTime(.1,d),m.gain.linearRampToValueAtTime(1e-4,d+.28),l.connect(m),m.connect(s.destination),l.start(d),l.stop(d+.28)})}catch{}}},V={personal:{name:"Harshit Sharma",callsign:"AGENT_HARSHIT // HARSHIT.EXE",role:"AI & Machine Learning Engineer · Full-Stack Systems Architect",institution:"B.Tech in Artificial Intelligence & Machine Learning",degree:"B.Tech in Artificial Intelligence & Machine Learning",duration:"2025 – 2029",location:"New Delhi, India",email:"codewithharshitsharma@gmail.com",github:"https://github.com/harshitthek",githubHandle:"@harshitthek",linkedin:"https://www.linkedin.com/in/devharshitsharma",clearance:"LEVEL 5 TOP SECRET // VERIFIED",summary:"AI & Machine Learning engineer specialized in agentic LLM pipelines, gradient boosted predictive modeling, and high-performance real-time web/mobile systems. Passionate about building resilient autonomous systems, low-latency microservices, and client-side GPU-accelerated interfaces."},stats:[{value:"600+",label:"AI MODEL TRAINING RUNS",highlight:!0},{value:"97.4%",label:"RANDOMFOREST/CATBOOST R²",highlight:!0},{value:"13+",label:"PRODUCTION FULL-STACK APPS",highlight:!1},{value:"850+",label:"OPEN-SOURCE COMMITS",highlight:!1}],experience:[{period:"2024 – PRESENT",role:"Lead AI Systems Developer & Open-Source Architect",organization:"Independent Research & Development",badge:"ACTIVE OPS",description:"Architecting autonomous AI agent benchmark platforms, localized LLM pipelines, and high-throughput microservices.",highlights:["Built Resilient AI: Automated benchmark suite evaluating LLM hallucinations, prompt drift, and adversarial perturbations.","Engineered Yggdrasil Bot: Multi-agent Discord bot with RS256 cryptographic verification and async dispatch queues.","Developed Used Bike ML Valuation: Deployed CatBoost/RandomForest ensemble achieving 97.4% R² with sub-15ms FastAPI latency."]},{period:"2023 – 2024",role:"Full-Stack & Systems Engineering Specialist",organization:"Neural Systems & Web Engineering",badge:"RESEARCH & DEV",description:"Engineered scalable web applications, Canvas 2D/3D graphics engines, and native Chrome Manifest V3 extensions.",highlights:["Created ShieldBlock MV3: Privacy protection extension with Declarative Net Request rules and 0ms latency impact.","Constructed Cosmic WebGL & Canvas 2D matrix projection engines rendering 3D polyhedra without external 3D libraries.","Collaborated on student-led AI ideathons and algorithmic benchmark optimization."]}],education:[{degree:"Bachelor of Technology (B.Tech)",major:"Artificial Intelligence & Machine Learning (AI & ML)",institution:"Bachelor of Technology in AI & Machine Learning",university:"Class of 2029 · New Delhi, India",period:"2025 – 2029",status:"Undergraduate (Class of 2029)",coursework:["Deep Learning & Neural Networks","Machine Learning Algorithms & Ensembles","Data Structures & Algorithmic Analysis","Operating Systems & Linux Architecture","Database Management Systems (PostgreSQL, SQL)","Probability, Linear Algebra & Multivariable Calculus"]}],competencies:[{area:"Core AI & Machine Learning",skills:["PyTorch","CatBoost","XGBoost","Scikit-Learn","Hugging Face","Transformers","On-Device LLMs","OpenCV","NumPy & Pandas"]},{area:"Backend & Systems Architecture",skills:["FastAPI","Python 3.12","Node.js","Docker","PostgreSQL","Async SQLite","Linux/Bash","RESTful APIs","WebSocket"]},{area:"Frontend & Creative Engineering",skills:["React 18/19","Vite","Canvas 2D / 3D Matrix Math","JavaScript (ES6+)","TypeScript","Tailwind CSS","Web Audio API","Web Speech API"]},{area:"Mobile & Extension Platforms",skills:["Kotlin","Android Jetpack Compose","Clean Architecture","Chrome Manifest V3","Declarative Net Request","Git & GitHub Actions"]}],certifications:[{title:"Machine Learning & Deep Learning Specialization",issuer:"AI Research & Applied Engineering",year:"2024",tag:"SPECIALIZATION"},{title:"Full-Stack Microservices & Asynchronous Systems",issuer:"Advanced Web Systems Engineering",year:"2024",tag:"ARCHITECTURE"},{title:"Algorithmic Problem Solving & Data Structures",issuer:"Competitive Engineering Guild",year:"2023",tag:"ALGORITHMS"}]},C=[{name:"Python 3.12",category:"languages",level:"Expert",icon:"🐍",desc:"Primary language for AI pipelines, ML models, FastAPI, and backend services."},{name:"JavaScript (ES6+)",category:"languages",level:"Advanced",icon:"⚡",desc:"Modern async JS, Chrome Manifest V3 extensions, Web APIs, and DOM physics."},{name:"TypeScript",category:"languages",level:"Proficient",icon:"📘",desc:"Type-safe frontend and backend application development."},{name:"Kotlin",category:"languages",level:"Advanced",icon:"📱",desc:"Modern Android app development with Jetpack Compose & Clean Architecture."},{name:"C / C++",category:"languages",level:"Proficient",icon:"⚙️",desc:"Low-level systems programming, data structures, and algorithmic optimization."},{name:"Bash / Linux Shell",category:"languages",level:"Advanced",icon:"💻",desc:"Shell scripting, server automation, SSH management, and CI/CD jobs."},{name:"SQL (PostgreSQL / SQLite)",category:"languages",level:"Advanced",icon:"🐘",desc:"Relational schema design, complex joins, indexing, and transactional integrity."},{name:"CatBoost & XGBoost",category:"ai-backend",level:"Expert",icon:"🏎️",desc:"Gradient boosted trees, native categorical embeddings, and stacking ensembles (97.4% R²)."},{name:"FastAPI",category:"ai-backend",level:"Expert",icon:"🚀",desc:"High-performance async REST APIs with Pydantic validation & OpenAPI docs."},{name:"PyTorch / Transformers",category:"ai-backend",level:"Advanced",icon:"🧠",desc:"Fine-tuning BERT, self-attention neural architectures, and model evaluations."},{name:"Scikit-Learn",category:"ai-backend",level:"Expert",icon:"📊",desc:"RandomForest, TF-IDF vectorizers, 5-fold cross-validation, and custom transformers."},{name:"On-Device LLMs / Llama.cpp",category:"ai-backend",level:"Advanced",icon:"🦙",desc:"Local ARM64 on-device LLM inference (RunAnywhere SDK) & Groq Llama 3.3 70B."},{name:"Pandas & NumPy",category:"ai-backend",level:"Expert",icon:"🐼",desc:"High-dimensional data wrangling, preprocessing, and statistical residual analysis."},{name:"Node.js & Fastify",category:"ai-backend",level:"Advanced",icon:"🟢",desc:"Event-driven server-side JavaScript applications and REST backends."},{name:"React 19 / 18",category:"frontend",level:"Advanced",icon:"⚛️",desc:"Component architecture, custom hooks, context state, and SPA routers."},{name:"Jetpack Compose",category:"frontend",level:"Advanced",icon:"📱",desc:"Modern Android declarative UI, Material Design 3, and state management."},{name:"Three.js / Canvas 2D",category:"frontend",level:"Advanced",icon:"📐",desc:"GPU particle physics, custom 3D matrix projection engines, and raycasting."},{name:"Tailwind CSS & CSS3",category:"frontend",level:"Expert",icon:"🎨",desc:"Glassmorphism, cyber HUD design systems, animations, and responsive layouts."},{name:"Vite",category:"frontend",level:"Advanced",icon:"⚡",desc:"Ultra-fast HMR bundler and modern frontend build toolchain."},{name:"Docker & Containers",category:"devops",level:"Advanced",icon:"🐳",desc:"Containerization, multi-stage builds, and isolated sandbox execution."},{name:"Git & GitHub Actions",category:"devops",level:"Expert",icon:"🐙",desc:"Version control, CI/CD automated test pipelines, and GitHub App RS256 bots."},{name:"PostgreSQL & Async SQLite",category:"devops",level:"Advanced",icon:"🐘",desc:"Database administration, async engines, and cryptographic hash persistence."},{name:"Manifest V3 Chrome API",category:"devops",level:"Advanced",icon:"🛡️",desc:"Native DNR blocking, service workers, content script DOM injection, and stealth extensions."},{name:"Linux / Ubuntu / antiX",category:"devops",level:"Advanced",icon:"🐧",desc:"Production server configuration, systemd services, and low-overhead environments."}],D=[{id:"all",label:"All Technologies"},{id:"languages",label:"Languages"},{id:"ai-backend",label:"AI & Backend"},{id:"frontend",label:"Frontend & Mobile"},{id:"devops",label:"DevOps & Systems"}];function O({onClose:s,_onOpenContact:a}){const[n,t]=N.useState("summary"),[r,l]=N.useState("all"),[m,d]=N.useState(!1),[g,x]=N.useState(!1),{personal:c,stats:f,experience:y,education:A,competencies:T,certifications:S}=V,I=r==="all"?C:C.filter(i=>i.category===r),L=()=>{v.playClick();const i=`
HARSHIT SHARMA — AI & Machine Learning Engineer
Institution: ${c.institution}
Degree: ${c.degree} (${c.duration})
Email: ${c.email}
GitHub: ${c.github}
LinkedIn: ${c.linkedin}

Summary: ${c.summary}
    `.trim();navigator.clipboard&&navigator.clipboard.writeText(i).then(()=>{d(!0),setTimeout(()=>d(!1),2500)})},E=()=>{v.playDeploy(),x(!0);try{const i=window.open("","_blank","width=920,height=1100");if(!i){window.print(),x(!1);return}const h=`
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
              <h1 class="name">${c.name}</h1>
              <p class="role">${c.role}</p>
            </div>
            <div class="contact">
              <div>📧 ${c.email}</div>
              <div>🐙 <a href="${c.github}">${c.github}</a></div>
              <div>💼 <a href="${c.linkedin}">${c.linkedin}</a></div>
              <div>📍 ${c.location}</div>
            </div>
          </div>

          <div class="section">
            <div class="sec-title">Executive Summary</div>
            <p class="summary">${c.summary}</p>
          </div>

          <div class="section">
            <div class="sec-title">Education</div>
            ${A.map(o=>`
              <div style="margin-bottom: 6px;">
                <div class="row-between">
                  <span class="item-role">${o.degree} — ${o.major}</span>
                  <span class="item-period">${o.period}</span>
                </div>
                <div class="item-sub">${o.institution}, ${o.university} (${o.status})</div>
                <div style="font-size: 8pt; color: #475569; margin-top: 2px;">
                  <strong>Core Coursework:</strong> ${o.coursework.join(", ")}
                </div>
              </div>
            `).join("")}
          </div>

          <div class="section">
            <div class="sec-title">Technical Arsenal</div>
            <table class="skills-table">
              ${T.map(o=>`
                <tr>
                  <td class="label">${o.area}:</td>
                  <td class="val">${o.skills.join(", ")}</td>
                </tr>
              `).join("")}
            </table>
          </div>

          <div class="section">
            <div class="sec-title">Engineering Experience & Deployed Systems</div>
            ${y.map(o=>`
              <div style="margin-bottom: 8px;">
                <div class="row-between">
                  <span class="item-role">${o.role}</span>
                  <span class="item-period">${o.period}</span>
                </div>
                <div class="item-sub">${o.organization} · ${o.badge}</div>
                <p class="item-desc">${o.description}</p>
                <ul class="bullets">
                  ${o.highlights.map(b=>`<li>${b}</li>`).join("")}
                </ul>
              </div>
            `).join("")}
          </div>

          <div class="section">
            <div class="sec-title">Certifications & Research Milestones</div>
            <div class="certs-list">
              ${S.map(o=>`
                <div>• <strong>${o.title}</strong> — ${o.issuer} (${o.year}) [${o.tag}]</div>
              `).join("")}
            </div>
          </div>

          <script>
            window.onload = function() {
              window.focus();
              setTimeout(function() {
                window.print();
              }, 150);
            };
          <\/script>
        </body>
        </html>
      `;i.document.open(),i.document.write(h),i.document.close()}catch(i){console.warn("Fallback printing:",i),window.print()}finally{x(!1)}};return e.jsxs("div",{className:"modal-backdrop",onClick:s,role:"presentation",children:[e.jsxs("div",{className:"modal-card glass-modal dossier-modal",onClick:i=>i.stopPropagation(),role:"dialog","aria-modal":"true",children:[e.jsx("span",{className:"corner tl"}),e.jsx("span",{className:"corner tr"}),e.jsx("span",{className:"corner bl"}),e.jsx("span",{className:"corner br"}),e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{className:"modal-title-group",children:[e.jsx("span",{className:"modal-category",children:"CLASSIFIED PERSONNEL DOSSIER "}),e.jsx("h2",{className:"modal-title",children:c.name})]}),e.jsxs("div",{className:"dossier-header-actions",children:[e.jsxs("button",{type:"button",className:"dossier-action-btn print-btn",onClick:E,title:"Print or Save as PDF Resume",children:[e.jsxs("svg",{className:"action-svg-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("polyline",{points:"6 9 6 2 18 2 18 9"}),e.jsx("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),e.jsx("rect",{x:"6",y:"14",width:"12",height:"8"})]}),e.jsx("span",{children:g?"GENERATING...":"SAVE PDF / PRINT"})]}),e.jsxs("button",{type:"button",className:`dossier-action-btn copy-btn ${m?"success":""}`,onClick:L,title:"Copy Summary Intel to Clipboard",children:[e.jsxs("svg",{className:"action-svg-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"9",y:"9",width:"13",height:"13",rx:"2",ry:"2"}),e.jsx("path",{d:"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"})]}),e.jsx("span",{children:m?"COPIED!":"COPY INTEL"})]}),e.jsx("button",{type:"button",className:"modal-close-btn",onClick:()=>{v.playClick(),s()},"aria-label":"Close modal",children:"✕"})]})]}),e.jsxs("div",{className:"dossier-tabs-strip",children:[e.jsxs("button",{type:"button",className:`dossier-tab ${n==="summary"?"active":""}`,onClick:()=>{v.playKey(),t("summary")},children:[e.jsx("span",{className:"tab-num",children:"01"}),e.jsx("span",{children:"EXECUTIVE SUMMARY"})]}),e.jsxs("button",{type:"button",className:`dossier-tab ${n==="experience"?"active":""}`,onClick:()=>{v.playKey(),t("experience")},children:[e.jsx("span",{className:"tab-num",children:"02"}),e.jsx("span",{children:"EXPERIENCE & OPS"})]}),e.jsxs("button",{type:"button",className:`dossier-tab ${n==="skills"?"active":""}`,onClick:()=>{v.playKey(),t("skills")},children:[e.jsx("span",{className:"tab-num",children:"03"}),e.jsx("span",{children:"TECHNICAL MATRIX"})]}),e.jsxs("button",{type:"button",className:`dossier-tab ${n==="education"?"active":""}`,onClick:()=>{v.playKey(),t("education")},children:[e.jsx("span",{className:"tab-num",children:"04"}),e.jsx("span",{children:"EDUCATION & CERTS"})]})]}),e.jsxs("div",{className:"modal-body custom-scroll dossier-body-scrollable",children:[n==="summary"&&e.jsxs("div",{className:"dossier-tab-pane tab-summary animate-fade-in",children:[e.jsxs("div",{className:"dossier-bio-card",children:[e.jsxs("div",{className:"dossier-avatar-box",children:[e.jsx("div",{className:"dossier-avatar-fallback",children:"HS"}),e.jsx("span",{className:"clearance-badge",children:c.clearance})]}),e.jsxs("div",{className:"dossier-bio-info",children:[e.jsxs("div",{className:"dossier-name-row",children:[e.jsx("h3",{children:c.name}),e.jsx("span",{className:"dossier-callsign",children:c.callsign})]}),e.jsx("p",{className:"dossier-role",children:c.role}),e.jsxs("div",{className:"dossier-meta-grid",children:[e.jsxs("div",{className:"meta-item",children:[e.jsx("span",{className:"meta-lbl",children:"INSTITUTION"}),e.jsx("span",{className:"meta-val",children:c.institution})]}),e.jsxs("div",{className:"meta-item",children:[e.jsx("span",{className:"meta-lbl",children:"DEGREE / BATCH"}),e.jsxs("span",{className:"meta-val",children:[c.degree," (",c.duration,")"]})]}),e.jsxs("div",{className:"meta-item",children:[e.jsx("span",{className:"meta-lbl",children:"PRIMARY COMMS"}),e.jsx("a",{href:`mailto:${c.email}`,className:"meta-val link",children:c.email})]}),e.jsxs("div",{className:"meta-item",children:[e.jsx("span",{className:"meta-lbl",children:"GITHUB / CODE REPO"}),e.jsxs("a",{href:c.github,target:"_blank",rel:"noopener noreferrer",className:"meta-val link",children:[c.githubHandle," ↗"]})]})]})]})]}),e.jsxs("div",{className:"dossier-narrative-box",children:[e.jsx("div",{className:"narrative-label"}),e.jsx("p",{className:"narrative-text",children:c.summary})]}),e.jsx("div",{className:"dossier-stats-strip",children:f.map((i,h)=>e.jsxs("div",{className:`d-stat-box ${i.highlight?"highlight":""}`,children:[e.jsx("span",{className:"d-stat-val",children:i.value}),e.jsx("span",{className:"d-stat-lbl",children:i.label})]},h))}),e.jsx("div",{className:"dossier-competencies-grid",children:T.map((i,h)=>e.jsxs("div",{className:"competency-card",children:[e.jsx("h5",{className:"comp-area-title",children:i.area}),e.jsx("div",{className:"comp-tags-wrap",children:i.skills.map((o,b)=>e.jsx("span",{className:"comp-tag-pill",children:o},b))})]},h))})]}),n==="experience"&&e.jsxs("div",{className:"dossier-tab-pane tab-experience animate-fade-in",children:[e.jsx("div",{className:"section-label"}),e.jsx("div",{className:"dossier-timeline",children:y.map((i,h)=>e.jsxs("div",{className:"timeline-node",children:[e.jsxs("div",{className:"timeline-marker",children:[e.jsx("span",{className:"node-dot"}),e.jsx("span",{className:"node-line"})]}),e.jsxs("div",{className:"timeline-content-card",children:[e.jsxs("div",{className:"timeline-header-row",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"timeline-role",children:i.role}),e.jsx("span",{className:"timeline-org",children:i.organization})]}),e.jsxs("div",{className:"timeline-badges",children:[e.jsx("span",{className:"timeline-period-badge",children:i.period}),e.jsx("span",{className:"timeline-status-badge",children:i.badge})]})]}),e.jsx("p",{className:"timeline-desc",children:i.description}),e.jsx("ul",{className:"timeline-highlights-list",children:i.highlights.map((o,b)=>e.jsxs("li",{children:[e.jsx("span",{className:"list-bullet",children:"›"}),e.jsx("span",{children:o})]},b))})]})]},h))})]}),n==="skills"&&e.jsxs("div",{className:"dossier-tab-pane tab-skills animate-fade-in",children:[e.jsx("div",{className:"section-label"}),e.jsx("div",{className:"skills-filter-chips",children:D.map(i=>e.jsx("button",{type:"button",className:`skill-filter-chip ${r===i.id?"active":""}`,onClick:()=>{v.playClick(),l(i.id)},children:i.label},i.id))}),e.jsx("div",{className:"skills-card-grid",children:I.map(i=>e.jsxs("div",{className:"skill-item-card",children:[e.jsxs("div",{className:"skill-card-top",children:[e.jsx("span",{className:"skill-icon-emoji",children:i.icon}),e.jsx("span",{className:"skill-level-tag",children:i.level})]}),e.jsx("h4",{className:"skill-name-title",children:i.name}),e.jsx("p",{className:"skill-desc-text",children:i.desc})]},`skill-${i.name}`))})]}),n==="education"&&e.jsxs("div",{className:"dossier-tab-pane tab-education animate-fade-in",children:[e.jsx("div",{className:"section-label"}),A.map(i=>e.jsxs("div",{className:"education-card",children:[e.jsxs("div",{className:"edu-header-row",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"edu-degree",children:i.degree}),e.jsx("div",{className:"edu-major",children:i.major}),e.jsxs("div",{className:"edu-inst",children:[i.institution," — ",i.university]})]}),e.jsx("div",{className:"edu-period-tag",children:i.period})]}),e.jsxs("div",{className:"edu-coursework-box",children:[e.jsx("span",{className:"coursework-label",children:"CORE COURSEWORK & RESEARCH FOCUS:"}),e.jsx("div",{className:"coursework-chips",children:i.coursework.map((h,o)=>e.jsx("span",{className:"coursework-chip",children:h},`course-${o}-${h}`))})]})]},`edu-${i.degree}-${i.period}`)),e.jsx("div",{className:"section-label",style:{marginTop:"24px"}}),e.jsx("div",{className:"certifications-grid",children:S.map(i=>e.jsxs("div",{className:"cert-card",children:[e.jsxs("div",{className:"cert-top-row",children:[e.jsx("span",{className:"cert-tag",children:i.tag}),e.jsx("span",{className:"cert-year",children:i.year})]}),e.jsx("h5",{className:"cert-title",children:i.title}),e.jsx("span",{className:"cert-issuer",children:i.issuer})]},`cert-${i.tag}-${i.title}`))})]})]}),e.jsxs("div",{className:"modal-footer dossier-footer-wrap",children:[e.jsxs("div",{className:"footer-left-status",children:[e.jsx("span",{className:"status-indicator-dot"}),e.jsx("span",{children:"CLEARANCE VERIFIED "})]}),e.jsxs("div",{className:"footer-btns-group",children:[e.jsx("button",{type:"button",className:"btn-modal-action print",onClick:E,children:"📄 SAVE PDF"}),e.jsx("button",{type:"button",className:"btn-modal-close",onClick:()=>{v.playClick(),s()},children:"DISMISS DOSSIER"})]})]})]}),e.jsxs("div",{className:"dossier-printable-resume",children:[e.jsxs("header",{className:"print-header",children:[e.jsxs("div",{className:"print-name-title",children:[e.jsx("h1",{className:"print-name",children:c.name}),e.jsx("p",{className:"print-role",children:c.role})]}),e.jsxs("div",{className:"print-contact-info",children:[e.jsxs("div",{children:["📧 ",c.email]}),e.jsxs("div",{children:["🐙 ",c.github]}),e.jsxs("div",{children:["💼 ",c.linkedin]}),e.jsxs("div",{children:["📍 ",c.location]})]})]}),e.jsxs("section",{className:"print-section",children:[e.jsx("h2",{className:"print-sec-title",children:"PROFESSIONAL SUMMARY"}),e.jsx("p",{className:"print-text",children:c.summary})]}),e.jsxs("section",{className:"print-section",children:[e.jsx("h2",{className:"print-sec-title",children:"EDUCATION"}),A.map((i,h)=>e.jsxs("div",{className:"print-edu-item",children:[e.jsxs("div",{className:"print-row-between",children:[e.jsxs("strong",{children:[i.degree," — ",i.major]}),e.jsx("span",{children:i.period})]}),e.jsxs("div",{className:"print-inst",children:[i.institution,", ",i.university]}),e.jsxs("div",{className:"print-coursework",children:[e.jsx("em",{children:"Core Coursework:"})," ",i.coursework.join(", ")]})]},h))]}),e.jsxs("section",{className:"print-section",children:[e.jsx("h2",{className:"print-sec-title",children:"TECHNICAL PROFICIENCIES"}),e.jsx("div",{className:"print-skills-grid",children:T.map((i,h)=>e.jsxs("div",{className:"print-skill-group",children:[e.jsxs("strong",{children:[i.area,":"]})," ",i.skills.join(", ")]},h))})]}),e.jsxs("section",{className:"print-section",children:[e.jsx("h2",{className:"print-sec-title",children:"ENGINEERING EXPERIENCE & NOTABLE PROJECTS"}),y.map((i,h)=>e.jsxs("div",{className:"print-exp-item",children:[e.jsxs("div",{className:"print-row-between",children:[e.jsx("strong",{children:i.role}),e.jsx("span",{children:i.period})]}),e.jsx("div",{className:"print-exp-org",children:i.organization}),e.jsx("p",{className:"print-exp-desc",children:i.description}),e.jsx("ul",{className:"print-bullet-list",children:i.highlights.map((o,b)=>e.jsx("li",{children:o},b))})]},h))]}),e.jsxs("section",{className:"print-section",children:[e.jsx("h2",{className:"print-sec-title",children:"CERTIFICATIONS & CREDENTIALS"}),e.jsx("div",{className:"print-cert-list",children:S.map((i,h)=>e.jsxs("div",{className:"print-cert-item",children:["• ",e.jsx("strong",{children:i.title})," — ",i.issuer," (",i.year,")"]},h))})]})]})]})}const M=Object.freeze(Object.defineProperty({__proto__:null,default:O},Symbol.toStringTag,{value:"Module"}));export{M as D,v as S};
