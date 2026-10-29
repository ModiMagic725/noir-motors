(function () {
  const {
    D,
    $,
    $$,
    L,
    fmt,
    img,
    toast,
    lb,
    owl,
    motion,
    LS,
    store,
    car,
    vcard,
    toggle,
    badges,
    pg,
  } = window.A;
  const Q = new URLSearchParams(location.search),
    M = $("#page");
  const today = () => new Date().toISOString().slice(0, 10);
  const S = (c, i) =>
    `<section class="${c}"><div class="wx">${i}</div></section>`;
  const hero = (t, l, s, k, cls = "sm") =>
    `<section class="hero ${cls}"><div class="bgf px">${img(k, "", true)}</div><div class="wx"><span class="lbl">${l}</span><h1>${t
      .split("|")
      .map((x) => `<span class="ln"><span class="hl">${x}</span></span>`)
      .join("")}</h1><p>${s || ""}</p></div></section>`;
  const fld = (id, l, t = "text", x = "") =>
    `<div class="field"><label for="${id}">${l}</label><input id="${id}" type="${t}" ${x}><div class="err" id="e-${id}" role="alert"></div></div>`;
  const sel = (id, l, o, v) =>
    `<div class="field"><label for="${id}">${l}</label><select id="${id}">${o
      .map((x) => {
        const [a, b] = Array.isArray(x) ? x : [x, x];
        return `<option value="${a}" ${a == v ? "selected" : ""}>${b}</option>`;
      })
      .join("")}</select></div>`;
  const chk = (t) =>
    `<label style="display:block;margin:1rem 0"><input type="checkbox" id="cons"> ${t}</label><div class="err" id="e-cons" role="alert"></div>`;
  function V(r) {
    let ok = true,
      f = null;
    $$(".err").forEach((e) => (e.textContent = ""));
    for (const [id, fn] of r) {
      const e = $("#" + id),
        v = e.type === "checkbox" ? e.checked : e.value.trim(),
        m = fn(v);
      if (m) {
        $("#e-" + id).textContent = m;
        ok = false;
        f = f || e;
      }
    }
    if (f) f.focus();
    return ok;
  }
  const req = (l) => (v) => (v ? "" : l + " is required."),
    em = (v) =>
      /^\S+@\S+\.\S+$/.test(v) ? "" : "Enter a valid email address.",
    ph = (v) =>
      /^[+\d][\d\s-]{7,15}$/.test(v) ? "" : "Enter a valid phone number.";
  const NOTE =
    '<p class="note">Frontend demo only. Nothing is sent, booked or reserved.</p>';
  const carOpts = (c) =>
    D.cars.map((x) => [x.id, `${x.brand} ${x.model} (${x.year})`]);
  const faq = (id, l) =>
    `<div class="accordion" id="${id}">${l.map((q, i) => `<div class="accordion-item"><h3 class="accordion-header" style="font-size:1rem"><button class="accordion-button ${i ? "collapsed" : ""}" data-bs-toggle="collapse" data-bs-target="#${id}${i}" aria-expanded="${!i}">${q[0]}</button></h3><div id="${id}${i}" class="accordion-collapse collapse ${i ? "" : "show"}"><div class="accordion-body">${q[1]}</div></div></div>`).join("")}</div>`;
  const types = [
    "Performance",
    "Luxury Sedan",
    "SUV",
    "Electric",
    "Grand Touring",
  ];
  const R = {};
  // HOME
  const FEAT = ["car-001", "car-004", "car-007"];
  R.index = () => {
    const f = car(FEAT[0]);
    return `<section class="hero" id="hr"><div class="bgf px" id="hi">${img(f.img, f.brand + " " + f.model, true)}</div><div class="wx"><span class="lbl">Noir Motors · The art of the drive</span><h1 style="font-size:clamp(2.6rem,6.6vw,6.2rem)"><span class="ln"><span class="hl">Engineered for those</span></span><span class="ln"><span class="hl"><b>who choose differently.</b></span></span></h1><p class="mono" id="hs">${f.year} ${f.brand} ${f.model} · ${f.hp} hp · 0–100 km/h ${f.acc}s · sample specs</p><div style="display:flex;gap:1rem;flex-wrap:wrap;margin-top:1rem"><a class="btn-n" href="${L("inventory")}">Explore inventory</a><a class="btn-n o" href="#cat">Discover the collection</a></div><div class="slides" role="group" aria-label="Featured vehicles">${FEAT.map(
      (id, i) => {
        const c = car(id);
        return `<button data-f="${id}" aria-pressed="${i == 0}"><span class="mono">0${i + 1}</span><br>${c.brand} ${c.model}</button>`;
      },
    ).join("")}</div></div></section>
${S("pad", `<span class="lbl" id="cat">Collection</span><div class="cat">${types.map((t) => `<a href="${L("inventory")}?type=${encodeURIComponent(t)}"><b>${D.cars.filter((c) => c.type === t).length}</b><h3 style="margin:.4rem 0 0;font-size:1.2rem">${t}</h3><span class="mono">View all →</span></a>`).join("")}</div>`)}
${S("pad carb", `<span class="lbl">Brands · sample inventory</span><div class="strip">${[...new Set(D.cars.map((c) => c.brand))].map((b) => `<a href="${L("brands")}" style="text-decoration:none">${b}</a>`).join("")}</div>`)}
${(() => {
  const t = [...D.cars].sort((a, b) => b.price - a.price)[0];
  return S(
    "pad",
    `<div class="row g-5 align-items-center"><div class="col-lg-7"><div class="ar rv" style="--ar:16/10">${img(t.img, t.brand + " " + t.model)}</div></div><div class="col-lg-5"><span class="lbl">Inventory spotlight</span><h2>${t.brand}<br>${t.model}</h2><p class="mono">${t.year} · ${t.engine}</p><div class="row g-3 my-3"><div class="col-4"><div class="big" data-n="${t.hp}">0</div><span class="mono">hp</span></div><div class="col-4"><div class="big" data-n="${t.acc}" data-d="1">0</div><span class="mono">0–100 s</span></div><div class="col-4"><div class="big" data-n="${t.top}">0</div><span class="mono">km/h</span></div></div><p class="mono">Illustrative figures</p><a class="btn-n" href="${L("vehicle-detail")}?id=${t.id}">View vehicle</a></div></div>`,
  );
})()}
<section class="pin carb"><div class="wx"><span class="lbl">Beyond the machine</span><div class="row g-5 align-items-center"><div class="col-lg-5"><div class="st on"><h2>Selected</h2><p>Every vehicle is chosen for provenance, condition and character. Brand standards, not certifications.</p></div><div class="st"><h2>Inspected</h2><p>A documented walk-through of mechanical, cosmetic and history checks (brand intent).</p></div><div class="st"><h2>Explained</h2><p>Specifications and trade-offs in plain language before you decide.</p></div></div><div class="col-lg-7"><div class="ar rv" style="--ar:16/10">${img("editorial", "Vehicle in studio lighting")}</div></div></div></div></section>
${S("pad", `<div class="row g-0"><div class="col-lg-6 p-lg-5"><span class="lbl">Design &amp; engineering</span><h2>Form follows speed.</h2><p>We read cars the way engineers do: weight, balance, power delivery, then the details that make a drive memorable.</p></div><div class="col-lg-6"><div class="ar" style="--ar:4/3">${img("interior", "Cabin detail")}</div></div></div>`)}
${S(
  "pad carb",
  `<span class="lbl">Featured collection</span><div class="owl-carousel" id="fo">${D.cars
    .slice(0, 8)
    .map((c) => vcard(c, false))
    .join("")}</div>`,
)}
${S("pad", `<div class="row g-5 align-items-center"><div class="col-lg-6"><div class="ar rv" style="--ar:16/10">${img("showroom", "Dark showroom with vehicles")}</div></div><div class="col-lg-5"><span class="lbl">The showroom</span><h2>Where cars meet daylight.</h2><p>A private space to see, hear and compare. Fictional showroom for demonstration.</p><a class="btn-n o" href="${L("showroom")}">Visit showroom</a></div></div>`)}
<section class="pad light cta-band"><div class="wx"><span class="lbl">Test drive</span><h2>Drive it before you <b>decide.</b></h2><a class="btn-n" href="${L("test-drive")}">Request a test drive</a><p class="mono" style="margin-top:1rem">Demo form: no real appointment is made.</p></div></section>
${S("pad", `<span class="lbl">Customer words · fictional</span><div class="owl-carousel" id="ts">${["Straight answers, no pressure. I understood every spec before deciding.", "The comparison tool made a hard choice clear.", "A calm, knowledgeable team. The car was exactly as described."].map((q, i) => `<div class="p-3"><p style="font:500 1.6rem/1.3 var(--head);max-width:30ch">“${q}”</p><span class="mono">Sample customer ${i + 1}</span></div>`).join("")}</div>`)}`;
  };
  R.index.after = () => {
    owl("#fo");
    owl("#ts", {
      items: 1,
      responsive: { 0: { items: 1 } },
      autoplay: true,
      loop: true,
    });
    $("#hr").addEventListener("click", (e) => {
      const b = e.target.closest("[data-f]");
      if (!b) return;
      const c = car(b.dataset.f);
      $$("#hr [data-f]").forEach((x) =>
        x.setAttribute("aria-pressed", x === b),
      );
      $("#hi").innerHTML = img(c.img, c.brand + " " + c.model, true);
      $("#hs").textContent =
        `${c.year} ${c.brand} ${c.model} · ${c.hp} hp · 0–100 km/h ${c.acc}s · sample specs`;
      if (window.gsap) gsap.from("#hi", { opacity: 0.2, duration: 0.7 });
    });
    $$("[data-n]").forEach((el) => {
      const n = +el.dataset.n,
        d = el.dataset.d ? 1 : 0;
      const done = () => (el.textContent = n.toFixed(d));
      if (
        matchMedia("(prefers-reduced-motion:reduce)").matches ||
        !("IntersectionObserver" in window)
      )
        return done();
      const io = new IntersectionObserver(([x]) => {
        if (!x.isIntersecting) return;
        io.disconnect();
        let s0 = null;
        const tick = (ts) => {
          s0 = s0 || ts;
          const k = Math.min(1, (ts - s0) / 1400);
          el.textContent = (n * (k === 1 ? 1 : 1 - Math.pow(2, -10 * k))).toFixed(d);
          if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
      io.observe(el);
    });
    const steps = $$(".pin .st");
    const set = (i) =>
      steps.forEach((s, j) => s.classList.toggle("on", j === i));
    if (
      window.gsap &&
      window.ScrollTrigger &&
      matchMedia("(min-width:992px)").matches &&
      !matchMedia("(prefers-reduced-motion:reduce)").matches
    ) {
      ScrollTrigger.create({
        trigger: ".pin",
        start: "top top",
        end: "+=150%",
        pin: true,
        onUpdate: (s) => set(Math.min(2, Math.floor(s.progress * 3))),
      });
    } else steps.forEach((s) => s.classList.add("on"));
  };
  // INVENTORY
  R.inventory = () =>
    hero(
      "Inventory",
      "Sample vehicles",
      "All listings are illustrative demo data, not live stock.",
      "track",
    ) +
    S(
      "pad",
      `<div class="inv"><aside class="fp" id="fp" aria-label="Filters"><button class="btn-n o fclose" id="fx" style="margin-bottom:1rem">Close</button><div class="field"><label for="q">Search</label><input id="q" type="search" placeholder="Model or keyword"></div>${sel("fb", "Brand", ["All", ...new Set(D.cars.map((c) => c.brand))])}${sel("ft", "Type", ["All", ...types])}${sel("ff", "Fuel", ["All", "Petrol", "Diesel", "Hybrid", "Electric"])}${sel("fr", "Transmission", ["All", "Automatic", "Manual"])}${sel("fy", "Model year (from)", [["0", "Any"], "2021", "2022", "2023"])}<div class="field"><label for="fp2">Max price: <span id="pv"></span></label><input id="fp2" type="range" min="10000000" max="45000000" step="500000" value="45000000"></div><div class="field"><label for="fm">Max mileage: <span id="mv"></span></label><input id="fm" type="range" min="1000" max="20000" step="500" value="20000"></div><button class="btn-n o" id="clr">Clear filters</button></aside>
<div><div style="display:flex;gap:1rem;flex-wrap:wrap;align-items:center;justify-content:space-between;margin-bottom:1.5rem"><span class="mono" id="cnt"></span><button class="btn-n o fbtn" id="fo2">Filters</button><div style="display:flex;gap:.6rem">${sel(
        "so",
        "",
        [
          ["", "Sort"],
          ["pl", "Price: low to high"],
          ["ph", "Price: high to low"],
          ["yn", "Year: newest"],
          ["mn", "Model A–Z"],
        ],
      )}<button class="chip" id="vg" aria-pressed="false">Grid</button><button class="chip" id="vl" aria-pressed="true">List</button></div></div><div class="row g-3" id="gr" aria-live="polite"></div><div style="text-align:center;margin-top:2rem"><button class="btn-n o" id="lm">Load more</button></div></div></div>`,
    );
  R.inventory.after = () => {
    let page = 9,
      view = "l";
    const g = (id) => $("#" + id);
    if (Q.get("brand") && D.cars.some((c) => c.brand === Q.get("brand")))
      g("fb").value = Q.get("brand");
    if (types.includes(Q.get("type"))) g("ft").value = Q.get("type");
    const draw = () => {
      const q = g("q").value.toLowerCase(),
        b = g("fb").value,
        t = g("ft").value,
        f = g("ff").value,
        r = g("fr").value,
        y = +g("fy").value,
        p = +g("fp2").value,
        m = +g("fm").value;
      g("pv").textContent = fmt(p);
      g("mv").textContent = m.toLocaleString("en-IN") + " km";
      let l = D.cars.filter(
        (c) =>
          (!q ||
            (c.brand + " " + c.model + " " + c.type + " " + c.fuel)
              .toLowerCase()
              .includes(q)) &&
          (b === "All" || c.brand === b) &&
          (t === "All" || c.type === t) &&
          (f === "All" || c.fuel === f) &&
          (r === "All" || c.trans === r) &&
          c.year >= y &&
          c.price <= p &&
          c.km <= m,
      );
      const s = g("so").value;
      if (s === "pl") l.sort((a, c) => a.price - c.price);
      if (s === "ph") l.sort((a, c) => c.price - a.price);
      if (s === "yn") l.sort((a, c) => c.year - a.year);
      if (s === "mn") l.sort((a, c) => a.model.localeCompare(c.model));
      g("cnt").textContent = `${l.length} sample vehicles`;
      g("gr").className = "row g-3 " + (view === "l" ? "list" : "");
      const cls = view === "l" ? "" : "col-md-6 col-xl-4";
      g("gr").innerHTML = l.length
        ? l
            .slice(0, page)
            .map((c) => vcard(c).replace('class="vcw"', `class="vcw ${cls}"`))
            .join("")
        : `<div class="note"><h3>No vehicles match</h3><p>Try fewer filters.</p><button class="btn-n" id="clr2">Clear filters</button></div>`;
      g("lm").hidden = l.length <= page;
      const c2 = g("clr2");
      if (c2) c2.onclick = clr;
    };
    const clr = () => {
      ["q"].forEach((i) => (g(i).value = ""));
      ["fb", "ft", "ff", "fr"].forEach((i) => (g(i).value = "All"));
      g("fy").value = "0";
      g("fp2").value = 45000000;
      g("fm").value = 20000;
      g("so").value = "";
      page = 9;
      draw();
    };
    $$("#fp input,#fp select,#so").forEach((e) =>
      e.addEventListener("input", () => {
        page = 9;
        draw();
      }),
    );
    g("clr").onclick = clr;
    g("lm").onclick = () => {
      page += 6;
      draw();
    };
    g("vg").onclick = () => {
      view = "g";
      g("vg").setAttribute("aria-pressed", true);
      g("vl").setAttribute("aria-pressed", false);
      draw();
    };
    g("vl").onclick = () => {
      view = "l";
      g("vl").setAttribute("aria-pressed", true);
      g("vg").setAttribute("aria-pressed", false);
      draw();
    };
    g("fo2").onclick = () => g("fp").classList.add("open");
    g("fx").onclick = () => g("fp").classList.remove("open");
    draw();
  };
  // DETAIL
  R["vehicle-detail"] = () => {
    const c = car(Q.get("id")) || D.cars[0];
    window.__c = c;
    let rec = store.rec().filter((x) => x !== c.id);
    LS.set("noir-recent", [c.id, ...rec].slice(0, 5));
    rec = rec.slice(0, 4);
    const g = [c.img, "interior", "dash", "showroom"];
    window.__g = g;
    return (
      `<section class="hero"><div class="bgf px">${img(c.img, c.brand + " " + c.model, true)}</div><div class="wx"><span class="lbl">${c.year} · ${c.type}</span><h1 style="font-size:clamp(2.6rem,8vw,7rem)"><span class="ln"><span class="hl">${c.brand}</span></span><span class="ln"><span class="hl">${c.model}</span></span></h1><p class="price" style="font-size:1.6rem">${fmt(c.price)} <span class="mono">illustrative</span></p></div></section>` +
      S(
        "pad",
        `<div class="row g-5"><div class="col-lg-7 gal"><button class="main" id="gm" aria-label="Open fullscreen gallery">${img(g[0], c.brand + " " + c.model)}</button><div class="th" id="gt">${g.map((k, i) => `<button data-i="${i}" aria-label="Photo ${i + 1}" ${i ? "" : 'aria-current="true"'}>${img(k, "")}</button>`).join("")}</div></div>
<div class="col-lg-5"><span class="lbl">Overview</span><p>${c.desc}</p><div class="row g-3 my-3">${[
          [c.hp, "hp"],
          [c.nm, "Nm"],
          [c.acc, "0–100 s"],
          [c.top, "km/h"],
        ]
          .map(
            (x) =>
              `<div class="col-6"><div class="big">${x[0]}</div><span class="mono">${x[1]}</span></div>`,
          )
          .join("")}</div>
<span class="lbl">Exterior colour</span><div class="sw" id="sw">${c.colors.map((x, i) => `<button style="background:${x.h}" aria-label="${x.n}" aria-pressed="${i == 0}" data-i="${i}"></button>`).join("")}</div><p class="mono" id="cn">Obsidian</p>
<svg viewBox="0 0 400 120" style="width:100%;max-width:360px" role="img" aria-label="Colour preview silhouette"><path id="sil" d="M10 92Q22 62 92 57L142 30Q200 20 262 32L312 57Q380 62 390 92Z" fill="${c.colors[0].h}" stroke="#8B929A"/><circle cx="105" cy="94" r="17" fill="#222"/><circle cx="295" cy="94" r="17" fill="#222"/></svg>
${sel("tr", "Interior trim", c.trims)}<p class="mono">Silhouette shows colour only; photos stay the same.</p>
<div style="display:flex;gap:.6rem;flex-wrap:wrap;margin-top:1rem"><a class="btn-n" href="${L("test-drive")}?id=${c.id}">Test drive</a><button class="btn-n o" id="en">Enquire</button><button class="btn-n o" data-w="${c.id}" aria-pressed="${store.wish().includes(c.id)}">♥ Wishlist</button><button class="btn-n o" data-k="${c.id}" aria-pressed="${store.cmp().includes(c.id)}">⇄ Compare</button></div></div></div>
<dialog id="dg" style="background:#15171A;color:#fff;border:1px solid var(--or);max-width:460px;width:92vw;padding:1.5rem"><h3>Enquire about ${c.model}</h3>${NOTE}<form id="ef" novalidate>${fld("en", "Name")}${fld("ee", "Email", "email")}<button class="btn-n">Send (demo)</button> <button type="button" class="btn-n o" id="ec">Close</button></form></dialog>`,
      ) +
      S(
        "pad light",
        `<div class="row g-5"><div class="col-lg-6"><span class="lbl">Specifications · sample</span><table class="spec">${[
          ["Engine / motor", c.engine],
          ["Power", c.hp + " hp"],
          ["Torque", c.nm + " Nm"],
          ["0–100 km/h", c.acc + " s"],
          ["Top speed", c.top + " km/h"],
          ["Transmission", c.trans],
          ["Drivetrain", c.drive],
          ["Fuel / battery", c.fuel],
          ["Mileage", c.km.toLocaleString("en-IN") + " km"],
          ["Range", c.range ? c.range + " km (est.)" : "N/A"],
          ["Seating", c.seats + " seats"],
          ["Cargo", c.cargo + " L"],
        ]
          .map((r) => `<tr><th scope="row">${r[0]}</th><td>${r[1]}</td></tr>`)
          .join(
            "",
          )}</table></div><div class="col-lg-6"><span class="lbl">Features · sample</span><ul>${c.feat.map((f) => `<li data-aos="fade-up">${f}</li>`).join("")}</ul><p class="mono">Safety and technology items are illustrative, not verified or certified.</p></div></div>`,
      ) +
      (rec.length
        ? S(
            "pad",
            `<span class="lbl">Recently viewed</span><div class="row g-3">${rec.map((id) => `<div class="col-6 col-lg-3"><a class="vc" href="?id=${id}" style="text-decoration:none">${img(car(id).img, car(id).model)}<div class="b"><h3 style="font-size:1rem">${car(id).brand} ${car(id).model}</h3></div></a></div>`).join("")}</div>`,
          )
        : "") +
      S(
        "pad carb",
        `<span class="lbl">Similar vehicles</span><div class="owl-carousel" id="sm">${D.cars
          .filter(
            (x) => x.id !== c.id && (x.type === c.type || x.brand === c.brand),
          )
          .concat(D.cars.filter((x) => x.id !== c.id))
          .filter((x, i, a) => a.indexOf(x) === i)
          .slice(0, 6)
          .map((x) => vcard(x, false))
          .join("")}</div>`,
      )
    );
  };
  R["vehicle-detail"].after = () => {
    const c = window.__c,
      g = window.__g;
    owl("#sm");
    const lst = g.map((k, i) => ({
      k,
      alt: c.brand + " " + c.model + " photo " + (i + 1),
    }));
    $("#gm").onclick = () => lb(lst, 0);
    $("#gt").onclick = (e) => {
      const b = e.target.closest("[data-i]");
      if (!b) return;
      $("#gm").innerHTML = img(g[+b.dataset.i], c.model);
      $$("#gt button").forEach((x) => x.removeAttribute("aria-current"));
      b.setAttribute("aria-current", "true");
    };
    $("#sw").onclick = (e) => {
      const b = e.target.closest("[data-i]");
      if (!b) return;
      const x = c.colors[+b.dataset.i];
      $$("#sw button").forEach((y) => y.setAttribute("aria-pressed", y === b));
      $("#cn").textContent = x.n;
      $("#sil").setAttribute("fill", x.h);
    };
    const d = $("#dg");
    $("#en").onclick = () =>
      d.showModal ? d.showModal() : toast("Enquiry demo");
    $("#ec").onclick = () => d.close();
    $("#ef").onsubmit = (e) => {
      e.preventDefault();
      if (
        V([
          ["en", req("Name")],
          ["ee", em],
        ])
      ) {
        d.close();
        toast("Demo only: no enquiry was sent.");
      }
    };
  };
  // COMPARE
  const ROWS = [
    ["Price", (c) => fmt(c.price), (c) => c.price],
    ["Model year", (c) => c.year, (c) => c.year],
    ["Body style", (c) => c.type, (c) => c.type],
    ["Engine / motor", (c) => c.engine, (c) => c.engine],
    ["Power", (c) => c.hp + " hp", (c) => c.hp],
    ["Torque", (c) => c.nm + " Nm", (c) => c.nm],
    ["0–100 km/h", (c) => c.acc + " s", (c) => c.acc],
    ["Transmission", (c) => c.trans, (c) => c.trans],
    ["Drivetrain", (c) => c.drive, (c) => c.drive],
    [
      "Fuel / EV range",
      (c) => c.fuel + (c.range ? " · " + c.range + " km" : ""),
      (c) => c.fuel + c.range,
    ],
    ["Seating", (c) => c.seats, (c) => c.seats],
    [
      "Cargo",
      (c) => (c.cargo == null ? "N/A" : c.cargo + " L"),
      (c) => c.cargo,
    ],
  ];
  R.compare = () =>
    hero(
      "Compare",
      "Side by side",
      "Up to three vehicles. Sample data.",
      "sedan",
    ) +
    S(
      "pad",
      `<div style="display:flex;gap:1rem;flex-wrap:wrap;align-items:end">${sel("ad", "Add a vehicle", [["", "Choose"], ...carOpts()])}<button class="btn-n" id="adb" style="margin-bottom:1rem">Add</button></div><div id="cp" class="scx"></div>`,
    );
  R.compare.after = () => {
    const draw = () => {
      const ids = store.cmp().filter(car);
      $("#cp").innerHTML =
        ids.length < 1
          ? `<div class="note"><h3>Nothing to compare yet</h3><p>Add vehicles here or from the inventory.</p><a class="btn-n" href="${L("inventory")}">Browse inventory</a></div>`
          : `${ids.length < 2 ? '<p class="note">Add at least one more vehicle to compare.</p>' : ""}<table class="spec cmp"><caption class="mono">Comparison of selected vehicles</caption><thead><tr><th scope="col">Spec</th>${ids
              .map((id, i) => {
                const c = car(id);
                return `<th scope="col" style="min-width:230px;vertical-align:top"><a href="${L("vehicle-detail")}?id=${id}" style="text-decoration:none"><div class="ar" style="--ar:3/2">${img(c.img, c.model)}</div><div style="margin-top:.5rem;font:600 1.1rem var(--head);text-transform:uppercase;color:#fff">${c.brand} ${c.model}</div></a><div style="display:flex;gap:.3rem;margin-top:.4rem"><button class="chip" data-m="${i}" data-dir="-1" ${i == 0 ? "disabled" : ""} aria-label="Move left">←</button><button class="chip" data-m="${i}" data-dir="1" ${i == ids.length - 1 ? "disabled" : ""} aria-label="Move right">→</button><button class="chip" data-r="${id}">Remove</button></div></th>`;
              })
              .join("")}</tr></thead><tbody>${ROWS.map((r) => {
              const vals = ids.map((id) => r[2](car(id)));
              const diff = new Set(vals).size > 1;
              return `<tr><th scope="row" class="${diff ? "d" : ""}">${r[0]}</th>${ids.map((id) => `<td>${r[1](car(id))}</td>`).join("")}</tr>`;
            }).join(
              "",
            )}</tbody></table><p class="mono">Orange edge marks rows where vehicles differ. N/A means not applicable or unavailable, not zero.</p>`;
    };
    $("#cp").onclick = (e) => {
      const r = e.target.closest("[data-r]"),
        m = e.target.closest("[data-m]");
      let a = store.cmp();
      if (r) {
        a = a.filter((x) => x !== r.dataset.r);
      }
      if (m) {
        const i = +m.dataset.m,
          j = i + +m.dataset.dir;
        if (a[j]) {
          [a[i], a[j]] = [a[j], a[i]];
        }
      }
      if (r || m) {
        LS.set("noir-compare", a);
        badges();
        draw();
      }
    };
    $("#adb").onclick = () => {
      const v = $("#ad").value;
      if (!v) return toast("Choose a vehicle first.");
      if (store.cmp().includes(v)) return toast("Already added.");
      toggle("noir-compare", v, 3);
      draw();
    };
    draw();
  };
  // BRANDS
  R.brands = () =>
    hero(
      "Brands",
      "Sample inventory",
      "Brand names are descriptive only. No dealer authorisation or manufacturer partnership is implied.",
      "lux",
    ) +
    S(
      "pad",
      `<div class="field" style="max-width:360px"><label for="bq">Search brands</label><input id="bq" type="search"></div><div class="bx" id="bi" role="group" aria-label="Brand index"></div><div id="bp" style="margin-top:3rem"></div>`,
    ) +
    S(
      "pad carb",
      `<span class="lbl">One from each brand</span><div class="owl-carousel" id="bo2">${[...new Set(D.cars.map((c) => c.brand))].map((b) => vcard(D.cars.filter((c) => c.brand === b)[0], false)).join("")}</div>`,
    );
  R.brands.after = () => {
    const all = [...new Set(D.cars.map((c) => c.brand))];
    let cur = Q.get("b") && all.includes(Q.get("b")) ? Q.get("b") : all[0];
    const d = () => {
      const q = $("#bq").value.toLowerCase(),
        l = all.filter((b) => b.toLowerCase().includes(q));
      $("#bi").innerHTML = l.length
        ? l
            .map(
              (b) =>
                `<button aria-pressed="${b === cur}" data-b="${b}">${b}</button>`,
            )
            .join("")
        : '<p class="note">No brands match.</p>';
      const cs = D.cars.filter((c) => c.brand === cur),
        top = [...cs].sort((a, b) => b.price - a.price)[0];
      $("#bp").innerHTML =
        `<span class="lbl">${cur} · ${cs.length} in sample inventory</span><div class="row g-3">${cs.map((c) => vcard(c).replace('class="vcw"', 'class="vcw col-md-6 col-xl-4"')).join("")}</div><p style="margin-top:1.5rem"><a class="btn-n" href="${L("inventory")}?brand=${encodeURIComponent(cur)}">View matching vehicles</a></p>`;
    };
    $("#bi").onclick = (e) => {
      const b = e.target.closest("[data-b]");
      if (b) {
        cur = b.dataset.b;
        d();
      }
    };
    $("#bq").oninput = d;
    owl("#bo2");
    d();
  };
  // FINANCE
  R.finance = () =>
    hero(
      "Finance",
      "Ownership",
      "Illustrative calculator only. Not a loan offer, approval or financial advice.",
      "gt",
    ) +
    S(
      "pad",
      `<div class="row g-5"><div class="col-lg-6"><span class="lbl">Instalment calculator</span>${sel("cv", "Vehicle", [["", "Custom price"], ...carOpts()])}${fld("cp2", "Vehicle price (₹)", "number", 'value="20000000" min="0"')}<div class="field"><label for="dp">Down payment: <span id="dpv"></span></label><input id="dp" type="range" min="0" max="80" step="5" value="20"></div>${sel(
        "tm",
        "Term",
        [
          ["12", "12 months"],
          ["24", "24 months"],
          ["36", "36 months"],
          ["48", "48 months"],
          ["60", "60 months"],
          ["84", "84 months"],
        ],
        "60",
      )}${fld("rt", "Annual interest rate (%)", "number", 'value="9" min="0" max="30" step="0.1"')}</div>
<div class="col-lg-6"><div class="carb p-4" style="border:1px solid var(--graph)"><span class="mono">Estimated monthly instalment</span><div class="big" id="emi" aria-live="polite">—</div><table class="spec"><tr><th>Financed amount</th><td id="fa">—</td></tr><tr><th>Total payable</th><td id="tp">—</td></tr><tr><th>Total interest</th><td id="ti">—</td></tr></table><div class="err" id="fe" role="alert"></div><p class="note">Assumes a standard amortising loan, fixed rate, monthly payments, no fees or taxes. Illustrative only.</p></div></div></div>`,
    ) +
    S(
      "pad light",
      `<span class="lbl">Sample offers</span><div class="row g-3">${D.offers.map((o, i) => `<div class="col-md-4"><div class="vc p-4"><div class="ar mb-3" style="--ar:3/2">${img(["sport", "lux", "gt"][i], o.n)}</div><h3>${o.n}</h3><p class="mono">${o.t}</p><p>${o.d}</p></div></div>`).join("")}</div>`,
    ) +
    S(
      "pad",
      `<div class="row g-5"><div class="col-lg-5"><span class="lbl">Trade-in enquiry</span><form id="tf" novalidate>${NOTE}${fld("tn", "Name")}${fld("te", "Email", "email")}${fld("tc", "Your car (make, model, year)")}<button class="btn-n">Send enquiry (demo)</button></form><p id="tok" role="status"></p></div><div class="col-lg-6 offset-lg-1"><span class="lbl">FAQ</span>${faq("ff", D.faq)}<p style="margin-top:1.5rem"><a class="btn-n o" href="${L("contact")}">Contact finance team</a></p></div></div>`,
    );
  R.finance.after = () => {
    const g = (id) => $("#" + id);
    const calc = () => {
      const price = parseFloat(g("cp2").value),
        dp = +g("dp").value,
        n = +g("tm").value,
        rate = parseFloat(g("rt").value);
      g("dpv").textContent = dp + "%";
      const e = g("fe");
      e.textContent = "";
      const out = ["emi", "fa", "tp", "ti"];
      if (!(price > 0) || price > 1e9 || isNaN(rate) || rate < 0 || rate > 30) {
        out.forEach((i) => (g(i).textContent = "—"));
        e.textContent =
          !(price > 0) || price > 1e9
            ? "Enter a vehicle price between 1 and 1,000,000,000."
            : "Interest rate must be between 0 and 30%.";
        return;
      }
      const P = price * (1 - dp / 100),
        r = rate / 1200;
      const emi =
        P === 0
          ? 0
          : r === 0
            ? P / n
            : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const tot = emi * n;
      g("emi").textContent = fmt(emi);
      g("fa").textContent = fmt(P);
      g("tp").textContent = fmt(tot);
      g("ti").textContent = fmt(tot - P);
    };
    g("cv").onchange = () => {
      const c = car(g("cv").value);
      if (c) g("cp2").value = c.price;
      calc();
    };
    ["cp2", "dp", "tm", "rt"].forEach((i) =>
      g(i).addEventListener("input", calc),
    );
    calc();
    g("tf").onsubmit = (e) => {
      e.preventDefault();
      if (
        V([
          ["tn", req("Name")],
          ["te", em],
          ["tc", req("Car details")],
        ])
      )
        g("tok").textContent = "Demo only: nothing was sent.";
    };
  };
  // TEST DRIVE
  R["test-drive"] = () =>
    hero(
      "Test|drive",
      "Request",
      "Demo form: it does not reserve a real appointment.",
      "sport",
    ) +
    S(
      "pad",
      `<div class="row g-5"><div class="col-lg-6"><form id="f" novalidate>${NOTE}${sel("v", "Vehicle", carOpts(), car(Q.get("id")) ? Q.get("id") : "car-001")}${fld("n", "Full name")}${fld("e", "Email", "email")}${fld("p", "Phone", "tel")}${fld("d", "Preferred date", "date", `min="${today()}"`)}${sel("t", "Time slot", ["10:00", "12:00", "14:00", "16:00", "18:00"])}${sel("s", "Showroom", ["Sample Showroom North (fictional)", "Sample Showroom South (fictional)"])}<div class="field"><label for="no">Notes (optional)</label><textarea id="no" rows="3"></textarea></div>${chk("I understand this is a demo and no appointment is made.")}<button class="btn-n">Review request</button></form><div id="ok" hidden></div></div><div class="col-lg-5 offset-lg-1"><span class="lbl">What to expect</span><p>A short briefing, a drive on a sample route and time to ask questions. All fictional.</p><div class="ar mt-4" style="--ar:4/3">${img("sport", "Sports car on the road")}</div></div></div>`,
    );
  R["test-drive"].after = () => {
    $("#f").onsubmit = (e) => {
      e.preventDefault();
      if (
        !V([
          ["n", req("Name")],
          ["e", em],
          ["p", ph],
          [
            "d",
            (v) =>
              !v
                ? "Choose a date."
                : v < today()
                  ? "Date cannot be in the past."
                  : "",
          ],
          ["cons", (v) => (v ? "" : "Please tick to continue.")],
        ])
      )
        return;
      const c = car($("#v").value),
        ref = "NM-DEMO-" + Math.random().toString(36).slice(2, 8).toUpperCase();
      $("#f").hidden = true;
      $("#ok").hidden = false;
      $("#ok").innerHTML =
        `<span class="lbl">Demo summary</span><h2>${ref}</h2><p>${c.brand} ${c.model}<br>${$("#d").value} at ${$("#t").value}<br>${$("#s").value}</p><p class="note">No appointment was reserved and the dealership has not received this.</p><button class="btn-n o" id="rs">Reset form</button>`;
      $("#rs").onclick = () => {
        $("#f").reset();
        $("#f").hidden = false;
        $("#ok").hidden = true;
      };
    };
  };
  // SHOWROOM
  R.showroom = () =>
    hero(
      "The|showroom",
      "Showroom &amp; services",
      "Fictional location and details for demonstration.",
      "showroom",
    ) +
    S(
      "pad",
      `<div class="row g-5"><div class="col-lg-5"><span class="lbl">Visit</span><p class="mono">Sample showroom, fictional address<br>Mon–Sat 10:00–19:00 · Sun by appointment (sample)</p><p>Vehicle inspection, consultation, sourcing and trade-in evaluation, described as intended services.</p></div><div class="col-lg-7"><div class="owl-carousel" id="sg">${["showroom", "editorial", "interior", "hero"].map((k, i) => `<div data-i="${i}" style="cursor:zoom-in">${img(k, "Showroom photo " + (i + 1)).replace('class="fill"', 'class="fill" style="aspect-ratio:16/10"')}</div>`).join("")}</div></div></div>`,
    ) +
    S(
      "pad light",
      `<div class="row g-4">${[
        [
          "Inspection",
          "A documented walk-through of condition and history (brand intent).",
        ],
        ["Consultation", "Plain-language guidance on trade-offs."],
        ["Sourcing", "Tell us what you want and we look."],
        ["Trade-in", "An appraisal enquiry (demo)."],
        ["Ownership support", "General after-sales information (sample)."],
      ]
        .map(
          (s, i) =>
            `<div class="col-md-4" data-aos="fade-up"><div class="ar mb-3" style="--ar:3/2">${img(["dash", "editorial", "showroom", "sport", "interior"][i], s[0])}</div><h3>${s[0]}</h3><p>${s[1]}</p></div>`,
        )
        .join("")}</div>`,
    ) +
    S(
      "pad",
      `<div class="row g-5"><div class="col-lg-6"><span class="lbl">Showroom enquiry</span><form id="sf" novalidate>${NOTE}${fld("sn", "Name")}${fld("se", "Email", "email")}${sel("st", "Enquiry type", ["Request a visit", "Vehicle sourcing", "Trade-in evaluation", "Inspection"])}<div class="field"><label for="sm2">Message</label><textarea id="sm2" rows="3"></textarea><div class="err" id="e-sm2" role="alert"></div></div><button class="btn-n">Send (demo)</button></form><p id="sok" role="status"></p></div><div class="col-lg-6"><span class="lbl">FAQ</span>${faq(
        "sq",
        [
          [
            "Do I need an appointment?",
            "Sample policy: walk-ins welcome during opening hours.",
          ],
          ["Can you source a car?", "This demo describes the service only."],
          ["Are prices final?", "No. All prices are illustrative."],
        ],
      )}</div></div>`,
    );
  R.showroom.after = () => {
    owl("#sg", {
      responsive: { 0: { items: 1 }, 900: { items: 1 } },
      items: 1,
    });
    const l = ["showroom", "editorial", "interior", "hero"].map((k, i) => ({
      k,
      alt: "Showroom photo " + (i + 1),
    }));
    $("#sg").onclick = (e) => {
      const d = e.target.closest("[data-i]");
      if (d) lb(l, +d.dataset.i);
    };
    $("#sf").onsubmit = (e) => {
      e.preventDefault();
      if (
        V([
          ["sn", req("Name")],
          ["se", em],
          ["sm2", req("Message")],
        ])
      )
        $("#sok").textContent = "Demo only: nothing was sent.";
    };
  };
  // ABOUT
  R.about = () =>
    hero(
      "Precision,|explained",
      "About Noir Motors",
      "Fictional brand story for demonstration.",
      "editorial",
    ) +
    S(
      "pad",
      `<div class="row g-5"><div class="col-lg-5"><span class="lbl">Philosophy</span><h2>Honest cars. Clear answers.</h2></div><div class="col-lg-6 offset-lg-1"><p>Noir Motors was imagined by a small team who wanted to buy cars the way engineers read them: with data, patience and no theatre.</p><p>Our standards below describe intent, not certifications.</p><div class="ar mt-4" style="--ar:16/9">${img("showroom", "The Noir Motors showroom")}</div></div></div>`,
    ) +
    S(
      "pad light",
      `<span class="lbl">Curation process</span><div class="row g-4">${[
        ["01", "Source", "Provenance first."],
        ["02", "Inspect", "Documented checks."],
        ["03", "Present", "Plain specs and honest condition."],
      ]
        .map(
          (s, i) =>
            `<div class="col-md-4" data-aos="fade-up"><div class="ar mb-3" style="--ar:3/2">${img(["gt", "dash", "editorial"][i], s[1])}</div><div class="big">${s[0]}</div><h3>${s[1]}</h3><p>${s[2]}</p></div>`,
        )
        .join("")}</div>`,
    ) +
    S(
      "pad",
      `<div class="row g-5 align-items-center"><div class="col-lg-6"><span class="lbl">Timeline · fictional</span><div class="tl">${[
        ["2012", "A two-person garage and a shared spreadsheet"],
        ["2016", "First showroom opens"],
        ["2020", "Online comparison tools launch"],
        ["2024", "Collection expands to six brands"],
      ]
        .map((t) => `<div class="it"><h3>${t[0]}</h3><p>${t[1]}</p></div>`)
        .join(
          "",
        )}</div></div><div class="col-lg-5 offset-lg-1"><div class="ar" style="--ar:4/5">${img("track", "A car on a dark road")}</div></div></div>`,
    ) +
    S(
      "pad carb",
      `<span class="lbl">Team · fictional roles</span><div class="row g-4">${[
        ["Head of curation", "AR"],
        ["Technical lead", "KM"],
        ["Client advisor", "SN"],
      ]
        .map(
          (t, i) =>
            `<div class="col-md-4"><div class="ar" style="--ar:1">${img("p" + (i + 1), t[0])}</div><h3 style="margin-top:.6rem;font-size:1.1rem">${t[0]}</h3></div>`,
        )
        .join("")}</div>`,
    ) +
    `<section class="pad light cta-band"><div class="wx"><h2>See the <b>collection.</b></h2><a class="btn-n" href="${L("inventory")}">View inventory</a></div></section>`;
  // CONTACT
  R.contact = () =>
    hero(
      "Contact",
      "Talk to us",
      "Frontend demo: messages are not sent.",
      "hero",
    ) +
    S(
      "pad",
      `<div class="row g-5"><div class="col-lg-6"><form id="cf" novalidate>${NOTE}${sel("cs", "Category", ["Sales", "Finance", "Test drive", "Service", "Other"])}${fld("cn", "Name")}${fld("ce", "Email", "email")}${fld("cp", "Phone (optional)", "tel")}<div class="field"><label for="cm">Message</label><textarea id="cm" rows="4" maxlength="500"></textarea><div class="mono"><span id="cc">0</span>/500</div><div class="err" id="e-cm" role="alert"></div></div><button class="btn-n">Send (demo)</button></form><p id="cok" role="status"></p></div><div class="col-lg-5 offset-lg-1"><div class="ar mb-4" style="--ar:16/9">${img("showroom", "Noir Motors showroom")}</div><span class="lbl">Showroom · demo</span><p class="mono">Sample address, fictional<br>sales@example.com · +00 000 000 0000</p><svg viewBox="0 0 400 220" style="width:100%;border:1px solid var(--graph)" role="img" aria-label="Static illustrative map"><g stroke="#25292E" stroke-width="2" fill="none"><path d="M0 80H400M0 150H400M100 0V220M260 0V220"/></g><path d="M0 200Q150 120 400 60" stroke="#F15A24" stroke-width="3" fill="none"/><rect x="250" y="70" width="20" height="20" fill="#F15A24"/></svg><p class="mono">Static illustration, not a live map.</p><p class="mono">Social: Instagram, YouTube (placeholders, no links)</p></div></div>`,
    ) +
    S(
      "pad carb",
      `<span class="lbl">FAQ</span>${faq("cq", [
        ["Is inventory live?", "No, it is all sample data."],
        ["Can I really book a test drive?", "No. The form is a demo."],
        ["How do I reach finance?", "Use the contact form (demo)."],
      ])}`,
    );
  R.contact.after = () => {
    $("#cm").oninput = (e) => ($("#cc").textContent = e.target.value.length);
    $("#cf").onsubmit = (e) => {
      e.preventDefault();
      if (
        V([
          ["cn", req("Name")],
          ["ce", em],
          ["cp", (v) => (v ? ph(v) : "")],
          [
            "cm",
            (v) =>
              v.length < 10 ? "Message must be at least 10 characters." : "",
          ],
        ])
      ) {
        $("#cok").textContent = "Demo only: nothing was sent.";
        $("#cf").reset();
        $("#cc").textContent = 0;
      }
    };
  };
  R["404"] = () =>
    `<section class="hero"><div class="bgf px">${img("track", "A car on a dark road", true)}</div><div class="wx" style="text-align:center"><div class="big404"><span class="ln"><span class="hl">404</span></span></div><div class="road"></div><h2>Wrong turn.</h2><p style="margin:0 auto 1.5rem">This route does not exist. Head back to the road.</p><a class="btn-n" href="${L("index")}">Return home</a> <a class="btn-n o" href="${L("inventory")}">Browse inventory</a></div></section>`;
  M.innerHTML = R[pg]();
  if (R[pg].after) R[pg].after();
  motion();
})();
