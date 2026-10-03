(() => {
  "use strict";

  const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const CHAVE = "jardim-aberto";
  // A senha é a data 23/11/2005. Aceita 23/11/2005, 23112005, 23-11-2005, 23/11/05, 2005-11-23...
  const DATAS_ACEITAS = ["MjMxMTIwMDU=", "MjMxMTA1", "MjAwNTExMjM="].map(atob);

  const $ = (s) => document.querySelector(s);
  const portal = $("#portal");
  const form = $("#formSenha");
  const campo = $("#senha");
  const erro = $("#erro");
  const jardim = $("#jardim");

  /* ---------- Estrelas ---------- */
  const ceu = document.querySelector(".estrelas");
  for (let i = 0; i < 90; i++) {
    const e = document.createElement("i");
    e.style.left = Math.random() * 100 + "%";
    e.style.top = Math.random() * 100 + "%";
    e.style.setProperty("--d", 2 + Math.random() * 5 + "s");
    e.style.setProperty("--atraso", -Math.random() * 6 + "s");
    if (Math.random() < 0.15) { e.style.width = e.style.height = "3px"; }
    ceu.appendChild(e);
  }

  /* ---------- Vaga-lumes ---------- */
  const canvas = $("#vagalumes");
  const ctx = canvas.getContext("2d");
  const cores = ["201,166,107", "165,72,107", "95,122,92", "193,85,119"];
  let luzes = [];
  function redimensionar() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const qtd = Math.round(Math.min(42, (innerWidth * innerHeight) / 26000));
    luzes = Array.from({ length: qtd }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      r: 1 + Math.random() * 2.2,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -0.1 - Math.random() * 0.3,
      fase: Math.random() * Math.PI * 2,
      cor: cores[Math.floor(Math.random() * cores.length)],
    }));
  }
  function animar(t) {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (const l of luzes) {
      l.x += l.vx + Math.sin(t / 1800 + l.fase) * 0.25;
      l.y += l.vy;
      if (l.y < -10) { l.y = innerHeight + 10; l.x = Math.random() * innerWidth; }
      if (l.x < -10) l.x = innerWidth + 10;
      if (l.x > innerWidth + 10) l.x = -10;
      const a = 0.35 + 0.65 * Math.abs(Math.sin(t / 900 + l.fase));
      const g = ctx.createRadialGradient(l.x, l.y, 0, l.x, l.y, l.r * 7);
      g.addColorStop(0, `rgba(${l.cor},${a})`);
      g.addColorStop(1, `rgba(${l.cor},0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(l.x, l.y, l.r * 7, 0, Math.PI * 2);
      ctx.fill();
    }
    if (!reduzirMovimento) requestAnimationFrame(animar);
  }
  redimensionar();
  addEventListener("resize", redimensionar);
  requestAnimationFrame(animar);

  /* ---------- Borboletas flutuantes ---------- */
  const corpoBorboletas = $(".borboletas");
  const paletaBorboleta = [
    ["var(--rosa)", "var(--rosa-forte)"],
    ["var(--verde)", "var(--verde-forte)"],
    ["var(--dourado)", "var(--dourado-forte)"],
    ["var(--rosa-vivo)", "var(--rosa-forte)"],
  ];
  const svgBorboleta =
    '<svg viewBox="0 0 40 24">' +
    '<g class="ala esq"><path d="M20 12 C 14 1,3 0,1 6 C -1 11,9 12,20 12 Z"/></g>' +
    '<g class="ala dir"><path d="M20 12 C 26 1,37 0,39 6 C 41 11,31 12,20 12 Z"/></g>' +
    '<ellipse class="corpo-mini" cx="20" cy="12" rx="1.3" ry="6"/>' +
    "</svg>";
  const QTD_BORBOLETAS = reduzirMovimento ? 0 : 10;
  for (let i = 0; i < QTD_BORBOLETAS; i++) {
    const b = document.createElement("div");
    b.className = "borboleta";
    const tam = 28 + Math.random() * 26;
    const [cor, cor2] = paletaBorboleta[Math.floor(Math.random() * paletaBorboleta.length)];
    b.style.setProperty("--tam", tam + "px");
    b.style.setProperty("--lane", Math.random() * 80 + 5 + "%");
    b.style.setProperty("--dur", 16 + Math.random() * 14 + "s");
    b.style.setProperty("--atraso", -Math.random() * 28 + "s");
    b.style.setProperty("--op", (0.55 + Math.random() * 0.35).toFixed(2));
    b.style.setProperty("--cor", cor);
    b.style.setProperty("--cor2", cor2);
    b.innerHTML = svgBorboleta;
    corpoBorboletas.appendChild(b);
  }

  /* ---------- Faíscas ---------- */
  const coresFaisca = ["#c9a66b", "#c15577", "#5f7a5c", "#a5486b"];
  function faisca(x, y, forca = 1, estrela = false) {
    if (reduzirMovimento) return;
    const f = document.createElement("span");
    f.className = "faisca" + (estrela ? " estrela" : "");
    f.style.left = x + "px";
    f.style.top = y + "px";
    const ang = Math.random() * Math.PI * 2;
    const dist = (10 + Math.random() * 40) * forca;
    f.style.setProperty("--dx", Math.cos(ang) * dist + "px");
    f.style.setProperty("--dy", Math.sin(ang) * dist + 20 * forca + "px");
    f.style.setProperty("--cor", coresFaisca[Math.floor(Math.random() * coresFaisca.length)]);
    document.body.appendChild(f);
    f.addEventListener("animationend", () => f.remove());
  }
  function explosao(x, y, qtd = 40) {
    for (let i = 0; i < qtd; i++) setTimeout(() => faisca(x, y, 3 + Math.random() * 3, i % 2 === 0), i * 12);
  }
  let ultimo = 0;
  addEventListener("pointermove", (e) => {
    const agora = performance.now();
    if (agora - ultimo < 35 || e.pointerType === "touch") return;
    ultimo = agora;
    faisca(e.clientX, e.clientY, 1, Math.random() < 0.3);
  });
  addEventListener("pointerdown", (e) => { for (let i = 0; i < 8; i++) faisca(e.clientX, e.clientY, 1.6, i % 2 === 0); });

  /* ---------- Senha ---------- */
  campo.addEventListener("input", () => {
    // Coloca as barras automaticamente enquanto digita só números
    const v = campo.value;
    if (/^[\d/]*$/.test(v)) {
      const d = v.replace(/\D/g, "").slice(0, 8);
      let out = d.slice(0, 2);
      if (d.length > 2) out += "/" + d.slice(2, 4);
      if (d.length > 4) out += "/" + d.slice(4);
      campo.value = out;
    }
    erro.textContent = "";
  });

  const mensagensErro = [
    "As fadas não reconheceram essa data…",
    "Quase! Tente de novo, com carinho.",
    "O portal continua fechado. Dica: dia / mês / ano.",
  ];
  let tentativas = 0;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const digitos = campo.value.replace(/\D/g, "");
    if (DATAS_ACEITAS.includes(digitos)) {
      try { sessionStorage.setItem(CHAVE, "1"); } catch (_) {}
      const r = form.getBoundingClientRect();
      explosao(r.left + r.width / 2, r.top + r.height / 2, 60);
      abrirJardim(true);
    } else {
      erro.textContent = mensagensErro[tentativas++ % mensagensErro.length];
      form.classList.remove("tremer");
      void form.offsetWidth;
      form.classList.add("tremer");
      campo.select();
    }
  });

  function abrirJardim(animado) {
    if (animado) {
      portal.classList.add("abrindo");
      setTimeout(() => { portal.hidden = true; }, 1200);
      setTimeout(mostrarJardim, 500);
    } else {
      portal.hidden = true;
      mostrarJardim();
    }
  }

  $("#sair").addEventListener("click", () => {
    try { sessionStorage.removeItem(CHAVE); } catch (_) {}
    location.reload();
  });

  /* ---------- Lista ---------- */
  function caminhoFoto(foto) {
    if (!foto) return "";
    if (/^(https?:|data:|\/)/.test(foto) || foto.includes("/")) return foto;
    return "presentes/fotos/" + foto;
  }

  function montarCard(p, i) {
    const art = document.createElement("article");
    art.className = "presente";
    art.style.transitionDelay = (i % 3) * 120 + "ms";

    const moldura = document.createElement("div");
    moldura.className = "moldura";
    const num = document.createElement("span");
    num.className = "numero";
    num.textContent = "Nº " + String(i + 1).padStart(2, "0");
    const img = document.createElement("img");
    img.loading = "lazy";
    img.alt = p.nome || "Presente";
    img.src = caminhoFoto(p.foto);
    img.onerror = () => { img.removeAttribute("src"); img.style.visibility = "hidden"; };
    moldura.append(num, img);
    moldura.addEventListener("click", () => abrirFoto(img.src, p.nome));

    const conteudo = document.createElement("div");
    conteudo.className = "conteudo";
    const h2 = document.createElement("h2");
    h2.textContent = p.nome || "Surpresa";
    conteudo.appendChild(h2);

    const obs = document.createElement("p");
    obs.className = "obs";
    if (p.observacao) obs.textContent = p.observacao;
    else obs.style.visibility = "hidden";
    conteudo.appendChild(obs);

    if (p.link) {
      const a = document.createElement("a");
      a.className = "ver";
      a.href = p.link;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.innerHTML = 'Ver onde encontrar <span class="seta" aria-hidden="true">✦</span>';
      a.addEventListener("click", (e) => explosao(e.clientX, e.clientY, 18));
      conteudo.appendChild(a);
    } else {
      const s = document.createElement("span");
      s.className = "sem-link";
      s.textContent = "✧ encontre onde preferir ✧";
      conteudo.appendChild(s);
    }

    art.append(moldura, conteudo);

    // Inclinação 3D seguindo o mouse
    if (!reduzirMovimento) {
      art.addEventListener("pointermove", (e) => {
        if (e.pointerType === "touch") return;
        const r = art.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        art.style.setProperty("--ry", (px - 0.5) * 10 + "deg");
        art.style.setProperty("--rx", (0.5 - py) * 10 + "deg");
        art.style.setProperty("--mx", px * 100 + "%");
        art.style.setProperty("--my", py * 100 + "%");
      });
      art.addEventListener("pointerleave", () => {
        art.style.setProperty("--rx", "0deg");
        art.style.setProperty("--ry", "0deg");
      });
    }
    return art;
  }

  let montado = false;
  function mostrarJardim() {
    jardim.hidden = false;
    if (montado) return;
    montado = true;

    const presentes = Array.isArray(window.PRESENTES) ? window.PRESENTES : [];
    const lista = $("#lista");
    presentes.forEach((p, i) => lista.appendChild(montarCard(p, i)));
    $("#vazio").hidden = presentes.length > 0;

    const alvos = document.querySelectorAll(".revelar, .presente");
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entradas) => {
        entradas.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("visivel");
            io.unobserve(en.target);
            setTimeout(() => { en.target.style.transitionDelay = ""; }, 1600);
          }
        });
      }, { threshold: 0.12 });
      alvos.forEach((el, i) => {
        if (el.classList.contains("revelar")) el.style.transitionDelay = i * 150 + "ms";
        io.observe(el);
      });
    } else {
      alvos.forEach((el) => el.classList.add("visivel"));
    }
  }

  /* ---------- Foto ampliada ---------- */
  const lightbox = $("#lightbox");
  function abrirFoto(src, legenda) {
    if (!src) return;
    lightbox.querySelector("img").src = src;
    lightbox.querySelector("img").alt = legenda || "";
    lightbox.querySelector("figcaption").textContent = legenda || "";
    lightbox.hidden = false;
  }
  lightbox.addEventListener("click", (e) => { if (e.target.tagName !== "IMG") lightbox.hidden = true; });
  addEventListener("keydown", (e) => { if (e.key === "Escape") lightbox.hidden = true; });

  /* ---------- Início ---------- */
  let jaAberto = false;
  try { jaAberto = sessionStorage.getItem(CHAVE) === "1"; } catch (_) {}
  if (jaAberto) abrirJardim(false);
  else setTimeout(() => campo.focus({ preventScroll: true }), 900);
})();
