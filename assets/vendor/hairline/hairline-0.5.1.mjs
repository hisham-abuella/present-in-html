// @lucasmarkes/hairline 0.5.1 (MIT, see LICENSE in this folder). https://github.com/lucasmarkes/hairline
// Tree-shaken from dist/index.js with esbuild to the two figures this site uses: exploded, riffle.
var LIGHT = { plate: "#ffffff", hi: "#232327", edge: "#a4a4ac", mid: "#c3c3c9", lo: "#e0e0e4" };
var DARK = { plate: "#08090a", hi: "#d0d6e0", edge: "#5b5d64", mid: "#3e3e44", lo: "#29292d" };
var KEYS = ["plate", "hi", "edge", "mid", "lo"];
var vars = (p) => KEYS.map((k) => `--hl-${k}:var(--hairline-${k},${p[k]});`).join("");
var EASE = "cubic-bezier(0.5,0,0.1,1)";
var SVG = ":where([data-hairline]>svg)";
function css(lightDark) {
  const both = Object.fromEntries(KEYS.map((k) => [k, `light-dark(${LIGHT[k]},${DARK[k]})`]));
  return [
    // the box, and the palette: light unless something below says otherwise
    `:where([data-hairline]){display:block;position:relative;aspect-ratio:5/4;touch-action:pan-y;user-select:none;-webkit-user-select:none;--hl-sw:var(--hairline-stroke,0.9);${vars(LIGHT)}}`,
    // the page's color-scheme
    lightDark ? `:where([data-hairline]){${vars(both)}}` : "",
    // an ancestor that says dark
    `:where(.dark,[data-theme="dark"]) :where([data-hairline]){${vars(DARK)}}`,
    // the figure's own theme option
    `:where([data-hairline][data-hairline-theme="light"]){${vars(LIGHT)}}`,
    `:where([data-hairline][data-hairline-theme="dark"]){${vars(DARK)}}`,
    `:where([data-hairline]:focus-visible){outline:1.5px solid var(--hl-hi);outline-offset:2px}`,
    `${SVG}{position:absolute;inset:0;width:100%;height:100%;display:block}`,
    // Riffle's live region: read, not seen
    `:where([data-hairline]>[data-hairline-live]){position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap}`,
    // the drawing: plates are filled with the plate colour and painted back to front
    `${SVG} :where(path,polygon,ellipse,line){fill:var(--hl-plate);stroke:var(--hl-mid);stroke-width:var(--hl-sw);vector-effect:non-scaling-stroke;stroke-linejoin:round;stroke-linecap:round;transition:stroke 260ms ${EASE}}`,
    `${SVG} :where(.nf){fill:none}`,
    `${SVG} :where(.fo){stroke:none}`,
    `${SVG} :where(.sil){stroke:var(--hl-edge)}`,
    `${SVG} :where(.hi){stroke:var(--hl-hi)}`,
    `${SVG} :where(.lo){stroke:var(--hl-lo)}`,
    `${SVG} :where(.dash){stroke-dasharray:1 3}`,
    `${SVG} :where(.dot){stroke:none;fill:var(--hl-hi);transition:fill 260ms ${EASE}}`,
    `${SVG} :where(.dot.m){fill:var(--hl-edge)}`,
    `${SVG} :where(.dot.off){fill:var(--hl-lo)}`,
    `${SVG} :where(.ghost path){fill:none;stroke:var(--hl-mid)}`
  ].join("");
}
var done = /* @__PURE__ */ new WeakSet();
function inject(root) {
  if (done.has(root)) return;
  done.add(root);
  const doc = root.nodeType === 9 ? root : root.ownerDocument;
  const win = doc.defaultView;
  const text = css(!!win?.CSS?.supports?.("color", "light-dark(#000,#fff)"));
  if (win && "adoptedStyleSheets" in root) {
    try {
      const sheet = new win.CSSStyleSheet();
      sheet.replaceSync(text);
      root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet];
      return;
    } catch {
    }
  }
  const style = doc.createElement("style");
  style.setAttribute("data-hairline-style", "");
  style.textContent = text;
  (root.nodeType === 9 ? doc.head ?? doc.documentElement : root).appendChild(style);
}
var clamp = (v, a, b) => Math.max(a, Math.min(b, v));
var rad = (d) => d * Math.PI / 180;
var r2 = (n) => Math.round(n * 100) / 100;
var poly = (pts) => "M" + pts.map((p) => r2(p[0]) + " " + r2(p[1])).join("L") + "Z";
var seg = (a, b) => `M${r2(a[0])} ${r2(a[1])}L${r2(b[0])} ${r2(b[1])}`;
var open = (pts) => pts.length < 2 ? "" : "M" + pts.map((p) => r2(p[0]) + " " + r2(p[1])).join("L");
var Cam = (azDeg, k, S9) => ({ az: rad(azDeg), k, S: S9, ox: 0, oy: 0 });
function proj(C) {
  const c = Math.cos(C.az), s = Math.sin(C.az), zf = Math.sqrt(1 - C.k * C.k);
  return (x, y, z) => {
    const X = x * c - y * s, Y = x * s + y * c;
    return [C.ox + C.S * X, C.oy + C.S * (Y * C.k - z * zf)];
  };
}
function fit(C, pts, cx, cy) {
  C.ox = 0;
  C.oy = 0;
  const P = proj(C);
  let a = 1e9, b = -1e9, c = 1e9, d = -1e9;
  for (const p of pts) {
    const q = P(p[0], p[1], p[2]);
    a = Math.min(a, q[0]);
    b = Math.max(b, q[0]);
    c = Math.min(c, q[1]);
    d = Math.max(d, q[1]);
  }
  C.ox = cx - (a + b) / 2;
  C.oy = cy - (c + d) / 2;
}
function rrect(u0, v0, u1, v1, r, n = 4) {
  r = Math.max(0, Math.min(r, (u1 - u0) / 2, (v1 - v0) / 2));
  const out = [];
  for (const [cu, cv, a0] of [[u1 - r, v1 - r, 0], [u0 + r, v1 - r, 90], [u0 + r, v0 + r, 180], [u1 - r, v0 + r, 270]])
    for (let k = 0; k <= n; k++) {
      const a = rad(a0 + 90 * k / n), ca = Math.cos(a), sa = Math.sin(a);
      out.push({ u: cu + r * ca, v: cv + r * sa, nu: ca, nv: sa });
    }
  return out;
}
function hull(input) {
  const pts = input.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const x = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo = [], up = [];
  for (const p of pts) {
    while (lo.length > 1 && x(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop();
    lo.push(p);
  }
  for (let i = pts.length - 1; i >= 0; i--) {
    const p = pts[i];
    while (up.length > 1 && x(up[up.length - 2], up[up.length - 1], p) <= 0) up.pop();
    up.push(p);
  }
  lo.pop();
  up.pop();
  return lo.concat(up);
}
var ringAt = (P, ring, z) => ring.map((q) => P(q.u, q.v, z));
var facing = (C) => {
  const s = Math.sin(C.az), c = Math.cos(C.az);
  return (q) => q.nu * s + q.nv * c >= -1e-6;
};
function run(ring, keep) {
  const n = ring.length;
  let s = -1;
  for (let i = 0; i < n; i++) if (keep(ring[i]) && !keep(ring[(i + n - 1) % n])) {
    s = i;
    break;
  }
  if (s < 0) return keep(ring[0]) ? ring.slice() : [];
  const out = [];
  for (let k = 0; k < n && keep(ring[(s + k) % n]); k++) out.push(ring[(s + k) % n]);
  return out;
}
function prism(P, front2, ring, inner3, z0, z1) {
  return {
    sil: poly(hull(ringAt(P, ring, z1).concat(ringAt(P, ring, z0)))),
    crease: inner3 ? open(ringAt(P, run(inner3, front2), z1)) : ""
  };
}
var rings = (x0, y0, x1, y1, r, b) => [
  rrect(x0, y0, x1, y1, r),
  rrect(x0 + b, y0 + b, x1 - b, y1 - b, Math.max(0.3, r - b))
];
function extremes(P, ring) {
  const pr = ring.map((q) => P(q.u, q.v, 0));
  let a = 0, b = 0, c = 0;
  pr.forEach((p, k) => {
    if (p[0] < pr[a][0]) a = k;
    if (p[0] > pr[b][0]) b = k;
    if (p[1] > pr[c][1]) c = k;
  });
  return [ring[a], ring[b], ring[c]];
}
function fillet(pts, rs, n = 4) {
  const m = pts.length, out = [];
  for (let i = 0; i < m; i++) {
    const a = pts[(i + m - 1) % m], p = pts[i], b = pts[(i + 1) % m];
    const la = Math.hypot(a[0] - p[0], a[1] - p[1]), lb = Math.hypot(b[0] - p[0], b[1] - p[1]);
    const t = Math.min(rs[i], la / 2, lb / 2);
    const p1 = [p[0] + (a[0] - p[0]) / la * t, p[1] + (a[1] - p[1]) / la * t];
    const p2 = [p[0] + (b[0] - p[0]) / lb * t, p[1] + (b[1] - p[1]) / lb * t];
    for (let k = 0; k <= n; k++) {
      const s = k / n, w = 1 - s;
      out.push([w * w * p1[0] + 2 * w * s * p[0] + s * s * p2[0], w * w * p1[1] + 2 * w * s * p[1] + s * s * p2[1]]);
    }
  }
  return out;
}
function ghost(P, front2, ring, z0, depth2) {
  const f = run(ring, front2), lowP = ringAt(P, f, z0 - depth2);
  return {
    d: open(lowP) + [f[0], f[f.length - 1]].map((q) => seg(P(q.u, q.v, z0), P(q.u, q.v, z0 - depth2))).join(""),
    y0: Math.min(...ringAt(P, f, z0).map((p) => p[1])),
    y1: Math.max(...lowP.map((p) => p[1])) + 2
  };
}
var reduced = false;
var setReducedMotion = (on) => {
  reduced = on;
};
var reducedMotion = () => reduced;
function spring(x, o = {}) {
  return { x, v: 0, t: x, k: o.k ?? 100, c: o.c ?? 18, m: o.m ?? 1, eps: o.eps ?? 0.01 };
}
function stepS(sp, dt) {
  if (reduced) {
    sp.x = sp.t;
    sp.v = 0;
    return false;
  }
  const n = Math.max(1, Math.ceil(dt * 240)), h = dt / n;
  for (let i = 0; i < n; i++) {
    const a = (-sp.k * (sp.x - sp.t) - sp.c * sp.v) / sp.m;
    sp.v += a * h;
    sp.x += sp.v * h;
  }
  if (Math.abs(sp.x - sp.t) < sp.eps && Math.abs(sp.v) < sp.eps * 10) {
    sp.x = sp.t;
    sp.v = 0;
    return false;
  }
  return true;
}
function bezier(x1, y1, x2, y2) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax2 = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const X = (u) => ((ax2 * u + bx) * u + cx) * u;
  const Y = (u) => ((ay * u + by) * u + cy) * u;
  const dX = (u) => (3 * ax2 * u + 2 * bx) * u + cx;
  return (t) => {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    let u = t;
    for (let i = 0; i < 8; i++) {
      const e = X(u) - t;
      if (Math.abs(e) < 1e-5) break;
      const d = dX(u);
      if (Math.abs(d) < 1e-6) break;
      u -= e / d;
    }
    if (!(u >= 0 && u <= 1) || Math.abs(X(u) - t) > 1e-4) {
      let lo = 0, hi = 1;
      u = t;
      for (let i = 0; i < 24; i++) {
        if (X(u) < t) lo = u;
        else hi = u;
        u = (lo + hi) / 2;
      }
    }
    return Y(u);
  };
}
var EASE_LIFT = bezier(0.32, 0.72, 0, 1);
var tween = (v, dur = 700) => ({ from: v, to: v, t0: -1e9, dur });
var tval = (tw, now) => {
  const p = clamp((now - tw.t0) / tw.dur, 0, 1);
  return tw.from + (tw.to - tw.from) * (reduced ? 1 : EASE_LIFT(p));
};
var tset = (tw, to, now, delay) => {
  if (tw.to === to) return;
  tw.from = tval(tw, now);
  tw.to = to;
  tw.t0 = now + delay;
};
var tdone = (tw, now) => reduced || now >= tw.t0 + tw.dur;
var NS = "http://www.w3.org/2000/svg";
function mk(tag, attrs, parent) {
  const e = document.createElementNS(NS, tag);
  if (attrs) for (const k in attrs) e.setAttribute(k, String(attrs[k]));
  if (parent) parent.appendChild(e);
  return e;
}
function solid(parent) {
  const g = mk("g", {}, parent);
  return { g, sil: mk("path", { class: "sil" }, g), cr: mk("path", { class: "nf lo" }, g) };
}
var put = (el, s) => {
  el.sil.setAttribute("d", s.sil);
  el.cr.setAttribute("d", s.crease);
};
var flatDot = (parent, C, r, cls) => mk("ellipse", { rx: r2(r * C.S), ry: r2(r * C.S * C.k), class: cls }, parent);
var place = (el, q) => {
  el.setAttribute("cx", String(r2(q[0])));
  el.setAttribute("cy", String(r2(q[1])));
};
var fid = 0;
function fade(svg, y0, y1, a0 = 0.7) {
  const id = "hl-fd" + ++fid, defs = mk("defs", {}, svg);
  const lg = mk("linearGradient", { id: id + "g", gradientUnits: "userSpaceOnUse", x1: 0, y1: r2(y0), x2: 0, y2: r2(y1) }, defs);
  mk("stop", { offset: 0, "stop-color": "#fff", "stop-opacity": a0 }, lg);
  mk("stop", { offset: 1, "stop-color": "#fff", "stop-opacity": 0 }, lg);
  const m = mk("mask", { id, maskUnits: "userSpaceOnUse", x: 0, y: 0, width: 400, height: 320 }, defs);
  mk("rect", { x: 0, y: 0, width: 400, height: 320, fill: `url(#${id}g)` }, m);
  return `url(#${id})`;
}
function reflect(svg, parent, P, front2, ring, z0, depth2) {
  const r = ghost(P, front2, ring, z0, depth2);
  const gh = mk("g", { class: "ghost", mask: fade(svg, r.y0, r.y1) }, parent);
  mk("path", { d: r.d }, gh);
}
var boards = [];
var byStage = /* @__PURE__ */ new Map();
var raf = 0;
var last = 0;
var io = null;
var rm = null;
function frame() {
  const now = performance.now();
  const dt = Math.min(0.05, Math.max(0, (now - last) / 1e3));
  last = now;
  let any = false;
  for (const b of boards.slice()) if (b.vis && b.awake) {
    try {
      b.awake = !!b.tick(dt, now);
    } catch (err) {
      b.awake = false;
      setTimeout(() => {
        throw err;
      });
    }
    any = any || b.awake;
  }
  raf = any ? requestAnimationFrame(frame) : 0;
}
function wake(b) {
  b.awake = true;
  if (!raf) {
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }
}
var onMotion = () => {
  setReducedMotion(!!rm?.matches);
  boards.forEach(wake);
};
function start() {
  if (io) return;
  io = new IntersectionObserver((es) => {
    for (const e of es) {
      const set = byStage.get(e.target);
      if (!set) continue;
      for (const b of set) {
        b.vis = e.isIntersecting;
        if (b.vis) wake(b);
      }
    }
  }, { rootMargin: "80px" });
  rm = matchMedia("(prefers-reduced-motion: reduce)");
  setReducedMotion(rm.matches);
  rm.addEventListener("change", onMotion);
}
function stop() {
  if (raf) cancelAnimationFrame(raf);
  raf = 0;
  io?.disconnect();
  io = null;
  rm?.removeEventListener("change", onMotion);
  rm = null;
}
function register(stage, tick) {
  start();
  const b = { stage, tick, vis: false, awake: true };
  boards.push(b);
  const peers = byStage.get(stage);
  if (peers) {
    for (const p of peers) b.vis = p.vis;
    peers.add(b);
    if (b.vis) wake(b);
  } else {
    byStage.set(stage, /* @__PURE__ */ new Set([b]));
    io.observe(stage);
  }
  tick(0, performance.now());
  let gone = false;
  return {
    wake: () => {
      if (!gone) wake(b);
    },
    unregister: () => {
      if (gone) return;
      gone = true;
      boards = boards.filter((x) => x !== b);
      const set = byStage.get(stage);
      if (set) {
        set.delete(b);
        if (!set.size) {
          byStage.delete(stage);
          io?.unobserve(stage);
        }
      }
      if (!boards.length) stop();
    }
  };
}
var handlers = /* @__PURE__ */ new WeakMap();
var touring = /* @__PURE__ */ new WeakMap();
function pointer(stage, on) {
  handlers.set(stage, on);
  let tm = 0;
  const pt = (e) => {
    const r = stage.getBoundingClientRect();
    return [(e.clientX - r.left) / r.width * 400, (e.clientY - r.top) / r.height * 320];
  };
  const move = (e) => {
    clearTimeout(tm);
    touring.get(stage)?.hold();
    on.move(pt(e), e);
  };
  const down = (e) => {
    clearTimeout(tm);
    touring.get(stage)?.hold();
    if (e.pointerType !== "mouse") stage.releasePointerCapture?.(e.pointerId);
    if (on.down) on.down(pt(e), e);
    else on.move(pt(e), e);
  };
  const leave = (e) => {
    clearTimeout(tm);
    tm = window.setTimeout(() => {
      on.leave(e);
      touring.get(stage)?.release();
    }, e.pointerType === "mouse" ? 0 : 1400);
  };
  stage.addEventListener("pointermove", move);
  stage.addEventListener("pointerdown", down);
  stage.addEventListener("pointerleave", leave);
  return () => {
    clearTimeout(tm);
    if (handlers.get(stage) === on) handlers.delete(stage);
    stage.removeEventListener("pointermove", move);
    stage.removeEventListener("pointerdown", down);
    stage.removeEventListener("pointerleave", leave);
  };
}
var LAP = [[128, 150], [200, 118], [272, 150], [200, 206], null];
var TRAVEL = 900;
var DWELL = 1200;
var REST = 1800;
var RESUME = 1200;
var STAGGER = 450;
var GHOST = { pointerType: "ghost" };
var started = 0;
function entry([x, y]) {
  const dx = x - 200, dy = y - 160;
  if (!dx && !dy) return [200, 320];
  const k = Math.min(dx ? (dx > 0 ? 200 : -200) / dx : Infinity, dy ? (dy > 0 ? 160 : -160) / dy : Infinity);
  return [200 + dx * k, 160 + dy * k];
}
function tour(stage, stops, onStop) {
  let i = 0;
  let wait = RESUME + STAGGER * (started++ % 4);
  let t = -1;
  let at2 = null;
  let origin = [200, 320];
  let hand = false, keys2 = stage.contains(stage.ownerDocument.activeElement);
  let gone = false;
  const leave = () => {
    at2 = null;
    t = -1;
    handlers.get(stage)?.leave(GHOST);
  };
  const tick = (dt) => {
    if (hand || keys2 || !stops.length) return false;
    if (reducedMotion()) {
      if (at2) leave();
      return false;
    }
    if (wait > 0) {
      wait -= dt * 1e3;
      return true;
    }
    const stop2 = stops[i];
    if (stop2 === null) {
      if (at2) leave();
      onStop?.(i);
      i = (i + 1) % stops.length;
      wait = REST;
      return true;
    }
    const h = handlers.get(stage);
    if (!h) return true;
    if (t < 0) {
      origin = at2 ?? entry(stop2);
      t = 0;
    }
    t = Math.min(TRAVEL, t + dt * 1e3);
    const k = EASE_LIFT(t / TRAVEL);
    at2 = [origin[0] + (stop2[0] - origin[0]) * k, origin[1] + (stop2[1] - origin[1]) * k];
    h.move(at2, GHOST);
    if (t < TRAVEL) return true;
    onStop?.(i);
    i = (i + 1) % stops.length;
    t = -1;
    wait = DWELL;
    return true;
  };
  const take = () => {
    at2 = null;
    t = -1;
  };
  const give = () => {
    if (hand || keys2) return;
    i = 0;
    t = -1;
    wait = RESUME;
    board.wake();
  };
  const me = {
    hold: () => {
      hand = true;
      take();
    },
    release: () => {
      if (!hand) return;
      hand = false;
      give();
    }
  };
  const focusIn = () => {
    keys2 = true;
    take();
  };
  const focusOut = (e) => {
    if (keys2 && !stage.contains(e.relatedTarget)) {
      keys2 = false;
      give();
    }
  };
  stage.addEventListener("focusin", focusIn);
  stage.addEventListener("focusout", focusOut);
  touring.set(stage, me);
  const board = register(stage, tick);
  return {
    stop: () => {
      if (gone) return;
      gone = true;
      board.unregister();
      stage.removeEventListener("focusin", focusIn);
      stage.removeEventListener("focusout", focusOut);
      if (touring.get(stage) === me) touring.delete(stage);
      if (at2) leave();
    }
  };
}
function disposer() {
  let fns = [];
  return {
    add: (fn) => {
      fns.push(fn);
    },
    on: (target, type, fn, opts) => {
      const h = fn;
      target.addEventListener(type, h, opts);
      fns.push(() => target.removeEventListener(type, h, opts));
    },
    dispose: () => {
      const run2 = fns;
      fns = [];
      for (let i = run2.length - 1; i >= 0; i--) run2[i]();
    }
  };
}
var TABLE = {
  riffle: [0, 40, 90],
  // stagger, ms
  terrain: [1.5, 3, 5],
  // radius, cells
  exploded: [12, 28, 40],
  // gap, viewBox units
  phosphor: [150, 520, 1500],
  // afterglow, ms
  slow: [0.6, 0.2, 0.05],
  // rate, × normal speed
  turntable: [200, 650, 1500],
  // coast, ms
  keyboard: [1, 2, 3.5],
  // radius, keys
  elevator: [40, 100, 220],
  // stiffness, spring units
  phone: [16, 28, 40],
  // gap, viewBox units
  laptop: [100, 125, 150],
  // lid, degrees
  terminal: [1, 2, 3.5],
  // spread, lines
  cabinet: [1.5, 3, 5],
  // reach, blades
  branches: [1, 3, 6],
  // reach, commits
  vault: [250, 600, 1500],
  // coast, ms
  lockers: [55, 90, 120],
  // opening, degrees
  padlock: [45, 90, 100],
  // swing, degrees
  patch: [1, 2.5, 5],
  // radius, ports
  dish: [30, 50, 70],
  // reach, degrees
  router: [0.5, 1.5, 3],
  // spread, antennas
  loupe: [1.3, 1.8, 2.6],
  // magnification, ×
  sieve: [6, 14, 24],
  // gap, viewBox units
  rail: [1, 2, 3.5],
  // radius, hangers
  plug: [0.35, 0.6, 0.9],
  // pull, fraction of the way to the socket
  query: [20, 40, 55],
  // turn, degrees; past 55 the hook folds over itself and stops reading as one
  drawer: [12, 22, 34],
  // pull, viewBox units
  basket: [8, 16, 28],
  // tilt, degrees
  plot: [3, 6, 12],
  // lift, viewBox units
  hub: [10, 16, 24],
  // rise, viewBox units
  relay: [40, 120, 220],
  // delay, ms per hop
  settle: [90, 120, 150],
  // reach, viewBox units from the hub
  format: [9, 12, 14],
  // disorder, degrees of the worst skew
  rebuild: [8, 14, 20],
  // rise, viewBox units
  stack: [22, 34, 46]
  // lift, viewBox units
};
var DEFAULT = 0.5;
function intensity(value) {
  const n = typeof value === "string" && value.trim() !== "" ? Number(value) : value;
  if (typeof n !== "number" || !Number.isFinite(n)) return DEFAULT;
  return Math.min(1, Math.max(0, n));
}
function parameter(figure, value) {
  const [lo, mid, hi] = TABLE[figure];
  const i = intensity(value);
  const v = i <= 0.5 ? lo + i / 0.5 * (mid - lo) : mid + (i - 0.5) / 0.5 * (hi - mid);
  return Math.round(v * 1e3) / 1e3;
}
var NS2 = "http://www.w3.org/2000/svg";
var mounted = /* @__PURE__ */ new WeakMap();
var report = (err) => {
  if (typeof reportError === "function") reportError(err);
  else setTimeout(() => {
    throw err;
  });
};
function create(spec, el, options) {
  if (typeof document === "undefined") {
    throw new Error(`hairline: ${spec.id}() needs a DOM. Call it in the browser, once the element exists: in an effect, in onMount, or in a script after the element.`);
  }
  if (!el || el.nodeType !== 1) {
    throw new TypeError(`hairline: ${spec.id}() takes an element as its first argument, and got ${el === null ? "null" : typeof el}.`);
  }
  mounted.get(el)?.();
  const opts = { ...options };
  const doc = el.ownerDocument;
  const root = el.getRootNode();
  inject(root.nodeType === 9 || "host" in root ? root : doc);
  const owned = /* @__PURE__ */ new Set();
  const attr = (name, value2) => {
    if (!owned.has(name) && el.hasAttribute(name)) return;
    if (value2 === null) {
      el.removeAttribute(name);
      owned.delete(name);
    } else {
      el.setAttribute(name, value2);
      owned.add(name);
    }
  };
  const dress = () => {
    attr("data-hairline-theme", opts.theme === "light" || opts.theme === "dark" ? opts.theme : null);
    attr("aria-label", el.hasAttribute("aria-labelledby") ? null : typeof opts.label === "string" ? opts.label : spec.label);
  };
  attr("data-hairline", spec.id);
  attr("role", spec.focusable ? "group" : "img");
  if (spec.focusable) attr("tabindex", "0");
  dress();
  const svg = doc.createElementNS(NS2, "svg");
  svg.setAttribute("viewBox", "0 0 400 320");
  svg.setAttribute("aria-hidden", "true");
  el.appendChild(svg);
  let live = null;
  if (spec.focusable) {
    live = doc.createElement("span");
    live.setAttribute("data-hairline-live", "");
    live.setAttribute("aria-live", "polite");
    el.appendChild(live);
  }
  let text = null;
  let playing = null;
  const read = {
    get textContent() {
      return text;
    },
    set textContent(value2) {
      const next = value2 ?? "";
      if (next === text) return;
      text = next;
      if (live && live.textContent !== next && (!playing || next === spec.rest || el.matches(":hover, :focus-within"))) live.textContent = next;
      const fn = opts.onRead;
      if (typeof fn === "function") try {
        fn(next);
      } catch (err) {
        report(err);
      }
    }
  };
  let value = parameter(spec.id, opts.intensity);
  playing = opts.play === true ? tour(el, spec.tour ?? LAP) : null;
  let engine;
  try {
    engine = spec.engine({ stage: el, svg, read }, value);
  } catch (err) {
    playing?.stop();
    throw err;
  }
  if (text === null) read.textContent = spec.rest;
  let dead = false;
  const destroy = () => {
    if (dead) return;
    dead = true;
    if (mounted.get(el) === destroy) mounted.delete(el);
    playing?.stop();
    playing = null;
    engine.destroy();
    svg.remove();
    live?.remove();
    for (const name of owned) el.removeAttribute(name);
    owned.clear();
  };
  mounted.set(el, destroy);
  return {
    update(next) {
      if (dead || !next) return;
      const own = opts, given = next;
      for (const k in given) {
        if (given[k] === void 0) delete own[k];
        else own[k] = given[k];
      }
      const v = parameter(spec.id, opts.intensity);
      if (v !== value) {
        value = v;
        engine.set(v);
      }
      const play = opts.play === true;
      if (play !== !!playing) {
        playing?.stop();
        playing = play ? tour(el, spec.tour ?? LAP) : null;
      }
      dress();
    },
    destroy
  };
}
var HH = 30;
var GRIP = 9;
var GRIPS = [[-GRIP, HH], [GRIP, HH]];
var D = 30;
var FY = 58;
var RT2 = 2.6;
var PH = 2.4;
var CH = 6;
var BX1 = 7 * D + 15;
var BY1 = FY + 14;
var ZTOP = RT2 + PH + CH;
var N2 = 12;
var U = 10.4;
var BH = 9.6;
var W = 84;
var X1 = W + 10;
var ZB = 11;
var ZT = ZB + (N2 - 1) * U + BH;
var H2 = ZT + 6;
var R = 26;
var FOC = 17;
var DEP = R * R / (4 * FOC);
var N3 = 3;
var Z02 = 5;
var M = 3;
var PITCH = 26;
var ZB3 = Z02 + M;
var H3 = ZB3 + N3 * PITCH + M;
var SY = 34;
var FH = 36;
var CH2 = 25;
var TOP = 3 * FH + CH2 + 7;
var RX = 16.5;
var CW = [-8, 11, -2, 23];
var BASE = fillet([[-16, -2], [33, -2], [33, -56], [76, -56], [76, 38], [-16, 38]], [3, 2, 4, 6, 6, 6]);
var FLOOR = fillet([[33, -56], [72, -56], [72, -6], [43, -6], [43, 34], [33, 34]], [4, 4, 4, 3, 3, 3]);
var CWX = (CW[0] + CW[2]) / 2;
var SR = (RX - CWX) / 2;
var SC = [CWX + SR, SY / 2, TOP + 3 + SR + 2];
var REST_Z = 1.5 * FH - 4;
var LAY = [
  { name: "surface", r: [0, 0, 132, 96], rad: 7, segs: [[[1.5, 12], [130.5, 12]]], dots: [[7, 6], [13, 6], [19, 6]] },
  { name: "sidebar", r: [5, 17, 38, 91], rad: 4, segs: [[[10, 25], [28, 25]], [[10, 33], [32, 33]], [[10, 41], [24, 41]], [[10, 49], [30, 49]], [[10, 83], [22, 83]]] },
  { name: "card", r: [48, 22, 120, 62], rad: 5, segs: [[[54, 30], [92, 30]], [[54, 38], [112, 38]], [[54, 46], [104, 46]], [[54, 54], [80, 54]]] },
  { name: "popover", r: [80, 50, 126, 86], rad: 4, segs: [[[86, 58], [118, 58]], [[86, 74], [116, 74]], [[86, 80], [108, 80]]], sel: [83, 62, 123, 70] }
];
var REST5 = 0.18;
var TK = 2.4;
function inside(pt, pg) {
  let c = false;
  for (let i = 0, j = pg.length - 1; i < pg.length; j = i++) {
    const [xi, yi] = pg[i], [xj, yj] = pg[j];
    if (yi > pt[1] !== yj > pt[1] && pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi) c = !c;
  }
  return c;
}
var mount7 = ({ stage, svg, read }, value) => {
  const bag = disposer();
  let GAP4 = value, act = -1, lastP = null;
  const e = spring(REST5, { eps: 2e-3 });
  const C = Cam(45, 0.5, 1.42);
  fit(C, [[0, 0, 0], [132, 96, 0], [132, 0, 0], [0, 96, 0], [0, 0, 3 * 34 + TK], [132, 0, 3 * 34 + TK]], 180, 166);
  const P = proj(C), front2 = facing(C);
  const g = mk("g", {}, svg);
  const els = LAY.map((L7, i) => {
    const [ring, inner3] = rings(...L7.r, L7.rad, 1.3);
    const ext = extremes(P, ring);
    const guide = i > 0 ? mk("path", { class: "nf dash" }, g) : null;
    const el = solid(g);
    const marks = mk("path", { class: "nf" }, el.g);
    const selRing = L7.sel ? rrect(...L7.sel, 2) : null;
    const selEl = L7.sel ? mk("path", { class: "nf sil" }, el.g) : null;
    const dotEls = L7.dots ? L7.dots.map(() => flatDot(el.g, C, 1.6, "nf")) : null;
    return { ring, inner: inner3, ext, guide, el, marks, selRing, selEl, dotEls };
  });
  const corners = ([x0, y0, x1, y1], z) => [P(x0, y0, z), P(x1, y0, z), P(x1, y1, z), P(x0, y1, z)];
  function pick(p) {
    if (!p) return -1;
    for (let i = LAY.length - 1; i >= 0; i--) if (inside(p, corners(LAY[i].r, i * GAP4 * e.t + TK))) return i;
    return -1;
  }
  function setAct(a) {
    if (a === act) return;
    act = a;
    els.forEach((E2, i) => E2.el.sil.classList.toggle("hi", i === a));
    B6.wake();
  }
  const B6 = register(stage, (dt) => {
    const m = stepS(e, dt), z = (i) => i * GAP4 * e.x;
    LAY.forEach((L7, i) => {
      const E2 = els[i], zi = z(i), zt = zi + TK;
      put(E2.el, prism(P, front2, E2.ring, E2.inner, zi, zt));
      E2.marks.setAttribute("d", L7.segs.map(([a, b]) => seg(P(a[0], a[1], zt), P(b[0], b[1], zt))).join(""));
      if (E2.selEl && E2.selRing) E2.selEl.setAttribute("d", poly(ringAt(P, E2.selRing, zt)));
      if (E2.dotEls && L7.dots) L7.dots.forEach(([dx, dy], k) => place(E2.dotEls[k], P(dx, dy, zt)));
      if (E2.guide) {
        const zp = z(i - 1) + TK;
        E2.guide.setAttribute("d", E2.ext.map((q) => seg(P(q.u, q.v, zi), P(q.u, q.v, zp))).join(""));
      }
    });
    read.textContent = act >= 0 ? `0${act + 1} \xB7 ${LAY[act].name} \xB7 z ${z(act).toFixed(1)}` : `gap ${(GAP4 * e.x).toFixed(1)}`;
    return m;
  });
  bag.add(B6.unregister);
  bag.add(pointer(stage, {
    move: (p) => {
      lastP = p;
      e.t = REST5 + (1 - REST5) * clamp((p[0] - 60) / 280, 0, 1);
      setAct(pick(p));
      B6.wake();
    },
    leave: () => {
      lastP = null;
      e.t = REST5;
      setAct(-1);
      B6.wake();
    }
  }));
  bag.add(() => svg.replaceChildren());
  return {
    set: (v) => {
      GAP4 = v;
      if (lastP) setAct(pick(lastP));
      B6.wake();
    },
    destroy: bag.dispose
  };
};
var G2 = 12;
var WD = 5.5;
var BY12 = 9 * G2 + WD + 8;
var LINES = [
  [0, 56, 0.3, -8, -2, 0],
  [1, 40, 0.75, 8, -1.9, 0],
  [1, 58, 0.3, -8, -0.8, 0],
  [2, 74, 1, -8, -1.9, 0],
  [2, 48, 1, 8, 1.3, 0],
  [1, 34, 0.3, 8, 2, 0],
  [1, 66, 1, -8, -2, 0],
  [2, 52, 1, -8, -0.8, 0],
  [1, 30, 0.45, 8, 2, 0],
  [0, 22, 1, -8, 1.6, 0]
];
var N4 = LINES.length;
var L = (s) => s.split(" ").map((c) => [1, "key " + c]);
var ROWS = [
  [[1, "esc"], ...L("1 2 3 4 5 6 7 8 9 0 - ="), [2, "bksp"]],
  [[1.5, "tab"], ...L("q w e r t y u i o p [ ]"), [1.5, "key \\"]],
  [[1.75, "caps"], ...L("a s d f g h j k l ; '"), [2.25, "enter"]],
  [[2.25, "shift l"], ...L("z x c v b n m , . /"), [2.75, "shift r"]],
  [[1.5, "ctrl l"], [1, "super"], [1.5, "alt l"], [7, "space"], [1.5, "alt r"], [1, "fn"], [1.5, "ctrl r"]]
];
var HB = 4;
var T6 = 2.4;
var HZ = HB + T6 / 2;
var COLS = 6;
var ROWS2 = 2;
var W6 = 24;
var HR2 = 38;
var GAP = 1.2;
var FM = 3;
var BW = COLS * W6 + 2 * FM;
var BH2 = ROWS2 * HR2 + 2 * FM;
var DW = W6 - 2 * GAP;
var DH = HR2 - 2 * GAP;
var OUTLINE = rrect(0, 0, DW, DH, 1.8, 4);
var VENTS = [0, 1, 2].map((k) => rrect(4, DH - 6.6 - k * 3.2, DW - 4, DH - 5.2 - k * 3.2, 0.7, 2));
var PLATE = rrect(DW / 2 - 4.5, DH - 19, DW / 2 + 4.5, DH - 15, 1, 3);
var CUP = rrect(DW - 5.6, DH / 2 - 7, DW - 2.8, DH / 2 + 2, 1.2, 3);
var FRAME = rrect(2.6, 2.6, DW - 2.6, DH - 2.6, 1.4, 3);
var ML = 26;
var R3 = 27;
var GLASS = R3 - 1.4;
var REST7 = [ML + 9, 46];
var D7 = 20;
var YC = D7 / 2;
var VX = Math.SQRT1_2 * Math.sqrt(3);
var NC = 12;
var PITCH2 = 15;
var GAP2 = 8;
var EAR2 = 15;
var MAR = 5;
var X03 = EAR2 + MAR;
var W8 = 2 * X03 + NC * PITCH2 + GAP2;
var W9 = 68;
var L2 = 140;
var TG = 2;
var TB = 1.6;
var TC = 1.8;
var TBAT = 7;
var TS = 6;
var TBUMP = 2.2;
var TL = 0.9;
var STACK = TG + TB + TC + TBAT + TS + TBUMP + TL;
var BOARD = [[4, L2 - 44], [W9 - 4, L2 - 44], [W9 - 4, L2 - 5], [36, L2 - 5], [36, L2 - 30], [4, L2 - 30]];
var BAT = [9, 12, W9 - 9, L2 - 48];
var CHIPS = [
  [10, L2 - 41, 26, L2 - 34, 1.4],
  [45, L2 - 40, 54, L2 - 35, 1.2],
  [57, L2 - 42, 62, L2 - 36, 1.2],
  [42, L2 - 27, 56, L2 - 13, 1.8]
];
var RECT = [[0, 0], [W9, 0], [W9, L2], [0, L2]];
var FOOT2 = [RECT, BOARD, [[BAT[0], BAT[1]], [BAT[2], BAT[1]], [BAT[2], BAT[3]], [BAT[0], BAT[3]]], RECT];
var N5 = 7;
var PITCH3 = 10;
var M2 = 8;
var EXT = M2 * 2 + PITCH3 * (N5 - 1);
var N6 = 7;
var X04 = 13;
var DX = 10;
var L3 = 2 * X04 + (N6 - 1) * DX;
var HP = 34;
var ARC = 5;
var FACE = /* @__PURE__ */ fillet([[L3 - 2, 0], [L3 - 2, HP], [2, HP], [2, 0]], [0.6, 4, 4, 0.6], ARC);
var EDGE = [ARC, 3 * (ARC + 1)];
var LIGHT2 = [-Math.SQRT1_2, -Math.SQRT1_2];
var N8 = 8;
var W10 = 84;
var H6 = 54;
var G3 = 13;
var TW2 = 22;
var TH4 = 7;
var TABS = [6, 31, 56];
var TK2 = 1.4;
var REST13 = -12;
var BACK = -24;
var FWD = 20;
var LIFT5 = 16;
var X06 = -5;
var X12 = W10 + 5;
var Y02 = -9;
var Y1 = (N8 - 1) * G3 + 9;
var WH = 20;
var WR = 6;
var WT = 2.4;
function camera() {
  const C = Cam(45, 0.5, 1.62);
  fit(C, [[X06, Y02, 0], [X12, Y1, -8], [X12, Y02, 0], [X06, Y1, 0], [X06, Y02, H6 + TH4], [X12, Y02, H6 + TH4 + LIFT5]], 200, 166);
  return C;
}
var trayRings = () => ({
  outer: rrect(X06, Y02, X12, Y1, WR, 6),
  inner: rrect(X06 + WT, Y02 + WT, X12 - WT, Y1 - WT, WR - WT, 6)
});
var LR = (pts) => pts[0][0] <= pts[pts.length - 1][0] ? pts : pts.slice().reverse();
function tray(P, front2, outer, inner3) {
  const far = [
    [poly(hull(ringAt(P, outer, 0).concat(ringAt(P, outer, WH)))), "sil"],
    [poly(ringAt(P, inner3, WH)), "nf"],
    [open(ringAt(P, run(inner3, (q) => !front2(q)), 2.5)), "nf lo"]
  ];
  const iF = LR(ringAt(P, run(inner3, front2), WH)), oT = LR(ringAt(P, run(outer, front2), WH)), oB = LR(ringAt(P, run(outer, front2), 0));
  const hx = (X06 + X12) / 2, onFront = (ring) => ring.map((q) => P(q.u, Y1, q.v));
  const near = [
    [poly([...iF, oT[oT.length - 1], ...oB.slice().reverse(), oT[0]]), "fo"],
    [open(oT), "nf lo"],
    [open(iF), "nf"],
    [open([oT[0], ...oB, oT[oT.length - 1]]), "nf sil"],
    [poly(onFront(rrect(hx - 11, 6.5, hx + 11, 12.5, 3, 5))), "nf"],
    [poly(onFront(rrect(hx - 9.4, 8, hx + 9.4, 11, 1.5, 5))), "nf lo"]
  ];
  return { far, near };
}
function card(i) {
  const n = N8 - i, t0 = TABS[(N8 - 1 - i) % 3];
  const shape = fillet(
    [[0, 0], [W10, 0], [W10, H6], [t0 + TW2, H6], [t0 + TW2, H6 + TH4], [t0, H6 + TH4], [t0, H6], [0, H6]],
    [1, 1, 3.2, 1.8, 2.4, 2.4, 1.8, 3.2]
  );
  return { n, t0, shape };
}
function pose2(P, i, t0, shape, th, lift) {
  const yb = i * G3, s = Math.sin(rad(th)), c = Math.cos(rad(th));
  const w = (u, v) => P(u, yb + v * s, v * c + lift);
  const wb = (u, v) => P(u, yb + v * s - TK2 * c, v * c + TK2 * s + lift);
  const punch = [];
  for (let k = 0; k < 8; k++) punch.push(w(t0 + TW2 / 2 + (k % 4 - 1.5) * 3.6, H6 + TH4 / 2 + (0.5 - Math.floor(k / 4)) * 2.8));
  return {
    back: poly(shape.map((p) => wb(p[0], p[1]))),
    face: poly(shape.map((p) => w(p[0], p[1]))),
    head: seg(w(6, H6 - 11), w(W10 - 6, H6 - 11)),
    rules: [H6 - 18, H6 - 25, H6 - 32, H6 - 39].map((v) => seg(w(6, v), w(W10 - 6, v))).join(""),
    punch
  };
}
function scene() {
  const C = camera();
  return { C, P: proj(C), front: facing(C), ...trayRings() };
}
var mount24 = ({ stage, svg, read }, value) => {
  const bag = disposer();
  let stag = value;
  const { P, front: front2, outer, inner: inner3 } = scene();
  const paths = tray(P, front2, outer, inner3);
  const g = mk("g", {}, svg);
  reflect(svg, g, P, front2, outer, 0, 14);
  for (const [d2, cls] of paths.far) mk("path", { d: d2, class: cls }, g);
  const cards = [];
  for (let i = 0; i < N8; i++) {
    const { n, t0, shape } = card(i);
    const grp = mk("g", {}, g);
    const back = mk("path", { class: "lo" }, grp), face = mk("path", { class: "sil" }, grp);
    const head = mk("path", { class: "nf" }, grp), rules = mk("path", { class: "nf lo" }, grp);
    const punch = [];
    for (let k = 0; k < 8; k++) punch.push(mk("circle", { r: 1.05, class: "dot " + (k === n - 1 ? "m" : "off") }, grp));
    cards.push({ n, t0, shape, back, face, head, rules, punch, a: tween(REST13), z: tween(0) });
  }
  for (const [d2, cls] of paths.near) mk("path", { d: d2, class: cls }, g);
  const top = (i) => P(W10 / 2, i * G3 + H6 * Math.sin(rad(REST13)), H6 * Math.cos(rad(REST13)));
  const c0 = top(0), c1 = top(1), d = [c1[0] - c0[0], c1[1] - c0[1]];
  const px0 = P(0, 0, 0), px1 = P(1, 0, 0), ex = [px1[0] - px0[0], px1[1] - px0[1]];
  const HALF3 = W10 / 2 + 6, det = d[0] * ex[1] - d[1] * ex[0];
  function hit([x, y]) {
    const qx = x - c0[0], qy = y - c0[1];
    const s = (qx * ex[1] - qy * ex[0]) / det, r = (d[0] * qy - d[1] * qx) / det;
    if (Math.abs(r) > HALF3 || s < -0.5 || s > N8 + 1) return -1;
    return clamp(Math.round(s), 0, N8 - 1);
  }
  function draw(i, th, lift) {
    const cd = cards[i], q = pose2(P, i, cd.t0, cd.shape, th, lift);
    cd.back.setAttribute("d", q.back);
    cd.face.setAttribute("d", q.face);
    cd.head.setAttribute("d", q.head);
    cd.rules.setAttribute("d", q.rules);
    cd.punch.forEach((el, k) => place(el, q.punch[k]));
  }
  const B6 = register(stage, (_dt, now) => {
    let moving = false;
    cards.forEach((cd, i) => {
      draw(i, tval(cd.a, now), tval(cd.z, now));
      if (!tdone(cd.a, now) || !tdone(cd.z, now)) moving = true;
    });
    return moving;
  });
  bag.add(B6.unregister);
  let act = -1;
  const caption = (a) => a < 0 ? "rest" : String(N8 - a).padStart(2, "0");
  function setActive(a) {
    if (a === act) return;
    const now = performance.now(), from = a >= 0 ? a : act;
    act = a;
    cards.forEach((cd, i) => {
      const delay = Math.abs(i - from) * stag;
      const th = a < 0 ? REST13 : i < a ? BACK : i > a ? FWD : 0;
      tset(cd.a, th, now, delay);
      tset(cd.z, a === i ? LIFT5 : 0, now, delay);
      cd.face.classList.toggle("hi", i === a);
      cd.head.classList.toggle("hi", i === a);
      cd.punch[cd.n - 1].classList.toggle("m", i !== a);
    });
    read.textContent = caption(a);
    B6.wake();
  }
  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.on(stage, "keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      setActive(act < 0 ? N8 - 1 : Math.min(N8 - 1, act + 1));
      e.preventDefault();
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      setActive(act < 0 ? N8 - 1 : Math.max(0, act - 1));
      e.preventDefault();
    } else if (e.key === "Escape" && act >= 0) {
      setActive(-1);
      e.preventDefault();
    }
  });
  bag.on(stage, "blur", () => setActive(-1));
  bag.add(() => svg.replaceChildren());
  return {
    set: (v) => {
      stag = v;
    },
    destroy: bag.dispose
  };
};
var R12 = 2.1;
var STOP = R12 + 1;
var D9 = [Math.SQRT1_2, -Math.SQRT1_2];
var L6 = 210;
var NC2 = 6;
var SPEED = 1 / 9;
var GATE = L6 * 0.62;
var RISE2 = L6 / NC2 / 2;
var FALL3 = RISE2 / 2;
var N11 = 24;
var V = 7;
var G4 = 11;
var TB2 = 17;
var PB3 = 17;
var VA = PB3 + V * G4;
var H9 = VA + TB2;
var REST_TOP = N11 - V - 2.6;
var N12 = 9;
var CELL = 14;
var EXT2 = N12 * CELL;
var R8 = 40;
var HX = -R8 - 8;
var V2 = [Math.SQRT1_2 * Math.sqrt(0.75), Math.SQRT1_2 * Math.sqrt(0.75), 0.5];
function riffle(el, options) {
  return create({
    id: "riffle",
    label: "A tray of eight cards. Hover or use the arrow keys to pull a card.",
    rest: "rest",
    engine: mount24,
    focusable: true
  }, el, options);
}
function exploded(el, options) {
  return create({
    id: "exploded",
    label: "An app window taken apart into four layers. Moving across opens the gap; moving down picks a layer.",
    rest: "",
    engine: mount7
  }, el, options);
}
export {
  exploded,
  riffle
};
