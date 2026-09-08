
// =====================================================
// 🎙️ GAMERPRO GAME — AUDIO DE DIAGNÓSTICO
// =====================================================

export function reproducirVoz(ruta, personaje) {

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
            background: "rgba(0,0,0,0.9)",
            color: "white",
            fontFamily: "Arial, sans-serif",
            fontSize: "16px",
            textAlign: "center",
            borderRadius: "10px",
            zIndex: "99999"
        });

        document.body.appendChild(aviso);
    }

    aviso.textContent =
        `🔊 Intentando reproducir ${personaje}...`;

    const audio = new Audio();

    audio.preload = "auto";
    audio.volume = 1.0;

    audio.addEventListener("loadeddata", () => {

        aviso.textContent =
            `📦 Archivo cargado: ${personaje}`;

    });

    audio.addEventListener("canplaythrough", () => {

        aviso.textContent =
            `✅ Audio listo: ${personaje}`;

    });

    audio.addEventListener("error", () => {

        aviso.textContent =
            `❌ ERROR AL CARGAR: ${ruta}`;

    });

    audio.src = ruta;

    const promesa = audio.play();

    if (promesa) {

        promesa
            .then(() => {

                aviso.textContent =
                    `▶️ REPRODUCIENDO: ${personaje}`;

                setTimeout(() => {

                    if (aviso) {
                        aviso.remove();
                    }

                }, 1500);

            })
            .catch((error) => {

                console.error(error);

                aviso.textContent =
                    `🚫 EL NAVEGADOR BLOQUEÓ EL AUDIO`;

            });

    }

    return audio;
}
