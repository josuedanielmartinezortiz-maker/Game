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

// =====================================================
// 🎮 GAMERPRO GAME — BASE PRINCIPAL
// =====================================================

import { precargarImagenes } from "./sistemas/precarga.js";
import { iniciarEscena1 } from "./escenas/escena1.js";

const game = document.getElementById("game");

// =====================================================
// 🖼️ RECURSOS
// =====================================================

const recursos = {
    escena1: "./assets/escena1.png",
    mike: "./assets/mike.png",
    micaela: "./assets/micaela.png",
    pollonoob: "./assets/pollonoob.png",
    huevo: "./assets/noob.png"
};

// =====================================================
// ⏳ PRECARGA
// =====================================================

precargarImagenes(
    recursos,
    (cargadas, total, nombre, correcta) => {

        if (correcta) {

            console.log(
                `✅ Cargada: ${nombre} (${cargadas}/${total})`
            );

        } else {

            console.error(
                `❌ FALLÓ: ${nombre}`
            );
        }
    }
)
.then((imagenes) => {

    console.log("🎮 ¡TODAS LAS IMÁGENES ESTÁN CARGADAS!");

    iniciarEscena1(game, imagenes);

})
.catch((error) => {

    console.error(
        "🚨 LA PRECARGA SE DETUVO:",
        error.message
    );
});
