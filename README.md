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

## Interactive facilities — 3D v2

The explorer starts from a real-time aerial coastal masterplan containing the Phase 1 halls, Phase 2 hatchery/broodstock, visitor dome and offshore sea cages together. Three.js r160 is bundled locally with its MIT licence; no CDN or external runtime requests are used.

Buildings open low-poly 3D environments inspired by the supplied PDF layouts. Water surfaces use a lightweight animated shader, with gold pipework, walkways, camera fly-in and clickable zone focus. **Every interior is a placeholder awaiting client images, not an as-built model.** Concept interiors retain their visible `concept` tag. PDF drawings are retained only as archived source references and are never displayed in the explorer.

Drag to orbit, pinch/scroll to zoom, or use the accessible building/zone buttons. DPR is capped, geometry is low-poly, and WebGL failure provides static illustrated navigation. Standalone URL: `/embed/facilities.html`.

```html
<iframe src="https://crisdisclafani.github.io/grok_gulf_aquaculture/embed/facilities.html"
  title="Gulf Aquaculture interactive facilities"
  style="width:100%;height:720px;border:0"
  loading="lazy" allow="autoplay; fullscreen"></iframe>
```

Desktop/mobile/fallback interaction tests: `python3 tests/test_facilities_v2.py` with the included local preview server running. Screenshots: `screenshots/facilities-v2/`.
