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
// 🎮 CONTENEDOR DEL JUEGO
// =====================================================

const game =
    document.getElementById("game");


// =====================================================
// 🧪 DIAGNÓSTICO VISIBLE
// =====================================================

const diagnostico =
    document.createElement("div");

Object.assign(
    diagnostico.style,
    {
        position: "fixed",

        top: "10px",
        left: "10px",

        width: "calc(100vw - 20px)",

        padding: "12px",

        boxSizing: "border-box",

        background:
            "rgba(0,0,0,0.92)",

        color:
            "#00ff66",

        fontFamily:
            "monospace",

        fontSize: "15px",

        lineHeight: "1.4",

        border:
            "2px solid #00ff66",

        borderRadius:
            "10px",

        zIndex:
            "9000",

        whiteSpace:
            "pre-wrap",

        pointerEvents:
            "none"
    }
);

diagnostico.textContent =
    "🧪 GAMERPRO\nPreparando...";

document.body.appendChild(
    diagnostico
);


// =====================================================
// 🧪 DIAGNÓSTICO
// =====================================================

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
// 🖼️ IMÁGENES
// =====================================================

let imagenes = null;


// =====================================================
// 🎬 INICIAR JUEGO
// =====================================================

function iniciarJuego() {

    diagnosticar(
        "🔥 BOTÓN PRESIONADO"
    );

    diagnosticar(
        "🚀 INICIANDO GAMERPRO GAME..."
    );


    // ================================================
    // 🖼️ COMPROBAR RECURSOS
    // ================================================

    if (!imagenes) {

        diagnosticar(
            "🔴 ERROR: LAS IMÁGENES NO ESTÁN LISTAS"
        );

        return;
    }


    diagnosticar(
        "✅ IMÁGENES DISPONIBLES"
    );


    // ================================================
    // 🎬 ESCENA 1
    // ================================================

    diagnosticar(
        "🎬 INICIANDO ESCENA 1..."
    );


    try {

        iniciarEscena1(

            game,

            imagenes,

            () => {

                diagnosticar(
                    "✅ ESCENA 1 TERMINADA"
                );


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
                        "🔴 ERROR ESCENA 2:\n" +
                        error.message
                    );

                }

            }
        );


        diagnosticar(
            "✅ ESCENA 1 EJECUTADA"
        );

    } catch (error) {

        diagnosticar(
            "🔴 ERROR ESCENA 1:\n" +
            error.message
        );

    }
}


// =====================================================
// 📺 PANTALLA DE CARGA
// =====================================================

diagnosticar(
    "📺 CREANDO PANTALLA DE CARGA..."
);


const pantallaCarga =
    iniciarPantallaCarga(

        game,

        iniciarJuego
    );


diagnosticar(
    "✅ PANTALLA DE CARGA CREADA"
);


// =====================================================
// 📥 CARGAR RECURSOS
// =====================================================

diagnosticar(
    "📦 CARGANDO RECURSOS..."
);


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

)


// =====================================================
// ✅ RECURSOS LISTOS
// =====================================================

.then(
    (resultado) => {

        imagenes =
            resultado;


        diagnosticar(
            "✅ TODOS LOS RECURSOS CARGADOS"
        );


        pantallaCarga
            .marcarCargaCompleta();

    }
)


// =====================================================
// ❌ ERROR
// =====================================================

.catch(
    (error) => {

        diagnosticar(
            "🚨 ERROR DE CARGA:\n" +
            error.message
        );

    }
);
