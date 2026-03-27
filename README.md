# Portal Dark Mode

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> A Chrome extension that adds a **comfortable dark theme** to common **web-based publisher and developer portals**—the kind you use to ship apps, manage ads, and handle store listings. Toggle from the toolbar; your choice **syncs** across Chrome (when signed in).

**Keywords:** Chrome extension, dark mode, developer portal, publisher console, app store tools, web UI, productivity, accessibility

**Contributions welcome!** See [CONTRIBUTING.md](CONTRIBUTING.md).

## Features

- **Dark theme** on supported HTTPS origins (filter-based, tuned for large single-page apps)
- **Toolbar toggle** with a simple popup
- **Persistent preference** via `chrome.storage.sync`
- **Clean popup UI** inspired by common Material-style patterns

## Installation

### Load unpacked (development)

1. Open Chrome → `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Choose the folder that contains this project’s `manifest.json`

## Usage

1. Open a **supported** portal in a tab (see list below)
2. Click the extension icon
3. Use the **Dark mode** switch
4. Refresh the tab if the page doesn’t pick up the change immediately

## Supported origins

Host permissions are limited to these patterns (and closely related subdomains where noted):

| Pattern | Notes |
|--------|--------|
| `https://play.google.com/console*` | Google Play — `/console` routes |
| `https://*.play.google.com/*` | As required for console assets |
| `https://admob.google.com/*`, `https://*.admob.google.com/*` | Google mobile ads publisher UI |
| `https://apps.admob.com/*`, `https://*.admob.com/*` | Related ad platform hosts |
| `https://appstoreconnect.apple.com/*`, `https://*.appstoreconnect.apple.com/*` | Apple app publishing portal |

**Sign-in flows** that open on **other domains** (e.g. central identity pages) are **not** covered; the theme applies again once you’re back on a matched origin above.

## Technical details

- **Manifest V3**
- **Permissions:** `storage`, `activeTab`, plus narrow `host_permissions` for the table above
- **Default styling:** `content/dark-mode-filter.css` — `invert(0.88)` + `hue-rotate(180deg)` with counter-invert on common media types (avoids a flat black screen on very light UIs)
- **Alternate tuning:** `content/dark-mode-asc.css` — on hosts that use `portal-host-alt` (see `content.js`), enables a slightly softer invert, `color-scheme: dark`, scrollbars, and extra media selectors
- **Legacy override stylesheet:** `content/dark-mode.css` (not injected by default; kept for reference or experiments)

## Project structure

```
├── manifest.json
├── LICENSE
├── CONTRIBUTING.md
├── content/
│   ├── content.js
│   ├── dark-mode.css          # legacy overrides (optional)
│   ├── dark-mode-filter.css   # default filter theme
│   └── dark-mode-asc.css      # alternate host tuning
├── popup/
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
├── icons/
└── README.md
```

## License

MIT — see [LICENSE](LICENSE).
