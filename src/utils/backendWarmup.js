/**
 * AutoValuate AI & ML Microservices Pre-Warm / Wake-Up Engine
 * 
 * Free-tier cloud instances (e.g. Render, Railway, HuggingFace) spin down
 * after 15 minutes of inactivity. This utility immediately sends an asynchronous,
 * non-blocking background wake-up ping the moment a visitor opens the portfolio.
 * 
 * By the time the user explores the intro screens and reaches the ML Simulator
 * (~15-30s later), the backend container has finished cold-starting and is 100% hot.
 */

const DEFAULT_ENDPOINTS = [
  'http://127.0.0.1:8000',
  'https://used-bike-price.onrender.com',
  'https://autovaluate-ai.onrender.com',
  'https://moto-value-ai.vercel.app'
];

export async function warmupAllBackends() {
  const customUrl = (() => {
    try {
      return localStorage.getItem('autovaluate_backend_url');
    } catch {
      return null;
    }
  })();

  const targets = Array.from(new Set([
    ...(customUrl ? [customUrl] : []),
    ...DEFAULT_ENDPOINTS
  ]));

  console.log('[⚡ ML BACKEND WARM-UP] Initiating background pre-warm pulses for automotive ML engines...');

  targets.forEach(async (baseUrl) => {
    try {
      const cleanBase = baseUrl.replace(/\/$/, '');
      const pingUrl = `${cleanBase}/api/v1/demo/estimate?vehicle_type=bike&brand=Royal%20Enfield&power=350&kms_driven=15000&age=3&owner_rank=1`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000); // 25s spinup window

      // Fire and forget asynchronous ping
      fetch(pingUrl, {
        method: 'GET',
        mode: 'cors',
        signal: controller.signal,
        headers: { 'X-Prewarm-Ping': 'harshitfolio-initial-load' }
      })
        .then((res) => {
          clearTimeout(timeoutId);
          if (res.ok) {
            console.log(`[✓ ML BACKEND HOT] ${cleanBase} is awake and ready.`);
          }
        })
        .catch(() => {
          // If CORS or timeout, try a lightweight fallback head/docs ping
          try {
            fetch(`${cleanBase}/docs`, { mode: 'no-cors' }).catch(() => {});
          } catch {}
        });
    } catch {
      // Completely silent catch to ensure zero UI interruption
    }
  });
}
