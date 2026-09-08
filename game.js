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

    // 🐔 POLLOS
    pollonoob: "./assets/pollonoob.png",
    noob: "./assets/noob.png",
    pollozombie: "./assets/pollo zombie.png",
    pollitonoob: "./assets/pollitonoob.png"
};


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
        (
            cargadas,
            total,
            nombre,
            correcta
        ) => {

            console.log(
                `${correcta ? "✅" : "❌"} ${nombre} (${cargadas}/${total})`
            );


            // 📊 ACTUALIZAR PANTALLA

            if (
                typeof window.gamerproActualizarCarga ===
                "function"
            ) {

                window.gamerproActualizarCarga(
                    cargadas,
                    total,
                    nombre,
                    correcta
                );
            }
        }
    );


// =====================================================
// 🎮 CUANDO TODO ESTÉ CARGADO
// =====================================================

promesaRecursos
    .then(async (imagenes) => {

        console.log(
            "🎮 ¡TODOS LOS RECURSOS ESTÁN LISTOS!"
        );


        // =================================================
        // ✅ AVISAR A LA PANTALLA
        // =================================================

        if (
            typeof window.gamerproCargaCompleta ===
            "function"
        ) {

            window.gamerproCargaCompleta();
        }


        // =================================================
        // 👆 ESPERAR AL BOTÓN
        // =================================================

        await promesaPantalla;


        console.log(
            "🔊 AUDIO DESBLOQUEADO"
        );


        // =================================================
        // 🎬 ESCENA 1
        // =================================================

        iniciarEscena1(
            game,
            imagenes,

            () => {

                // =================================================
                // 🎬 ESCENA 2
                // =================================================

                iniciarEscena2(
                    game,
                    imagenes
                );

            }
        );

    })


    // =====================================================
    // ❌ ERROR DE CARGA
    // =====================================================

    .catch((error) => {

        console.error(
            "🚨 ERROR AL CARGAR EL JUEGO:",
            error
        );

    });
