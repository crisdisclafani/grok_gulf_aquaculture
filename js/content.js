/* ==========================================================
   CONTENT MODEL — every text on the site lives here.
   In the future CMS each object maps to an editable entity:
   audiences, pages (sections), blocks (cards / lists / placeholders).
   "PH" = placeholder text still to be supplied by Gulf Aquaculture.
   ========================================================== */
const PH = "[Placeholder — content to be supplied by Gulf Aquaculture]";
window.SITE = {
  audiences: [
    { id:"operators", label:"Farms & Operators", who:"Aquaculture farms and operators",
      intro:"Production capacity, species availability, fry quality, biosecurity, technical capabilities and commercial enquiries.",
      links:[["Production capacity","#operations"],["Species availability","#species"],["Fry quality","#species"],["Biosecurity","#science"],["Technical capabilities","#science"],["Commercial enquiries","#contact"]] },
    { id:"government", label:"Government & Investors", who:"Government authorities and investors",
      intro:"Food security, regional production capacity, infrastructure, sustainability and strategic importance.",
      links:[["Food security","#sustainability"],["Regional production capacity","#operations"],["Infrastructure","#operations"],["Sustainability","#sustainability"],["Strategic importance","#sustainability"]] },
    { id:"research", label:"Universities & Research", who:"Universities and research institutions",
      intro:"Scientific expertise, laboratory capabilities, research programmes and opportunities for collaboration.",
      links:[["Scientific expertise","#science"],["Laboratory capabilities","#research"],["Research programmes","#research"],["Collaboration opportunities","#contact"]] }
  ],
  hero:{ eyebrow:"Arabian Gulf · Marine Aquaculture",
    title:"Transforming Marine Aquaculture Through Science, Technology and Sustainable Production.",
    text:"More than a commercial fish hatchery — an integrated aquaculture operation and a regional centre of excellence in marine aquaculture, biotechnology and scientific research." },
  cycle:["Broodstock Management","Spawning & Larval Development","Live Feed & Hatchery Production","Nursery & Fry Conditioning","Marine Farming & Grow-Out Operations"],
  pillars:["Large-scale marine hatchery production","Marine biotechnology and biological research","Species development and broodstock management","Advanced laboratory facilities","Offshore marine fish-farming operations","Sustainable aquaculture practices","Regional food-security initiatives","Scientific collaboration and innovation"],
  stats:[["—","Fry produced per year"],["—","Species in production"],["—","Sea cages operated"],["—","Research partnerships"]],
  sections:[
    { id:"about", nav:"About", title:"About Us", template:"Corporate Overview", audiences:[],
      lead:"The evolution of Gulf Aquaculture and its ambition to become a leading regional platform for marine aquaculture.",
      cards:[["Our Story",PH],["Vision & Mission",PH],["Our Leadership & Team","Employee profiles and short interviews. "+PH],["Our Approach to Aquaculture",PH],["Our Regional Role",PH],["Our Achievements",PH]],
      placeholder:"Employee interview video carousel — short portrait clips with subtitles, autoplay muted on hover." },
    { id:"operations", nav:"Operations", title:"Our Operations & Facilities", template:"Facility Overview", audiences:["operators","government"],
      lead:"The scale of our infrastructure, scientific capabilities and operational footprint — land-based hatcheries, research facilities and offshore marine farming.",
      cards:[
        ["Sheikh Khalifa Marine Research Centre (SKMRC)","Facility overview · Hatchery and nursery capabilities · Laboratory infrastructure · Marine Innovation Park · Research facilities · Scientific collaboration opportunities.",["research"]],
        ["Balghailam Island Hatchery","Facility overview · Production capabilities · Broodstock facilities · Larval rearing · Nursery operations · Laboratory and water-quality infrastructure.",["operators"]],
        ["Delma Island — Marine Fish Farming","Marine fish cages operated at Delma Island under contract with the Environment Agency – Abu Dhabi. Sea-cage infrastructure · Species and production · Operational management · Environmental monitoring.",["operators","government"]],
        ["Khorfakkan — Marine Fish Farming","A large number of marine fish cages at Khorfakkan, on the UAE’s east coast, under contract with the Environment Agency – Abu Dhabi.",["operators","government"]],
        ["Infrastructure & Technology","Recirculating Aquaculture Systems (RAS) · Water intake and filtration · Water-quality monitoring · Biosecurity systems · Live-feed production · Environmental management.",["operators","government"]]],
      placeholder:"Interactive facility map of the UAE — pins for SKMRC, Balghailam Island, Delma Island and Khorfakkan; each opens an aerial video intro and facility diagram." },
    { id:"species", nav:"Species", title:"Species", template:"Species Profile", audiences:["operators"],
      lead:"Why locally adapted species offer significant advantages for aquaculture operations in the Gulf.",
      species:[["Orange-Spotted Grouper","Hamoor"],["Malabar Red Snapper","Hamra"],["Mangrove Red Snapper","Shiqra"],["Seabream",""],["Other Species & Development Programmes",""]],
      speciesFields:["Scientific and common names","Biological characteristics","Habitat and distribution","Environmental tolerances","Farming characteristics","Production methodology","Fry availability and specifications"],
      placeholder:"Interactive regional distribution map — species range shaded across the Gulf, filterable per species." },
    { id:"science", nav:"Science & Technology", title:"Science & Technology", template:"Technical Capabilities", audiences:["operators","research"],
      lead:"A science-led operation — complex processes made understandable to operators, government and researchers without compromising scientific credibility.",
      cards:[["Marine Biology & Biotechnology",PH],["Broodstock Management",PH],["Larval Development",PH],["Live Feed Systems",PH],["Microbiology & Virology",PH],["Water Quality & Environmental Monitoring",PH],["Biosecurity & Fish Health",PH,["operators"]],["Sustainable Production Technologies",PH]],
      placeholder:"Animated scientific diagrams — microscopic larval development and live-feed culture visualised (AI-assisted visualisation, labelled as such)." },
    { id:"research", nav:"Research", title:"Research & Innovation", template:"Research & Innovation", audiences:["research"],
      lead:"SKMRC as a platform for regional and international scientific collaboration — for universities, research institutions, visiting researchers and aquaculture specialists.",
      cards:[["Sheikh Khalifa Marine Research Centre",PH],["Marine Innovation Park",PH],["Research Programmes",PH],["Academic Partnerships",PH],["Scientific Publications",PH],["Research Collaboration","Information for visiting researchers and institutional enquiries. "+PH],["Innovation & Development",PH]],
      placeholder:"Laboratory walkthrough video — slow tracking shots across SKMRC labs with scroll-linked captions." },
    { id:"sustainability", nav:"Sustainability", title:"Sustainability & Food Security", template:"Sustainability", audiences:["government"],
      lead:"Connecting our commercial activities with sustainable seafood production and national food security.",
      cards:[["UAE Food Security",PH],["Sustainable Aquaculture",PH],["Local Species & Environmental Adaptation",PH],["Reducing Dependence on Imported Fry",PH],["Marine Ecosystem Protection",PH],["Responsible Production",PH],["Regional Aquaculture Development",PH]],
      placeholder:"Scroll-driven ecosystem animation — from reef to sea cage to plate, with animated food-security indicators." },
    { id:"news", nav:"News", title:"News & Insights", template:"News & Insights", audiences:[],
      lead:"Articles, announcements, photographs and videos published by the Gulf Aquaculture team through the CMS.",
      news:[["Company News","Headline placeholder"],["Research & Scientific Publications","Headline placeholder"],["Events & Conferences","Headline placeholder"]],
      tags:["Company News","Industry Developments","Research & Scientific Publications","Projects & Partnerships","Events & Conferences","Media Gallery"] },
  ],
  enquiries:[["Commercial Aquaculture Enquiries","operators"],["Fry Orders & Availability","operators"],["Government & Institutional Partnerships","government"],["Investment & Strategic Partnerships","government"],["Research & Academic Collaboration","research"],["General Enquiries",""]]
};
