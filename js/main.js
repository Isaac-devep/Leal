document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector("nav");
  const logo = document.querySelector(".logo-img");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
      logo.src = "./assets/Logo.png";
    } else {
      nav.classList.remove("scrolled");
      logo.src = "./assets/Leal_Branding White.png";
    }
  });
  let currentSlide = 0;
  const slider = document.querySelector(".slider");
  const dots = document.querySelectorAll(".dot");
  const totalSlides = 3;
  let autoSlideInterval;
  function showSlide(index) {
    if (index >= totalSlides) index = 0;
    if (index < 0) index = totalSlides - 1;
    currentSlide = index;
    slider.style.transform = `translateX(-${currentSlide * 33.3333}%)`;
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[currentSlide].classList.add("active");
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
  }
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));
  });
  autoSlideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
  let touchStartX = 0;
  document.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });
  document.addEventListener("touchend", (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        showSlide(currentSlide + 1);
      } else {
        showSlide(currentSlide - 1);
      }
    }
  });
});
