// =====================================================
// 🎮 GAMERPRO GAME — BASE PRINCIPAL
// =====================================================

import { precargarImagenes } from "./sistemas/precarga.js";
import { iniciarEscena1 } from "./escenas/escena1.js";

// =====================================================
// 🧠 ELEMENTO PRINCIPAL DEL JUEGO
// =====================================================

const game = document.getElementById("game");

// =====================================================
// 🖼️ RECURSOS DE LA ESCENA 1
// =====================================================

const recursos = {
    escena1: "./assets/escena1.png",
    mike: "./assets/mike.png",
    micaela: "./assets/micaela.png",
    pollonoob: "./assets/pollonoob.png",
    huevo: "./assets/noob.png"
};

// =====================================================
// 🚀 PRECARGAR TODO
// =====================================================

precargarImagenes(recursos)
    .then((imagenes) => {

        console.log("✅ Todas las imágenes están cargadas.");

        iniciarEscena1(game, imagenes);

    })
    .catch((error) => {

        console.error(
            "❌ Error al cargar los recursos:",
            error
        );

    });
