(function() {
  'use strict';

  const TRACKING_PARAMS = ['fbclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  const STORAGE_PREFIX = 'tracking_';
  const BACKEND_ENDPOINT = 'https://n8n.vortexfuturo.fun/webhook/tracking';
  const DEBUG = true;

  function log(...args) {
    if (DEBUG) {
      console.log('[TRACKING]', ...args);
    }
  }

  function captureParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    let captured = false;

    TRACKING_PARAMS.forEach(param => {
      const value = urlParams.get(param);
      if (value) {
        localStorage.setItem(STORAGE_PREFIX + param, value);
        captured = true;
        log(`Captured ${param}:`, value);
      }
    });

    if (captured) {
      log('Parameters captured and saved to localStorage');
      sendToBackend();
    }
  }

  function getStoredParameters() {
    const params = {};
    TRACKING_PARAMS.forEach(param => {
      const value = localStorage.getItem(STORAGE_PREFIX + param);
      if (value) {
        params[param] = value;
      }
    });
    return params;
  }

  function buildQueryString(params) {
    const pairs = [];
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
      }
    }
    return pairs.join('&');
  }

  function appendParametersToUrl(url) {
    const storedParams = getStoredParameters();

    if (Object.keys(storedParams).length === 0) {
      return url;
    }

    const queryString = buildQueryString(storedParams);

    if (!queryString) {
      return url;
    }

    const separator = url.includes('?') ? '&' : '?';
    const newUrl = url + separator + queryString;

    log('URL enhanced:', url, '->', newUrl);
    return newUrl;
  }

  function enhanceLinks() {
    const links = document.querySelectorAll('a[href]');

    links.forEach(link => {
      if (link.dataset.trackingEnhanced) {
        return;
      }

      const originalHref = link.getAttribute('href');

      if (!originalHref || originalHref.startsWith('#') || originalHref.startsWith('javascript:')) {
        return;
      }

      link.addEventListener('click', function(e) {
        const currentHref = this.getAttribute('href');
        const enhancedHref = appendParametersToUrl(currentHref);

        if (enhancedHref !== currentHref) {
          this.setAttribute('href', enhancedHref);
          log('Link enhanced on click:', enhancedHref);
        }
      });

      link.dataset.trackingEnhanced = 'true';
    });

    log('Enhanced', links.length, 'links');
  }

  function sendToBackend() {
    const storedParams = getStoredParameters();

    if (Object.keys(storedParams).length === 0) {
      return;
    }

    const payload = {
      ...storedParams,
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
      referrer: document.referrer || 'direct'
    };

    fetch(BACKEND_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      mode: 'no-cors'
    })
    .then(() => {
      log('Tracking data sent to backend:', payload);
    })
    .catch(err => {
      log('Failed to send tracking data:', err);
    });
  }

  function applyParametersToCurrentUrl() {
    const currentParams = new URLSearchParams(window.location.search);
    const storedParams = getStoredParameters();
    let hasNewParams = false;

    TRACKING_PARAMS.forEach(param => {
      if (storedParams[param] && !currentParams.has(param)) {
        currentParams.set(param, storedParams[param]);
        hasNewParams = true;
      }
    });

    if (hasNewParams && window.history.replaceState) {
      const newUrl = window.location.pathname + '?' + currentParams.toString();
      window.history.replaceState({}, '', newUrl);
      log('Current URL updated with stored parameters:', newUrl);
    }
  }

  function init() {
    log('Tracking script initialized');
    log('Current URL:', window.location.href);

    captureParameters();

    applyParametersToCurrentUrl();

    const storedParams = getStoredParameters();
    if (Object.keys(storedParams).length > 0) {
      log('Stored parameters:', storedParams);
    }

    enhanceLinks();

    const observer = new MutationObserver(() => {
      enhanceLinks();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    log('MutationObserver active - will enhance new links automatically');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.trackingAppendParams = appendParametersToUrl;

  log('Global function available: window.trackingAppendParams(url)');
})();
