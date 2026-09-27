# Threadline

A Chrome Manifest V3 extension that turns your research browsing into a local, editable reading roadmap.

## What it does

- Start a named research thread in the popup.
- After 20 seconds on an ordinary web page, Threadline automatically saves its URL, title, and a short on-page or meta-description preview.
- Use **Save to this thread** to capture immediately.
- Revisiting a source updates it instead of creating a duplicate.
- Open the dashboard to see the saved sources in reading order.

All data stays in `chrome.storage.local`; this version has no backend, accounts, analytics, or AI API calls.

## Install locally

1. Open `chrome://extensions` in Chrome (or any Chromium browser).
2. Enable **Developer mode**.
3. Choose **Load unpacked** and select this folder.
4. Pin **Roadmap / Threadline**, set a research topic, then browse.

Chrome deliberately prevents extensions from reading protected browser pages, extension pages, and some store pages. Those pages are skipped.
