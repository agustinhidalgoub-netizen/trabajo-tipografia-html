document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");
  const login = document.getElementById("login");
  const home = document.getElementById("home");
  const splashBtn = document.getElementById("splashBtn");
  const enterBtn = document.getElementById("enterBtn");
  const progress = document.getElementById("progress");

  const menuBtn = document.getElementById("menuBtn");
  const drawer = document.getElementById("drawer");
  const closeDrawer = document.getElementById("closeDrawer");
  const drawerBg = document.getElementById("drawerBg");
  const focusBtn = document.getElementById("focusBtn");
  const writeBtn = document.getElementById("writeBtn");
  const quickNote = document.getElementById("quickNote");

  const variableTitle = document.getElementById("variableTitle");
  const axisRows = document.querySelectorAll(".axis-row");
  const modules = document.querySelectorAll(".module");
  const jumpButtons = document.querySelectorAll("[data-jump]");
  const scrollStage = document.querySelector(".scroll-stage");
  const kineticWord = document.getElementById("kineticWord");
  const scrollHeadline = document.getElementById("scrollHeadline");
  const scrollCaption = document.getElementById("scrollCaption");
  const scrollLines = document.querySelectorAll(".scroll-lines i");

  function show(target) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("is-active"));
    target.classList.add("is-active");
    window.scrollTo(0, 0);

    if (target === home) {
      setTimeout(() => {
        modules.forEach(m => observer.observe(m));
        updateScroll();
      }, 100);
    }
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.12 });

  splashBtn.addEventListener("click", () => show(login));
  setTimeout(() => {
    if (splash.classList.contains("is-active")) show(login);
  }, 2600);

  enterBtn.addEventListener("click", () => show(home));

  menuBtn.addEventListener("click", () => {
    drawer.classList.add("open");
    drawerBg.classList.add("open");
  });

  function closeMenu() {
    drawer.classList.remove("open");
    drawerBg.classList.remove("open");
  }

  closeDrawer.addEventListener("click", closeMenu);
  drawerBg.addEventListener("click", closeMenu);

  focusBtn.addEventListener("click", () => document.body.classList.toggle("focus"));
  writeBtn.addEventListener("click", () => quickNote.classList.toggle("open"));

  jumpButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const el = document.getElementById(btn.dataset.jump);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });

      document.querySelectorAll(".bottom-nav button").forEach(b => b.classList.remove("active"));
      if (btn.closest(".bottom-nav")) btn.classList.add("active");

      closeMenu();
    });
  });

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function updateScrollStage() {
    if (!scrollStage) return;

    const rect = scrollStage.getBoundingClientRect();
    const stageHeight = scrollStage.offsetHeight - window.innerHeight;
    const raw = -rect.top / stageHeight;
    const t = clamp(raw, 0, 1);

    const gap = 6 + t * 34;
    const track = -0.04 + t * 0.26;
    const rotate = -4 + t * 8;
    const scale = 0.92 + t * 0.22;

    kineticWord.style.setProperty("--kw-gap", `${gap}px`);
    kineticWord.style.setProperty("--kw-track", `${track}em`);
    kineticWord.style.transform = `rotate(${rotate}deg) scale(${scale})`;

    scrollLines.forEach((line, index) => {
      const w = 20 + t * 75 - index * 12;
      line.style.setProperty("--line-w", `${clamp(w, 8, 96)}%`);
    });

    if (t < 0.33) {
      scrollHeadline.textContent = "La palabra se abre.";
      scrollCaption.textContent = "El splash trabaja la expansión: la identidad aparece como materia tipográfica.";
    } else if (t < 0.66) {
      scrollHeadline.textContent = "La letra se ordena.";
      scrollCaption.textContent = "El login transforma esa expansión en grilla, campos y jerarquía de lectura.";
    } else {
      scrollHeadline.textContent = "La forma se vuelve sistema.";
      scrollCaption.textContent = "La home convierte tracking, peso y leading en información navegable.";
    }
  }

  function updateScroll() {
    if (!home.classList.contains("is-active")) return;

    const total = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = total > 0 ? window.scrollY / total : 0;

    progress.style.width = `${ratio * 100}%`;

    const tracking = -0.06 + ratio * 0.22;
    variableTitle.style.setProperty("--track", `${tracking}em`);

    axisRows.forEach((row, index) => {
      const value = Math.min(95, 20 + ratio * 90 + index * 10);
      row.style.setProperty("--axis", `${value}%`);
    });

    updateScrollStage();
  }

  window.addEventListener("scroll", () => requestAnimationFrame(updateScroll));
  window.addEventListener("resize", updateScroll);
});