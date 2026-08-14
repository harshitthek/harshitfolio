import React, { useState, useEffect, useCallback } from 'react';
import { useVoice } from './components/VoiceContext';
import { SoundFX } from './components/SoundFX';
import { projectsData } from './data/projectsData';

import VideoScreen from './components/VideoScreen';
import IntermediateScreen from './components/IntermediateScreen';
import MissionScreen from './components/MissionScreen';
import CardsScreen from './components/CardsScreen';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import NeuralBackground from './components/NeuralBackground';

import ProjectModal from './components/modals/ProjectModal';
import MLSimulatorModal from './components/modals/MLSimulatorModal';
import CodeInspectorModal from './components/modals/CodeInspectorModal';
import ArchitectureModal from './components/modals/ArchitectureModal';
import TerminalModal from './components/modals/TerminalModal';
import DossierModal from './components/modals/DossierModal';
import ContactModal from './components/modals/ContactModal';
import CyberCursor from './components/CyberCursor';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('s-video');
  const [deployTarget, setDeployTarget] = useState({ name: '', url: '' });
  const [activeModal, setActiveModal] = useState(null);
  const [selectedProjectForModal, setSelectedProjectForModal] = useState(null);

  const { speak } = useVoice();

  // Screen 1 Video -> Intermediate -> Mission
  const handleVideoComplete = useCallback(() => {
    setCurrentScreen('s-intermediate');
    speak("Loading mission database. Stand by.");
    setTimeout(() => {
      setCurrentScreen('s-mission');
      speak("Incoming classified mission. Welcome to Harshit Sharma's portfolio. Eight AI universes await. Choose wisely.");
    }, 2400);
  }, [speak]);

  // Screen 3 Mission -> Cards
  const handleAcceptMission = useCallback(() => {
    setCurrentScreen('s-cards');
    speak("Neural multiverse generator ready. Pick an engineering portal for Harshit.");
  }, [speak]);

  // Screen 4 Cards -> Loading Deploy
  const launchPortfolio = useCallback((name, url) => {
    setDeployTarget({ name, url });
    setCurrentScreen('s-loading');
    speak(`Deploying ${name}. Initiating launch sequence.`);
  }, [speak]);

  // Screen 5 Loading -> Redirect & return to Cards
  const onDeployComplete = useCallback(() => {
    speak("Launch successful. Redirecting now.");
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

  // Global Keyboard shortcuts (with strict modifier check to prevent Ctrl+C hijacking)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
        if (e.key === 'Escape') closeModal();
        return;
      }

      // DO NOT trigger letter hotkeys if Ctrl, Meta (Cmd), or Alt is held down!
      // This fixes the issue where Ctrl+C copied text or closed terminal and opened Code Inspector!
      if (e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 't' || e.key === 'T') {
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
      } else if (e.key >= '1' && e.key <= '8' && currentScreen === 's-cards' && !activeModal) {
        const index = parseInt(e.key, 10) - 1;
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

      {/* Interactive AI-driven neural synapse mesh canvas */}
      <NeuralBackground />

      {/* Futuristic Cyber Top HUD Navigation */}
      <Navbar
        activeScreen={currentScreen}
        onOpenModal={(modalName) => setActiveModal(modalName)}
        onJumpToScreen={(screenName) => setCurrentScreen(screenName)}
      />

      {/* 5 Main Cinematic Screen Sequence */}
      <VideoScreen
        isActive={currentScreen === 's-video'}
        onComplete={handleVideoComplete}
      />

      <IntermediateScreen
        isActive={currentScreen === 's-intermediate'}
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

      {activeModal === 'ml-sim' && (
        <MLSimulatorModal
          onClose={closeModal}
        />
      )}

      {activeModal === 'code-inspect' && (
        <CodeInspectorModal
          onClose={closeModal}
        />
      )}

      {activeModal === 'architecture' && (
        <ArchitectureModal
          onClose={closeModal}
        />
      )}

      {activeModal === 'terminal' && (
        <TerminalModal
          onClose={closeModal}
          onLaunch={launchPortfolio}
        />
      )}

      {activeModal === 'dossier' && (
        <DossierModal
          onClose={closeModal}
        />
      )}

      {activeModal === 'contact' && (
        <ContactModal
          onClose={closeModal}
        />
      )}
    </div>
  );
}
