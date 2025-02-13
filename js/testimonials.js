document.addEventListener("DOMContentLoaded", function () {
    const modalOverlay = document.querySelector(".modal-overlay");
    const openModalBtn = document.querySelector(".open-modal-btn");
    const closeModalBtn = document.querySelector(".close-modal");
    const successMessage = document.querySelector(".success-message");
    const deleteBtn = document.querySelector(".delete-testimonials-btn");
    const testimonialsTrack = document.querySelector(".testimonials-track");
    const testimonialForm = document.getElementById("testimonialForm");
    const testimonialName = document.getElementById("testimonialName");
    const testimonialText = document.getElementById("testimonialText");

    // Testimonios predeterminados
    const defaultTestimonials = [
        { name: "John Champion", text: "Working with Leal Asesorias & Seguros LTDA was a remarkable experience. Their team provided invaluable guidance and helped me select a fantastic policy." },
        { name: "Clara Markes", text: "Leal Asesorias & Seguros LTDA's interactive consultations were instrumental in enhancing my understanding of insurance." },
        { name: "Mark Jackson", text: "Leal Asesorias & Seguros LTDA transformed my approach to insurance! Their team was incredibly knowledgeable." }
    ];

    // Cargar testimonios del localStorage o usar los predeterminados
    let testimonials = JSON.parse(localStorage.getItem("testimonials")) || defaultTestimonials;

    function saveTestimonials() {
        localStorage.setItem("testimonials", JSON.stringify(testimonials));
    }

    function createTestimonialCard(name, text) {
        return `
            <div class="testimonial-card">
                <div class="avatar">
                    <img src="https://i.pravatar.cc/80?img=${Math.floor(Math.random() * 70) + 1}" alt="${name}">
                </div>
                <div class="testimonial-content">
                    <h3 class="testimonial-name">${name}</h3>
                    <p class="testimonial-text">${text}</p>
                </div>
            </div>
        `;
    }

    function renderTestimonials() {
        testimonialsTrack.innerHTML = testimonials.map(testimonial => createTestimonialCard(testimonial.name, testimonial.text)).join("");
    }

    function addTestimonial(name, text) {
        testimonials.push({ name, text });
        saveTestimonials();
        renderTestimonials();
    }

    function deleteTestimonials() {
        if (confirm("¿Estás seguro de que quieres eliminar todos los testimonios? Esta acción no se puede deshacer.")) {
            testimonials = [...defaultTestimonials]; // Restaurar solo los predeterminados
            saveTestimonials();
            renderTestimonials();
            alert("Todos los testimonios han sido eliminados.");
        }
    }

    openModalBtn.addEventListener("click", () => {
        modalOverlay.style.display = "flex";
    });

    closeModalBtn.addEventListener("click", () => {
        modalOverlay.style.display = "none";
    });

    testimonialForm.addEventListener("submit", function (e) {
        e.preventDefault();
        if (testimonialName.value.trim() && testimonialText.value.trim()) {
            addTestimonial(testimonialName.value.trim(), testimonialText.value.trim());
            successMessage.style.display = "block";
            setTimeout(() => {
                modalOverlay.style.display = "none";
                successMessage.style.display = "none";
                testimonialForm.reset();
            }, 1500);
        }
    });

    deleteBtn.addEventListener("click", deleteTestimonials);

    renderTestimonials();

    window.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.style.display = "none";
        }
    });
});