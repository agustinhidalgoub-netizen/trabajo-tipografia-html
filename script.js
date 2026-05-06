document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");
  const login = document.getElementById("login");
  const home = document.getElementById("home");
  const splashBtn = document.getElementById("splashBtn");
  const enterBtn = document.getElementById("enterBtn");
  const progress = document.getElementById("progress");
  const revealElements = document.querySelectorAll(".reveal");

  function showPanel(panel) {
    document.querySelectorAll(".screen").forEach(screen => {
      screen.classList.remove("active");
    });

    panel.classList.add("active");
    window.scrollTo(0, 0);

    if (panel === home) {
      setTimeout(() => {
        revealElements.forEach(item => observer.observe(item));
      }, 100);
    }
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.12 });

  splashBtn.addEventListener("click", () => showPanel(login));
  enterBtn.addEventListener("click", () => showPanel(home));

  setTimeout(() => {
    if (splash.classList.contains("active")) {
      showPanel(login);
    }
  }, 2400);

  window.addEventListener("scroll", () => {
    if (!home.classList.contains("active")) return;

    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? (window.scrollY / max) * 100 : 0;
    progress.style.width = `${value}%`;
  });
});