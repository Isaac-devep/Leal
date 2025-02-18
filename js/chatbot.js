let currentStep = 0;
let userResponses = {};
const chatFlow = [
  {
    message:
      "¡Bienvenidos a Leal Asesorías & Seguros! ¿Qué tipo de servicio está interesado?",
    options: [
      "Venta de ARL",
      "Intermediación ARL",
      "Batería del Riesgo Psicosocial",
      "Asesoría en SG-SST",
    ],
  },
  {
    message: "¿En qué nivel de riesgo se encuentra su empresa? (I - V)",
    options: ["I", "II", "III", "IV", "V"],
  },
  {
    message: "¿Desea su empresa realizar un cambio de ARL?",
    options: ["Sí", "No"],
  },
  {
    message: "¿Cuántos trabajadores tiene la empresa?",
    select: true,
    options: [
      "1-10 (Trabajadores Fijos)",
      "11-50 (Trabajadores Fijos)",
      "51-200 (Trabajadores Fijos)",
      "201-500 (Trabajadores Fijos)",
      "500+ (Trabajadores Fijos)",
    ],
  },
  {
    message: "¡Gracias por sus respuestas! Haga clic para enviar su cotización:",
    whatsapp: true,
  },
];

function toggleChat() {
  const chat = document.getElementById("chatBot");
  chat.classList.toggle("active");
  const chatIcon = document.getElementById("chatIcon");
  chatIcon.style.display = chat.classList.contains("active") ? "none" : "flex";
}

function startChat() {
  if (!document.getElementById("chatBot").classList.contains("active")) {
    currentStep = 0;
    userResponses = {};
    document.getElementById("chatMessages").innerHTML = "";
    document.getElementById("chatOptions").innerHTML = "";
    showStep(0);
    toggleChat();
  }
}

function showStep(step) {
  const stepData = chatFlow[step];
  const messagesDiv = document.getElementById("chatMessages");
  const optionsDiv = document.getElementById("chatOptions");

  messagesDiv.innerHTML += `<div class="message bot-message">${stepData.message}</div>`;
  optionsDiv.innerHTML = "";

  if (stepData.whatsapp) {
    const mensaje = `*Cotización Leal Seguros*\n\n` +
      `- 📜 Servicio: ${userResponses.servicio || "Sin especificar"}\n` +
      `- 📊 Nivel de riesgo: ${userResponses.nivelRiesgo || "Sin especificar"}\n` +
      `- 🔄 Cambio ARL: ${userResponses.cambioARL || "Sin especificar"}\n` +
      `- 👥 Trabajadores: ${userResponses.trabajadores || "Sin especificar"}`;

    const mensajeCodificado = encodeURIComponent(mensaje)
      .replace(/%20/g, " ")
      .replace(/%2A/g, "*")
      .replace(/%0A/g, "%0A");

    optionsDiv.innerHTML = `
      <div class="whatsapp-actions">
        <a href="https://wa.me/573012852588?text=${mensajeCodificado}" 
           class="whatsapp-link" 
           target="_blank"
           id="whatsappLink">
            📤 Enviar por WhatsApp
        </a>
        <button class="copy-btn" onclick="copyToClipboard()">
            📋 Copiar mensaje
        </button>
      </div>`;
  } else if (stepData.select) {
    const select = document.createElement("select");
    select.className = "option-select";
    stepData.options.forEach((option) => {
      select.innerHTML += `<option value="${option}">${option}</option>`;
    });
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = "Seleccionar";
    btn.onclick = () => {
      if (select.value) {
        handleResponse(select.value);
      }
    };
    optionsDiv.append(select, btn);
  } else {
    stepData.options?.forEach((option) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.textContent = option;
      btn.onclick = () => handleResponse(option);
      optionsDiv.appendChild(btn);
    });
  }

  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function handleResponse(response) {
  document.getElementById("chatMessages").innerHTML += `<div class="message user-message">${response}</div>`;

  switch (currentStep) {
    case 0:
      userResponses.servicio = response;
      break;
    case 1:
      userResponses.nivelRiesgo = response;
      break;
    case 2:
      userResponses.cambioARL = response;
      break;
    case 3:
      userResponses.trabajadores = response;
      break;
  }

  currentStep++;
  if (currentStep >= chatFlow.length) {
    currentStep = 0;
    userResponses = {};
    setTimeout(() => {
      toggleChat();
      document.getElementById("chatMessages").innerHTML = "";
    }, 3000);
  } else {
    setTimeout(() => showStep(currentStep), 800);
  }
}

function copyToClipboard() {
  const mensaje = `*Cotización Leal Seguros*\n\n` +
    `- 📜 Servicio: ${userResponses.servicio || "Sin especificar"}\n` +
    `- 📊 Nivel de riesgo: ${userResponses.nivelRiesgo || "Sin especificar"}\n` +
    `- 🔄 Cambio ARL: ${userResponses.cambioARL || "Sin especificar"}\n` +
    `- 👥 Trabajadores: ${userResponses.trabajadores || "Sin especificar"}`;

  navigator.clipboard.writeText(mensaje)
    .then(() => {
      showCopyFeedback();
    })
    .catch((err) => {
      console.error("Error al copiar:", err);
      showCopyFeedback(err);
    });
}

function showCopyFeedback(error = null) {
  const feedback = document.createElement("div");
  feedback.className = "copy-feedback";

  feedback.style.position = "fixed";
  feedback.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.3)";
  feedback.style.zIndex = "100000000";
  feedback.style.textAlign = "center";
  feedback.style.margin = "0 auto";

  if (error) {
    feedback.innerHTML = `
      <div class="guide-steps">
        <div class="step">💥 ¡Ups! Algo salió mal</div>
        <div class="step">🖱️ Haz clic derecho y selecciona "Copiar".</div>
      </div>
    `;
  } else {
    feedback.innerHTML = `
      <div class="guide-steps">
        <div class="step">🎉 ¡Mensaje copiado!</div>
        <div class="step">👉 Sigue estos pasos:</div>
        <div class="step">🟢💬 1. Abre WhatsApp</div>
        <div class="step">📱 2. Busca el número: <span class="number">+57 301 2852588</span></div>
        <div class="step">📋 3. Pega (Ctrl+V)</div>
        <button class="open-whatsapp" onclick="window.open('https://wa.me/573012852588', '_blank')">
            🚀 ¡Abrir WhatsApp Ahora!
        </button>
      </div>
    `;
  }

  document.body.appendChild(feedback);
  setTimeout(() => {
    if (document.body.contains(feedback)) {
      feedback.style.animation = "bounceOut 0.6s ease";
      setTimeout(() => feedback.remove(), 500);
    }
  }, 10000);
}

window.addEventListener("load", () => {
  document.getElementById("chatIcon").style.display = "flex";
  document.getElementById("chatIcon").addEventListener("click", startChat);
});
