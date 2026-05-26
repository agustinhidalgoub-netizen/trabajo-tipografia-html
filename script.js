document.addEventListener("DOMContentLoaded", () => {

  function setViewportHeight() {

    document.documentElement.style.setProperty(
      "--vh",
      `${window.innerHeight * 0.01}px`
    );

  }

  setViewportHeight();

  window.addEventListener(
    "resize",
    setViewportHeight
  );

  const splash = document.getElementById("splash");
  const login = document.getElementById("login");
  const home = document.getElementById("home");

  const splashBtn = document.getElementById("splashBtn");
  const enterBtn = document.getElementById("enterBtn");

  const progress = document.getElementById("progress");

  const menuBtn = document.getElementById("menuBtn");
  const menu = document.getElementById("menu");
  const closeMenu = document.getElementById("closeMenu");
  const menuBackdrop = document.getElementById("menuBackdrop");

  const focusBtn = document.getElementById("focusBtn");

  const writeBtn = document.getElementById("writeBtn");
  const writingPanel = document.getElementById("writingPanel");

  const mainTitle = document.getElementById("mainTitle");

  const movingWord = document.getElementById("movingWord");
  const transitionTitle = document.getElementById("transitionTitle");
  const transitionText = document.getElementById("transitionText");

  const transitionSection = document.querySelector(".transition-scroll");

  const transitionLines = document.querySelectorAll(".transition-lines i");

  const metricRows = document.querySelectorAll(".metric-row");

  const revealEls = document.querySelectorAll(".reveal");

  function showScreen(target){

    document.querySelectorAll(".screen").forEach(screen => {

      screen.classList.remove("is-active");

    });

    target.classList.add("is-active");

    window.scrollTo(0,0);

    if(target === home){

      revealEls.forEach(el => {

        observer.observe(el);

      });

    }

  }

  splashBtn.addEventListener("click", () => {

    showScreen(login);

  });

  setTimeout(() => {

    if(splash.classList.contains("is-active")){

      showScreen(login);

    }

  },2600);

  enterBtn.addEventListener("click", () => {

    showScreen(home);

  });

  menuBtn.addEventListener("click", () => {

    menu.classList.add("open");
    menuBackdrop.classList.add("open");

  });

  function closeSideMenu(){

    menu.classList.remove("open");
    menuBackdrop.classList.remove("open");

  }

  closeMenu.addEventListener("click", closeSideMenu);

  menuBackdrop.addEventListener("click", closeSideMenu);

  focusBtn.addEventListener("click", () => {

    document.body.classList.toggle("focus");

  });

  writeBtn.addEventListener("click", () => {

    writingPanel.classList.toggle("open");

  });

  document.querySelectorAll("[data-jump]").forEach(button => {

    button.addEventListener("click", () => {

      const target = document.getElementById(
        button.dataset.jump
      );

      if(target){

        target.scrollIntoView({
          behavior:"smooth",
          block:"start"
        });

      }

      document.querySelectorAll(".bottom-nav button").forEach(btn => {

        btn.classList.remove("active");

      });

      if(button.closest(".bottom-nav")){

        button.classList.add("active");

      }

      closeSideMenu();

    });

  });

  const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if(entry.isIntersecting){

        entry.target.classList.add("visible");

      }

    });

  },{
    threshold:.12
  });

  function clamp(value,min,max){

    return Math.max(
      min,
      Math.min(max,value)
    );

  }

  function updateTransition(){

    const rect = transitionSection.getBoundingClientRect();

    const total =
      transitionSection.offsetHeight - window.innerHeight;

    const progressValue =
      clamp((-rect.top / total),0,1);

    const gap =
      8 + (progressValue * 38);

    const tracking =
      -.04 + (progressValue * .26);

    const rotate =
      -4 + (progressValue * 8);

    const scale =
      .92 + (progressValue * .24);

    movingWord.style.setProperty(
      "--word-gap",
      `${gap}px`
    );

    movingWord.style.setProperty(
      "--word-track",
      `${tracking}em`
    );

    movingWord.style.transform =
      `rotate(${rotate}deg) scale(${scale})`;

    transitionLines.forEach((line,index) => {

      const width =
        24 + (progressValue * 74) - (index * 12);

      line.style.setProperty(
        "--line-width",
        `${clamp(width,8,96)}%`
      );

    });

    if(progressValue < .33){

      transitionTitle.textContent =
        "La palabra se expande.";

      transitionText.textContent =
        "El splash trabaja la expansión: la identidad aparece como materia tipográfica.";

    } else if(progressValue < .66){

      transitionTitle.textContent =
        "La letra se ordena.";

      transitionText.textContent =
        "El login transforma esa expansión en grilla, campos y jerarquía.";

    } else {

      transitionTitle.textContent =
        "La forma se vuelve sistema.";

      transitionText.textContent =
        "La home convierte tracking, peso y leading en información navegable.";

    }

  }

  function updateScroll(){

    if(!home.classList.contains("is-active")) return;

    const totalHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const ratio =
      totalHeight > 0
      ? window.scrollY / totalHeight
      : 0;

    progress.style.width =
      `${ratio * 100}%`;

    const tracking =
      -.06 + (ratio * .22);

    mainTitle.style.setProperty(
      "--tracking",
      `${tracking}em`
    );

    metricRows.forEach((row,index) => {

      const value =
        Math.min(
          95,
          24 + (ratio * 90) + (index * 8)
        );

      row.style.setProperty(
        "--metric",
        `${value}%`
      );

    });

    updateTransition();

  }

  window.addEventListener(
    "scroll",
    () => requestAnimationFrame(updateScroll)
  );

  window.addEventListener(
    "resize",
    updateScroll
  );

});