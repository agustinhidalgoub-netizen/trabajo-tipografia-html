const shell = document.getElementById("pageShell");
const device = document.getElementById("device");

const splash = document.getElementById("splash");
const login = document.getElementById("login");
const home = document.getElementById("home");

const splashBtn = document.getElementById("splashBtn");
const enterBtn = document.getElementById("enterBtn");
const progress = document.getElementById("progress");

const revealElements = document.querySelectorAll(".reveal");

function getViewportWidth() {
  return window.visualViewport ? window.visualViewport.width : window.innerWidth;
}

function setScale() {
  const viewportWidth = getViewportWidth();
  const scale = viewportWidth / 1080;

  document.documentElement.style.setProperty("--scale", scale);

  const activePanel = document.querySelector(".panel.active");
  const activeHeight = activePanel.scrollHeight;

  shell.style.height = `${activeHeight * scale}px`;
  device.style.height = `${activeHeight}px`;
}

function showPanel(panel) {
  document.querySelectorAll(".panel").forEach(section => {
    section.classList.remove("active");
  });

  panel.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  setTimeout(setScale, 80);
}

splashBtn.addEventListener("click", () => {
  showPanel(login);
});

enterBtn.addEventListener("click", () => {
  showPanel(home);

  setTimeout(() => {
    revealElements.forEach(element => observer.observe(element));
  }, 180);
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.14 }
);

function updateProgress() {
  if (!home.classList.contains("active")) return;

  const max = document.documentElement.scrollHeight - window.innerHeight;
  const value = max > 0 ? (window.scrollY / max) * 100 : 0;

  progress.style.width = `${value}%`;
}

window.addEventListener("resize", setScale);
window.addEventListener("orientationchange", setScale);
window.addEventListener("scroll", updateProgress);
window.addEventListener("load", setScale);