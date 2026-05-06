const enterBtn = document.getElementById("enterBtn");
const home = document.getElementById("home");

enterBtn.addEventListener("click", () => {
  home.scrollIntoView({
    behavior: "smooth"
  });
});