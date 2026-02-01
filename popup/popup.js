/**
 * Play Console Dark Mode - Popup Script
 * Manages toggle state and persists to chrome.storage.sync.
 */

(function () {
  "use strict";

  const STORAGE_KEY = "playConsoleDarkMode";
  const toggle = document.getElementById("toggle");

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
      if (tab?.url?.includes("play.google.com/console")) {
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
