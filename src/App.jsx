import { useCallback, useEffect, useState } from 'react';
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

  const { speak } = useVoice();

  // Pre-warm free-tier backend containers on initial portfolio arrival
  useEffect(() => {
    warmupAllBackends();
  }, []);

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

  return (
    <div className="app-container">
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
