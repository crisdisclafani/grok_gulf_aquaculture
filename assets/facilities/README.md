# Facility source mapping

## Phase 1 — `industrial-aerial.jpg`

**Mapping caveat:** the supplied ground-floor PDF does not explicitly key each rendered roof to a named hall. The three production-roof hotspots therefore open the same complete client drawing. Their individual roof-to-room associations are provisional and should be confirmed by the client before the demo is treated as an as-built navigation map.
The client aerial with the red site boundary and large industrial halls is treated as Phase 1. Its production hotspots open `phase1-ground-floor.jpg`, cropped from `(1850,1250)–(3900,2350)` of the 5617×3974 render of the client **GROUND FLOOR PLAN**, drawing **MRC-AB-00A-02-003**, dated 15-03-2015. Labels used as room hotspots are from that drawing: nursery tanks, weaning tanks, control room, bio-lab, larval tanks, algal room and rotifer rooms. Several production hotspots open the same overall ground-floor drawing; it is not split into invented individual-building plans.

The cleaned image is 2400×1287. Hotspots are aligned from the PDF text coordinates after accounting for its 270° page rotation.

## Phase 2 — `campus-dome.jpg`
The client render with the white visitor dome is treated as Phase 2. This matches **SITE PLAN PHASE-02 (FULL VIEW)**, drawing **HBC-SKMRC-02-AB-C-AR-001**, dated 24-08-21: the dome/administration group is at the west/left, the hatchery is central, and the broodstock hall is east/right.

- Hatchery: `phase2-hatchery-plan.jpg`, 1800×593, from crop `(180,1230)–(2700,2060)` of the 4967×3509 render — nursery, weaning, larvae, algal/rotifer, control room and reception from the drawing.
- Broodstock: `phase2-broodstock-plan.jpg`, 750×770, from crop `(2100,1180)–(2850,1950)` of the same render — broodstock groups, sea-water intake and plant room from the drawing.
- Visitor centre: `visitor` illustrated SVG **concept**, because no visitor-centre interior was supplied.

## Concept interiors
All other halls, research pods, site services and the offshore sea-cage plan use illustrative inline SVGs with a visible `concept` tag. They are not surveys or as-built layouts. The offshore visual and muted inline MP4 are the previously generated sea-cage placeholders.

## Hotspot precision
Exterior SVGs use each source image's native pixel viewBox. Their polygons follow bright roof outlines extracted from the renders. On small screens use the responsive fit; polygon and marker coordinates scale together. Room hotspots are deliberately enlarged around the small drawing labels for touch use; selecting a room only highlights it and shows its original short label.

## Standalone embed

```html
<iframe src="https://crisdisclafani.github.io/grok_gulf_aquaculture/embed/facilities.html"
  title="Gulf Aquaculture interactive facilities"
  style="width:100%;height:720px;border:0"
  loading="lazy" allow="autoplay; fullscreen"></iframe>
```

The module has no runtime dependencies, uses local fonts/media and requires no JavaScript in the parent page. Reduced-motion devices receive static transitions and no forced video playback.
