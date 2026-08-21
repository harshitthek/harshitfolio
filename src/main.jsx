import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ErrorBoundary } from './components/ErrorBoundary.jsx';
import { VoiceProvider } from './components/VoiceContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <VoiceProvider>
        <App />
      </VoiceProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
