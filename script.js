document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");
  const login = document.getElementById("login");
  const home = document.getElementById("home");

  const splashBtn = document.getElementById("splashBtn");
  const enterBtn = document.getElementById("enterBtn");
  const scrollProgress = document.getElementById("scrollProgress");

  const openMenu = document.getElementById("openMenu");
  const closeMenu = document.getElementById("closeMenu");
  const sideMenu = document.getElementById("sideMenu");
  const menuBackdrop = document.getElementById("menuBackdrop");

  const writeButton = document.getElementById("writeButton");
  const writingPanel = document.getElementById("writingPanel");
  const focusMode = document.getElementById("focusMode");

  const revealElements = document.querySelectorAll(".reveal");
  const expandableCards = document.querySelectorAll(".expandable");
  const navButtons = document.querySelectorAll("[data-target]");
  const chartBars = document.querySelectorAll(".bars i");
  const chartCaption = document.getElementById("chartCaption");

  const captions = {
    Lun: "Lunes: escritura contenida, tracking estable.",
    Mar: "Martes: mayor intensidad, más peso visual.",
    Mié: "Miércoles: pausa emocional y baja densidad.",
    Jue: "Jueves: pico expresivo, ritmo más abierto.",
    Vie: "Viernes: vuelve la claridad y baja el caos.",
    Sáb: "Sábado: registro medio, tono introspectivo.",
    Dom: "Domingo: cierre de semana con alta estabilidad."
  };

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

  function openSideMenu() {
    sideMenu.classList.add("open");
    menuBackdrop.classList.add("open");
  }

  function closeSideMenu() {
    sideMenu.classList.remove("open");
    menuBackdrop.classList.remove("open");
  }

  openMenu.addEventListener("click", openSideMenu);
  closeMenu.addEventListener("click", closeSideMenu);
  menuBackdrop.addEventListener("click", closeSideMenu);

  writeButton.addEventListener("click", () => {
    writingPanel.classList.toggle("open");
  });

  focusMode.addEventListener("click", () => {
    document.body.classList.toggle("focus-mode");
  });

  expandableCards.forEach(card => {
    card.addEventListener("click", event => {
      if (event.target.closest("button")) return;
      card.classList.toggle("expanded");
    });
  });

  chartBars.forEach(bar => {
    bar.addEventListener("click", () => {
      chartBars.forEach(item => item.classList.remove("active"));
      bar.classList.add("active");

      const day = bar.dataset.day;
      chartCaption.textContent = captions[day] || "Lectura emocional del día.";
    });
  });

  navButtons.forEach(button => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.target;
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

      document.querySelectorAll(".bottom-nav button").forEach(item => {
        item.classList.remove("active");
      });

      if (button.closest(".bottom-nav")) {
        button.classList.add("active");
      }

      closeSideMenu();
    });
  });

  window.addEventListener("scroll", () => {
    if (!home.classList.contains("active")) return;

    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
    scrollProgress.style.width = `${progress}%`;

    revealElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.25) {
        element.classList.add("passed");
      } else {
        element.classList.remove("passed");
      }
    });
  });
});