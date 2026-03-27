/**
 * Portal Dark Mode — content script
 * Applies dark theme on supported publisher/developer portal origins.
 * Persists preference via chrome.storage.sync.
 */

(function () {
  "use strict";

  const STORAGE_KEY = "playConsoleDarkMode";
  const DARK_CLASS = "portal-dark-mode";
  const HOST_ALT_CLASS = "portal-host-alt";

  function usesHostAltStylesheet() {
    try {
      const h = location.hostname;
      return h === "appstoreconnect.apple.com" || h.endsWith(".appstoreconnect.apple.com");
    } catch {
      return false;
    }
  }

  /** Alternate host tuning (see dark-mode-asc.css). */
  function syncHostClass() {
    const root = document.documentElement;
    if (usesHostAltStylesheet()) {
      root.classList.add(HOST_ALT_CLASS);
    } else {
      root.classList.remove(HOST_ALT_CLASS);
    }
  }

  /**
   * Apply or remove dark mode based on enabled state.
   */
  function setDarkMode(enabled) {
    syncHostClass();
    if (enabled) {
      document.documentElement.classList.add(DARK_CLASS);
    } else {
      document.documentElement.classList.remove(DARK_CLASS);
    }
  }

  /**
   * Load saved preference and apply.
   */
  async function init() {
    try {
      const { [STORAGE_KEY]: enabled } = await chrome.storage.sync.get(STORAGE_KEY);
      // Default to true on first install (undefined); false only when explicitly set
      const isEnabled = enabled === undefined ? true : enabled;
      setDarkMode(isEnabled);
      return isEnabled;
    } catch (e) {
      setDarkMode(true);
      return true;
    }
  }

  /**
   * Listen for storage changes (e.g. from popup toggle).
   */
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === "sync" && changes[STORAGE_KEY]) {
      const next = changes[STORAGE_KEY].newValue;
      setDarkMode(next === undefined ? true : next);
    }
  });

  /**
   * Handle messages from popup for immediate toggle.
   */
  chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg.action === "setDarkMode" && typeof msg.enabled === "boolean") {
      setDarkMode(msg.enabled);
      sendResponse({ ok: true });
    }
    return true;
  });

  syncHostClass();

  /**
   * Apply immediately on load.
   */
  init();
})();
