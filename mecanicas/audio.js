// =====================================================
// 🎙️ GAMERPRO GAME — SISTEMA DE AUDIO
// =====================================================

// =====================================================
// 🔊 CACHÉ DE AUDIOS
// =====================================================

const audiosCargados = new Map();


// =====================================================
// 📥 CARGAR Y DECODIFICAR MP3
// =====================================================

async function cargarAudio(ruta) {

    // Si ya está cargado, reutilizarlo
    if (audiosCargados.has(ruta)) {

        return audiosCargados.get(ruta);
    }


    const audioContext =
        window.gamerproAudioContext;

    if (!audioContext) {

        throw new Error(
            "No existe gamerproAudioContext"
        );
    }


    console.log(
        `📥 Cargando voz: ${ruta}`
    );


    const respuesta =
        await fetch(ruta);

    if (!respuesta.ok) {

        throw new Error(
            `No se encontró el audio: ${ruta}`
        );
    }


    const datos =
        await respuesta.arrayBuffer();


    const buffer =
        await audioContext.decodeAudioData(
            datos
        );


    // Guardar en caché
    audiosCargados.set(
        ruta,
        buffer
    );


    console.log(
        `✅ Audio cargado: ${ruta}`
    );


    return buffer;
}


// =====================================================
// ▶️ REPRODUCIR VOZ
// =====================================================

export async function reproducirVoz(
    ruta,
    personaje
) {

    const audioContext =
        window.gamerproAudioContext;


    // =================================================
    // 🚨 VERIFICAR AUDIO
    // =================================================

    if (!audioContext) {

        console.error(
            "❌ No existe AudioContext."
        );

        return;
    }


    // =================================================
    // 🔓 ASEGURAR QUE ESTÉ ACTIVO
    // =================================================

    if (
        audioContext.state ===
        "suspended"
    ) {

        try {

            await audioContext.resume();

        } catch (error) {

            console.error(
                "❌ No se pudo activar el audio:",
                error
            );

            return;
        }
    }


    try {

        // =================================================
        // 📥 CARGAR MP3
        // =================================================

        const buffer =
            await cargarAudio(ruta);


        // =================================================
        // 🎵 CREAR REPRODUCTOR
        // =================================================

        const fuente =
            audioContext.createBufferSource();

        fuente.buffer =
            buffer;


        // =================================================
        // 🔊 VOLUMEN
        // =================================================

        const volumen =
            audioContext.createGain();

        volumen.gain.value = 1.0;


        // =================================================
        // 🔌 CONECTAR
        // =================================================

        fuente.connect(
            volumen
        );

        volumen.connect(
            audioContext.destination
        );


        // =================================================
        // ▶️ REPRODUCIR
        // =================================================

        fuente.start(0);


        console.log(
            `▶️ Reproduciendo ${personaje}: ${ruta}`
        );


        // =================================================
        // 🧹 LIMPIAR AL TERMINAR
        // =================================================

        fuente.addEventListener(
            "ended",
            () => {

                fuente.disconnect();

                volumen.disconnect();

            }
        );


    } catch (error) {

        console.error(
            `❌ Error reproduciendo ${personaje}:`,
            error
        );

    }
                }
