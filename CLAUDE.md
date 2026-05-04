# Wedding Invitation Website

## Purpose

This is a static wedding invitation website for **Anežka Stupková & Adam Dudek**, who are getting married on **May 23, 2026** in Lysolaje, Prague.

## What This Site Does

The website serves as a digital wedding invitation providing guests with:

- **Wedding Details**: Date, time, and location information
- **RSVP System**: QR code and link to confirmation questionnaire
- **Ceremony Information**: Details about the ceremony at Kaple Panny Marie Sedmibolestné
- **Reception Information**: Details about the reception at Osvěžovna ducha
- **Transportation**: Information about how to get to the venues
- **News & Updates**: Latest information for wedding guests
- **Contact Information**: Email addresses for questions

## Available Versions

- `index.html` - Main wedding invitation page (uses subtle/low-contrast design)
- `index-contrast.html` - High-contrast variant (legacy, does not need to be updated for now)

## Deployment

The site is hosted on GitHub Pages (`.nojekyll` file enables proper deployment).

## Technology

Simple static HTML/CSS/JavaScript website with no external dependencies or build process required.

## Local preview & screenshots

Serve with `python3 -m http.server 8766 --bind 127.0.0.1` from the repo root (port 8765 is already taken by the braindump app on this machine).

For screenshots, `google-chrome-stable --headless --disable-gpu --no-sandbox --hide-scrollbars --window-size=WxH --screenshot=PATH URL` works **but only captures the viewport** — and `.hero { min-height: 100vh }` expands to whatever height you pass, so increasing `--window-size` height does not reveal sections below the fold; it just makes the hero taller. True full-page capture would need CDP `Page.captureScreenshot { captureBeyondViewport: true }` (no `websockets` py module installed) or playwright (not installed). For below-the-fold UI verification, ask the user for a screenshot rather than fighting the tooling.
