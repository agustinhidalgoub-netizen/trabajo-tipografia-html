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
  const modules = document.querySelectorAll(".module, .reveal");
  const jumpButtons = document.querySelectorAll("[data-jump]");

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
  }, { threshold: 0.15 });

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

  document.querySelectorAll(".reading-card, .card").forEach(card => {
    card.addEventListener("click", e => {
      if (e.target.closest("button")) return;
      card.classList.toggle("expanded");
    });
  });

  function updateScroll() {
    if (!home.classList.contains("is-active")) return;

    const total = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = total > 0 ? window.scrollY / total : 0;

    progress.style.width = `${ratio * 100}%`;

    const tracking = -0.06 + ratio * 0.18;
    variableTitle.style.setProperty("--track", `${tracking}em`);

    axisRows.forEach((row, index) => {
      const value = Math.min(95, 28 + ratio * 70 + index * 8);
      row.style.setProperty("--axis", `${value}%`);
    });

    modules.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      const movement = rect.top * (index % 2 === 0 ? -0.025 : 0.025);
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.style.transform = `translateY(${movement}px)`;
      }
    });
  }

  window.addEventListener("scroll", () => requestAnimationFrame(updateScroll));
  window.addEventListener("resize", updateScroll);
});