// =====================================================
// 🎙️ GAMERPRO GAME — SISTEMA DE AUDIO
// =====================================================

// Ajustes de voz
const AJUSTES_VOZ = {
    MICAELA: {
        tono: 1.10
    },

    MIKE: {
        tono: 1.04
    }
};

// Reproduce una voz con el ajuste correspondiente
export function reproducirVoz(ruta, personaje) {

    const audio = new Audio(ruta);

    audio.preload = "auto";
    audio.volume = 0.9;

    const ajuste = AJUSTES_VOZ[personaje];

    if (ajuste) {
        audio.playbackRate = ajuste.tono;
    }

    audio.currentTime = 0;

    audio.play().catch((error) => {
        console.warn(
            "🔊 No se pudo reproducir la voz:",
            error
        );
    });

    return audio;
          }
