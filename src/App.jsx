import { useCallback, useEffect, useRef, useState } from 'react';
import CardsScreen from './components/CardsScreen';
import CyberCursor from './components/CyberCursor';
import IntermediateScreen from './components/IntermediateScreen';
import LoadingScreen from './components/LoadingScreen';
import MissionScreen from './components/MissionScreen';
import ArchitectureModal from './components/modals/ArchitectureModal';
import CodeInspectorModal from './components/modals/CodeInspectorModal';
import CommandPaletteModal from './components/modals/CommandPaletteModal';
import ContactModal from './components/modals/ContactModal';
import DossierModal from './components/modals/DossierModal';
import GitHubTelemetryModal from './components/modals/GitHubTelemetryModal';
import MLSimulatorModal from './components/modals/MLSimulatorModal';
import ProjectModal from './components/modals/ProjectModal';
import TerminalModal from './components/modals/TerminalModal';
import Navbar from './components/Navbar';
import NeuralBackground from './components/NeuralBackground';
import { SoundFX } from './components/SoundFX';
import VideoScreen from './components/VideoScreen';
import { useVoice } from './components/VoiceContext';
import { projectsData } from './data/projectsData';
import { warmupAllBackends } from './utils/backendWarmup';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('s-video');
  const [deployTarget, setDeployTarget] = useState({ name: '', url: '' });
  const [activeModal, setActiveModal] = useState(null);
  const [selectedProjectForModal, setSelectedProjectForModal] = useState(null);
  const [godModeActive, setGodModeActive] = useState(false);
  const konamiSeqRef = useRef([]);

  const { speak } = useVoice();

  // Pre-warm free-tier backend containers on initial portfolio arrival
  useEffect(() => {
    warmupAllBackends();
  }, []);

  // URL Deep-Linking & Referral Telemetry Parser (?ref=..., ?modal=..., ?screen=...)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const params = new URLSearchParams(window.location.search);
      const ref = (params.get('ref') || params.get('source') || '').toLowerCase();
      const modalParam = (params.get('modal') || '').toLowerCase();
      const screenParam = (params.get('screen') || '').toLowerCase();

      // Screen navigation override
      if (['cards', '4', 'projects', 'multiverse'].includes(screenParam)) {
        setCurrentScreen('s-cards');
      } else if (['mission', '3', 'hub'].includes(screenParam)) {
        setCurrentScreen('s-mission');
      }

      // Referral routing
      if (ref === 'resume' || ref === 'cv' || ref === 'dossier') {
        setCurrentScreen('s-cards');
        setActiveModal('dossier');
        speak('Welcome operator. Executive dossier and technical resume loaded.');
        return;
      }

      if (ref) {
        console.log(`[HARSHIT.EXE TELEMETRY] Inbound referral detected: source=${ref}`);
      }

      // Modal deep linking
      const modalMap = {
        dossier: 'dossier',
        resume: 'dossier',
        terminal: 'terminal',
        snake: 'terminal',
        arcade: 'terminal',
        ml: 'ml-sim',
        autovaluate: 'ml-sim',
        simulator: 'ml-sim',
        inspector: 'code-inspect',
        code: 'code-inspect',
        architecture: 'architecture',
        system: 'architecture',
        telemetry: 'telemetry',
        github: 'telemetry',
        contact: 'contact',
        email: 'contact',
        cmd: 'cmd-palette',
        palette: 'cmd-palette'
      };

      if (modalParam && modalMap[modalParam]) {
        setCurrentScreen('s-cards');
        setActiveModal(modalMap[modalParam]);
      }
    } catch (_e) {
      // Safe fallback if URL parsing fails
    }
  }, [speak]);

  // Screen 1 Video -> Screen 2 Intermediate
  const handleVideoComplete = useCallback(() => {
    setCurrentScreen('s-intermediate');
    speak('Loading mission database. Stand by.');
  }, [speak]);

  // Screen 2 Intermediate -> Screen 3 Mission (called only AFTER 100% is reached and flash completes)
  const handleIntermediateComplete = useCallback(() => {
    setCurrentScreen('s-mission');
    speak(
      `Incoming classified mission. Welcome to Harshit Sharma's portfolio. Thirteen neural universes await. Choose wisely.`
    );
  }, [speak]);

  // Screen 3 Mission -> Cards
  const handleAcceptMission = useCallback(() => {
    setCurrentScreen('s-cards');
    speak('Neural multiverse generator ready. Pick an engineering portal for Harshit.');
  }, [speak]);

  // Screen 4 Cards -> Loading Deploy
  const launchPortfolio = useCallback(
    (name, url) => {
      setDeployTarget({ name, url });
      setCurrentScreen('s-loading');
      speak(`Deploying ${name}. Initiating launch sequence.`);
    },
    [speak]
  );

  // Screen 5 Loading -> Redirect & return to Cards
  const onDeployComplete = useCallback(() => {
    speak('Launch successful. Redirecting now.');
    if (deployTarget.url) {
      window.open(deployTarget.url, '_blank');
    }
    setTimeout(() => {
      setCurrentScreen('s-cards');
    }, 1400);
  }, [deployTarget, speak]);

  const handleQuickIntel = useCallback((card) => {
    if (card.hasInteractiveModal === 'ml-sim') {
      setActiveModal('ml-sim');
    } else if (card.hasInteractiveModal === 'code-inspect') {
      setActiveModal('code-inspect');
    } else if (card.hasInteractiveModal === 'architecture') {
      setActiveModal('architecture');
    } else if (card.hasInteractiveModal === 'terminal') {
      setActiveModal('terminal');
    } else if (card.hasInteractiveModal === 'dossier') {
      setActiveModal('dossier');
    } else {
      setSelectedProjectForModal(card);
      setActiveModal('project');
    }
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setSelectedProjectForModal(null);
  }, []);

  // Global Keyboard shortcuts (active ONLY on the final Multiverse Cards screen)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Allow ESC to close any open modal
      if (e.key === 'Escape') {
        if (activeModal) closeModal();
        return;
      }

      // Don't intercept if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
        return;
      }

      // Strictly disable all hotkeys until the user reaches the final Multiverse screen ('s-cards')
      if (currentScreen !== 's-cards') {
        return;
      }

      // Allow Ctrl+K or Cmd+K on the cards screen
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        SoundFX.playClick();
        setActiveModal((prev) => (prev === 'cmd-palette' ? null : 'cmd-palette'));
        return;
      }

      // Quick slash / shortcut to open command palette
      if (e.key === '/') {
        e.preventDefault();
        SoundFX.playClick();
        setActiveModal('cmd-palette');
        return;
      }

      // DO NOT trigger letter hotkeys if Ctrl, Meta (Cmd), or Alt is held down!
      if (e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      if (e.key === 't' || e.key === 'T') {
        if (!activeModal) {
          SoundFX.playClick();
          setActiveModal('terminal');
        }
      } else if (e.key === 'm' || e.key === 'M') {
        if (!activeModal) {
          SoundFX.playClick();
          setActiveModal('ml-sim');
        }
      } else if (e.key === 'c' || e.key === 'C') {
        if (!activeModal) {
          SoundFX.playClick();
          setActiveModal('code-inspect');
        }
      } else if (e.key === 'a' || e.key === 'A') {
        if (!activeModal) {
          SoundFX.playClick();
          setActiveModal('architecture');
        }
      } else if (e.key === 'd' || e.key === 'D') {
        if (!activeModal) {
          SoundFX.playClick();
          setActiveModal('dossier');
        }
      } else if (e.key === 'g' || e.key === 'G') {
        if (!activeModal) {
          SoundFX.playClick();
          setActiveModal('github');
        }
      } else if (((e.key >= '1' && e.key <= '9') || e.key === '0') && !activeModal) {
        const index = e.key === '0' ? 9 : parseInt(e.key, 10) - 1;
        const project = projectsData[index];
        if (project) {
          SoundFX.playClick();
          launchPortfolio(project.title, project.demoUrl || project.url);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal, currentScreen, activeModal, launchPortfolio]);

  // 🕹️ EASTER EGG: The Legendary Konami Code (↑ ↑ ↓ ↓ ← → ← → B A)
  useEffect(() => {
    const KONAMI_SEQUENCE = [
      'arrowup',
      'arrowup',
      'arrowdown',
      'arrowdown',
      'arrowleft',
      'arrowright',
      'arrowleft',
      'arrowright',
      'b',
      'a'
    ];

    const handleKonamiKey = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      const key = e.key.toLowerCase();
      konamiSeqRef.current = [...konamiSeqRef.current, key].slice(-10);

      if (konamiSeqRef.current.join(',') === KONAMI_SEQUENCE.join(',')) {
        SoundFX.playWarp();
        SoundFX.playExplosion();
        setGodModeActive((prev) => !prev);
        speak('God Mode protocol initiated. You have unlocked root level clearance, Harshit.');
        konamiSeqRef.current = [];
      }
    };

    window.addEventListener('keydown', handleKonamiKey);
    return () => window.removeEventListener('keydown', handleKonamiKey);
  }, [speak]);

  return (
    <div className={`app-container ${godModeActive ? 'god-mode-active' : ''}`}>
      {/* Easter Egg: Floating God Mode Overdrive Badge */}
      {godModeActive && (
        <div
          className="godmode-floating-banner"
          style={{
            position: 'fixed',
            top: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 999999,
            background: 'linear-gradient(90deg, #ff007f, #00ff88, #38bdf8, #fbbf24)',
            padding: '2px',
            borderRadius: '8px',
            boxShadow: '0 0 35px rgba(0, 255, 136, 0.7)'
          }}
        >
          <div
            style={{
              background: '#050508',
              padding: '8px 18px',
              borderRadius: '6px',
              color: '#00ff88',
              fontFamily: "'Fira Code', monospace",
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '2px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span style={{ color: '#fbbf24' }}>⚡</span>
            <span>CYBER OVERDRIVE // GOD MODE ACTIVE</span>
            <span style={{ color: '#ff007f' }}>[CLEARANCE: 999]</span>
            <button
              type="button"
              onClick={() => setGodModeActive(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                marginLeft: '8px',
                fontWeight: 700
              }}
              title="Dismiss God Mode"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      {/* Precision Theme-Matched Cyber Cursor */}
      <CyberCursor activeScreen={currentScreen} />

      {/* Interactive AI-driven neural synapse mesh canvas (runs only on Hub screens) */}
      {currentScreen !== 's-video' && <NeuralBackground />}

      {/* Futuristic Cyber Top HUD Navigation */}
      <Navbar
        activeScreen={currentScreen}
        onOpenModal={(modalName) => setActiveModal(modalName)}
        onJumpToScreen={(screenName) => setCurrentScreen(screenName)}
      />

      {/* 5 Main Cinematic Screen Sequence */}
      <VideoScreen isActive={currentScreen === 's-video'} onComplete={handleVideoComplete} />

      <IntermediateScreen
        isActive={currentScreen === 's-intermediate'}
        onComplete={handleIntermediateComplete}
      />

      <MissionScreen
        isActive={currentScreen === 's-mission'}
        onAccept={handleAcceptMission}
        onOpenModal={(modalName) => setActiveModal(modalName)}
      />

      <CardsScreen
        isActive={currentScreen === 's-cards'}
        onLaunch={launchPortfolio}
        onOpenModal={(modalName) => setActiveModal(modalName)}
        onQuickIntel={handleQuickIntel}
      />

      <LoadingScreen
        isActive={currentScreen === 's-loading'}
        targetName={deployTarget.name}
        onComplete={onDeployComplete}
      />

      {/* In-App Interactive Feature Modals */}
      {activeModal === 'project' && selectedProjectForModal && (
        <ProjectModal
          card={selectedProjectForModal}
          onClose={closeModal}
          onLaunch={launchPortfolio}
        />
      )}

      {activeModal === 'ml-sim' && <MLSimulatorModal onClose={closeModal} />}

      {activeModal === 'code-inspect' && <CodeInspectorModal onClose={closeModal} />}

      {activeModal === 'architecture' && <ArchitectureModal onClose={closeModal} />}

      {activeModal === 'terminal' && (
        <TerminalModal onClose={closeModal} onLaunch={launchPortfolio} />
      )}

      {activeModal === 'dossier' && <DossierModal onClose={closeModal} />}

      {activeModal === 'github' && <GitHubTelemetryModal onClose={closeModal} />}

      {activeModal === 'contact' && <ContactModal onClose={closeModal} />}

      {activeModal === 'cmd-palette' && (
        <CommandPaletteModal
          isOpen={activeModal === 'cmd-palette'}
          onClose={closeModal}
          onJumpToScreen={(screen) => {
            setCurrentScreen(screen);
            closeModal();
          }}
          onOpenModal={(modal) => {
            setActiveModal(modal);
          }}
          onLaunchProject={(name, url) => {
            closeModal();
            launchPortfolio(name, url);
          }}
          currentScreen={currentScreen}
        />
      )}
    </div>
  );
}
