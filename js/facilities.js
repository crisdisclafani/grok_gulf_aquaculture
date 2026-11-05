/* Dependency-free cinematic facility explorer; all interiors are placeholders. */
(function () {
  const DATA = window.GA_FACILITIES;
  if (!DATA) return;
  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const pts = p => p.points || p;
  function roomPins(item) {
    const pos=[[22,32],[50,28],[76,32],[30,68],[61,65],[83,69],[50,48]];
    return `<div class="ga-room-pins" aria-label="${esc(item.title)} interactive zones">${item.rooms.map((r,i) => {
      const p=pos[i] || [50,50];
      return `<button type="button" class="ga-room-hit" data-room="${r.id}" style="left:${p[0]}%;top:${p[1]}%" aria-label="${esc(r.name)}" aria-pressed="false"><span class="ga-pulse" aria-hidden="true"></span><span class="ga-dot-ring" aria-hidden="true"></span><span class="ga-dot" aria-hidden="true"></span><span class="ga-room-name">${esc(r.name)}</span></button>`;
    }).join("")}</div>`;
  }

  function mount(el, options) {
    if (!el || el.dataset.gaFacilitiesMounted) return null;
    el.dataset.gaFacilitiesMounted = "true";
    let scene = DATA.masterplan;
    let history = [];
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

    function clearFloat() { float.classList.remove("is-visible"); float.textContent = ""; }
    function label(target, text, sticky) {
      float.textContent = text;
      float.classList.add("is-visible");
      if (target) {
        const er = el.getBoundingClientRect(), tr = target.getBoundingClientRect();
        float.style.left = Math.max(8, Math.min(er.width - 150, tr.left - er.left + tr.width / 2 - 65)) + "px";
        float.style.top = Math.max(8, tr.top - er.top - 38) + "px";
      }
    }
    function activateRooms() {
      stack.querySelectorAll(".ga-room-hit").forEach(poly => {
        const activate = () => {
          const selected = poly.getAttribute("aria-pressed") === "true";
          stack.querySelectorAll(".ga-room-hit").forEach(p => { p.classList.remove("is-selected"); p.setAttribute("aria-pressed", "false"); });
          clearFloat(); if (!selected) { poly.classList.add("is-selected"); poly.setAttribute("aria-pressed", "true"); }
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
        poly.addEventListener("pointerleave", clearFloat);
        poly.addEventListener("focus", () => label(poly, name, false));
        poly.addEventListener("blur", clearFloat);
        poly.addEventListener("click", () => openInterior(poly.dataset.building, name));
        poly.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openInterior(poly.dataset.building, name); } });
      });
    }
    function baseSeaPoster() { return DATA.scenes.find(s => s.id === "offshore").poster; }
    function renderScene(next, push) {
      if (push && scene) history.push({type:"scene", id:scene.id, title:scene.title});
      scene = next;
      el.dataset.scene = scene.id;
      crumb.textContent = scene.title;
      concept.hidden = true;
      back.hidden = history.length === 0;
      note.textContent = scene.credit;
      note.className = "ga-footnote";
      const master = scene.id === "masterplan";
      const video = scene.video ? `<video class="ga-sea-video" muted defaultmuted playsinline webkit-playsinline loop preload="metadata" poster="${scene.poster}" aria-hidden="true"><source src="${scene.video}" type="video/mp4"></video>` : "";
      stack.innerHTML = `<section class="ga-scene is-entering ga-fit-${scene.fit || (master ? "cover" : "cover")} ${master ? "ga-master-scene" : ""}" data-scene="${scene.id}"><div class="ga-media">${video}<img class="ga-scene-poster ${master ? "ga-master-campus" : ""}" src="${scene.image}" alt="${esc(scene.title)}" draggable="false">${master ? '<img class="ga-master-sea" src="'+baseSeaPoster()+'" alt="Offshore sea-cage structure" aria-hidden="true"><div class="ga-master-reveal"></div>' : ""}<div class="ga-vignette"></div><svg class="ga-hotspots" viewBox="${scene.viewBox}" preserveAspectRatio="xMidYMid ${master || scene.fit === "contain" ? "meet" : "slice"}" aria-label="Clickable buildings">${scene.buildings.map(b => `<g class="ga-building-group ${b.kind === "concept" ? "is-concept" : "is-real"}"><circle class="ga-marker-hit" cx="${b.marker[0]}" cy="${b.marker[1]}" r="24" data-building="${b.target}" data-hotspot-id="marker-${b.id}" tabindex="-1" aria-hidden="true"><title>${esc(b.name)}</title></circle><polygon class="ga-building" data-building="${b.target}" data-hotspot-id="${b.id}" points="${pts(b)}" data-click-x="${b.click ? b.click[0] : b.marker[0]}" data-click-y="${b.click ? b.click[1] : b.marker[1]}" tabindex="0" role="button" aria-label="${esc(b.name)}"><title>${esc(b.name)}</title></polygon></g>`).join("")}${scene.buildings.map(b => `<g class="ga-marker" transform="translate(${b.marker[0]} ${b.marker[1]})" aria-hidden="true"><circle class="ga-pulse" r="25"/><circle class="ga-dot-ring" r="12"/><circle class="ga-dot" r="4"/></g>`).join("")}</svg></div></section>`;
      el.querySelectorAll(".ga-scene-tab").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.goScene === scene.id)));
      bindBuildings();
      const v = stack.querySelector("video");
      if (v) { v.muted = true; v.defaultMuted = true; v.playsInline = true; if (!matchMedia("(prefers-reduced-motion:reduce)").matches) v.play().catch(() => {}); }
      requestAnimationFrame(() => requestAnimationFrame(() => stack.querySelector(".ga-scene")?.classList.remove("is-entering")));
    }
    function openInterior(id, name) {
      const item = DATA.interiors[id]; if (!item) return;
      history.push({type:"scene", id:scene.id, title:scene.title});
      clearFloat();
      crumb.textContent = (scene.tab || "Masterplan") + " / " + item.title;
      back.hidden = false;
      concept.hidden = !item.concept;
      note.textContent = "Placeholder · awaiting client images" + (item.concept ? " · concept" : "");
      note.className = "ga-footnote" + (item.real ? " ga-plan-source" : " ga-plan-source is-concept");
      const visual = item.visual || "hatchery";
      const videoBase = new URL("../assets/video/", document.querySelector('script[src*="facilities.js"]').src).href;
      const art = `<div class="ga-interior-visual"><img class="ga-interior-poster" src="${videoBase}${visual}-poster.jpg" alt="${esc(item.title)} cinematic placeholder" draggable="false"><video class="ga-interior-video" muted defaultmuted playsinline webkit-playsinline loop preload="metadata" poster="${videoBase}${visual}-poster.jpg" aria-hidden="true"><source src="${videoBase}${visual}.mp4" type="video/mp4"></video><div class="ga-interior-liquid"></div></div>`;
      clearFloat();
      stack.innerHTML = `<section class="ga-interior is-entering" data-interior="${id}"><div class="ga-plan-canvas ga-cinematic-interior">${art}${roomPins(item)}</div></section>`;
      el.querySelectorAll(".ga-scene-tab").forEach(b => b.setAttribute("aria-pressed", "false"));
      activateRooms();
      const interiorVideo=stack.querySelector('.ga-interior-video');
      if(interiorVideo){interiorVideo.muted=true;interiorVideo.defaultMuted=true;interiorVideo.playsInline=true;if(!matchMedia('(prefers-reduced-motion:reduce)').matches)interiorVideo.play().catch(()=>{});}
      requestAnimationFrame(() => requestAnimationFrame(() => stack.querySelector(".ga-interior")?.classList.remove("is-entering")));
      el.dispatchEvent(new CustomEvent("ga:interior", {detail:{id, concept:!!item.concept}}));
    }
    function goBack() {
      const prev = history.pop();
      if (!prev) return;
      const oldScene = scene;
      renderScene(prev.id === "masterplan" ? DATA.masterplan : DATA.scenes.find(s => s.id === prev.id), false);
      crumb.textContent = (oldScene.tab || "Masterplan") + " / " + oldScene.title;
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
