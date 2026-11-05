(function () {
  const S = window.SITE;
  const A = Object.fromEntries(S.audiences.map((a) => [a.id, a]));
  const $ = (h) => {
    const t = document.createElement("template");
    t.innerHTML = h.trim();
    return t.content;
  };
  const badge = (id) => (A[id] ? `<span class="badge a-${id}">${A[id].label}</span>` : "");
  const ph = (txt, tall) =>
    `<div class="ph${tall ? " ph-tall" : ""}" role="img" aria-label="Animation placeholder: ${txt}"><span class="ph-tag">ANIMATION PLACEHOLDER</span><p>${txt}</p></div>`;

  /* ——— Access strip (always visible) ——— */
  const access = document.createElement("div");
  access.className = "access-strip";
  access.setAttribute("role", "navigation");
  access.setAttribute("aria-label", "Audience access");
  access.innerHTML = `<div class="access-inner wrap">
    <span class="access-label">Audience portal</span>
    <div class="access-btns">${S.audiences
      .map(
        (a) =>
          `<a class="access-btn a-${a.id}" href="#for-${a.id}"><i></i><span class="ab-name">${a.short}</span><span class="ab-chip">${a.chip}</span></a>`
      )
      .join("")}</div>
  </div>`;
  document.querySelector(".site-header").after(access);

  /* ——— NAV ——— */
  const nav = document.getElementById("nav");
  nav.innerHTML = `<ul class="nav-aud">${S.audiences
    .map(
      (a) =>
        `<li class="dd a-${a.id}"><a class="aud-link" href="#for-${a.id}"><i></i>${a.label}<b class="caret" aria-hidden="true">▾</b></a><ul class="sub">${a.links
          .map((l) => `<li><a href="${l[1]}">${l[0]}</a></li>`)
          .join("")}</ul></li>`
    )
    .join("")}</ul>
<ul class="nav-main">${S.sections.map((s) => `<li><a href="#${s.id}">${s.nav}</a></li>`).join("")}<li><a href="#phases">Phases</a></li><li><a href="#experience">Experience</a></li><li><a class="cta" href="#contact">Enquiries</a></li></ul>`;

  /* ——— Phases circle SVG ——— */
  const R = 38;
  const CIRC = 2 * Math.PI * R;
  const SEG = CIRC / 5;
  const GAP = 3;
  const dash = `${SEG - GAP} ${CIRC - (SEG - GAP)}`;
  const arcs = S.phases
    .map((p, i) => {
      const offset = -(i * SEG);
      return `<circle class="phase-arc" data-idx="${i}" id="arc-${i}" cx="50" cy="50" r="${R}" fill="none" stroke="${p.color}" stroke-width="8" stroke-dasharray="${dash}" stroke-dashoffset="${offset}" tabindex="0" role="button" aria-label="Phase ${i + 1}: ${p.title}" aria-pressed="${i === 0 ? "true" : "false"}"></circle>`;
    })
    .join("");

  /* ——— MAIN ——— */
  let h = "";

  h += `<section id="home" class="hero">
  <div class="hero-visual" aria-hidden="true">
    <div class="hero-photo"></div>
    <svg class="fish-mark" viewBox="0 0 200 120" fill="none"><path d="M20 60 C60 10, 140 10, 180 60 C140 110, 60 110, 20 60" stroke="url(#gFish)" stroke-width="1.6"/><path d="M40 60 C80 25, 130 25, 170 60 C130 95, 80 95, 40 60" stroke="url(#gFish)" stroke-width="1.2" opacity=".7"/><defs><linearGradient id="gFish" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#d97724"/><stop offset="1" stop-color="#B39257"/></linearGradient></defs></svg>
  </div>
  <div class="hero-inner">
    <span class="tag"><i></i>${S.hero.eyebrow}</span>
    <h1>${S.hero.titleLead}<em>${S.hero.titleAccent}</em></h1>
    <div class="gold-thread" aria-hidden="true">✦</div>
    <p class="lead">${S.hero.text}</p>
    <p class="byline">${S.brand.attribution}</p>
    <div class="hero-cta">
      <a class="btn" href="#phases">Explore production stages</a>
      <a class="btn btn-ghost" href="#experience">Interactive experience</a>
      <button type="button" class="btn btn-ghost hero-replay" id="hero-replay">Replay opening</button>
    </div>
  </div>
</section>`;

  h += `<section class="selector wrap" aria-labelledby="iam">
  <span class="tag"><i></i>Find your pathway</span>
  <h2 id="iam">I am <em>a…</em></h2>
  <div class="gold-thread" aria-hidden="true">✦</div>
  <div class="aud-grid">${S.audiences
    .map(
      (a) =>
        `<a class="aud-card a-${a.id}" href="#for-${a.id}"><span class="dot"></span><h3>${a.who}</h3><p>${a.intro}</p><ul class="topics">${a.links
          .map((l) => `<li>${l[0]}</li>`)
          .join("")}</ul><span class="go">Enter your area →</span></a>`
    )
    .join("")}</div>
</section>`;

  h += `<section id="experience" class="experience band-navy">
  <div class="wrap exp-grid">
    <div>
      <p class="eyebrow light">${S.experience.eyebrow}</p>
      <h2>${S.experience.title}</h2>
      <p class="lead light">${S.experience.text}</p>
      <a class="btn btn-gold" href="${S.brand.experienceUrl}" target="_blank" rel="noopener">${S.experience.cta} →</a>
    </div>
    ${ph("Teaser frame for the 3D Egg-to-Harvest experience — link opens the live interactive app.")}
  </div>
</section>`;

  h += `<section id="phases" class="phases wrap block" aria-labelledby="phases-title">
  <div class="sec-head center">
    <div>
      <p class="eyebrow">Integrated production cycle</p>
      <h2 id="phases-title">Five stages, from broodstock to grow-out</h2>
      <div class="gold-thread" aria-hidden="true">production pearls</div>
      <p class="lead center-lead">${S.cycleNote}. Select a segment — the dial auto-rotates and pauses on interaction.</p>
    </div>
  </div>
  <div class="phases-layout">
    <div class="dial-wrap">
      <div class="dial" role="group" aria-label="Production phases dial">
        <svg class="dial-svg" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="${R}" fill="none" stroke="#e2e8f0" stroke-width="8"></circle>
          ${arcs}
        </svg>
        <div class="dial-hub">
          <span class="dial-kicker" id="dial-kicker">Phase 01</span>
          <strong id="dial-title">${S.phases[0].short}</strong>
          <span class="dial-dot" id="dial-dot" style="background:${S.phases[0].color}"></span>
        </div>
      </div>
      <div class="dial-controls">
        <button type="button" class="ctrl" id="phase-prev" aria-label="Previous phase">‹</button>
        <button type="button" class="ctrl" id="phase-toggle" aria-pressed="true" aria-label="Pause auto-rotate">Pause</button>
        <button type="button" class="ctrl" id="phase-next" aria-label="Next phase">›</button>
      </div>
      <ol class="phase-legend">${S.phases
        .map(
          (p, i) =>
            `<li><button type="button" class="leg a-phase" data-idx="${i}" style="--pc:${p.color}" aria-current="${i === 0 ? "true" : "false"}"><span class="pearl-ico" aria-hidden="true">${i + 1}</span>${p.short}</button></li>`
        )
        .join("")}</ol>
    </div>
    <article class="phase-panel" id="phase-panel" aria-live="polite">
      <div class="phase-panel-head">
        <span class="eyebrow" id="phase-tag">Phase 01 of 05</span>
        <span class="phase-facility" id="phase-facility">${(S.phases[0].facilities && S.phases[0].facilities[0]) || PH}</span>
      </div>
      <h3 id="phase-title">${S.phases[0].title}</h3>
      <p id="phase-detail">${S.phases[0].detail}</p>
      <ul class="phase-bullets" id="phase-bullets">${S.phases[0].bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
      <div class="phase-params" id="phase-params">${S.phases[0].params
        .map((p) => `<div><span>${p[0]}</span><strong>${p[1]}</strong></div>`)
        .join("")}</div>
      ${ph("Stage deep-dive animation — process footage and facility diagram for the selected phase.")}
    </article>
  </div>
</section>`;

  h += `<section class="wrap block pillars"><p class="eyebrow">An integrated operation</p><h2>We’re doing things <em>differently</em></h2><ul>${S.pillars
    .map((p) => `<li>${p}</li>`)
    .join("")}</ul></section>`;

  h += `<section class="stats"><div class="wrap"><p class="eyebrow">Key production statistics</p><div class="stat-grid">${S.stats
    .map((s) => `<div><strong>${s[0]}</strong><span>${s[1]}</span><small>figure to be supplied</small></div>`)
    .join("")}</div>${ph("Animated count-up of figures when the band scrolls into view.")}</div></section>`;

  S.audiences.forEach((a) => {
    h += `<section id="for-${a.id}" class="aud-hub a-${a.id}"><div class="wrap"><span class="badge a-${a.id}">${a.label}</span><h2>${a.who}</h2><p class="lead">${a.intro}</p>
 <ul class="hub-links">${a.links.map((l) => `<li><a href="${l[1]}">${l[0]} <span>→</span></a></li>`).join("")}</ul></div></section>`;
  });

  S.sections.forEach((s) => {
    h += `<section id="${s.id}" class="wrap block sec" data-template="${s.template}"><div class="sec-head"><div><p class="eyebrow">${s.template}</p><h2>${s.title}</h2></div><div class="for">${(s.audiences || []).map(badge).join("")}</div></div><p class="lead">${s.lead}</p>`;
    if (s.cards)
      h += `<div class="cards">${s.cards
        .map(
          (c) =>
            `<article class="card">${(c[2] || []).map(badge).join("")}<h3>${c[0]}</h3><p class="${String(c[1]).includes("[Placeholder") ? "is-ph" : ""}">${c[1]}</p></article>`
        )
        .join("")}</div>`;
    if (s.species)
      h += `<div class="cards species">${s.species
        .map(
          (sp) =>
            `<article class="card"><div class="img-ph mono">Species photograph</div><h3>${sp[0]}</h3>${sp[1] ? `<p class="arabic">${sp[1]}</p>` : ""}<ul class="fields">${s.speciesFields
              .map((f) => `<li>${f}<span>—</span></li>`)
              .join("")}</ul><a class="btn a-operators" href="#contact">Enquiry / Order request</a></article>`
        )
        .join("")}</div>`;
    if (s.news)
      h += `<div class="tags">${s.tags.map((t) => `<span>${t}</span>`).join("")}</div><div class="cards">${s.news
        .map(
          (n) =>
            `<article class="card news"><div class="img-ph mono">Image</div><p class="eyebrow">${n[0]}</p><h3>${n[1]}</h3><p class="is-ph">${PH}</p></article>`
        )
        .join("")}</div>`;
    if (s.placeholder) h += ph(s.placeholder);
    h += `</section>`;
  });

  /* Enquiry form with checkboxes */
  const F = S.form;
  h += `<section id="contact" class="wrap block sec contact-sec">
  <p class="eyebrow">${F.eyebrow}</p>
  <h2>${F.title}</h2>
  <p class="lead">${F.lead}</p>
  <div class="contact-grid">
    <form class="enq" id="enq-form" novalidate>
      <fieldset>
        <legend>${F.audienceLegend} <span class="req">*</span></legend>
        <div class="chips" id="aud-checks">${S.audiences
          .map(
            (a) =>
              `<label class="chip a-${a.id}"><input type="checkbox" name="audience" value="${a.id}"> ${a.label}</label>`
          )
          .join("")}</div>
        <p class="field-err" id="err-audience" hidden>Select at least one audience type.</p>
      </fieldset>
      <fieldset>
        <legend>${F.interestLegend} <span class="req">*</span></legend>
        <div class="chips" id="int-checks">${F.interests
          .map(
            (it) =>
              `<label class="chip ${it[2] ? "a-" + it[2] : ""}"><input type="checkbox" name="interest" value="${it[0]}"> ${it[1]}</label>`
          )
          .join("")}</div>
        <p class="field-err" id="err-interest" hidden>Select at least one area of interest.</p>
      </fieldset>
      <div class="row">
        <label>Name <span class="req">*</span><input name="name" required autocomplete="name" aria-required="true"><span class="field-err" data-for="name" hidden>Please enter your name.</span></label>
        <label>Organisation<input name="org" autocomplete="organization"></label>
      </div>
      <div class="row">
        <label>Email <span class="req">*</span><input type="email" name="email" required autocomplete="email" aria-required="true"><span class="field-err" data-for="email" hidden>Enter a valid email.</span></label>
        <label>Phone<input type="tel" name="phone" autocomplete="tel"></label>
      </div>
      <label>Message<textarea name="message" rows="4" placeholder="How can we help?"></textarea></label>
      <p class="privacy">${F.privacy}</p>
      <button class="btn" type="submit">Send enquiry (demo)</button>
      <div class="thanks" id="enq-thanks" hidden role="status">
        <span class="thanks-mark">✦</span>
        <p>${F.thanks}</p>
        <button type="button" class="btn btn-ghost" id="enq-reset">Send another (demo)</button>
      </div>
    </form>
    <div class="contact-side">
      <h3>Contact details</h3>
      <p><a href="mailto:${S.brand.contactEmail}">${S.brand.contactEmail}</a></p>
      <p><a href="${S.brand.website}" target="_blank" rel="noopener">${S.brand.website.replace("https://", "")}</a></p>
      <p class="is-ph">Head office address — ${PH}</p>
      <a class="btn wa" href="#contact">WhatsApp (integration placeholder)</a>
      ${ph("Interactive map of facility locations — SKMRC, Balghailam Island, Delma Island, Khorfakkan.")}
    </div>
  </div>
</section>`;

  document.getElementById("main").innerHTML = h;
  document.getElementById("footer").innerHTML = `<div class="wrap foot"><div><strong class="fbrand">${S.brand.name}</strong><p>${S.brand.tagline}</p><p class="byline">${S.brand.attribution}</p><p class="small">Static demo · English (Arabic RTL planned) · Content driven by js/content.js for Statamic CMS migration.</p></div>
${S.audiences
  .map(
    (a) =>
      `<div><h4 class="a-${a.id}"><i></i>${a.label}</h4><ul>${a.links
        .map((l) => `<li><a href="${l[1]}">${l[0]}</a></li>`)
        .join("")}</ul></div>`
  )
  .join("")}</div>`;

  /* ——— Header / burger ——— */
  const burger = document.querySelector(".burger");
  burger.onclick = () => {
    const o = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", o);
    document.body.classList.toggle("lock", o);
  };
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      nav.classList.remove("open");
      burger.setAttribute("aria-expanded", false);
      document.body.classList.remove("lock");
    }
  });
  document.querySelectorAll(".lang button").forEach((b) => {
    b.onclick = () => {
      document.querySelectorAll(".lang button").forEach((x) => x.setAttribute("aria-pressed", x === b));
      if (b.lang === "ar") alert("Arabic / RTL version — placeholder for the CMS phase.");
    };
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) burger.click();
  });
  const hdr = document.querySelector(".site-header");
  addEventListener("scroll", () => hdr.classList.toggle("solid", scrollY > 40), { passive: true });

  /* ——— Interactive phases dial ——— */
  let idx = 0;
  let playing = true;
  let timer = null;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function renderPhase(i, user) {
    idx = (i + S.phases.length) % S.phases.length;
    const p = S.phases[idx];
    document.getElementById("dial-kicker").textContent = `Phase 0${idx + 1}`;
    document.getElementById("dial-title").textContent = p.short;
    document.getElementById("dial-dot").style.background = p.color;
    document.getElementById("phase-tag").textContent = `Phase 0${idx + 1} of 05`;
    document.getElementById("phase-title").textContent = p.title;
    document.getElementById("phase-detail").textContent = p.detail;
    const fac = document.getElementById("phase-facility");
    if (fac) fac.textContent = (p.facilities && p.facilities[0]) || "[Placeholder — content to be supplied by Gulf Aquaculture]";
    document.getElementById("phase-bullets").innerHTML = p.bullets.map((b) => `<li>${b}</li>`).join("");
    document.getElementById("phase-params").innerHTML = p.params
      .map((x) => `<div><span>${x[0]}</span><strong>${x[1]}</strong></div>`)
      .join("");
    document.querySelectorAll(".phase-arc").forEach((arc, n) => {
      const on = n === idx;
      arc.setAttribute("stroke-width", on ? "11" : "8");
      arc.setAttribute("aria-pressed", on ? "true" : "false");
      arc.classList.toggle("is-active", on);
    });
    document.querySelectorAll(".leg").forEach((btn, n) => {
      btn.setAttribute("aria-current", n === idx ? "true" : "false");
    });
    document.getElementById("phase-panel").classList.remove("flash");
    void document.getElementById("phase-panel").offsetWidth;
    document.getElementById("phase-panel").classList.add("flash");
    if (user) pause();
  }

  function tick() {
    if (!playing || reduced) return;
    renderPhase(idx + 1, false);
  }
  function start() {
    if (reduced) return;
    clearInterval(timer);
    timer = setInterval(tick, 4200);
    playing = true;
    const t = document.getElementById("phase-toggle");
    t.textContent = "Pause";
    t.setAttribute("aria-pressed", "true");
  }
  function pause() {
    clearInterval(timer);
    playing = false;
    const t = document.getElementById("phase-toggle");
    t.textContent = "Play";
    t.setAttribute("aria-pressed", "false");
  }

  document.querySelectorAll(".phase-arc").forEach((arc) => {
    const go = () => renderPhase(+arc.dataset.idx, true);
    arc.addEventListener("click", go);
    arc.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        go();
      }
    });
  });
  document.querySelectorAll(".leg").forEach((btn) => {
    btn.addEventListener("click", () => renderPhase(+btn.dataset.idx, true));
  });
  document.getElementById("phase-prev").onclick = () => renderPhase(idx - 1, true);
  document.getElementById("phase-next").onclick = () => renderPhase(idx + 1, true);
  document.getElementById("phase-toggle").onclick = () => (playing ? pause() : start());

  const dial = document.querySelector(".dial");
  let touchStartX = null;
  dial.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].clientX;
    },
    { passive: true }
  );
  dial.addEventListener(
    "touchend",
    (e) => {
      if (touchStartX == null) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) renderPhase(idx + (dx < 0 ? 1 : -1), true);
      touchStartX = null;
    },
    { passive: true }
  );

  /* Pause auto-rotate when dial leaves viewport */
  const ioDial = new IntersectionObserver(
    (es) => {
      es.forEach((x) => {
        if (!x.isIntersecting) pause();
        else if (!reduced && document.getElementById("phase-toggle").getAttribute("aria-pressed") === "true") start();
      });
    },
    { threshold: 0.25 }
  );
  ioDial.observe(document.getElementById("phases"));
  renderPhase(0, false);
  if (!reduced) start();

  /* ——— Form validation (demo, no network) ——— */
  const form = document.getElementById("enq-form");
  const thanks = document.getElementById("enq-thanks");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    const aud = form.querySelectorAll('input[name="audience"]:checked');
    const ints = form.querySelectorAll('input[name="interest"]:checked');
    document.getElementById("err-audience").hidden = aud.length > 0;
    document.getElementById("err-interest").hidden = ints.length > 0;
    if (!aud.length) ok = false;
    if (!ints.length) ok = false;
    const name = form.elements.name;
    const email = form.elements.email;
    const nameErr = form.querySelector('[data-for="name"]');
    const emailErr = form.querySelector('[data-for="email"]');
    nameErr.hidden = !!name.value.trim();
    if (!name.value.trim()) ok = false;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    emailErr.hidden = emailOk;
    if (!emailOk) ok = false;
    if (!ok) return;
    form.classList.add("is-sent");
    thanks.hidden = false;
  });
  document.getElementById("enq-reset").onclick = () => {
    form.reset();
    form.classList.remove("is-sent");
    thanks.hidden = true;
    form.querySelectorAll(".field-err").forEach((el) => (el.hidden = true));
  };


  /* Cinematic hooks */
  const heroReplay = document.getElementById("hero-replay");
  if (heroReplay) heroReplay.addEventListener("click", () => window.GACinematic && window.GACinematic.replay());
  window.addEventListener("cine:phase", (e) => {
    if (typeof e.detail === "number") renderPhase(e.detail, true);
  });

  /* Reveal */
  const io = new IntersectionObserver((es) => es.forEach((x) => x.isIntersecting && x.target.classList.add("in")), {
    threshold: 0.1
  });
  document.querySelectorAll(".block, .aud-hub, .experience, .phases").forEach((el) => {
    el.classList.add("reveal");
    io.observe(el);
  });
})();
