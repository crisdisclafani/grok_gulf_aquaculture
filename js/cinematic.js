/* Gulf Aquaculture — in-hero cinematic sequence (~20s).
   Journey videos are PLACEHOLDER footage (generated).
   Plays inside #hero-cinematic; header / access strip stay visible. */
(function () {
  const S = window.SITE;
  if (!S || !S.phases || !S.journey) return;

  const mount = document.getElementById("hero-cinematic");
  const detail = document.getElementById("hero-stage-detail");
  if (!mount) return;

  const reduced =
    matchMedia("(prefers-reduced-motion: reduce)").matches ||
    matchMedia("(update: slow)").matches ||
    navigator.connection?.saveData === true ||
    (navigator.connection?.effectiveType || "").includes("2g");

  const root = document.createElement("div");
  root.id = "cinematic";
  root.className = "cine" + (reduced ? " cine-static" : "");
  root.setAttribute("role", "region");
  root.setAttribute("aria-label", "Gulf Aquaculture production opening");
  root.innerHTML = `
    <canvas class="cine-plankton" aria-hidden="true"></canvas>
    <canvas class="cine-fx" aria-hidden="true"></canvas>
    <div class="cine-stage cine-awake" data-stage="awake">
      <svg class="cine-fish" viewBox="0 0 200 120" fill="none" aria-hidden="true">
        <path class="fish-path" d="M20 60 C60 10, 140 10, 180 60 C140 110, 60 110, 20 60" pathLength="1"/>
        <path class="fish-path fish-path-b" d="M40 60 C80 25, 130 25, 170 60 C130 95, 80 95, 40 60" pathLength="1"/>
      </svg>
      <h1 class="cine-title"><span>${S.hero.titleLead}</span><em>${S.hero.titleAccent}</em></h1>
      <p class="cine-byline">${S.brand.attribution}</p>
    </div>
    <div class="cine-stage cine-journey" data-stage="journey" hidden>
      <div class="cine-vids"></div>
      <p class="cine-word" aria-live="polite"></p>
      <p class="cine-ph-note">Placeholder footage</p>
    </div>
    <div class="cine-stage cine-cycle" data-stage="cycle" hidden>
      <div class="cine-cycle-amb" aria-hidden="true">
        <video class="cine-amb-vid" muted playsinline loop preload="none"></video>
        <div class="cine-cycle-veil"></div>
      </div>
      <header class="cine-cycle-head">
        <p class="cine-cycle-eyebrow"></p>
        <h2 class="cine-cycle-title"></h2>
        <p class="cine-cycle-lead"></p>
      </header>
      <div class="cine-arc">
        <svg class="cine-thread" viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="threadGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#B39257" stop-opacity=".25"/>
              <stop offset="50%" stop-color="#e59b38" stop-opacity="1"/>
              <stop offset="100%" stop-color="#B39257" stop-opacity=".25"/>
            </linearGradient>
            <filter id="threadGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <path class="thread-path thread-glow" d="" fill="none"/>
          <path class="thread-path thread-core" d="" fill="none"/>
        </svg>
        <div class="cine-pearls" role="list"></div>
      </div>
      <p class="cine-cycle-hint"></p>
    </div>
    <button type="button" class="cine-replay" aria-label="Replay opening sequence">Replay</button>
  `;
  mount.appendChild(root);

  const plankton = root.querySelector(".cine-plankton");
  const fx = root.querySelector(".cine-fx");
  const awakeEl = root.querySelector(".cine-awake");
  const journeyEl = root.querySelector(".cine-journey");
  const cycleEl = root.querySelector(".cine-cycle");
  const vidsEl = root.querySelector(".cine-vids");
  const wordEl = root.querySelector(".cine-word");
  const pearlsEl = root.querySelector(".cine-pearls");
  const replayBtn = root.querySelector(".cine-replay");
  const arcEl = root.querySelector(".cine-arc");
  const threadGlow = root.querySelector(".thread-glow");
  const threadCore = root.querySelector(".thread-core");
  const ambVid = root.querySelector(".cine-amb-vid");

  root.querySelector(".cine-cycle-title").textContent = S.cycleTitle || "The Production Cycle";
  root.querySelector(".cine-cycle-lead").textContent = S.cycleLead || "";
  root.querySelector(".cine-cycle-eyebrow").textContent = S.cycleNote || "";
  root.querySelector(".cine-cycle-hint").textContent = "Select a stage · swipe to browse";

  /* ——— Journey videos ——— */
  const videos = S.journey.map((j, i) => {
    const wrap = document.createElement("div");
    wrap.className = "cine-vid" + (i === 0 ? " is-on" : "");
    const v = document.createElement("video");
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");
    v.setAttribute("muted", "");
    v.preload = i === 0 ? "auto" : "none";
    v.loop = true;
    v.setAttribute("poster", j.poster);
    v.setAttribute("aria-hidden", "true");
    wrap.appendChild(v);
    vidsEl.appendChild(wrap);
    return { wrap, v, meta: j, loaded: false };
  });

  function ensureVideo(i) {
    const item = videos[i];
    if (!item || item.loaded) return item;
    item.v.src = item.meta.src;
    item.loaded = true;
    return item;
  }

  /* ——— Pearls ——— */
  const pearlNodes = S.phases.map((p, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "cine-pearl";
    b.setAttribute("role", "listitem");
    b.setAttribute("aria-label", `Stage ${i + 1}: ${p.title}`);
    b.dataset.idx = i;
    b.innerHTML = `
      <span class="pearl-orb">
        <span class="pearl-glow" style="--pc:${p.color}"></span>
        <span class="pearl-core">
          <span class="pearl-shimmer" aria-hidden="true"></span>
          <video class="pearl-vid" muted playsinline loop preload="none" poster="${p.poster}" aria-hidden="true"></video>
          <span class="pearl-n">${i + 1}</span>
        </span>
      </span>
      <span class="pearl-label"><span class="pearl-num">${i + 1}</span><span class="pearl-name">${p.title}</span></span>`;
    pearlsEl.appendChild(b);
    return b;
  });

  function isMobileCycle() {
    return matchMedia("(max-width: 760px)").matches;
  }

  function layoutPearls() {
    const n = pearlNodes.length;
    const mobile = isMobileCycle();
    root.classList.toggle("cine-cycle-mobile", mobile);
    pearlsEl.classList.toggle("is-carousel", mobile);

    pearlNodes.forEach((node, i) => {
      node.style.left = "";
      node.style.top = "";
      if (!mobile) {
        const u = n === 1 ? 0.5 : i / (n - 1);
        const xPct = 10 + u * 80;
        const yWave = Math.sin(u * Math.PI) * -28;
        node.style.setProperty("--px", xPct + "%");
        node.style.setProperty("--py", `calc(42% + ${yWave}px)`);
      } else {
        node.style.removeProperty("--px");
        node.style.removeProperty("--py");
      }
    });

    requestAnimationFrame(() => {
      if (!arcEl || !threadCore) return;
      if (mobile) {
        threadGlow && threadGlow.setAttribute("d", "");
        threadCore.setAttribute("d", "");
        return;
      }
      const arcBox = arcEl.getBoundingClientRect();
      if (arcBox.width < 40 || arcBox.height < 40) return;
      const pts = pearlNodes.map((node) => {
        const core = node.querySelector(".pearl-core") || node;
        const r = core.getBoundingClientRect();
        return [
          ((r.left + r.width / 2 - arcBox.left) / arcBox.width) * 1000,
          ((r.top + r.height / 2 - arcBox.top) / arcBox.height) * 300
        ];
      });
      if (pts.length < 2) return;
      let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[Math.max(0, i - 1)];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[Math.min(pts.length - 1, i + 2)];
        const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
        const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
        const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
        const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
        d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
      }
      threadGlow.setAttribute("d", d);
      threadCore.setAttribute("d", d);
    });
  }

  function startAmbient() {
    if (!ambVid || reduced) return;
    const src = (S.journey[1] || S.journey[0] || {}).src;
    const poster = (S.journey[1] || S.journey[0] || {}).poster;
    if (poster) ambVid.setAttribute("poster", poster);
    if (src && ambVid.dataset.src !== src) {
      ambVid.src = src;
      ambVid.dataset.src = src;
    }
    ambVid.playbackRate = 0.85;
    ambVid.play().catch(() => {});
  }
  function stopAmbient() {
    if (!ambVid) return;
    try {
      ambVid.pause();
    } catch (_) {}
  }

  /* ——— Plankton (sized to hero stage) ——— */
  const pctx = plankton.getContext("2d");
  let particles = [];
  function stageSize() {
    return { w: root.clientWidth || innerWidth, h: root.clientHeight || Math.round(innerHeight * 0.85) };
  }
  function resizeCanvas() {
    const { w, h } = stageSize();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    [plankton, fx].forEach((c) => {
      c.width = Math.floor(w * dpr);
      c.height = Math.floor(h * dpr);
      c.style.width = w + "px";
      c.style.height = h + "px";
    });
    pctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    layoutPearls();
  }
  function seedPlankton(n) {
    const { w, h } = stageSize();
    particles = Array.from({ length: n }, () => ({
      x: Math.random() * w,
      y: h + Math.random() * h,
      r: 0.6 + Math.random() * 2.2,
      vy: -(0.15 + Math.random() * 0.55),
      vx: (Math.random() - 0.5) * 0.25,
      a: 0.25 + Math.random() * 0.55
    }));
  }
  let raf = 0;
  function drawPlankton() {
    const { w, h } = stageSize();
    pctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.y += p.vy;
      p.x += p.vx + Math.sin(p.y * 0.01) * 0.15;
      if (p.y < -10) {
        p.y = h + 10;
        p.x = Math.random() * w;
      }
      pctx.beginPath();
      pctx.fillStyle = `rgba(179,146,87,${p.a})`;
      pctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      pctx.fill();
    }
  }

  /* ——— WebGL liquid ——— */
  let gl = null;
  let glOk = false;
  let glProg = null;
  let glTexA = null;
  let glTexB = null;
  try {
    gl = fx.getContext("webgl", { alpha: true, premultipliedAlpha: false, antialias: false });
    if (gl) {
      const vs = `attribute vec2 a;varying vec2 v;void main(){v=.5*(a+1.);gl_Position=vec4(a,0.,1.);}`;
      const fs = `precision mediump float;varying vec2 v;uniform sampler2D tA,tB;uniform float uP,uT;
      void main(){
        vec2 uv=v;
        float w=sin((uv.y+uT)*18.)*0.012*(1.-abs(uP-.5)*2.) + sin((uv.x-uT)*12.)*0.008;
        vec2 d=vec2(w, -w*0.6);
        vec4 a=texture2D(tA, clamp(uv+d*(1.-uP),0.,1.));
        vec4 b=texture2D(tB, clamp(uv-d*uP,0.,1.));
        float m=smoothstep(uP-.18,uP+.18, uv.x + sin(uv.y*10.+uT)*0.04);
        gl_FragColor=mix(a,b,m);
      }`;
      function compile(type, src) {
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
        return s;
      }
      glProg = gl.createProgram();
      gl.attachShader(glProg, compile(gl.VERTEX_SHADER, vs));
      gl.attachShader(glProg, compile(gl.FRAGMENT_SHADER, fs));
      gl.linkProgram(glProg);
      if (!gl.getProgramParameter(glProg, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(glProg));
      gl.useProgram(glProg);
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(glProg, "a");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      gl.uniform1i(gl.getUniformLocation(glProg, "tA"), 0);
      gl.uniform1i(gl.getUniformLocation(glProg, "tB"), 1);
      function mkTex() {
        const t = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, t);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        return t;
      }
      glTexA = mkTex();
      glTexB = mkTex();
      glOk = true;
      fx.classList.add("cine-fx-on");
    }
  } catch (_) {
    glOk = false;
  }

  function uploadVideoTex(tex, video) {
    if (!gl || !video || video.readyState < 2) return false;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    try {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
      return true;
    } catch (_) {
      return false;
    }
  }

  let liquidP = 0;
  let liquidFrom = 0;
  let liquidTo = 0;
  let liquidActive = false;

  function drawLiquid(t) {
    if (!glOk || !liquidActive) return;
    const a = videos[liquidFrom].v;
    const b = videos[liquidTo].v;
    if (!uploadVideoTex(glTexA, a) || !uploadVideoTex(glTexB, b)) return;
    gl.viewport(0, 0, fx.width, fx.height);
    gl.useProgram(glProg);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, glTexA);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, glTexB);
    gl.uniform1f(gl.getUniformLocation(glProg, "uP"), liquidP);
    gl.uniform1f(gl.getUniformLocation(glProg, "uT"), t * 0.001);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  /* ——— Timeline ——— */
  let startTs = 0;
  let running = false;
  let settled = false;
  let pearlFocus = 0;
  let journeyIndex = -1;
  const T = { awakeEnd: 3000, journeyEnd: 14000, cycleEnd: 20000, clipDur: 2750 };

  function showStage(name) {
    awakeEl.hidden = name !== "awake";
    journeyEl.hidden = name !== "journey";
    cycleEl.hidden = name !== "cycle";
    root.dataset.phase = name;
    root.classList.toggle("is-cycle", name === "cycle");
  }

  function playClip(i, withLiquid) {
    const prev = journeyIndex;
    journeyIndex = i;
    ensureVideo(i);
    const item = videos[i];
    item.v.currentTime = 0;
    item.v.play().catch(() => {});
    wordEl.textContent = item.meta.word;
    wordEl.classList.remove("pop");
    void wordEl.offsetWidth;
    wordEl.classList.add("pop");
    if (withLiquid && glOk && prev >= 0 && prev !== i) {
      liquidFrom = prev;
      liquidTo = i;
      liquidP = 0;
      liquidActive = true;
      ensureVideo(prev);
      videos[prev].v.play().catch(() => {});
      videos.forEach((x, n) => x.wrap.classList.toggle("is-on", n === i || n === prev));
      fx.classList.add("is-liquid");
    } else {
      liquidActive = false;
      fx.classList.remove("is-liquid");
      videos.forEach((x, n) => x.wrap.classList.toggle("is-on", n === i));
    }
  }

  function settlePearls() {
    videos.forEach((x) => {
      try {
        x.v.pause();
      } catch (_) {}
    });
    liquidActive = false;
    fx.classList.remove("is-liquid");
    showStage("cycle");
    startAmbient();
    cycleEl.classList.add("ready", "forming");
    cycleEl.style.setProperty("--form", "1");
    pearlNodes.forEach((n) => {
      n.style.setProperty("--appear", "1");
      n.classList.add("is-formed");
    });
    layoutPearls();
    settled = true;
    running = false;
    cancelAnimationFrame(raf);
    /* gentle plankton while resting */
    seedPlankton(reduced ? 18 : 40);
    const idle = () => {
      if (running || root.dataset.phase !== "cycle") return;
      drawPlankton();
      raf = requestAnimationFrame(idle);
    };
    raf = requestAnimationFrame(idle);
    window.dispatchEvent(new CustomEvent("cine:done"));
  }

  function tick(now) {
    if (!running) return;
    const t = now - startTs;
    drawPlankton();
    if (liquidActive) {
      liquidP = Math.min(1, liquidP + 0.035);
      drawLiquid(now);
      if (liquidP >= 1) {
        liquidActive = false;
        fx.classList.remove("is-liquid");
        videos.forEach((x, n) => x.wrap.classList.toggle("is-on", n === journeyIndex));
        gl && gl.clear(gl.COLOR_BUFFER_BIT);
      }
    }

    if (t < T.awakeEnd) {
      showStage("awake");
      awakeEl.style.setProperty("--awake", (t / T.awakeEnd).toFixed(3));
    } else if (t < T.journeyEnd) {
      showStage("journey");
      const jt = t - T.awakeEnd;
      const idx = Math.min(3, Math.floor(jt / T.clipDur));
      if (idx !== journeyIndex) playClip(idx, true);
      else if (journeyIndex < 0) playClip(0, false);
    } else if (t < T.cycleEnd) {
      if (root.dataset.phase !== "cycle") {
        videos.forEach((x) => x.v.pause());
        showStage("cycle");
        startAmbient();
        layoutPearls();
        cycleEl.classList.add("forming");
      }
      const ct = (t - T.journeyEnd) / (T.cycleEnd - T.journeyEnd);
      cycleEl.style.setProperty("--form", ct.toFixed(3));
      pearlNodes.forEach((n, i) => {
        const appear = Math.max(0, Math.min(1, (ct - i * 0.12) / 0.25));
        n.style.setProperty("--appear", appear.toFixed(3));
        n.classList.toggle("is-formed", appear > 0.85);
      });
    } else {
      settlePearls();
      return;
    }
    raf = requestAnimationFrame(tick);
  }

  function startIntro() {
    cancelAnimationFrame(raf);
    running = true;
    settled = false;
    startTs = performance.now();
    journeyIndex = -1;
    closeStageDetail();
    cycleEl.classList.remove("ready", "forming");
    pearlNodes.forEach((n) => n.classList.remove("is-formed", "is-focus", "is-hot"));
    resizeCanvas();
    if (reduced) {
      settlePearls();
      return;
    }
    seedPlankton(70);
    showStage("awake");
    awakeEl.style.setProperty("--awake", "0");
    raf = requestAnimationFrame(tick);
  }

  /* ——— In-page stage detail (not a blocking overlay) ——— */
  function openStageDetail(i) {
    const p = S.phases[i];
    if (!p || !detail) return;
    pearlFocus = i;
    pearlNodes.forEach((n, k) => n.classList.toggle("is-focus", k === i));
    detail.hidden = false;
    detail.classList.add("is-open");
    detail.querySelector("[data-kicker]").textContent = `Stage 0${i + 1} of 05`;
    detail.querySelector("[data-title]").textContent = p.title;
    detail.querySelector("[data-detail]").textContent = p.detail;
    const fill = (sel, arr) => {
      detail.querySelector(sel).innerHTML = (arr || []).map((x) => `<li>${x}</li>`).join("");
    };
    fill("[data-proc]", p.processes);
    fill("[data-tech]", p.technologies);
    fill("[data-fac]", p.facilities);
    detail.querySelector("[data-params]").innerHTML = (p.params || [])
      .map((x) => `<div><span>${x[0]}</span><strong>${x[1]}</strong></div>`)
      .join("");
    const poster = detail.querySelector("[data-poster]");
    if (poster) {
      poster.style.backgroundImage = p.poster ? `url(${p.poster})` : "";
    }
    detail.querySelector("[data-goto]").onclick = (e) => {
      e.preventDefault();
      location.hash = "#phases";
      window.dispatchEvent(new CustomEvent("cine:phase", { detail: i }));
    };
    detail.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "nearest" });
    window.dispatchEvent(new CustomEvent("cine:phase", { detail: i }));
  }
  function closeStageDetail() {
    if (!detail) return;
    detail.hidden = true;
    detail.classList.remove("is-open");
  }

  pearlNodes.forEach((btn, i) => {
    const vid = btn.querySelector(".pearl-vid");
    btn.addEventListener("pointerenter", () => {
      btn.classList.add("is-hot");
      if (vid && !vid.src) vid.src = S.phases[i].video;
      if (vid) vid.play().catch(() => {});
    });
    btn.addEventListener("pointerleave", () => {
      btn.classList.remove("is-hot");
      if (vid) {
        try {
          vid.pause();
        } catch (_) {}
      }
    });
    btn.addEventListener("focus", () => {
      pearlFocus = i;
      pearlNodes.forEach((n, k) => n.classList.toggle("is-focus", k === i));
    });
    btn.addEventListener("click", () => openStageDetail(i));
  });

  let touchX = null;
  cycleEl.addEventListener(
    "touchstart",
    (e) => {
      touchX = e.changedTouches[0].clientX;
    },
    { passive: true }
  );
  cycleEl.addEventListener(
    "touchend",
    (e) => {
      if (touchX == null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) {
        pearlFocus = (pearlFocus + (dx < 0 ? 1 : -1) + pearlNodes.length) % pearlNodes.length;
        pearlNodes[pearlFocus].focus();
        pearlNodes.forEach((n, k) => n.classList.toggle("is-focus", k === pearlFocus));
        if (isMobileCycle()) {
          pearlNodes[pearlFocus].scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
        }
      }
      touchX = null;
    },
    { passive: true }
  );

  if (detail) {
    detail.querySelector("[data-close]")?.addEventListener("click", closeStageDetail);
  }

  replayBtn.addEventListener("click", startIntro);
  const heroReplay = document.getElementById("hero-replay");
  if (heroReplay) heroReplay.addEventListener("click", startIntro);

  document.addEventListener("keydown", (e) => {
    if (root.dataset.phase !== "cycle") return;
    if (e.key === "Escape") closeStageDetail();
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      pearlFocus =
        (pearlFocus + (e.key === "ArrowRight" ? 1 : -1) + pearlNodes.length) % pearlNodes.length;
      pearlNodes[pearlFocus].focus();
      if (isMobileCycle()) {
        pearlNodes[pearlFocus].scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
      }
    }
    if (e.key === "Enter" && document.activeElement?.classList.contains("cine-pearl")) {
      openStageDetail(+document.activeElement.dataset.idx);
    }
  });

  addEventListener("resize", () => {
    resizeCanvas();
    if (!reduced) seedPlankton(particles.length || 40);
  });

  /* subtle site-wide plankton (page background) */
  const sitePlank = document.createElement("canvas");
  sitePlank.className = "site-plankton";
  sitePlank.setAttribute("aria-hidden", "true");
  document.body.appendChild(sitePlank);
  const sctx = sitePlank.getContext("2d");
  let siteParts = [];
  function resizeSite() {
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    sitePlank.width = Math.floor(innerWidth * dpr);
    sitePlank.height = Math.floor(innerHeight * dpr);
    sitePlank.style.width = innerWidth + "px";
    sitePlank.style.height = innerHeight + "px";
    sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    siteParts = Array.from({ length: reduced ? 10 : 22 }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      r: 0.5 + Math.random() * 1.4,
      vy: -(0.06 + Math.random() * 0.2),
      a: 0.1 + Math.random() * 0.2
    }));
  }
  function drawSite() {
    sctx.clearRect(0, 0, innerWidth, innerHeight);
    for (const p of siteParts) {
      p.y += p.vy;
      if (p.y < -8) p.y = innerHeight + 8;
      sctx.beginPath();
      sctx.fillStyle = `rgba(179,146,87,${p.a})`;
      sctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      sctx.fill();
    }
    requestAnimationFrame(drawSite);
  }
  resizeSite();
  if (!reduced) requestAnimationFrame(drawSite);
  addEventListener("resize", resizeSite);

  function seekTo(ms) {
    if (reduced) {
      settlePearls();
      return;
    }
    startTs = performance.now() - ms;
    if (ms < T.awakeEnd) {
      stopAmbient();
      showStage("awake");
      awakeEl.style.setProperty("--awake", Math.min(1, ms / T.awakeEnd).toFixed(3));
    } else if (ms < T.journeyEnd) {
      stopAmbient();
      showStage("journey");
      const idx = Math.min(3, Math.floor((ms - T.awakeEnd) / T.clipDur));
      playClip(idx, false);
    } else {
      showStage("cycle");
      startAmbient();
      const ct = Math.min(1, (ms - T.journeyEnd) / (T.cycleEnd - T.journeyEnd));
      cycleEl.style.setProperty("--form", ct.toFixed(3));
      cycleEl.classList.toggle("ready", ms >= T.cycleEnd);
      pearlNodes.forEach((n, i) => {
        const appear = Math.max(0, Math.min(1, (ct - i * 0.12) / 0.25));
        n.style.setProperty("--appear", appear.toFixed(3));
        n.classList.toggle("is-formed", appear > 0.85 || ms >= T.cycleEnd);
      });
      layoutPearls();
      if (ms >= T.cycleEnd) settlePearls();
    }
    if (!running && ms < T.cycleEnd) {
      running = true;
      raf = requestAnimationFrame(tick);
    }
  }

  window.GACinematic = {
    replay: startIntro,
    seek: seekTo,
    forcePearls: settlePearls,
    openStage: openStageDetail
  };

  resizeCanvas();
  startIntro();
})();
