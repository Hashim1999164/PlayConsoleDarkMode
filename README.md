# Play Console & AdMob Dark Mode

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> Dark mode for **Google Play Console** and **Google AdMob**. A Chrome extension that adds a comfortable dark theme to play.google.com/console and admob.google.com. Toggle with one click.

**Keywords:** Chrome extension, Google Play Console, Google AdMob, AdMob dark mode, dark theme, Android developers, monetization, productivity, developer tools

**Contributions welcome!** See [CONTRIBUTING.md](CONTRIBUTING.md) for how to fork and submit pull requests.

## Features

- **Complete dark theme** – Applies to Play Console and AdMob (including admob.google.com and apps.admob.com)
- **Toggle button** – Turn dark mode on or off via the extension popup
- **Persistent preference** – Your choice is saved and synced across Chrome instances
- **Material-inspired UI** – Clean, Google-style popup design

## Installation

### From source (developer mode)

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** (top-right)
3. Click **Load unpacked**
4. Select the `GCPConsoleDarkMode` folder

### Load the extension

Point Chrome to the folder containing `manifest.json` when loading the extension.

## Usage

1. Visit [play.google.com/console](https://play.google.com/console) or [Google AdMob](https://admob.google.com/)
2. Click the extension icon in the Chrome toolbar
3. Use the toggle to enable or disable dark mode
4. If the page doesn’t update right away, refresh the tab

## Supported pages

- `play.google.com/console` and `play.google.com/console/*` (Play Console)
- `admob.google.com/*` (AdMob console; e.g. `/v2/home`)
- `apps.admob.com/*` and other `*.admob.com` subdomains where applicable

## Technical details

- **Manifest V3**
- **Permissions:** `storage`, `activeTab`, `host_permissions` for Play Console
- **Storage:** Uses `chrome.storage.sync` for preference persistence
- **Approach:** Uses CSS `filter: invert(1) hue-rotate(180deg)` to darken the page—avoids DOM-specific overrides that can cause black screens on SPAs

## Project structure

```
GCPConsoleDarkMode/
├── manifest.json       # Extension manifest (Manifest V3)
├── LICENSE             # MIT License
├── CONTRIBUTING.md     # Contribution guidelines
├── content/
│   ├── content.js      # Injects dark mode logic, listens for toggle
│   ├── dark-mode.css   # Override-based dark theme (legacy)
│   └── dark-mode-filter.css  # Filter-based dark theme (active)
├── popup/
│   ├── popup.html      # Popup UI
│   ├── popup.css       # Popup styles
│   └── popup.js        # Toggle logic, storage sync
├── icons/
│   ├── icon.svg        # Source icon
│   ├── icon16.png      # 16×16 toolbar icon
│   ├── icon48.png      # 48×48 management page icon
│   └── icon128.png     # 128×128 Chrome Web Store icon
└── README.md
```

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
