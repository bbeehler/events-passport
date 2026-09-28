// Shared helpers for all Event Passport pages
(function () {
  const C = window.PASSPORT_CONFIG;
  const sb = window.supabase.createClient(C.SUPABASE_URL, C.SUPABASE_KEY, {
    auth: { persistSession: true, storageKey: "passport-admin-auth" },
  });

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const logoUrl = (path) =>
    path ? `${C.SUPABASE_URL}/storage/v1/object/public/logos/${path.split("/").map(encodeURIComponent).join("/")}` : "";

  const initials = (name) =>
    String(name || "?").split(/\s+/).map((w) => (w.match(/[\p{L}\p{N}]/u) || [""])[0]).filter(Boolean).slice(0, 2).join("").toUpperCase() || "?";

  function applyTheme(ev) {
    const r = document.documentElement.style;
    r.setProperty("--brand", (ev && ev.primary_color) || C.DEFAULT_BRAND);
    r.setProperty("--accent", (ev && ev.accent_color) || C.DEFAULT_ACCENT);
  }

  function toast(msg, kind = "") {
    let t = document.getElementById("toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "toast";
      t.setAttribute("role", "status");
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.className = "toast show " + kind;
    clearTimeout(t._h);
    t._h = setTimeout(() => (t.className = "toast " + kind), 3200);
  }

  // Attendee app URL (index.html beside this page) — used for join & booth QR codes
  function appBaseUrl() {
    try {
      const o = localStorage.getItem("passport-app-url");
      if (o) return o;
    } catch (e) {}
    return new URL("index.html", location.href).href.split("?")[0];
  }
  const joinUrl = (slug) => `${appBaseUrl()}?e=${encodeURIComponent(slug)}`;
  const boothUrl = (slug, code) => `${joinUrl(slug)}&b=${encodeURIComponent(code)}`;

  // QR as SVG markup (qrcode-generator)
  function qrSvg(text, cell = 6) {
    const q = qrcode(0, "M");
    q.addData(text);
    q.make();
    return q.createSvgTag({ cellSize: cell, margin: 2, scalable: true });
  }
  function qrDataUrl(text, cell = 10) {
    const q = qrcode(0, "M");
    q.addData(text);
    q.make();
    return q.createDataURL(cell, 4);
  }

  function fmtDate(d) {
    if (!d) return "";
    return new Date(d.length === 10 ? d + "T12:00:00" : d).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" });
  }

  // AIA Canada logo: absolute URL (works inside print windows too) and an <img> that removes itself if the file is missing
  const orgLogoUrl = C.ORG_LOGO ? new URL(C.ORG_LOGO, location.href).href : "";
  const orgLogoTag = (cls = "", style = "") =>
    orgLogoUrl ? `<img class="${cls}" style="${style}" src="${orgLogoUrl}" alt="${esc(C.ORG_NAME)}" onerror="this.remove()">` : "";

  window.P = { sb, esc, logoUrl, initials, applyTheme, toast, appBaseUrl, joinUrl, boothUrl, qrSvg, qrDataUrl, fmtDate, orgLogoUrl, orgLogoTag, C };
})();
