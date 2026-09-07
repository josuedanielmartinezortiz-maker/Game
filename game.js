// =====================================================
// 🎮 GAMERPRO GAME — BASE PRINCIPAL
// =====================================================

import { precargarImagenes } from "./sistemas/precarga.js";
import { iniciarEscena1 } from "./escenas/escena1.js";
import { iniciarEscena2 } from "./escenas/escena2.js";
const game = document.getElementById("game");

const recursos = {
    escena1: "./assets/escena1.png",
    escena2: "./assets/escena2.png",
    mike: "./assets/mike.png",
    micaela: "./assets/micaela.png",
    mikeespalda: "./assets/mikeespalda.png",
    micaelaespalda: "./assets/micaelaespalda.png"
};

precargarImagenes(
    recursos,
    (cargadas, total, nombre, correcta) => {

        if (correcta) {
            console.log(
                `✅ Cargada: ${nombre} (${cargadas}/${total})`
            );
        } else {
            console.error(`❌ FALLÓ: ${nombre}`);
        }
    }
)
.then((imagenes) => {

    console.log("🎮 ¡ESCENA 1 LISTA!");

    iniciarEscena2(game, imagenes);

})
.catch((error) => {

    console.error(
        "🚨 LA PRECARGA SE DETUVO:",
        error.message
    );
});
