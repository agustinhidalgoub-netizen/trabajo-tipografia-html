const enterBtn = document.getElementById("enterBtn");
const home = document.getElementById("home");
const progress = document.getElementById("scrollProgress");
const revealElements = document.querySelectorAll(".reveal");

enterBtn.addEventListener("click", () => {
  home.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
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

revealElements.forEach(el => observer.observe(el));

function updateProgress() {
  const scrollTop = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const percent = total > 0 ? (scrollTop / total) * 100 : 0;
  progress.style.width = `${percent}%`;
}

window.addEventListener("scroll", updateProgress);
window.addEventListener("load", updateProgress);