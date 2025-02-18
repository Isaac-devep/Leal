document.addEventListener("DOMContentLoaded", function () {
   const track = document.querySelector(".company-slider-track");
   const slides = document.querySelectorAll(".company-slide");
   const prevButton = document.querySelector(".prev");
   const nextButton = document.querySelector(".next");
   const container = document.querySelector(".company-slider-container");

   if (!track || slides.length === 0 || !prevButton || !nextButton || !container) {
      console.warn("No se encontraron los elementos del slider.");
      return;
   }

   let currentIndex = 0;
   let slideWidth = slides[0].offsetWidth;
   let visibleSlides = Math.floor(container.offsetWidth / slideWidth);
   let maxIndex = Math.max(0, slides.length - visibleSlides);

   function updateSlider() {
      const offset = currentIndex * -(slideWidth + 10);
      track.style.transform = `translateX(${offset}px)`;
      updateButtons();
   }

   function updateButtons() {
      prevButton.style.opacity = currentIndex === 0 ? "0.5" : "1";
      nextButton.style.opacity = currentIndex >= maxIndex ? "0.5" : "1";

      prevButton.style.pointerEvents = currentIndex === 0 ? "none" : "auto";
      nextButton.style.pointerEvents = currentIndex >= maxIndex ? "none" : "auto";
   }

   function slideToIndex(index) {
      currentIndex = Math.max(0, Math.min(index, maxIndex));
      updateSlider();
   }

   prevButton.addEventListener("click", () => slideToIndex(currentIndex - 1));
   nextButton.addEventListener("click", () => slideToIndex(currentIndex + 1));

   function recalculateSlider() {
      slideWidth = slides[0].offsetWidth;
      visibleSlides = Math.floor(container.offsetWidth / slideWidth);
      maxIndex = Math.max(0, slides.length - visibleSlides);
      slideToIndex(currentIndex);
   }

   // Ajustar en caso de resize con debounce para mejor rendimiento en móviles
   let resizeTimeout;
   window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(recalculateSlider, 200);
   });

   // Eliminar transiciones en hover para dispositivos móviles y mantener en desktop
   document.querySelectorAll(".company-icon").forEach((icon) => {
      icon.addEventListener("mouseenter", () => {
         if (window.matchMedia("(hover: hover)").matches) {
            icon.style.filter = "grayscale(0)";
         }
      });

      icon.addEventListener("mouseleave", () => {
         if (window.matchMedia("(hover: hover)").matches) {
            icon.style.filter = "grayscale(100%)";
         }
      });

      // Touch support para cambiar la escala al tocar en móviles
      icon.addEventListener("touchstart", () => {
         icon.style.filter = "grayscale(0)";
      });

      icon.addEventListener("touchend", () => {
         setTimeout(() => {
            icon.style.filter = "grayscale(100%)";
         }, 1000);
      });
   });

   // Iniciar con estado correcto
   updateButtons();
   recalculateSlider();
}); 