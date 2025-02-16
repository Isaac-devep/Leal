document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".company-slider-track");
  const slides = document.querySelectorAll(".company-slide");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  let currentIndex = 0;
  const slideWidth = slides[0].offsetWidth;
  const totalSlides = slides.length;
  const visibleSlides = Math.floor(document.querySelector(".company-slider-container").offsetWidth / slideWidth);
  const maxIndex = totalSlides - visibleSlides;

  function updateSlider() {
     const offset = currentIndex * -(slideWidth + 10);
     track.style.transform = `translateX(${offset}px)`;
     updateButtons();
  }

  function updateButtons() {
     prevButton.style.opacity = currentIndex === 0 ? "0.5" : "1";
     nextButton.style.opacity = currentIndex >= maxIndex ? "0.5" : "1";
  }

  function slideToIndex(index) {
     currentIndex = Math.max(0, Math.min(index, maxIndex));
     updateSlider();
  }

  prevButton.addEventListener("click", () => slideToIndex(currentIndex - 1));
  nextButton.addEventListener("click", () => slideToIndex(currentIndex + 1));

  // ✅ Iniciar con estado correcto
  updateButtons();

  // ✅ Ajustar en caso de resize
  window.addEventListener("resize", () => {
     const newVisibleSlides = Math.floor(document.querySelector(".company-slider-container").offsetWidth / slideWidth);
     slideToIndex(currentIndex);
  });

  // ✅ Eliminar transiciones en hover
  document.querySelectorAll(".company-icon").forEach((icon) => {
     icon.addEventListener("mouseover", () => {
        icon.style.filter = "grayscale(0)";
     });

     icon.addEventListener("mouseout", () => {
        icon.style.filter = "grayscale(100%)";
     });
  });
});
