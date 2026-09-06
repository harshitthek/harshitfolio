/**
 * AutoValuate AI & ML Microservices Pre-Warm / Wake-Up Engine
 *
 * Free-tier cloud instances (e.g. Render, Railway, HuggingFace) spin down
 * after 15 minutes of inactivity. This utility immediately sends an asynchronous,
 * non-blocking background wake-up ping the moment a visitor interacts with the portfolio.
 *
 * - Googlebot / Search Engine Crawlers: Completely bypassed (zero crawler XHR errors).
 * - Mixed Content / Localhost: Bypasses http://127.0.0.1 on HTTPS production to prevent browser blocks.
 * - Human Interaction Trigger: Wakes up ML microservices on first human gesture or modal opening.
 */

const DEFAULT_ENDPOINTS = [
  'https://used-bike-price.onrender.com',
  'https://autovaluate-ai.onrender.com',
  'https://moto-value-ai.vercel.app',
  'http://127.0.0.1:8000'
];

/**
 * Checks if the current environment is a search engine bot, crawler, or headless test.
 */
export function isSearchCrawlerOrAutomated() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return true;
  try {
    const ua = (navigator.userAgent || '').toLowerCase();
    const isBotUa =
      /bot|googlebot|bingbot|crawler|spider|robot|crawling|lighthouse|headless|mediapartners|adsbot|screaming frog|bingpreview/i.test(
        ua
      );
    const isWebDriver = Boolean(navigator.webdriver);
    return isBotUa || isWebDriver;
  } catch {
    return false;
  }
}

/**
 * Filters out unsafe mixed-content or unreachable endpoints based on protocol & hostname.
 */
export function filterSafeEndpoints(endpoints) {
  const isHttps =
    typeof window !== 'undefined' && window.location && window.location.protocol === 'https:';
  const isLocalhost =
    typeof window !== 'undefined' &&
    window.location &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  return endpoints.filter((url) => {
    try {
      const parsed = new URL(url);
      // In HTTPS production, do not send HTTP requests to 127.0.0.1 (prevents Mixed Content blocks)
      if (isHttps && parsed.protocol === 'http:' && !isLocalhost) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  });
}

let warmupExecuted = false;

export async function warmupAllBackends(force = false) {
  if (warmupExecuted && !force) return;

  // Never execute background XHR calls for search engine crawlers or automated audit tools
  if (isSearchCrawlerOrAutomated() && !force) {
    return;
  }

  warmupExecuted = true;

  const customUrl = (() => {
    try {
      return typeof localStorage !== 'undefined'
        ? localStorage.getItem('autovaluate_backend_url')
        : null;
    } catch {
      return null;
    }
  })();

  const rawTargets = Array.from(new Set([...(customUrl ? [customUrl] : []), ...DEFAULT_ENDPOINTS]));
  const targets = filterSafeEndpoints(rawTargets);

  targets.forEach(async (baseUrl) => {
    try {
      const cleanBase = baseUrl.replace(/\/$/, '');
      const pingUrl = `${cleanBase}/api/v1/demo/estimate?vehicle_type=bike&brand=Royal%20Enfield&power=350&kms_driven=15000&age=3&owner_rank=1`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);

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
          clearTimeout(timeoutId);
        });
    } catch {
      // Completely silent catch to prevent unhandled rejections
    }
  });
}

/**
 * Registers passive human interaction listeners to trigger warmup
 * only when a real human starts interacting with the portfolio.
 */
export function registerHumanWarmupTrigger() {
  if (typeof window === 'undefined') return;
  if (isSearchCrawlerOrAutomated()) return;

  const onHumanInteract = () => {
    window.removeEventListener('pointerdown', onHumanInteract);
    window.removeEventListener('keydown', onHumanInteract);
    window.removeEventListener('scroll', onHumanInteract);
    window.removeEventListener('touchstart', onHumanInteract);
    warmupAllBackends();
  };

  window.addEventListener('pointerdown', onHumanInteract, { once: true, passive: true });
  window.addEventListener('keydown', onHumanInteract, { once: true, passive: true });
  window.addEventListener('scroll', onHumanInteract, { once: true, passive: true });
  window.addEventListener('touchstart', onHumanInteract, { once: true, passive: true });
}
