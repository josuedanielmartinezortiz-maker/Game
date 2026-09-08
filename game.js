// =====================================================
// 🎮 GAMERPRO GAME — GAME.JS
// =====================================================

import { precargarImagenes }
    from "./sistemas/precarga.js";

import { iniciarPantallaCarga }
    from "./sistemas/pantallaCarga.js";

import { iniciarEscena1 }
    from "./escenas/escena1.js";

import { iniciarEscena2 }
    from "./escenas/escena2.js";


const game =
    document.getElementById("game");


// =====================================================
// 📦 RECURSOS
// =====================================================

const recursos = {

    escena1:
        "./assets/escena1.png",

    escena2:
        "./assets/escena2.png",


    mike:
        "./assets/mike.png",

    micaela:
        "./assets/micaela.png",


    mikeespalda:
        "./assets/mikeespalda.png",

    micaelaespalda:
        "./assets/micaelaespalda.png",


    // 🐔 POLLOS

    pollonoob:
        "./assets/pollonoob.png",

    noob:
        "./assets/noob.png",

    pollozombie:
        "./assets/pollozombie.png",

    pollitonoob:
        "./assets/pollitonoob.png"
};


// =====================================================
// 🎬 CREAR PANTALLA DE CARGA
// =====================================================

const pantallaCarga =
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

            pantallaCarga.actualizarCarga(
                cargadas,
                total,
                nombre,
                correcta
            );
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


        // =============================================
        // ✅ MOSTRAR BOTÓN
        // =============================================

        pantallaCarga
            .marcarCargaCompleta();


        // =============================================
        // 👆 ESPERAR AL JUGADOR
        // =============================================

        await pantallaCarga
            .promesaInicio;


        console.log(
            "🚀 INICIANDO GAMERPRO GAME"
        );


        // =============================================
        // 🎬 ESCENA 1
        // =============================================

        iniciarEscena1(

            game,

            imagenes,

            () => {

                // =====================================
                // 🎬 ESCENA 2
                // =====================================

                iniciarEscena2(
                    game,
                    imagenes
                );

            }
        );

    })


    // =================================================
    // ❌ ERROR
    // =================================================

    .catch((error) => {

        console.error(
            "🚨 ERROR AL CARGAR EL JUEGO:",
            error
        );

    });
