# Gulf Aquaculture — Audiences Demo

Static HTML concept demo for Gulf Aquaculture (Kriswa International).

## Cinematic opening

The original cinematic sequence (Awakening → Journey → Cycle of five production pearls) runs inside the homepage hero. Replay is always available; `prefers-reduced-motion` / low-power falls back to a static pearl stage. **Explore facilities** opens the interactive building experience in the same hero without removing the original sequence.

### Placeholder footage

Journey clips under `assets/video/` are **generated placeholder footage** (not production photography):

| File | Label |
|------|--------|
| `hatchery.mp4` + `hatchery-poster.jpg` | Hatchery |
| `sea.mp4` + `sea-poster.jpg` | Sea |
| `lab.mp4` + `lab-poster.jpg` | Science |
| `research.mp4` + `research-poster.jpg` | Research |

Encoded as muted H.264 MP4 (`playsinline`) for Safari autoplay.

## Content

All copy lives in `js/content.js` for future Statamic mapping. No invented metrics — placeholders marked.

## Publish

Synced to `crisdisclafani/grok_gulf_aquaculture` → https://crisdisclafani.github.io/grok_gulf_aquaculture/

## Interactive facilities

Three scenes use the client Phase 1 / Phase 2 renders and the generated offshore placeholder footage. Buildings open real client plans or explicitly tagged illustrative `concept` interiors. There are no descriptive panels: just short labels, source notes and back navigation.

Standalone URL: `/embed/facilities.html`

```html
<iframe src="https://crisdisclafani.github.io/grok_gulf_aquaculture/embed/facilities.html"
  title="Gulf Aquaculture interactive facilities"
  style="width:100%;height:720px;border:0"
  loading="lazy" allow="autoplay; fullscreen"></iframe>
```

Source mapping and the Phase 1 roof-to-room caveat are documented in `assets/facilities/README.md`. Desktop/mobile interaction tests: `python3 tests/test_facilities.py` (with the included local preview server running).
