/* Kampung Exchange - clickable mock-up. Vanilla JS, hash routing, mocked data. */
(function () {
  "use strict";

  // ---------------------------------------------------------------- helpers
  const app = document.getElementById("app");
  const STORE_KEY = "kx-demo-state-v1";
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const ICONS = {
    truck: '<rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
    home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    box: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
    monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    tool: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    coffee: '<path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>',
    grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
    pen: '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>',
    dollar: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    arrow: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>',
    coins: '<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="M16.71 13.88l.7.71-2.82 2.82"/>',
    info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
    heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    send: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
    play: '<polygon points="6 4 20 12 6 20 6 4"/>',
    pause: '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>',
    replay: '<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>',
  };
  const icon = (n, cls = "") => `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ""}</svg>`;
  const LOGO_MARK = `<svg class="logo-mark" viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="5" fill="#A6192E"/><path d="M10 15h18l-4.5-4.5M30 25H12l4.5 4.5" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="31.5" cy="8.5" r="3" fill="#F9BB18"/></svg>`;

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pad = (n) => String(n).padStart(2, "0");
  const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parseISO = (s) => new Date(s + "T00:00:00");
  const fmtDate = (s, withDay = true) => { const d = parseISO(s); return `${withDay ? DAYS[d.getDay()] + ", " : ""}${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`; };
  const todayISO = () => toISO(new Date());
  const money = (n) => "S$" + Math.round(n).toLocaleString("en-SG");

  // ---------------------------------------------------------------- state
  let state = loadState();
  function loadState() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) return Object.assign(structuredClone(SEED_STATE), JSON.parse(raw));
    } catch (e) { /* storage unavailable - fall back to seed */ }
    return structuredClone(SEED_STATE);
  }
  function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ } }
  function resetState() { try { localStorage.removeItem(STORE_KEY); } catch (e) { /* ignore */ } state = structuredClone(SEED_STATE); }

  const me = () => ORGS.find((o) => o.id === CURRENT_ORG_ID);
  const isAdmin = () => state.role === "admin";
  const getOrg = (id) => ORGS.find((o) => o.id === id) || (state.approvedOrgs || []).find((o) => o.id === id);
  const allListings = () => LISTINGS.concat(state.extraListings);
  const getListing = (id) => allListings().find((l) => l.id === id);
  const catOf = (l) => CATEGORIES.find((c) => c.id === l.cat);
  const poolOf = (l) => catOf(l).pool;
  const isMine = (l) => l.orgId === CURRENT_ORG_ID;
  const listingStatus = (l) => (isMine(l) ? state.myListingStatus[l.id] || "live" : "live");
  const reviewsFor = (id) => REVIEWS.concat(state.extraReviews).filter((r) => r.listingId === id).sort((a, b) => b.date.localeCompare(a.date));
  const avgRating = (id) => { const r = reviewsFor(id); return r.length ? r.reduce((s, x) => s + x.stars, 0) / r.length : 0; };
  const balance = () => state.ledger.reduce((s, e) => s + e.amount, 0);

  function distanceKm(a, b) {
    const R = 6371, toRad = (x) => (x * Math.PI) / 180;
    const dLat = toRad(b.lat - a.lat), dLng = toRad(b.lng - a.lng);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }
  const distTo = (l) => distanceKm(me(), getOrg(l.orgId));

  function nextAvailable(l, from = todayISO()) {
    const d = parseISO(from);
    for (let i = 0; i < 21; i++) { if (l.days.includes(d.getDay())) return toISO(d); d.setDate(d.getDate() + 1); }
    return from;
  }
  const daysLabel = (days) => {
    if (days.length === 7) return "Daily";
    if ([1, 2, 3, 4, 5].every((d) => days.includes(d)) && days.length === 5) return "Weekdays";
    return days.map((d) => DAYS[d]).join(", ");
  };
  const priceHTML = (l, big = false) => l.credits === 0
    ? `<span class="price free">Free</span>${big ? ' <span class="small muted">corporate gift</span>' : ""}`
    : `<span class="price">${l.credits} credits</span> <span class="small muted">/ ${esc(l.unit)}</span>`;

  function stars(n, size = "") {
    let s = `<span class="stars ${size}">`;
    for (let i = 1; i <= 5; i++) s += `<span class="${i <= Math.round(n) ? "" : "off"}">${icon("star")}</span>`;
    return s + "</span>";
  }
  const avatar = (o, sm) => `<span class="avatar ${sm ? "sm" : ""}" style="background:${o.color}">${esc(o.short)}</span>`;
  const verifiedTick = (o) => `<span class="verified" title="${o.type === "corporate" ? "TMT corporate partner" : "Verified by TMT"}">${icon("shield")}</span>`;
  const statusBadge = (s) => ({
    pending: '<span class="badge warn">Pending approval</span>',
    confirmed: '<span class="badge info">Confirmed</span>',
    completed: '<span class="badge ok">Completed</span>',
    declined: '<span class="badge bad">Declined</span>',
    cancelled: '<span class="badge neutral">Cancelled</span>',
  }[s] || "");

  // ---------------------------------------------------------------- toast & modal
  let toastTimer;
  function toast(msg) {
    let t = document.querySelector(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
    t.innerHTML = icon("check") + `<span>${msg}</span>`;
    requestAnimationFrame(() => t.classList.add("show"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 3200);
  }
  function openModal(title, body, foot, onMount) {
    closeModal();
    const el = document.createElement("div");
    el.className = "modal-backdrop";
    el.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-label="${esc(title)}">
      <div class="modal-head"><h3>${title}</h3><button class="link-btn" data-close aria-label="Close">${icon("x")}</button></div>
      <div class="modal-body">${body}</div>${foot ? `<div class="modal-foot">${foot}</div>` : ""}</div>`;
    el.addEventListener("click", (e) => { if (e.target === el || e.target.closest("[data-close]")) closeModal(); });
    document.body.appendChild(el);
    onMount && onMount(el);
  }
  function closeModal() { document.querySelector(".modal-backdrop")?.remove(); }

  // ---------------------------------------------------------------- router
  // Routes live in memory (mirrored to the URL where the browser allows it), so the
  // app also works inside sandboxed frames that don't expose path-style hashes.
  let currentHash = location.hash.startsWith("#/") ? location.hash : "#/";
  function parseRoute() {
    const h = currentHash.replace(/^#/, "") || "/";
    const [path, qs] = h.split("?");
    return { parts: path.split("/").filter(Boolean), query: Object.fromEntries(new URLSearchParams(qs || "")) };
  }
  function setURL(hash, replace) {
    try { history[replace ? "replaceState" : "pushState"](null, "", hash); } catch (e) { /* sandboxed - memory only */ }
  }
  const go = (hash) => { currentHash = hash; setURL(hash); render(); };

  function render() {
    const { parts, query } = parseRoute();
    const [p0, p1] = parts;
    let view, active = p0 || "home";
    if (!p0) view = viewHome(query);
    else if (p0 === "browse") view = viewBrowse(query);
    else if (p0 === "listing" && getListing(p1)) view = viewListing(getListing(p1));
    else if (p0 === "org" && getOrg(p1)) view = viewOrg(getOrg(p1));
    else if (p0 === "dashboard") view = viewDashboard(p1 || "overview");
    else if (p0 === "new") view = viewNewListing();
    else if (p0 === "join") view = viewJoin();
    else if (p0 === "admin") view = viewAdmin();
    else view = { html: `<div class="wrap section"><div class="empty">${icon("search")}<h3>Page not found</h3><a class="btn" href="#/">Back to home</a></div></div>` };

    app.innerHTML = demoBar() + header(active) + `<main id="main">${view.html}</main>` + footer();
    view.mount && view.mount();
    if (query.s) document.getElementById(query.s)?.scrollIntoView();
    else window.scrollTo(0, 0);
  }

  // ---------------------------------------------------------------- chrome
  function demoBar() {
    return `<div class="demo-bar"><div class="wrap">
      <div><span class="demo-pill">Mock-up</span>All organisations, listings and figures are fictional.</div>
      <div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap">
        <label>Viewing as
          <select id="role-switch" aria-label="Switch demo role">
            <option value="charity" ${!isAdmin() ? "selected" : ""}>${esc(me().name)} (charity member)</option>
            <option value="admin" ${isAdmin() ? "selected" : ""}>TMT Admin (platform operator)</option>
          </select></label>
        <button class="link-btn" data-action="reset">Reset demo data</button>
      </div></div></div>`;
  }

  function header(active) {
    const links = isAdmin()
      ? [["home", "#/", "Home"], ["browse", "#/browse", "Browse resources"], ["admin", "#/admin", "Admin console"]]
      : [["home", "#/", "Home"], ["browse", "#/browse", "Browse resources"], ["how", "#/?s=how", "How it works"], ["new", "#/new", "List a resource"], ["dashboard", "#/dashboard", "My dashboard"]];
    const pending = state.bookings.filter((b) => b.status === "pending" && isMine(getListing(b.listingId))).length;
    const right = isAdmin()
      ? `<span class="badge corp">${icon("shield")} TMT Admin</span>`
      : `<a class="credit-chip" href="#/dashboard/credits" title="Credit balance">${icon("coins")} ${balance()} <span class="lbl">credits</span></a>
         <a href="#/dashboard/requests" title="${pending} requests awaiting you" style="position:relative">${avatar(me(), true)}${pending ? `<span style="position:absolute;top:-4px;right:-4px;background:var(--maroon);color:#fff;border-radius:99px;font-size:.62rem;padding:0 5px;font-weight:700">${pending}</span>` : ""}</a>`;
    return `<header class="site-header"><div class="wrap">
      <a class="logo" href="#/">${LOGO_MARK}<span class="logo-text"><b>Kampung Exchange</b><span>Community resource exchange</span></span></a>
      <nav class="nav" id="nav">${links.map(([k, href, label]) => `<a href="${href}" class="${k === active ? "active" : ""}">${label}</a>`).join("")}</nav>
      <div class="header-cta">${right}</div>
      <button class="menu-toggle" data-action="menu" aria-label="Menu">&#9776;</button>
    </div></header>`;
  }

  function footer() {
    return `<footer class="site-footer"><div class="wrap">
      <div class="footer-grid">
        <div><a class="logo" href="#/">${LOGO_MARK}<span class="logo-text"><b>Kampung Exchange</b><span>Community resource exchange</span></span></a>
          <p>A members-only exchange where Singapore's community well-being organisations share idle vans, spaces, equipment and skills. A pilot coordinated by TMT.</p></div>
        <div><h4>Exchange</h4><a href="#/browse">Browse resources</a><a href="#/new">List a resource</a><a href="#/?s=how">How credits work</a></div>
        <div><h4>Pools</h4>${Object.values(POOLS).map((p) => `<a href="#/browse?pool=${p.id}">${p.label}</a>`).join("")}</div>
        <div><h4>Join</h4><a href="#/join">Apply as a charity</a><a href="#/?s=partners">Corporate partners</a><a href="#/admin">TMT admin</a></div>
      </div>
      <div class="footer-bottom"><span>&copy; 2026 Kampung Exchange (mock-up). LTB Group 6 Wolverine.</span><span>Privacy Policy &nbsp;·&nbsp; Terms of Use &nbsp;·&nbsp; Community Guidelines</span></div>
    </div></footer>`;
  }

  function categorySelect(selected, withAny = true, id = "") {
    return `<select ${id ? `id="${id}"` : ""} name="cat">${withAny ? `<option value="">any resource</option>` : ""}${Object.values(POOLS).map((p) =>
      `<optgroup label="${p.label}">${CATEGORIES.filter((c) => c.pool === p.id).map((c) => `<option value="${c.id}" ${c.id === selected ? "selected" : ""}>${c.label}</option>`).join("")}</optgroup>`).join("")}</select>`;
  }

  function listingCard(l) {
    const o = getOrg(l.orgId), pool = poolOf(l), r = avgRating(l.id), n = reviewsFor(l.id).length;
    return `<a class="card pool-${pool}" href="#/listing/${l.id}">
      <div class="card-visual">${icon(catOf(l).icon)}
        <div class="badges">${l.booking === "instant" ? `<span class="badge instant">${icon("zap")} Instant book</span>` : '<span class="badge request">Request to book</span>'}
        ${o.type === "corporate" ? '<span class="badge corp">Corporate gift</span>' : ""}</div></div>
      <div class="card-body">
        <div class="card-cat">${esc(catOf(l).label)}</div>
        <h3>${esc(l.title)}</h3>
        <div class="card-org">${esc(o.name)} ${verifiedTick(o)}</div>
        <div class="card-meta">
          <span>${priceHTML(l)}</span>
          <span>${icon("pin")} ${distTo(l).toFixed(1)} km · ${esc(o.area)}</span>
          <span>${icon("calendar")} ${daysLabel(l.days)}</span>
          ${n ? `<span>${stars(r)} ${r.toFixed(1)} (${n})</span>` : '<span class="muted">New listing</span>'}
        </div>
      </div></a>`;
  }

  // ---------------------------------------------------------------- EXPLAINER
  // A video-style animation built from HTML scenes. CSS handles entrances; the
  // JS clock drives typing, counters and progress so pause/seek stay in sync.
  function explainerScenes() {
    const d = (s) => `style="--d:${s}s"`;
    const starRow = (from) => `<div class="xv-stars">${[0, 1, 2, 3, 4].map((i) => `<span style="--d:${(from + i * 0.15).toFixed(2)}s">${icon("star")}</span>`).join("")}</div>`;
    const silver = getOrg("o2"), light = getOrg("o3");
    return [
      { label: "The problem", dur: 7, html: `
        <div class="xv-eyebrow xv-a fade" ${d(0.1)}>Tuesday, 2:00pm</div>
        <div class="xv-row">
          <div class="xv-card xv-a left" ${d(0.4)}>
            <div class="xv-ic" style="background:var(--navy-tint);color:var(--navy)">${icon("truck")}</div>
            <b>${silver.name}</b><span class="xv-muted">14-seater van · parked since 1pm</span>
            <span class="badge neutral xv-idle" style="align-self:flex-start">Idle · 0 trips this afternoon</span>
          </div>
          <div class="xv-card xv-a right" ${d(1.6)}>
            <div class="xv-ic" style="background:var(--orange-tint);color:#C24400">${icon("users")}</div>
            <b>${light.name}</b><span class="xv-muted">Needs a van for Thursday's youth excursion</span>
            <span><span class="xv-big" style="font-size:2.2em">S$180</span> <span class="xv-muted">rental quote</span></span>
          </div>
        </div>
        <h3 class="xv-h xv-a" ${d(3)}>One charity's van sits idle. <strong>Another pays to rent one.</strong></h3>` },
      { label: "The cost", dur: 6, html: `
        <div class="xv-eyebrow xv-a fade" ${d(0.1)}>Why it matters</div>
        <div class="xv-row">
          <div class="xv-card xv-a" ${d(0.3)}><span class="xv-big">&lt;30%</span><span>of donations can go to admin and overheads under the 30-70 rule</span></div>
          <div class="xv-card xv-a" ${d(0.8)}><span class="xv-big">24%</span><span>of social service agencies recruit enough volunteers</span></div>
          <div class="xv-card xv-a" ${d(1.3)}><span class="xv-big">1 in 2</span><span>non-profits lack flexible funding for running costs</span></div>
        </div>
        <h3 class="xv-h xv-a" ${d(2.4)}>Every dollar spent on rent is <strong>a dollar not spent on people.</strong></h3>
        <div class="xv-src xv-a fade" ${d(2.8)}>Sources: Group 6 research deck (NCSS, charityguidepoint.sg)</div>` },
      { label: "Search", dur: 8, html: `
        <div class="xv-eyebrow xv-a fade" ${d(0.1)}>Search once</div>
        <div class="xv-browser xv-a" ${d(0.2)}>
          <div class="xv-browser-bar"><i></i><i></i><i></i></div>
          <div class="xv-browser-body">
            <div class="xv-search">I need <span data-typed="Asset: 14-Seater Van" data-at="0.7" data-cps="24"></span>
              <span class="xv-a fade" ${d(1.6)}>on</span> <span data-typed="Thu, 29 Oct" data-at="1.8" data-cps="18"></span>
              <span class="xv-a fade" ${d(2.5)}>within</span> <span data-typed="10 km" data-at="2.7" data-cps="14"></span></div>
            <div class="xv-ping xv-a pop" ${d(3.3)}>${icon("zap")} 3 matches within 10 km</div>
            <div class="xv-results">
              <div class="xv-res pool-transport xv-a" ${d(3.6)}><div class="xv-ic">${icon("truck")}</div><b>14-seater van</b><span class="xv-muted">${silver.name} · 4.1 km</span><span><b>30 credits</b> · ★ 5.0</span></div>
              <div class="xv-res pool-transport xv-a" ${d(3.85)}><div class="xv-ic">${icon("users")}</div><b>Volunteer drivers</b><span class="xv-muted">Swiftline Logistics · 4.8 km</span><span><b style="color:var(--green)">Free</b> · corporate gift</span></div>
              <div class="xv-res pool-transport xv-a" ${d(4.1)}><div class="xv-ic">${icon("truck")}</div><b>Tail-lift truck</b><span class="xv-muted">Swiftline Logistics · 4.8 km</span><span><b style="color:var(--green)">Free</b> · Saturdays</span></div>
            </div>
          </div>
        </div>
        <h3 class="xv-h xv-a" ${d(5)}>Every match nearby. <strong>No phone tag.</strong></h3>` },
      { label: "Book", dur: 8, html: `
        <h3 class="xv-h xv-a" ${d(0.2)}>Request. Approve. <strong>Done.</strong></h3>
        <div class="xv-orgs">
          <div class="xv-org xv-a left" ${d(0.4)}>${avatar(light)}<div><b>${light.name}</b><div class="xv-delta neg xv-a pop" ${d(5.4)}>−30 credits</div></div></div>
          <div class="xv-track xv-a fade" ${d(0.6)}><div class="xv-line"></div>
            <div class="xv-mover go" style="--d:1s;--t:1.6s"><span class="xv-tag">${icon("send")} Request · Thu 29 Oct</span></div>
            <div class="xv-mover go back" style="--d:2.8s;--t:1.6s"><span class="xv-tag ok">${icon("check")} Approved</span></div>
            <div class="xv-mover go" style="--d:4.2s;--t:1.4s"><span class="xv-tag coin">${icon("coins")} 30 credits</span></div>
          </div>
          <div class="xv-org xv-a right" ${d(0.4)}>${avatar(silver)}<div><b>${silver.name}</b><div class="xv-delta pos xv-a pop" ${d(5.6)}>+30 credits</div></div></div>
        </div>
        <div class="xv-a fade" ${d(6)} style="color:#C8CCD3;font-size:1.2em">Lenders earn credits. Borrowers spend them. No money changes hands.</div>` },
      { label: "Rate", dur: 6, html: `
        <div class="xv-eyebrow xv-a fade" ${d(0.1)}>Both sides rate</div>
        <div class="xv-row">
          <div class="xv-card xv-a left" ${d(0.3)}><div style="display:flex;gap:.6em;align-items:center">${avatar(light, true)}<b>Lighthouse rated Silver Threads</b></div>${starRow(0.9)}<span>"Van was spotless and on time."</span>
            <span class="badge ok xv-a pop" ${d(4)} style="align-self:flex-start">${icon("shield")} Trust score 4.9</span></div>
          <div class="xv-card xv-a right" ${d(1.8)}><div style="display:flex;gap:.6em;align-items:center">${avatar(silver, true)}<b>Silver Threads rated Lighthouse</b></div>${starRow(2.4)}<span>"Returned clean, with a full tank."</span></div>
        </div>
        <h3 class="xv-h xv-a" ${d(3.4)}>Peer ratings build trust <strong>without the red tape.</strong></h3>` },
      { label: "Impact", dur: 6, html: `
        <div class="xv-eyebrow xv-a fade" ${d(0.1)}>Pilot impact (illustrative)</div>
        <div class="xv-kpis">
          <div class="xv-kpi xv-a" ${d(0.2)}><b data-count="${PLATFORM_STATS.exchanges}" data-at="0.4" data-dur="1.8">0</b><span>exchanges completed</span></div>
          <div class="xv-kpi xv-a" ${d(0.4)}><b data-count="${PLATFORM_STATS.savings}" data-prefix="S$" data-at="0.6" data-dur="2">S$0</b><span>saved by charities</span></div>
          <div class="xv-kpi xv-a" ${d(0.6)}><b data-count="${PLATFORM_STATS.members}" data-at="0.8" data-dur="1.6">0</b><span>verified charities</span></div>
          <div class="xv-kpi xv-a" ${d(0.8)}><b data-count="${PLATFORM_STATS.hours}" data-at="1" data-dur="1.8">0</b><span>volunteer hours shared</span></div>
        </div>
        <h3 class="xv-h xv-a" ${d(3)}>Small swaps. <strong>Sector-wide savings.</strong></h3>` },
      { label: "Get started", dur: 5, cls: "xv-cta", html: `
        <div class="xv-a pop" ${d(0.2)}>${LOGO_MARK}</div>
        <h3 class="xv-h xv-a" ${d(0.6)}>Share what you have.<br><strong>Find what you need.</strong></h3>
        <div class="xv-triad xv-a" ${d(1.2)}><span>List.</span><span>Link.</span><span>Lend.</span></div>
        <div class="xv-a" ${d(1.8)} style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center"><a class="btn light" href="#/browse">Browse resources</a><a class="btn" href="#/join">Join the pilot</a></div>` },
    ];
  }

  const fmtClock = (s) => `${Math.floor(s / 60)}:${pad(Math.floor(s % 60))}`;

  function explainerHTML() {
    const scenes = explainerScenes(), total = scenes.reduce((s, x) => s + x.dur, 0);
    return `<div class="xv" id="xv">
      <div class="xv-frame">
        <div class="xv-stage paused">
          <button class="xv-overlay" id="xv-overlay" type="button" aria-label="Play the explainer">
            <span class="xv-play-big">${icon("play")}</span><b>See how it <strong>works</strong></b><span>${total} seconds · ${scenes.length} chapters</span></button>
        </div>
        <div class="xv-controls">
          <button class="xv-btn" id="xv-play" type="button" aria-label="Play">${icon("play", "solid")}</button>
          <span class="xv-time" id="xv-time">0:00 / ${fmtClock(total)}</span>
          <div class="xv-bar">${scenes.map((s, i) => `<button class="xv-seg" type="button" style="flex:${s.dur}" data-seg="${i}" title="${s.label}" aria-label="Chapter ${i + 1}: ${s.label}"><i></i></button>`).join("")}</div>
          <span class="xv-chapter" id="xv-chapter">${scenes[0].label}</span>
        </div>
      </div>
    </div>`;
  }

  function mountExplainer() {
    const root = document.getElementById("xv");
    if (!root) return;
    const stage = root.querySelector(".xv-stage"), overlay = root.querySelector("#xv-overlay"), playBtn = root.querySelector("#xv-play");
    const timeEl = root.querySelector("#xv-time"), chapterEl = root.querySelector("#xv-chapter"), segs = [...root.querySelectorAll(".xv-seg i")];
    const scenes = explainerScenes();
    const starts = scenes.reduce((a, s, i) => a.concat(i ? a[i - 1] + scenes[i - 1].dur : 0), []);
    const total = starts.at(-1) + scenes.at(-1).dur;
    let t = 0, idx = -1, playing = false, ended = false, last = 0;

    const sceneAt = (time) => { for (let i = 0; i < scenes.length; i++) if (time < starts[i] + scenes[i].dur) return i; return scenes.length - 1; };
    function show(i) {
      idx = i;
      stage.querySelector(".xv-scene")?.remove();
      stage.insertAdjacentHTML("afterbegin", `<div class="xv-scene ${scenes[i].cls || ""}">${scenes[i].html}</div>`);
    }
    function update() {
      const local = t - starts[idx];
      stage.querySelectorAll("[data-typed]").forEach((el) => {
        const n = Math.floor((local - Number(el.dataset.at)) * Number(el.dataset.cps || 20));
        el.textContent = el.dataset.typed.slice(0, Math.max(0, n));
      });
      stage.querySelectorAll("[data-count]").forEach((el) => {
        const p = Math.min(1, Math.max(0, (local - Number(el.dataset.at)) / Number(el.dataset.dur)));
        const v = Math.round(Number(el.dataset.count) * (1 - Math.pow(1 - p, 3)));
        el.textContent = (el.dataset.prefix || "") + v.toLocaleString("en-SG");
      });
      segs.forEach((s, i) => { s.style.width = Math.min(100, Math.max(0, ((t - starts[i]) / scenes[i].dur) * 100)) + "%"; });
      timeEl.textContent = `${fmtClock(t)} / ${fmtClock(total)}`;
      chapterEl.textContent = scenes[idx].label;
    }
    function setBtn() {
      const name = playing ? "pause" : ended ? "replay" : "play";
      playBtn.innerHTML = icon(name, name === "replay" ? "" : "solid");
      playBtn.setAttribute("aria-label", playing ? "Pause" : ended ? "Replay" : "Play");
    }
    function seek(time) { t = time; stage.classList.remove("rest"); show(sceneAt(t)); update(); }
    function play() {
      if (ended || idx === -1) { ended = false; seek(0); }
      overlay.hidden = true;
      playing = true;
      stage.classList.remove("paused");
      last = performance.now();
      setBtn();
      requestAnimationFrame(loop);
    }
    function pause() { playing = false; stage.classList.add("paused"); setBtn(); }
    function loop(now) {
      if (!playing) return;
      if (!document.body.contains(stage)) { playing = false; return; }
      // rAF timestamps can precede the performance.now() taken in play(); never run backwards.
      t += Math.max(0, now - last) / 1000;
      last = Math.max(last, now);
      if (t >= total) { t = total - 0.001; update(); playing = false; ended = true; setBtn(); return; }
      const i = sceneAt(t);
      if (i !== idx) show(i);
      update();
      requestAnimationFrame(loop);
    }

    // Poster frame: the final scene shown at rest behind the play button.
    show(scenes.length - 1);
    stage.classList.add("rest");
    idx = -1;

    overlay.addEventListener("click", play);
    playBtn.addEventListener("click", () => (playing ? pause() : play()));
    root.querySelector(".xv-bar").addEventListener("click", (e) => {
      const b = e.target.closest("[data-seg]");
      if (!b) return;
      ended = false;
      seek(starts[Number(b.dataset.seg)]);
      play();
    });
    document.addEventListener("visibilitychange", () => { if (document.hidden && playing) pause(); });
  }

  // ---------------------------------------------------------------- HOME
  function viewHome() {
    const featured = ["L2", "L6", "L10", "L1", "L15", "L9"].map(getListing);
    const html = `
    <section class="hero"><div class="wrap">
      <div>
        <span class="eyebrow">For Singapore's community well-being sector</span>
        <h1>Share what you have.<br><strong>Find what you need.</strong></h1>
        <p class="lead">A members-only exchange where verified charities lend each other idle vans, rooms, equipment and skilled volunteers. No phone tag. No committee wait.</p>
        <form class="search-card" id="hero-search">
          <div class="search-sentence">
            <span>I need</span> ${categorySelect("")}
            <span>on</span> <input type="date" name="date" value="${todayISO()}" min="${todayISO()}" aria-label="Date">
            <span>within</span>
            <select name="km" aria-label="Distance"><option value="3">3 km</option><option value="5">5 km</option><option value="10" selected>10 km</option><option value="20">20 km</option><option value="">any distance</option></select>
          </div>
          <button class="btn" type="submit">${icon("search")} Find matches</button>
        </form>
      </div>
      <div class="hero-collage" aria-hidden="true">
        <div class="float-card f1 pool-transport"><div class="fc-icon" style="background:var(--navy-tint);color:var(--navy)">${icon("truck")}</div><div><b>Wheelchair van</b><span>Free Mon · Wed · Fri mornings</span></div></div>
        <div class="float-card f2 pool-space"><div class="fc-icon" style="background:var(--maroon-tint);color:var(--maroon)">${icon("home")}</div><div><b>Training room, 30 pax</b><span>Toa Payoh · weekday evenings</span></div></div>
        <div class="match-ping">${icon("zap")} 3 matches within 10 km</div>
        <div class="float-card f3"><div class="fc-icon" style="background:var(--orange-tint);color:#C24400">${icon("grid")}</div><div><b>80 stackable chairs</b><span>Instant book · 5 credits</span></div></div>
        <div class="float-card f4"><div class="fc-icon" style="background:var(--yellow-tint);color:#8A6100">${icon("pen")}</div><div><b>Pro-bono designer</b><span>10 hrs/month available</span></div></div>
      </div>
    </div></section>

    <section class="stats-band"><div class="wrap">
      <div class="stat"><b>${PLATFORM_STATS.members}</b><span>verified member organisations</span></div>
      <div class="stat"><b>${PLATFORM_STATS.listings}</b><span>resources listed</span></div>
      <div class="stat"><b>${PLATFORM_STATS.exchanges}</b><span>exchanges completed</span></div>
      <div class="stat"><b>${money(PLATFORM_STATS.savings)}</b><span>estimated costs saved by charities</span></div>
    </div></section>

    <section class="section soft" id="watch"><div class="wrap">
      <div class="section-head center"><span class="eyebrow">See it in action</span><h2>From idle van to <strong>shared resource</strong></h2>
        <p class="muted">How charities find, book and rate each other's resources, in under a minute.</p></div>
      ${explainerHTML()}
    </div></section>

    <section class="section"><div class="wrap">
      <div class="section-head"><span class="eyebrow">What we do</span><h2>Turning idle resources into <strong>community impact</strong></h2>
        <p class="muted">Charities across Singapore own vans that sit parked, rooms that sit empty and volunteers with hours to spare, while other charities pay full price for the same things. We connect the two.</p></div>
      <div class="triad">
        <div><div class="num">01</div><h3><strong>List</strong> your idle capacity</h3><p class="muted">Post a van that's free on Tuesday afternoons, a room that's empty after 7pm or a volunteer with five spare hours. Listing takes about two minutes.</p></div>
        <div><div class="num">02</div><h3><strong>Link</strong> with a match instantly</h3><p class="muted">Search "I need X on this date within Y km" and see matches straight away, sorted by distance and trust score.</p></div>
        <div><div class="num">03</div><h3><strong>Lend</strong> and earn credits</h3><p class="muted">Every exchange is recorded on a shared ledger. Earn credits when you lend and spend them when you borrow, with no cash needed.</p></div>
      </div>
    </div></section>

    <section class="section soft"><div class="wrap">
      <div class="section-head"><span class="eyebrow">Resource pools</span><h2>Four ways to <strong>share</strong></h2></div>
      <div class="pools">${Object.values(POOLS).map((p) => `
        <a class="pool-card pool-${p.id}" href="#/browse?pool=${p.id}">
          <div class="pool-icon">${icon(p.icon)}</div><h3>${p.label}</h3><p class="small muted">${p.blurb}</p>
          <ul>${p.examples.map((e) => `<li>${e}</li>`).join("")}</ul>
          <span class="more">Browse ${allListings().filter((l) => poolOf(l) === p.id).length} listings ${icon("arrow")}</span></a>`).join("")}
      </div>
    </div></section>

    <section class="section" id="how"><div class="wrap">
      <div class="section-head"><span class="eyebrow">How it works</span><h2>As easy as <strong>booking a ride</strong></h2>
        <p class="muted">Like a ride-hailing app, you don't need to call five organisations to find a van. The platform does the matching, and the community keeps everyone accountable.</p></div>
      <div class="steps">
        <div class="step"><h3>Get verified once</h3><p>TMT verifies each charity's registration when it joins. After that, members deal with each other directly.</p></div>
        <div class="step"><h3>Search or list</h3><p>Every resource uses a standard category, such as <em>Space: Training Room</em> or <em>Asset: Wheelchair Van</em>, so searches find exact matches.</p></div>
        <div class="step"><h3>Book</h3><p>Low-value items are instant-book. Higher-value assets need the owner's approval, which usually comes within a day.</p></div>
        <div class="step"><h3>Rate each other</h3><p>After every exchange, both sides rate the other. Was it as described? Was it returned clean? Ratings build each organisation's trust score.</p></div>
      </div>
      <div class="mode-compare">
        <div class="mode-box"><div class="mb-icon" style="background:var(--yellow);color:var(--slate)">${icon("zap")}</div><div><h3>Instant Book</h3><p class="small muted" style="margin:0">For everyday, low-risk items such as stackable chairs, hot desks, PA kits and wheelchairs. Confirmed immediately, with credits deducted on booking.</p></div></div>
        <div class="mode-box"><div class="mb-icon" style="background:var(--maroon-tint);color:var(--maroon)">${icon("send")}</div><div><h3>Request to Book</h3><p class="small muted" style="margin:0">For high-value assets such as vans, kitchens and halls. The owner reviews your request and note, and credits are deducted only once they approve.</p></div></div>
      </div>
    </div></section>

    <section class="section soft"><div class="wrap">
      <div class="section-head" style="display:flex;justify-content:space-between;align-items:end;max-width:none;gap:20px;flex-wrap:wrap">
        <div><span class="eyebrow">Available now</span><h2 style="margin:0">Featured <strong>resources</strong></h2></div>
        <a class="btn ghost" href="#/browse">View all resources ${icon("arrow")}</a></div>
      <div class="grid-cards">${featured.map(listingCard).join("")}</div>
    </div></section>

    <section class="section"><div class="wrap">
      <div class="section-head center"><span class="eyebrow">Trust &amp; accountability</span><h2>Built on <strong>peer trust</strong>, not red tape</h2></div>
      <div class="trust-grid">
        <div class="trust-item"><div class="ti-icon">${icon("shield")}</div><h3>Verified charities only</h3><p class="muted">During the pilot, only registered charities and IPCs vetted by TMT can join. Every member shows a verification badge.</p></div>
        <div class="trust-item"><div class="ti-icon">${icon("star")}</div><h3>Two-way ratings</h3><p class="muted">Lenders and borrowers rate each other after every exchange. Trust scores are public to all members.</p></div>
        <div class="trust-item"><div class="ti-icon">${icon("coins")}</div><h3>Transparent credit ledger</h3><p class="muted">Every exchange is logged with its estimated value, so you have records ready for grant reports and audits.</p></div>
      </div>
    </div></section>

    <section class="section soft"><div class="wrap">
      <div class="section-head center"><span class="eyebrow">Voices from the pilot</span><h2>What members <strong>are saying</strong></h2><p class="small muted">Illustrative quotes for this mock-up.</p></div>
      <div class="quotes">
        <blockquote class="quote"><p>"Our van used to sit in the car park every Tuesday afternoon. Now it takes youth groups on excursions, and the credits pay for the chairs we borrow for our family day."</p><footer><b>Programme Manager</b>Silver Threads Eldercare</footer></blockquote>
        <blockquote class="quote"><p>"We found a free auditorium for 100 volunteers in under ten minutes. Last year that briefing cost us $2,400."</p><footer><b>Volunteer Lead</b>Hearts &amp; Hands Disability Services</footer></blockquote>
        <blockquote class="quote"><p>"The ratings are what made us comfortable lending out our kitchen. You can see exactly who you're dealing with."</p><footer><b>Executive Director</b>Evergreen Bereavement Care</footer></blockquote>
      </div>
    </div></section>

    <section class="cta-band" id="partners"><div class="wrap">
      <div><h2>Have idle assets? <strong>Lend them to the sector.</strong></h2>
        <p>Corporate partners can list empty boardrooms, retired laptops, spare truck slots or volunteer drivers for charities only. Your contributions are tracked for CSR reporting.</p></div>
      <div style="display:flex;gap:12px;flex-wrap:wrap"><a class="btn light" href="#/join">Apply as a charity</a><button class="btn ghost" style="color:#fff;border-color:#fff" data-action="partner">Partner with us</button></div>
    </div></section>`;

    return {
      html,
      mount() {
        mountExplainer();
        document.getElementById("hero-search").addEventListener("submit", (e) => {
          e.preventDefault();
          const f = new FormData(e.target);
          const q = new URLSearchParams();
          ["cat", "date", "km"].forEach((k) => f.get(k) && q.set(k, f.get(k)));
          go("#/browse?" + q.toString());
        });
      },
    };
  }

  // ---------------------------------------------------------------- BROWSE
  function viewBrowse(query) {
    const f = {
      pool: query.pool || "", cat: query.cat || "", date: query.date || "", km: query.km || "",
      instant: query.instant === "1", free: query.free === "1", sort: query.sort || "nearest", q: query.q || "",
    };
    if (f.cat) f.pool = CATEGORIES.find((c) => c.id === f.cat)?.pool || f.pool;

    const html = `
    <div class="page-head"><div class="wrap">
      <div class="crumbs"><a href="#/">Home</a> / Browse resources</div>
      <h1>Browse <strong style="font-weight:700;color:var(--maroon)">resources</strong></h1>
      <p class="muted" style="margin:0">Showing distances from ${esc(me().name)} in ${esc(me().area)}.</p>
    </div></div>
    <div class="wrap"><div class="browse-layout">
      <aside class="filters" id="filters">
        <h4>Search</h4>
        <input type="text" id="f-q" placeholder="e.g. van, projector, kitchen" value="${esc(f.q)}">
        <h4>Resource pool</h4>
        <div class="chips" id="f-pool">
          <button class="chip ${!f.pool ? "on" : ""}" data-pool="">All</button>
          ${Object.values(POOLS).map((p) => `<button class="chip ${f.pool === p.id ? "on" : ""}" data-pool="${p.id}">${p.short}</button>`).join("")}
        </div>
        <h4>Category</h4>
        <div id="f-cat-wrap"></div>
        <h4>Date needed</h4>
        <input type="date" id="f-date" value="${esc(f.date)}" min="${todayISO()}">
        <h4>Distance: <span id="km-label"></span></h4>
        <input type="range" id="f-km" min="1" max="31" value="${f.km || 31}">
        <h4>Options</h4>
        <label class="check"><input type="checkbox" id="f-instant" ${f.instant ? "checked" : ""}> Instant book only</label>
        <label class="check"><input type="checkbox" id="f-free" ${f.free ? "checked" : ""}> Free (corporate gifts)</label>
        <button class="link-btn small" id="f-clear" style="margin-top:8px">Clear all filters</button>
      </aside>
      <section>
        <div id="ping"></div>
        <div class="results-bar">
          <span id="count" class="muted"></span>
          <label class="small">Sort by
            <select id="f-sort" style="margin-left:6px">
              <option value="nearest">Nearest first</option><option value="rating">Highest rated</option>
              <option value="credits">Fewest credits</option><option value="newest">Newest</option>
            </select></label>
        </div>
        <div class="grid-cards" id="results" style="grid-template-columns:repeat(auto-fill,minmax(260px,1fr))"></div>
      </section>
    </div></div>`;

    function syncURL() {
      const q = new URLSearchParams();
      Object.entries(f).forEach(([k, v]) => { if (v === true) q.set(k, "1"); else if (v && !(k === "sort" && v === "nearest")) q.set(k, v); });
      currentHash = "#/browse" + (q.toString() ? "?" + q : "");
      setURL(currentHash, true);
    }

    function renderCat() {
      const opts = CATEGORIES.filter((c) => !f.pool || c.pool === f.pool);
      if (f.cat && !opts.some((c) => c.id === f.cat)) f.cat = "";
      document.getElementById("f-cat-wrap").innerHTML = `<select id="f-cat"><option value="">All categories</option>${opts.map((c) => `<option value="${c.id}" ${c.id === f.cat ? "selected" : ""}>${c.label}</option>`).join("")}</select>`;
      document.getElementById("f-cat").addEventListener("change", (e) => { f.cat = e.target.value; update(); });
    }

    function update() {
      const km = f.km ? Number(f.km) : null;
      document.getElementById("km-label").textContent = km && km <= 30 ? `within ${km} km` : "any";
      const dow = f.date ? parseISO(f.date).getDay() : null;
      const q = f.q.trim().toLowerCase();
      let list = allListings().filter((l) => listingStatus(l) === "live")
        .filter((l) => !f.pool || poolOf(l) === f.pool)
        .filter((l) => !f.cat || l.cat === f.cat)
        .filter((l) => dow === null || l.days.includes(dow))
        .filter((l) => !km || km > 30 || distTo(l) <= km)
        .filter((l) => !f.instant || l.booking === "instant")
        .filter((l) => !f.free || l.credits === 0)
        .filter((l) => !q || (l.title + " " + l.desc + " " + getOrg(l.orgId).name + " " + catOf(l).label).toLowerCase().includes(q));
      const sorters = {
        nearest: (a, b) => distTo(a) - distTo(b),
        rating: (a, b) => avgRating(b.id) - avgRating(a.id),
        credits: (a, b) => a.credits - b.credits,
        newest: (a, b) => allListings().indexOf(b) - allListings().indexOf(a),
      };
      list.sort(sorters[f.sort]);

      document.getElementById("count").textContent = `${list.length} resource${list.length === 1 ? "" : "s"} available`;
      const parts = [];
      if (f.cat) parts.push(`<b>${esc(CATEGORIES.find((c) => c.id === f.cat).label)}</b>`);
      else if (f.pool) parts.push(`<b>${POOLS[f.pool].label}</b>`);
      if (f.date) parts.push(`on <b>${fmtDate(f.date)}</b>`);
      if (km && km <= 30) parts.push(`within <b>${km} km</b>`);
      const inst = list.filter((l) => l.booking === "instant").length;
      document.getElementById("ping").innerHTML = parts.length
        ? `<div class="ping-line">${icon("zap")} You asked for ${parts.join(" ")}. We found <b>${list.length} match${list.length === 1 ? "" : "es"}</b>${inst ? `, ${inst} of them instant-book` : ""}.</div>` : "";
      document.getElementById("results").innerHTML = list.length ? list.map(listingCard).join("")
        : `<div class="empty" style="grid-column:1/-1">${icon("search")}<h3>No matches yet</h3><p>Try a wider distance or a different date, or post a request so members can offer help.</p></div>`;
      syncURL();
    }

    return {
      html,
      mount() {
        document.getElementById("f-sort").value = f.sort;
        renderCat();
        document.getElementById("f-pool").addEventListener("click", (e) => {
          const b = e.target.closest("[data-pool]"); if (!b) return;
          f.pool = b.dataset.pool;
          document.querySelectorAll("#f-pool .chip").forEach((c) => c.classList.toggle("on", c === b));
          renderCat(); update();
        });
        document.getElementById("f-q").addEventListener("input", (e) => { f.q = e.target.value; update(); });
        document.getElementById("f-date").addEventListener("change", (e) => { f.date = e.target.value; update(); });
        document.getElementById("f-km").addEventListener("input", (e) => { f.km = Number(e.target.value) > 30 ? "" : e.target.value; update(); });
        document.getElementById("f-instant").addEventListener("change", (e) => { f.instant = e.target.checked; update(); });
        document.getElementById("f-free").addEventListener("change", (e) => { f.free = e.target.checked; update(); });
        document.getElementById("f-sort").addEventListener("change", (e) => { f.sort = e.target.value; update(); });
        document.getElementById("f-clear").addEventListener("click", () => go("#/browse?r=" + Date.now()));
        update();
      },
    };
  }

  // ---------------------------------------------------------------- LISTING DETAIL
  function viewListing(l) {
    const o = getOrg(l.orgId), pool = poolOf(l), cat = catOf(l), revs = reviewsFor(l.id), r = avgRating(l.id);
    const mine = isMine(l);
    const startDate = nextAvailable(l);

    const bookPanel = mine ? `
      <div class="bp-head"><span class="badge info">Your listing</span><h3 style="margin:10px 0 0">Manage this resource</h3></div>
      <div class="bp-body">
        <p class="small muted">Status: <b>${listingStatus(l) === "live" ? "Live and visible to members" : "Paused (hidden from search)"}</b></p>
        ${state.bookings.filter((b) => b.listingId === l.id && b.status === "pending").map((b) => `<div class="note warn">${icon("info")}<span><b>${esc(getOrg(b.by).name)}</b> requested ${fmtDate(b.date)}</span></div>`).join("")}
        <a class="btn block" style="margin-top:16px" href="#/dashboard/requests">Review requests</a>
        <a class="btn ghost block" style="margin-top:10px" href="#/dashboard/listings">Edit or pause listing</a>
      </div>`
      : isAdmin() ? `
      <div class="bp-head">${priceHTML(l, true)}</div>
      <div class="bp-body"><div class="note">${icon("info")}<span>You're viewing as TMT Admin. Switch to a charity member in the bar at the top to try booking.</span></div>
        <button class="btn ghost block" style="margin-top:14px" data-action="flag" data-id="${l.id}">${icon("flag")} Flag for review</button></div>`
      : `
      <div class="bp-head">${priceHTML(l, true)}
        <div class="small muted" style="margin-top:4px">${l.booking === "instant" ? `${icon("zap")} Instant book: confirmed straight away` : "Request to book: the owner approves your request"}</div></div>
      <form class="bp-body" id="book-form">
        <div class="field"><label for="b-date">Date</label><input type="date" id="b-date" name="date" value="${startDate}" min="${todayISO()}" required></div>
        <div class="field"><label for="b-units">How many ${esc(l.unit)}s?</label><input type="number" id="b-units" name="units" value="1" min="1" max="30" required></div>
        ${l.booking === "request" ? `<div class="field"><label for="b-note">Note to ${esc(o.name)}</label><textarea id="b-note" name="note" placeholder="What's it for? How many people? Any special needs?" style="min-height:80px"></textarea></div>` : ""}
        <div id="avail-note"></div>
        <div class="summary-rows" id="summary"></div>
        <button class="btn block" type="submit" id="book-btn">${l.booking === "instant" ? `${icon("zap")} Instant book` : `${icon("send")} Send request`}</button>
        <div class="note">${icon("shield")}<span>Both organisations rate each other after the exchange. Cancel free of charge up to 24h before.</span></div>
      </form>`;

    const html = `
    <div class="wrap"><div class="detail-layout pool-${pool}">
      <div>
        <div class="crumbs" style="margin-top:4px"><a href="#/">Home</a> / <a href="#/browse">Browse</a> / <a href="#/browse?pool=${pool}">${POOLS[pool].label}</a></div>
        <div class="detail-visual">${icon(cat.icon)}<div class="badges">
          ${l.booking === "instant" ? `<span class="badge instant">${icon("zap")} Instant book</span>` : '<span class="badge request">Request to book</span>'}
          ${o.type === "corporate" ? '<span class="badge corp">Corporate gift</span>' : ""}</div></div>
        <span class="taxonomy">${esc(cat.label)}</span>
        <h1 style="font-size:clamp(1.6rem,3vw,2.3rem);font-weight:600">${esc(l.title)}</h1>
        <p style="display:flex;gap:16px;flex-wrap:wrap;color:var(--muted);font-size:.9rem">
          <span>${icon("pin")} ${esc(o.area)} · ${distTo(l).toFixed(1)} km away</span>
          ${revs.length ? `<span>${stars(r)} ${r.toFixed(1)} · ${revs.length} review${revs.length > 1 ? "s" : ""}</span>` : "<span>New listing</span>"}
        </p>

        <div class="detail-section"><h3>About this resource</h3><p>${esc(l.desc)}</p>
          <div class="facts">
            <div class="fact">${icon("box")}<div><b>Capacity</b>${esc(l.qty)}</div></div>
            <div class="fact">${icon("clock")}<div><b>Hours</b>${esc(l.time)}</div></div>
            <div class="fact">${icon("coins")}<div><b>Credits</b>${l.credits ? `${l.credits} per ${esc(l.unit)}` : "Free for charities"}</div></div>
            <div class="fact">${icon("dollar")}<div><b>Est. market value</b>${money(l.value)} per ${esc(l.unit)}</div></div>
          </div></div>

        <div class="detail-section"><h3>Weekly availability</h3>
          <div class="week">${[1, 2, 3, 4, 5, 6, 0].map((d) => `<div class="${l.days.includes(d) ? "on" : ""}">${DAYS[d]}<small>${l.days.includes(d) ? "Open" : "-"}</small></div>`).join("")}</div>
          <p class="small muted" style="margin-top:10px">${icon("clock")} ${esc(l.time)}</p></div>

        ${l.rules && l.rules.length ? `<div class="detail-section"><h3>House rules</h3><ul style="margin:0;padding-left:1.2em">${l.rules.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>` : ""}

        <div class="detail-section"><h3>Offered by</h3>
          <a class="org-card" href="#/org/${o.id}" style="color:inherit;text-decoration:none">${avatar(o)}
            <div><b style="color:var(--ink)">${esc(o.name)}</b> ${verifiedTick(o)}<br><span class="small muted">${esc(o.focus)} · ${esc(o.area)} · Member since ${o.since}</span><br>
            <span class="small">${o.type === "corporate" ? '<span class="badge corp">TMT corporate partner</span>' : `<span class="badge ok">${icon("shield")} Verified by TMT${o.ipc ? " · IPC" : ""}</span>`}</span></div>
            <div class="trust-score"><b>${o.trust.toFixed(1)}</b><span>Trust score</span><div class="small muted">${o.exchanges} exchanges</div></div></a></div>

        <div class="detail-section"><h3>Reviews from members ${revs.length ? `<span class="muted" style="font-weight:400">(${revs.length})</span>` : ""}</h3>
          ${revs.length ? revs.map((rv) => { const ro = getOrg(rv.from); return `<div class="review">${avatar(ro, true)}<div><b>${esc(ro.name)}</b> <span class="small muted">· ${fmtDate(rv.date, false)}</span><br>${stars(rv.stars)}<p>${esc(rv.text)}</p>
            <div class="tags">${(rv.tags || []).map((t) => `<span class="badge neutral">${esc(t)}</span>`).join("")}</div></div></div>`; }).join("")
            : '<p class="muted">No reviews yet. Be the first to borrow this resource.</p>'}</div>
      </div>
      <aside class="book-panel">${bookPanel}</aside>
    </div></div>`;

    return {
      html,
      mount() {
        const form = document.getElementById("book-form");
        if (!form) return;
        const upd = () => {
          const date = form.date.value, units = Math.max(1, Number(form.units.value) || 1);
          const total = l.credits * units, bal = balance(), ok = date && l.days.includes(parseISO(date).getDay());
          const enough = total <= bal;
          document.getElementById("avail-note").innerHTML = !date ? "" : ok
            ? `<div class="note ok">${icon("check")}<span>Available on ${fmtDate(date)}, ${esc(l.time)}</span></div>`
            : `<div class="note bad">${icon("x")}<span>Not available on ${DAYS[parseISO(date).getDay()]}s. Next open date: <button type="button" class="link-btn" data-next>${fmtDate(nextAvailable(l, date))}</button></span></div>`;
          document.getElementById("summary").innerHTML = `
            <div><span>${l.credits ? `${l.credits} credits × ${units} ${esc(l.unit)}${units > 1 ? "s" : ""}` : "Corporate gift"}</span><span>${total} credits</span></div>
            <div><span>Your balance</span><span>${bal} credits</span></div>
            <div class="total"><span>Balance after</span><span>${bal - total} credits</span></div>
            <div class="muted small"><span>Estimated savings vs. renting</span><span class="amt-pos">${money(l.value * units)}</span></div>`;
          document.getElementById("book-btn").disabled = !ok || !enough;
          if (!enough) document.getElementById("avail-note").innerHTML += `<div class="note bad">${icon("coins")}<span>Not enough credits. Lend a resource to earn more.</span></div>`;
          const nx = form.querySelector("[data-next]");
          nx && nx.addEventListener("click", () => { form.date.value = nextAvailable(l, date); upd(); });
        };
        form.addEventListener("input", upd);
        upd();
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          const units = Math.max(1, Number(form.units.value) || 1);
          const b = { id: "B" + Date.now(), listingId: l.id, by: CURRENT_ORG_ID, date: form.date.value, units, created: todayISO(), note: form.note ? form.note.value : "" };
          if (l.booking === "instant") {
            b.status = "confirmed";
            if (l.credits) state.ledger.push({ date: todayISO(), desc: `${l.title} - ${o.name}`, amount: -l.credits * units });
          } else b.status = "pending";
          state.bookings.push(b);
          save();
          go("#/dashboard/bookings");
          toast(l.booking === "instant" ? `Booked! ${esc(l.title)} is confirmed for ${fmtDate(b.date)}.` : `Request sent to ${esc(o.name)}. You'll be notified when they respond.`);
        });
      },
    };
  }

  // ---------------------------------------------------------------- ORG PROFILE
  function viewOrg(o) {
    const ls = allListings().filter((l) => l.orgId === o.id && listingStatus(l) === "live");
    const revs = ls.flatMap((l) => reviewsFor(l.id));
    return {
      html: `
      <div class="page-head"><div class="wrap">
        <div class="crumbs"><a href="#/">Home</a> / <a href="#/browse">Browse</a> / Organisation</div>
        <div class="org-card" style="background:#fff;border:0;padding:0;background:transparent">${avatar(o)}
          <div><h1 style="margin:0">${esc(o.name)} ${verifiedTick(o)}</h1>
          <span class="muted">${esc(o.focus)} · ${esc(o.area)} · Member since ${o.since}${o.uen ? ` · UEN ${esc(o.uen)}` : ""}</span></div>
          <div class="trust-score"><b>${o.trust.toFixed(1)}</b><span>Trust score</span><div class="small muted">${o.exchanges} exchanges</div></div></div>
      </div></div>
      <div class="wrap section" style="padding-top:40px">
        <h2 style="font-size:1.4rem">Resources offered <span class="muted">(${ls.length})</span></h2>
        <div class="grid-cards" style="margin-bottom:48px">${ls.map(listingCard).join("") || '<p class="muted">No live listings.</p>'}</div>
        <h2 style="font-size:1.4rem">Reviews received</h2>
        ${revs.map((rv) => { const ro = getOrg(rv.from); return `<div class="review">${avatar(ro, true)}<div><b>${esc(ro.name)}</b> <span class="small muted">· ${fmtDate(rv.date, false)} · ${esc(getListing(rv.listingId).title)}</span><br>${stars(rv.stars)}<p>${esc(rv.text)}</p></div></div>`; }).join("") || '<p class="muted">No reviews yet.</p>'}
      </div>`,
    };
  }

  // ---------------------------------------------------------------- DASHBOARD
  function viewDashboard(tab) {
    if (isAdmin()) return { html: `<div class="wrap section"><div class="empty">${icon("info")}<h3>You're viewing as TMT Admin</h3><p>The member dashboard is for charities. Open the admin console instead.</p><a class="btn" href="#/admin">Open admin console</a></div></div>` };

    const myListings = allListings().filter(isMine);
    const incoming = state.bookings.filter((b) => isMine(getListing(b.listingId)));
    const outgoing = state.bookings.filter((b) => b.by === CURRENT_ORG_ID);
    const pendingIn = incoming.filter((b) => b.status === "pending");
    const toRate = outgoing.filter((b) => b.status === "completed" && !b.ratedByBorrower).concat(incoming.filter((b) => b.status === "completed" && !b.ratedBySupplier));
    const upcoming = outgoing.filter((b) => b.status === "confirmed" || b.status === "pending").sort((a, b) => a.date.localeCompare(b.date));
    const saved = outgoing.filter((b) => b.status === "completed" || b.status === "confirmed").reduce((s, b) => s + getListing(b.listingId).value * b.units, 0);

    const tabs = [
      ["overview", "Overview"], ["requests", "Incoming requests", pendingIn.length], ["bookings", "My bookings"],
      ["listings", "My listings"], ["credits", "Credits"],
    ];

    const bookingRow = (b, side) => {
      const l = getListing(b.listingId), other = getOrg(side === "in" ? b.by : l.orgId), pool = poolOf(l);
      let actions = "";
      if (side === "in" && b.status === "pending") actions = `<button class="btn sm green" data-action="approve" data-id="${b.id}">${icon("check")} Approve</button><button class="btn sm ghost" data-action="decline" data-id="${b.id}">Decline</button>`;
      if (side === "in" && b.status === "confirmed") actions = `<button class="btn sm slate" data-action="complete" data-id="${b.id}">Mark returned</button>`;
      if (side === "out" && b.status === "pending") actions = `<button class="btn sm slate" data-action="sim-approve" data-id="${b.id}" title="Demo only: pretend the owner approved">Simulate approval</button><button class="btn sm ghost" data-action="cancel" data-id="${b.id}">Cancel</button>`;
      if (side === "out" && b.status === "confirmed") actions = `<button class="btn sm slate" data-action="complete" data-id="${b.id}" title="Demo only">Mark completed</button><button class="btn sm ghost" data-action="cancel" data-id="${b.id}">Cancel</button>`;
      const needsRate = b.status === "completed" && (side === "out" ? !b.ratedByBorrower : !b.ratedBySupplier);
      if (needsRate) actions = `<button class="btn sm" data-action="rate" data-id="${b.id}" data-side="${side}">${icon("star")} Rate ${esc(other.name.split(" ")[0])}</button>`;
      else if (b.status === "completed") actions = '<span class="small muted">Rated ✓</span>';
      return `<div class="row-item pool-${pool}"><div class="ri-icon">${icon(catOf(l).icon)}</div>
        <div class="ri-main"><b><a href="#/listing/${l.id}" style="color:inherit">${esc(l.title)}</a></b>
          <span>${side === "in" ? "Requested by" : "From"} ${esc(other.name)} · ${fmtDate(b.date)} · ${b.units} ${esc(l.unit)}${b.units > 1 ? "s" : ""} · ${l.credits ? l.credits * b.units + " credits" : "Free"}</span>
          ${b.note ? `<div class="small" style="margin-top:4px;color:var(--slate)">"${esc(b.note)}"</div>` : ""}</div>
        <div class="ri-actions">${statusBadge(b.status)} ${actions}</div></div>`;
    };

    let body = "";
    if (tab === "overview") {
      body = `
        <div class="kpis">
          <div class="kpi" style="--kc:var(--yellow)"><span>Credit balance</span><b>${balance()}</b><small>credits available</small></div>
          <div class="kpi" style="--kc:var(--navy)"><span>Upcoming</span><b>${upcoming.length}</b><small>bookings and pending requests</small></div>
          <div class="kpi"><span>Needs your action</span><b>${pendingIn.length + toRate.length}</b><small>approvals and ratings</small></div>
          <div class="kpi" style="--kc:var(--green)"><span>Estimated savings</span><b>${money(saved)}</b><small>vs. renting at market rates</small></div>
        </div>
        <div class="two-col">
          <div>
            <div class="panel"><div class="panel-head"><h3>Needs your action</h3></div>
              ${pendingIn.map((b) => bookingRow(b, "in")).join("")}
              ${toRate.map((b) => bookingRow(b, b.by === CURRENT_ORG_ID ? "out" : "in")).join("")}
              ${!pendingIn.length && !toRate.length ? '<div class="panel-body muted">All caught up!</div>' : ""}</div>
            <div class="panel"><div class="panel-head"><h3>Upcoming</h3><a class="small" href="#/dashboard/bookings">See all</a></div>
              ${upcoming.map((b) => bookingRow(b, "out")).join("") || '<div class="panel-body muted">Nothing booked yet. <a href="#/browse">Find a resource</a>.</div>'}</div>
          </div>
          <div>
            <div class="panel"><div class="panel-head"><h3>Your trust profile</h3></div><div class="panel-body" style="display:flex;gap:20px;align-items:center">
              <div class="trust-score" style="border:0;margin:0;padding:0"><b style="font-size:2.4rem">${me().trust.toFixed(1)}</b><span>Trust score</span></div>
              <div class="small">${stars(me().trust)}<br>${me().exchanges} completed exchanges<br><span class="badge ok" style="margin-top:6px">${icon("shield")} Verified by TMT · IPC</span></div></div></div>
            <div class="panel"><div class="panel-head"><h3>Quick actions</h3></div><div class="panel-body" style="display:grid;gap:10px">
              <a class="btn block" href="#/new">${icon("plus")} List a resource</a>
              <a class="btn ghost block" href="#/browse">${icon("search")} Find a resource</a></div></div>
            <div class="panel"><div class="panel-head"><h3>Your listings</h3><a class="small" href="#/dashboard/listings">Manage</a></div>
              ${myListings.map((l) => `<div class="row-item pool-${poolOf(l)}"><div class="ri-icon">${icon(catOf(l).icon)}</div><div class="ri-main"><b>${esc(l.title)}</b><span>${listingStatus(l) === "live" ? "Live" : "Paused"} · ${reviewsFor(l.id).length} reviews</span></div></div>`).join("")}</div>
          </div>
        </div>`;
    } else if (tab === "requests") {
      const hist = incoming.filter((b) => b.status !== "pending").sort((a, b) => b.date.localeCompare(a.date));
      body = `<div class="panel"><div class="panel-head"><h3>Awaiting your approval (${pendingIn.length})</h3><span class="small muted">Requests for your "Request to book" listings</span></div>
          ${pendingIn.map((b) => bookingRow(b, "in")).join("") || '<div class="panel-body muted">No pending requests.</div>'}</div>
        <div class="panel"><div class="panel-head"><h3>History</h3></div>${hist.map((b) => bookingRow(b, "in")).join("") || '<div class="panel-body muted">No past exchanges.</div>'}</div>`;
    } else if (tab === "bookings") {
      const act = outgoing.filter((b) => ["pending", "confirmed"].includes(b.status)).sort((a, b) => a.date.localeCompare(b.date));
      const past = outgoing.filter((b) => !["pending", "confirmed"].includes(b.status)).sort((a, b) => b.date.localeCompare(a.date));
      body = `<div class="note" style="margin:0 0 20px">${icon("info")}<span>Demo tip: use <b>Simulate approval</b> and <b>Mark completed</b> to walk through the full exchange and rating flow.</span></div>
        <div class="panel"><div class="panel-head"><h3>Active (${act.length})</h3><a class="btn sm" href="#/browse">${icon("search")} Find more</a></div>${act.map((b) => bookingRow(b, "out")).join("") || '<div class="panel-body muted">No active bookings.</div>'}</div>
        <div class="panel"><div class="panel-head"><h3>Past</h3></div>${past.map((b) => bookingRow(b, "out")).join("") || '<div class="panel-body muted">Nothing yet.</div>'}</div>`;
    } else if (tab === "listings") {
      body = `<div class="panel"><div class="panel-head"><h3>Your resources (${myListings.length})</h3><a class="btn sm" href="#/new">${icon("plus")} New listing</a></div>
        ${myListings.map((l) => {
          const st = listingStatus(l), times = incoming.filter((b) => b.listingId === l.id && b.status === "completed").length + l.id.length % 5 + 3;
          return `<div class="row-item pool-${poolOf(l)}"><div class="ri-icon">${icon(catOf(l).icon)}</div>
            <div class="ri-main"><b><a href="#/listing/${l.id}" style="color:inherit">${esc(l.title)}</a></b><span>${esc(catOf(l).label)} · ${daysLabel(l.days)} · ${l.booking === "instant" ? "Instant book" : "Request to book"} · ${l.credits} credits/${esc(l.unit)}</span>
            <div class="small muted">Lent ${times} times · ${reviewsFor(l.id).length} reviews ${reviewsFor(l.id).length ? "· " + avgRating(l.id).toFixed(1) + "★" : ""}</div></div>
            <div class="ri-actions">${st === "live" ? '<span class="badge ok">Live</span>' : '<span class="badge neutral">Paused</span>'}
              <button class="btn sm ghost" data-action="toggle-listing" data-id="${l.id}">${st === "live" ? "Pause" : "Resume"}</button>
              <a class="btn sm slate" href="#/listing/${l.id}">View</a></div></div>`; }).join("")}</div>`;
    } else if (tab === "credits") {
      let run = 0;
      const rows = state.ledger.map((e) => { run += e.amount; return { ...e, run }; }).reverse();
      const earned = state.ledger.filter((e) => e.amount > 0).reduce((s, e) => s + e.amount, 0);
      const spent = -state.ledger.filter((e) => e.amount < 0).reduce((s, e) => s + e.amount, 0);
      body = `<div class="kpis">
          <div class="kpi" style="--kc:var(--yellow)"><span>Balance</span><b>${balance()}</b><small>credits</small></div>
          <div class="kpi" style="--kc:var(--green)"><span>Earned</span><b>${earned}</b><small>incl. 100 welcome credits</small></div>
          <div class="kpi"><span>Spent</span><b>${spent}</b><small>on borrowed resources</small></div>
          <div class="kpi" style="--kc:var(--navy)"><span>Lend:borrow ratio</span><b>${spent ? (earned - 100) / spent >= 1 ? "Net lender" : "Net borrower" : "-"}</b><small>keeps the exchange balanced</small></div>
        </div>
        <div class="two-col">
          <div class="panel"><div class="panel-head"><h3>Credit ledger</h3><button class="btn sm ghost" data-action="export">${icon("file")} Export for grant report</button></div>
            <div class="table-wrap"><table class="tbl"><thead><tr><th>Date</th><th>Description</th><th style="text-align:right">Credits</th><th style="text-align:right">Balance</th></tr></thead><tbody>
            ${rows.map((e) => `<tr><td>${fmtDate(e.date, false)}</td><td>${esc(e.desc)}</td><td style="text-align:right" class="${e.amount > 0 ? "amt-pos" : "amt-neg"}">${e.amount > 0 ? "+" : ""}${e.amount}</td><td style="text-align:right">${e.run}</td></tr>`).join("")}
            </tbody></table></div></div>
          <div class="panel"><div class="panel-head"><h3>How credits work</h3></div><div class="panel-body small">
            <p><b>Earn</b> credits every time another member borrows your resource. The owner sets the rate per unit.</p>
            <p><b>Spend</b> credits to borrow. Instant bookings are deducted straight away, and requests once they're approved.</p>
            <p><b>Corporate gifts</b> cost 0 credits. Partners donate capacity for charities only.</p>
            <p><b>Closed loop:</b> credits can't be bought, sold or cashed out, so no money changes hands between charities.</p>
            <p class="muted" style="margin:0">Every new member starts with 100 welcome credits.</p></div></div>
        </div>`;
    }

    return {
      html: `
      <section class="dash-head"><div class="wrap">
        <div class="dash-org">${avatar(me())}<div><h1>${esc(me().name)}</h1><span class="muted">${esc(me().focus)} · ${esc(me().area)} · <span style="color:#7FD6A9">${icon("shield")} Verified member</span></span></div></div>
        <nav class="tabs">${tabs.map(([k, label, n]) => `<a href="#/dashboard/${k}" class="${tab === k ? "active" : ""}">${label}${n ? `<span class="count">${n}</span>` : ""}</a>`).join("")}</nav>
      </div></section>
      <div class="wrap dash-body">${body}</div>`,
    };
  }

  function openRating(b, side) {
    const l = getListing(b.listingId), other = getOrg(side === "out" ? l.orgId : b.by);
    const tags = side === "out" ? ["As described", "On time", "Clean", "Great communication", "Above and beyond"] : ["Returned on time", "Returned clean", "Followed house rules", "Great communication"];
    let val = 5;
    openModal(`Rate ${esc(other.name)}`,
      `<p class="small muted">${side === "out" ? "How was borrowing" : "How was lending"} <b>${esc(l.title)}</b> on ${fmtDate(b.date)}? Your rating feeds their public trust score.</p>
       <div class="star-input" id="star-input">${[1, 2, 3, 4, 5].map((i) => `<button type="button" data-v="${i}" class="on" aria-label="${i} stars">${icon("star")}</button>`).join("")}</div>
       <div class="label" style="margin-bottom:8px">What went well?</div>
       <div class="chips" id="tag-input" style="margin-bottom:18px">${tags.map((t) => `<button type="button" class="chip">${t}</button>`).join("")}</div>
       <div class="field"><label for="rate-text">Comment (visible to members)</label><textarea id="rate-text" placeholder="Share anything that would help other members"></textarea></div>`,
      `<button class="btn ghost" data-close>Cancel</button><button class="btn" id="rate-submit">Submit rating</button>`,
      (el) => {
        el.querySelector("#star-input").addEventListener("click", (e) => {
          const btn = e.target.closest("[data-v]"); if (!btn) return;
          val = Number(btn.dataset.v);
          el.querySelectorAll("#star-input button").forEach((x) => x.classList.toggle("on", Number(x.dataset.v) <= val));
        });
        el.querySelector("#tag-input").addEventListener("click", (e) => e.target.closest(".chip")?.classList.toggle("on"));
        el.querySelector("#rate-submit").addEventListener("click", () => {
          const picked = [...el.querySelectorAll("#tag-input .chip.on")].map((x) => x.textContent);
          if (side === "out") {
            b.ratedByBorrower = true;
            state.extraReviews.push({ listingId: l.id, from: CURRENT_ORG_ID, stars: val, date: todayISO(), text: el.querySelector("#rate-text").value || "Smooth exchange, thank you!", tags: picked });
          } else b.ratedBySupplier = true;
          save(); closeModal(); render();
          toast(`Thanks! Your ${val}-star rating for ${esc(other.name)} has been recorded.`);
        });
      });
  }

  // ---------------------------------------------------------------- NEW LISTING
  function viewNewListing() {
    if (isAdmin()) return { html: `<div class="wrap section"><div class="empty">${icon("info")}<h3>Switch to a charity member to list a resource</h3></div></div>` };
    return {
      html: `
      <div class="page-head"><div class="wrap"><div class="crumbs"><a href="#/">Home</a> / <a href="#/dashboard">Dashboard</a> / New listing</div>
        <h1>List a <strong style="font-weight:700;color:var(--maroon)">resource</strong></h1><p class="muted" style="margin:0">Takes about two minutes. Your listing goes live straight away because ${esc(me().name)} is already verified.</p></div></div>
      <div class="wrap"><div class="form-layout">
        <form class="form-card" id="new-form">
          <fieldset><legend><span class="n">1</span> What are you sharing?</legend>
            <div class="grid-2">
              <div class="field"><label>Resource pool</label><select name="pool" id="n-pool">${Object.values(POOLS).map((p) => `<option value="${p.id}">${p.label}</option>`).join("")}</select></div>
              <div class="field"><label>Category <span class="hint">(standardised for matching)</span></label><select name="cat" id="n-cat"></select></div>
            </div>
            <div class="field"><label for="n-title">Listing title</label><input type="text" id="n-title" name="title" required placeholder="e.g. 14-seater van, Tuesday afternoons"></div>
            <div class="field"><label for="n-desc">Description</label><textarea id="n-desc" name="desc" required placeholder="What is it, what condition is it in, and what is it good for?"></textarea></div>
            <div class="grid-2">
              <div class="field"><label for="n-qty">Capacity / quantity</label><input type="text" id="n-qty" name="qty" placeholder="e.g. 30 pax, 6 units" required></div>
              <div class="field"><label for="n-value">Est. market value (S$ per unit)</label><input type="number" id="n-value" name="value" min="0" value="100"><span class="hint">Used to report savings to members and funders</span></div>
            </div>
          </fieldset>
          <fieldset><legend><span class="n">2</span> When is it available?</legend>
            <div class="field"><span class="label">Recurring days</span>
              <div class="day-picks">${[1, 2, 3, 4, 5, 6, 0].map((d) => `<label><input type="checkbox" name="days" value="${d}" ${d === 2 || d === 4 ? "checked" : ""}><span>${DAYS[d]}</span></label>`).join("")}</div></div>
            <div class="field"><label for="n-time">Time window</label><input type="text" id="n-time" name="time" value="2:00pm - 6:00pm"></div>
          </fieldset>
          <fieldset><legend><span class="n">3</span> How should booking work?</legend>
            <div class="radio-cards" style="margin-bottom:16px">
              <label><input type="radio" name="booking" value="instant"><span><b>${icon("zap")} Instant Book</b>Best for low-value, everyday items. Bookings confirm automatically.</span></label>
              <label><input type="radio" name="booking" value="request" checked><span><b>${icon("send")} Request to Book</b>You approve each request. Best for vehicles, kitchens and halls.</span></label>
            </div>
            <div class="grid-2">
              <div class="field"><label for="n-credits">Credits per unit</label><input type="number" id="n-credits" name="credits" min="0" max="200" value="20"></div>
              <div class="field"><label for="n-unit">Unit</label><select id="n-unit" name="unit"><option>session</option><option>half-day</option><option>day</option><option>hour</option><option>week</option></select></div>
            </div>
            <div class="field"><label for="n-rules">House rules <span class="hint">(one per line, optional)</span></label><textarea id="n-rules" name="rules" style="min-height:70px" placeholder="Return with a full tank"></textarea></div>
          </fieldset>
          <div style="display:flex;gap:12px;justify-content:flex-end"><a class="btn ghost" href="#/dashboard/listings">Cancel</a><button class="btn" type="submit">Publish listing</button></div>
        </form>
        <aside class="side-card">
          <h3>${icon("info")} Tips for a great listing</h3>
          <ul><li>Be specific about times. "Tue &amp; Thu, 1-6pm" gets more bookings than "flexible".</li>
            <li>Use Instant Book for items under about S$100 in value. It removes friction for everyone.</li>
            <li>Set credits close to the value you'd want back. Most members charge 5-40 per use.</li>
            <li>Add house rules so expectations are clear before anyone books.</li></ul>
          <div class="note ok">${icon("shield")}<span>Members who borrow your resource will rate the experience, and you'll rate them back.</span></div>
        </aside>
      </div></div>`,
      mount() {
        const pool = document.getElementById("n-pool"), cat = document.getElementById("n-cat");
        const fill = () => { cat.innerHTML = CATEGORIES.filter((c) => c.pool === pool.value).map((c) => `<option value="${c.id}">${c.label}</option>`).join(""); };
        pool.addEventListener("change", fill); fill();
        document.getElementById("new-form").addEventListener("submit", (e) => {
          e.preventDefault();
          const f = new FormData(e.target);
          const days = f.getAll("days").map(Number);
          if (!days.length) { toast("Pick at least one available day."); return; }
          const l = {
            id: "N" + Date.now(), orgId: CURRENT_ORG_ID, cat: f.get("cat"), title: f.get("title").trim(), desc: f.get("desc").trim(),
            days, time: f.get("time"), booking: f.get("booking"), credits: Number(f.get("credits")) || 0, unit: f.get("unit"),
            value: Number(f.get("value")) || 0, qty: f.get("qty"), rules: f.get("rules").split("\n").map((s) => s.trim()).filter(Boolean),
          };
          state.extraListings.push(l);
          state.myListingStatus[l.id] = "live";
          save();
          go("#/listing/" + l.id);
          toast("Your listing is live and searchable by all members.");
        });
      },
    };
  }

  // ---------------------------------------------------------------- JOIN
  let joinDone = false;
  function viewJoin() {
    if (joinDone) {
      joinDone = false;
      return { html: `<div class="wrap section"><div class="form-card success-box" style="max-width:640px;margin:0 auto">
        <div class="big-check">${icon("check")}</div><h2>Application <strong>received</strong></h2>
        <p class="muted">Thank you. TMT's team will verify your registration documents, usually within 3 working days.</p>
        <div class="timeline">
          <div><span class="dot done">${icon("check")}</span> Application submitted</div>
          <div><span class="dot now">2</span> TMT verifies your charity registration & documents</div>
          <div><span class="dot">3</span> Onboarding call &amp; 100 welcome credits</div>
          <div><span class="dot">4</span> List your first resource and start exchanging</div>
        </div>
        <p class="small muted">Demo tip: switch to <b>TMT Admin</b> in the top bar to see your application in the verification queue.</p>
        <a class="btn" href="#/">Back to home</a></div></div>` };
    }
    return {
      html: `
      <div class="page-head"><div class="wrap"><div class="crumbs"><a href="#/">Home</a> / Join</div>
        <h1>Join the <strong style="font-weight:700;color:var(--maroon)">pilot</strong></h1><p class="muted" style="margin:0">During the pilot, membership is open to registered charities in Singapore that work on community well-being.</p></div></div>
      <div class="wrap"><div class="form-layout">
        <form class="form-card" id="join-form">
          <fieldset><legend><span class="n">1</span> Organisation details</legend>
            <div class="field"><label>Registered organisation name</label><input type="text" name="name" required placeholder="As registered with the Commissioner of Charities"></div>
            <div class="grid-2">
              <div class="field"><label>UEN</label><input type="text" name="uen" required placeholder="e.g. T22SS0112K"></div>
              <div class="field"><label>Charity registration no.</label><input type="text" name="charityNo" required placeholder="e.g. 02718"></div>
              <div class="field"><label>IPC status</label><select name="ipc"><option value="yes">Yes, Institution of a Public Character</option><option value="no">No</option></select></div>
              <div class="field"><label>Primary focus</label><select name="sector"><option>Seniors</option><option>Children &amp; youth</option><option>Families &amp; caregivers</option><option>Persons with disabilities</option><option>Mental well-being</option><option>Food support</option><option>Community resilience</option></select></div>
            </div>
            <div class="field"><label>Main premises (postal code)</label><input type="text" name="postal" placeholder="Used to calculate distances to resources" required></div>
          </fieldset>
          <fieldset><legend><span class="n">2</span> Point of contact</legend>
            <div class="grid-2">
              <div class="field"><label>Full name</label><input type="text" name="contact" required></div>
              <div class="field"><label>Designation</label><input type="text" name="role" placeholder="e.g. Operations Manager"></div>
              <div class="field"><label>Work email</label><input type="email" name="email" required></div>
              <div class="field"><label>Phone</label><input type="tel" name="phone"></div>
            </div>
          </fieldset>
          <fieldset><legend><span class="n">3</span> Verification documents</legend>
            <label class="upload" id="upload">${icon("upload", "")}<div style="margin-top:6px"><b>Click to attach</b> your charity registration certificate and IPC letter (PDF)</div><input type="file" multiple accept=".pdf" hidden id="file-in"></label>
            <div id="file-list" class="small" style="margin-top:8px"></div>
          </fieldset>
          <label class="check"><input type="checkbox" required> I confirm the information is accurate and agree to the Community Guidelines, including two-way ratings after every exchange.</label>
          <div style="display:flex;justify-content:flex-end;margin-top:16px"><button class="btn" type="submit">Submit for verification</button></div>
        </form>
        <aside class="side-card">
          <h3>Who can join the pilot?</h3>
          <ul><li>Registered charities under the Charities Act</li><li>Institutions of a Public Character (IPCs)</li><li>Focused on community well-being: seniors, youth, families, caregivers, persons with disabilities, mental health</li></ul>
          <h3>Not yet open</h3>
          <ul class="muted"><li>Informal ground-up groups and interest groups</li><li>Individuals</li></ul>
          <p class="small">Corporate partners join by invitation. Contact the TMT team at <b>partners@example.sg</b>.</p>
          <div class="note">${icon("shield")}<span>Verification happens once. After that, members deal with each other directly and peer ratings keep everyone accountable.</span></div>
        </aside>
      </div></div>`,
      mount() {
        const fileIn = document.getElementById("file-in");
        fileIn.addEventListener("change", () => {
          document.getElementById("file-list").innerHTML = [...fileIn.files].map((x) => `<div>${icon("file")} ${esc(x.name)}</div>`).join("");
        });
        document.getElementById("join-form").addEventListener("submit", (e) => {
          e.preventDefault();
          const f = new FormData(e.target);
          const files = [...fileIn.files].map((x) => x.name);
          state.pendingOrgs.push({
            id: "p" + Date.now(), name: f.get("name"), uen: f.get("uen"), charityNo: f.get("charityNo"), ipc: f.get("ipc") === "yes",
            sector: f.get("sector"), area: "Postal " + f.get("postal"), contact: f.get("contact"), email: f.get("email"), submitted: todayISO(),
            docs: files.length ? files : ["(no documents attached)"],
          });
          save(); joinDone = true; render();
        });
      },
    };
  }

  // ---------------------------------------------------------------- ADMIN
  function viewAdmin() {
    if (!isAdmin()) return { html: `<div class="wrap section"><div class="empty">${icon("shield")}<h3>TMT Admin console</h3><p>This area is for TMT staff. In the demo, switch your role in the top bar.</p><button class="btn" data-action="as-admin">View as TMT Admin</button></div></div>` };
    const s = PLATFORM_STATS, maxPool = Math.max(...Object.values(s.byPool)), maxM = Math.max(...s.monthly.map((x) => x.n));
    const recent = state.bookings.slice().sort((a, b) => b.created.localeCompare(a.created)).slice(0, 8);
    const approved = state.approvedOrgs || [];
    const openFlags = state.flags.filter((f) => f.open);
    return {
      html: `
      <section class="dash-head"><div class="wrap" style="padding-bottom:28px">
        <span class="eyebrow" style="color:var(--yellow)">TMT Admin console</span><h1>Platform overview</h1>
        <span class="muted">Verify members, keep an eye on trust and track impact. The goal is light-touch oversight: members deal with each other directly.</span>
      </div></section>
      <div class="wrap dash-body">
        <div class="kpis">
          <div class="kpi"><span>Verified members</span><b>${s.members + approved.length}</b><small>${state.pendingOrgs.length} awaiting verification</small></div>
          <div class="kpi" style="--kc:var(--navy)"><span>Live listings</span><b>${s.listings + state.extraListings.length}</b><small>across 4 pools</small></div>
          <div class="kpi" style="--kc:var(--yellow)"><span>Exchanges completed</span><b>${s.exchanges}</b><small>+${s.monthly.at(-1).n} this month</small></div>
          <div class="kpi" style="--kc:var(--green)"><span>Est. sector savings</span><b>${money(s.savings)}</b><small>${s.hours.toLocaleString()} volunteer hours shared</small></div>
        </div>
        <div class="two-col">
          <div>
            <div class="panel"><div class="panel-head"><h3>Verification queue (${state.pendingOrgs.length})</h3><span class="small muted">Target turnaround: 3 working days</span></div>
              ${state.pendingOrgs.map((p) => `<div class="row-item"><div class="avatar sm" style="background:var(--slate-2)">${esc(p.name.split(" ").map((w) => w[0]).slice(0, 2).join(""))}</div>
                <div class="ri-main"><b>${esc(p.name)}</b><span>UEN ${esc(p.uen)} · Charity no. ${esc(p.charityNo)} · ${p.ipc ? "IPC" : "Non-IPC"} · ${esc(p.sector)} · ${esc(p.area)}</span>
                  <div class="small" style="margin-top:4px">${esc(p.contact)} · ${esc(p.email)} · submitted ${fmtDate(p.submitted, false)}</div>
                  <div class="small muted" style="margin-top:4px;display:flex;gap:10px;flex-wrap:wrap">${p.docs.map((d) => `<span>${icon("file")} ${esc(d)}</span>`).join("")}</div>
                  <div class="small" style="margin-top:6px"><a href="#" data-action="noop">Check Charity Portal registry ↗</a></div></div>
                <div class="ri-actions"><button class="btn sm green" data-action="verify" data-id="${p.id}">${icon("check")} Verify</button><button class="btn sm ghost" data-action="reject" data-id="${p.id}">Reject</button></div></div>`).join("") || '<div class="panel-body muted">Queue is clear.</div>'}</div>

            <div class="panel"><div class="panel-head"><h3>Flagged for review (${openFlags.length})</h3></div>
              ${openFlags.map((f) => { const l = getListing(f.listingId); return `<div class="row-item pool-${poolOf(l)}"><div class="ri-icon">${icon("flag")}</div>
                <div class="ri-main"><b><a href="#/listing/${l.id}" style="color:inherit">${esc(l.title)}</a></b><span>Reported by ${esc(getOrg(f.by).name)} · ${fmtDate(f.date, false)}</span><div class="small" style="margin-top:4px">"${esc(f.reason)}"</div></div>
                <div class="ri-actions"><button class="btn sm slate" data-action="resolve" data-id="${f.id}">Mark resolved</button></div></div>`; }).join("") || '<div class="panel-body muted">No open flags.</div>'}</div>

            <div class="panel"><div class="panel-head"><h3>Recent exchanges</h3></div><div class="table-wrap"><table class="tbl">
              <thead><tr><th>Resource</th><th>Borrower</th><th>Lender</th><th>Date</th><th>Status</th></tr></thead><tbody>
              ${recent.map((b) => { const l = getListing(b.listingId); return `<tr><td><a href="#/listing/${l.id}">${esc(l.title)}</a></td><td>${esc(getOrg(b.by).name)}</td><td>${esc(getOrg(l.orgId).name)}</td><td>${fmtDate(b.date, false)}</td><td>${statusBadge(b.status)}</td></tr>`; }).join("")}
              </tbody></table></div></div>
          </div>
          <div>
            <div class="panel"><div class="panel-head"><h3>Exchanges by pool</h3></div><div class="panel-body"><div class="bars">
              ${Object.entries(s.byPool).map(([k, v]) => `<div class="bar-row pool-${k}"><span>${POOLS[k].short}</span><div class="bar-track"><div class="bar-fill" style="width:${(v / maxPool) * 100}%"></div></div><b>${v}</b></div>`).join("")}
            </div></div></div>
            <div class="panel"><div class="panel-head"><h3>Monthly exchanges</h3><span class="small muted">Pilot launched Mar 2026</span></div><div class="panel-body"><div class="bars">
              ${s.monthly.map((m) => `<div class="bar-row pool-space"><span>${m.m} 2026</span><div class="bar-track"><div class="bar-fill" style="width:${(m.n / maxM) * 100}%"></div></div><b>${m.n}</b></div>`).join("")}
            </div></div></div>
            <div class="panel"><div class="panel-head"><h3>Members</h3><span class="small muted">by trust score</span></div>
              ${approved.map((o) => `<div class="row-item">${avatar(o, true)}<div class="ri-main"><b>${esc(o.name)}</b><span>Just verified · ${esc(o.area)}</span></div><span class="badge ok">New</span></div>`).join("")}
              ${ORGS.slice().sort((a, b) => b.trust - a.trust).map((o) => `<div class="row-item">${avatar(o, true)}<div class="ri-main"><b><a href="#/org/${o.id}" style="color:inherit">${esc(o.name)}</a></b><span>${o.type === "corporate" ? "Corporate partner" : esc(o.focus)} · ${o.exchanges} exchanges</span></div><b style="color:var(--maroon)">${o.trust.toFixed(1)}</b></div>`).join("")}
            </div>
          </div>
        </div>
      </div>`,
    };
  }

  // ---------------------------------------------------------------- global actions
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-action]");
    if (!el) return;
    const { action, id } = el.dataset;
    const booking = () => state.bookings.find((b) => b.id === id);
    switch (action) {
      case "menu": document.getElementById("nav").classList.toggle("open"); return;
      case "reset": resetState(); render(); toast("Demo data reset."); return;
      case "noop": e.preventDefault(); toast("In the real platform this would open the Charity Portal record."); return;
      case "as-admin": state.role = "admin"; save(); render(); return;
      case "partner": toast("Email the TMT partnerships team at partners@example.sg"); return;
      case "approve": { const b = booking(); b.status = "confirmed"; save(); render(); toast(`Approved. ${esc(getOrg(b.by).name)} has been notified.`); return; }
      case "decline": { const b = booking(); b.status = "declined"; save(); render(); toast("Request declined. The borrower has been notified."); return; }
      case "sim-approve": {
        const b = booking(), l = getListing(b.listingId); b.status = "confirmed";
        if (l.credits) state.ledger.push({ date: todayISO(), desc: `${l.title} - ${getOrg(l.orgId).name}`, amount: -l.credits * b.units });
        save(); render(); toast(`${esc(getOrg(l.orgId).name)} approved your request.`); return;
      }
      case "cancel": {
        const b = booking(), l = getListing(b.listingId);
        if (b.status === "confirmed" && l.credits) state.ledger.push({ date: todayISO(), desc: `Refund: cancelled ${l.title}`, amount: l.credits * b.units });
        b.status = "cancelled"; save(); render(); toast("Booking cancelled."); return;
      }
      case "complete": {
        const b = booking(), l = getListing(b.listingId); b.status = "completed";
        if (isMine(l) && l.credits) state.ledger.push({ date: todayISO(), desc: `Lent ${l.title} - ${getOrg(b.by).name}`, amount: l.credits * b.units });
        save(); render(); openRating(b, isMine(l) ? "in" : "out"); return;
      }
      case "rate": openRating(booking(), el.dataset.side); return;
      case "toggle-listing": state.myListingStatus[id] = listingStatus(getListing(id)) === "live" ? "paused" : "live"; save(); render(); toast(state.myListingStatus[id] === "live" ? "Listing is live again." : "Listing paused and hidden from search."); return;
      case "export": toast("Mock: a CSV of your ledger with estimated values would download here."); return;
      case "verify": {
        const p = state.pendingOrgs.find((x) => x.id === id);
        state.pendingOrgs = state.pendingOrgs.filter((x) => x.id !== id);
        state.approvedOrgs = (state.approvedOrgs || []).concat([{ id: p.id, name: p.name, short: p.name.split(" ").map((w) => w[0]).slice(0, 2).join(""), area: p.area, color: "#1E8A5B", trust: 0, exchanges: 0 }]);
        save(); render(); toast(`${esc(p.name)} verified. A welcome email with 100 credits has been sent.`); return;
      }
      case "reject": { const p = state.pendingOrgs.find((x) => x.id === id); state.pendingOrgs = state.pendingOrgs.filter((x) => x.id !== id); save(); render(); toast(`${esc(p.name)} rejected. The applicant will be told why.`); return; }
      case "resolve": state.flags.find((f) => f.id === id).open = false; save(); render(); toast("Flag resolved."); return;
      case "flag": state.flags.push({ id: "f" + Date.now(), listingId: id, reason: "Flagged by TMT admin for review.", by: CURRENT_ORG_ID, date: todayISO(), open: true }); save(); toast("Listing flagged and added to the review queue."); return;
    }
  });

  document.addEventListener("change", (e) => {
    if (e.target.id === "role-switch") {
      state.role = e.target.value; save();
      const { parts } = parseRoute();
      if (state.role === "admin" && ["dashboard", "new"].includes(parts[0])) go("#/admin");
      else if (state.role === "charity" && parts[0] === "admin") go("#/dashboard");
      else render();
      toast(state.role === "admin" ? "Now viewing as TMT Admin." : `Now viewing as ${esc(me().name)}.`);
    }
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  // Intercept in-app links so navigation never depends on the frame's hash support.
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#/"]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    document.getElementById("nav")?.classList.remove("open");
    go(a.getAttribute("href"));
  });
  window.addEventListener("popstate", () => { currentHash = location.hash.startsWith("#/") ? location.hash : "#/"; render(); });
  render();
})();
