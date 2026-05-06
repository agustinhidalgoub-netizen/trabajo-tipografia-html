const enterBtn = document.getElementById("enterBtn");
const home = document.getElementById("home");
const progress = document.getElementById("scrollProgress");
const revealElements = document.querySelectorAll(".reveal");
const parallaxElements = document.querySelectorAll(".parallax");

enterBtn.addEventListener("click", () => {
  home.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.18
  }
);

revealElements.forEach(element => {
  revealObserver.observe(element);
});

function updateScrollEffects() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progressWidth = (scrollTop / docHeight) * 100;

  progress.style.width = `${progressWidth}%`;

  parallaxElements.forEach(element => {
    const speed = Number(element.dataset.speed || 0);
    const rect = element.getBoundingClientRect();
    const movement = rect.top * speed;

    element.style.transform = `translateY(${movement}px)`;
  });
}

window.addEventListener("scroll", updateScrollEffects);
window.addEventListener("load", updateScrollEffects);