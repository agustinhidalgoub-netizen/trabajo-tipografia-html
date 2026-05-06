const splash = document.getElementById("splash");
const login = document.getElementById("login");
const home = document.getElementById("home");

const splashBtn = document.getElementById("splashBtn");
const enterBtn = document.getElementById("enterBtn");
const progress = document.getElementById("progress");

const revealElements = document.querySelectorAll(".reveal");
const cards = document.querySelectorAll(".card");

function showPanel(panel) {
  document.querySelectorAll(".panel").forEach(item => {
    item.classList.remove("active");
  });

  panel.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (panel === home) {
    setTimeout(() => {
      revealElements.forEach((element, index) => {
        element.style.setProperty("--delay", `${Math.min(index * 55, 330)}ms`);
        observer.observe(element);
      });
    }, 150);
  }
}

splashBtn.addEventListener("click", () => showPanel(login));

setTimeout(() => {
  if (splash.classList.contains("active")) {
    showPanel(login);
  }
}, 2600);

enterBtn.addEventListener("click", () => showPanel(home));

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
  const value = max > 0 ? window.scrollY / max : 0;
  progress.style.width = `${value * 100}%`;
}

cards.forEach(card => {
  card.addEventListener("pointermove", event => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    card.style.setProperty("--mx", `${x}%`);
    card.style.setProperty("--my", `${y}%`);
    card.style.setProperty("--glow", "1");
  });

  card.addEventListener("pointerleave", () => {
    card.style.setProperty("--glow", "0");
  });
});

window.addEventListener("scroll", updateProgress);