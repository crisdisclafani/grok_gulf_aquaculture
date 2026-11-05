/* Gulf Aquaculture — cinematic homepage opening (~20s).
   Journey videos are PLACEHOLDER footage (generated). */
(function () {
  const S = window.SITE;
  if (!S || !S.phases || !S.journey) return;

  const reduced =
    matchMedia("(prefers-reduced-motion: reduce)").matches ||
    matchMedia("(update: slow)").matches ||
    navigator.connection?.saveData === true ||
    (navigator.connection?.effectiveType || "").includes("2g");

  const root = document.createElement("div");
  root.id = "cinematic";
  root.className = "cine" + (reduced ? " cine-static" : "");
  root.setAttribute("role", "dialog");
  root.setAttribute("aria-modal", "true");
  root.setAttribute("aria-label", "Gulf Aquaculture opening sequence");
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
      <svg class="cine-thread" viewBox="0 0 1000 420" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <path class="thread-path" d="" fill="none"/>
      </svg>
      <div class="cine-pearls" role="list"></div>
      <p class="cine-cycle-hint">Select a stage · swipe to browse</p>
    </div>
    <div class="cine-immersion" hidden>
      <button type="button" class="cine-imm-close" aria-label="Close stage detail">×</button>
      <div class="cine-imm-inner">
        <p class="cine-imm-kicker"></p>
        <h2 class="cine-imm-title"></h2>
        <p class="cine-imm-detail"></p>
        <div class="cine-imm-grid">
          <section><h3>Processes</h3><ul class="cine-imm-proc"></ul></section>
          <section><h3>Technologies</h3><ul class="cine-imm-tech"></ul></section>
          <section><h3>Facilities</h3><ul class="cine-imm-fac"></ul></section>
        </div>
        <div class="cine-imm-params"></div>
        <a class="btn btn-gold cine-imm-goto" href="#phases">View in production cycle →</a>
      </div>
    </div>
    <div class="cine-chrome">
      <button type="button" class="cine-skip">Skip intro</button>
      <button type="button" class="cine-replay" hidden>Replay</button>
    </div>
  `;
  document.body.prepend(root);
  document.body.classList.add("cine-active");

  const plankton = root.querySelector(".cine-plankton");
  const fx = root.querySelector(".cine-fx");
  const awakeEl = root.querySelector(".cine-awake");
  const journeyEl = root.querySelector(".cine-journey");
  const cycleEl = root.querySelector(".cine-cycle");
  const vidsEl = root.querySelector(".cine-vids");
  const wordEl = root.querySelector(".cine-word");
  const pearlsEl = root.querySelector(".cine-pearls");
  const threadPath = root.querySelector(".thread-path");
  const immersion = root.querySelector(".cine-immersion");
  const skipBtn = root.querySelector(".cine-skip");
  const replayBtn = root.querySelector(".cine-replay");

  /* ——— Journey videos ——— */
  const videos = S.journey.map((j, i) => {
    const wrap = document.createElement("div");
    wrap.className = "cine-vid" + (i === 0 ? " is-on" : "");
    wrap.dataset.i = i;
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
    /* lazy: set src when needed */
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
      <span class="pearl-glow" style="--pc:${p.color}"></span>
      <span class="pearl-core">
        <video class="pearl-vid" muted playsinline loop preload="none" poster="${p.poster}" aria-hidden="true"></video>
        <span class="pearl-n">${i + 1}</span>
      </span>
      <span class="pearl-label"><b>${i + 1}</b> ${p.title}</span>`;
    pearlsEl.appendChild(b);
    return b;
  });

  function layoutPearls() {
    const n = pearlNodes.length;
    const w = root.clientWidth;
    const h = root.clientHeight;
    const cx = w * 0.5;
    const cy = h * 0.52;
    const rx = Math.min(w * 0.38, 420);
    const ry = Math.min(h * 0.22, 140);
    const pts = [];
    pearlNodes.forEach((node, i) => {
      const t = -Math.PI * 0.85 + (i / (n - 1)) * Math.PI * 1.7;
      const x = cx + Math.cos(t) * rx;
      const y = cy + Math.sin(t) * ry;
      node.style.left = `${x}px`;
      node.style.top = `${y}px`;
      pts.push([x, y]);
    });
    /* thread in SVG viewBox 0..1000 x 0..420 mapped from screen */
    const mapX = (x) => (x / w) * 1000;
    const mapY = (y) => (y / h) * 420;
    if (pts.length) {
      let d = `M ${mapX(pts[0][0])} ${mapY(pts[0][1])}`;
      for (let i = 1; i < pts.length; i++) {
        const prev = pts[i - 1];
        const cur = pts[i];
        const cpx = (prev[0] + cur[0]) / 2;
        d += ` Q ${mapX(cpx)} ${mapY(prev[1] - 30)} ${mapX(cur[0])} ${mapY(cur[1])}`;
      }
      threadPath.setAttribute("d", d);
    }
  }

  /* ——— Plankton canvas ——— */
  const pctx = plankton.getContext("2d");
  let particles = [];
  function resizeCanvas() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    [plankton, fx].forEach((c) => {
      c.width = Math.floor(innerWidth * dpr);
      c.height = Math.floor(innerHeight * dpr);
      c.style.width = innerWidth + "px";
      c.style.height = innerHeight + "px";
    });
    pctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    layoutPearls();
  }
  function seedPlankton(n) {
    particles = Array.from({ length: n }, () => ({
      x: Math.random() * innerWidth,
      y: innerHeight + Math.random() * innerHeight,
      r: 0.6 + Math.random() * 2.2,
      vy: -(0.15 + Math.random() * 0.55),
      vx: (Math.random() - 0.5) * 0.25,
      a: 0.25 + Math.random() * 0.55
    }));
  }
  let raf = 0;
  function drawPlankton() {
    pctx.clearRect(0, 0, innerWidth, innerHeight);
    for (const p of particles) {
      p.y += p.vy;
      p.x += p.vx + Math.sin(p.y * 0.01) * 0.15;
      if (p.y < -10) {
        p.y = innerHeight + 10;
        p.x = Math.random() * innerWidth;
      }
      pctx.beginPath();
      pctx.fillStyle = `rgba(179,146,87,${p.a})`;
      pctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      pctx.fill();
    }
  }

  /* ——— WebGL liquid displacement (optional) ——— */
  let gl = null;
  let glOk = false;
  let glProg = null;
  let glTexA = null;
  let glTexB = null;
  let glBuf = null;
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
      glBuf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, glBuf);
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
  } catch (e) {
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
  let finished = false;
  let pearlFocus = 0;
  let journeyIndex = 0;

  const T = {
    awakeEnd: 3000,
    journeyEnd: 14000,
    cycleEnd: 20000,
    clipDur: 2750 // 4 clips across 11s
  };

  function showStage(name) {
    awakeEl.hidden = name !== "awake";
    journeyEl.hidden = name !== "journey";
    cycleEl.hidden = name !== "cycle";
    root.dataset.phase = name;
  }

  function playClip(i, withLiquid) {
    const prev = journeyIndex;
    journeyIndex = i;
    ensureVideo(i);
    const item = videos[i];
    item.v.currentTime = 0;
    const playP = item.v.play();
    if (playP && playP.catch) playP.catch(() => {});
    wordEl.textContent = item.meta.word;
    wordEl.classList.remove("pop");
    void wordEl.offsetWidth;
    wordEl.classList.add("pop");
    if (withLiquid && glOk && prev !== i) {
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
      const p = t / T.awakeEnd;
      awakeEl.style.setProperty("--awake", p.toFixed(3));
    } else if (t < T.journeyEnd) {
      showStage("journey");
      const jt = t - T.awakeEnd;
      const idx = Math.min(3, Math.floor(jt / T.clipDur));
      if (idx !== journeyIndex) playClip(idx, true);
      else if (t - T.awakeEnd < 40) playClip(0, false);
    } else if (t < T.cycleEnd) {
      if (root.dataset.phase !== "cycle") {
        videos.forEach((x) => x.v.pause());
        showStage("cycle");
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
      showStage("cycle");
      cycleEl.classList.add("ready");
      cycleEl.style.setProperty("--form", "1");
      pearlNodes.forEach((n) => {
        n.style.setProperty("--appear", "1");
        n.classList.add("is-formed");
      });
      finished = true;
      /* keep plankton gentle while interactive */
    }

    raf = requestAnimationFrame(tick);
  }

  function startIntro() {
    cancelAnimationFrame(raf);
    running = true;
    finished = false;
    startTs = performance.now();
    journeyIndex = -1;
    root.classList.remove("cine-done");
    document.body.classList.add("cine-active");
    root.hidden = false;
    immersion.hidden = true;
    skipBtn.hidden = false;
    replayBtn.hidden = true;
    cycleEl.classList.remove("ready", "forming");
    pearlNodes.forEach((n) => n.classList.remove("is-formed", "is-focus", "is-hot"));
    if (reduced) {
      showStage("cycle");
      layoutPearls();
      cycleEl.classList.add("ready");
      pearlNodes.forEach((n) => {
        n.style.setProperty("--appear", "1");
        n.classList.add("is-formed");
      });
      finished = true;
      seedPlankton(24);
      drawPlankton();
      return;
    }
    seedPlankton(70);
    showStage("awake");
    awakeEl.style.setProperty("--awake", "0");
    raf = requestAnimationFrame(tick);
  }

  function endIntro() {
    running = false;
    finished = true;
    cancelAnimationFrame(raf);
    videos.forEach((x) => {
      try {
        x.v.pause();
      } catch (_) {}
    });
    liquidActive = false;
    root.classList.add("cine-done");
    document.body.classList.remove("cine-active");
    setTimeout(() => {
      root.hidden = true;
    }, 700);
    skipBtn.hidden = true;
    replayBtn.hidden = false;
    /* park replay in chrome of hero via body flag */
    document.body.classList.add("cine-has-replay");
    try {
      sessionStorage.setItem("ga-intro-seen", "1");
    } catch (_) {}
    window.dispatchEvent(new CustomEvent("cine:done"));
  }

  /* ——— Immersion ——— */
  function openImmersion(i) {
    const p = S.phases[i];
    if (!p) return;
    pearlFocus = i;
    immersion.hidden = false;
    immersion.querySelector(".cine-imm-kicker").textContent = `Stage 0${i + 1} of 05`;
    immersion.querySelector(".cine-imm-title").textContent = p.title;
    immersion.querySelector(".cine-imm-detail").textContent = p.detail;
    const fill = (sel, arr) => {
      immersion.querySelector(sel).innerHTML = (arr || []).map((x) => `<li>${x}</li>`).join("");
    };
    fill(".cine-imm-proc", p.processes);
    fill(".cine-imm-tech", p.technologies);
    fill(".cine-imm-fac", p.facilities);
    immersion.querySelector(".cine-imm-params").innerHTML = (p.params || [])
      .map((x) => `<div><span>${x[0]}</span><strong>${x[1]}</strong></div>`)
      .join("");
    immersion.querySelector(".cine-imm-goto").onclick = () => {
      endIntro();
      setTimeout(() => {
        location.hash = "#phases";
        window.dispatchEvent(new CustomEvent("cine:phase", { detail: i }));
      }, 50);
    };
    immersion.querySelector(".cine-imm-close").focus();
  }
  function closeImmersion() {
    immersion.hidden = true;
    pearlNodes[pearlFocus]?.focus();
  }

  /* ——— Pearl interactions ——— */
  pearlNodes.forEach((btn, i) => {
    const vid = btn.querySelector(".pearl-vid");
    btn.addEventListener("pointerenter", () => {
      btn.classList.add("is-hot");
      if (vid && !vid.src) {
        vid.src = S.phases[i].video;
      }
      if (vid) {
        vid.play().catch(() => {});
      }
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
    btn.addEventListener("click", () => openImmersion(i));
  });

  /* swipe pearls */
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
      }
      touchX = null;
    },
    { passive: true }
  );

  skipBtn.addEventListener("click", endIntro);
  replayBtn.addEventListener("click", () => {
    root.hidden = false;
    document.body.classList.add("cine-active");
    startIntro();
  });
  immersion.querySelector(".cine-imm-close").addEventListener("click", closeImmersion);

  document.addEventListener("keydown", (e) => {
    if (root.hidden) return;
    if (e.key === "Escape") {
      if (!immersion.hidden) closeImmersion();
      else endIntro();
    }
    if (root.dataset.phase === "cycle" && immersion.hidden) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        pearlFocus =
          (pearlFocus + (e.key === "ArrowRight" ? 1 : -1) + pearlNodes.length) % pearlNodes.length;
        pearlNodes[pearlFocus].focus();
      }
      if (e.key === "Enter" && document.activeElement?.classList.contains("cine-pearl")) {
        openImmersion(+document.activeElement.dataset.idx);
      }
    }
  });

  addEventListener("resize", () => {
    resizeCanvas();
    if (!reduced) seedPlankton(particles.length || 70);
  });

  /* site-wide subtle plankton (after intro) */
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
    siteParts = Array.from({ length: reduced ? 12 : 28 }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      r: 0.5 + Math.random() * 1.6,
      vy: -(0.08 + Math.random() * 0.25),
      a: 0.12 + Math.random() * 0.25
    }));
  }
  function drawSite() {
    if (document.body.classList.contains("cine-active")) {
      requestAnimationFrame(drawSite);
      return;
    }
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

  /* expose replay for hero button */
  function seekTo(ms) {
    if (reduced) return;
    startTs = performance.now() - ms;
    if (!running) {
      running = true;
      root.hidden = false;
      document.body.classList.add("cine-active");
      root.classList.remove("cine-done");
      raf = requestAnimationFrame(tick);
    }
  }
  function forcePearls() {
    videos.forEach((x) => { try { x.v.pause(); } catch (_) {} });
    showStage("cycle");
    layoutPearls();
    cycleEl.classList.add("ready", "forming");
    cycleEl.style.setProperty("--form", "1");
    pearlNodes.forEach((n) => {
      n.style.setProperty("--appear", "1");
      n.classList.add("is-formed");
      n.style.opacity = "1";
      n.style.visibility = "visible";
      n.style.pointerEvents = "auto";
    });
    finished = true;
  }
  window.GACinematic = {
    replay: () => {
      root.hidden = false;
      document.body.classList.add("cine-active");
      startIntro();
    },
    skip: endIntro,
    seek: seekTo,
    forcePearls
  };

  resizeCanvas();
  /* autoplay: always on first paint for demo WOW; session skip only if user already skipped this tab */
  let seen = false;
  try {
    seen = sessionStorage.getItem("ga-intro-seen") === "1";
  } catch (_) {}
  if (seen && !location.search.includes("intro=1")) {
    root.hidden = true;
    document.body.classList.remove("cine-active");
    document.body.classList.add("cine-has-replay");
    skipBtn.hidden = true;
    replayBtn.hidden = false;
  } else {
    startIntro();
  }
})();
