document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("nav-active");
    menuToggle.classList.toggle("open");
  });
  function closeMenu() {
    navLinks.classList.remove("nav-active");
    menuToggle.classList.remove("open");
  }
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
  window.addEventListener("scroll", function () {
    let nav = document.querySelector("nav");
    nav.classList.toggle("scrolled", window.scrollY > 50);
  });
});
