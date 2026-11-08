/* ============================================================
   script.js — behaviour, in numbered modules matching styles.css
   00 utils · 01 render · 02 hero · 03 scroll engine + chapter 02 + puzzle
   04 about doors · 05 case files · 06 floor 3D · 07 lab · 08 method
   09 roadmap · 10 boot
   ============================================================ */
(function () {
  "use strict";

  /* 00 · Utils ------------------------------------------------ */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const easeBack = t => { const c = 1.70158; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };
  const REDUCE = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FINE = matchMedia("(pointer: fine)").matches;
  const S = window.SITE || (typeof SITE !== "undefined" ? SITE : null);
  if (!S) return;
  if (REDUCE) root.classList.add("calm");
  const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* 01 · Render all copy from content.js ---------------------- */
  // nav
  S.nav.forEach(n => { const a = el("a"); a.href = n.href; a.textContent = n.label; $("#navLinks").appendChild(a); });
  $("#talk span").textContent = S.cta.label; $("#talk").href = S.cta.href;
  // hero
  $("#heroName").textContent = S.name.split(" ")[0].toUpperCase();
  $("#heroRole").innerHTML = S.role.map(esc).join("<br>");
  $("#heroMeta").textContent = S.meta.join(" · ");
  $("#sideTag").textContent = S.sideTag;
  $("#nApp").textContent = S.notification.app; $("#nName").textContent = S.name; $("#nTime").textContent = S.notification.time;
  $("#nLead").textContent = S.notification.lead; $("#nMsg").textContent = S.notification.message;
  // chapter 02
  const C2 = S.chapter2;
  $("#ch2brand").innerHTML = "<em>" + esc(C2.brand[0]) + "</em> <b>" + esc(C2.brand[1]) + "</b>";
  const side = pairs => pairs.map(p => esc(p[0]) + " <b>" + esc(p[1]) + "</b>").join("<br>");
  $("#ch2left").innerHTML = side(C2.sideLeft); $("#ch2right").innerHTML = side(C2.sideRight);
  const colors = ["c1", "c2", "c3", "c4", "c5"]; let ci = 0;
  C2.lines.forEach(words => { const ln = el("span", "ln"); words.forEach(w => ln.appendChild(el("span", "w " + colors[ci++ % colors.length], esc(w)))); $("#ch2type").appendChild(ln); });
  const CHIP_COL = ["#FF9A1F", "#2F7DFF", "#E8433A", "#35D0E0", "#0B1220", "#FFC44D"];
  const CHIP_POS = [[-150, -70, -6], [60, -95, 4], [-40, -10, -3], [150, -20, 6], [-120, 60, 5], [80, 55, -4]];
  C2.chips.forEach((c, i) => { const ch = el("span", "chip", esc(c)); ch.style.background = CHIP_COL[i % CHIP_COL.length];
    if (CHIP_COL[i % CHIP_COL.length] === "#FFC44D" || CHIP_COL[i % CHIP_COL.length] === "#35D0E0") ch.style.color = "#0B1220";
    const p = CHIP_POS[i % CHIP_POS.length]; ch.dataset.x = p[0]; ch.dataset.y = p[1]; ch.style.setProperty("--cr", p[2] + "deg"); $("#chips").appendChild(ch); });
  // about
  $("#aboutEyebrow").textContent = S.about.eyebrow;
  $("#aboutTitle").innerHTML = S.about.title.map(esc).join("<br>");
  // floor
  const F = S.floor;
  $("#flLeft").textContent = F.labels.left; $("#flRight").textContent = F.labels.right;
  $("#flEyebrow").textContent = F.eyebrow; $("#flTitle").innerHTML = F.titleLines.map(esc).join("<br>"); $("#flDesc").textContent = F.description;
  F.ideas.forEach(d => { const c = el("div", "idea"); c.innerHTML = '<div class="no">' + esc(d.no) + '</div><h3>' + esc(d.title) + '</h3><p>' + esc(d.description) + '</p><div class="tags">' + d.tags.map(t => '<span class="tag">' + esc(t) + "</span>").join("") + "</div>"; $("#ideas").appendChild(c); });
  // method
  const E = S.editorial;
  $("#mEyebrow").textContent = E.eyebrow;
  $("#mStatement").innerHTML = E.statement.map(s => '<span class="ln"><span>' + esc(s) + "</span></span>").join("");
  $("#mNote").textContent = E.note; $("#skTitle").textContent = E.skills.title;
  E.skills.groups.forEach(g => { const d = el("div", "sk-group"); d.innerHTML = "<h4>" + esc(g.name) + '</h4><div class="tags">' + g.items.map(t => '<span class="tag">' + esc(t) + "</span>").join("") + "</div>"; $("#skTrack").appendChild(d); $("#skDots").appendChild(el("i")); });
  $("#mindTitle").textContent = E.mindset.title; E.mindset.lines.forEach(l => $("#mindLines").appendChild(el("li", "", esc(l))));
  $("#exTitle").textContent = E.exploring.title; E.exploring.items.forEach(l => $("#exItems").appendChild(el("li", "", esc(l))));
  $("#ending").innerHTML = E.ending.lines.map(l => '<span class="l">' + esc(l) + "</span>").join("") + "<p>" + esc(E.ending.note) + "</p>";
  // roadmap
  const RM = S.roadmap, HOPS = RM.hops;
  (RM.learning || []).forEach(c => { const a = el("a", "course"); a.href = c.href; a.target = "_blank"; a.rel = "noopener";
    a.innerHTML = '<span class="c-state"><i class="led amber"></i>' + esc(c.status) + '</span><span class="c-main"><b>' + esc(c.name) + "</b><span>" + esc(c.by) + "</span></span><p>" + esc(c.note) + '</p><span class="c-go" aria-hidden="true">↗</span>'; $("#learning").appendChild(a); });
  $("#rmEyebrow").textContent = RM.eyebrow; $("#rmTitle").innerHTML = RM.title.map(esc).join("<br>");
  // footer
  const FT = S.footer;
  $("#ftEyebrow").textContent = FT.eyebrow; $("#ftHead").innerHTML = FT.headline.map(h => '<span class="ln">' + esc(h) + "</span>").join(""); $("#ftLine").textContent = FT.line;
  FT.social.forEach(s => { const a = el("a"); a.href = s.href; a.target = "_blank"; a.rel = "noopener"; a.innerHTML = esc(s.label) + " <span aria-hidden=\"true\">↗</span>"; $("#ftSocial").appendChild(a); });
  FT.columns.forEach(c => { const d = el("div"); d.innerHTML = '<div class="eyebrow">' + esc(c.title) + "</div><ul>" + c.items.map(i => '<li><a href="' + esc(i[1]) + '">' + esc(i[0]) + "</a></li>").join("") + "</ul>"; $("#ftCols").appendChild(d); });
  $("#ftName").textContent = S.fullName + " · " + S.location;

  /* 02 · Hero ------------------------------------------------- */
  if (S.photo) { const img = $("#portraitImg"); img.alt = "Portrait of " + S.name; img.onload = () => { img.hidden = false; $("#portraitPh").hidden = true; }; img.src = S.photo; }
  const hero = $("#top");
  requestAnimationFrame(() => requestAnimationFrame(() => { hero.classList.add("go"); document.body.classList.add("ready"); }));
  if (FINE && !REDUCE) {
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    hero.addEventListener("pointermove", e => { const r = hero.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width - .5; ty = (e.clientY - r.top) / r.height - .5;
      hero.style.setProperty("--mx", (e.clientX - r.left) + "px"); hero.style.setProperty("--my", (e.clientY - r.top) + "px"); if (!raf) raf = requestAnimationFrame(drift); });
    function drift() { cx = lerp(cx, tx, .08); cy = lerp(cy, ty, .08); hero.style.setProperty("--px", (cx * 18).toFixed(2) + "px"); hero.style.setProperty("--py", (cy * 10).toFixed(2) + "px");
      raf = Math.abs(cx - tx) + Math.abs(cy - ty) > .001 ? requestAnimationFrame(drift) : 0; }
  }
  $("#notifX").addEventListener("click", () => $("#notif").classList.add("gone"));
  $("#notif").addEventListener("click", e => { if (e.target.id !== "notifX") document.getElementById("about").scrollIntoView({ behavior: REDUCE ? "auto" : "smooth" }); });
  // nav state
  const nav = $("#nav");
  const navSolid = () => nav.classList.toggle("solid", scrollY > 40);
  addEventListener("scroll", navSolid, { passive: true }); navSolid();
  const navMap = new Map($$("#navLinks a").map(a => [a.getAttribute("href").slice(1), a]));
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { navMap.forEach(a => a.classList.remove("on")); const a = navMap.get(en.target.id); if (a) a.classList.add("on"); } }), { rootMargin: "-45% 0px -50% 0px" });
  ["chapter-02", "about", "lab", "roadmap", "contact"].forEach(id => io.observe(document.getElementById(id)));

  /* 03 · Scroll engine --------------------------------------- */
  const scenes = [];
  const scene = (node, fn) => scenes.push({ node, fn, last: -1 });
  let ticking = false;
  function runScenes() {
    ticking = false; const vh = innerHeight;
    scenes.forEach(s => { const r = s.node.getBoundingClientRect(); if (r.bottom < -vh || r.top > vh * 2) return;
      const total = r.height - vh; const p = total > 0 ? clamp(-r.top / total) : 0; if (Math.abs(r.top - s.last) < .5) return; s.last = r.top; s.fn(p, r); });
  }
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(runScenes); } };
  addEventListener("scroll", onScroll, { passive: true }); addEventListener("resize", onScroll);

  // chapter 02 + puzzle
  const comp = $("#ch2comp"), lines = $$("#ch2type .ln"), chips = $$("#chips .chip"), puzzle = $("#puzzle");
  const setChip = (c, t) => { const k = REDUCE ? 1 : t; c.style.setProperty("--cx", (c.dataset.x * Math.min(1, innerWidth / 1100)) + "px"); c.style.setProperty("--cy", c.dataset.y * Math.min(1, innerWidth / 1100) + "px"); c.style.setProperty("--cs", k); };
  const COLS = 3, ROWS = 2, pieces = [];
  function buildPuzzle() {
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
      const p = el("div", "piece"); const clone = comp.cloneNode(true);
      $$("[id]", clone).forEach(n => n.removeAttribute("id")); clone.removeAttribute("id");
      $$(".w", clone).forEach(w => w.style.setProperty("--ty", "0%")); $$(".chip", clone).forEach(ch => setChip(ch, 1));
      const t = r / ROWS * 100, b = 100 - (r + 1) / ROWS * 100, l = c / COLS * 100, rr = 100 - (c + 1) / COLS * 100;
      p.style.clipPath = "inset(" + t + "% " + rr + "% " + b + "% " + l + "%)";
      p.dataset.dx = (c - (COLS - 1) / 2); p.dataset.dy = (r - (ROWS - 1) / 2) * 1.6; p.style.visibility = "hidden";
      p.appendChild(clone); puzzle.appendChild(p); pieces.push(p);
    }
  }
  if (!REDUCE) {
    buildPuzzle();
    scene($("#chapter-02"), (p, r) => {
      // type rises while the chapter scrolls into view, so the pinned screen is never empty
      const enter = clamp((innerHeight - r.top) / (innerHeight * .85));
      lines.forEach((ln, i) => { const t = easeOut(clamp((enter - .15 - i * .12) / .5)); $$(".w", ln).forEach(w => w.style.setProperty("--ty", ((1 - t) * 105).toFixed(2) + "%")); });
      chips.forEach((c, i) => setChip(c, easeBack(clamp((p - .04 - i * .04) / .16))));
      const w = clamp((p - .64) / .1), s = clamp((p - .74) / .26);
      comp.style.transform = "scale(" + (1 - w * .08) + ")"; comp.style.borderRadius = (w * 28) + "px"; comp.style.boxShadow = w ? "0 0 0 1px rgba(11,18,32,.15)" : "";
      const split = s > 0;
      comp.style.visibility = split ? "hidden" : "visible";
      pieces.forEach((pc, i) => { pc.style.visibility = split ? "visible" : "hidden"; if (!split) return; const e = easeOut(s);
        pc.style.transform = "translate(" + (pc.dataset.dx * e * 60) + "vw," + (pc.dataset.dy * e * 50) + "vh) rotate(" + ((i % 2 ? 1 : -1) * e * 14) + "deg) scale(" + (.92 - e * .12) + ")";
        pc.style.opacity = 1 - clamp((s - .55) / .45); pc.style.borderRadius = "28px"; });
      $("#chapter-02 .sticky").style.background = split ? "transparent" : "";
    });
  } else { lines.forEach(ln => $$(".w", ln).forEach(w => w.style.setProperty("--ty", "0%"))); chips.forEach(c => setChip(c, 1)); }

  /* 04 · About doors ----------------------------------------- */
  const layer = $("#doorLayer"), card = $("#doorCard"); let lastDoor = null;
  S.about.doors.forEach(d => {
    const b = el("button", "door" + (d.opensWorks ? " special" : "")); b.type = "button";
    b.innerHTML = '<span class="no">' + esc(d.no) + '</span><span class="arrow" aria-hidden="true">' + (d.opensWorks ? "→" : "↗") + '</span><span><span class="lbl">' + esc(d.label) + '</span><span class="tz">' + esc(d.teaser) + "</span></span>";
    b.style.display = "flex";
    if (FINE && !REDUCE) {
      b.addEventListener("pointermove", e => { const r = b.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        b.style.setProperty("--ry", ((x - .5) * 10) + "deg"); b.style.setProperty("--rx", ((.5 - y) * 8) + "deg"); b.style.setProperty("--gx", x * 100 + "%"); b.style.setProperty("--gy", y * 100 + "%"); });
      b.addEventListener("pointerleave", () => { b.style.removeProperty("--rx"); b.style.removeProperty("--ry"); });
    }
    b.addEventListener("click", () => { lastDoor = b; if (d.opensWorks) openWorks(); else openDoor(d, b); });
    $("#doors").appendChild(b);
  });
  function openDoor(d, b) {
    $("#dlNo").textContent = d.no + " · " + d.label; $("#dlTitle").textContent = d.title; $("#dlBody").textContent = d.body;
    $("#dlFacts").innerHTML = (d.facts || []).map(f => "<div><dt>" + esc(f[0]) + "</dt><dd>" + esc(f[1]) + "</dd></div>").join("");
    layer.hidden = false; root.style.overflow = "hidden";
    const br = b.getBoundingClientRect(), cr = card.getBoundingClientRect();
    card.style.setProperty("--ox", (br.left + br.width / 2 - cr.left) + "px"); card.style.setProperty("--oy", (br.top + br.height / 2 - cr.top) + "px");
    card.style.animation = "none"; void card.offsetWidth; card.style.animation = "";
    $("#doorX").focus();
  }
  function closeDoor() { layer.hidden = true; root.style.overflow = ""; if (lastDoor) lastDoor.focus(); }
  $("#doorX").addEventListener("click", closeDoor);
  layer.addEventListener("click", e => { if (e.target === layer) closeDoor(); });

  /* 05 · Case files (hidden chapter) -------------------------- */
  const works = $("#works"), wScroll = $("#worksScroll"), wTrack = $("#worksTrack"), world = $("#worksWorld"), flash = $("#flash");
  const PROJ = S.works.projects, GAP = 1100;
  const GLYPH = {
    drive: '<svg viewBox="0 0 120 80" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="6" y="10" width="108" height="60" rx="6"/><circle cx="96" cy="40" r="5" fill="currentColor"/><path d="M20 30h50M20 40h50M20 50h50"/></svg>',
    rack: '<svg viewBox="0 0 100 120" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="10" y="4" width="80" height="112" rx="4"/><path d="M18 20h64M18 36h64M18 52h64M18 68h64M18 84h64M18 100h64"/><circle cx="76" cy="28" r="2.5" fill="currentColor"/><circle cx="76" cy="60" r="2.5" fill="currentColor"/><circle cx="76" cy="92" r="2.5" fill="currentColor"/></svg>',
    term: '<svg viewBox="0 0 120 90" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="4" y="6" width="112" height="78" rx="6"/><path d="M4 22h112M20 42l12 10-12 10M42 64h30"/></svg>',
    graph: '<svg viewBox="0 0 120 80" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 74h108M6 6v68"/><path d="M14 60l22-18 18 10 24-30 18 14 16-12" stroke-linejoin="round"/><circle cx="78" cy="22" r="4" fill="currentColor"/></svg>',
    bolt: '<svg viewBox="0 0 80 110" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"><path d="M48 4L12 62h26l-8 44 40-62H42z"/></svg>',
    box: '<svg viewBox="0 0 110 100" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"><path d="M55 6l46 22v44L55 94 9 72V28z"/><path d="M9 28l46 22 46-22M55 50v44"/></svg>',
  };
  $("#worksBrand").textContent = S.works.brand;
  const wcards = PROJ.map((p, i) => {
    const c = el("article", "wcard"); c.style.setProperty("--acc", p.accent);
    c.innerHTML = '<div class="vis">' + (GLYPH[p.glyph] || "") + '<span class="big-no">' + String(i + 1).padStart(2, "0") + '</span></div><div class="txt"><div class="cat"><span>' + esc(p.cat) + "</span><span>" + esc(p.year) + "</span></div><h3>" + esc(p.name) + "</h3><h4>" + esc(p.title) + "</h4><p>" + esc(p.body) + '</p><div class="tags">' + p.tags.map(t => '<span class="tag">' + esc(t) + "</span>").join("") + "</div></div>";
    world.appendChild(c); return c;
  });
  const outro = el("div", "works-outro", '<h3>That’s the job.</h3><p class="dim" style="margin:0 auto 22px">Want to try one of these cases yourself?</p><div class="btns" style="justify-content:center"><button class="btn" type="button" id="toLab">Open the lab</button><button class="btn ghost" type="button" id="toAbout">Back to About</button></div>');
  world.appendChild(outro);
  wTrack.style.height = "calc(" + (PROJ.length + 1) + " * 100svh)";
  function layoutWorks() {
    const camZ = REDUCE ? 0 : (wScroll.scrollTop / Math.max(1, wScroll.scrollHeight - wScroll.clientHeight)) * PROJ.length * GAP;
    const vw = innerWidth;
    wcards.forEach((c, i) => { const z = -i * GAP + camZ; const x = (i % 2 ? 1 : -1) * Math.min(vw * .1, 120);
      const o = z > 250 ? clamp(1 - (z - 250) / 300) : clamp(1 - (-z - GAP * 1.6) / GAP);
      c.style.transform = "translate(-50%,-50%) translate3d(" + x + "px,0," + z + "px) rotateY(" + ((i % 2 ? -1 : 1) * 7) + "deg)"; c.style.opacity = o; c.style.pointerEvents = Math.abs(z) < 400 ? "auto" : "none"; });
    const oz = -PROJ.length * GAP + camZ;
    outro.style.transform = "translate(-50%,-50%) translate3d(0,0," + oz + "px)"; outro.style.opacity = clamp(1 - (-oz) / (GAP * 1.4)); outro.style.pointerEvents = oz > -300 ? "auto" : "none";
    const cur = Math.min(PROJ.length, Math.round(camZ / GAP));
    $("#worksCount").textContent = cur < PROJ.length ? String(cur + 1).padStart(2, "0") + " / " + String(PROJ.length).padStart(2, "0") + " · " + PROJ[cur].name : "End of files";
  }
  if (REDUCE) { world.style.position = "static"; }
  wScroll.addEventListener("scroll", () => requestAnimationFrame(layoutWorks), { passive: true });
  function flashTo(fn) { flash.classList.add("on"); setTimeout(() => { fn(); requestAnimationFrame(() => flash.classList.remove("on")); }, REDUCE ? 0 : 300); }
  function openWorks() { flashTo(() => { works.hidden = false; root.style.overflow = "hidden"; wScroll.scrollTop = 0; layoutWorks(); $("#worksX").focus(); }); }
  function closeWorks(target) { flashTo(() => { works.hidden = true; root.style.overflow = ""; const t = document.getElementById(target || "about"); t.scrollIntoView(); if (!target && lastDoor) lastDoor.focus(); }); }
  $("#worksX").addEventListener("click", () => closeWorks());
  outro.querySelector("#toAbout").addEventListener("click", () => closeWorks());
  outro.querySelector("#toLab").addEventListener("click", () => closeWorks("lab"));
  document.addEventListener("click", e => { const a = e.target.closest('a[href="#works"]'); if (a) { e.preventDefault(); lastDoor = a; openWorks(); } });
  document.addEventListener("keydown", e => { if (e.key !== "Escape") return; if (!works.hidden) closeWorks(); else if (!layer.hidden) closeDoor(); });

  /* 07 · Lab (defined before 3D so the floor can hook into it) -- */
  const bus = { onFault: null, onClear: null };
  const bays = $("#bays"), psus = $("#psus"), log = $("#log"), stepsEl = $("#steps"), parts = [];
  for (let i = 0; i < 8; i++) { const b = el("button", "bay", '<i class="led"></i><span>' + i + "</span>"); b.type = "button"; b.setAttribute("aria-label", "Drive bay " + i); b.dataset.kind = "drive"; b.dataset.id = i; bays.appendChild(b); parts.push(b); }
  for (let i = 1; i <= 2; i++) { const b = el("button", "psu", "<span>PSU" + i + '</span><i class="led"></i>'); b.type = "button"; b.setAttribute("aria-label", "Power supply " + i); b.dataset.kind = "psu"; b.dataset.id = i; psus.appendChild(b); parts.push(b); }
  const FAULTS = {
    drive: id => ({ lcd: "E2014 HDD " + id + "<br>DRIVE FAILURE", name: "drive in bay " + id, part: "1.92TB SAS SSD", log: "Physical Disk 0:1:" + id + " failed. PDR1016" }),
    psu: id => ({ lcd: "E1610 PSU" + id + "<br>AC LOST / FAULT", name: "power supply " + id, part: "1400W PSU", log: "Power supply unit " + id + " has failed. PSU0003" }),
  };
  const STEPS = [
    ["Collect logs", "Export SupportAssist collection and iDRAC lifecycle log.", "Export SupportAssist log"],
    ["Open case", "Upload evidence, triage with Dell Support / L3.", "Open Dell case"],
    ["Reseat", "POA step 1: reseat the part to rule out a bad connection.", "Reseat part"],
    ["Replace", "POA step 2: swap in the replacement from the parts locker.", "Replace part"],
    ["Validate", "Run hardware diagnostics and confirm health before handoff.", "Run diagnostics"],
    ["Document & close", "Record old/new PPID, attach logs, close the ServiceNow ticket.", "Close ticket"],
  ];
  let fault = null, step = -1, closedN = 0, t0 = 0;
  const ppid = () => "CN-0" + Math.random().toString(36).slice(2, 7).toUpperCase() + "-" + (10000 + Math.floor(Math.random() * 89999));
  const ts = () => new Date().toTimeString().slice(0, 8);
  function L(msg, c) { const d = el("div", c || ""); d.textContent = "[" + ts() + "] " + msg; log.appendChild(d); log.scrollTop = log.scrollHeight; }
  function renderSteps() { stepsEl.innerHTML = ""; STEPS.forEach((s, i) => { const li = el("li", i < step ? "done" : i === step ? "now" : ""); li.innerHTML = '<span class="chk"></span><span><b>' + s[0] + ".</b> " + s[1] + "</span>"; stepsEl.appendChild(li); }); }
  function setBtn() { const b = $("#nextBtn");
    if (step < 0) { b.textContent = "Locate the fault first"; b.disabled = true; b.classList.remove("pulse"); return; }
    if (step >= STEPS.length) { b.textContent = "Case closed"; b.disabled = true; b.classList.remove("pulse"); $("#newFault").classList.add("pulse"); return; }
    b.textContent = STEPS[step][2] + " →"; b.disabled = false; b.classList.add("pulse"); }
  const setLed = (p, f) => p.querySelector(".led").classList.toggle("fault", f);
  const bump = n => { n.classList.remove("nudge"); void n.offsetWidth; n.classList.add("nudge"); };
  function setAlert(on) { $("#sysLed").classList.toggle("fault", on); const a = $("#alertPill"); a.classList.toggle("ok", !on); a.querySelector(".led").classList.toggle("amber", on);
    $("#alertTxt").textContent = on ? "1 alert · rack A07" : "Rack A07 healthy"; }
  function inject() {
    parts.forEach(p => { setLed(p, false); p.classList.remove("sel"); });
    const p = parts[Math.floor(Math.random() * parts.length)];
    fault = Object.assign({ el: p }, FAULTS[p.dataset.kind](p.dataset.id));
    setLed(p, true); setAlert(true); const lcd = $("#lcd"); lcd.classList.add("alertc"); lcd.innerHTML = fault.lcd;
    step = -1; renderSteps(); setBtn(); $("#newFault").classList.remove("pulse");
    $("#poaTitle").textContent = "Find the amber LED"; $("#poaText").textContent = "A component has failed. Click the part with the blinking amber light.";
    $("#hint").textContent = "Healthy parts glow blue. Amber means fault.";
    L("ALERT monitoring: health state critical on dt-mem-24", "w"); t0 = performance.now(); if (bus.onFault) bus.onFault();
  }
  parts.forEach(p => p.addEventListener("click", () => {
    if (!fault || step >= 0) return;
    if (p !== fault.el) { L("Checked " + p.getAttribute("aria-label").toLowerCase() + ": status OK. Keep looking."); bump(p); $("#hint").textContent = "That one is healthy. The LCD names the failed part."; return; }
    p.classList.add("sel"); step = 0; renderSteps(); setBtn();
    $("#poaTitle").textContent = "Case: failed " + fault.name; $("#poaText").textContent = "Good catch. Each button below is the next real action on the case.";
    $("#hint").textContent = "Follow the POA in order."; L("Located amber LED on " + fault.name + ".", "w");
  }));
  $("#nextBtn").addEventListener("click", () => {
    if (step < 0 || !fault) return;
    [() => L("SupportAssist collection exported. SEL: " + fault.log),
     () => L("Dell case opened, logs uploaded. L3 POA: reseat " + fault.name + "; if fault persists, replace " + fault.part + ".", "g"),
     () => { bump(fault.el); L("Reseated " + fault.name + ". Amber LED still on: fault persists.", "w"); },
     () => { setLed(fault.el, false); fault.el.classList.remove("sel"); L("Swapped " + fault.part + ". Old PPID " + ppid() + " → new PPID " + ppid() + " (sample values)."); },
     () => { setAlert(false); const l = $("#lcd"); l.classList.remove("alertc"); l.innerHTML = "SYSTEM OK<br>SVC TAG DT-MEM-24"; L("ePSA diagnostics PASSED. iDRAC health: OK.", "g"); if (bus.onClear) bus.onClear(); },
     () => { closedN++; $("#closed").textContent = closedN; $("#sla").textContent = Math.round((performance.now() - t0) / 1000) + "s"; L("Ticket closed. Server returned to production.", "g");
       $("#poaTitle").textContent = "Restored within SLA"; $("#poaText").textContent = "That’s the loop I run every shift: detect, document, fix, validate, close."; }][step]();
    step++; renderSteps(); setBtn();
    if (step >= STEPS.length) { fault = null; $("#hint").textContent = "Inject another fault to run a new case."; }
  });
  $("#newFault").addEventListener("click", inject);
  $("#alertPill").addEventListener("click", () => { if (!fault) inject(); $("#lab").scrollIntoView({ behavior: REDUCE ? "auto" : "smooth" }); });
  (function () { const w = $("#chassisWrap"), c = $("#chassis"); if (!FINE || REDUCE) return;
    w.addEventListener("pointermove", e => { const r = w.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      c.style.setProperty("--ry", (-12 + x * 16) + "deg"); c.style.setProperty("--rx", (10 - y * 12) + "deg"); });
    w.addEventListener("pointerleave", () => { c.style.removeProperty("--rx"); c.style.removeProperty("--ry"); }); })();

  /* 08 · Method (statement from the left, skills from the right) */
  const sLines = $$("#mStatement .ln span"), groups = $$("#skTrack .sk-group"), dots = $$("#skDots i"), track = $("#skTrack");
  if (!REDUCE) scene($("#method"), p => {
    sLines.forEach((s, i) => s.style.setProperty("--tx", ((1 - easeOut(clamp((p - i * .06) / .22))) * -110).toFixed(2) + "%"));
    const f = clamp((p - .18) / .72) * groups.length; let focus = 0;
    groups.forEach((g, i) => { const t = easeOut(clamp(f - i)); g.style.setProperty("--gx", ((1 - t) * 120).toFixed(2) + "%"); g.style.setProperty("--go", t.toFixed(3)); if (f >= i) focus = i; });
    focus = Math.min(focus, groups.length - 1);
    groups.forEach((g, i) => g.classList.toggle("focus", i === focus && f > 0));
    const mid = g => g.offsetTop + g.offsetHeight / 2;
    const y = lerp(mid(groups[Math.max(focus - 1, 0)]), mid(groups[focus]), easeOut(clamp(f - focus)));
    track.style.setProperty("--ty", (-y) + "px");
    dots.forEach((d, i) => d.classList.toggle("on", i === focus && f > 0));
  });

  /* 09 · Roadmap: hops + drill (3D topology is in 06) ---------- */
  const ACTIVE = Math.max(0, HOPS.findIndex(h => h.status === "active"));
  const SL = { done: "Reached", active: "In progress", planned: "Planned" };
  const hopbar = $("#hopbar"), topoApi = { select() {}, trace() {} };
  HOPS.forEach((h, i) => { const b = el("button", "hopbtn " + h.status); b.type = "button"; b.textContent = String(i + 1).padStart(2, "0") + " " + h.name; b.addEventListener("click", () => pickHop(i)); hopbar.appendChild(b); });
  function pickHop(i) { const h = HOPS[i]; $$(".hopbtn", hopbar).forEach((b, j) => b.setAttribute("aria-pressed", j === i));
    $("#hdNum").textContent = "Hop " + String(i + 1).padStart(2, "0"); $("#hdName").textContent = h.name;
    const p = $("#hdStatus"); p.textContent = SL[h.status]; p.className = "pill " + h.status;
    $("#hdTopics").innerHTML = h.topics.map(t => '<span class="tag">' + esc(t) + "</span>").join(""); $("#hdLab").textContent = h.lab; topoApi.select(i); }
  const reached = HOPS.filter(h => h.status === "done").length;
  $("#progFill").style.width = Math.round((reached + .5) / HOPS.length * 100) + "%"; $("#progTxt").textContent = reached + " of " + HOPS.length + " hops reached";
  $("#traceBtn").addEventListener("click", () => topoApi.trace());
  // subnet drill
  const toInt = s => { const p = s.trim().split("."); if (p.length !== 4) return null; let n = 0; for (const x of p) { if (!/^\d{1,3}$/.test(x) || +x > 255) return null; n = n * 256 + +x; } return n >>> 0; };
  const toIp = n => [n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
  const subnet = (ip, c) => { const mask = c === 0 ? 0 : (0xFFFFFFFF << (32 - c)) >>> 0, net = (ip & mask) >>> 0, bc = (net | (~mask >>> 0)) >>> 0; return { net: toIp(net), bc: toIp(bc), hosts: c >= 31 ? 0 : Math.pow(2, 32 - c) - 2, mask: toIp(mask) }; };
  let dq = null, score = 0, streak = 0;
  function newQ() { const bases = [[10], [172, 16 + Math.floor(Math.random() * 16)], [192, 168]]; const o = bases[Math.floor(Math.random() * 3)].slice();
    while (o.length < 4) o.push(Math.floor(Math.random() * 256)); const c = 19 + Math.floor(Math.random() * 11);
    dq = { ip: o.join("."), c, ans: subnet(toInt(o.join(".")), c) }; $("#dQ").textContent = dq.ip + " /" + c; $("#dRes").textContent = "";
    ["#dNet", "#dBc", "#dHosts"].forEach(s => { $(s).value = ""; $(s).className = ""; }); }
  $("#drillForm").addEventListener("submit", e => { e.preventDefault(); const a = dq.ans;
    const ok1 = toInt($("#dNet").value), ok2 = toInt($("#dBc").value);
    const r = [["#dNet", ok1 !== null && ok1 === toInt(a.net)], ["#dBc", ok2 !== null && ok2 === toInt(a.bc)], ["#dHosts", $("#dHosts").value.trim() !== "" && +$("#dHosts").value.replace(/,/g, "") === a.hosts]];
    r.forEach(([s, ok]) => { $(s).className = ok ? "ok" : "bad"; });
    if (r.every(x => x[1])) { score++; streak++; $("#dRes").textContent = "All correct. Mask is " + a.mask + "."; $("#dRes").style.color = "var(--good)"; }
    else { streak = 0; const oi = Math.floor((dq.c - 1) / 8); $("#dRes").textContent = r.filter(x => !x[1]).length + " field(s) off. Hint: block size is " + Math.pow(2, 8 - (dq.c - 8 * oi)) + " in the " + ["1st", "2nd", "3rd", "4th"][oi] + " octet."; $("#dRes").style.color = "var(--amber)"; }
    $("#dScore").textContent = score; $("#dStreak").textContent = streak; });
  $("#dShow").addEventListener("click", () => { const a = dq.ans; streak = 0; $("#dStreak").textContent = 0; $("#dRes").style.color = "var(--fg)";
    $("#dRes").textContent = "Network " + a.net + "\nBroadcast " + a.bc + "\nUsable hosts " + a.hosts.toLocaleString() + "\nMask " + a.mask; });
  $("#dNew").addEventListener("click", newQ); newQ();

  /* 06 · 3D (Three.js): the floor rack + the roadmap topology --- */
  function hasGL() { try { const c = document.createElement("canvas"); return !!(window.THREE && (c.getContext("webgl") || c.getContext("experimental-webgl"))); } catch (e) { return false; } }
  const ideaEls = $$("#ideas .idea");
  if (!REDUCE) scene($("#floor"), p => ideaEls.forEach((d, i) => { const t = clamp((p - .08 - i * .26) / .5);
    d.style.setProperty("--z", (lerp(-2200, 700, t)).toFixed(0) + "px"); d.style.setProperty("--o", (t < .15 ? t / .15 : t > .8 ? clamp(1 - (t - .8) / .2) : 1).toFixed(3)); }));

  if (hasGL()) build3D(); else root.classList.add("no3d");

  function build3D() {
    const T3 = THREE;
    function makeScene(canvas) {
      const renderer = new T3.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      const sc = new T3.Scene(), cam = new T3.PerspectiveCamera(35, 1, .1, 100);
      const resize = () => { const w = canvas.clientWidth, h = canvas.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); };
      new ResizeObserver(resize).observe(canvas); resize();
      let vis = false; new IntersectionObserver(e => { vis = e[0].isIntersecting; }).observe(canvas);
      return { renderer, scene: sc, camera: cam, visible: () => vis && !document.hidden && works.hidden };
    }
    const ndc = (e, c) => { const r = c.getBoundingClientRect(); return new T3.Vector2((e.clientX - r.left) / r.width * 2 - 1, -(e.clientY - r.top) / r.height * 2 + 1); };
    const ray = new T3.Raycaster();
    const BLUE = new T3.Color("#2F7DFF"), AMBER = new T3.Color("#FF9A1F"), AMBER_OFF = new T3.Color("#3A2A10");

    /* ---- floor: rack A07 between two neighbours, follows the cursor ---- */
    const R = makeScene($("#floor3d"));
    R.camera.position.set(0, 1.7, 7.4); R.camera.lookAt(.9, 1.5, 0);
    R.scene.add(new T3.HemisphereLight(0xc8dcff, 0x05070a, .7));
    const key = new T3.DirectionalLight(0xffffff, .9); key.position.set(3, 5, 4); R.scene.add(key);
    const cold = new T3.PointLight(0x2f7dff, 2, 9); cold.position.set(0, .3, 2.6); R.scene.add(cold);
    const rim = new T3.PointLight(0x7fb2ff, 1.2, 10); rim.position.set(-3, 4, -2); R.scene.add(rim);
    const hall = new T3.Group(); hall.position.x = 1.4; R.scene.add(hall);
    const grid = new T3.GridHelper(16, 26, 0x1c2a3a, 0x1c2a3a); hall.add(grid);
    (function tiles() { const c = document.createElement("canvas"); c.width = c.height = 64; const x = c.getContext("2d"); x.fillStyle = "#182330"; x.fillRect(0, 0, 64, 64); x.fillStyle = "#05070a";
      for (let i = 4; i < 64; i += 8) for (let j = 4; j < 64; j += 8) { x.beginPath(); x.arc(i, j, 2, 0, 7); x.fill(); }
      const t = new T3.CanvasTexture(c); t.wrapS = t.wrapT = T3.RepeatWrapping; t.repeat.set(9, 1);
      const m = new T3.Mesh(new T3.PlaneGeometry(5.5, .61), new T3.MeshStandardMaterial({ map: t })); m.rotation.x = -Math.PI / 2; m.position.set(0, .003, 1.05); hall.add(m); })();
    function bezelTex(rows) { const c = document.createElement("canvas"); c.width = 512; c.height = 56 * rows; const x = c.getContext("2d");
      x.fillStyle = "#252f3a"; x.fillRect(0, 0, c.width, c.height); x.fillStyle = "#0e2a3e"; x.fillRect(10, 7, 62, c.height - 14);
      const n = rows === 2 ? 8 : 6, bw = (512 - 100) / n;
      for (let i = 0; i < n; i++) { const bx = 88 + i * bw; x.fillStyle = "#0d1318"; x.fillRect(bx + 2, 7, bw - 4, c.height - 14); x.fillStyle = "#3a4652"; for (let k = bx + 7; k < bx + bw - 7; k += 5) x.fillRect(k, c.height * .38, 2, c.height * .24); }
      return new T3.CanvasTexture(c); }
    const TEX = { 1: bezelTex(1), 2: bezelTex(2) }, U = .16, LAYOUT = [2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2];
    const frameMat = new T3.MeshStandardMaterial({ color: 0x1a222b, metalness: .6, roughness: .45 }), bodyMat = new T3.MeshStandardMaterial({ color: 0x2b343e, metalness: .5, roughness: .5 });
    const servers = [], hits = [];
    function rack(xoff, live) {
      const g = new T3.Group(); g.position.x = xoff; const H = 3.1;
      [[-.56, -.5], [.56, -.5], [-.56, .5], [.56, .5]].forEach(([x, z]) => { const p = new T3.Mesh(new T3.BoxGeometry(.07, H, .07), frameMat); p.position.set(x, H / 2, z); g.add(p); });
      [0, H].forEach(y => { const s = new T3.Mesh(new T3.BoxGeometry(1.2, .06, 1.07), frameMat); s.position.y = y; g.add(s); });
      let y = .12;
      LAYOUT.forEach((u, i) => { const h = u * U, sg = new T3.Group();
        const body = new T3.Mesh(new T3.BoxGeometry(1.02, h - .014, .92), bodyMat); sg.add(body);
        const face = new T3.Mesh(new T3.PlaneGeometry(1, h - .02), new T3.MeshStandardMaterial({ map: TEX[u], metalness: .3, roughness: .6 })); face.position.z = .461; sg.add(face);
        const led = new T3.Mesh(new T3.BoxGeometry(.03, .03, .01), new T3.MeshBasicMaterial({ color: BLUE.clone() })); led.position.set(.45, 0, .468); sg.add(led);
        sg.position.y = y + h / 2; y += h + .01; g.add(sg);
        if (live) { const s = { g: sg, led, z: 0, target: 0, idx: i }; servers.push(s); body.userData.s = s; face.userData.s = s; hits.push(body, face); } });
      hall.add(g); }
    rack(0, true); rack(-1.4, false); rack(1.4, false);
    let faultIdx = -1, hover = null, mouse = null, tgt = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
    bus.onFault = () => { faultIdx = Math.floor(Math.random() * servers.length); servers.forEach(s => { s.target = 0; }); };
    bus.onClear = () => { faultIdx = -1; servers.forEach(s => { s.target = 0; }); };
    if (fault) bus.onFault();
    const fc = $("#floor3d");
    addEventListener("pointermove", e => { tgt.x = e.clientX / innerWidth - .5; tgt.y = e.clientY / innerHeight - .5; }, { passive: true });
    fc.addEventListener("pointermove", e => { mouse = ndc(e, fc); });
    fc.addEventListener("pointerleave", () => { mouse = null; });
    fc.addEventListener("click", e => { ray.setFromCamera(ndc(e, fc), R.camera); const h = ray.intersectObjects(hits)[0]; if (!h) return; const s = h.object.userData.s;
      if (s.idx === faultIdx) { s.target = .65; const u = LAYOUT.slice(0, s.idx).reduce((a, b) => a + b, 1);
        L("Data hall: amber LED on rack A07, U" + u + ". Pulled to the bench.", "w"); setTimeout(() => $("#lab").scrollIntoView({ behavior: "smooth" }), 700); }
      else { s.target = .25; setTimeout(() => { if (s.target === .25) s.target = 0; }, 700); } });
    function floorLoop(t) {
      requestAnimationFrame(floorLoop); if (!R.visible()) return;
      const auto = FINE ? 0 : Math.sin(t * .0004) * .35;
      cur.x = lerp(cur.x, tgt.x, .06); cur.y = lerp(cur.y, tgt.y, .06);
      hall.rotation.y = -.35 + (FINE ? cur.x * 1.1 : auto); hall.rotation.x = FINE ? cur.y * .12 : 0;
      hover = null; if (mouse) { ray.setFromCamera(mouse, R.camera); const h = ray.intersectObjects(hits)[0]; hover = h ? h.object.userData.s : null; }
      fc.style.cursor = hover ? "pointer" : "";
      const on = Math.floor(t / 500) % 2 === 0;
      servers.forEach(s => { let z = s.target; if (hover === s && z < .1) z = .1; s.z = lerp(s.z, z, .12); s.g.position.z = s.z;
        s.led.material.color.copy(s.idx === faultIdx ? (on ? AMBER : AMBER_OFF) : BLUE); });
      R.renderer.render(R.scene, R.camera);
    }
    requestAnimationFrame(floorLoop);

    /* ---- roadmap topology ---- */
    const Tp = makeScene($("#topo3d")), topoEl = $("#topo");
    Tp.camera.position.set(0, 1.8, 9.4); Tp.camera.lookAt(0, 0, 0);
    Tp.scene.add(new T3.HemisphereLight(0xc8dcff, 0x05070a, .85));
    const tk = new T3.DirectionalLight(0xffffff, .8); tk.position.set(2, 4, 5); Tp.scene.add(tk);
    const net = new T3.Group(); Tp.scene.add(net);
    const pos = HOPS.map((_, i) => new T3.Vector3((i - (HOPS.length - 1) / 2) * 1.12, Math.sin(i * .85) * .75, Math.cos(i * .95) * 1.1));
    const nodes = [], labels = [];
    HOPS.forEach((h, i) => { let geo, mat;
      if (h.status === "done") { geo = new T3.BoxGeometry(.52, .2, .42); mat = new T3.MeshStandardMaterial({ color: BLUE, emissive: BLUE, emissiveIntensity: .3, metalness: .4, roughness: .35 }); }
      else if (h.status === "active") { geo = new T3.OctahedronGeometry(.34); mat = new T3.MeshStandardMaterial({ color: AMBER, emissive: AMBER, emissiveIntensity: .55, roughness: .3 }); }
      else if (i === HOPS.length - 1) { geo = new T3.TorusKnotGeometry(.24, .07, 90, 10); mat = new T3.MeshStandardMaterial({ color: 0x9fb4c8, wireframe: true }); }
      else { geo = new T3.IcosahedronGeometry(.27, 0); mat = new T3.MeshStandardMaterial({ color: 0x8fa0ae, wireframe: true }); }
      const m = new T3.Mesh(geo, mat); m.position.copy(pos[i]); m.userData.i = i; net.add(m); nodes.push(m);
      const l = el("div", "nlbl", String(i + 1).padStart(2, "0")); topoEl.appendChild(l); labels.push(l); });
    for (let i = 0; i < pos.length - 1; i++) { const g = new T3.BufferGeometry().setFromPoints([pos[i], pos[i + 1]]); const reachedLink = i < ACTIVE;
      const line = new T3.Line(g, reachedLink ? new T3.LineBasicMaterial({ color: BLUE }) : new T3.LineDashedMaterial({ color: 0x4d5d6e, dashSize: .12, gapSize: .08 }));
      if (!reachedLink) line.computeLineDistances(); net.add(line); }
    const ring = new T3.Mesh(new T3.RingGeometry(.5, .55, 48), new T3.MeshBasicMaterial({ color: 0x7fb2ff, side: T3.DoubleSide, transparent: true, opacity: .9 })); net.add(ring);
    const packet = new T3.Mesh(new T3.SphereGeometry(.07, 16, 16), new T3.MeshBasicMaterial({ color: 0xffffff })); packet.add(new T3.PointLight(0x7fb2ff, 1.4, 2)); net.add(packet);
    let sel = ACTIVE, pp = 0, tracing = false, tIdx = -1;
    topoApi.select = i => { sel = i; labels.forEach((l, j) => l.classList.toggle("on", j === i)); };
    topoApi.trace = () => { tracing = true; pp = 0; tIdx = -1; };
    topoApi.select(sel);
    const st = { ry: 0, rx: 0, drag: false, moved: 0 }, tc = $("#topo3d"); let tm = null, px = 0, py = 0;
    tc.addEventListener("pointerdown", e => { st.drag = true; st.moved = 0; px = e.clientX; py = e.clientY; });
    addEventListener("pointermove", e => { if (!st.drag) return; const dx = e.clientX - px, dy = e.clientY - py; px = e.clientX; py = e.clientY; st.moved += Math.abs(dx) + Math.abs(dy); st.ry += dx * .008; st.rx = clamp(st.rx + dy * .004, -.3, .45); });
    addEventListener("pointerup", () => { st.drag = false; });
    tc.addEventListener("pointermove", e => { tm = ndc(e, tc); }); tc.addEventListener("pointerleave", () => { tm = null; });
    tc.addEventListener("click", e => { if (st.moved > 6) return; ray.setFromCamera(ndc(e, tc), Tp.camera); const h = ray.intersectObjects(nodes)[0]; if (h) pickHop(h.object.userData.i); });
    const v = new T3.Vector3(), one = new T3.Vector3(), inv = new T3.Quaternion();
    const along = p => { const i = Math.min(Math.floor(p), pos.length - 2); return v.copy(pos[i]).lerp(pos[i + 1], Math.min(p - i, 1)); };
    function topoLoop(t) {
      requestAnimationFrame(topoLoop); if (!Tp.visible()) return;
      net.rotation.y = st.ry + (st.drag ? 0 : Math.sin(t * .00025) * .3); net.rotation.x = st.rx * .6;
      let hov = null; if (tm && !st.drag) { ray.setFromCamera(tm, Tp.camera); const h = ray.intersectObjects(nodes)[0]; hov = h ? h.object : null; }
      tc.style.cursor = hov ? "pointer" : "grab";
      nodes.forEach((n, i) => { const s = n === hov || i === sel ? 1.25 : 1; n.scale.lerp(one.set(s, s, s), .15); n.rotation.y += .008; if (HOPS[i].status === "active") n.position.y = pos[i].y + Math.sin(t * .003) * .06; });
      if (tracing) { pp += .025; const hop = Math.floor(pp + .05); if (hop !== tIdx && hop < HOPS.length) { tIdx = hop; pickHop(hop); } if (pp >= pos.length - 1) { tracing = false; pp = 0; pickHop(ACTIVE); } }
      else { pp += .012; if (pp > ACTIVE) pp = 0; }
      packet.position.copy(along(pp));
      ring.position.copy(nodes[sel].position); inv.copy(net.quaternion).invert(); ring.quaternion.copy(inv).multiply(Tp.camera.quaternion);
      const r = tc.getBoundingClientRect();
      nodes.forEach((n, i) => { v.copy(n.position); net.localToWorld(v); v.project(Tp.camera); labels[i].style.left = ((v.x + 1) / 2 * r.width) + "px"; labels[i].style.top = ((-v.y + 1) / 2 * r.height) + "px"; });
      Tp.renderer.render(Tp.scene, Tp.camera);
    }
    requestAnimationFrame(topoLoop);
  }

  /* 10 · Boot -------------------------------------------------- */
  inject(); pickHop(ACTIVE); runScenes();
  if (location.hash === "#works") openWorks();
})();
