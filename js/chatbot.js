let currentStep=0;let userResponses={};const chatFlow=[{message:"¡Bienvenido a Leal Asesorías & Seguros! ¿Desea recibir asesoría en sistemas de gestión de seguridad y salud en el trabajo (SG-SST)?",options:["Sí","No"],},{message:"¿Qué nivel de riesgo psicosocial tiene identificado actualmente?",options:["I","II","III","IV","V"],conditional:"Sí",},{message:"¿Cuántos trabajadores tiene la empresa?",select:!0,options:["1-10 (Trabajadores Fijos)","11-50 (Trabajadores Fijos)","51-200 (Trabajadores Fijos)","201-500 (Trabajadores Fijos)","500+ (Trabajadores Fijos)",],conditional:"Sí",},{message:"¿Desea una asesoría en sistemas de gestión SST?",options:["Sí","No"],conditional:!0,},{message:"¿Desea realizar un cambio de ARL?",options:["Sí","No"],conditional:!0,},{message:"¡Gracias por sus respuestas! Haga clic para enviar su cotización:",whatsapp:!0,conditional:!0,},];function toggleChat(){const chat=document.getElementById("chatBot");chat.classList.toggle("active");const chatIcon=document.getElementById("chatIcon");chatIcon.style.display=chat.classList.contains("active")?"none":"flex"}
function startChat(){if(!document.getElementById("chatBot").classList.contains("active")){currentStep=0;userResponses={};document.getElementById("chatMessages").innerHTML="";document.getElementById("chatOptions").innerHTML="";showStep(0);toggleChat()}}
function showStep(step){const stepData=chatFlow[step];const messagesDiv=document.getElementById("chatMessages");const optionsDiv=document.getElementById("chatOptions");if(stepData.conditional&&userResponses.asesoriaSGSST==="No"&&step<3){currentStep=3;return showStep(3)}
messagesDiv.innerHTML+=`<div class="message bot-message">${stepData.message}</div>`;optionsDiv.innerHTML="";if(stepData.whatsapp){const mensaje=`*Cotización Leal Seguros*\n\n`+`- 🛡️ Asesoría SG-SST: ${
        userResponses.asesoriaSGSST || "Sin especificar"
      }\n`+`- 📊 Nivel riesgo: ${userResponses.nivelRiesgo || "Sin especificar"}\n`+`- 👥 Trabajadores: ${
        userResponses.trabajadores || "Sin especificar"
      }\n`+`- 🔧 Gestión SST: ${userResponses.gestionSST || "Sin especificar"}\n`+`- 🔄 Cambio ARL: ${userResponses.cambioARL || "Sin especificar"}`;const mensajeCodificado=encodeURIComponent(mensaje).replace(/%20/g," ").replace(/%2A/g,"*").replace(/%0A/g,"%0A").replace(/%E2%9A%A1/g,"⚡").replace(/%F0%9F%94%A7/g,"🔧");optionsDiv.innerHTML=`
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
</div>`}else if(stepData.select){const select=document.createElement("select");select.className="option-select";stepData.options.forEach((option)=>{select.innerHTML+=`<option value="${option}">${option}</option>`});const btn=document.createElement("button");btn.className="option-btn";btn.textContent="Seleccionar";btn.onclick=()=>{if(select.value){handleResponse(select.value)}};optionsDiv.append(select,btn)}else{stepData.options?.forEach((option)=>{const btn=document.createElement("button");btn.className="option-btn";btn.textContent=option;btn.onclick=()=>handleResponse(option);optionsDiv.appendChild(btn)})}
messagesDiv.scrollTop=messagesDiv.scrollHeight}
function handleResponse(response){document.getElementById("chatMessages").innerHTML+=`<div class="message user-message">${response}</div>`;switch(currentStep){case 0:userResponses.asesoriaSGSST=response;break;case 1:userResponses.nivelRiesgo=response;break;case 2:userResponses.trabajadores=response;break;case 3:userResponses.gestionSST=response;break;case 4:userResponses.cambioARL=response;break}
currentStep++;if(currentStep>=chatFlow.length){currentStep=0;userResponses={};setTimeout(()=>{toggleChat();document.getElementById("chatMessages").innerHTML=""},3000)}else{setTimeout(()=>showStep(currentStep),800)}}
function copyToClipboard(){const mensaje=`*Cotización Leal Seguros*\n\n`+`- 🛡️ Asesoría SG-SST: ${
      userResponses.asesoriaSGSST || "Sin especificar"
    }\n`+`- 📊 Nivel riesgo: ${userResponses.nivelRiesgo || "Sin especificar"}\n`+`- 👥 Trabajadores: ${userResponses.trabajadores || "Sin especificar"}\n`+`- 🔧 Gestión SST: ${userResponses.gestionSST || "Sin especificar"}\n`+`- 🔄 Cambio ARL: ${userResponses.cambioARL || "Sin especificar"}`;const mensajeCodificado=encodeURIComponent(mensaje).replace(/%20/g," ").replace(/%2A/g,"*").replace(/%0A/g,"%0A").replace(/%E2%9A%A1/g,"⚡").replace(/%F0%9F%94%A7/g,"🔧");navigator.clipboard.writeText(mensaje).then(()=>{showCopyFeedback(mensajeCodificado)}).catch((err)=>{showCopyFeedback(null,err)})}
function showCopyFeedback(mensajeCodificado,error=null){const feedback=document.createElement("div");feedback.className="copy-feedback";if(error){feedback.innerHTML=`
            <div class="guide-steps">
                <div class="step">💥 ¡Ups! Algo salió mal</div>
                <div class="step">🖱️ Haz clic derecho y selecciona "Copiar":</div>
                <div class="manual-message">${mensaje.replace(
                  /\n/g,
                  "<br>"
                )}</div>
            </div>
        `}else{feedback.innerHTML=`
            <div class="guide-steps">
                <div class="step">🎉 ¡Mensaje copiado!</div>
                <div class="step">👉 Sigue estos pasos:</div>
                <div class="step">
                🟢💬 1. Abre WhatsApp
                </div>
                <div class="step">
                    📱 2. Busca el número:
                    <span class="number">+57 301 2852588</span>
                </div>
                <div class="step">📋 3. Pega (Ctrl+V)</div>
                <button class="open-whatsapp" onclick="window.open('https://wa.me/573012852588?text=${mensajeCodificado}', '_blank')">
                    🚀 ¡Abrir WhatsApp Ahora!
                </button>
            </div>
        `}
document.body.appendChild(feedback);setTimeout(()=>{if(document.body.contains(feedback)){feedback.style.animation="bounceOut 0.6s ease";setTimeout(()=>feedback.remove(),500)}},10000)}
window.addEventListener("load",()=>{document.getElementById("chatIcon").style.display="flex";document.getElementById("chatIcon").addEventListener("click",startChat)})