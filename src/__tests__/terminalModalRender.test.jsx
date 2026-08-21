import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import TerminalModal from '../components/modals/TerminalModal';

// Mock HTML5 Canvas getContext
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
  fill: vi.fn()
});

describe('TerminalModal React Component Smoke & Mount Test', () => {
  it('should render and mount TerminalModal without ReferenceError or initialization faults', () => {
    const handleClose = vi.fn();
    const handleLaunch = vi.fn();

    const { container } = render(
      <TerminalModal onClose={handleClose} onLaunch={handleLaunch} />
    );

    expect(container.querySelector('.terminal-modal')).toBeTruthy();
    expect(screen.getByPlaceholderText("type 'help'...")).toBeTruthy();
    expect(screen.getByText(/HARSHIT SHARMA CYBER LAB INTERACTIVE ZSH SHELL/i)).toBeTruthy();
  });
});
