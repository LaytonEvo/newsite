// Evolution Golf test site: browser behaviour. Everything stays in this browser:
// the basket lives in localStorage, forms send nothing, and checkout is simulated.
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const gbp = (n, pence = false) => "£" + n.toLocaleString("en-GB", { minimumFractionDigits: pence || n % 1 ? 2 : 0, maximumFractionDigits: 2 });
  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* private mode: basket lasts for this page only */ } },
  };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- cookie banner: remember the choice ---------- */
  const cookie = $("#cookie");
  if (cookie) {
    if (store.get("eg-cookies", null)) cookie.remove();
    cookie.addEventListener("click", (e) => {
      const b = e.target.closest("[data-cookie]");
      if (b) store.set("eg-cookies", { choice: b.dataset.cookie, at: Date.now() });
    });
  }

  /* ---------- links to pages that aren't in this round ---------- */
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href="#"], a[href^="/pages/"]');
    if (!a) return;
    e.preventDefault();
    let name = (a.getAttribute("aria-label") || a.querySelector("strong")?.textContent || a.textContent || "This page").trim().replace(/\s+/g, " ");
    const href = a.getAttribute("href");
    if (href.startsWith("/pages/build-your-clubs")) {
      const u = new URL(href, location.origin);
      const bits = [u.searchParams.get("type")?.replace(/-/g, " "), u.searchParams.get("hand") === "left" ? "left-handed" : null].filter(Boolean);
      name = `The club builder${bits.length ? ` (${bits.join(", ")})` : ""}`;
    }
    location.href = "/not-in-preview/?page=" + encodeURIComponent(name);
  });
  const pn = $("[data-page-name]");
  const asked = new URLSearchParams(location.search).get("page");
  if (pn && asked) pn.textContent = `“${asked.slice(0, 60)}”`;

  /* ---------- forms never send anything ---------- */
  $$("form:not([data-finder]):not([data-checkout-form])").forEach((f) => f.addEventListener("submit", (e) => {
    e.preventDefault();
    let note = $(".v-formnote", f);
    if (!note) { note = document.createElement("p"); note.className = "v-formnote"; note.setAttribute("role", "status"); f.append(note); }
    note.textContent = "Test site: nothing was sent.";
  }));

  /* ---------- basket ---------- */
  const basket = () => store.get("eg-basket", []);
  const saveBasket = (items) => { store.set("eg-basket", items); badge(); };
  const badge = () => {
    const n = basket().reduce((t, i) => t + i.qty, 0);
    $$("[data-basket]").forEach((a) => a.setAttribute("aria-label", `Basket, ${n} item${n === 1 ? "" : "s"}`));
    $$("[data-basket-n]").forEach((s) => { s.hidden = !n; s.textContent = n; });
  };
  badge();

  /* ---------- product page ---------- */
  const pdp = $("[data-product]");
  if (pdp) {
    const current = () => JSON.parse($("[data-variant]:checked")?.dataset.variant || "null");
    const word = { in: "In stock", order: "Available to order", out: "Out of stock" };
    const update = () => {
      const v = current(); if (!v) return;
      $("[data-price]").textContent = gbp(v.price);
      const mem = $("[data-member]"); if (mem) mem.textContent = gbp(v.member, true);
      const thr = $("[data-third]"); if (thr) thr.textContent = gbp(v.third, true);
      const net = $("[data-member-net]"); if (net && v.net) net.textContent = v.net;
      const fin = $("[data-fin]"); if (fin) fin.hidden = !v.fin;
      $$(".v-opt__card").forEach((c) => c.classList.toggle("is-on", $("input", c).checked));
      const out = v.stock === "out";
      $$("[data-add]").forEach((b) => {
        if (b.dataset.add === "collect") { b.hidden = out; return; }
        b.textContent = out ? "Email me when it’s back" : "Add to basket";
      });
      const sb = $("[data-s-battery]"); if (sb) sb.textContent = v.battery;
      const sl = $("[data-s-line]"); if (sl) sl.textContent = `${gbp(v.price)} · ${word[v.stock]}`;
    };
    $$("[data-variant]").forEach((r) => r.addEventListener("change", update));
    $$(".v-gift__opt input").forEach((r) => r.addEventListener("change", () => {
      $$(".v-gift__opt").forEach((o) => o.classList.toggle("is-on", $("input", o).checked));
      const sg = $("[data-s-gift]"); if (sg) sg.textContent = `Free accessory: ${r.value}`;
    }));
    $$("[data-thumb]").forEach((t) => t.addEventListener("click", () => {
      $("[data-main-img]").src = t.dataset.thumb;
      $$("[data-thumb]").forEach((o) => o.removeAttribute("aria-current"));
      t.setAttribute("aria-current", "true");
    }));
    const msg = $("[data-added]");
    $$("[data-add]").forEach((b) => b.addEventListener("click", () => {
      const v = current(); if (!v) return;
      if (v.stock === "out") {
        msg.hidden = false;
        msg.innerHTML = "On the real site you’d leave your email here and we’d tell you when this option is back. <strong>Test site: nothing is sent.</strong>";
        return;
      }
      const gift = $(".v-gift__opt input:checked")?.value || null;
      const collect = b.dataset.add === "collect";
      const items = basket();
      const key = `${pdp.dataset.product}|${v.battery}|${gift}|${collect}`;
      const hit = items.find((i) => i.key === key);
      const max = v.max || 3;
      const already = items.filter((i) => i.id === pdp.dataset.product && i.battery === v.battery).reduce((t, i) => t + i.qty, 0);
      msg.hidden = false;
      if (already >= max) {
        msg.innerHTML = `You already have all ${max} we have in stock in your basket. <a href="/basket/">View basket</a>`;
      } else {
        if (hit) hit.qty += 1;
        else items.push({ key, id: pdp.dataset.product, name: pdp.dataset.name, battery: v.battery, holes: v.holes, line: v.line, price: v.price, stock: v.stock, max, gift, collect, image: pdp.dataset.image, href: location.pathname, qty: 1 });
        saveBasket(items);
        const n = already + 1;
        msg.innerHTML = `Added: ${esc(pdp.dataset.name)}, ${esc(v.line || v.battery + " battery")}${collect ? ", click and collect" : ""}${n > 1 ? ` (${n} in your basket)` : ""}. <a href="/basket/">View basket and check out</a>`;
      }
      if (b.closest("[data-sticky]")) {
        b.outerHTML = `<a class="p-btn" href="/basket/">Added ✓ View basket</a>`;
      } else $("a", msg)?.focus({ preventScroll: true });
    }));
    // delivery cut-off: only claim a countdown when dispatch really is today
    const cut = $("[data-cutoff]");
    if (cut) {
      const parts = Object.fromEntries(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" }).formatToParts(new Date()).map((x) => [x.type, x.value]));
      const mins = 13 * 60 - (Number(parts.hour) * 60 + Number(parts.minute));
      if (!["Sat", "Sun"].includes(parts.weekday) && mins > 0) cut.textContent = ` (${Math.floor(mins / 60)}h ${mins % 60}m left today)`;
    }
    update();
  }

  /* ---------- collection: finder, filters, sort ---------- */
  const grid = $("[data-grid]");
  if (grid) {
    const cards = $$("[data-card]", grid);
    const rankStock = { in: 0, order: 1, out: 2 };
    const finder = $("[data-finder]");
    const sheet = $("[data-sheet]"), opener = $("[data-open-filters]");
    const finderOn = () => {
      if (!finder) return [];
      const f = new FormData(finder);
      const need = [];
      ["gps", "dhc", "rem"].forEach((k) => { const v = f.get(k); if (v) need.push(["features", v]); });
      const bat = f.get("bat"); if (bat) need.push(["battery", bat]);
      return need;
    };
    const chosen = () => {
      const sel = {};
      // the sidebar and the phone sheet hold the same options; read whichever was changed last (kept in sync)
      $$("[data-filters]")[0] && $$("input[data-f]:checked", $$("[data-filters]")[0]).forEach((i) => (sel[i.dataset.f] ||= []).push(i.value));
      return sel;
    };
    const apply = () => {
      const sel = chosen(), need = finderOn();
      let n = 0;
      cards.forEach((c) => {
        const ok = Object.entries(sel).every(([k, vals]) => vals.some((v) => c.dataset[k].split("|").includes(v)))
          && need.every(([k, v]) => c.dataset[k].split("|").includes(v))
          && (!$("[data-instock]")?.checked || c.dataset.stock === "in");
        c.hidden = !ok; if (ok) n++;
      });
      $$("[data-count]").forEach((e) => (e.textContent = n));
      $("[data-empty]").hidden = n > 0;
      const active = Object.values(sel).flat().length;
      const fn = $("[data-filter-n]"); if (fn) fn.textContent = active ? ` (${active})` : "";
      // in-stock switch mirrors the Availability "In stock" option; chips list what's applied
      const chips = $("[data-chips]");
      const finderChips = finder ? ["gps", "dhc", "rem", "bat"].map((k) => [k, new FormData(finder).get(k)]).filter(([, v]) => v) : [];
      if (chips) chips.innerHTML = Object.entries(sel).flatMap(([k, vals]) => vals.map((v) => `<button type="button" class="v-chip" data-chip-f="${k}" data-chip-v="${esc(v)}">${esc(v)} <span aria-hidden="true">×</span><span class="sr"> remove filter</span></button>`)).join("")
        + finderChips.map(([k, v]) => `<button type="button" class="v-chip" data-chip-q="${k}">${esc(v)} <span aria-hidden="true">×</span><span class="sr"> remove answer</span></button>`).join("")
        + ($("[data-instock]")?.checked ? `<button type="button" class="v-chip" data-chip-instock>In stock only <span aria-hidden="true">×</span><span class="sr"> remove filter</span></button>` : "");
      if (chips) chips.setAttribute("role", "group");
      const empty = $("[data-empty]");
      if (empty && !n) empty.firstChild.textContent = finderChips.length ? "No trolley matches all of those answers. Remove one of the answers above, or " : "No trolleys match all of those filters. ";
      const go = $("[data-finder-go]");
      if (go) go.textContent = need.length ? `Show ${n} trolley${n === 1 ? "" : "s"}` : `Show all ${cards.length} trolleys`;
      sort();
    };
    const sort = () => {
      const by = $("[data-sort]").value;
      const ss = $("[data-sort-sheet]"); if (ss) ss.value = by;
      const num = (c, k) => parseFloat(c.dataset[k]) || 0;
      const cmp = {
        rec: (a, b) => num(a, "rank") - num(b, "rank"),
        low: (a, b) => num(a, "priceN") - num(b, "priceN"),
        high: (a, b) => num(b, "priceN") - num(a, "priceN"),
        new: (a, b) => num(b, "year") - num(a, "year") || num(a, "rank") - num(b, "rank"),
        rated: (a, b) => num(b, "ratingN") - num(a, "ratingN"),
        light: (a, b) => (num(a, "weightN") || 99) - (num(b, "weightN") || 99),
      }[by];
      // out-of-stock always last; within that, the chosen order
      const bat = finder ? new FormData(finder).get("bat") : null;
      const eff = (c) => {
        if (!bat) return c.dataset.stock;
        const states = c.dataset.batStock.split("|").filter((x) => x.startsWith(bat + ":")).map((x) => x.split(":")[1]);
        return states.sort((x, y) => rankStock[x] - rankStock[y])[0] || c.dataset.stock;
      };
      const rank = by === "rec" ? rankStock : { in: 0, order: 0, out: 1 };
      [...cards].sort((a, b) => rank[eff(a)] - rank[eff(b)] || cmp(a, b)).forEach((c) => grid.append(c));
      const word = { in: "In stock", order: "Available to order", out: "Out of stock" };
      cards.forEach((c) => {
        const line = c.querySelector(".v-card__stock");
        if (!line.dataset.orig) line.dataset.orig = line.textContent;
        line.textContent = bat ? `${bat.replace(" holes", "-hole")} battery: ${word[eff(c)]}` : line.dataset.orig;
      });
    };
    // keep sidebar and sheet checkboxes in step
    document.addEventListener("change", (e) => {
      const i = e.target;
      if (i.matches("input[data-f]")) {
        $$(`input[data-f="${i.dataset.f}"]`).forEach((o) => { if (o.value === i.value) o.checked = i.checked; });
        apply();
      } else if (i.matches("[data-sort-sheet]")) { $("[data-sort]").value = i.value; apply(); }
      else if (i.matches("[data-instock]")) apply();
      else if (i.matches("[data-sort]") || i.closest("[data-finder]")) apply();
    });
    finder?.addEventListener("submit", (e) => { e.preventDefault(); apply(); $("#grid").scrollIntoView({ behavior: "smooth" }); });
    $$("[data-clear]").forEach((b) => b.addEventListener("click", () => {
      $$("input[data-f]").forEach((i) => (i.checked = false));
      const ins = $("[data-instock]"); if (ins) ins.checked = false;
      finder?.reset();
      apply();
      const cnt = $(".v-bar__n"); cnt.tabIndex = -1; if (sheet?.hidden !== false) cnt.focus();
    }));

    // everything except the sheet becomes inert while it's open (the sheet lives inside .p)
    const setInert = (on) => $$(".p > *, body > *").forEach((el) => { if (el !== sheet && !el.contains(sheet) && el.tagName !== "SCRIPT") el.inert = on; });
    const close = () => { sheet.hidden = true; document.body.style.overflow = ""; setInert(false); opener.focus(); };
    opener?.addEventListener("click", () => { sheet.hidden = false; document.body.style.overflow = "hidden"; setInert(true); $(".v-x", sheet).focus(); });
    $$("[data-close-filters]").forEach((b) => b.addEventListener("click", close));
    sheet?.addEventListener("click", (e) => { if (e.target === sheet) close(); });
    // keep Tab inside the open sheet (wraps at both ends)
    sheet?.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      const f = $$("button, select, input, a[href]", sheet).filter((x) => !x.disabled && x.offsetParent !== null);
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && sheet && !sheet.hidden) close(); });
    document.addEventListener("click", (e) => {
      const c = e.target.closest("[data-chip-f], [data-chip-q], [data-chip-instock]"); if (!c) return;
      if (c.hasAttribute("data-chip-instock")) $("[data-instock]").checked = false;
      else if (c.dataset.chipQ) $$(`[data-finder] input[name="${c.dataset.chipQ}"]`).forEach((o) => (o.checked = false));
      else $$(`input[data-f="${c.dataset.chipF}"]`).forEach((o) => { if (o.value === c.dataset.chipV) o.checked = false; });
      apply(); ($("[data-chips] .v-chip") || $("[data-sort]")).focus();
    });
    // phones: the finder is a compact card that opens in place
    const fbox = $("[data-finder-box]"), fopen = $("[data-finder-open]");
    const openFinder = () => { fbox.classList.add("is-open"); fopen.setAttribute("aria-expanded", "true"); fbox.scrollIntoView({ block: "start", behavior: "smooth" }); $("input", fbox)?.focus({ preventScroll: true }); };
    const closeFinder = () => { fbox.classList.remove("is-open"); fopen.setAttribute("aria-expanded", "false"); fopen.focus(); };
    fopen?.addEventListener("click", () => (fbox.classList.contains("is-open") ? closeFinder() : openFinder()));
    $("[data-finder-close]")?.addEventListener("click", closeFinder);
    if (location.hash === "#finder" && fopen) openFinder();
    // ?brand=Motocaddy preselects a brand (links from product pages)
    const brand = new URLSearchParams(location.search).get("brand");
    if (brand) $$(`input[data-f="brand"]`).forEach((i) => (i.checked = i.value === brand));
    apply();
  }

  /* ---------- delivery options (basket + checkout) ---------- */
  const deliveryOpts = (rates, sub, allCollect, allInStock = true) => {
    const opts = [
      { id: "standard", label: `Standard delivery, ${rates.standardDays}`, price: sub >= rates.standardFree ? 0 : rates.standard },
      { id: "nextday", label: `Next working day (order by ${rates.cutoff})`, price: sub >= rates.nextDayFree ? 0 : rates.nextDay },
      { id: "collect", label: "Click and collect, Ringwood showroom", price: 0 },
    ];
    if (allCollect) return [opts[2]];
    if (!allInStock) { opts[0].label = "Standard delivery, sent when your order is ready (dispatch time to be confirmed)"; opts.splice(1, 1); }
    return opts;
  };
  const priceWord = (p) => (p ? gbp(p, true) : "Free");

  /* ---------- basket page ---------- */
  const bp = $("[data-basket-page]");
  if (bp) {
    const rates = JSON.parse(bp.dataset.delivery);
    const list = $("[data-basket-list]");
    const render = () => {
      const items = basket();
      if (!items.length) {
        list.innerHTML = `<p class="v-head__sub">Your basket is empty.</p><p class="p-links p-links--left"><a class="p-l" href="/trolleys/">Shop electric trolleys</a></p>`;
        return;
      }
      const sub = items.reduce((t, i) => t + i.price * i.qty, 0);
      const toFreeNext = rates.nextDayFree - sub;
      list.innerHTML = `<ul class="v-bl">${items.map((i, n) => `<li class="v-bl__row">
          <a href="${esc(i.href)}" tabindex="-1" aria-hidden="true"><img src="${esc(i.image)}" alt="" width="96" height="96"></a>
          <div><a href="${esc(i.href)}"><strong>${esc(i.name)}</strong></a><span>${esc(i.line || `${i.battery} battery, ${i.holes}`)}</span>${i.gift ? `<label class="v-bl__gift">Free accessory:<select data-gift="${n}">${["Gift option 1", "Gift option 2", "Gift option 3"].map((g) => `<option${g === i.gift ? " selected" : ""}>${g}</option>`).join("")}</select></label>` : ""}${i.collect ? "<span>Click and collect, Ringwood</span>" : ""}</div>
          <label class="v-qty"><span class="sr">Quantity of ${esc(i.name)}</span><select data-qty="${n}">${[1, 2, 3].slice(0, Math.max(1, Math.min(3, i.max || 3))).map((q) => `<option${q === i.qty ? " selected" : ""}>${q}</option>`).join("")}</select></label>
          <strong class="v-bl__p">${gbp(i.price * i.qty)}</strong>
          <button type="button" class="v-clear" data-remove="${n}">Remove<span class="sr"> ${esc(i.name)}</span></button>
        </li>`).join("")}</ul>
        <div class="v-bl__sum">
          <p><span>Subtotal</span><strong>${gbp(sub, true)}</strong></p>
          <p class="v-fnote">${toFreeNext > 0 ? `Add ${gbp(toFreeNext, true)} more for free next-day delivery.` : "Free next-day UK delivery on this order."} Delivery is chosen at checkout.</p>
          <a class="p-btn v-atb" href="/checkout/">Check out</a>
        </div>`;
    };
    list.addEventListener("change", (e) => {
      const g = e.target.closest("[data-gift]");
      if (g) { const items = basket(); items[+g.dataset.gift].gift = g.value; saveBasket(items); return; }
      const s = e.target.closest("[data-qty]"); if (!s) return;
      const idx = s.dataset.qty;
      const items = basket(); items[+idx].qty = +s.value; saveBasket(items); render();
      $(`[data-qty="${idx}"]`, list)?.focus();
      say(`Quantity updated. Subtotal ${gbp(basket().reduce((t, i) => t + i.price * i.qty, 0), true)}.`);
    });
    list.addEventListener("click", (e) => {
      const r = e.target.closest("[data-remove]"); if (!r) return;
      const idx = +r.dataset.remove;
      const items = basket(); const gone = items.splice(idx, 1)[0]; saveBasket(items); render();
      const next = $$("[data-remove]", list)[Math.min(idx, items.length - 1)];
      if (next) next.focus(); else { const h = $("h1"); h.tabIndex = -1; h.focus(); }
      say(`${gone.name} removed.${items.length ? ` Subtotal ${gbp(items.reduce((t, i) => t + i.price * i.qty, 0), true)}.` : " Your basket is empty."}`);
    });
    const live = document.createElement("p"); live.className = "sr"; live.setAttribute("aria-live", "polite"); bp.append(live);
    const say = (t) => { live.textContent = ""; setTimeout(() => (live.textContent = t), 50); };
    render();
  }

  /* ---------- checkout (simulated) ---------- */
  const co = $("[data-checkout]");
  if (co) {
    const rates = JSON.parse(co.dataset.delivery);
    const items = basket();
    if (!items.length) { location.replace("/basket/"); return; }
    const sub = items.reduce((t, i) => t + i.price * i.qty, 0);
    const opts = deliveryOpts(rates, sub, items.every((i) => i.collect), items.every((i) => i.stock === "in"));
    const fs = $("[data-methods]");
    const nd = opts.find((o) => o.id === "nextday");
    const pick = nd && nd.price === 0 ? "nextday" : opts[0].id; // fastest free option first
    fs.insertAdjacentHTML("beforeend", opts.map((o) => `<label class="v-opt__card${o.id === pick ? " is-on" : ""}"><input type="radio" name="delivery" value="${o.id}"${o.id === pick ? " checked" : ""}><span><strong>${esc(o.label)}</strong></span><span class="v-opt__p">${priceWord(o.price)}</span></label>`).join(""));
    const sum = $("[data-summary]");
    const renderSum = () => {
      const o = opts.find((x) => x.id === new FormData($("[data-checkout-form]")).get("delivery")) || opts[0];
      $$(".v-opt__card", fs).forEach((c) => c.classList.toggle("is-on", $("input", c).checked));
      sum.innerHTML = `<h2>Order summary</h2><ul>${items.map((i) => `<li><span>${i.qty} × ${esc(i.name)} (${esc(i.battery)})${i.gift ? `<br><small>Free accessory: ${esc(i.gift)}</small>` : ""}${i.collect ? "<br><small>Click and collect</small>" : ""}</span><span>${gbp(i.price * i.qty)}</span></li>`).join("")}</ul>
        <p><span>${esc(o.label.split(",")[0])}</span><span>${priceWord(o.price)}</span></p><p class="v-co__total"><span>Total</span><strong>${gbp(sub + o.price, true)}</strong></p><p class="v-fnote">Prices include VAT.</p>`;
      const ti = $("[data-total-inline]"); if (ti) ti.innerHTML = `<span>Total to pay</span><span>${gbp(sub + o.price, true)}</span>`;
    };
    fs.addEventListener("change", renderSum);
    renderSum();
    const form = $("[data-checkout-form]");
    // the address fields only matter for delivery
    const addr = $$('input[name="address1"], input[name="town"], input[name="postcode"]', form);
    const addrSet = addr[0].closest("fieldset");
    const setRequired = () => {
      const collect = new FormData(form).get("delivery") === "collect";
      addr.forEach((i) => (i.required = !collect));
      addrSet.querySelector("legend").textContent = collect ? "Your name" : "Delivery address";
      addr.forEach((i) => (i.closest("label").hidden = collect));
      const tel = $('input[name="tel"]', form); if (tel) tel.closest("label").hidden = collect;
    };
    fs.addEventListener("change", setRequired);
    setRequired();
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const problem = (i) => {
        const v = i.value.trim(), label = i.closest("label").querySelector("span").textContent.toLowerCase();
        if (!i.required && !v) return "";
        if (!v) return `Enter your ${label}.`;
        if (i.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter an email address like name@example.com.";
        if (i.name === "postcode" && !/^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i.test(v)) return "Enter a full UK postcode, like BH24 1AB.";
        return "";
      };
      const fields = $$("input:not([type=checkbox]):not([type=radio])", form);
      const bad = [];
      fields.forEach((i) => {
        let m = i.parentElement.querySelector(".v-field__err");
        if (!m) { m = document.createElement("span"); m.className = "v-field__err"; m.id = `err-${i.name}`; i.after(m); }
        const msg = problem(i);
        m.textContent = msg;
        if (msg) { i.setAttribute("aria-invalid", "true"); i.setAttribute("aria-describedby", m.id); bad.push(i); }
        else { i.removeAttribute("aria-invalid"); i.removeAttribute("aria-describedby"); }
      });
      const err = $("[data-error]");
      if (bad.length) {
        err.hidden = false;
        err.textContent = bad.length === 1 ? "There’s one thing to fix before you can place the order." : `There are ${bad.length} things to fix before you can place the order.`;
        bad[0].focus();
        return;
      }
      err.hidden = true;
      $("[data-recap]").innerHTML = sum.innerHTML.replace("<h2>Order summary</h2>", "<h3>Your order</h3>");
      saveBasket([]);
      $("[data-co]").hidden = true;
      const done = $("[data-done]"); done.hidden = false; done.focus();
    });
  }
})();

/* phone menu: a real toggle button with aria-expanded */
(() => {
  const btn = document.querySelector("[data-menu]"), menu = document.getElementById("p-menu");
  if (!btn || !menu) return;
  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") !== "true";
    btn.setAttribute("aria-expanded", String(open));
    menu.hidden = !open;
    if (open) menu.querySelector("a")?.focus();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) { menu.hidden = true; btn.setAttribute("aria-expanded", "false"); btn.focus(); } });
})();

/* desktop sticky bar: only while the main Add to basket is out of view */
(() => {
  const atb = document.querySelector(".v-atb"), bar = document.querySelector("[data-sticky]");
  if (!atb || !bar) return;
  // only once the shopper has scrolled past the main button (declutter review); a scroll check rather than
  // an IntersectionObserver, which misses fast scrolls that jump straight past the button
  const check = () => { const r = atb.getBoundingClientRect(); bar.classList.toggle("is-needed", r.bottom < 0 || r.top > innerHeight); };
  addEventListener("scroll", check, { passive: true });
  addEventListener("resize", check);
  check();
})();

/* custom clubs: the hand choice is read when a builder link is used (so Back/forward cache can't
   leave links out of step), and the cards show left-handed counts and prices when chosen */
(() => {
  const box = document.querySelector("[data-hand]");
  if (!box) return;
  const hand = () => box.querySelector("input:checked")?.value || "right";
  const gbp = (n) => "£" + n.toLocaleString("en-GB");
  const show = (announce) => {
    const left = hand() === "left";
    document.querySelectorAll(".c-type").forEach((c) => {
      const [n, from] = c.dataset[left ? "left" : "right"].split("|").map(Number);
      c.querySelector("[data-count]").textContent = n;
      c.querySelector("[data-from]").textContent = gbp(from);
    });
    const total = [...document.querySelectorAll(".c-type")].reduce((t, c) => t + Number(c.dataset.left.split("|")[0]), 0);
    const note = box.querySelector("[data-hand-note]");
    if (announce) note.textContent = left ? `Showing left-handed: ${total} models.` : `Showing right-handed. ${total} of these models also come left-handed.`;
  };
  box.addEventListener("change", () => show(true));
  window.addEventListener("pageshow", () => show(false)); // restored form state after Back
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-builder]");
    if (!a) return;
    const u = new URL(a.getAttribute("href"), location.origin);
    if (hand() === "left") u.searchParams.set("hand", "left"); else u.searchParams.delete("hand");
    a.setAttribute("href", u.pathname + u.search);
  }, true); // capture: runs before the "not in this preview" redirect reads the href
  show(false);
})();

/* mark the current section in the main nav */
(() => {
  const path = location.pathname;
  document.querySelectorAll(".p-nav__item a, #p-menu a").forEach((a) => {
    const h = a.getAttribute("href");
    if (h && h !== "#" && h !== "/" && path.startsWith(h)) a.setAttribute("aria-current", "page");
  });
})();

/* shop the hole: choose a shot (stop button or pin) to see its three picks */
(() => {
  const stops = [...document.querySelectorAll(".h-stop")];
  if (!stops.length) return;
  const pins = [...document.querySelectorAll(".h-pin[data-zone]")];
  const show = (zone, focusPanel) => {
    stops.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.zone === zone)));
    pins.forEach((p) => p.classList.toggle("is-on", p.dataset.zone === zone));
    document.querySelectorAll("[data-zone-panel]").forEach((p) => (p.hidden = p.dataset.zonePanel !== zone));
    if (focusPanel) document.getElementById("h-zone-" + zone)?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  };
  stops.forEach((b) => b.addEventListener("click", () => show(b.dataset.zone, false)));
  pins.forEach((p) => p.addEventListener("click", () => show(p.dataset.zone, true)));
})();

/* members: order calculator (Annual discount on one order, less the fee) */
(() => {
  const box = document.querySelector("[data-calc]");
  if (!box) return;
  const pct = Number(box.dataset.pct), fee = Number(box.dataset.fee);
  const range = box.querySelector("[data-calc-range]");
  const money = (n, p = true) => "£" + n.toLocaleString("en-GB", { minimumFractionDigits: p ? 2 : 0, maximumFractionDigits: p ? 2 : 0 });
  const $ = (s) => document.querySelector(s);
  const breakEven = Math.ceil((fee * 100) / pct);
  const update = () => {
    const v = Number(range.value);
    const off = Math.round(v * pct) / 100, net = Math.round((off - fee) * 100) / 100;
    box.querySelector("[data-calc-out]").textContent = money(v, false);
    range.setAttribute("aria-valuetext", money(v, false));
    box.querySelector("[data-calc-off]").textContent = "−" + money(off);
    if (net >= 0) {
      box.querySelector("[data-calc-tl]").textContent = "You’re better off by";
      box.querySelector("[data-calc-net]").textContent = money(net);
      $("[data-calc-big]").textContent = money(net);
      $("[data-calc-cap]").textContent = `better off on a ${money(v, false)} order, after the ${money(fee, false)} fee.`;
    } else {
      box.querySelector("[data-calc-tl]").textContent = "On this order alone, you’re short by";
      box.querySelector("[data-calc-net]").textContent = money(-net);
      $("[data-calc-big]").textContent = money(breakEven, false);
      $("[data-calc-cap]").textContent = `is where Annual pays for itself on one order. Below that, it can still add up over the year.`;
    }
    box.querySelector("[data-calc-note]").textContent = `That’s on this order alone. Annual members get ${pct}% off one order every month.`;
  };
  range.addEventListener("input", update);
})();

/* iron sets: shaft type, finish, set, shaft and flex choices resolve to one variant */
(() => {
  const box = document.querySelector("[data-iron-opts]"); if (!box) return;
  const all = JSON.parse(box.dataset.ironOpts), keys = ["type", "finish", "set", "shaft", "flex"];
  const hidden = document.querySelector("[data-variant]");
  const pick = () => Object.fromEntries(keys.map((k) => [k, box.querySelector(`input[name="io-${k}"]:checked`)?.value]));
  const apply = (changed) => {
    const sel = pick();
    const fits = (v, ks) => ks.every((k) => sel[k] == null || v[k] === sel[k]);
    // keep the option just changed, then match as many of the others as possible, preferring ones you can buy
    let best = all.filter((v) => v[changed] === sel[changed]);
    const score = (v) => keys.reduce((n, k) => n + (v[k] === sel[k] ? 1 : 0), 0) + (v.stock !== "out" ? 0.5 : 0);
    best = (best.length ? best : all).sort((a, b) => score(b) - score(a))[0];
    keys.forEach((k) => { const r = box.querySelector(`input[name="io-${k}"][value="${CSS.escape(best[k] ?? "")}"]`); if (r) r.checked = true; });
    keys.forEach((k) => box.querySelectorAll(`input[name="io-${k}"]`).forEach((r) => {
      const before = keys.slice(0, keys.indexOf(k)); const ok = all.some((v) => v[k] === r.value && before.every((o) => v[o] === best[o]));
      r.closest("label").classList.toggle("is-off", !ok);
    }));
    hidden.dataset.variant = JSON.stringify(best.v);
    hidden.dispatchEvent(new Event("change", { bubbles: true }));
  };
  box.addEventListener("change", (e) => { const k = e.target.name?.replace("io-", ""); if (keys.includes(k)) apply(k); });
  apply("set");
})();
