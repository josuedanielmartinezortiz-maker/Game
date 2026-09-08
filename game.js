import { precargarImagenes } from "./sistemas/precarga.js";
import { iniciarPantallaCarga } from "./sistemas/pantallaCarga.js";

import { iniciarEscena1 } from "./escenas/escena1.js";
import { iniciarEscena2 } from "./escenas/escena2.js";

const game = document.getElementById("game");


// =====================================================
// 📦 RECURSOS
// =====================================================

const recursos = {

    escena1: "./assets/escena1.png",
    escena2: "./assets/escena2.png",

    mike: "./assets/mike.png",
    micaela: "./assets/micaela.png",

    mikeespalda: "./assets/mikeespalda.png",
    micaelaespalda: "./assets/micaelaespalda.png",

    // 🐔 ESCENA 2
    pollonoob: "./assets/pollonoob.png",
    noob: "./assets/noob.png"
};
pollozombie: "./assets/pollo zombie.png",
pollitonoob: "./assets/pollitonoob.png"


// =====================================================
// 🎬 PANTALLA DE CARGA
// =====================================================

const promesaPantalla =
    iniciarPantallaCarga(game);


// =====================================================
// 📥 PRECARGAR RECURSOS
// =====================================================

const promesaRecursos =
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
    );


// =====================================================
// 🎮 CUANDO TODO ESTÉ LISTO
// =====================================================

promesaRecursos
    .then(async (imagenes) => {

        console.log("🎮 ¡RECURSOS LISTOS!");

        await promesaPantalla;

        console.log("🔊 AUDIO DESBLOQUEADO");

        iniciarEscena1(
            game,
            imagenes,
            () => iniciarEscena2(game, imagenes)
        );

    })
    .catch((error) => {

        console.error(
            "🚨 ERROR AL CARGAR EL JUEGO:",
            error
        );

    });
