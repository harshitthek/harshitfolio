import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CardsScreen from '../components/CardsScreen';
import CyberTerminalWing from '../components/CyberTerminalWing';
import IntermediateScreen from '../components/IntermediateScreen';
import LoadingScreen from '../components/LoadingScreen';
import MissionScreen from '../components/MissionScreen';
import ArchitectureModal from '../components/modals/ArchitectureModal';
import CodeInspectorModal from '../components/modals/CodeInspectorModal';
import CommandPaletteModal from '../components/modals/CommandPaletteModal';
import ContactModal from '../components/modals/ContactModal';
import DossierModal from '../components/modals/DossierModal';
import GitHubTelemetryModal from '../components/modals/GitHubTelemetryModal';
import MLSimulatorModal from '../components/modals/MLSimulatorModal';
import ProjectModal from '../components/modals/ProjectModal';
import Navbar from '../components/Navbar';
import VideoScreen from '../components/VideoScreen';
import { VoiceProvider } from '../components/VoiceContext';

// Mock HTMLMediaElement (play, pause, load) to silence jsdom stubs
window.HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue();
window.HTMLMediaElement.prototype.pause = vi.fn();
window.HTMLMediaElement.prototype.load = vi.fn();

// Mock window.scrollTo and scrollIntoView
window.scrollTo = vi.fn();
window.HTMLElement.prototype.scrollIntoView = vi.fn();

// Mock Canvas 2D Context
HTMLCanvasElement.prototype.getContext = () => ({
  fillRect: vi.fn(),
  clearRect: vi.fn(),
  getImageData: vi.fn(),
  putImageData: vi.fn(),
  createImageData: vi.fn(),
  setTransform: vi.fn(),
  drawImage: vi.fn(),
  save: vi.fn(),
  fillText: vi.fn(),
  restore: vi.fn(),
  beginPath: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  closePath: vi.fn(),
  stroke: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
  createRadialGradient: vi.fn(() => ({
    addColorStop: vi.fn()
  })),
  setLineDash: vi.fn(),
  roundRect: vi.fn()
});

describe('Full Component Suite Smoke & ReferenceError Integrity Test', () => {
  it('should render CyberTerminalWing without ReferenceError', () => {
    const { container } = render(<CyberTerminalWing isActive={true} />);
    expect(container.querySelector('.cyber-flank-terminal')).toBeTruthy();
  });

  it('should render MissionScreen and its child components without ReferenceError', () => {
    const { container } = render(
      <VoiceProvider>
        <MissionScreen isActive={true} onAccept={vi.fn()} />
      </VoiceProvider>
    );
    expect(container.querySelector('#s-mission')).toBeTruthy();
  });

  it('should render VideoScreen without ReferenceError', () => {
    const { container } = render(
      <VoiceProvider>
        <VideoScreen isActive={true} onComplete={vi.fn()} />
      </VoiceProvider>
    );
    expect(container.querySelector('#s-video')).toBeTruthy();
  });

  it('should render IntermediateScreen and LoadingScreen without ReferenceError', () => {
    const { container: intContainer } = render(
      <IntermediateScreen isActive={true} onComplete={vi.fn()} />
    );
    expect(intContainer.querySelector('#s-intermediate')).toBeTruthy();

    const { container: loadContainer } = render(
      <LoadingScreen isActive={true} targetName="Test Portal" onComplete={vi.fn()} />
    );
    expect(loadContainer.querySelector('#s-loading')).toBeTruthy();
  });

  it('should render CardsScreen and Navbar without ReferenceError', () => {
    const { container: cardsContainer } = render(
      <CardsScreen isActive={true} onLaunch={vi.fn()} onQuickIntel={vi.fn()} />
    );
    expect(cardsContainer.querySelector('#s-cards')).toBeTruthy();

    const { container: navContainer } = render(
      <VoiceProvider>
        <Navbar activeScreen="s-mission" onJumpToScreen={vi.fn()} onOpenModal={vi.fn()} />
      </VoiceProvider>
    );
    expect(navContainer.querySelector('.cyber-hud-nav')).toBeTruthy();
  });

  it('should render all interactive modals without ReferenceError', () => {
    const dummyCard = {
      id: 'bike',
      title: 'Bike Valuation',
      desc: 'Machine learning model',
      tags: ['Python', 'React'],
      stats: {
        stat1: '95%',
        stat1Lbl: 'Accuracy',
        stat2: '<10ms',
        stat2Lbl: 'Latency',
        stat3: '2026',
        stat3Lbl: 'Year'
      }
    };

    render(<ArchitectureModal onClose={vi.fn()} />);
    render(<CodeInspectorModal onClose={vi.fn()} />);
    render(<ContactModal onClose={vi.fn()} />);
    render(<DossierModal onClose={vi.fn()} />);
    render(<GitHubTelemetryModal onClose={vi.fn()} />);
    render(<MLSimulatorModal onClose={vi.fn()} />);
    render(<ProjectModal card={dummyCard} onClose={vi.fn()} onLaunch={vi.fn()} />);
    render(
      <VoiceProvider>
        <CommandPaletteModal
          isOpen={true}
          onClose={vi.fn()}
          onJumpToScreen={vi.fn()}
          onOpenModal={vi.fn()}
        />
      </VoiceProvider>
    );
  });
});
