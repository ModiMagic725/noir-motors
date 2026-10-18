(function () {
  const D = window.NM,
    B = document.body,
    root = B.dataset.root || "",
    pg = B.dataset.page;
  const $ = (s, c = document) => c.querySelector(s),
    $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const L = (p) =>
    p === "index"
      ? root + "index.html"
      : (root === "" ? "html/" : "") + p + ".html";
  const fmt = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
  const LS = {
    get: (k, d) => {
      try {
        const v = localStorage.getItem(k);
        return v ? JSON.parse(v) : d;
      } catch (e) {
        return d;
      }
    },
    set: (k, v) => {
      try {
        localStorage.setItem(k, JSON.stringify(v));
      } catch (e) {}
    },
  };
  const SCN = {
      interior: "in",
      dash: "in",
      showroom: "sh",
      editorial: "wh",
      p1: "pt",
      p2: "pt",
      p3: "pt",
    },
    TYP = {
      v3: "suv",
      v6: "suv",
      v10: "suv",
      suv: "suv",
      v2: "sed",
      v9: "sed",
      sedan: "sed",
    };
  function art(k) {
    const bg = `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#191D22"/><stop offset="1" stop-color="#0B0D10"/></linearGradient><linearGradient id="m" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#C3C8CE" stop-opacity="0"/><stop offset=".5" stop-color="#C3C8CE" stop-opacity=".8"/><stop offset="1" stop-color="#C3C8CE" stop-opacity="0"/></linearGradient></defs><rect width="1600" height="1000" fill="url(#g)"/>`;
    let b;
    const s = SCN[k];
    if (s === "in") {
      b = `<circle cx="800" cy="620" r="250" fill="none" stroke="#737C86" stroke-width="26"/><circle cx="800" cy="620" r="60" fill="#232830" stroke="#C3C8CE" stroke-width="4"/><path d="M550 620H1050M800 620V860" stroke="#737C86" stroke-width="22"/><path d="M200 420Q800 300 1400 420" stroke="#D96C3F" stroke-width="4" fill="none"/><rect x="0" y="880" width="1600" height="120" fill="#0B0D10"/>`;
    } else if (s === "sh") {
      b =
        `<path d="M0 1000L560 560H1040L1600 1000Z" fill="#14171B"/>` +
        [0, 1, 2, 3, 4, 5]
          .map(
            (i) =>
              `<path d="M${800 + (i - 2.5) * 220} 560L${800 + (i - 2.5) * 620} 1000" stroke="#232830" stroke-width="3"/>`,
          )
          .join("") +
        `<rect x="300" y="120" width="1000" height="6" fill="url(#m)"/><rect x="420" y="220" width="760" height="4" fill="url(#m)" opacity=".6"/><path d="M420 720L470 660Q640 620 800 610T1140 660L1180 720Z" fill="#232830" stroke="#737C86"/>`;
    } else if (s === "wh") {
      b =
        `<circle cx="800" cy="520" r="330" fill="#191D22" stroke="#C3C8CE" stroke-width="10"/>` +
        [0, 1, 2, 3, 4, 5, 6, 7]
          .map(
            (i) =>
              `<path d="M800 520L${800 + 300 * Math.cos((i * Math.PI) / 4)} ${520 + 300 * Math.sin((i * Math.PI) / 4)}" stroke="#737C86" stroke-width="22"/>`,
          )
          .join("") +
        `<circle cx="800" cy="520" r="60" fill="#D96C3F"/>`;
    } else if (s === "pt") {
      b = `<circle cx="800" cy="400" r="170" fill="#232830" stroke="#C3C8CE" stroke-opacity=".5" stroke-width="4"/><path d="M380 1000Q380 640 800 640T1220 1000Z" fill="#232830" stroke="#C3C8CE" stroke-opacity=".5" stroke-width="4"/>`;
    } else {
      const t = TYP[k] || "cp",
        P = {
          cp: "M200 700L240 640Q300 600 480 580L640 470Q760 420 940 430L1120 470Q1260 520 1340 580L1400 640L1410 700Z",
          sed: "M200 700L230 630Q300 600 460 585L600 480Q720 420 940 425L1080 440Q1200 500 1280 560L1380 600L1410 700Z",
          suv: "M200 700L215 600Q240 560 380 545L470 440Q560 380 900 380L1120 395Q1260 470 1320 545L1400 580L1410 700Z",
        }[t];
      b = `<ellipse cx="800" cy="760" rx="640" ry="40" fill="#000" opacity=".5"/><path d="${P}" fill="#232830" stroke="#C3C8CE" stroke-opacity=".5" stroke-width="3"/><path d="${P}" fill="url(#m)" opacity=".25" transform="translate(0 -12)"/><path d="M620 480Q760 440 930 445L1090 480L1180 540H560Z" fill="#0B0D10" opacity=".8"/><circle cx="440" cy="700" r="76" fill="#0B0D10" stroke="#737C86" stroke-width="6"/><circle cx="1180" cy="700" r="76" fill="#0B0D10" stroke="#737C86" stroke-width="6"/><circle cx="440" cy="700" r="34" fill="#737C86"/><circle cx="1180" cy="700" r="34" fill="#737C86"/><path d="M1330 590L1395 640" stroke="#D96C3F" stroke-width="8"/>`;
    }
    return (
      "data:image/svg+xml;charset=utf-8," +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">${bg}${b}</svg>`,
      )
    );
  }
  const TW = (k) => D.img[k] || [];
  window.nmErr = (el) => {
    const l = TW(el.dataset.k),
      i = (+el.dataset.i || 0) + 1;
    if (i < l.length) {
      el.dataset.i = i;
      el.src = l[i].replace("w=1600", el.dataset.w || "w=1600");
      return;
    }
    el.onerror = null;
    el.dataset.art = 1;
    el.src = art(el.dataset.k);
  };
  const img = (k, alt = "", eager) => {
    const l = TW(k),
      w = eager ? "w=1600" : "w=900";
    return `<span class="fill"><img data-k="${k}" data-w="${w}" src="${(l[0] || "").replace("w=1600", w)}" alt="${alt}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" referrerpolicy="no-referrer" onerror="nmErr(this)"></span>`;
  };
  setTimeout(
    () =>
      $$("img[data-k]").forEach((i) => {
        if (
          !i.complete &&
          !i.dataset.art &&
          (i.loading !== "lazy" ||
            i.getBoundingClientRect().top < innerHeight * 2)
        )
          window.nmErr(i);
      }),
    9000,
  );
  const toast = (m) => {
    const t = $("#toast");
    t.textContent = m;
    t.classList.add("on");
    clearTimeout(toast.i);
    toast.i = setTimeout(() => t.classList.remove("on"), 3400);
  };
  // stores
  const store = {
    cmp: () => LS.get("noir-compare", []),
    wish: () => LS.get("noir-wish", []),
    rec: () => LS.get("noir-recent", []),
  };
  function toggle(key, id, max) {
    let a = LS.get(key, []);
    if (a.includes(id)) a = a.filter((x) => x !== id);
    else {
      if (max && a.length >= max) {
        toast(`You can compare up to ${max} vehicles.`);
        return false;
      }
      a.push(id);
    }
    LS.set(key, a);
    badges();
    return a.includes(id);
  }
  function badges() {
    const c = store.cmp().length,
      w = store.wish().length;
    $$(".bc").forEach((e) => (e.textContent = c));
    $$(".bw").forEach((e) => (e.textContent = w));
  }
  const nav = [
    ["inventory", "Inventory"],
    ["compare", "Compare"],
    ["brands", "Brands"],
    ["finance", "Finance"],
    ["showroom", "Showroom"],
    ["about", "About"],
    ["contact", "Contact"],
  ];
  $("#top").innerHTML =
    `<header id="nav"><div class="wx in"><a class="brand" href="${L("index")}" aria-label="Noir Motors home">NOIR<b>/</b>MOTORS</a><button class="bg" id="bo" aria-expanded="false" aria-controls="mn">MENU</button>
<ul class="menu" id="mn"><li><button class="bg" id="bx" style="display:block;margin-bottom:1rem">CLOSE</button></li>${nav.map((n) => `<li><a href="${L(n[0])}" ${pg === n[0] ? 'aria-current="page"' : ""}>${n[1]}${n[0] === "compare" ? '<span class="badge-n bc">0</span>' : ""}</a></li>`).join("")}</ul>
<a class="btn-n cta-n" href="${L("test-drive")}">Test drive</a></div></header>`;
  $("#foot").innerHTML =
    `<footer class="f"><div class="wx"><div class="row g-5"><div class="col-lg-4"><a class="brand" href="${L("index")}">NOIR<b>/</b>MOTORS</a><p class="mono" style="margin-top:1rem">The art of the drive.</p><form id="nl" novalidate><div class="field"><label for="nle">Newsletter</label><input id="nle" type="email" placeholder="Email"><div class="err" id="nler" role="alert"></div></div><button class="btn-n o" type="submit">Subscribe (demo)</button></form></div>
<div class="col-6 col-lg-2"><span class="lbl">Inventory</span><ul><li><a href="${L("inventory")}">All vehicles</a></li><li><a href="${L("compare")}">Compare</a></li><li><a href="${L("brands")}">Brands</a></li></ul></div>
<div class="col-6 col-lg-2"><span class="lbl">Services</span><ul><li><a href="${L("finance")}">Finance</a></li><li><a href="${L("test-drive")}">Test drive</a></li><li><a href="${L("showroom")}">Showroom</a></li></ul></div>
<div class="col-lg-4"><span class="lbl">Contact · demo</span><p class="mono">Sample showroom, fictional address<br>sales@example.com · +00 000 000 0000</p><p class="mono"><a href="${L("contact")}">Contact</a> · <a href="${L("about")}">About</a></p></div></div>
<p class="mono" style="margin-top:2.5rem">Sample data. Inventory, prices and specifications are illustrative. Brand names are descriptive only; no manufacturer affiliation. Sample legal text must be replaced before real use.</p></div></footer><div id="toast" role="status" aria-live="polite"></div>`;
  $("#nl").onsubmit = (e) => {
    e.preventDefault();
    const ok = /^\S+@\S+\.\S+$/.test($("#nle").value);
    $("#nler").textContent = ok ? "" : "Enter a valid email address.";
    if (ok) {
      toast("Demo: no subscription was created.");
      $("#nl").reset();
    }
  };
  const hd = $("#nav"),
    mn = $("#mn");
  const sc = () =>
    hd.classList.toggle("solid", scrollY > 50 || B.dataset.solid === "1");
  sc();
  addEventListener("scroll", sc, { passive: true });
  const sm = (o) => {
    mn.classList.toggle("open", o);
    $("#bo").setAttribute("aria-expanded", o);
    if (o) $("#bx").focus();
  };
  $("#bo").onclick = () => sm(true);
  $("#bx").onclick = () => sm(false);
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") sm(false);
  });
  // lightbox
  let li = 0,
    ll = [];
  function show(i) {
    li = (i + ll.length) % ll.length;
    $("#lb .stage").innerHTML = img(ll[li].k, ll[li].alt, true);
  }
  function lb(list, i) {
    ll = list;
    let el = $("#lb");
    if (!el) {
      B.insertAdjacentHTML(
        "beforeend",
        '<div id="lb" role="dialog" aria-modal="true" aria-label="Image viewer"><div class="stage"></div><button class="p" aria-label="Previous">‹</button><button class="n" aria-label="Next">›</button><button class="c" aria-label="Close">×</button></div>',
      );
      el = $("#lb");
      el.querySelector(".p").onclick = () => show(li - 1);
      el.querySelector(".n").onclick = () => show(li + 1);
      el.querySelector(".c").onclick = () => el.classList.remove("on");
      el.onclick = (e) => {
        if (e.target === el) el.classList.remove("on");
      };
      addEventListener("keydown", (e) => {
        if (!el.classList.contains("on")) return;
        if (e.key === "Escape") el.classList.remove("on");
        if (e.key === "ArrowLeft") show(li - 1);
        if (e.key === "ArrowRight") show(li + 1);
      });
    }
    el.classList.add("on");
    show(i);
    el.querySelector(".c").focus();
  }
  const owl = (s, o) => {
    if (window.jQuery && jQuery.fn.owlCarousel) {
      jQuery(s).each(function () {
        const $e = jQuery(this);
        if (!$e.hasClass("owl-loaded"))
          $e.owlCarousel(
            Object.assign(
              {
                margin: 20,
                nav: true,
                dots: true,
                navText: ["‹", "›"],
                autoplayHoverPause: true,
                responsive: {
                  0: { items: 1, stagePadding: 32 },
                  700: { items: 2 },
                  1100: { items: 3 },
                },
              },
              o || {},
            ),
          );
      });
    } else $$(s).forEach((e) => e.classList.add("no-owl"));
  };
  function motion() {
    if (window.AOS) AOS.init({ once: true, duration: 800, disable: rm });
    else $$("[data-aos]").forEach((e) => e.removeAttribute("data-aos"));
    addEventListener("load", () => {
      window.AOS && AOS.refreshHard();
      window.ScrollTrigger && ScrollTrigger.refresh();
    });
    if (!window.gsap || rm) return;
    gsap.from(".hl", {
      yPercent: 105,
      duration: 1.1,
      stagger: 0.12,
      ease: "power3.out",
      clearProps: "all",
    });
    if (!window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    if (matchMedia("(min-width:992px)").matches)
      $$(".px img").forEach((i) =>
        gsap.fromTo(
          i,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: { trigger: i.parentNode, scrub: true },
          },
        ),
      );
    $$(".rv").forEach((e) =>
      gsap.fromTo(
        e,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.1,
          ease: "power3.out",
          clearProps: "clipPath",
          scrollTrigger: { trigger: e, start: "top 88%", once: true },
        },
      ),
    );
    $$(".tl .it").forEach((e) =>
      gsap.from(e, {
        opacity: 0,
        x: -16,
        duration: 0.8,
        scrollTrigger: { trigger: e, start: "top 90%", once: true },
      }),
    );
  }
  const car = (id) => D.cars.find((c) => c.id === id);
  const vcard = (c, tools = true) => {
    const w = store.wish().includes(c.id),
      k = store.cmp().includes(c.id),
      n = c.id.replace("car-", "NM—");
    return `<div class="vcw"><article class="vc zoom"><div class="tools">${tools ? `<button data-w="${c.id}" aria-pressed="${w}" aria-label="Wishlist ${c.model}" title="Wishlist">♥</button><button data-k="${c.id}" aria-pressed="${k}" aria-label="Compare ${c.model}" title="Compare">⇄</button>` : ""}</div><a href="${L("vehicle-detail")}?id=${c.id}" aria-label="${c.brand} ${c.model}" style="text-decoration:none">${img(c.img, c.brand + " " + c.model)}</a><div class="b"><div class="vh"><span class="mono">${n}</span><span class="mono">${c.year} · ${c.type}</span></div><h3>${c.brand} <b>${c.model}</b></h3><dl class="led"><div><dt>Power</dt><dd>${c.hp} hp</dd></div><div><dt>0–100</dt><dd>${c.acc} s</dd></div><div><dt>${c.fuel === "Electric" ? "Range" : "Mileage"}</dt><dd>${c.fuel === "Electric" && c.range ? c.range + " km" : c.km.toLocaleString("en-IN") + " km"}</dd></div><div><dt>Drive</dt><dd>${c.drive}</dd></div></dl><div class="vf"><span class="price">${fmt(c.price)}</span><a class="lnk" href="${L("vehicle-detail")}?id=${c.id}">View vehicle</a></div></div></article></div>`;
  };
  document.addEventListener("click", (e) => {
    const w = e.target.closest("[data-w]"),
      k = e.target.closest("[data-k]");
    if (w) {
      const on = toggle("noir-wish", w.dataset.w);
      w.setAttribute("aria-pressed", on);
      toast(on ? "Saved to wishlist" : "Removed from wishlist");
    }
    if (k) {
      const on = toggle("noir-compare", k.dataset.k, 3);
      k.setAttribute("aria-pressed", on);
      if (on) toast("Added to compare");
    }
  });
  badges();
  window.A = {
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
    root,
  };
})();
