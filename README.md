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

## Interactive facilities — cinematic v3

The explorer opens on a high cinematic aerial composite using the client architectural renders and generated offshore imagery. The visitor dome, Phase 1 and Phase 2 buildings and offshore sea structure are visible together, with nine pulsing gold/petrol hotspots. The low-poly Three.js scene has been removed; v3 uses no 3D runtime.

Buildings open the supplied real renders or cinematic generated clips/posters with Ken Burns motion, liquid/vignette transitions and responsive zone pins. Phase 1 and Phase 2 no longer display PDF drawings. Short PDF-derived zone names remain as interaction labels only, with no description panels. **All interiors are placeholders awaiting client images**; invented concept areas retain the visible `concept` tag. PDF crops remain on disk only as archived source references and are not loaded by the explorer.

`assets/facilities/aerial-masterplan.jpg` is an illustrative composite, not a survey or an as-built site plan. Standalone URL: `/embed/facilities.html`.

```html
<iframe src="https://crisdisclafani.github.io/grok_gulf_aquaculture/embed/facilities.html"
  title="Gulf Aquaculture interactive facilities"
  style="width:100%;height:720px;border:0"
  loading="lazy" allow="autoplay; fullscreen"></iframe>
```

Interaction tests: `python3 tests/test_facilities_v3.py` with the local preview server running. Set `GA_BASE` to test the publish clone or live site. Screenshots: `screenshots/facilities-v3/`; approved v1 visual references: `screenshots/facilities/`.
