/* ==========================================================
   CONTENT MODEL — every text on the site lives here.
   Future CMS (Statamic): each object maps to an editable entity.
   "PH" = placeholder still to be supplied by Gulf Aquaculture.
   Facts used below are limited to the client company-profile PDF
   or marked as placeholders. No invented metrics.
   ========================================================== */
const PH = "[Placeholder — content to be supplied by Gulf Aquaculture]";
window.SITE = {
  brand: {
    name: "Gulf Aquaculture",
    tagline: "Science, technology and sustainable production",
    attribution: "Concept by Kriswa International",
    contactEmail: "info@gulfaquaculture.com",
    website: "https://gulfaquaculture.com",
    experienceUrl: "https://crisdisclafani.github.io/gulf-aquaculture-experience/"
  },
  audiences: [
    {
      id: "research",
      label: "Universities & Research",
      short: "Universities & R&D",
      chip: "Labs",
      who: "Universities and research institutions",
      intro: "Scientific expertise, laboratory capabilities, research programmes and opportunities for collaboration.",
      links: [
        ["Scientific expertise", "#science"],
        ["Laboratory capabilities", "#research"],
        ["Research programmes", "#research"],
        ["Collaboration opportunities", "#contact"]
      ]
    },
    {
      id: "operators",
      label: "Farms & Operators",
      short: "Commercial Operators",
      chip: "Fry stock",
      who: "Aquaculture farms and operators",
      intro: "Production capacity, species availability, fry quality, biosecurity, technical capabilities and commercial enquiries.",
      links: [
        ["Production capacity", "#operations"],
        ["Species availability", "#species"],
        ["Fry quality", "#species"],
        ["Biosecurity", "#science"],
        ["Technical capabilities", "#science"],
        ["Commercial enquiries", "#contact"]
      ]
    },
    {
      id: "government",
      label: "Government & Investors",
      short: "Government & Investors",
      chip: "Food security",
      who: "Government authorities and investors",
      intro: "Food security, regional production capacity, infrastructure, sustainability and strategic importance.",
      links: [
        ["Food security", "#sustainability"],
        ["Regional production capacity", "#operations"],
        ["Infrastructure", "#operations"],
        ["Sustainability", "#sustainability"],
        ["Strategic importance", "#sustainability"]
      ]
    }
  ],
  hero: {
    eyebrow: "Company Profile · Arabian Gulf",
    titleLead: "Transforming Aquaculture",
    titleAccent: "in the Middle East",
    text: "We exist to make aquaculture work — for our ecosystems, for food security, and for future generations. Simpler, smarter, and grounded in nature."
  },
  experience: {
    eyebrow: "Interactive experience",
    title: "Explore the operation in 3D",
    text: "A guided walkthrough of hatchery environments, underwater sea cages, laboratory facilities and marine research — from egg to harvest.",
    cta: "Open interactive experience",
    placeholder: "Full-screen immersive intro — animation / WebGL placeholder linking to the live 3D experience."
  },
  /* Five production stages — aligned with cinematic intro pearl cycle. */
  phases: [
    {
      id: "broodstock",
      short: "Broodstock",
      title: "Broodstock Management",
      color: "#388b8a",
      video: "assets/video/hatchery.mp4",
      poster: "assets/video/hatchery-poster.jpg",
      bullets: ["Genetic integrity", "Climate-controlled tanks", "Native Gulf broodstock conditioning"],
      detail: "Controlled conditioning of native Gulf broodstock. Detail copy and facility notes to be supplied.",
      processes: ["Genetic integrity programmes", "Climate-controlled tank conditioning"],
      technologies: ["Climate-controlled tanks", "Broodstock management protocols"],
      facilities: ["Balghailam Island Hatchery — Broodstock", "Sheikh Khalifa Marine Research Centre (SKMRC)"],
      params: [["Focus", "Genetic integrity"], ["Environment", "Climate-controlled tanks"], ["Status", "—"]]
    },
    {
      id: "spawning",
      short: "Spawning",
      title: "Spawning & Larval Development",
      color: "#d97724",
      video: "assets/video/hatchery.mp4",
      poster: "assets/video/hatchery-poster.jpg",
      bullets: ["Daily larval checks", "Water quality monitoring", "Early-stage rearing"],
      detail: "Early-stage rearing with continuous water-quality practice. Detail copy to be supplied.",
      processes: ["Spawning induction", "Larval development checks", "Water quality monitoring"],
      technologies: ["Larval rearing systems", "Water-quality monitoring"],
      facilities: ["Balghailam Island Hatchery — Larval rearing", "SKMRC laboratories"],
      params: [["Checks", "Daily larval"], ["Water", "Continuous monitoring"], ["Status", "—"]]
    },
    {
      id: "livefeed",
      short: "Live feed",
      title: "Live Feed & Hatchery Production",
      color: "#e59b38",
      video: "assets/video/lab.mp4",
      poster: "assets/video/lab-poster.jpg",
      bullets: ["Live feed preparation (rotifers, copepods, algae)", "Hatchery production", "Laboratory oversight"],
      detail: "Live feed systems supporting hatchery production — rotifers, copepods, algae. Detail copy to be supplied.",
      processes: ["Live feed preparation", "Hatchery production cycles"],
      technologies: ["Rotifers · copepods · algae production", "Live-feed culture systems"],
      facilities: ["Balghailam Island Hatchery — Live feed", "Infrastructure & Technology — Live-feed production"],
      params: [["Live feed", "Rotifers · copepods · algae"], ["Checks", "Daily"], ["Status", "—"]]
    },
    {
      id: "nursery",
      short: "Nursery",
      title: "Nursery & Fry Conditioning",
      color: "#B39257",
      video: "assets/video/research.mp4",
      poster: "assets/video/research-poster.jpg",
      bullets: ["Gentle weaning and scaling", "RAS + flow-through hybrid systems", "Fry conditioning for sea transfer"],
      detail: "Juveniles prepared for sea cages with minimal handling. Detail copy to be supplied.",
      processes: ["Gentle weaning and scaling", "Fry conditioning"],
      technologies: ["RAS + flow-through hybrid systems"],
      facilities: ["Balghailam Island Hatchery — Nursery", "SKMRC — Hatchery and nursery"],
      params: [["Weaning", "Gentle / staged"], ["Systems", "RAS + flow-through"], ["Status", "—"]]
    },
    {
      id: "growout",
      short: "Grow-out",
      title: "Marine Farming & Grow-Out Operations",
      color: "#0b2e3f",
      video: "assets/video/sea.mp4",
      poster: "assets/video/sea-poster.jpg",
      bullets: ["Natural light and flow", "Low stocking densities", "Minimal environmental footprint"],
      detail: "Grow-out in conditions that respect the Gulf marine environment. Detail copy to be supplied.",
      processes: ["Sea cage grow-out", "Low-density marine farming"],
      technologies: ["Marine fish cages", "Natural light and flow"],
      facilities: ["Delma Island — Marine Fish Farming", "Khorfakkan — Marine Fish Farming"],
      params: [["Light", "Natural"], ["Density", "Low stocking"], ["Footprint", "Minimal"]]
    }
  ],
  /* Journey clips for cinematic intro — PLACEHOLDER footage (generated). */
  journey: [
    { id: "hatchery", word: "Hatchery", src: "assets/video/hatchery.mp4", poster: "assets/video/hatchery-poster.jpg", note: "Placeholder footage" },
    { id: "sea", word: "Sea", src: "assets/video/sea.mp4", poster: "assets/video/sea-poster.jpg", note: "Placeholder footage" },
    { id: "science", word: "Science", src: "assets/video/lab.mp4", poster: "assets/video/lab-poster.jpg", note: "Placeholder footage" },
    { id: "research", word: "Research", src: "assets/video/research.mp4", poster: "assets/video/research-poster.jpg", note: "Placeholder footage" }
  ],
  cycleTitle: "The Production Cycle",
  cycleLead: "Five stages from broodstock to grow-out",
  cycleNote: "Continuous lab oversight · Real-time data & traceability",
  pillars: [
    "Prioritise native species like grouper and red snapper",
    "Keep upland infrastructure minimal — hatchery and nursery",
    "Move juveniles to sea cages early, reducing energy use",
    "Grow gradually through proof of concept, validation and iteration"
  ],
  stats: [
    ["—", "Fry produced per year"],
    ["—", "Species in production"],
    ["—", "Sea cages operated"],
    ["—", "Research partnerships"]
  ],
  sections: [
    {
      id: "about",
      nav: "About",
      title: "About Us",
      template: "Corporate Overview",
      audiences: [],
      lead: "From vision to operation — a region-specific approach to marine aquaculture.",
      cards: [
        ["Our Story", PH],
        ["Vision & Mission", "To nurture a sustainable future by cultivating what thrives naturally, with humility, care, and scientific rigour."],
        ["Our Leadership & Team", "Employee profiles and short interviews. " + PH],
        ["Our Approach to Aquaculture", "Local Species in Local Waters."],
        ["Our Regional Role", PH],
        ["Our Achievements", PH]
      ],
      placeholder: "Employee interview video carousel — short portrait clips with subtitles."
    },
    {
      id: "operations",
      nav: "Operations",
      title: "Our Operations & Facilities",
      template: "Facility Overview",
      audiences: ["operators", "government"],
      lead: "Facilities designed to raise healthy fish in sustainable, replicable systems.",
      cards: [
        ["Sheikh Khalifa Marine Research Centre (SKMRC)", "Facility overview · Hatchery and nursery · Laboratories · Marine Innovation Park · Research collaboration.", ["research"]],
        ["Balghailam Island Hatchery", "Hatchery and nursery site · Broodstock · Larval rearing · Live feed · Laboratory infrastructure.", ["operators"]],
        ["Delma Island — Marine Fish Farming", "Marine fish cages under contract with the Environment Agency – Abu Dhabi.", ["operators", "government"]],
        ["Khorfakkan — Marine Fish Farming", "Marine fish cages on the UAE’s east coast under contract with the Environment Agency – Abu Dhabi.", ["operators", "government"]],
        ["Infrastructure & Technology", "RAS · Water intake and filtration · Water-quality monitoring · Biosecurity · Live-feed production.", ["operators", "government"]]
      ],
      placeholder: "Interactive facility map of the UAE — pins for SKMRC, Balghailam Island, Delma Island and Khorfakkan."
    },
    {
      id: "species",
      nav: "Species",
      title: "Species",
      template: "Species Profile",
      audiences: ["operators"],
      lead: "Native Gulf species — resilient, well-adapted, and ecologically appropriate.",
      species: [
        ["Orange-Spotted Grouper", "Hamoor"],
        ["Malabar Red Snapper", "Hamra"],
        ["Mangrove Red Snapper / Shari", "Shiqra"],
        ["Seabream", ""],
        ["Other Species & Development Programmes", ""]
      ],
      speciesFields: [
        "Scientific and common names",
        "Biological characteristics",
        "Habitat and distribution",
        "Environmental tolerances",
        "Farming characteristics",
        "Production methodology",
        "Fry availability and specifications"
      ],
      placeholder: "Interactive regional distribution map — species range across the Gulf."
    },
    {
      id: "science",
      nav: "Science & Technology",
      title: "Science & Technology",
      template: "Technical Capabilities",
      audiences: ["operators", "research"],
      lead: "Where innovation meets simplicity — science-led operations explained clearly.",
      cards: [
        ["Marine Biology & Biotechnology", PH],
        ["Broodstock Management", PH],
        ["Larval Development", PH],
        ["Live Feed Systems", "Rotifers, copepods, algae production."],
        ["Microbiology & Virology", PH],
        ["Water Quality & Environmental Monitoring", PH],
        ["Biosecurity & Fish Health", "Closed-loop systems, advanced filtration, and strict protocols.", ["operators"]],
        ["Sustainable Production Technologies", PH]
      ],
      placeholder: "Animated scientific diagrams — larval development and live-feed culture."
    },
    {
      id: "research",
      nav: "Research",
      title: "Research & Innovation",
      template: "Research & Innovation",
      audiences: ["research"],
      lead: "SKMRC as a platform for regional and international scientific collaboration.",
      cards: [
        ["Sheikh Khalifa Marine Research Centre", PH],
        ["Marine Innovation Park", PH],
        ["Research Programmes", PH],
        ["Academic Partnerships", PH],
        ["Scientific Publications", PH],
        ["Research Collaboration", "Information for visiting researchers and institutional enquiries. " + PH],
        ["Innovation & Development", PH]
      ],
      placeholder: "Laboratory walkthrough video — SKMRC labs with scroll-linked captions."
    },
    {
      id: "sustainability",
      nav: "Sustainability",
      title: "Sustainability & Food Security",
      template: "Sustainability",
      audiences: ["government"],
      lead: "Sustainability built into how we think, work and grow — for people, planet and prosperity.",
      cards: [
        ["UAE Food Security", PH],
        ["Sustainable Aquaculture", PH],
        ["Local Species & Environmental Adaptation", PH],
        ["Reducing Dependence on Imported Fry", PH],
        ["Marine Ecosystem Protection", PH],
        ["Responsible Production", PH],
        ["Regional Aquaculture Development", PH]
      ],
      placeholder: "Scroll-driven ecosystem animation — from reef to sea cage to plate."
    },
    {
      id: "news",
      nav: "News",
      title: "News & Insights",
      template: "News & Insights",
      audiences: [],
      lead: "Articles, announcements, photographs and videos published through the CMS.",
      news: [
        ["Company News", "Headline placeholder"],
        ["Research & Scientific Publications", "Headline placeholder"],
        ["Events & Conferences", "Headline placeholder"]
      ],
      tags: [
        "Company News",
        "Industry Developments",
        "Research & Scientific Publications",
        "Projects & Partnerships",
        "Events & Conferences",
        "Media Gallery"
      ]
    }
  ],
  form: {
    eyebrow: "Contact & Enquiries",
    title: "Start a conversation",
    lead: "Demo form only — nothing is sent. Choose your audience pathway and areas of interest.",
    audienceLegend: "I am enquiring as",
    interestLegend: "Areas of interest",
    interests: [
      ["commercial", "Commercial aquaculture / fry orders", "operators"],
      ["government", "Government & institutional partnerships", "government"],
      ["investment", "Investment & strategic partnerships", "government"],
      ["research", "Research & academic collaboration", "research"],
      ["facilities", "Facility tours / operations", "operators"],
      ["general", "General enquiry", ""]
    ],
    thanks: "Thank you — this is a demo only. No data was sent. Gulf Aquaculture will connect the form to the CMS later.",
    privacy: "Demo validation only. Fields marked * are required."
  },
  enquiries: [
    ["Commercial Aquaculture Enquiries", "operators"],
    ["Fry Orders & Availability", "operators"],
    ["Government & Institutional Partnerships", "government"],
    ["Investment & Strategic Partnerships", "government"],
    ["Research & Academic Collaboration", "research"],
    ["General Enquiries", ""]
  ]
};
