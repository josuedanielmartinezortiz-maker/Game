// =====================================================
// 🎙️ GAMERPRO GAME — AUDIO
// =====================================================

const audiosCargados = new Map();


// =====================================================
// 📥 CARGAR MP3
// =====================================================

async function cargarAudio(ruta) {

    if (audiosCargados.has(ruta)) {
        return audiosCargados.get(ruta);
    }

    const audioContext =
        window.gamerproAudioContext;

    if (!audioContext) {
        throw new Error(
            "NO EXISTE AUDIOCONTEXT"
        );
    }

    mostrarMensaje(
        "📥 Cargando: " + ruta
    );

    const respuesta =
        await fetch(ruta);

    if (!respuesta.ok) {
        throw new Error(
            "MP3 NO ENCONTRADO: " + ruta
        );
    }

    const datos =
        await respuesta.arrayBuffer();

    const buffer =
        await audioContext.decodeAudioData(
            datos
        );

    audiosCargados.set(
        ruta,
        buffer
    );

    return buffer;
}


// =====================================================
// 🔊 REPRODUCIR VOZ
// =====================================================

export async function reproducirVoz(
    ruta,
    personaje
) {

    mostrarMensaje(
        `🔊 Intentando voz de ${personaje}...`
    );

    const audioContext =
        window.gamerproAudioContext;

    if (!audioContext) {

        mostrarMensaje(
            "❌ NO EXISTE AUDIOCONTEXT"
        );

        return;
    }


    // =================================================
    // 🔓 ACTIVAR CONTEXTO
    // =================================================

    if (audioContext.state !== "running") {

        try {

            await audioContext.resume();

        } catch (error) {

            mostrarMensaje(
                "❌ AUDIO BLOQUEADO"
            );

            return;
        }
    }


    try {

        // Cargar MP3
        const buffer =
            await cargarAudio(ruta);


        // Crear reproductor
        const fuente =
            audioContext.createBufferSource();

        fuente.buffer =
            buffer;


        // Volumen
        const volumen =
            audioContext.createGain();

        volumen.gain.value = 1.0;


        // Conectar
        fuente.connect(
            volumen
        );

        volumen.connect(
            audioContext.destination
        );


        // Reproducir
        fuente.start(0);


        mostrarMensaje(
            `▶️ REPRODUCIENDO ${personaje}`
        );


        fuente.addEventListener(
            "ended",
            () => {

                fuente.disconnect();
                volumen.disconnect();

            }
        );


    } catch (error) {

        mostrarMensaje(
            "❌ ERROR: " +
            error.message
        );

        console.error(
            "Error de audio:",
            error
        );
    }
}


// =====================================================
// 🖥️ MENSAJE VISIBLE
// =====================================================

function mostrarMensaje(texto) {

    let aviso =
        document.getElementById(
            "avisoAudio"
        );

    if (!aviso) {

        aviso =
            document.createElement("div");

        aviso.id =
            "avisoAudio";

        Object.assign(
            aviso.style,
            {
                position: "fixed",
                top: "20px",
                left: "20px",
                right: "20px",
                padding: "15px",
                background: "rgba(0,0,0,0.9)",
                color: "white",
                fontFamily: "Arial",
                fontSize: "16px",
                textAlign: "center",
                borderRadius: "10px",
                zIndex: "99999"
            }
        );

        document.body.appendChild(
            aviso
        );
    }

    aviso.textContent =
        texto;
}
