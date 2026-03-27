/**
 * Portal Dark Mode — popup script
 * Toggle state and chrome.storage.sync.
 */

(function () {
  "use strict";

  const STORAGE_KEY = "playConsoleDarkMode";
  const toggle = document.getElementById("toggle");

  function isSupportedPageUrl(url) {
    if (!url) return false;
    try {
      const u = new URL(url);
      const host = u.hostname;
      if (host === "play.google.com" && u.pathname.startsWith("/console")) return true;
      if (host === "admob.google.com" || host.endsWith(".admob.google.com")) return true;
      if (host === "admob.com" || host.endsWith(".admob.com")) return true;
      if (host === "appstoreconnect.apple.com" || host.endsWith(".appstoreconnect.apple.com")) return true;
      return false;
    } catch {
      return (
        url.includes("play.google.com/console") ||
        url.includes("admob.google.com") ||
        url.includes("apps.admob.com") ||
        url.includes("appstoreconnect.apple.com")
      );
    }
  }

  /**
   * Load saved preference and update UI.
   */
  async function loadState() {
    try {
      const { [STORAGE_KEY]: enabled } = await chrome.storage.sync.get(STORAGE_KEY);
      const isEnabled = enabled === undefined ? true : enabled;
      toggle.setAttribute("aria-checked", String(isEnabled));
      return isEnabled;
    } catch {
      toggle.setAttribute("aria-checked", "true");
      return true;
    }
  }

  /**
   * Save preference and notify content scripts.
   */
  async function saveState(enabled) {
    await chrome.storage.sync.set({ [STORAGE_KEY]: enabled });
    // Tell active tab to update
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (isSupportedPageUrl(tab?.url)) {
        chrome.tabs.sendMessage(tab.id, { action: "setDarkMode", enabled }).catch(() => {});
      }
    } catch (_) {}
  }

  /**
   * Handle toggle click.
   */
  toggle.addEventListener("click", () => {
    const current = toggle.getAttribute("aria-checked") === "true";
    const next = !current;
    toggle.setAttribute("aria-checked", String(next));
    saveState(next);
  });

  loadState();
})();
