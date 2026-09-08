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


// =====================================================
// 🎮 GAME
// =====================================================

const game =
    document.getElementById("game");


// =====================================================
// 🧪 DIAGNÓSTICO
// =====================================================

const diagnostico =
    document.createElement("div");

Object.assign(
    diagnostico.style,
    {
        position: "fixed",
        top: "10px",
        left: "10px",

        padding: "12px 16px",

        background:
            "rgba(0,0,0,0.90)",

        color:
            "#00ff66",

        fontFamily:
            "monospace",

        fontSize: "15px",

        lineHeight: "1.5",

        border:
            "2px solid #00ff66",

        borderRadius: "10px",

        zIndex: "20000",

        maxWidth: "90vw",

        whiteSpace:
            "pre-wrap",

        pointerEvents:
            "none"
    }
);

diagnostico.textContent =
    "🧪 DIAGNÓSTICO GAMERPRO\nPreparando...";

document.body.appendChild(
    diagnostico
);


function diagnosticar(
    mensaje
) {

    diagnostico.textContent +=
        `\n${mensaje}`;
}


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
// 🎬 PANTALLA DE CARGA
// =====================================================

diagnosticar(
    "📺 Creando pantalla de carga..."
);


const pantallaCarga =
    iniciarPantallaCarga(

        game,

        () => {

            // =============================================
            // 👆 BOTÓN PRESIONADO
            // =============================================

            diagnosticar(
                "🔥 BOTÓN PRESIONADO"
            );


            // =============================================
            // 🎬 ESCENA 1
            // =============================================

            diagnosticar(
                "🎬 INTENTANDO INICIAR ESCENA 1..."
            );


            try {

                iniciarEscena1(

                    game,

                    imagenes,

                    () => {

                        diagnosticar(
                            "✅ ESCENA 1 TERMINADA"
                        );


                        // =====================================
                        // 🎬 ESCENA 2
                        // =====================================

                        diagnosticar(
                            "🎬 INICIANDO ESCENA 2..."
                        );


                        try {

                            iniciarEscena2(
                                game,
                                imagenes
                            );

                            diagnosticar(
                                "✅ ESCENA 2 INICIADA"
                            );

                        } catch (error) {

                            diagnosticar(
                                "🔴 ERROR EN ESCENA 2:\n" +
                                error.message
                            );

                        }

                    }
                );


                diagnosticar(
                    "✅ ESCENA 1 FUE LLAMADA"
                );

            } catch (error) {

                diagnosticar(
                    "🔴 ERROR EN ESCENA 1:\n" +
                    error.message
                );

            }

        }
    );


// =====================================================
// 📥 CARGAR RECURSOS
// =====================================================

diagnosticar(
    "📦 Cargando recursos..."
);


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
// 🎮 RECURSOS LISTOS
// =====================================================

let imagenes;


promesaRecursos

    .then((resultado) => {

        imagenes =
            resultado;


        diagnosticar(
            "✅ TODOS LOS RECURSOS CARGADOS"
        );


        pantallaCarga
            .marcarCargaCompleta();

    })


    .catch((error) => {

        diagnosticar(
            "🚨 ERROR AL CARGAR:\n" +
            error.message
        );

    });
