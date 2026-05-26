document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");
  const login = document.getElementById("login");
  const home = document.getElementById("home");

  const splashBtn = document.getElementById("splashBtn");
  const enterBtn = document.getElementById("enterBtn");
  const scrollProgress = document.getElementById("scrollProgress");

  const revealElements = document.querySelectorAll(".reveal");

  function showScreen(target) {
    document.querySelectorAll(".screen").forEach(screen => {
      screen.classList.remove("active");
    });

    target.classList.add("active");
    window.scrollTo(0, 0);

    if (target === home) {
      setTimeout(() => {
        revealElements.forEach(element => observer.observe(element));
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

  splashBtn.addEventListener("click", () => {
    showScreen(login);
  });

  setTimeout(() => {
    if (splash.classList.contains("active")) {
      showScreen(login);
    }
  }, 2400);

  enterBtn.addEventListener("click", () => {
    showScreen(home);
  });

  window.addEventListener("scroll", () => {
    if (!home.classList.contains("active")) return;

    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = total > 0 ? (window.scrollY / total) * 100 : 0;

    scrollProgress.style.width = `${progress}%`;
  });
});