document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".testimonials-track");
    const cards = document.querySelectorAll(".testimonial-card");
    const prevButton = document.querySelector(".nav-button.prev");
    const nextButton = document.querySelector(".nav-button.next");

    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth;
    const maxIndex = cards.length - 1;

    function updateCards() {
      cards.forEach((card, index) => {
        if (index === currentIndex) {
          card.classList.add("active");
          card.classList.remove("inactive");
        } else {
          card.classList.add("inactive");
          card.classList.remove("active");
        }
      });
    }

    function updateButtons() {
      prevButton.style.opacity = currentIndex === 0 ? "0.5" : "1";
      nextButton.style.opacity = currentIndex === maxIndex ? "0.5" : "1";
    }

    function slideToIndex(index) {
      currentIndex = Math.max(0, Math.min(index, maxIndex));
      const offset = currentIndex * -(cardWidth + 32); // 32px is the gap
      track.style.transform = `translateX(${offset}px)`;
      updateButtons();
      updateCards();
    }

    prevButton.addEventListener("click", () => {
      slideToIndex(currentIndex - 1);
    });

    nextButton.addEventListener("click", () => {
      slideToIndex(currentIndex + 1);
    });

    // Initialize
    updateButtons();
    updateCards();

    // Handle window resize
    window.addEventListener("resize", () => {
      const newCardWidth = cards[0].offsetWidth;
      slideToIndex(currentIndex);
    });
  });