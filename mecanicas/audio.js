// =====================================================
// 🎙️ GAMERPRO GAME — SISTEMA DE AUDIO
// =====================================================

const audiosCargados = new Map();

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
        await audioContext.decodeAudioData(datos);

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

    const audioContext =
        window.gamerproAudioContext;

    if (!audioContext) {
        console.error(
            "❌ NO EXISTE AUDIOCONTEXT"
        );
        return;
    }

    try {

        if (audioContext.state !== "running") {
            await audioContext.resume();
        }

        const buffer =
            await cargarAudio(ruta);

        const fuente =
            audioContext.createBufferSource();

        fuente.buffer =
            buffer;


        // =================================================
        // 🎙️ EFECTOS DE VOZ
        // =================================================

        if (personaje === "MICAELA") {

            // 🌸 Micaela:
            // Un poco más aguda y ligera.
            fuente.playbackRate.value = 1.10;


            // Filtro suave para darle un tono
            // un poco más limpio.
            const filtro =
                audioContext.createBiquadFilter();

            filtro.type = "highshelf";

            filtro.frequency.value = 2500;

            filtro.gain.value = 2;


            // Volumen
            const volumen =
                audioContext.createGain();

            volumen.gain.value = 0.95;


            // Conexiones
            fuente.connect(filtro);

            filtro.connect(volumen);

            volumen.connect(
                audioContext.destination
            );


            fuente.start(0);


            fuente.addEventListener(
                "ended",
                () => {
                    fuente.disconnect();
                    filtro.disconnect();
                    volumen.disconnect();
                }
            );

            console.log(
                "🌸 VOZ MICAELA PROCESADA"
            );

            return;
        }


        // =================================================
        // 👦 MIKE — VOZ ORIGINAL
        // =================================================

        const volumen =
            audioContext.createGain();

        volumen.gain.value = 1.0;

        fuente.connect(
            volumen
        );

        volumen.connect(
            audioContext.destination
        );

        fuente.start(0);

        fuente.addEventListener(
            "ended",
            () => {
                fuente.disconnect();
                volumen.disconnect();
            }
        );

        console.log(
            "👦 VOZ MIKE ORIGINAL"
        );

    } catch (error) {

        console.error(
            "❌ ERROR DE AUDIO:",
            error
        );
    }
}
