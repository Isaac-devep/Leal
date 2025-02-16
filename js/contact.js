// Inicializar EmailJS con tu Public Key
(function() {
  emailjs.init("hZfzYD1vq1d1tQa3L"); // Reemplázalo con tu Public Key de EmailJS
})();

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById('subscriptionForm').addEventListener('submit', function(e) {
      e.preventDefault();

      const email = document.getElementById('emailInput').value.trim();
      const errorMessage = document.getElementById('errorMessage');

      // Validación de email
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          errorMessage.style.display = 'block';
          return;
      }
      errorMessage.style.display = 'none';

      // Función para extraer el primer nombre del correo
      function obtenerPrimerNombre(correo) {
          let nombre = correo.split('@')[0]; // Tomamos solo la parte antes del '@'
          nombre = nombre.replace(/\d+/g, ''); // Eliminamos números si los tiene
          nombre = nombre.split(/[._]/)[0]; // Si hay puntos o guiones bajos, tomamos la primera parte
          return nombre.charAt(0).toUpperCase() + nombre.slice(1); // Capitalizamos la primera letra
      }

      const primerNombre = obtenerPrimerNombre(email);

      // Configurar parámetros para EmailJS
      const templateParams = {
          to_email: email,  // Enviar al correo del usuario
          nombre_usuario: primerNombre, // Nombre dinámico
          subject: "¡Gracias por suscribirte a Leal Asesorías! 🎉"
      };

      // Enviar email usando EmailJS
      emailjs.send("service_dy1n83b", "template_mduyejd", templateParams) 
          .then(function(response) {
              alert(`✅ Gracias por suscribirte, ${primerNombre}! Hemos enviado un correo a ${email}.`);
              document.getElementById('emailInput').value = ''; // Limpiar input
          }, function(error) {
              console.error("Error al enviar:", error);
              alert("⚠ Ocurrió un error. Por favor intenta nuevamente.");
          });
  });
});