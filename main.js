const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const nav = document.querySelector(".site-nav");
const menuToggle = document.querySelector(".menu-toggle");

const prefersLight = window.matchMedia("(prefers-color-scheme: light)");
const userTheme = window.localStorage.getItem("portfolio-theme");

const applyTheme = (theme) => {
  if (theme === "light") {
    root.classList.add("light-theme");
  } else {
    root.classList.remove("light-theme");
  }
  window.localStorage.setItem("portfolio-theme", theme);
};

const currentTheme = userTheme || (prefersLight.matches ? "light" : "dark");
applyTheme(currentTheme);

prefersLight.addEventListener("change", (event) => {
  if (!userTheme) {
    applyTheme(event.matches ? "light" : "dark");
  }
});

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.classList.contains("light-theme") ? "dark" : "light";
  applyTheme(nextTheme);
});

menuToggle?.addEventListener("click", () => {
  nav?.classList.toggle("open");
});

document.addEventListener("click", (event) => {
  if (
    nav?.classList.contains("open") &&
    !nav.contains(event.target) &&
    !menuToggle?.contains(event.target)
  ) {
    nav.classList.remove("open");
  }
});
