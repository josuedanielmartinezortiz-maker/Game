// =====================================================
// 🎙️ GAMERPRO GAME — PRUEBA DE AUDIO
// =====================================================

export function reproducirVoz(ruta, personaje) {

    // Crear mensaje visible
    let aviso = document.getElementById("avisoAudio");

    if (!aviso) {
        aviso = document.createElement("div");
        aviso.id = "avisoAudio";

        Object.assign(aviso.style, {
            position: "fixed",
            top: "20px",
            left: "20px",
            right: "20px",
            padding: "15px",
            background: "rgba(0,0,0,0.85)",
            color: "white",
            fontFamily: "Arial",
            fontSize: "16px",
            textAlign: "center",
            borderRadius: "10px",
            zIndex: "99999"
        });

        document.body.appendChild(aviso);
    }

    aviso.textContent =
        `🔊 Cargando voz de ${personaje}...`;

    const audio = new Audio(ruta);

    audio.volume = 1.0;
    audio.preload = "auto";

    audio.addEventListener("canplaythrough", () => {

        aviso.textContent =
            `✅ Audio encontrado: ${ruta}`;

    });

    audio.addEventListener("error", () => {

        aviso.textContent =
            `❌ NO SE ENCONTRÓ: ${ruta}`;

    });

    audio.play()
        .then(() => {

            aviso.textContent =
                `▶️ Reproduciendo ${personaje}`;

            setTimeout(() => {
                aviso.remove();
            }, 1500);

        })
        .catch(() => {

            aviso.textContent =
                "🚫 El navegador bloqueó la reproducción automática.";

        });

    return audio;
}

Ahora inicia el juego.

👀 ¿Qué queremos ver?

Si aparece:

"❌ NO SE ENCONTRÓ"
→ tenemos que corregir el nombre/ruta del MP3.

"🚫 El navegador bloqueó..."
→ encontramos el problema: el navegador está impidiendo que la escena reproduzca audio automáticamente.

"▶️ Reproduciendo MICAELA"
→ ¡el audio funciona! Entonces pasamos al tono de Micaela y Mike. 🎙️

Y tranquilo: este código es solamente para diagnosticar. Después lo quitamos y dejamos el juego limpio.
