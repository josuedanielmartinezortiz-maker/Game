// =====================================================
// 🎙️ GAMERPRO GAME — VOCES
// =====================================================

import { reproducirVoz } from "./audio.js";

// =====================================================
// 🎙️ AUDIOS
// =====================================================

const AUDIOS = {

    MICAELA: {
        "¿Qué hacemos aquí, Mike?":
            "./assets/voces/Micaela01.mp3",

        "¿Qué es eso, Mike?":
            "./assets/voces/Micaela02.mp3"
    },

    MIKE: {
        "No sé.":
            "./assets/voces/Mike01.mp3",

        "No sé, deberíamos averiguarlo.":
            "./assets/voces/Mike02.mp3"
    }

};

// =====================================================
// 🔊 HABLAR
// =====================================================

export function hablarSuave(texto, esMicaela = false) {

    const personaje =
        esMicaela ? "MICAELA" : "MIKE";

    const audios = AUDIOS[personaje];

    if (!audios) {
        console.warn(
            `⚠️ No existe el personaje: ${personaje}`
        );
        return;
    }

    const ruta = audios[texto.trim()];

    if (!ruta) {
        console.warn(
            `⚠️ No hay audio para: "${texto}"`
        );
        return;
    }

    reproducirVoz(
        ruta,
        personaje
    );
        }
