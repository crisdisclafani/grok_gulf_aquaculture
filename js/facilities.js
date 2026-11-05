/* Self-contained, dependency-free facility explorer.
   Concept SVG plans below are deliberately illustrative, not client drawings. */
(function () {
  const DATA = window.GA_FACILITIES;
  if (!DATA) return;
  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const pts = p => p.points || p;
  let instance = 0;

  function conceptArt(kind) {
    const grid = `<defs><pattern id="gaGrid${instance}" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#B39257" stroke-opacity=".1"/></pattern><radialGradient id="gaWater${instance}"><stop stop-color="#388b8a" stop-opacity=".36"/><stop offset="1" stop-color="#0b2e3f" stop-opacity=".08"/></radialGradient></defs><rect width="1000" height="600" fill="url(#gaGrid${instance})"/>`;
    if (kind === "visitor") return grid + `<path d="M500 50C225 50 80 190 80 350s145 205 420 205 420-110 420-205S775 50 500 50Z" fill="#fff" stroke="#B39257" stroke-width="3"/><path d="M500 50v370M170 140l220 280M830 140L610 420M80 350h840" fill="none" stroke="#0b2e3f" stroke-opacity=".25"/><path d="M110 160h330v260H110M560 160h330v260H560M390 420h220v125H390" fill="#0b2e3f" fill-opacity=".04" stroke="#0b2e3f" stroke-width="2"/><path d="M230 225h110m-110 55h110m-110 55h110M650 205l95 55-95 55Z" fill="none" stroke="#B39257" stroke-width="3"/>`;
    if (kind === "pods") return grid + `<rect x="70" y="120" width="390" height="360" rx="85" fill="#fff" stroke="#B39257" stroke-width="3"/><rect x="540" y="120" width="390" height="360" rx="85" fill="#fff" stroke="#B39257" stroke-width="3"/><path d="M460 285h80M265 120v360M735 120v360" stroke="#0b2e3f" stroke-opacity=".35" stroke-width="2"/><circle cx="265" cy="300" r="68" fill="none" stroke="#388b8a" stroke-width="3"/><path d="M650 260h170M650 320h170" stroke="#B39257" stroke-width="3"/>`;
    if (kind === "sea") return grid + `<rect width="1000" height="600" fill="url(#gaWater${instance})"/><g fill="none" stroke="#B39257" stroke-width="4"><ellipse cx="380" cy="315" rx="270" ry="190"/><ellipse cx="380" cy="315" rx="220" ry="150" stroke-opacity=".5"/><path d="M110 315h540M380 125v380M700 180h210v100H700zM700 375h210v100H700z"/></g><g fill="#388b8a" opacity=".65"><path d="M240 290q35-30 70 0-35 30-70 0m0 0-22-18v36Z"/><path d="M380 355q35-30 70 0-35 30-70 0m0 0-22-18v36Z"/><path d="M390 235q35-30 70 0-35 30-70 0m0 0-22-18v36Z"/></g><path d="M650 250l50-45M650 380l50 45" stroke="#B39257" stroke-width="3" stroke-dasharray="7 7"/>`;
    return grid + `<rect x="70" y="80" width="860" height="440" fill="#fff" stroke="#B39257" stroke-width="3"/><path d="M100 110h400v380H100zM560 110h340v180H560zM560 340h340v150H560z" fill="#0b2e3f" fill-opacity=".035" stroke="#0b2e3f" stroke-width="2"/><g fill="none" stroke="#388b8a" stroke-width="3"><circle cx="220" cy="230" r="55"/><circle cx="380" cy="230" r="55"/><circle cx="220" cy="390" r="55"/><circle cx="380" cy="390" r="55"/></g><path d="M610 165h240M610 215h190M610 395h240M610 445h150" stroke="#B39257" stroke-width="3"/>`;
  }

  function svgForRooms(item, prefix) {
    return `<svg class="ga-room-svg" viewBox="${item.viewBox}" preserveAspectRatio="xMidYMid meet" aria-label="${esc(item.title)} interactive plan">${item.rooms.map(r => `<polygon class="ga-room" data-room="${r.id}" points="${pts(r)}" tabindex="0" role="button" aria-label="${esc(r.name)}" aria-pressed="false"><title>${esc(r.name)}</title></polygon>`).join("")}</svg>`;
  }

  function mount(el, options) {
    if (!el || el.dataset.gaFacilitiesMounted) return null;
    el.dataset.gaFacilitiesMounted = "true";
    instance++;
    let scene = DATA.scenes.find(s => s.id === options.scene) || DATA.scenes[0];
    let history = [];
    let currentLabel = "";
    el.classList.add("ga-facilities");
    el.setAttribute("role", "region");
    el.setAttribute("aria-label", "Interactive Gulf Aquaculture facilities");
    el.innerHTML = `<div class="ga-topline"><button class="ga-back" type="button" aria-label="Back to facilities" hidden><span aria-hidden="true">←</span><span>Back</span></button><div class="ga-breadcrumb" aria-live="polite">Facilities</div><span class="ga-concept-tag" hidden>concept</span><button class="ga-close" type="button" aria-label="Close facilities" ${options.standalone ? "hidden" : ""}>×</button></div><div class="ga-viewport"><div class="ga-scene-stack"></div><div class="ga-float-label" aria-hidden="true"></div></div><nav class="ga-scene-nav" aria-label="Facility scenes">${DATA.scenes.map(s => `<button class="ga-scene-tab" data-go-scene="${s.id}" type="button" aria-pressed="${s.id===scene.id}">${esc(s.tab)}</button>`).join("")}</nav><div class="ga-footnote"></div>`;
    const stack = el.querySelector(".ga-scene-stack");
    const back = el.querySelector(".ga-back");
    const crumb = el.querySelector(".ga-breadcrumb");
    const concept = el.querySelector(".ga-concept-tag");
    const float = el.querySelector(".ga-float-label");
    const note = el.querySelector(".ga-footnote");
    let transitionTimer = 0;

    function clearFloat() { float.classList.remove("is-visible"); float.textContent = ""; }
    function label(target, text, sticky) {
      currentLabel = sticky ? text : "";
      float.textContent = text;
      float.classList.add("is-visible");
      if (target) {
        const er = el.getBoundingClientRect(), tr = target.getBoundingClientRect();
        float.style.left = Math.max(8, Math.min(er.width - 150, tr.left - er.left + tr.width / 2 - 65)) + "px";
        float.style.top = Math.max(8, tr.top - er.top - 38) + "px";
      }
    }
    function activateRooms() {
      stack.querySelectorAll(".ga-room").forEach(poly => {
        const activate = () => {
          const selected = poly.getAttribute("aria-pressed") === "true";
          stack.querySelectorAll(".ga-room").forEach(p => { p.classList.remove("is-selected"); p.setAttribute("aria-pressed", "false"); });
          if (!selected) { poly.classList.add("is-selected"); poly.setAttribute("aria-pressed", "true"); label(null, poly.getAttribute("aria-label"), true); }
          else clearFloat();
        };
        poly.addEventListener("click", activate);
        poly.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(); } });
      });
    }
    function bindBuildings() {
      stack.querySelectorAll(".ga-building, .ga-marker-hit").forEach(poly => {
        const name = poly.getAttribute("aria-label") || poly.querySelector("title")?.textContent || "Facility";
        poly.addEventListener("pointerenter", () => label(poly, name, false));
        poly.addEventListener("pointerleave", () => { if (!currentLabel) clearFloat(); });
        poly.addEventListener("focus", () => label(poly, name, false));
        poly.addEventListener("blur", clearFloat);
        poly.addEventListener("click", () => openInterior(poly.dataset.building, name));
        poly.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openInterior(poly.dataset.building, name); } });
      });
    }
    function renderScene(next, push) {
      clearTimeout(transitionTimer);
      if (push && scene) history.push({type:"scene", id:scene.id, title:scene.title});
      scene = next;
      el.dataset.scene = scene.id;
      crumb.textContent = scene.title;
      concept.hidden = true;
      back.hidden = history.length === 0;
      note.textContent = scene.credit;
      note.className = "ga-footnote";
      const video = scene.video ? `<video class="ga-sea-video" muted defaultmuted playsinline webkit-playsinline loop preload="metadata" poster="${scene.poster}" aria-hidden="true"><source src="${scene.video}" type="video/mp4"></video>` : "";
      stack.innerHTML = `<section class="ga-scene is-entering ga-fit-${scene.fit || "cover"}" data-scene="${scene.id}"><div class="ga-media">${video}<img class="ga-scene-poster" src="${scene.image}" alt="${esc(scene.title)}" draggable="false"><div class="ga-vignette"></div><svg class="ga-hotspots" viewBox="${scene.viewBox}" preserveAspectRatio="xMidYMid ${scene.fit === "contain" ? "meet" : "slice"}" aria-label="Clickable buildings">${scene.buildings.map(b => `<g class="ga-building-group ${b.kind === "concept" ? "is-concept" : "is-real"}"><circle class="ga-marker-hit" cx="${b.marker[0]}" cy="${b.marker[1]}" r="24" data-building="${b.target}" data-hotspot-id="marker-${b.id}" tabindex="-1" aria-hidden="true"><title>${esc(b.name)}</title></circle><polygon class="ga-building" data-building="${b.target}" data-hotspot-id="${b.id}" points="${pts(b)}" data-click-x="${b.click ? b.click[0] : b.marker[0]}" data-click-y="${b.click ? b.click[1] : b.marker[1]}" tabindex="0" role="button" aria-label="${esc(b.name)}"><title>${esc(b.name)}</title></polygon></g>`).join("")}${scene.buildings.map(b => `<g class="ga-marker" transform="translate(${b.marker[0]} ${b.marker[1]})" aria-hidden="true"><circle class="ga-pulse" r="25"/><circle class="ga-dot-ring" r="12"/><circle class="ga-dot" r="4"/></g>`).join("")}</svg></div></section>`;
      el.querySelectorAll(".ga-scene-tab").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.goScene === scene.id)));
      bindBuildings();
      const v = stack.querySelector("video");
      if (v) { v.muted = true; v.defaultMuted = true; v.playsInline = true; if (!matchMedia("(prefers-reduced-motion:reduce)").matches) v.play().catch(() => {}); }
      requestAnimationFrame(() => requestAnimationFrame(() => stack.querySelector(".ga-scene")?.classList.remove("is-entering")));
    }
    function openInterior(id, name) {
      const item = DATA.interiors[id]; if (!item) return;
      history.push({type:"scene", id:scene.id, title:scene.title});
      clearTimeout(transitionTimer); clearFloat();
      crumb.textContent = scene.tab + " / " + item.title;
      back.hidden = false;
      concept.hidden = !item.concept;
      note.textContent = item.real ? item.source : "Illustrative interior · layout to be confirmed";
      note.className = "ga-footnote" + (item.real ? " ga-plan-source" : " ga-plan-source is-concept");
      const art = item.image ? `<img class="ga-plan-image" src="${item.image}" alt="${esc(item.title)} client drawing" draggable="false">` : `<svg class="ga-concept-art" viewBox="${item.viewBox}" aria-hidden="true">${conceptArt(item.svg)}</svg>`;
      clearFloat();
      stack.innerHTML = `<section class="ga-interior is-entering" data-interior="${id}"><div class="ga-plan-canvas">${art}${svgForRooms(item)}</div></section>`;
      el.querySelectorAll(".ga-scene-tab").forEach(b => b.setAttribute("aria-pressed", "false"));
      activateRooms();
      requestAnimationFrame(() => requestAnimationFrame(() => stack.querySelector(".ga-interior")?.classList.remove("is-entering")));
      el.dispatchEvent(new CustomEvent("ga:interior", {detail:{id, concept:!!item.concept}}));
    }
    function goBack() {
      const prev = history.pop();
      if (!prev) return;
      const oldScene = scene;
      renderScene(DATA.scenes.find(s => s.id === prev.id), false);
      crumb.textContent = oldScene.tab + " / " + oldScene.title;
      if (history.length === 0) crumb.textContent = scene.title;
      back.hidden = history.length === 0;
    }
    back.addEventListener("click", goBack);
    el.querySelector(".ga-close").addEventListener("click", () => options.onClose?.());
    el.querySelectorAll("[data-go-scene]").forEach(b => b.addEventListener("click", () => { history = []; renderScene(DATA.scenes.find(s => s.id === b.dataset.goScene), false); }));
    document.addEventListener("keydown", e => { if (e.key === "Escape" && el.isConnected && history.length) goBack(); });
    renderScene(scene, false);
    return { showScene: id => { const s=DATA.scenes.find(x=>x.id===id); if(s){history=[];renderScene(s,false);} }, open: openInterior, back: goBack };
  }
  window.GAFacilities = { mount, data: DATA };
  document.querySelectorAll("[data-ga-facilities]").forEach(el => mount(el, {standalone:true, scene:el.dataset.scene}));
})();
