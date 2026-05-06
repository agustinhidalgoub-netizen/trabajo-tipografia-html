const shell = document.getElementById("pageShell");
const device = document.getElementById("device");

const splash = document.getElementById("splash");
const login = document.getElementById("login");
const home = document.getElementById("home");

const splashBtn = document.getElementById("splashBtn");
const enterBtn = document.getElementById("enterBtn");
const progress = document.getElementById("progress");

const revealElements = document.querySelectorAll(".reveal");

function setScale() {
  const scale = Math.min(window.innerWidth / 1080, 1);
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
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(setScale, 50);
}

function goToLogin() {
  showPanel(login);
}

function goToHome() {
  showPanel(home);
  setTimeout(() => {
    revealElements.forEach(el => observer.observe(el));
  }, 200);
}

splashBtn.addEventListener("click", goToLogin);
enterBtn.addEventListener("click", goToHome);

setTimeout(goToLogin, 2800);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

function updateProgress() {
  if (!home.classList.contains("active")) return;

  const max = document.documentElement.scrollHeight - window.innerHeight;
  const value = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.width = `${value}%`;
}

window.addEventListener("resize", setScale);
window.addEventListener("scroll", updateProgress);
window.addEventListener("load", setScale);