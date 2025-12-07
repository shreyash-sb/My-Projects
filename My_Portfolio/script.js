function toggleMode() {
  document.body.classList.toggle("dark-mode");
  const btn = document.getElementById("mode-toggle");
  btn.textContent = document.body.classList.contains("dark-mode") ? "Light" : "Dark";
}

function toggleMenu() {
  const navMenu = document.querySelector("nav ul");
  navMenu.classList.toggle("show");
}
