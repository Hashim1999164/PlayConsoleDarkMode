# Developer Consoles Dark Mode

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> Dark mode for **Google Play Console**, **Google AdMob**, and **Apple App Store Connect**. One extension for play.google.com/console, admob.google.com, and appstoreconnect.apple.com. Toggle with one click.

**Keywords:** Chrome extension, Google Play Console, Google AdMob, App Store Connect, Apple developer, dark mode, dark theme, iOS, Android, monetization, productivity

**Contributions welcome!** See [CONTRIBUTING.md](CONTRIBUTING.md) for how to fork and submit pull requests.

## Features

- **Complete dark theme** – Play Console, AdMob, and App Store Connect (`appstoreconnect.apple.com`)
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

1. Visit [Play Console](https://play.google.com/console), [AdMob](https://admob.google.com/), or [App Store Connect](https://appstoreconnect.apple.com/)
2. Click the extension icon in the Chrome toolbar
3. Use the toggle to enable or disable dark mode
4. If the page doesn’t update right away, refresh the tab

## Supported pages

- `play.google.com/console` and `play.google.com/console/*` (Play Console)
- `admob.google.com/*` (AdMob console; e.g. `/v2/home`)
- `apps.admob.com/*` and other `*.admob.com` subdomains where applicable
- `appstoreconnect.apple.com/*` (App Store Connect; e.g. `/login` and dashboard after sign-in)

**Note:** Apple ID sign-in may open on a separate Apple domain (e.g. `appleid.apple.com` or `idmsa.apple.com`). That flow is not covered by this extension; dark mode applies on `appstoreconnect.apple.com` after you return.

## Technical details

- **Manifest V3**
- **Permissions:** `storage`, `activeTab`, `host_permissions` for the supported developer sites
- **Storage:** Uses `chrome.storage.sync` for preference persistence
- **Approach:** CSS `filter: invert(0.88) hue-rotate(180deg)` (with image counter-invert) on Play Console / AdMob; **App Store Connect** gets an extra `dark-mode-asc.css` (softer invert `0.86`, `color-scheme: dark`, scrollbars, `picture`/`object`/`embed` handling) when the host is `appstoreconnect.apple.com`

## Project structure

```
GCPConsoleDarkMode/
├── manifest.json       # Extension manifest (Manifest V3)
├── LICENSE             # MIT License
├── CONTRIBUTING.md     # Contribution guidelines
├── content/
│   ├── content.js      # Injects dark mode logic, listens for toggle
│   ├── dark-mode.css   # Override-based dark theme (legacy)
│   ├── dark-mode-filter.css  # Filter-based dark theme (active)
│   └── dark-mode-asc.css     # App Store Connect tweaks
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
