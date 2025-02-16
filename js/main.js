document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector("nav");
  const logo = document.querySelector(".logo-img");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
      logo.src = "./assets/Logo.png";
    } else {
      nav.classList.remove("scrolled");
      logo.src = "./assets/Leal_Branding_White.png";
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

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Ajusta este valor según el tamaño del navbar
          behavior: "smooth",
        });
      }
    });
  });
});

/* APARECIENDO */

document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".hidden-element");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Para que la animación ocurra solo una vez
        }
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach((element) => observer.observe(element));
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("a[href^='#']").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 50, // Ajusta según tu navbar fija
          behavior: "smooth",
        });
      }
    });
  });
});
