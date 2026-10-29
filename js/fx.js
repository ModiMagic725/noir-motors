/* NOIR MOTORS fx.js — original, dependency-free effects layer.
   Loads after pages.js. Everything is progressive enhancement:
   no WebGL / mobile / touch / reduced-motion => site behaves exactly as before. */
(function () {
  const $ = (s, c = document) => c.querySelector(s);
  if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
  const wide = matchMedia("(min-width:992px)").matches;

  /* 1. Pointer-lit vehicle cards + magnetic buttons (desktop pointers only) */
  if (fine) {
    let mag = null;
    const rel = () => {
      if (mag) mag.style.transform = "";
      mag = null;
    };
    document.addEventListener(
      "pointermove",
      (e) => {
        const t = e.target;
        if (!t.closest) return;
        const c = t.closest(".vc");
        if (c) {
          const r = c.getBoundingClientRect();
          c.style.setProperty("--mx", e.clientX - r.left + "px");
          c.style.setProperty("--my", e.clientY - r.top + "px");
        }
        const b = t.closest(".btn-n");
        if (b !== mag) rel();
        if (b) {
          mag = b;
          const r = b.getBoundingClientRect();
          b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.12}px,${(e.clientY - r.top - r.height / 2) * 0.25}px)`;
        }
      },
      { passive: true },
    );
    document.addEventListener("pointerleave", rel);
  }

  /* 2. Home hero: raw-WebGL light-sweep (no Three.js needed; one draw call) */
  const hr = $("#hr");
  if (!hr || !wide || !fine) return;
  const cv = document.createElement("canvas");
  cv.className = "fxc";
  cv.setAttribute("aria-hidden", "true");
  const gl = cv.getContext("webgl", {
    antialias: false,
    alpha: false,
    powerPreference: "low-power",
  });
  if (!gl) return;
  const VS = "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";
  const FS = `precision mediump float;uniform vec2 r,m;uniform float t;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
void main(){
  vec2 uv=gl_FragCoord.xy/r;vec2 p=uv-.5;p.x*=r.x/r.y;p+=(m-.5)*.07;
  float c=cos(.55),s=sin(.55);vec2 q=vec2(c*p.x+s*p.y,-s*p.x+c*p.y);
  float v=0.;
  for(int i=0;i<3;i++){float f=float(i);
    float x=q.x+.55*sin(t*.09+f*2.1)-.3+f*.42;float w=.035+.03*f;
    v+=exp(-x*x/(w*w))*(.55-.14*f);}
  v*=smoothstep(-.7,.25,q.y)*(.5+.5*uv.x);
  vec3 col=mix(vec3(.76,.78,.81),vec3(.85,.42,.25),smoothstep(.25,1.,v))*v*.3;
  col+=(h(gl_FragCoord.xy+fract(t)*60.)-.5)*.03;
  gl_FragColor=vec4(max(col,0.),1.);}`;
  const sh = (ty, src) => {
    const o = gl.createShader(ty);
    gl.shaderSource(o, src);
    gl.compileShader(o);
    return gl.getShaderParameter(o, gl.COMPILE_STATUS) ? o : null;
  };
  const vs = sh(gl.VERTEX_SHADER, VS),
    fs = sh(gl.FRAGMENT_SHADER, FS);
  if (!vs || !fs) return;
  const p = gl.createProgram();
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) return;
  gl.useProgram(p);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const a = gl.getAttribLocation(p, "a");
  gl.enableVertexAttribArray(a);
  gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);
  const ur = gl.getUniformLocation(p, "r"),
    um = gl.getUniformLocation(p, "m"),
    ut = gl.getUniformLocation(p, "t");
  let mx = 0.5, my = 0.5, tx = 0.5, ty = 0.5, on = true, raf = 0;
  const t0 = performance.now();
  const size = () => {
    cv.width = Math.max(2, (hr.clientWidth * 0.5) | 0); // half-res: soft light, cheap
    cv.height = Math.max(2, (hr.clientHeight * 0.5) | 0);
    gl.viewport(0, 0, cv.width, cv.height);
  };
  const frame = (now) => {
    raf = 0;
    if (!on || document.hidden) return;
    mx += (tx - mx) * 0.05;
    my += (ty - my) * 0.05;
    gl.uniform2f(ur, cv.width, cv.height);
    gl.uniform2f(um, mx, my);
    gl.uniform1f(ut, (now - t0) / 1000);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    raf = requestAnimationFrame(frame);
  };
  const go = () => {
    if (!raf && on && !document.hidden) raf = requestAnimationFrame(frame);
  };
  hr.insertBefore(cv, $(".wx", hr));
  size();
  addEventListener("resize", size);
  hr.addEventListener(
    "pointermove",
    (e) => {
      const r = hr.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width;
      ty = 1 - (e.clientY - r.top) / r.height;
    },
    { passive: true },
  );
  new IntersectionObserver(([e]) => {
    on = e.isIntersecting;
    go();
  }).observe(hr);
  document.addEventListener("visibilitychange", go);
  cv.addEventListener("webglcontextlost", (e) => {
    e.preventDefault();
    on = false;
    cv.remove();
  });
  go();
  requestAnimationFrame(() => cv.classList.add("on"));
})();
