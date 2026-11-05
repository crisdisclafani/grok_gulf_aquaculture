/* Facility content and geometry. No measurements or operating figures are shown.
   Mapping: the dome-campus render is Phase 2 (dome, hatchery, broodstock);
   the industrial render is Phase 1. See assets/facilities/README.md. */
(function () {
  const base = (window.GA_FACILITIES_BASE || new URL("../assets/facilities", document.currentScript.src).href) + "/";
  const videoBase = (window.GA_FACILITIES_VIDEO_BASE || new URL("../assets/video", document.currentScript.src).href) + "/";
  const polygon = (id, name, points, marker, target, kind) => ({ id, name, points, marker, target, kind });
  const room = (id, name, points) => ({ id, name, points });

  window.GA_FACILITIES = {
    scenes: [
      {
        id: "phase1", tab: "Phase 1", title: "Production campus",
        image: base + "industrial-aerial.jpg", viewBox: "0 0 1600 962", fit: "contain", credit: "Client render",
        buildings: [
          polygon("p1-production", "Phase 1 · Production halls", "45,247 209,157 548,333 741,395 577,499 493,617 331,505 387,442", [415,391], "p1-production", "real"),
          polygon("p1-larval", "Phase 1 · Larval & nursery", "477,106 588,44 1108,281 956,412 794,314 827,271", [760,226], "p1-production", "real"),
          polygon("p1-weaning", "Phase 1 · Weaning", "670,514 788,424 1058,563 937,686 930,660", [867,555], "p1-production", "real"),
          polygon("p1-east", "East utility hall", "995,395 1145,263 1231,294 1343,391 1232,508", [1172,390], "utility", "concept"),
          polygon("p1-south", "South support hall", "1068,671 1143,595 1275,588 1330,615 1440,749 1365,832", [1250,710], "support", "concept"),
          polygon("p1-services", "Site services", "1252,316 1346,325 1568,670 1413,568", [1382,470], "services", "concept")
        ]
      },
      {
        id: "phase2", tab: "Phase 2", title: "Research & hatchery campus",
        image: base + "campus-dome.jpg", viewBox: "0 0 1600 735", fit: "contain", credit: "Client render",
        buildings: [
          polygon("visitor", "Visitor centre", "16,460 97,444 192,541 376,532 381,576 227,586 86,552 16,550", [194,555], "visitor", "concept"),
          polygon("p2-hatchery", "Phase 2 · Hatchery", "544,88 1146,116 1148,189 998,199 899,337 739,306 675,255 528,189", [837,205], "p2-hatchery", "real"),
          polygon("p2-broodstock", "Phase 2 · Broodstock", "1148,116 1360,149 1443,168 1468,309 1386,311 1299,296 1141,323 1138,272", [1288,235], "p2-broodstock", "real"),
          polygon("p2-pods", "Research pods", "746,298 823,300 899,337 832,321", [826,251], "pods", "concept"),
          polygon("p2-utilities", "Coastal utilities", "1383,296 1468,296 1562,324 1569,373 1442,387 1382,357", [1460,337], "services", "concept")
        ]
      },
      {
        id: "offshore", tab: "Offshore", title: "Marine grow-out",
        image: base + "../video/sea-poster.jpg", viewBox: "0 0 960 540", credit: "Generated placeholder footage",
        video: videoBase + "sea.mp4", poster: videoBase + "sea-poster.jpg",
        buildings: [
          polygon("sea-cages", "Sea cages", "15,90 245,75 420,130 680,90 945,120 945,495 650,520 355,480 15,515", [475,270], "sea-cages", "concept")
        ]
      }
    ],
    interiors: {
      "p1-production": {
        title: "Phase 1 · Ground floor", real: true, source: "Client drawing · MRC-AB-00A-02-003",
        image: base + "phase1-ground-floor.jpg", viewBox: "0 0 2400 1287",
        rooms: [
          room("p1-nursery", "Nursery tanks", "275,435 830,435 830,1100 275,1100"),
          room("p1-weaning", "Weaning tanks", "880,400 1020,400 1020,1060 880,1060"),
          room("p1-control", "Control room", "1185,665 1330,665 1330,840 1185,840"),
          room("p1-biolab", "Bio-lab", "1030,455 1200,455 1200,655 1030,655"),
          room("p1-larval", "Larval tanks", "1345,440 1815,440 1815,1080 1345,1080"),
          room("p1-algal", "Algal room", "1210,250 1440,250 1440,440 1210,440"),
          room("p1-rotifer", "Rotifer rooms", "1400,260 1620,260 1620,440 1400,440")
        ]
      },
      "p2-hatchery": {
        title: "Phase 2 · Hatchery", real: true, source: "Client drawing · HBC-SKMRC-02-AB-C-AR-001",
        image: base + "phase2-hatchery-plan.jpg", viewBox: "0 0 1800 593",
        rooms: [
          room("p2-nursery", "Nursery", "430,90 685,90 685,395 430,395"),
          room("p2-weaning", "Weaning", "685,90 915,90 915,395 685,395"),
          room("p2-larvae", "Larvae", "915,90 1205,90 1205,395 915,395"),
          room("p2-livefeed", "Algal & rotifer", "1205,90 1360,90 1360,335 1205,335"),
          room("p2-control", "Control room", "1180,335 1335,335 1335,455 1180,455"),
          room("p2-reception", "Reception", "1010,395 1180,395 1180,530 1010,530")
        ]
      },
      "p2-broodstock": {
        title: "Phase 2 · Broodstock", real: true, source: "Client drawing · HBC-SKMRC-02-AB-C-AR-001",
        image: base + "phase2-broodstock-plan.jpg", viewBox: "0 0 750 770",
        rooms: [
          room("p2-bs8", "Broodstock 8", "20,145 215,145 215,275 20,275"),
          room("p2-bs67", "Broodstock 6–7", "205,270 475,270 475,350 205,350"),
          room("p2-bs45", "Broodstock 4–5", "195,350 475,350 475,490 195,490"),
          room("p2-bs13", "Broodstock 1–3", "20,490 475,490 475,735 20,735"),
          room("p2-intake", "Sea water intake", "225,155 505,155 505,270 225,270"),
          room("p2-plant", "Plant room", "505,365 720,365 720,715 505,715")
        ]
      },
      visitor: {
        title: "Visitor centre", concept: true, svg: "visitor", viewBox: "0 0 1000 600",
        rooms: [room("visitor-reception", "Reception", "390,420 610,420 610,545 390,545"), room("visitor-gallery", "Exhibition gallery", "160,160 450,160 450,420 160,420"), room("visitor-theatre", "Presentation", "550,160 840,160 840,420 550,420")]
      },
      utility: {
        title: "Utility hall", concept: true, svg: "utility", viewBox: "0 0 1000 600",
        rooms: [room("utility-water", "Water treatment", "100,110 500,110 500,490 100,490"), room("utility-control", "Control", "560,110 900,110 900,300 560,300"), room("utility-store", "Store", "560,340 900,340 900,490 560,490")]
      },
      support: {
        title: "Support hall", concept: true, svg: "utility", viewBox: "0 0 1000 600",
        rooms: [room("support-workshop", "Workshop", "100,110 500,110 500,490 100,490"), room("support-store", "Storage", "560,110 900,110 900,490 560,490")]
      },
      services: {
        title: "Site services", concept: true, svg: "utility", viewBox: "0 0 1000 600",
        rooms: [room("services-plant", "Plant", "100,110 500,110 500,490 100,490"), room("services-control", "Electrical", "560,110 900,110 900,490 560,490")]
      },
      pods: {
        title: "Research pods", concept: true, svg: "pods", viewBox: "0 0 1000 600",
        rooms: [room("pods-lab", "Research lab", "100,150 430,150 430,450 100,450"), room("pods-collab", "Collaboration", "570,150 900,150 900,450 570,450")]
      },
      "sea-cages": {
        title: "Sea-cage system", concept: true, svg: "sea", viewBox: "0 0 1000 600",
        rooms: [room("sea-growout", "Grow-out enclosure", "110,130 650,130 650,500 110,500"), room("sea-mooring", "Mooring & access", "700,130 910,130 910,300 700,300"), room("sea-monitoring", "Monitoring", "700,340 910,340 910,500 700,500")]
      }
    }
  };
})();
