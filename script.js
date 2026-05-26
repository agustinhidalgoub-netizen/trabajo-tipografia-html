document.addEventListener("DOMContentLoaded", () => {
  const splashScreen = document.getElementById("splashScreen");
  const loginScreen = document.getElementById("loginScreen");
  const homeScreen = document.getElementById("homeScreen");

  const splashButton = document.getElementById("splashButton");
  const enterButton = document.getElementById("enterButton");

  const splashWord = document.getElementById("splashWord");
  const loginWord = document.getElementById("loginWord");
  const homeWord = document.getElementById("homeWord");
  const processWord = document.getElementById("processWord");

  const scrollProgress = document.getElementById("scrollProgress");
  const variableHeading = document.getElementById("variableHeading");

  const processSection = document.getElementById("typographicProcess");
  const processTitle = document.getElementById("processTitle");
  const processLines = document.querySelectorAll(".process-lines span");

  const axisRows = document.querySelectorAll(".axis-row");
  const revealSections = document.querySelectorAll(".reveal-section");

  const menuButton = document.getElementById("menuButton");
  const sideMenu = document.getElementById("sideMenu");
  const closeMenu = document.getElementById("closeMenu");
  const menuOverlay = document.getElementById("menuOverlay");

  const writeButton = document.getElementById("writeButton");
  const quickEntry = document.getElementById("quickEntry");

  const navButtons = document.querySelectorAll("[data-section]");

  let ticking = false;
  let splashFrame = 0;

  function setViewportHeight() {
    document.documentElement.style.setProperty(
      "--vh",
      `${window.innerHeight * 0.01}px`
    );
  }

  setViewportHeight();
  window.addEventListener("resize", setViewportHeight);

  function showScreen(screen) {
    document.querySelectorAll(".screen").forEach((item) => {
      item.classList.remove("is-active");
    });

    screen.classList.add("is-active");
    window.scrollTo({ top: 0, behavior: "instant" });

    if (screen === homeScreen) {
      setTimeout(() => {
        revealSections.forEach((section) => revealObserver.observe(section));
        updateScrollSystem();
      }, 120);
    }
  }

  function animateSplashTypography() {
    if (!splashScreen.classList.contains("is-active")) return;

    splashFrame += 0.018;

    const tracking = 0.08 + Math.sin(splashFrame) * 0.08;
    const scale = 1 + Math.sin(splashFrame * 0.7) * 0.018;
    const y = Math.sin(splashFrame * 0.9) * 4;

    splashWord.style.letterSpacing = `${tracking}em`;
    splashWord.style.transform = `translateY(${y}px) scale(${scale})`;

    requestAnimationFrame(animateSplashTypography);
  }

  animateSplashTypography();

  function transitionSplashToLogin() {
    splashWord.style.transition = "letter-spacing .7s ease, transform .7s ease, opacity .7s ease";
    splashWord.style.letterSpacing = "0.02em";
    splashWord.style.transform = "scale(.82) translateY(-22px)";

    setTimeout(() => {
      showScreen(loginScreen);
      loginWord.style.opacity = "0";
      loginWord.style.transform = "translateY(34px)";
      loginWord.style.letterSpacing = "0.32em";

      requestAnimationFrame(() => {
        loginWord.style.transition = "opacity .75s ease, transform .75s ease, letter-spacing .75s ease";
        loginWord.style.opacity = "1";
        loginWord.style.transform = "translateY(0)";
        loginWord.style.letterSpacing = "0.18em";
      });
    }, 520);
  }

  function transitionLoginToHome() {
    enterButton.style.pointerEvents = "none";
    enterButton.style.transition = "transform .45s ease, border-radius .45s ease, opacity .45s ease";
    enterButton.style.transform = "scale(.96)";
    enterButton.style.borderRadius = "999px";
    enterButton.style.opacity = ".82";

    loginWord.style.transition = "letter-spacing .65s ease, transform .65s ease";
    loginWord.style.letterSpacing = "0.06em";
    loginWord.style.transform = "translateY(-18px) scale(.86)";

    setTimeout(() => {
      showScreen(homeScreen);

      homeWord.style.opacity = "0";
      homeWord.style.transform = "translateY(-18px)";
      homeWord.style.letterSpacing = "0.28em";

      requestAnimationFrame(() => {
        homeWord.style.transition = "opacity .75s ease, transform .75s ease, letter-spacing .75s ease";
        homeWord.style.opacity = "1";
        homeWord.style.transform = "translateY(0)";
        homeWord.style.letterSpacing = "0.1em";
      });
    }, 520);
  }

  splashButton.addEventListener("click", transitionSplashToLogin);

  setTimeout(() => {
    if (splashScreen.classList.contains("is-active")) {
      transitionSplashToLogin();
    }
  }, 2600);

  enterButton.addEventListener("click", transitionLoginToHome);

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.18 }
  );

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function updateProgress() {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = total > 0 ? window.scrollY / total : 0;

    scrollProgress.style.width = `${ratio * 100}%`;
    return ratio;
  }

  function updateHomeTypography(ratio) {
    const headingTracking = -0.06 + ratio * 0.24;
    variableHeading.style.setProperty("--home-tracking", `${headingTracking}em`);

    const headingY = ratio * -18;
    variableHeading.style.transform = `translateY(${headingY}px)`;

    homeWord.style.letterSpacing = `${0.1 + ratio * 0.12}em`;
  }

  function updateProcessMotion() {
    if (!processSection) return;

    const rect = processSection.getBoundingClientRect();
    const total = processSection.offsetHeight - window.innerHeight;
    const local = clamp(-rect.top / total, 0, 1);

    const gap = 6 + local * 42;
    const tracking = -0.04 + local * 0.32;
    const rotate = -5 + local * 10;
    const scale = 0.9 + local * 0.28;

    processWord.style.setProperty("--process-gap", `${gap}px`);
    processWord.style.setProperty("--process-tracking", `${tracking}em`);
    processWord.style.setProperty("--process-rotate", `${rotate}deg`);
    processWord.style.setProperty("--process-scale", scale);

    processLines.forEach((line, index) => {
      const width = clamp(18 + local * 78 - index * 12, 8, 96);
      line.style.setProperty("--line-width", `${width}%`);
    });

    if (local < 0.34) {
      processTitle.textContent = "La palabra se expande.";
    } else if (local < 0.68) {
      processTitle.textContent = "La letra se ordena.";
    } else {
      processTitle.textContent = "La forma se vuelve sistema.";
    }
  }

  function updateAxisMotion(ratio) {
    axisRows.forEach((row, index) => {
      const width = clamp(26 + ratio * 90 + index * 8, 24, 96);
      row.style.setProperty("--axis-width", `${width}%`);
    });
  }

  function updateScrollSystem() {
    if (!homeScreen.classList.contains("is-active")) {
      ticking = false;
      return;
    }

    const ratio = updateProgress();

    updateHomeTypography(ratio);
    updateProcessMotion();
    updateAxisMotion(ratio);

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollSystem);
      ticking = true;
    }
  });

  window.addEventListener("resize", () => {
    setViewportHeight();
    updateScrollSystem();
  });

  function openMenu() {
    sideMenu.classList.add("open");
    menuOverlay.classList.add("open");
  }

  function closeSideMenu() {
    sideMenu.classList.remove("open");
    menuOverlay.classList.remove("open");
  }

  menuButton.addEventListener("click", openMenu);
  closeMenu.addEventListener("click", closeSideMenu);
  menuOverlay.addEventListener("click", closeSideMenu);

  writeButton.addEventListener("click", () => {
    quickEntry.classList.toggle("open");
  });

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const section = document.getElementById(button.dataset.section);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

      document.querySelectorAll(".bottom-nav button").forEach((item) => {
        item.classList.remove("active");
      });

      if (button.closest(".bottom-nav")) {
        button.classList.add("active");
      }

      closeSideMenu();
    });
  });
});