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
    const a = e.target.closest('a[href="#"]');
    if (!a) return;
    e.preventDefault();
    const name = (a.getAttribute("aria-label") || a.textContent || "This page").trim().replace(/\s+/g, " ");
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
      $("[data-price]").textContent = gbp(v.price, true);
      $("[data-member]").textContent = gbp(v.member, true);
      $("[data-third]").textContent = gbp(v.third, true);
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
    $$(".v-gift__opt input").forEach((r) => r.addEventListener("change", () => $$(".v-gift__opt").forEach((o) => o.classList.toggle("is-on", $("input", o).checked))));
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
        msg.innerHTML = "On the real site you’d leave your email here and we’d tell you when this battery option is back. <strong>Test site: nothing is sent.</strong>";
        return;
      }
      const gift = $(".v-gift__opt input:checked")?.value || null;
      const collect = b.dataset.add === "collect";
      const items = basket();
      const key = `${pdp.dataset.product}|${v.battery}|${gift}|${collect}`;
      const hit = items.find((i) => i.key === key);
      if (hit) hit.qty += 1;
      else items.push({ key, id: pdp.dataset.product, name: pdp.dataset.name, battery: v.battery, holes: v.holes, price: v.price, stock: v.stock, gift, collect, image: pdp.dataset.image, href: location.pathname, qty: 1 });
      saveBasket(items);
      msg.hidden = false;
      msg.innerHTML = `Added: ${esc(pdp.dataset.name)}, ${esc(v.battery)} battery${collect ? ", click and collect in Ringwood" : ""}. <a href="/basket/">View basket and check out</a>`;
      $("a", msg)?.focus();
    }));
    // delivery cut-off: only claim a countdown when dispatch really is today
    const cut = $("[data-cutoff]");
    if (cut) {
      const now = new Date(), day = now.getDay(), mins = 13 * 60 - (now.getHours() * 60 + now.getMinutes());
      if (day >= 1 && day <= 5 && mins > 0) cut.textContent = ` (${Math.floor(mins / 60)}h ${mins % 60}m left today)`;
    }
    update();
  }

  /* ---------- collection: finder, filters, sort ---------- */
  const grid = $("[data-grid]");
  if (grid) {
    const cards = $$("[data-card]", grid);
    const rankStock = { in: 0, order: 1, out: 2 };
    const finder = $("[data-finder]");
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
          && need.every(([k, v]) => c.dataset[k].split("|").includes(v));
        c.hidden = !ok; if (ok) n++;
      });
      $$("[data-count]").forEach((e) => (e.textContent = n));
      $("[data-empty]").hidden = n > 0;
      const active = Object.values(sel).flat().length;
      const fn = $("[data-filter-n]"); if (fn) fn.textContent = active ? ` (${active})` : "";
      // in-stock switch mirrors the Availability "In stock" option; chips list what's applied
      const ins = $("[data-instock]"); if (ins) ins.checked = (sel.availability || []).includes("In stock");
      const chips = $("[data-chips]");
      if (chips) chips.innerHTML = Object.entries(sel).flatMap(([k, vals]) => vals.map((v) => `<button type="button" class="v-chip" data-chip-f="${k}" data-chip-v="${esc(v)}">${esc(v)} <span aria-hidden="true">×</span><span class="sr"> remove filter</span></button>`)).join("");
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
      [...cards].sort((a, b) => rankStock[a.dataset.stock] - rankStock[b.dataset.stock] || cmp(a, b)).forEach((c) => grid.append(c));
    };
    // keep sidebar and sheet checkboxes in step
    document.addEventListener("change", (e) => {
      const i = e.target;
      if (i.matches("input[data-f]")) {
        $$(`input[data-f="${i.dataset.f}"]`).forEach((o) => { if (o.value === i.value) o.checked = i.checked; });
        apply();
      } else if (i.matches("[data-sort-sheet]")) { $("[data-sort]").value = i.value; apply(); }
      else if (i.matches("[data-instock]")) {
        $$('input[data-f="availability"]').forEach((o) => { if (o.value === "In stock") o.checked = i.checked; });
        apply();
      } else if (i.matches("[data-sort]") || i.closest("[data-finder]")) apply();
    });
    finder?.addEventListener("submit", (e) => { e.preventDefault(); apply(); $("#grid").scrollIntoView({ behavior: "smooth" }); });
    $$("[data-clear]").forEach((b) => b.addEventListener("click", () => {
      $$("input[data-f]").forEach((i) => (i.checked = false));
      finder?.reset();
      apply();
    }));
    const sheet = $("[data-sheet]"), opener = $("[data-open-filters]");
    const close = () => { sheet.hidden = true; document.body.style.overflow = ""; opener.focus(); };
    opener?.addEventListener("click", () => { sheet.hidden = false; document.body.style.overflow = "hidden"; $(".v-x", sheet).focus(); });
    $$("[data-close-filters]").forEach((b) => b.addEventListener("click", close));
    sheet?.addEventListener("click", (e) => { if (e.target === sheet) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && sheet && !sheet.hidden) close(); });
    document.addEventListener("click", (e) => {
      const c = e.target.closest("[data-chip-f]"); if (!c) return;
      $$(`input[data-f="${c.dataset.chipF}"]`).forEach((o) => { if (o.value === c.dataset.chipV) o.checked = false; });
      apply(); ($("[data-chips] .v-chip") || $("[data-sort]")).focus();
    });
    // phones: the finder is a compact card that opens in place
    const fbox = $("[data-finder-box]"), fopen = $("[data-finder-open]");
    const openFinder = () => { fbox.classList.add("is-open"); fopen.setAttribute("aria-expanded", "true"); $("input", fbox)?.focus(); };
    fopen?.addEventListener("click", openFinder);
    if (location.hash === "#finder" && fopen && getComputedStyle(fopen).display !== "none") openFinder();
    // ?brand=Motocaddy preselects a brand (links from product pages)
    const brand = new URLSearchParams(location.search).get("brand");
    if (brand) $$(`input[data-f="brand"]`).forEach((i) => (i.checked = i.value === brand));
    apply();
  }

  /* ---------- delivery options (basket + checkout) ---------- */
  const deliveryOpts = (rates, sub, allCollect) => {
    const opts = [
      { id: "standard", label: `Standard delivery, ${rates.standardDays}`, price: sub >= rates.standardFree ? 0 : rates.standard },
      { id: "nextday", label: `Next working day (order by ${rates.cutoff})`, price: sub >= rates.nextDayFree ? 0 : rates.nextDay },
      { id: "collect", label: "Click and collect, Ringwood showroom", price: 0 },
    ];
    return allCollect ? [opts[2]] : opts;
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
          <a href="${esc(i.href)}"><img src="${esc(i.image)}" alt="" width="96" height="96"></a>
          <div><a href="${esc(i.href)}"><strong>${esc(i.name)}</strong></a><span>${esc(i.battery)} battery, ${esc(i.holes)}</span>${i.gift ? `<span>Free accessory: ${esc(i.gift)} (to be confirmed)</span>` : ""}${i.collect ? "<span>Click and collect, Ringwood</span>" : ""}</div>
          <label class="v-qty"><span class="sr">Quantity of ${esc(i.name)}</span><select data-qty="${n}">${[1, 2, 3].map((q) => `<option${q === i.qty ? " selected" : ""}>${q}</option>`).join("")}</select></label>
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
      const s = e.target.closest("[data-qty]"); if (!s) return;
      const items = basket(); items[+s.dataset.qty].qty = +s.value; saveBasket(items); render();
    });
    list.addEventListener("click", (e) => {
      const r = e.target.closest("[data-remove]"); if (!r) return;
      const items = basket(); items.splice(+r.dataset.remove, 1); saveBasket(items); render(); $("h1").focus?.();
    });
    render();
  }

  /* ---------- checkout (simulated) ---------- */
  const co = $("[data-checkout]");
  if (co) {
    const rates = JSON.parse(co.dataset.delivery);
    const items = basket();
    if (!items.length) { location.replace("/basket/"); return; }
    const sub = items.reduce((t, i) => t + i.price * i.qty, 0);
    const opts = deliveryOpts(rates, sub, items.every((i) => i.collect));
    const fs = $("[data-methods]");
    fs.insertAdjacentHTML("beforeend", opts.map((o, i) => `<label class="v-opt__card${i === 0 ? " is-on" : ""}"><input type="radio" name="delivery" value="${o.id}"${i === 0 ? " checked" : ""}><span><strong>${esc(o.label)}</strong></span><span class="v-opt__p">${priceWord(o.price)}</span></label>`).join(""));
    const sum = $("[data-summary]");
    const renderSum = () => {
      const o = opts.find((x) => x.id === new FormData($("[data-checkout-form]")).get("delivery")) || opts[0];
      $$(".v-opt__card", fs).forEach((c) => c.classList.toggle("is-on", $("input", c).checked));
      sum.innerHTML = `<h2>Order summary</h2><ul>${items.map((i) => `<li><span>${i.qty} × ${esc(i.name)} (${esc(i.battery)})</span><span>${gbp(i.price * i.qty)}</span></li>`).join("")}</ul>
        <p><span>Delivery</span><span>${priceWord(o.price)}</span></p><p class="v-co__total"><span>Total</span><strong>${gbp(sub + o.price, true)}</strong></p><p class="v-fnote">Prices include VAT.</p>`;
    };
    fs.addEventListener("change", renderSum);
    renderSum();
    const form = $("[data-checkout-form]");
    // the address fields only matter for delivery
    const addr = $$('input[name="address1"], input[name="town"], input[name="postcode"]', form);
    fs.addEventListener("change", () => addr.forEach((i) => (i.required = new FormData(form).get("delivery") !== "collect")));
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const bad = $$("input[required]", form).filter((i) => !i.value.trim() || (i.type === "email" && !/^\S+@\S+\.\S+$/.test(i.value)));
      $$("input", form).forEach((i) => i.removeAttribute("aria-invalid"));
      const err = $("[data-error]");
      if (bad.length) {
        bad.forEach((i) => i.setAttribute("aria-invalid", "true"));
        err.hidden = false;
        err.textContent = `Please fill in: ${bad.map((i) => i.closest("label").querySelector("span").textContent.toLowerCase()).join(", ")}.`;
        bad[0].focus();
        return;
      }
      err.hidden = true;
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
